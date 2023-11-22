import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, NotFoundPage, RegisterPage } from "../pages";
import { useContext } from "react";
import { AuthContext } from '../context/auth/AuthContext';

export const PublicRoutes = () => {
  const { isLogged } = useContext(AuthContext);

  if (isLogged) return <Navigate to="/" />

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
};
