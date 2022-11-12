import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import DialogButton from "../dialogButton";

export default function PersonCard({ person }) {

  const knownFor = person.known_for;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/people/${person.id}`}  style={{textDecorationLine: 'none', color : 'black'}}>
        <CardHeader
          title={
            <Typography variant="h5" textAlign={'center'}  component="p">
              {person.name}{" "}
            </Typography>
          }
        />
        <CardMedia
          sx={{ height: 500 }}
          image={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : img
          }
        />
      </Link>
      <CardContent sx={{padding : '10px 25px!important'}}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              Popularity: {person.popularity}
            </Typography>
          </Grid>
          <Grid item xs={6} justifyContent="center" style={{display: 'flex'}}>
            <DialogButton text="Movies" outputList={knownFor} title={person.name} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}