import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const Provider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem("token"); // Convertir a booleano
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      setRoles(decoded.roles || []);
    }
  }, []);

  // Función para iniciar sesión
  const login = (token) => {
    sessionStorage.setItem("token", JSON.stringify(token));

    if (token) {
      const decoded = jwtDecode(token.token);
      setRoles(decoded.roles || []); // Extrae los roles y guárdalos en el estado
      setIsAuthenticated(true);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setRoles([]); // Limpiar roles al cerrar sesión
    sessionStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <Context.Provider
      value={{ isAuthenticated, roles, login, logout, setIsAuthenticated }}
    >
      {children}
    </Context.Provider>
  );
};
