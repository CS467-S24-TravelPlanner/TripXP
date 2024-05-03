import React, { useState } from "react";
import Profilepic from "../../assets/profile-picture.jpg";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import AddTripPage from "../AddTripPage/AddTripPage";

const Header = ({ onAddTripClick }) => {
  const [showAddTrip, setShowAddTrip] = useState(false);

  const handleAddTripClick = () => {
    setShowAddTrip(!showAddTrip);
    onAddTripClick(showAddTrip);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="left-section">
          <button className="add-trip-btn" onClick={handleAddTripClick}>
            Add Trip
          </button>
          {showAddTrip && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-button" onClick={handleAddTripClick}>
                  &times;
                </button>
                <AddTripPage />
              </div>
            </div>
          )}
        </div>
        <div className="center-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="right-section">
          <button className="profile-btn">
            <img src={Profilepic} alt="Profile" className="profile-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
