import React, { useState, useEffect } from "react";
import userPicture from "../assets/user-solid.svg";
import { getTrips } from "../utilities/TripHandler";
import { getUser } from "../utilities/UserHandler";
import { Link } from "react-router-dom";


const ProfilePage = () => {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await getTrips({ user_id: 2 });
      if (response.status) {
        setTrips(response.data);
      } else {
        console.error("Error fetching trips:", response.error);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await getUser({ id: 2 });
      if (response.status) {
        setUser(response.data);
      } else {
        console.error("Error fetching trips:", response.error);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <img
          src={userPicture}
          alt="User Picture"
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
        />
        <div>
          {user.map((user) => (
            <div key={user.id}>
              <h3>{user.username}</h3>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>My Trips</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {trips.map((trip) => (
             <Link
             key={trip.id}
             to={`/trip/${trip.id}`}
             style={{ textDecoration: "none", color: "inherit" }}
           >
             <div
               style={{
                 border: "1px solid #ddd",
                 borderRadius: "5px",
                 padding: "10px",
                 cursor: "pointer",
               }}
               onMouseOver={(e) => {
                 e.currentTarget.style.borderColor = "#3498db";
                 e.currentTarget.style.borderWidth = "3px";
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.borderColor = "#ddd";
                 e.currentTarget.style.borderWidth = "1px";
               }}
             >
               <h3 style={{ margin: 0, textDecoration: "none", color: "black" }}>{trip.name}</h3>
               <p style={{ margin: 0, textDecoration: "none", color: "black" }}>{trip.description}</p>
             </div>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
