import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/Login.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TripPage from "./pages/TripPage.jsx";
import AddTrip from "./pages/AddTrip.jsx";
import ExperienceSearch from "./pages/ExperienceSearch";
import AddExperience from "./pages/AddExperience";
import NavBar from "./components/NavBar.jsx";
import { UserContext } from "./contexts/UserContext.js";
import { handleGoogleLogin } from "./utilities/LoginHandler.jsx";
import { SnackbarProvider } from "./contexts/SnackbarContext";

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

  return (
    <div>
      <SnackbarProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<ExperienceSearch />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/experience/add" element={<AddExperience />} />
              <Route path="/trip/:tripId" element={<TripPage />} />
              <Route path="/trip/add" element={<AddTrip />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </SnackbarProvider>
    </div>
  );
};

export default App;
