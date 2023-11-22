import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from "../pages";
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { Layout } from '../components/layout';


export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Pages.HomePage />} />
          <Route path="products" element={<Pages.ProductsPage />} />
          <Route path="cart" element={<Pages.CartPage />} />
          <Route path="auth/*" element={<PublicRoutes />} />
          <Route path="admin/*" element={<PrivateRoutes />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

