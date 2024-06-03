import { React, useEffect, useState, useRef } from "react";
import { getExperiences } from "../utilities/ExperienceHandler";
import Experience from "../components/ExperiencePage/Experience";
import SearchMap from "../components/SearchMap";

// Center of the map when it loads, NYC
const defaultCenter = {
  lat: 40.73061, // default latitude
  lng: -73.935242, // default longitude
};

function ExperienceSearch() {
  // Used to open Experience View page
  const [currentExperience, setCurrentExperience] = useState(null);

  // Current experience list
  const [expList, setExpList] = useState({ data: [] });
  const [expListLoading, setExpListLoading] = useState(true);

  // Map state
  const [bounds, setBounds] = useState(null); // Can be used to search by moving map, not implemented
  const [center, setCenter] = useState(defaultCenter);

  // Search state variables
  const [searchLocation, setSearchLocation] = useState(null); // Coordinates of the search location
  const [searchRadius, setSearchRadius] = useState(160934); // Search radius in meters (def 100 miles)
  const [searchBounds, setSearchBounds] = useState(null); // Search Area on Map

  // The list of Experiences meeting search parameters
  const [filteredExpList, setFilteredExpList] = useState(expList.data);
  const [keywords, setKeywords] = useState([]);
  const [selectedExp, setSelectedExp] = useState(null);

  // Map search radius circle ref
  const circleRef = useRef();

  // This Hook calls the API and loads all Experiences
  useEffect(() => {
    // Get all experiences from the DB
    getExperiences().then((results) => {
      setExpList(results);
      setExpListLoading(false);
    });
  }, []);

  // Opens Experience View when user clicks on Exp in list
  const handleExperienceClick = (exp) => {
    setCurrentExperience(exp);
  };

  // Closes Experience View
  const handleExperienceClose = () => {
    setCurrentExperience(null);
  };

  return currentExperience ? (
    <Experience
      experience={currentExperience}
      closeExperience={handleExperienceClose}
    />
  ) : (
    <SearchMap
      expList={expList}
      expClick={handleExperienceClick}
      bounds={bounds}
      setBounds={setBounds}
      center={center}
      setCenter={setCenter}
      searchLocation={searchLocation}
      setSearchLocation={setSearchLocation}
      searchRadius={searchRadius}
      setSearchRadius={setSearchRadius}
      searchBounds={searchBounds}
      setSearchBounds={setSearchBounds}
      expListLoading={expListLoading}
      filteredExpList={filteredExpList}
      setFilteredExpList={setFilteredExpList}
      keywords={keywords}
      setKeywords={setKeywords}
      selectedExp={selectedExp}
      setSelectedExp={setSelectedExp}
      circleRef={circleRef}
    />
  );
}

export default ExperienceSearch;
