import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./pages/Home";
import "./App.css";
import ExperienceSearch from "./pages/ExperienceSearch";
import LoginForm from "./pages/Login.jsx";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/ExperienceSearch" element={<ExperienceSearch />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>

      <HomePage />
    </div>
  );
};

export default App;
