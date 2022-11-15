import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";

const MovieReview = lazy(() => import("../components/movieReview"));

const MovieReviewPage = (props) => {
  let location = useLocation();
  const { movie, review } = location.state;

  return (
    <PageTemplate movie={movie}>
      <Suspense fallback={<h1>Building list</h1>}>
        <MovieReview review={review} />
      </Suspense>
    </PageTemplate>
  );
};

export default MovieReviewPage;