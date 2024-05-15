import { React, useEffect, useState } from "react";
import { Button, Paper, Stack, Box, Divider } from "@mui/material";
import { getTripExperiences } from "../utilities/TripHandler";
import { getUsers } from "../utilities/UserHandler";
import ExperienceList from "../components/ExperienceList";

import { Link } from "react-router-dom";
function TripPage({ trip }) {
  const [experiences, setExperiences] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve Trip information from API
    getTripExperiences(trip.id)
      .then((result) => {
        setExperiences(result);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Retrieve User information from API
    getUsers({ id: trip.user_id })
      .then((result) => {
        setUser(result.data[0]);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      <div>
        {error ? (
          <div>Error: {error}</div>
        ) : experiences && user ? (
          experiences.length > 0 ? (
            <Paper>
              <Stack spacing={2}>
                <Box component="h1">{trip.name}</Box>
                <Box component="h3">{trip.description}</Box>
                <Box component="cite">Created by {user.username}</Box>

                <Divider orientation="horizontal" flexItem />
                <ExperienceList experiences={experiences} />
              </Stack>
            </Paper>
          ) : (
            <Button variant="contained" href="/ExperienceSearch">
              Help Me Find Experiences!
            </Button>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default TripPage;
