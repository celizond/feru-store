import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useHomeProducts } from "../../hooks/useHomeProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageTitle from "../../components/Text/PageTitle/PageTitle";
import "./HomePage.css";
import Spinner from "../../components/Spinner/Spinner";

const HomePage = () => {
    const { history, wishlist } = useAppContext();
    const {
        featured,
        relatedToWishlist,
        recentHistory,
        loading,
        error,
    } = useHomeProducts(wishlist, history);

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return (
            <div className="home-status">
                <p>Ha ocurrido un error, vuelva más tarde</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <section aria-labelledby={"home-title"}>
                <PageTitle
                    id={"home-title"}
                    title={"Encontrá lo que necesitás"}
                    subtitle={"Cientos de productos con los mejores precios y descuentos."}
                />
            </section>
            <div className="content-margin">
                <section className="home-section" aria-labelledby="home-featured-title">
                    <div className="section-header titles-bg">
                        <h2 id="home-featured-title">Ofertas destacadas</h2>
                        <Link to="/search" className="section-link">Ver todo →</Link>
                    </div>
                    <div className="home-grid">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {recentHistory.length > 0 && (
                    <section className="home-section" aria-labelledby="home-history-title">
                        <div className="section-header titles-bg">
                            <h2 id="home-history-title">Vistos recientemente</h2>
                            <Link to="/history" className="section-link">Ver historial →</Link>
                        </div>
                        <div className="home-grid">
                            {recentHistory.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {relatedToWishlist.length > 0 && (
                    <section className="home-section" aria-labelledby="home-wishlist-title">
                        <div className="section-header titles-bg">
                            <h2 id="home-wishlist-title">Porque guardaste productos similares</h2>
                            <Link to="/wishlist" className="section-link">Ver lista →</Link>
                        </div>
                        <div className="home-grid">
                            {relatedToWishlist.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {recentHistory.length === 0 && wishlist.length === 0 && (
                    <section className="home-section home-empty" aria-label="Estado vacío de inicio">
                        <p>¿Primera vez por acá? Explorá productos y guardá tus favoritos.</p>
                        <Link to="/search" className="empty-cta">Explorar productos</Link>
                    </section>
                )}

            </div>
        </div>
    );
};

export default HomePage;