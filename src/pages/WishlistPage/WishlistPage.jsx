import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import PageTitle from "../../components/Text/PageTitle/PageTitle";
import ListEmptyState from "../../components/ListPage/ListEmptyState/ListEmptyState";
import ListCount from "../../components/ListPage/ListCount/ListCount";
import ProductListItemBase from "../../components/ListPage/ProductListItemBase/ProductListItemBase";
import "./WishlistPage.css";
import Button from "../../components/Button/Button";
import ConfirmModal from "../../components/Modal/ConfirmModal/ConfirmModal";

const WishlistPage = () => {
    const { wishlist, removeFromWishlist, clearWishlist } = useAppContext();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleClearWishlist = () => {
        clearWishlist();
        setShowConfirm(false);
    };

    const handleConfirmDelete = () => {
        removeFromWishlist(itemToDelete.id);
        setItemToDelete(null);
    };

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
            <section className="content-delete">
                <Button
                    text="Borrar deseados"
                    onClick={() => setShowConfirm(true)}
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
                                    <span>Cantidad: {item.wishlistData.cantidad}</span>
                                    <span>Lista: {item.wishlistData.lista}</span>
                                    {item.wishlistData.nota && (
                                        <span>{item.wishlistData.nota}</span>
                                    )}
                                </div>
                            )}
                            rightContent={(
                                <button
                                    className="wishlist-remove"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setItemToDelete(item);
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

            {showConfirm && (
                <ConfirmModal
                    title="Borrar lista de deseos"
                    message="¿Estás seguro que querés borrar toda la lista? Esta acción no se puede deshacer."
                    confirmText="Sí, borrar"
                    onConfirm={handleClearWishlist}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            {itemToDelete && (
                <ConfirmModal
                    title="Eliminar producto"
                    message={`¿Querés eliminar "${itemToDelete.title}" de tu lista de deseos?`}
                    confirmText="Sí, eliminar"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setItemToDelete(null)}
                />
            )}
        </div>
    );
};

export default WishlistPage;