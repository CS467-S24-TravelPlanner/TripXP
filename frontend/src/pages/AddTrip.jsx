import React, { useState, useContext, useMemo } from "react";
import { createTrip } from "../utilities/TripHandler";
import { useNavigate } from "react-router-dom";
import TripDetails from "../components/TripDetails";
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
    // TODO data validation
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showSnackbar("Please log in to create a trip.", "error");
      return;
    }
    try {
      const res = await createTrip(trip.name, trip.description, user.raw_jwt);
      if (res.status) {
        showSnackbar("Trip created successfully!", "success");
        navigate(`/trip/edit/${res.id}`);
      } else {
        showSnackbar("Error creating trip.", "error");
        console.error("Error creating trip:", res.message);
      }
    } catch (error) {
      console.error("Create trip failed:", error);
    }
  };

  return (
    <Box position="relative" width="90%" height="100%" mx="auto" mt="4rem">
      <Box
        component="img"
        src={randomPic} // Replace with your image path
        alt="Background"
        width="100%"
        borderRadius="7px"
        boxShadow="0 4px 20px rgba(0, 0.1, 1, 0.5)"
      />
      <Box
        position="absolute"
        top="5%"
        left="5%" // Adjust as needed to position the floating box on the left
        transform="translateY(-50%)" // Center vertically
        height="90%"
        width="45%" // 40% of the image width
        borderRadius="7px"
        border="3px solid #364958"
        boxShadow="0 4px 20px rgba(0, 0.1, 1, 0.5)"
        bgcolor="rgba(238,232,217, 0.9)"
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
    // <img src="/travelpics/1.jpg" alt="background">
    //   <div
    //     style={{
    //       width: "80vw",
    //       height: "80vh",
    //       marginTop: "80px",
    //       display: "inline-block",
    //       backgroundImage: "url(/travelpics/1.jpg)",
    //       backgroundRepeat: "no-repeat",
    //       backgroundPosition: "center",
    //     }}
    //   >
    //     <div
    //       style={{
    //         float: "left",
    //         width: "30%",
    //         height: "80%",
    //         borderRadius: "7px",
    //         border: "3px solid #364958",
    //         boxShadow: "0 4px 20px rgba(0, 0.1, 1, 0.5)",
    //       }}
    //     >
    //       <>
    //         <h1>Embark on a New Journey</h1>

    //         <h2>Tell Us About Your Trip:</h2>
    //         <TripDetails
    //           trip={trip}
    //           handleChange={handleChange}
    //           handleSubmit={handleSubmit}
    //         />
    //       </>
    //     </div>
    //   </div>
    // </img>
  );
};

export default AddTrip;
