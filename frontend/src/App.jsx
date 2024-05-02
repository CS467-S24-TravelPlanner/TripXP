import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./pages/Home";
import "./App.css";
import ExperienceSearch from "./pages/ExperienceSearch";
import TripPage from "./pages/TripPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/ExperienceSearch" element={<ExperienceSearch />} />
          <Route
            path="/TripPage"
            element={
              <TripPage
                trip={{
                  id: 1,
                  name: "First Test Trip",
                  description: "Super awesome trip.",
                  user_id: 1,
                  createdAt: "2024-04-20T11:57:45.000Z",
                  updatedAt: "2024-04-20T13:09:36.000Z",
                }}
              />
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
