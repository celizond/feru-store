import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./Wishlist.css";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useAppContext();
    const navigate = useNavigate();

    if (wishlist.length === 0) {
        return (
            <section className="wishlist-page">
                <h1>Lista de deseos</h1>
                <div className="empty-state">
                    <p>♡ Tu lista de deseos está vacía.</p>
                    <button onClick={() => navigate("/search")}>
                        Explorar productos
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="wishlist-page">
            <h1>Lista de deseos</h1>
            <p className="wishlist-count">{wishlist.length} producto{wishlist.length !== 1 ? "s" : ""} guardado{wishlist.length !== 1 ? "s" : ""}</p>

            <div className="wishlist-list">
                {wishlist.map((item) => (
                    <article key={item.id} className="wishlist-item">

                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="wishlist-img"
                            onClick={() => navigate(`/product/${item.id}`)}
                        />

                        <div className="wishlist-info">
                            <h3
                                className="wishlist-title"
                                onClick={() => navigate(`/product/${item.id}`)}
                            >
                                {item.title}
                            </h3>
                            <p className="wishlist-price">${item.price.toFixed(2)}</p>
                            <p className="wishlist-category">{item.category}</p>

                            <div className="wishlist-form-data">
                                <span>🔢 Cantidad: {item.wishlistData.cantidad}</span>
                                <span>📋 Lista: {item.wishlistData.lista}</span>
                                {item.wishlistData.nota && (
                                    <span>📝 {item.wishlistData.nota}</span>
                                )}
                            </div>
                        </div>

                        <button
                            className="wishlist-remove"
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label="Eliminar de lista de deseos"
                        >
                            🗑
                        </button>

                    </article>
                ))}
            </div>
        </section>
    );
};

export default Wishlist;