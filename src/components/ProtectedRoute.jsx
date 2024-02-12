import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ element, ...props }) {
    let token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
