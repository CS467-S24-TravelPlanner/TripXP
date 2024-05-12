import * as React from "react";
import { Checkbox, Box } from "@mui/material";
import { useState, useEffect } from "react";
import {
  addExperienceToTrip,
  removeExperienceFromTrip,
} from "../utilities/TripHandler";

// This component is used to indicate if an experience in the ExperienceList component
// is included in a trip (if rendered) and handle API calls relating to adding or removing
// an experience from a trip.
export default function ExpInTripCheckbox({ expId, tripId, tripExperiences }) {
  const [expInTrip, setExpInTrip] = useState(false);

  useEffect(() => {
    setExpInTrip(evalExpInTrip(expId, tripExperiences));
  }, []);

  const evalExpInTrip = (expId, tripExperiences) => {
    let inTrip = tripExperiences.find((exp) => exp.id === expId);
    // stupid necessity because the checked prop below does not eval undefined as falsey=
    return inTrip ? true : false;
  };

  const addOrDelFromTrip = async (e) => {
    // If exp in trip, we try to delete from trip
    if (expInTrip) {
      try {
        const res = await removeExperienceFromTrip(tripId, expId);
        if (res.status) {
          console.log(
            `Experience ${expId} removed from ${tripId} successfully.`
          );
          setExpInTrip(!expInTrip);
        } else {
          console.error(`Error removing experience from trip:`, res.error);
        }
      } catch (error) {
        console.error("removeExperienceFromTrip error:", error);
      }
    }
    // If exp not in trip, we try to add to trip
    else {
      try {
        console.log("tripId: ", tripId, ", expId: ", expId);
        const res = await addExperienceToTrip(tripId, expId);
        if (res.status) {
          console.log(`Experience ${expId} added to ${tripId} successfully.`);
          setExpInTrip(!expInTrip);
        } else {
          console.error(`Error adding experience to trip:`, res.error);
        }
      } catch (error) {
        console.error("addExperienceToTrip error:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: 100,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Checkbox checked={expInTrip} onChange={addOrDelFromTrip} />
    </Box>
  );
}
