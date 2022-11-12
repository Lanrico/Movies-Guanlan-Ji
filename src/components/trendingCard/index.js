import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png'
import truncate from "lodash/truncate";
import { Link } from "react-router-dom";
import HoverRating from "../ratingBar";

export default function TrendingCard({ type, input }) { 

  return (
    <>
      {type === "movie"? (
        <Link to={`/movies/${input.id}`} style={{textDecorationLine: 'none'}}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader sx={{ padding: '5px' }}
            title={
              <Typography textAlign={'center'} variant="h5" component="p">
                {truncate(input.title, {length: 19})}{" "}
              </Typography>
            }
          />
          <CardMedia
            sx={{ height: 390, width: 250 }}
            image={
              input.poster_path
                ? `https://image.tmdb.org/t/p/w500/${input.poster_path}`
                : img
            }
          />
          <HoverRating rate={input.vote_average} />
        </Card>
      </Link>
    ) : (
      <Link to={`/people/${input.id}`} style={{textDecorationLine: 'none'}}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader sx={{ padding: '5px' }}
            title={
              <Typography textAlign={'center'} variant="h5" component="p">
                {truncate(input.name, {length: 19})}{" "}
              </Typography>
            }
          />
          <CardMedia
            sx={{ height: 390, width: 250 }}
            image={
              input.profile_path
                ? `https://image.tmdb.org/t/p/w500/${input.profile_path}`
                : img
            }
          />
        </Card>
      </Link>
    )}
    </>
  );
}