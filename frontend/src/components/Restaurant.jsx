import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant, analyzeReviews } from "../redux/actions/restaurantAction";

const Restaurant = ({ restaurant }) => {
  const dispatch = useDispatch();
  const [showAI, setShowAI] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state) => state.user || {}
  );

  const [loadingAI, setLoadingAI] = useState(false);

  const handleToggleAI = async () => {
    if (!showAI && !restaurant.reviewSentiment) {
      setLoadingAI(true);
      await dispatch(analyzeReviews(restaurant._id));
      setLoadingAI(false);
    }
    setShowAI(!showAI);
  };

  //DELETE
  const handleDelete = () => {
    if (!window.confirm("Delete this restaurant?")) return;

    dispatch(deleteRestaurant(restaurant._id)).catch(() => {
      alert("Unable to delete");
    });
  };
  return (
    <div className="col-12 my-3">
    <div className="card restaurant-card p-3">

  <Link to={`/eats/stores/${restaurant._id}/menus`}>
    <img
      className="restaurant-image"
      src={restaurant.images?.[0]?.url}
      alt={restaurant.name}
    />
  </Link>

  <div className="restaurant-info">

    <h4>{restaurant.name}</h4>

    <p className="rest_address">
      {restaurant.address}
    </p>

    <div className="ratings">
      <div className="rating-outer">
        <div
          className="rating-inner"
          style={{
            width: `${(restaurant.ratings / 5) * 100}%`,
          }}
        ></div>
      </div>

      <span>
        ({restaurant.numOfReviews} Reviews)
      </span>
    </div>

    {restaurant.numOfReviews > 0 && (
      <button
        className="ai-btn"
        onClick={handleToggleAI}
        disabled={loadingAI}
      >
        {loadingAI
          ? "⏳ Analyzing..."
          : showAI
          ? "➖ Hide Reviews"
          : "💬 View Reviews"}
      </button>
    )}

  </div>

    {showAI && (
      <div className="ai-insights-box">

        {loadingAI ? (
          <div className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
            ⏳ Generating AI Summary...
          </div>
        ) : restaurant.reviewSentiment ? (
          <>
            <div className="ai-status">
              AI Summary: 😊 <strong>{restaurant.reviewSentiment}</strong>
            </div>

            <ul>
              {(restaurant.reviewSummaryBullets || []).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <div className="mentions mb-3">
              {(restaurant.reviewTopMentions || []).map((item, index) => (
                <span key={index} className="mention-tag">
                  #{item}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
            AI Summary unavailable for this store.
          </div>
        )}

        <div className="customer-reviews-list mt-3" style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
          <h5 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px" }}>
            User Reviews ({restaurant.reviews?.length || 0})
          </h5>
          <div style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "5px" }}>
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((rev, index) => (
                <div
                  key={rev._id || index}
                  className="review-item mb-2 pb-2"
                  style={{ borderBottom: "1px solid #f5f5f5" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong style={{ fontSize: "0.95rem" }}>{rev.name}</strong>
                    <span className="text-warning" style={{ fontSize: "0.85rem" }}>
                      {"⭐".repeat(Math.round(rev.rating))}
                    </span>
                  </div>
                  <p className="mb-0 text-muted" style={{ fontSize: "0.88rem", lineHeight: "1.4" }}>
                    {rev.Comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>No reviews available.</p>
            )}
          </div>
        </div>

      </div>
    )}

</div>

 {isAuthenticated && user && user.role === "admin" && (
            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
    </div>
  );
};

export default Restaurant;