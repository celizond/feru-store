import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CrossIcon, HeartIcon, MenuIcon, SearchIcon } from "../../assets/icons";
import { NAV_LINKS } from "../../constants/navigation.constants";
import logoFeru from "../../assets/logoFeru.png";
import "./Header.css";

const Header = () => {
  const menuRef = useRef(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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

  useEffect(() => {
    const isSearchRoute = location.pathname === "/search";
    const isDetailRoute = location.pathname.startsWith("/product");

    if (isSearchRoute) {
      setSearchInput(searchParams.get("q") || "");
      return;
    }

    if (isDetailRoute) {
      return;
    }

    setSearchInput("");
  }, [location.pathname, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/search");
    }
  };

  const isSearchDisabled = searchInput.trim().length === 0;

  return (
    <header className="header">
      <div className="top-bar">
          <NavLink to="/">
            <img className="logo" src={logoFeru} alt="Logo FERU" />
          </NavLink>

        <div className="header-functions">
          <NavLink to="/wishlist" aria-label="Lista de deseos">
            <HeartIcon />
          </NavLink>
          <div className="menu-wrap" ref={menuRef}>
            <button
              className="menu-btn"
              onClick={() => setOpenMenu(!openMenu)}
              aria-label="Menú"
            >
              {openMenu ? <CrossIcon /> : <MenuIcon />}
            </button>
            {openMenu && (
              <nav className="dropdown">
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                      <NavLink to={link.to} onClick={() => setOpenMenu(false)}>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrap">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar producto..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="search-actions">
            <button type="submit" className="icon-btn" aria-label="Buscar" disabled={isSearchDisabled}>
              <SearchIcon width={20} height={20} />
            </button>
          </div>
        </div>
      </form>

      <nav className="nav">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;