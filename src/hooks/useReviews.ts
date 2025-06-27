import { useContext } from "react";
import { ReviewsContext } from "../contexts/ReviewsContext";

function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context)
    throw new Error(
      "ERROR: ReviewsContext was used outside of ReviewsProvider!"
    );
  return context;
}

export default useReviews;
