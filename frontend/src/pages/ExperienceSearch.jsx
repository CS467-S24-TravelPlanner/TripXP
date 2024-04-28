import { React, useEffect, useState } from "react";
import { getExperiences } from "../utilities/ExperienceHandler";
import ExperienceList from "../components/ExperienceList";
import ExperienceMap from "../components/ExperienceMap";

function ExperienceSearch() {
  const [expList, setExpList] = useState({ data: [] });
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useState("NONE");

  useEffect(() => {
    // Get all experiences from the DB
    getExperiences().then((results) => {
      if (searchParams) {
        // Create empty list of experiences
        let updatedExpList = { data: [] };
        // Iterate through experiences
        for (let i = 0; i < results.data.length; i++) {
          let exp = results.data[i];
          // Split experience keywords into an array - easier to work with.
          let expKeywords = exp.keywords.toString().split(",");
          // Iterate through experience keywords
          for (let j = 0; j < expKeywords.length; j++) {
            // If matching keyword is found, add that experience to the list
            if (expKeywords[j] == searchParams) {
              updatedExpList.data.push(exp);
              break; // Experience added to list, no need to keep checking keywords
            }
          }
        }
        // Return list of experiences with matching keywords
        setExpList(updatedExpList);
      } else {
        // Return all experiences if no search parameters
        setExpList(results);
      }
    });
  }, [searchParams]);

  // Updates search parameters when submitted - triggers useEffect hook
  const handleSubmit = (e) => {
    setSearchParams(searchInput);
    e.preventDefault();
  };

  // Updates input as it is changed
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={handleChange}
            placeholder="Search for Experiences by Keyword"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <ExperienceList experiences={expList.data} />
      <ExperienceMap experiences={expList.data} />
    </div>
  );
}

export default ExperienceSearch;
