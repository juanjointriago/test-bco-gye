import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import { AuthContext } from "../context/auth/AuthContext";
import React from "react";

export const PrivateRoutes = () => {
    const { isLogged } = useContext(AuthContext);

    if (!isLogged) return <Navigate to="/auth/login" />

    return (
        <Routes>
            <Route path="dashboard" element={<Pages.DashboardPage />} />
            <Route path="products" element={<Pages.AdminProductsPage />} />
            <Route path="product/create" element={<Pages.CreateProduct />} />
            <Route path="product/:id" element={<Pages.UpdateProduct />} />
            {/* <Route path="users/create" element={<Pages.CreateUserPage />} /> */}
            <Route path="orders" element={<Pages.AdminOrdersPage />} />
            <Route path="orders/:orderId" element={<Pages.AdminOrderDetailPage />} />
            <Route path="users" element={<Pages.AdminUsersPage />} />
            <Route path="user/:id" element={<Pages.AdminUsersPage />} />
            <Route path="*" element={<Pages.NotFoundPage />} />
        </Routes>
    )
};
