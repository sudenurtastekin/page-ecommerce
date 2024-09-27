"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);

      const initialCounts = data.products.map((product) => ({
        id: product.id,
        count: 0,
      }));
    
      setCount(initialCounts);
    };
    
    fetchProduct();
  }, []);

  function handleIncrement(id) {
    setCount((prevCount) => prevCount.map((x) =>
      x.id === id ? {...x, count: x.count + 1 } : x
    ));
  }

  function handleDecrement(id) {
    setCount((prevCount) => prevCount.map((x) =>
      x.id === id ? { ...x, count: Math.max(x.count - 1, 0)} : x
    ));
  }

  return (
    <div className="ProductsContainer">
      <ul>
        {products.map(x => (
          <li key={x.id}>
            <img src={x.thumbnail} alt={x.title} />
            <h5>{x.category}</h5>
            <h1>{x.title}</h1>
            <p>{x.description}</p>
            <span key={`price-${x.id}`}>
              <h2>{x.price}</h2>
              <h4>{x.discountPercentage}%</h4>
            </span>
            <span key={`link-${x.id}`}>
              <Link href={"/"+ x.category +"/" + x.id} className="detail">Details</Link>
            </span>
            <span className="BudgetBtns" key={`buttons-${x.id}`}>
              <button onClick={() => handleDecrement(x.id)}>➖</button>
              <span>{count.find((item) => item.id === x.id)?.count || 0}</span>
              <button onClick={() => handleIncrement(x.id)}>➕</button>
            </span>
            <button className="AddBtn">Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
