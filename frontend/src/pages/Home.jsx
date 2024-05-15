// This is just a temporary HomePage as a placeholder
import React from "react";
import ResponsiveAppBar from "../components/Navbar/Navbar";

function HomePage() {
  return (
    <div>
      <div className="after-nav-display set-centre">
        <h1>TripXP HomePage</h1>

        <a href="/ProfilePage">Profile Page</a>
        <br />

        <a href="/ExperienceSearch">Experience Search</a>
        <br />

        <a href="/TripPage">Trip Page</a>
        <br />

        <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default HomePage;
