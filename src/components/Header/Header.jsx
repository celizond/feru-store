import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { HeartIcon, MenuIcon, ShoppingCartIcon } from "../../assets/icons";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="header">

      <div className="top-bar">
        <div className="logo">LOGO</div>
        <div className="header-functions">
          <HeartIcon />
          <ShoppingCartIcon />
          <MenuIcon />
        </div>
      </div>
      <div className="search-bar">
        <div className="search-input-wrap">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar producto..."
          />
          <div className="search-actions">
            <a className="icon-btn" href="/wishlist" aria-label="Buscar">
              <HeartIcon width={20} height={20} />
            </a>
            <a className="icon-btn" href="/cart" aria-label="Agregar filtro">
              <ShoppingCartIcon width={20} height={20} />
            </a>
          </div>
        </div>
        <div className="search-filters">
        </div>
      </div>
      {/* <nav className={`nav ${openMenu ? "active" : ""}`}>
        <ul>
          <li><NavLink to="/search">Buscar</NavLink></li>
          <li><NavLink to="/categories">Categorías</NavLink></li>
          <li><NavLink to="/about">Acerca</NavLink></li>
        </ul>
      </nav> */}

    </header>
  );
};

export default Header;