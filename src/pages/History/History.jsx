import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./History.css";

const History = () => {
    const { history } = useAppContext();
    const navigate = useNavigate();

    if (history.length === 0) {
        return (
            <section className="history-page">
                <h1>Historial</h1>
                <div className="empty-state">
                    <p>🕐 Todavía no visitaste ningún producto.</p>
                    <button onClick={() => navigate("/search")}>
                        Explorar productos
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="history-page">
            <h1>Historial</h1>
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
    );
};

export default History;