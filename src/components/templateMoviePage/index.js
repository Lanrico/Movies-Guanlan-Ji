import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.posters;
  images[0].featured = true;
  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
              sx={{
                transform: 'translateZ(0)',
                height: 600
              }}
              gap={1}
            >
              {images.map((image) => {
                
                const cols = image.featured ? 2 : 1;
                const rows = image.featured ? 2 : 1;
                return (
                  <ImageListItem key={image.file_path} cols={cols} rows={rows}>
                    <img
                      {...srcset(`https://image.tmdb.org/t/p/w500/${image.file_path}`, 400, 200, rows, cols)}
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.poster_path}
                    />
                  </ImageListItem>
                )
              })}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;