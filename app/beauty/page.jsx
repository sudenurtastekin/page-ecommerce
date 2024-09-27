import Link from "next/link";

export default async function Beauty() {
  const {products} = await fetch("https://dummyjson.com/products/category/beauty").then(res => res.json());
  return (
    <div className="ProductsContainer">
      <ul>
        {products.map(x => (
          <li key={x.id}>
            <img src={x.thumbnail} alt={x.title} />
            <h5>{x.category}</h5>
            <h1>{x.title}</h1>
            <p>{x.description}</p>
            <span>
              <h2>${x.price}</h2><h4>{x.discountPercentage}%</h4>
              <Link href={"/beauty/" + x.id} className="detail">Detay Göster</Link>
            </span>
            <span className="BudgetBtns">
              <button>➖</button>
                <span>0</span>
              <button>➕</button>
            </span>

            <button className='AddBtn'>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
