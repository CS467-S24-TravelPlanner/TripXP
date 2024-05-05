import React, { useState, useEffect } from "react";
import { editTrip } from "../utilities/TripHandler";
import { useParams } from "react-router-dom";
import TripDetails from "../components/TripDetails";
import { getTrip } from "../utilities/TripHandler";

const EditTrip = () => {
  const [trip, setTrip] = useState(false);

  let { tripId } = useParams();

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await getTrip(tripId);
      if (res.status) {
        setTrip({
          name: res.data.name,
          description: res.data.description,
          user_id: res.data.user_id,
        });
      } else {
        console.error("Error fetching trip:", res.error);
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
    }
  };

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
      const res = await editTrip(tripId, { ...trip });
      if (res.status) {
        console.log(trip);
        console.log(res);
        console.log(`Trip updated successfully.`);
      } else {
        console.error("Error updating trip:", res.error);
      }
    } catch (error) {
      console.error("Update trip failed:", error);
    }
  };

  return (
    <>
      <h1>Edit Trip</h1>
      {trip && (
        <TripDetails
          trip={trip}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default EditTrip;
