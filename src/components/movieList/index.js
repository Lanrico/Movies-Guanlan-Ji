import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = ( {movies, action }) => {

  // const moviesSlicer = (moviesList, size) => {
  //   var moviesSlice = [];
  //   for(var i = 0; i < moviesList.length; i = i + size){
  //     moviesSlice.push(moviesList.slice(i,i + size));
  //   }
  //   return moviesSlice;
  // }

  let movieCards;

  if (movies){
  //   if (movies.length > 11) {
  //     movies = moviesSlicer(movies, 11)[1];
  //   }
  
    movieCards = movies.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Movie key={m.id} movie={m} action={action} />
      </Grid>
    ));
  }
  return movieCards;
};

export default MovieList;