import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/product.service";
import { useAppContext } from "../../context/AppContext";
import WishlistForm from "../../components/WishlistForm/WishlistForm";
import "./Detail.css";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToHistory, isInWishlist } = useAppContext();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductById(id);
                setProduct(data);
                addToHistory(data); // ← registro automático en historial
                setAddedToWishlist(isInWishlist(data.id));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleWishlistSuccess = () => {
        setShowForm(false);
        setAddedToWishlist(true);
    };

    if (loading) return <p className="detail-status">Cargando producto...</p>;
    if (error) return <p className="detail-status error">Error: {error}</p>;
    if (!product) return null;

    return (
        <section className="detail-page">

            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="detail-container">

                {/* Galería de imágenes */}
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

                {/* Info del producto */}
                <div className="detail-info">
                    <span className="detail-category">{product.category}</span>
                    <h1 className="detail-title">{product.title}</h1>
                    <p className="detail-brand">por {product.brand}</p>

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

                    {/* Botón wishlist */}
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

            {/* Reviews */}
            {product.reviews?.length > 0 && (
                <div className="detail-reviews">
                    <h2>Reseñas</h2>
                    {product.reviews.map((review, i) => (
                        <article key={i} className="review-card">
                            <div className="review-header">
                                <strong>{review.reviewerName}</strong>
                                <span>⭐ {review.rating}</span>
                            </div>
                            <p>{review.comment}</p>
                            <small>{new Date(review.date).toLocaleDateString("es-AR")}</small>
                        </article>
                    ))}
                </div>
            )}

            {/* Modal del formulario */}
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

export default Detail;
