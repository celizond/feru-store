import Item from "../Item/Item";
import "./ItemsListContact.css";

const ItemsListContact = () => {
    return (
        <ul className="items-list-container">
            <Item icon="📍" text="La Plata, Buenos Aires, Argentina" />
            <Item icon="📧" text="contacto@ferustore.com" href="mailto:contacto@ferustore.com" />
            <Item icon="📞" text="+54 221 123-4567" href="tel:+542211234567" />
            <Item icon="🕐" text="Lunes a viernes, 9:00 - 18:00" />
        </ul>
    )
}

export default ItemsListContact;