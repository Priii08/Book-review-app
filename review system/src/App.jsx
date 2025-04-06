import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  const books = [
    {
      title: "The Great Gatsby",
      img: "/images/gatsby.png"
    },
    {
      title: "To Kill a Mockingbird",
      img: "/images/mockingbird.png"
    },
    {
      title: "1984",
      img: "/images/1984.png"
    },
    {
      title: "Pride and Prejudice",
      img: "/images/pride.png"
    },
    {
      title: "Harry Potter",
      img: "/images/harry.png"
    }
  ];

  const [selectedBook, setSelectedBook] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const handleAddReview = () => {
    if (selectedBook && review && rating > 0) {
      const bookData = books.find((b) => b.title === selectedBook);
      setReviews([{ book: selectedBook, review, rating, img: bookData.img }, ...reviews]);
      setReview("");
      setRating(0);
    }
  };

  const Star = ({ index, filled, onClick }) => (
    <span
      className={`star ${filled ? "filled" : ""}`}
      onClick={() => onClick(index)}
      style={{ cursor: "pointer", fontSize: "24px" }}
    >
      ★
    </span>
  );

  return (
    <>
    <header>
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h1>
        <span className="book-color">Book</span>
        <span className="review-color">Reviews</span>
      </h1>

      <h6>SHARE YOUR REVIEWS</h6>
      
    </header>

    <main className="container">
      <h2>SELECT A BOOK TO REVIEW</h2>

      <div className="book-list">
        {books.map((b, idx) => (
          <button
            key={idx}
            className={`book-btn ${selectedBook === b.title ? "selected" : ""}`}
            onClick={() => setSelectedBook(b.title)}
          >
            <img src={b.img} alt={b.title} className="book-img" />
            <span className="book-title">{b.title}</span>
          </button>
        ))}
      </div>

      {selectedBook && (
        <div className="review-form">
          <h2>Reviewing: {selectedBook}</h2>

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} index={i} filled={i <= rating} onClick={setRating} />
            ))}
          </div>

          <button className="submit-btn" onClick={handleAddReview}>
            Submit Review
          </button>
        </div>
      )}

      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map((item, idx) => (
            <div key={idx} className="review">
              <img src={item.img} alt={item.book} className="review-img" />
              <h3>{item.book}</h3>
              <p>{item.review}</p>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`star ${i <= item.rating ? "filled" : ""}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first!</p>
        )}
      </div>
    </main>

    <footer>
      <p>© 2025 BookReviews. All rights reserved.</p>
    </footer>
  </>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error("No root element found!");
}
