import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Pages from "../pages/admin";
import { AuthContext } from "../context/auth/AuthContext";

export const PrivateRoutes = () => {
    const { isLogged } = useContext(AuthContext);

    if (!isLogged) return <Navigate to="/auth/login" />

    return (
        <Routes>
            <Route path="dashboard" element={<Pages.DashboardPage />} />
        </Routes>
    )
};
