import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import LoginForm from "./pages/Login.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TripPage from "./pages/TripPage.jsx";
import AddTrip from "./pages/AddTrip.jsx";
import EditTrip from "./pages/EditTrip.jsx";
import ExperienceSearch from "./pages/ExperienceSearch";
import AddExperience from "./pages/AddExperience";
import NavBar from "./components/NavBar.jsx";
import { UserContext } from "./contexts/UserContext.js";
import { handleGoogleLogin } from "./utilities/LoginHandler.jsx";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_IDENTITY_CLIENT_ID,
      callback: (res) => handleGoogleLogin(res, setUser),
    });
    google.accounts.id.renderButton(document.getElementById("googleLoginBtn"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/experiences" element={<ExperienceSearch />} />
            <Route path="/experience/add" element={<AddExperience />} />
            {/* TODO Experience Edit page */}
            <Route path="/trip/:tripId" element={<TripPage />} />
            <Route path="/trip/:tripId" element={<TripPage />} />
            <Route path="/trip/add" element={<AddTrip />} />
            <Route path="/trip/edit/:tripId" element={<EditTrip />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
