import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./HistoryPage.css";
import PageTitle from "../../components/Text/PageTitle/PageTitle";
import Button from "../../components/Button/Button";

const HistoryPage = () => {
    const { history } = useAppContext();
    const navigate = useNavigate();

    if (history.length === 0) {
        return (
            <section className="history-page">
                <h1>Historial</h1>
                <div className="empty-state">
                    <p>🕐 Todavía no visitaste ningún producto.</p>
                    <Button
                        text="Explorar productos"
                        onClick={() => navigate("/search")}
                    />
                </div>
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
            <section className="content-margin">
                <p className="history-count">{history.length} producto{history.length !== 1 ? "s" : ""} visitado{history.length !== 1 ? "s" : ""}</p>

                <div className="history-list">
                    {history.map((item) => (
                        <article
                            key={item.id}
                            className="history-item"
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="history-img"
                            />

                            <div className="history-info">
                                <h3 className="history-title">{item.title}</h3>
                                <p className="history-price">${item.price.toFixed(2)}</p>
                                <p className="history-category">{item.category}</p>
                            </div>

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

                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HistoryPage;