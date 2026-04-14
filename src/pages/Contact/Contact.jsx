import "./Contact.css";

const Contact = () => {
    return (
        <section className="contact-page">
            <h1>Contacto</h1>

            <div className="contact-container">

                {/* Datos del estudio */}
                <div className="contact-info">
                    <h2>Feru Store</h2>
                    <p className="contact-tagline">Desarrollo de aplicaciones web y móviles</p>

                    <ul className="contact-details">
                        <li>
                            <span className="contact-icon">📍</span>
                            <span>La Plata, Buenos Aires, Argentina</span>
                        </li>
                        <li>
                            <span className="contact-icon">📧</span>
                            <a href="mailto:contacto@ferustore.com">contacto@ferustore.com</a>
                        </li>
                        <li>
                            <span className="contact-icon">📞</span>
                            <a href="tel:+542211234567">+54 221 123-4567</a>
                        </li>
                        <li>
                            <span className="contact-icon">🕐</span>
                            <span>Lunes a viernes, 9:00 – 18:00</span>
                        </li>
                    </ul>
                </div>

                {/* Mapa */}
                <div className="contact-map">
                    <h2>Nuestra ubicación</h2>
                    <p className="contact-address">Catedral de La Plata — Plaza Moreno, La Plata</p>
                    <div className="map-wrapper">
                        <iframe
                            title="Ubicación de Feru Store"
                            src="https://www.google.com/maps?q=-34.9215,-57.9536&z=16&output=embed"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;