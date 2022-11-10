import React from "react";
import { getPeople } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "../components/headerMovieList";
import TrendingTabs from "../components/trendingTabs";
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import PersonCard from "../components/personCard";
import PeopleList from "../components/peopleCardList";

const PeoplePage = (props) => {

  const { pagination } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["people", pagination],
    getPeople
  );
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const people = data.results;
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={"Discover People"} />
      </Grid>
      <TrendingTabs type={"person"} />
      <Grid item container spacing={1}>
        <PeopleList people={people} />
      </Grid>
      <Pagination count={data.total_pages} color="primary" variant="outlined" shape="rounded" size="large" showFirstButton showLastButton page={parseInt(pagination)} sx={{ justifyContent: 'center', margin: 'auto', marginTop: '20px'}}
        renderItem={(item) => (
          <PaginationItem component={Link} to={`/people/page${item.page}`} {...item}/>
        )}
      />
    </Grid>
  );
};
export default PeoplePage;