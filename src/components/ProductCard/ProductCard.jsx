import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { StarFillerIcon } from "../../assets/icons";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const displayPrice = typeof product?.price === "number" ? product.price.toFixed(2) : "0.00";

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
                <p className="card-price">${displayPrice}</p>
                <div className="card-rating">
                    <StarFillerIcon width={11} height={11} />
                    {product.rating} · {product.stock} en stock
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
