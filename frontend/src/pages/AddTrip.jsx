import React, { useState, useContext } from "react";
import { createTrip } from "../utilities/TripHandler";
import { useNavigate } from "react-router-dom";
import TripDetails from "../components/TripDetails";
import { UserContext } from "../contexts/UserContext";
import Toast from "../components/Toast";

const AddTrip = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    name: "",
    description: "",
  });
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
      const res = await createTrip(trip.name, trip.description, user.raw_jwt);
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
    <div style={{ marginTop: "40px" }}>
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
    </div>
  );
};

export default AddTrip;
