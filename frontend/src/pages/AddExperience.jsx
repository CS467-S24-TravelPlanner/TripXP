import { React, useState, useEffect } from "react";
import ExperienceForm from "../components/ExperienceForm";
import { createExperience, getExperience } from "../utilities/ExperienceHandler";
import { getCoordinates } from "../utilities/LocationService";
import Experience from "../components/ExperiencePage/Experience";
import { useNavigate } from "react-router-dom";

function AddExperience() {
  const [experience, setExperience] = useState(null);

  const [keywords, setKeywords] = useState([]);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      title: e.target.titleInput.value,
      description: e.target.descriptionInput.value,
      location: e.target.locationInput.value,
      keywords: keywords,
      image: e.target.imageUpload.files[0]
    };
    getCoordinates(formData.location).then((response) => {
      const locationData = response.results[0];
      const formattedAddress = locationData.formatted_address;
      const coordinates = locationData.geometry.location;

      createExperience(
        formData.title,
        formData.description,
        coordinates.lat,
        coordinates.lng,
        formData.image,
        5,
        formattedAddress,
        formData.keywords,
        1
      ).then((response) => {
        const expId = response.id;

        getExperience(expId).then((response) => {
            const exp = response.data;
            setExperience(exp);
      });
    });
  })};

  function handleClose() {
    navigate("/profile", {replace: true});
  }

  return (
    (experience) ? 
    <Experience experience={experience} closeExperience={handleClose}/>
    :
    <ExperienceForm handleSubmit={handleSubmit} keywords={keywords} setKeywords={setKeywords} />
    
  );
}

export default AddExperience;
