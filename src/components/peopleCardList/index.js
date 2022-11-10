import React from "react";
import PersonCard from "../personCard";
import Grid from "@mui/material/Grid";

const PeopleList = ( {people }) => {

  let personCards;

  if (people){
    personCards = people.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <PersonCard key={m.id} person={m} />
      </Grid>
    ));
  }
  return personCards;
};

export default PeopleList;