import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import PageTitle from "../../components/Text/PageTitle/PageTitle";
import ListEmptyState from "../../components/ListPage/ListEmptyState/ListEmptyState";
import ListCount from "../../components/ListPage/ListCount/ListCount";
import ProductListItemBase from "../../components/ListPage/ProductListItemBase/ProductListItemBase";
import "./WishlistPage.css";

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useAppContext();
    const navigate = useNavigate();

    if (wishlist.length === 0) {
        return (
            <section className="wishlist-page">
                <section aria-labelledby={"wishlist-title"}>
                    <PageTitle
                        id="wishlist-title"
                        title={"Lista de deseos"}
                    />
                </section>
                <ListEmptyState
                    message="♡ Tu lista de deseos está vacía."
                    onExplore={() => navigate("/search")}
                />
            </section>
        );
    }

    return (
        <div className="wishlist-page">
            <section aria-labelledby={"wishlist-title"}>
                <PageTitle
                    id="wishlist-title"
                    title={"Lista de deseos"}
                />
            </section>
            <section className="content-margin">
                <ListCount
                    count={wishlist.length}
                    singularSuffix="guardado"
                    pluralSuffix="guardados"
                />

                <div className="wishlist-list">
                    {wishlist.map((item) => (
                        <ProductListItemBase
                            key={item.id}
                            item={item}
                            variant="wishlist"
                            infoExtra={(
                                <div className="wishlist-form-data">
                                    <span>🔢 Cantidad: {item.wishlistData.cantidad}</span>
                                    <span>📋 Lista: {item.wishlistData.lista}</span>
                                    {item.wishlistData.nota && (
                                        <span>📝 {item.wishlistData.nota}</span>
                                    )}
                                </div>
                            )}
                            rightContent={(
                                <button
                                    className="wishlist-remove"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeFromWishlist(item.id);
                                    }}
                                    aria-label="Eliminar de lista de deseos"
                                >
                                    🗑
                                </button>
                            )}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WishlistPage;