import { React, useEffect, useState } from "react";
import { getExperiences } from "../utilities/ExperienceHandler";
import Experience from "../components/ExperiencePage/Experience";
import SearchMap from "../components/SearchMap";

function ExperienceSearch() {

  // Current experience list
  const [expList, setExpList] = useState({ data: [] });

  // Used to open Experience View page
  const [currentExperience, setCurrentExperience] = useState(null);

  // This Hook calls the API and loads all Experiences
  useEffect(() => {
    // Get all experiences from the DB
    getExperiences().then((results) => {
        setExpList(results);
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
    <SearchMap expList={expList} expClick={handleExperienceClick} />
  );
}

export default ExperienceSearch;
