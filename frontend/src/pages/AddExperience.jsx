import { React, useState, useEffect, useContext } from "react";
import ExperienceForm from "../components/ExperienceForm";
import {
  createExperience,
  getExperience,
} from "../utilities/ExperienceHandler";
import { getCoordinates } from "../utilities/LocationService";
import Experience from "../components/ExperiencePage/Experience";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utilities/ImageHandler";
import { UserContext } from "../contexts/UserContext";

function AddExperience() {
  const [experience, setExperience] = useState(null);

  const [keywords, setKeywords] = useState([]);

  const { user } = useContext(UserContext);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      title: e.target.titleInput.value,
      description: e.target.descriptionInput.value,
      location: e.target.locationInput.value,
      keywords: keywords,
      image: e.target.imageUpload.files[0],
    };
    getCoordinates(formData.location).then(async (response) => {

      uploadImage(formData).then(async (imgRes) => {
        const locationData = response.results[0];
        const formattedAddress = locationData.formatted_address;
        const coordinates = locationData.geometry.location;
        const filepath = imgRes.filename;

        createExperience(
          formData.title,
          formData.description,
          coordinates.lat,
          coordinates.lng,
          filepath,
          5,
          formattedAddress,
          formData.keywords,
          user.user_id ? user.user_id : 1
        ).then((response) => {
          const expId = response.id;

          getExperience(expId).then((response) => {
            const exp = response.data;
            setExperience(exp);
          });
        });
      });
    });
  }

  function handleClose() {
    navigate("/profile", { replace: true });
  }

  return (
    <div>
      {experience ? (
        <>
          
          <Experience experience={experience} closeExperience={handleClose} />
        </>
      ) : (
        <>
          <h1 style={{ marginTop: "80px" }}>Share your Travel Adventure</h1>
          <h2>Tell us about your Experience:</h2>
          <ExperienceForm
            handleSubmit={handleSubmit}
            keywords={keywords}
            setKeywords={setKeywords}
          />
        </>
      )}
    </div>
  );
}

export default AddExperience;
