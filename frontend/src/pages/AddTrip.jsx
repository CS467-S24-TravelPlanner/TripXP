import React, { useState, useContext, useMemo } from "react";
import { createTrip } from "../utilities/TripHandler";
import { useNavigate } from "react-router-dom";
import TripDetails from "../components/UpdateTripDetails.jsx";
import "../index.css";
import { useSnackbar } from "../contexts/SnackbarContext.jsx";
import { UserContext } from "../contexts/UserContext";
import { Box } from "@mui/material";

const NUM_PICS = 6;

const AddTrip = () => {
  const showSnackbar = useSnackbar();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    name: "",
    description: "",
  });

  const randomPic = useMemo(() => {
    return `/travelpics/${Math.floor(Math.random() * NUM_PICS) + 1}.jpg`;
  }, []);

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trip.name || !trip.description) {
      showSnackbar("Please fill out all fields.", "error");
      return;
    }
    if (!user) {
      showSnackbar("Please log in to create a trip.", "error");
      return;
    }
    try {
      const res = await createTrip(trip.name, trip.description, user.raw_jwt);
      if (res.status) {
        showSnackbar("Trip created successfully!", "success");
        navigate(`/trip/${res.id}`);
      } else {
        showSnackbar("Error creating trip.", "error");
        console.error("Error creating trip:", res.message);
      }
    } catch (error) {
      console.error("Create trip failed:", error);
    }
  };

  return (
    <Box position="relative" width="90%" height="90%" mx="auto" mt="5rem">
      <Box
        component="img"
        src={randomPic}
        alt="Background"
        width="100%"
        maxHeight="90%"
        borderRadius="7px"
        boxShadow="0 4px 20px rgba(0, 0.1, 1, 0.5)"
      />
      <Box
        position="absolute"
        top="10%"
        left="5%"
        transform="translateY(-50%)" // Center vertically
        width="45%"
        borderRadius="7px"
        border="3px solid #364958"
        boxShadow="0 4px 20px rgba(0, 0.1, 1, 0.5)"
        bgcolor="rgba(238,232,217, 0.9)"
        padding="2rem"
      >
        <h1>Embark on a New Journey</h1>
        <h2>Tell Us About Your Trip:</h2>
        <TripDetails
          trip={trip}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default AddTrip;
