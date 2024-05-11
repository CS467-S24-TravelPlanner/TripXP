import React, { useState, useEffect } from "react";
import { editTrip, getTripExperiences } from "../utilities/TripHandler";
import { useParams } from "react-router-dom";
import TripDetails from "../components/TripDetails";
import { getTrip } from "../utilities/TripHandler";
import ExperienceList from "../components/ExperienceList";
import { getExperiences } from "../utilities/ExperienceHandler";

const EditTrip = () => {
  const [trip, setTrip] = useState(false);
  const [tripExperiences, setTripExperiences] = useState(false);
  const [allExperiences, setAllExperiences] = useState(false);

  let { tripId } = useParams();

  useEffect(() => {
    fetchTrip();
    fetchTripExperiences();
    fetchAllExperiences();
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
      console.error("fetchTrip error:", error);
    }
  };

  const fetchTripExperiences = async () => {
    try {
      const res = await getTripExperiences(tripId);
      if (res.status) {
        setTripExperiences(res.data);
      } else {
        console.error(`Error fetching experiences for ${tripId}:`, res.error);
      }
    } catch (error) {
      console.error("fetchTripExperiences error:", error);
    }
  };

  const fetchAllExperiences = async () => {
    try {
      const res = await getExperiences();
      if (res.status) {
        if (res.data.length) {
          setAllExperiences(res.data);
          console.log(res.data);
        }
      } else {
        console.error("Error fetching experiences list:", res.error);
      }
    } catch (error) {
      console.error("fetchAllExperiences error:", error);
    }
  };

  const handleDetailsChange = (e) => {
    // TODO data validation
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailsSubmit = async (e) => {
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
          handleDetailsChange={handleDetailsChange}
          handleSubmit={handleDetailsSubmit}
        />
      )}
      {allExperiences && tripExperiences ? (
        <ExperienceList
          experiences={allExperiences}
          tripId={tripId}
          tripExperiences={tripExperiences}
        />
      ) : (
        // TODO Loading wheel insert
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditTrip;
