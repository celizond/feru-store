import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Detail from "../pages/Detail/Detail";
import Wishlist from "../pages/Wishlist/Wishlist";
import History from "../pages/History/History";
import Contact from "../pages/Contact/Contact";
import Shopping from "../pages/Shopping/Shopping";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="product/:id" element={<Detail />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="history" element={<History />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shopping" element={<Shopping />} />

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;