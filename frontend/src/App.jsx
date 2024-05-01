import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/ProfilePage' element={<ProfilePage />}>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
