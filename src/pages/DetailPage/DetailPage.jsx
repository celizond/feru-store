import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { getProductById } from "../../services/product.service";
import { useAppContext } from "../../context/AppContext";
import WishlistForm from "../../components/WishlistForm/WishlistForm";
import { HeartIcon, StarFillerIcon, StarIcon } from "../../assets/icons";
import "./DetailPage.css";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToHistory, isInWishlist, removeFromWishlist } = useAppContext();

    const [showForm, setShowForm] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(false);

    const fetchProduct = useCallback(() => getProductById(id), [id]);
    const {
        data: product,
        loading,
        error,
    } = useAsync(fetchProduct, {
        initialData: null,
    });

    useEffect(() => {
        if (!product) return;

        addToHistory(product);
        setAddedToWishlist(isInWishlist(product.id));
    }, [product]);

    const handleWishlistSuccess = () => {
        setShowForm(false);
        setAddedToWishlist(true);
    };

    const handleRemoveFromWishlist = () => {
        removeFromWishlist(product.id);
        setAddedToWishlist(false);
    };

    const displayPrice = typeof product?.price === "number" ? product.price.toFixed(2) : "0.00";

    if (loading) return <Spinner />;
    if (error) return <p className="detail-status">Ha ocurrido un error, vuelva más tarde</p>;
    if (!product) return null;

    return (
        <section className="detail-page">

            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="detail-container">

                <div className="detail-gallery">
                    <img
                        className="detail-main-img"
                        src={product.thumbnail}
                        alt={product.title}
                    />
                    {product.images?.length > 1 && (
                        <div className="detail-thumbnails">
                            {product.images.map((img, i) => (
                                <img key={i} src={img} alt={`${product.title} ${i + 1}`} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="detail-info">
                    <span className="detail-category">{product.category}</span>
                    <h2 className="detail-title">{product.title}</h2>
                    {product.brand && <p className="detail-brand">por {product.brand}</p>}

                    <div className="detail-pricing">
                        <span className="detail-price">${displayPrice}</span>
                        {product.discountPercentage > 0 && (
                            <span className="detail-discount">
                                -{Math.round(product.discountPercentage)}% OFF
                            </span>
                        )}
                    </div>

                    <div className="detail-rating">
                        <StarFillerIcon width={13} height={13} />
                        {product.rating} · {product.stock} unidades disponibles
                    </div>

                    <p className="detail-description">{product.description}</p>

                    <div className="detail-meta">
                        <p><strong>SKU:</strong> {product.sku}</p>
                        <p><strong>Garantía:</strong> {product.warrantyInformation}</p>
                        <p><strong>Envío:</strong> {product.shippingInformation}</p>
                        <p><strong>Devolución:</strong> {product.returnPolicy}</p>
                        <p>
                            <strong>Disponibilidad:</strong>{" "}
                            <span className={product.availabilityStatus === "In Stock" ? "in-stock" : "out-stock"}>
                                {product.availabilityStatus}
                            </span>
                        </p>
                    </div>

                    {addedToWishlist ? (
                        <button
                            className="wishlist-added"
                            onClick={handleRemoveFromWishlist}
                            title="Haz clic para remover de tu lista de deseos"
                        >
                            <HeartIcon width={14} height={14} active={true} color={"#2e7d32"} /> Ya está en tu lista de deseos
                        </button>
                    ) : (
                        product.stock > 0 ?
                            <Button
                                onClick={() => setShowForm(true)}
                            >
                                <HeartIcon width={14} height={14} color={"#AA3BFF" }/> Agregar a lista de deseos
                            </Button>
                            :
                            <Button
                                text="Sin stock"
                                disabled
                            />
                    )}
                </div>
            </div>

            {product.reviews?.length > 0 && (
                <div className="detail-reviews">
                    <h2>Reseñas</h2>
                    {product.reviews.map((review, i) => (
                        <article key={i} className="review-card">
                            <div className="review-header">
                                <strong>{review.reviewerName}</strong>
                                <div className="review-rating">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <StarIcon key={i} active={i < review.rating} />
                                    ))}
                                </div>
                            </div>
                            <p>{review.comment}</p>
                            <small>{new Date(review.date).toLocaleDateString("es-AR")}</small>
                        </article>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
                        <WishlistForm
                            product={product}
                            onSuccess={handleWishlistSuccess}
                        />
                    </div>
                </div>
            )}

        </section>
    );
};

export default DetailPage;
