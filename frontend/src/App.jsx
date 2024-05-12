import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.jsx"
import HomePage from "./pages/Home";
import "./App.css";
import ExperienceSearch from "./pages/ExperienceSearch";
import LoginForm from "./pages/Login.jsx";
import ViewTrip from "./pages/ViewTrip.jsx";

const App = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: REACT_APP_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client auth2", start);
  });
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
          <Route path="/login" element={<LoginForm />} />
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
