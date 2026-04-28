import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation.constants";
import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-brand footer-part">
                    <span className="footer-logo">FERU STORE</span>
                    <p className="footer-tagline">
                        Encontrá lo que necesitás,
                        <br />
                        cuando lo necesitás.
                    </p>
                </div>

                <nav className="footer-nav footer-part">
                    <h3 className="footer-nav-title">Navegación</h3>
                    <ul>
                        {NAV_LINKS.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to}>{link.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer-info footer-part">
                    <h3 className="footer-nav-title">Estudio</h3>
                    <ul>
                        <li>La Plata, Buenos Aires</li>
                        <li>
                            <a href="mailto:contacto@ferustore.com">
                                contacto@ferustore.com
                            </a>
                        </li>
                        <li>Lunes a viernes, 9:00 – 18:00</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© {currentYear} Feru Store. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;