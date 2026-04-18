import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { getProductById } from "../../services/product.service";
import { useAppContext } from "../../context/AppContext";
import WishlistForm from "../../components/WishlistForm/WishlistForm";
import { StarIcon } from "../../assets/icons";
import "./DetailPage.css";

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToHistory, isInWishlist } = useAppContext();

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

    if (loading) return <p className="detail-status">Cargando producto...</p>;
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
                    <h1 className="detail-title">{product.title}</h1>
                    { product.brand && <p className="detail-brand">por {product.brand}</p> }

                    <div className="detail-pricing">
                        <span className="detail-price">${product.price.toFixed(2)}</span>
                        {product.discountPercentage > 0 && (
                            <span className="detail-discount">
                                -{Math.round(product.discountPercentage)}% OFF
                            </span>
                        )}
                    </div>

                    <div className="detail-rating">
                        ⭐ {product.rating} · {product.stock} unidades disponibles
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
                        <p className="wishlist-added">❤️ Ya está en tu lista de deseos</p>
                    ) : (
                        <button
                            className="wishlist-btn"
                            onClick={() => setShowForm(true)}
                        >
                            ♡ Agregar a lista de deseos
                        </button>
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
