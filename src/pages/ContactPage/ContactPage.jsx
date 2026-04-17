import InfoCard from "../../components/InfoCard/InfoCard";
import ItemsList from "../../components/ItemsList/ItemsList";
import PageTitle from "../../components/Text/PageTitle/PageTitle";
import "./ContactPage.css";

const ContactPage = () => {
    return (
        <section className="contact-page" aria-labelledby="contact-title">

            <PageTitle
                id={"contact-title"}
                title={"Contacto"}
            />

            <div className="contact-container">

                <InfoCard>
                    <h2>Feru store</h2>
                    <p className="contact-tagline">Desarrollo de aplicaciones web y móviles</p>
                    <ItemsList />
                </InfoCard>

                <InfoCard>
                    <h2>Nuestra ubicación</h2>
                    <address className="contact-address">Catedral de La Plata — Plaza Moreno, La Plata</address>
                    <div className="map-wrapper">
                        <iframe
                            title="Ubicación de Feru Store"
                            src="https://www.google.com/maps?q=-34.9215,-57.9536&z=16&output=embed"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </InfoCard>

            </div>
        </section>
    );
};

export default ContactPage;