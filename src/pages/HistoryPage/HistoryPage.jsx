import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import PageTitle from "../../components/Text/PageTitle/PageTitle";
import ListEmptyState from "../../components/ListPage/ListEmptyState/ListEmptyState";
import ListCount from "../../components/ListPage/ListCount/ListCount";
import ProductListItemBase from "../../components/ListPage/ProductListItemBase/ProductListItemBase";
import Button from "../../components/Button/Button";
import ConfirmModal from "../../components/Modal/ConfirmModal/ConfirmModal";
import "./HistoryPage.css";

const HistoryPage = () => {
    const { history, clearHistory } = useAppContext();
    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);

    const handleClearHistory = () => {
        clearHistory();
        setShowConfirm(false);
    };


    if (history.length === 0) {
        return (
            <section className="history-page">
                <section aria-labelledby={"history-title"}>
                    <PageTitle
                        id={"history-title"}
                        title={"Historial"}
                    />
                </section>
                <ListEmptyState
                    message="🕐 Todavía no visitaste ningún producto."
                    onExplore={() => navigate("/search")}
                />
            </section>
        );
    }

    return (
        <div className="history-page">
            <section aria-labelledby={"history-title"}>
                <PageTitle
                    id={"history-title"}
                    title={"Historial"}
                />
            </section>
            <section className="content-delete">
                <Button
                    onClick={() => setShowConfirm(true)}
                    text={"Borrar historial"}
                />
            </section>
            <section className="content-margin">
                <ListCount
                    count={history.length}
                    singularSuffix="visitado"
                    pluralSuffix="visitados"
                />

                <div className="history-list">
                    {history.map((item) => (
                        <ProductListItemBase
                            key={item.id}
                            item={item}
                            variant="history"
                            rightContent={(
                                <div className="history-meta">
                                    <time className="history-time">
                                        {new Date(item.visitedAt).toLocaleDateString("es-AR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </time>
                                    <time className="history-hour">
                                        {new Date(item.visitedAt).toLocaleTimeString("es-AR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </time>
                                </div>
                            )}
                        />
                    ))}
                </div>
            </section>

            {showConfirm && (
                <ConfirmModal
                    title="Borrar historial"
                    message="¿Estás seguro que querés borrar todo el historial? Esta acción no se puede deshacer."
                    onConfirm={handleClearHistory}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

        </div>
    );
};

export default HistoryPage;