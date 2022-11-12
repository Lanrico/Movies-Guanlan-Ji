import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingTabs from "../trendingTabs";
import LoginBlock from "../loginBlock"

function MovieListPageTemplate({ movies, title, action, page, total_pages, pagination }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState(0);
  const genreId = Number(genreFilter);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const moviesSlicer = (moviesList, size) => {
    var moviesSlice = [];
    for (var i = 0; i < moviesList.length; i = i + size) {
      moviesSlice.push(moviesList.slice(i, i + size));
    }
    return moviesSlice;
  }

  let movieSlice = isMobile ? moviesSlicer(displayedMovies, 5) : moviesSlicer(displayedMovies, 11);
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      {(page === "") ? (
        <>
          <Grid item xs={12} sm={9}>
            <TrendingTabs type={"movie"} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <LoginBlock />
          </Grid>
        </>
      ) : null}
      <Grid item container spacing={1}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        {(page === "/movies/favorites") ? (
          <MovieList action={action} movies={movieSlice[pagination - 1]}></MovieList>
        ) : (
          <MovieList action={action} movies={displayedMovies}></MovieList>
        )}
      </Grid>
      {(page === "/movies/favorites") ? (
        <Pagination count={movieSlice.length} color="primary" variant="outlined" shape="rounded" size="large" showFirstButton showLastButton page={parseInt(pagination)} sx={{ justifyContent: 'center', margin: 'auto', marginTop: '20px' }}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`${page}/page${item.page}`} {...item} />
          )}
        />
      ) : (
        <Pagination count={total_pages > 500 ? 500 : total_pages} color="primary" variant="outlined" shape="rounded" size="large" showFirstButton showLastButton page={parseInt(pagination)} sx={{ justifyContent: 'center', margin: 'auto', marginTop: '20px' }}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`${page}/page${item.page}`} {...item} />
          )}
        />
      )}
    </Grid>
  );
}
export default MovieListPageTemplate;