// src/components/Footer/Footer.jsx
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Marca */}
                <div className="footer-brand">
                    <span className="footer-logo">Feru Store</span>
                    <p className="footer-tagline">
                        Encontrá lo que necesitás, cuando lo necesitás.
                    </p>
                </div>

                {/* Navegación */}
                <nav className="footer-nav">
                    <h3 className="footer-nav-title">Navegación</h3>
                    <ul>
                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/search">Buscar productos</NavLink></li>
                        <li><NavLink to="/wishlist">Lista de deseos</NavLink></li>
                        <li><NavLink to="/history">Historial</NavLink></li>
                        <li><NavLink to="/contact">Contacto</NavLink></li>
                    </ul>
                </nav>

                {/* Info del estudio */}
                <div className="footer-info">
                    <h3 className="footer-nav-title">Estudio</h3>
                    <ul>
                        <li>📍 La Plata, Buenos Aires</li>
                        <li>
                            <a href="mailto:contacto@ferustore.com">
                                contacto@ferustore.com
                            </a>
                        </li>
                        <li>Lunes a viernes, 9:00 – 18:00</li>
                    </ul>
                </div>

            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Feru Store. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;