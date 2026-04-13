import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CrossIcon, HeartIcon, MenuIcon, ShoppingCartIcon } from "../../assets/icons";
import "./Header.css";
import logoFeru from "../../assets/logoFeru.png";
import FilterChip from "../ui/FilterChip/FilterChip";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [filters, setFilters] = useState([{ id: "price", label: "Precio > 10" }]);
  const menuRef = useRef(null);

  const handleRemoveFilter = (filterId) => {
    setFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== filterId));
  };

  useEffect(() => {
    if (!openMenu) return;
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openMenu]);

  return (
    <header className="header">

      <div className="top-bar">
        <img className="logo" src={logoFeru} alt="Logo FERU" />
        <div className="header-functions">
          <HeartIcon />
          <ShoppingCartIcon />
          <div className="menu-wrap" ref={menuRef}>
            <button className="menu-btn" onClick={() => setOpenMenu(!openMenu)} aria-label="Menú">
              {openMenu ? <CrossIcon /> : <MenuIcon />}
            </button>
            {openMenu && (
              <nav className="dropdown">
                <ul>
                  <li><NavLink to="/" onClick={() => setOpenMenu(false)}>Inicio</NavLink></li>
                  <li><NavLink to="/shopping" onClick={() => setOpenMenu(false)}>Compras</NavLink></li>
                  <li><NavLink to="/history" onClick={() => setOpenMenu(false)}>Historial de visitados</NavLink></li>
                  <li><NavLink to="/about" onClick={() => setOpenMenu(false)}>Acerca de</NavLink></li>
                  <li><NavLink to="/settings" onClick={() => setOpenMenu(false)}>Configuraciones</NavLink></li>
                </ul>
              </nav>
            )}
          </div>
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
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              onRemove={() => handleRemoveFilter(filter.id)}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;