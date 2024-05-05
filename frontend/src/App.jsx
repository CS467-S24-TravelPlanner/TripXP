import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/Home";
import "./App.css";
import ExperienceSearch from "./pages/ExperienceSearch";
import ViewTrip from "./pages/ViewTrip";
import LoginForm from "./pages/Login";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/experiencesearch" element={<ExperienceSearch />} />
          <Route
            path="/trip"
            element={
              <ViewTrip
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
          <Route path="/trip/add" element={<AddTrip />} />
          <Route path="/trip/edit/:tripId" element={<EditTrip />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
