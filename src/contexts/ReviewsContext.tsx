import { createContext, useCallback, useReducer } from "react";
import { ReviewsErrorType } from "../utils/Types/utilTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
import { Review } from "../utils/Types/modelTypes.ts";

interface State {
  reviewsLoading: boolean;
  reviewLoading: boolean;
  reviews: Review[] | [];
  review: Review | null;
  reviewsError: ReviewsErrorType | null;
}

type Action =
  | { type: "reviews/loading" }
  | { type: "review/loading" }
  | { type: "reviews/loaded"; payload: Review[] }
  | { type: "review/loaded"; payload: Review }
  | { type: "reviews/failedToLoad" }
  | { type: "review/failedToLoad" };

interface ReviewsContextType extends State {
  getReviewsList: () => Promise<void>;
  getReview: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  reviewsLoading: false,
  reviewLoading: false,
  reviews: [],
  review: null,
  reviewsError: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "reviews/loading":
      return { ...state, reviewsLoading: true, reviewsError: null };
    case "review/loading":
      return { ...state, reviewLoading: true, reviewsError: null };
    case "reviews/loaded":
      return {
        ...state,
        reviewsLoading: false,
        reviewsError: null,
        reviews: action.payload,
      };
    case "review/loaded":
      return {
        ...state,
        reviewLoading: false,
        reviewsError: null,
        review: action.payload,
      };
    case "reviews/failedToLoad":
      return {
        ...state,
        reviewsLoading: false,
        reviewsError: "Reviews failed to load." as ReviewsErrorType,
      };
    case "review/failedToLoad":
      return {
        ...state,
        reviewLoading: false,
        reviewsError: "Review failed to load." as ReviewsErrorType,
      };
    default:
      throw new Error(`ERROR: Unknown action type of ${action}!`);
  }
}

const ReviewsContext = createContext<ReviewsContextType | null>(null);

export default function ReviewsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { reviews, review, reviewsLoading, reviewLoading, reviewsError },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getReviewsList = useCallback(async () => {
    dispatch({ type: "reviews/loading" });
    console.log("Fetching reviews!");

    const { data: reviews, error } = await supabase.rpc(
      "reviews_inventory_query"
    );

    if (reviews) {
      dispatch({ type: "reviews/loaded", payload: reviews });
      console.log("Successfully fetched reviews!");
    } else {
      dispatch({ type: "reviews/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [reviews]);

  const getReview = useCallback(
    async (targetId: number) => {
      if (review?.id && review?.id == targetId) {
        console.log(`review #${review.id} is already fetched, skipping fetch!`);
        return;
      }
      dispatch({ type: "review/loading" });
      console.log("Fetching review!");

      const { data: Review, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", targetId)
        .single();
      if (Review) {
        dispatch({ type: "review/loaded", payload: Review });
        console.log("Successfully fetched review!");
      } else {
        dispatch({ type: "review/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [review]
  );

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        review,
        reviewsError,
        reviewLoading,
        reviewsLoading,
        getReview,
        getReviewsList,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export { ReviewsContext };
