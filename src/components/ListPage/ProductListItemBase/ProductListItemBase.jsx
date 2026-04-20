import { useNavigate } from "react-router-dom";
import "./ProductListItemBase.css";

const ProductListItemBase = ({ item, infoExtra, rightContent, variant }) => {
    const navigate = useNavigate();
    const variantClass = variant ? `product-list-item--${variant}` : "";

    return (
        <article
            key={item.id}
            className={`product-list-item ${variantClass}`}
            onClick={() => navigate(`/product/${item.id}`)}
        >
            <img src={item.thumbnail} alt={item.title} className="product-list-item__img" />

            <div className="product-list-item__info">
                <h3 className="product-list-item__title">{item.title}</h3>
                <p className="product-list-item__price">${item.price.toFixed(2)}</p>
                <p className="product-list-item__category">{item.category}</p>
                {infoExtra}
            </div>

            {rightContent}
        </article>
    );
};

export default ProductListItemBase;
