import React, { useState, useEffect, useContext } from "react";
import userPicture from "../assets/user-solid.svg";
import { getTrips } from "../utilities/TripHandler";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../index.css";

const ProfilePage = () => {
  const [trips, setTrips] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    fetchTrips();
  }, [user]);

  const fetchTrips = async () => {
    try {
      const response = await getTrips(user.user_id, user.raw_jwt);
      console.log(response);
      if (response.status) {
        setTrips(response.data);
      } else {
        console.error("Error fetching trips:", response.error);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

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
        <div
          style={{
            marginTop: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "20px",
            
          }}
        >
          {trips.map((trip) => (
            <Link
              key={trip.id}
              to={`/trip/${trip.id}`}
              
            >
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
                <h2
                  style={{ margin: 0 }}
                >
                  {trip.name}
                </h2>
                <p
                  style={{ margin: 0}}
                >
                  {trip.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
