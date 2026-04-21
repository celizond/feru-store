import { HashRouter , Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailPage from "../pages/DetailPage/DetailPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import ContactPage from "../pages/ContactPage/ContactPage";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="product/:id" element={<DetailPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="contact" element={<ContactPage />} />

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter >
  );
}

export default AppRouter;