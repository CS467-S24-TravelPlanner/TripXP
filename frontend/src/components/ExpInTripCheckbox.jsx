import * as React from "react";
import { Checkbox, Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import {
  addExperienceToTrip,
  removeExperienceFromTrip,
} from "../utilities/TripHandler";

// This component is used to indicate if an experience in the ExperienceList component
// is included in a trip (if rendered) and handle API calls relating to adding or removing
// an experience from a trip.
export default function ExpInTripCheckbox({ expId, tripId, tripExperiences }) {
  const [expInTrip, setExpInTrip] = useState(false);

  const { user } = useContext(UserContext);

  const showSnackbar = useSnackbar();

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
        const res = await removeExperienceFromTrip(tripId, expId, user.raw_jwt);
        if (res.status) {
          showSnackbar("Experience removed from trip.", "success");
          setExpInTrip(!expInTrip);
        } else {
          showSnackbar("Error removing experience from trip.", "error");
          console.error(`Error removing experience from trip:`, res.error);
        }
      } catch (error) {
        showSnackbar("Error removing experience from trip.", "error");
        console.error("removeExperienceFromTrip error:", error);
      }
    }
    // If exp not in trip, we try to add to trip
    else {
      try {
        const res = await addExperienceToTrip(tripId, expId, user.raw_jwt);
        if (res.status) {
          showSnackbar("Experience added to trip.", "success");
          setExpInTrip(!expInTrip);
        } else {
          showSnackbar("Error adding experience to trip.", "error");
          console.error(`Error adding experience to trip:`, res.error);
        }
      } catch (error) {
        showSnackbar("Error adding experience to trip.", "error");
        console.error("addExperienceToTrip error:", error);
      }
    }
  };

  return <Checkbox checked={expInTrip} onChange={addOrDelFromTrip} />;
}
