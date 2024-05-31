import React, { useState, useContext } from "react";
import { createTrip } from "../utilities/TripHandler";
import { useNavigate } from "react-router-dom";
import TripDetails from "../components/TripDetails";
import "../index.css";
import travelpic from "../assets/travelpic.jpg.jpg";
import { useSnackbar } from "../contexts/SnackbarContext.jsx";
import { UserContext } from "../contexts/UserContext";

const AddTrip = () => {
  const showSnackbar = useSnackbar();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    name: "",
    description: "",
  });

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
    <div style={{ marginTop: "80px", display: "flex" }}>
      <div
        style={{
          flex: "1",
          height: "100%",
          borderRadius: "7px",
          border: "3px solid #364958",
          boxShadow: "0 4px 20px rgba(0, 0.1, 1, 0.5)",
        }}
      >
        <>
          <h1>Embark on a New Journey</h1>

          <h2>Tell Us About Your Trip:</h2>
          <TripDetails
            trip={trip}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </>
      </div>
      <div
        style={{
          flex: "1",
          position: "relative",
          right: "0",
          left: "0",
        }}
      >
        <img
          src={travelpic}
          alt="Travel Pic"
          style={{
            width: "100%",
            height: "81.5%",
            maxWidth: "100%",
            objectFit: "cover",
            borderRadius: "7px",
            boxShadow: "0 4px 20px rgba(0, 0.1, 1, 0.5)",
          }}
        />
      </div>
    </div>
  );
};

export default AddTrip;
