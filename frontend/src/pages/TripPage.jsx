import { React, useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Paper, Stack, Box, Divider } from "@mui/material";
import { getTrip, getTripExperiences } from "../utilities/TripHandler";
import ExperienceList from "../components/ExperienceList";
import { UserContext } from "../contexts/UserContext";

function TripPage() {
  const [trip, setTrip] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  const { tripId } = useParams();

  useEffect(() => {
    fetchTrip(tripId);
    fetchTripExperiences(tripId);
    console.log("trip experiences", experiences);
  }, [user]);

  function fetchTrip(tripId) {
    getTrip(tripId, user.raw_jwt)
      .then((result) => {
        setTrip(result.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function fetchTripExperiences(tripId) {
    getTripExperiences(tripId, user.raw_jwt)
      .then((result) => {
        setExperiences(result.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      {trip && experiences ? (
        <>
          <Paper>
            <Stack spacing={2}>
              <Box component="h1">{trip.name}</Box>
              <Box component="h3">{trip.description}</Box>
              <Box component="cite">Created by {user.name}</Box>
              <Divider orientation="horizontal" flexItem />
              <ExperienceList experiences={experiences} />
            </Stack>
          </Paper>
          {experiences.length === 0 && (
            <>
              <p>No experiences currently in trip!</p>
              <Link to={`/trip/edit/${tripId}`}>
                <Button onClick={() => handleFindExpClick} variant="contained">
                  Add Experiences
                </Button>
              </Link>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TripPage;
