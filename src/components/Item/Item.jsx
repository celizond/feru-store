import "./Item.css";

const Item = ({ icon, text, href}) => {
    return (
        <li>
            { icon && <span className="item-icon">{icon}</span> }
            { href ? <a href={href}>{text}</a> : <span>{text}</span> }
        </li>
    )
}

export default Item;