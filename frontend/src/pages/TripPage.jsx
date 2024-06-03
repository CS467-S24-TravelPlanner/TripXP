import React, { useState, useEffect, useContext } from "react";
import { getTripExperiences } from "../utilities/TripHandler";
import { useParams } from "react-router-dom";
import UpdateTripDetails from "../components/UpdateTripDetails";
import { getTrip, editTrip as editTripAPI } from "../utilities/TripHandler";
import ExperienceList from "../components/ExperienceList";
import { getExperiences } from "../utilities/ExperienceHandler";
import { UserContext } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import {
  Paper,
  Stack,
  Button,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";

const EditTrip = () => {
  const [trip, setTrip] = useState(false);
  const [editTrip, setEditTrip] = useState(false);
  const [tripExperiences, setTripExperiences] = useState(false);
  const [allExperiences, setAllExperiences] = useState(false);

  const showSnackbar = useSnackbar();

  const { user } = useContext(UserContext);

  let { tripId } = useParams();

  useEffect(() => {
    if (!user) return;
    fetchTrip();
    fetchTripExperiences();
    fetchAllExperiences();
  }, [user]);

  useEffect(() => {
    fetchTripExperiences();
  }, [editTrip]);

  const fetchTrip = async () => {
    try {
      const res = await getTrip(tripId, user.raw_jwt);
      if (res.status) {
        setTrip({
          name: res.data.name,
          description: res.data.description,
        });
      } else {
        showSnackbar("Error fetching trip.", "error");
        console.error("Error fetching trip:", res.error);
      }
    } catch (error) {
      showSnackbar("Error fetching trip.", "error");
      console.error("fetchTrip error:", error);
    }
  };

  const fetchTripExperiences = async () => {
    try {
      const res = await getTripExperiences(tripId, user.raw_jwt);
      if (res.status) {
        setTripExperiences(res.data);
      } else {
        showSnackbar("Error fetching trip experiences.", "error");
        console.error(
          `Error fetching trip experiences for ${tripId}:`,
          res.error
        );
      }
    } catch (error) {
      showSnackbar("Error fetching experiences.", "error");
      console.error("fetchTripExperiences error:", error);
    }
  };

  const fetchAllExperiences = async () => {
    try {
      const res = await getExperiences();
      if (res.status) {
        if (res.data.length) {
          setAllExperiences(res.data);
        }
      } else {
        showSnackbar("Error fetching full experiences list.", "error");
        console.error("Error fetching experiences list:", res.error);
      }
    } catch (error) {
      showSnackbar("Error fetching full experiences list.", "error");
      console.error("fetchAllExperiences error:", error);
    }
  };

  const handleDetailsChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (trip.name === "" || trip.description === "") {
      showSnackbar("Trip name and description are required.", "error");
      return;
    }
    try {
      const res = await editTripAPI(tripId, { ...trip }, user.raw_jwt);
      if (res.status) {
        showSnackbar("Trip updated successfully!", "success");
      } else {
        showSnackbar("Error updating trip.", "error");
        console.error("Error updating trip:", res.error);
      }
    } catch (error) {
      showSnackbar("Error updating trip.", "error");
      console.error("Error updating trip:", res.error);
    }
  };

  return (
    <Paper
      sx={{
        textAlign: "center",
        marginTop: "4rem",
        padding: "2rem",
        width: "50vw",
      }}
    >
      {user ? (
        <>
          <Stack
            direction="row-reverse"
            sx={{ width: "100%", alignItems: "flex-end", mb: "3rem" }}
          >
            <Button variant="outlined" onClick={() => setEditTrip(!editTrip)}>
              {editTrip ? "Back to View ↩" : "Edit Trip"}
            </Button>
          </Stack>
          {trip && allExperiences && tripExperiences ? (
            editTrip && tripExperiences ? (
              <>
                <h1>Edit Trip</h1>
                <UpdateTripDetails
                  trip={trip}
                  handleChange={handleDetailsChange}
                  handleSubmit={handleDetailsSubmit}
                  buttonText="Update Trip"
                />
                <ExperienceList
                  experiences={allExperiences}
                  tripId={tripId}
                  tripExperiences={tripExperiences}
                />
              </>
            ) : (
              <>
                <Stack spacing={2} sx={{ padding: "2rem" }}>
                  <Box component="h1">{trip.name}</Box>
                  <Box component="h3">{trip.description}</Box>
                  <Box component="cite">Created by {user.name}</Box>
                  <Divider orientation="horizontal" flexItem />
                  <ExperienceList experiences={tripExperiences} />
                </Stack>
              </>
            )
          ) : (
            <CircularProgress sx={{ mt: "3rem" }} />
          )}
        </>
      ) : (
        <h1>You must log in to view trips.</h1>
      )}
      {!editTrip && tripExperiences.length === 0 && (
        <>
          <p>No experiences added to this trip yet.</p>
          <Button variant="contained" onClick={() => setEditTrip(!editTrip)}>
            Help Me Find Experiences!
          </Button>
        </>
      )}
    </Paper>
  );
};

export default EditTrip;
