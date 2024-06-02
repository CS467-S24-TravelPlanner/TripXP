import React, { useState, useEffect, useContext } from "react";
import userPicture from "../assets/user-solid.svg";
import { getTrips } from "../utilities/TripHandler";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../index.css";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "../contexts/SnackbarContext";

const ProfilePage = () => {
  const showSnackbar = useSnackbar();
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchTrips();
  }, [user]);

  const fetchTrips = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await getTrips(user.user_id, user.raw_jwt);
      if (response.status) {
        setTrips(response.data);
        setTripsLoading(false);
      } else {
        showSnackbar("Server error fetching trips.", "error");
        console.error("Error fetching trips:", response.error);
      }
    } catch (error) {
      showSnackbar("Error fetching trips.", "error");
      console.error("Error fetching trips:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "100px" }}>
          You are not logged in. Please log in to view your trips.
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <img
            src={user ? user.picture : userPicture}
            alt="User Picture"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
          <div>
            <div key={user.id}>
              <h3>{user.username}</h3>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h1>{user ? user.given_name + "'s " : ""}Trips</h1>
          {tripsLoading ? (
            <CircularProgress sx={{ mt: "3rem" }} />
          ) : (
            <div
              style={{
                marginTop: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                gap: "20px",
              }}
            >
              {trips.map((trip) => (
                <Link key={trip.id} to={`/trip/${trip.id}`}>
                  <div
                    style={{
                      marginBottom: "35px",
                      border: "1px solid darkgray ",
                      borderRadius: "5px",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#364958";
                      e.currentTarget.style.borderWidth = "2px";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "darkgray";
                      e.currentTarget.style.borderWidth = "1px";
                    }}
                  >
                    <h2 style={{ margin: 0 }}>{trip.name}</h2>
                    <p style={{ margin: 0 }}>{trip.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ProfilePage;
