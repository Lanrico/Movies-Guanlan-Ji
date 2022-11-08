import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
// import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import PlaylistAddIcon from '../components/cardIcons/addToMustWatch'
import { useParams } from "react-router-dom";


const UpcomingMoviesPage = (props) => {

  const { pagination } = useParams();

  const {  data, error, isLoading, isError }  = useQuery(["discoverUpcoming", pagination], getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}    
      page="/movies/upcoming"
      pagination={pagination}
    />
  );
};

export default UpcomingMoviesPage;