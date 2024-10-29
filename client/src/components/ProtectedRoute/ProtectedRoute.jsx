import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context"; // Asegúrate de la ruta correcta

const ProtectedRoute = ({ element, rolesAllowed }) => {
  const { roles } = useContext(Context);

  // Verificar si el usuario tiene alguno de los roles permitidos
  const hasPermission =
    roles && roles.some((role) => rolesAllowed.includes(role));

  return hasPermission ? element : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
