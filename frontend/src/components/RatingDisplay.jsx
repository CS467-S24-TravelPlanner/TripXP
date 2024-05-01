import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


/*
    Adapted from Material UI Documentation Examples
*/


// This component is used to display a rating as a series of stars.
export default function RatingDisplay (value){
    return (
    <Box
      sx={{
        width: 100,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="rating-display"
        value={value.value}
        precision={0.125}
        emptyIcon={<StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />}
      />
    </Box>
  );
}