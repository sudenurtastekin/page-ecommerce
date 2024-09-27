import { notFound } from "next/navigation";

export default async function GroceriesDetail({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      return notFound();
    }

    const data = await response.json();

    return (
      <div className="ProductDetails">
        <div className="ProductsDetail">
          <h2>{data.title}</h2>
          <img src={data.thumbnail} alt={data.title} />
          <p>{data.description}</p>
          <span>
            <h3>Price: ${data.price}</h3>
            <h4>Discount: {data.discountPercentage}%</h4>
          </span>
        </div>
        <div className="Comments">
          <h4>Reviews:</h4>
          <ul>
            {data.reviews.length > 0 ? (
              data.reviews.map((review, index) => (
                <li key={index} className="comments-list">
                  <p>
                    <strong>{review.reviewerName}:</strong> {review.comment}
                  </p>
                  <p>{review.date}</p>
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>
          <hr />
          <span className="BudgetBtns">
            <button>➖</button>
            <span>0</span>
            <button>➕</button>
          </span>
          <button className="AddBtn">Add to cart</button>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e); 
    throw new Error("Sunucuda bir hata oluştu.");
  }
}
