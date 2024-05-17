import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import HomePage from "./pages/Home";
import LoginForm from "./pages/Login.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ExperienceSearch from "./pages/ExperienceSearch";
import AddTrip from "./pages/AddTrip.jsx";
import EditTrip from "./pages/EditTrip.jsx";
import NavBar from "./components/NavBar.jsx";
import { UserContext } from "./contexts/UserContext.js";
import TripPage from "./pages/TripPage.jsx";

const App = () => {
  const [user, setUser] = useState(false);

  function handleLoginResponse(res) {
    if (res.credential) {
      try {
        const decode = jwtDecode(res.credential);
        // Add raw jwt to decode/user object for ease of access (e.g. API calls)
        decode.raw_jwt = res.credential;
        setUser(decode);
        console.log(user);
      } catch (err) {
        console.error("JWT Decode failure: ", err);
      }
    } else {
      console.error("Login response error.");
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_IDENTITY_CLIENT_ID,
      callback: handleLoginResponse,
    });
    google.accounts.id.renderButton(document.getElementById("googleLoginBtn"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

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
            {/* TODO Experience Add/Edit page(s) */}
            {/* TODO Trips List Page */}
            <Route path="/trip/:id" component={TripPage} />
            <Route path="/trip/add" element={<AddTrip />} />
            <Route path="/trip/edit/:tripId" element={<EditTrip />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
