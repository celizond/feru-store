import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="header">

      <div className="top-bar">
        <button className="menu-btn" onClick={() => setOpenMenu(!openMenu)}>
          Menú
        </button>

        <div className="logo">LOGO</div>

        <div className="header-functions">
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Cart</a>
          <a href="/user">User</a>
        </div>
      </div>
      <nav className={`nav ${openMenu ? "active" : ""}`}>
        <ul>
          <li><NavLink to="/search">Buscar</NavLink></li>
          <li><NavLink to="/categories">Categorías</NavLink></li>
          <li><NavLink to="/about">Acerca</NavLink></li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;