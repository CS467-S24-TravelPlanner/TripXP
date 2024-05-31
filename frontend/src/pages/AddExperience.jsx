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
import { useSnackbar } from "../contexts/SnackbarContext";

function AddExperience() {
  const [experience, setExperience] = useState(null);
  const [keywords, setKeywords] = useState([]);

  const { user } = useContext(UserContext);
  const showSnackbar = useSnackbar();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      showSnackbar("Please log in to create an experience.", "error");
      return;
    }

    if (
      e.target.titleInput.value === "" ||
      e.target.descriptionInput.value === "" ||
      e.target.locationInput.value === "" ||
      e.target.imageUpload.files.length === 0
    ) {
      showSnackbar("Please fill out all fields.", "error");
      return;
    }

    const formData = {
      title: e.target.titleInput.value,
      description: e.target.descriptionInput.value,
      location: e.target.locationInput.value,
      keywords: keywords,
      image: e.target.imageUpload.files[0],
    };

    try {
      const response = await getCoordinates(formData.location);
      const imgRes = await uploadImage(formData);

      const locationData = response.results[0];
      const formattedAddress = locationData.formatted_address;
      const coordinates = locationData.geometry.location;
      const filepath = imgRes.filename;

      const createExpResponse = await createExperience(
        formData.title,
        formData.description,
        coordinates.lat,
        coordinates.lng,
        filepath,
        5,
        formattedAddress,
        formData.keywords,
        user.user_id ? user.user_id : 1
      );

      if (!createExpResponse.status) {
        showSnackbar("Error creating experience.", "error");
        console.error("Error creating experience:", createExpResponse.message);
        return;
      }

      showSnackbar("Experience created successfully!", "success");
      const expId = createExpResponse.id;

      const expResponse = await getExperience(expId);
      const exp = expResponse.data;
      setExperience(exp);
    } catch (error) {
      console.error("Error creating or fetching new experience:", error);
      showSnackbar("An error occurred. Please try again.", "error");
    }
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
