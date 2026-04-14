import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <article className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="card-image-wrap">
                <img src={product.thumbnail} alt={product.title} />
                {product.discountPercentage > 0 && (
                    <span className="card-badge">-{Math.round(product.discountPercentage)}%</span>
                )}
            </div>
            <div className="card-info">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-category">{product.category}</p>
                <p className="card-price">${product.price.toFixed(2)}</p>
                <div className="card-rating">
                    ⭐ {product.rating} · {product.stock} en stock
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
