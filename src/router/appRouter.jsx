import { HashRouter , Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { ContactPage, DetailPage, HistoryPage, HomePage, SearchPage, WishlistPage } from "../pages";

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