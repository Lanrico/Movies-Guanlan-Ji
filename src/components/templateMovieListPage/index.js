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
import TrendingMovies from "../trendingMovieBar";
import { Stack } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TabPanel from "../tabPanel";

function MovieListPageTemplate({ movies, title, action, page, pagination }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const genreId = Number(genreFilter);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // var tabValue = 0;
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const moviesSlicer = (moviesList, size) => {
    var moviesSlice = [];
    for(var i = 0; i < moviesList.length; i = i + size){
      moviesSlice.push(moviesList.slice(i,i + size));
    }
    return moviesSlice;
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  let movieSlice = isMobile? moviesSlicer(displayedMovies, 5) : moviesSlicer(displayedMovies, 11);
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      {(page === "") ? (
        <>
          <Paper elevation={3} style={{maxWidth: '100%', overflow: 'auto'}} sx={{ marginBottom: '40px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Typography sx={{ margin: '20px 0 20px 40px'}} variant="h4" component="p" >What's popular</Typography>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs" >
                <Tab label="In 24 hours" {...a11yProps(0)} sx={{ border: 1, borderColor: 'divider' }} />
                <Tab label="In 7 days" {...a11yProps(1)} sx={{ border: 1, borderColor: 'divider' }}/>
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0} style={{maxWidth: '100%', overflow: 'auto'}}>
              <Grid item xs={12}>
                <Stack direction="row" style={{maxWidth: '100%', overflow: 'auto'}} spacing={3}>
                  <TrendingMovies time_window={"day"} />
                </Stack>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1} style={{maxWidth: '100%', overflow: 'auto'}}>
              <Grid item xs={12}>
                <Stack direction="row" style={{maxWidth: '100%', overflow: 'auto'}} spacing={3}>
                  <TrendingMovies time_window="week" />
                </Stack>
              </Grid>
            </TabPanel>
          </Paper>
        </>
      ):(
        console.log(345345)
      )}
      <Grid item container spacing={1}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        {(page === "/movies/favorites") ? (
          <MovieList action={action} movies={movieSlice[pagination-1]}></MovieList>
        ) : (
          <MovieList action={action} movies={displayedMovies}></MovieList>
        )}
      </Grid>
      {(page === "/movies/favorites") ? (
        <Pagination count={movieSlice.length} color="primary" variant="outlined" shape="rounded" size="large" showFirstButton showLastButton page={parseInt(pagination)} sx={{ justifyContent: 'center', margin: 'auto', marginTop: '20px'}} 
          renderItem={(item) => (
            <PaginationItem component={Link} to={`${page}/page${item.page}`} {...item}/>
          )}
        />
      ) : (
        <Pagination count={(page === "") ? 100 : 20} color="primary" variant="outlined" shape="rounded" size="large" showFirstButton showLastButton page={parseInt(pagination)} sx={{ justifyContent: 'center', margin: 'auto', marginTop: '20px'}}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`${page}/page${item.page}`} {...item}/>
          )}
        />
      )}
    </Grid>
  );
}
export default MovieListPageTemplate;