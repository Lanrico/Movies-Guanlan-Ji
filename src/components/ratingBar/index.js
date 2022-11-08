import React from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const scoreConverter = (score) => {
  return Math.ceil(score) / 2;
}
const labels = {
  0.5: 'Terrible',
  1: 'Terrible+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Average',
  3: 'Average+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating(rate) {
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      }}
    >
      <Rating
        name="hover-feedback"
        readOnly={true}
        size="large"
        value={scoreConverter(rate.rate+0.01)}
        precision={0.5}
        getLabelText={getLabelText}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[scoreConverter(rate.rate+0.01)]}</Box>
    </Box>
  );
}
