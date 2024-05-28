import React, { useState, useEffect, useContext } from "react";
import { editTrip, getTripExperiences } from "../utilities/TripHandler";
import { useParams } from "react-router-dom";
import TripDetails from "../components/TripDetails";
import { getTrip } from "../utilities/TripHandler";
import ExperienceList from "../components/ExperienceList";
import { getExperiences } from "../utilities/ExperienceHandler";
import { UserContext } from "../contexts/UserContext";

const EditTrip = () => {
  const [trip, setTrip] = useState(false);
  const [tripExperiences, setTripExperiences] = useState(false);
  const [allExperiences, setAllExperiences] = useState(false);

  const { user } = useContext(UserContext);

  let { tripId } = useParams();

  useEffect(() => {
    fetchTrip();
    fetchTripExperiences();
    fetchAllExperiences();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await getTrip(tripId, user.raw_jwt);
      if (res.status) {
        setTrip({
          name: res.data.name,
          description: res.data.description,
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
      const res = await getTripExperiences(tripId, user.raw_jwt);
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
      const res = await editTrip(tripId, { ...trip }, user.raw_jwt);
      if (res.status) {
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
    <div style={{ textAlign: "center", marginTop: "80px" }}>
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
      </div>
    </>
    
  );
};

export default EditTrip;
