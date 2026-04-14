// src/pages/Home/Home.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";
import { useAppContext } from "../../context/AppContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

const Home = () => {
    const { history, wishlist } = useAppContext();
    const [featured, setFeatured] = useState([]);
    const [relatedToWishlist, setRelatedToWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Traer todos para poder ordenar por descuento
                const data = await getProducts({ limit: 0 });
                const sorted = [...data.products].sort(
                    (a, b) => b.discountPercentage - a.discountPercentage
                );
                setFeatured(sorted.slice(0, 8));

                // Productos relacionados a la wishlist: misma categoría,
                // que no estén ya en la wishlist
                if (wishlist.length > 0) {
                    const wishlistCategories = [...new Set(wishlist.map((p) => p.category))];
                    const wishlistIds = new Set(wishlist.map((p) => p.id));
                    const related = data.products
                        .filter(
                            (p) =>
                                wishlistCategories.includes(p.category) &&
                                !wishlistIds.has(p.id)
                        )
                        .slice(0, 8);
                    setRelatedToWishlist(related);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, [wishlist]);

    // Historial: los últimos 8 visitados
    const recentHistory = history.slice(0, 8);

    if (loading) {
        return (
            <div className="home-loading">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <main className="home-page">

            {/* Hero */}
            <section className="home-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Encontrá lo que necesitás</h1>
                    <p className="hero-subtitle">
                        Cientos de productos con los mejores precios y descuentos.
                    </p>
                </div>
            </section>

            {/* Destacados — mayor descuento */}
            <section className="home-section">
                <div className="section-header">
                    <h2>Ofertas destacadas</h2>
                    <a href="/search" className="section-link">Ver todo →</a>
                </div>
                <div className="home-grid">
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Basado en historial */}
            {recentHistory.length > 0 && (
                <section className="home-section">
                    <div className="section-header">
                        <h2>Vistos recientemente</h2>
                        <a href="/history" className="section-link">Ver historial →</a>
                    </div>
                    <div className="home-grid">
                        {recentHistory.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Basado en wishlist */}
            {relatedToWishlist.length > 0 && (
                <section className="home-section">
                    <div className="section-header">
                        <h2>Porque guardaste productos similares</h2>
                        <a href="/wishlist" className="section-link">Ver lista →</a>
                    </div>
                    <div className="home-grid">
                        {relatedToWishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Estado vacío si no hay historial ni wishlist aún */}
            {recentHistory.length === 0 && wishlist.length === 0 && (
                <section className="home-section home-empty">
                    <p>¿Primera vez por acá? Explorá productos y guardá tus favoritos.</p>
                    <a href="/search" className="empty-cta">Explorar productos</a>
                </section>
            )}

        </main>
    );
};

export default Home;