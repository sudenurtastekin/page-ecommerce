"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Groceries() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products/category/groceries");
      const data = await response.json();
      setProducts(data.products);

      // Ürünlere göre başlangıçta sayacı sıfırla
      const initialCounts = data.products.map((product) => ({
        id: product.id,
        count: 0,
      }));
      setCount(initialCounts);
    };

    fetchProducts();
  }, []);

  // Arttırma fonksiyonu
  const handleIncrement = (id) => {
    setCount((prevCount) =>
      prevCount.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Azaltma fonksiyonu
  const handleDecrement = (id) => {
    setCount((prevCount) =>
      prevCount.map((item) =>
        item.id === id ? { ...item, count: Math.max(item.count - 1, 0) } : item
      )
    );
  };

  return (
    <div className="ProductsContainer">
      <ul>
        {products.map((x) => (
          <li key={x.id}>
            <img src={x.thumbnail} alt={x.title} />
            <h5>{x.category}</h5>
            <h1>{x.title}</h1>
            <p>{x.description}</p>
            <span>
              <h2>${x.price}</h2>
              <h4>{x.discountPercentage}%</h4>
              <Link href={"/groceries/" + x.id} className="detail">
                Detay Göster
              </Link>
            </span>
            <span className="BudgetBtns">
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
