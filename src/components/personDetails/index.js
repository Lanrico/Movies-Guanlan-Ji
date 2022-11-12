import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Grid, Pagination, PaginationItem } from "@mui/material";
import { getPersonMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import MovieCard from "../movieCard"
import Spinner from '../spinner';
import AddToFavoritesIcon from '../cardIcons/addToFavorites'

const PeopleDetails = ({ person }) => {
  const [movieCardPage, setMovieCardPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(
    ["creditsMovies", { id: person.id }],
    getPersonMovieCredits
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const creditsMovies = data.cast
  return (
    <>
      <Grid item xs={12} xl={9} style={{ padding: "1%" }}>
        <Paper style={{ padding: "3.5%" }}>
          <Typography variant="h5" component="h3">
            Biography
          </Typography>
          <Typography variant="h6" component="p">
            {person.biography}
          </Typography>
        </Paper>
      </Grid>
      {creditsMovies.length > 0 ? (
        <Grid item xs={12} xl={3} style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" component="h4">
            {person.name}<br></br> starred in these movies:
          </Typography>
          <MovieCard width={350} movie={creditsMovies[movieCardPage - 1]} action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />
          }} />
          <Pagination count={creditsMovies.length > 5 ? 5 : creditsMovies.length} hidePrevButton hideNextButton sx={{ justifyContent: 'center', margin: 'auto', marginTop: '20px' }}
            renderItem={(item) => (
              <PaginationItem component={Button} onClick={item.selected ? setMovieCardPage(item.page) : null} {...item} />
            )}
          />
        </Grid>
      ) : null}
    </>
  );
};
export default PeopleDetails;