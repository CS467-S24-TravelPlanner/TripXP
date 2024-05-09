import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./pages/Home";
import "./App.css";
import ExperienceSearch from "./pages/ExperienceSearch";
import TripPage from "./pages/TripPage";
import LoginForm from "./pages/Login";
import Experience from "./components/ExperiencePage/Experience"

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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<HomePage />} />

          
          <Route path="/experience/:id" element={<ExperiencePage/>}/>
          
        </Routes>
      </Router>
    </div>
  );
};

const ExperiencePage = () => {
  let { id } = useParams();

  return (
    <Experience experience={ id } />
  )
}

export default App;
