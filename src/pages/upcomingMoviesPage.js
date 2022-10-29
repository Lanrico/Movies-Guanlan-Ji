import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import PlaylistAddIcon from '../components/cardIcons/addToMustWatch'


const UpcomingMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('discoverUpcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  
  // const favorites = movies.filter(m => m.favorite)
  // localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}    
    />
  );
};

export default UpcomingMoviesPage;