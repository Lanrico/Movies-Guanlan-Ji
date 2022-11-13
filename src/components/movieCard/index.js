import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import truncate from "lodash/truncate";

export default function MovieCard({ movie, action, width }) {
  const { favorites } = useContext(MoviesContext);
  const { mustWatch } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false
  }

  return (
    <Card sx={{ maxWidth: 345, width: width ? width : "auto", justifyContent: 'center', margin: '0 auto' }}>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) :
            movie.mustWatch ? (
              <Avatar sx={{ backgroundColor: 'red' }}>
                <PlaylistAddIcon />
              </Avatar>
            ) : null

        }
        title={
          <Typography variant="h5" component="p" textAlign={'center'} >
            {truncate(movie.title, {length:21})}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ pb: 0 }}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6" component="p" textAlign={'left'}>
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" component="p" textAlign={'right'}>
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average.toFixed(1)}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container>
          <Grid item xs={5}>
            {action(movie)}
          </Grid>
          <Grid item xs={7}>
            <Link to={`/movies/${movie.id}`} style={{textDecorationLine: 'none'}}>
              <Button variant="outlined" size="medium" color="primary" sx={{height : "50px"}} >
                More Info ...
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}