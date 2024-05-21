import React, { useState, useEffect } from "react";
import { createTrip } from "../utilities/TripHandler";
import { useNavigate } from "react-router-dom";
import TripDetails from "../components/TripDetails";
import Toast from "../components/Toast";

const AddTrip = () => {
  // TODO user id (or better unique identifier) pulled from client, pending auth imp
  const [trip, setTrip] = useState({ name: "", description: "", user_id: 2 });
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    severity: "",
    message: "",
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
    try {
      const res = await createTrip(trip.name, trip.description, trip.user_id);
      if (res.status) {
        console.log(`Trip ${res.id} created successfully.`);
        navigate(`/trip/edit/${res.id}`);
      } else {
        setToast({ show: true, severity: "error", message: `${res.message}` });
        console.error("Error creating trip:", res.message);
      }
    } catch (error) {
      console.error("Create trip failed:", error);
    }
  };

  return (
    <>
      <h1>Add Trip</h1>
      <TripDetails
        trip={trip}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Toast
        show={toast.show}
        severity={toast.severity}
        message={toast.message}
      />
    </>
  );
};

export default AddTrip;
