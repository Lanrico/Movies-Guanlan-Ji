import TrendingCard from "../trendingCard";
import Grid from "@mui/material/Grid";
import { useQuery } from 'react-query';
import { getTrendingList } from "../../api/tmdb-api";
import Spinner from '../spinner';

const TrendingList = ({ type, time_window }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["trending" + type + time_window, { type : type, time_window : time_window}],
    getTrendingList
  );
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const list = data.results;

  let trendingCards;

  trendingCards = list.map((m) => (
    <Grid key={m.id} item xs={12}>
      <TrendingCard type={type} input={m} />
    </Grid>  
  ));
  return trendingCards;
}

export default TrendingList;