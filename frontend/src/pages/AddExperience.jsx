import { React, useState, useEffect } from "react";
import ExperienceForm from "../components/ExperienceForm";
import { createExperience, getExperience } from "../utilities/ExperienceHandler";
import { getCoordinates } from "../utilities/LocationService";
import Experience from "../components/ExperiencePage/Experience";
import { useNavigate } from "react-router-dom";


const apiUrl = import.meta.env.VITE_API_BASE_URL;

function AddExperience() {
  const [experience, setExperience] = useState(null);

  const [keywords, setKeywords] = useState([]);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.target.imageUpload.files[0])

    const formData = {
      title: e.target.titleInput.value,
      description: e.target.descriptionInput.value,
      location: e.target.locationInput.value,
      keywords: keywords,
      image: e.target.imageUpload.files[0]
    };
    getCoordinates(formData.location).then(async (response) => {

         let imageData = new FormData(); 
         imageData.append("uploaded_file", formData.image);
         fetch(apiUrl + "/imageUpload", {
         method: 'POST',
         body: imageData,
         })
        

      const locationData = response.results[0];
      const formattedAddress = locationData.formatted_address;
      const coordinates = locationData.geometry.location;

      createExperience(
        formData.title,
        formData.description,
        coordinates.lat,
        coordinates.lng,
        formData.image.name,
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
