import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getPersonImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import PersonHeader from "../personHeader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Paper, Toolbar, Typography } from "@mui/material";
import MediaButton from "../mediaButtons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const TemplatePersonPage = ({ person, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: person.id }],
    getPersonImages
  );

  const rows = [
    person.gender,
    person.birthday,
    person.place_of_birth
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

  const images = data.profiles
  images[0].featured = true;
  return (
    <>
      <PersonHeader person={person} />
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={isMobile?12:3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
              sx={{
                transform: 'translateZ(0)',
                height: images[0].height / images[0].width === 1.5 ? 600 : 800
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
          <Paper>
            <Toolbar>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Basic information
              </Typography>
            </Toolbar>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    key={rows[0]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Gender
                    </TableCell>
                    <TableCell align="right">{rows[0] === 1 ? "Female": rows[0] === 2? "Male" : "LGBTQIA+"}</TableCell>
                  </TableRow>
                  <TableRow
                    key={rows[1]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Birthday
                    </TableCell>
                    <TableCell align="right">{rows[1]}</TableCell>
                  </TableRow>
                  <TableRow
                    key={rows[2]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Place of birth
                    </TableCell>
                    <TableCell align="right">{rows[2]}</TableCell>
                  </TableRow>
                  <TableRow
                    key={"media"}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Social media homepage
                    </TableCell>
                    <TableCell align="right">
                      <MediaButton person={person}/>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item container xs={isMobile?12:9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonPage;