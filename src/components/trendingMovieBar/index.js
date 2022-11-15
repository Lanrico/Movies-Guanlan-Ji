import TrendingMovie from "../trendingMovieCard";
import Grid from "@mui/material/Grid";
import { useQuery } from 'react-query';
import { getTrendingMovies } from "../../api/tmdb-api";
import Spinner from '../spinner';

const TrendingMovies = ({ time_window }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["trending",{ time_window : time_window}],
    getTrendingMovies
  );
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  let trendingMovieCards;
  trendingMovieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12}>
      <TrendingMovie key={m.id} movie={m} />
    </Grid>  
  ));
  return trendingMovieCards;
}

export default TrendingMovies;