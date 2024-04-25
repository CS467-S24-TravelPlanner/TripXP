import { React, useEffect, useState } from "react";
import { getExperiences } from "../utilities/ExperienceHandler";
import ExperienceList from "../components/ExperienceList";

function ExperienceSearch() {
  const [expList, setExpList] = useState({ data: [] });
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useState("NONE");

  useEffect(() => {
    getExperiences().then((results) => {
      if (searchParams) {
        let updatedExpList = { data: [] };
        for (let i = 0; i < results.data.length; i++) {
          let exp = results.data[i];
          let expKeywords = exp.keywords.toString().split(",");
          for (let j = 0; j < expKeywords.length; j++) {
            if (expKeywords[j] == searchParams) {
              updatedExpList.data.push(exp);
            }
          }
        }
        setExpList(updatedExpList);
      } else {
        setExpList(results);
      }
    });
  }, [searchParams]);

  const handleSubmit = (e) => {
    setSearchParams(searchInput);
    e.preventDefault();
  };

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
    </div>
  );
}

export default ExperienceSearch;
