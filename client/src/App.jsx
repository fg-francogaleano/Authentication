import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import SingIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SingUp";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./views/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// Importa el componente

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <NavBar />
      )}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Ruta protegida para el Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              rolesAllowed={["admin", "moderator"]}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
