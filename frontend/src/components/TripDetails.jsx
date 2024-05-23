import { Box, Button, TextField } from "@mui/material";

const TripDetails = ({ trip, handleChange, handleSubmit }) => {
  return (
    <div >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="trip-name"
          label="Trip Name"
          inputProps={{ maxLength: 255 }}
          name="name"
          value={trip.name}
          onChange={handleChange}
        />
        <TextField
          required
          id="trip-desc"
          label="Trip Description"
          multiline
          rows={4}
          inputProps={{ maxLength: 255 }}
          name="description"
          value={trip.description}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default TripDetails;
