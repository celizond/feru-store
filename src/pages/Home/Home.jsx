import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";
import "./Home.css";

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log("Fetch products ", data);
            setProducts(data.products);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>
                Home
            </h1>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <img src={product.thumbnail} alt={product.title} width="150" />
                </div>
            ))}
        </div>
    )
}

export default Home