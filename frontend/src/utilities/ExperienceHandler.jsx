import { postData, getData, patchData, deleteData } from "./ApiService.jsx";

/**
 * createExperience adds a new Experience to the Database.
 * The return value is the response from the server in JSON format.
 * @param {string} title - The title of the new Experience.
 * @param {string} description - The description of the new Experience.
 * @param {number} latitude - The latitude of the location of the new Experience.
 * @param {number} longitude - The longitude of the location of the new Experience.
 * @param {string} image_url - The URL of the image for the new Experience. (defaults to "")
 * @param {number} rating - The rating of the new Experience. (defaults to 0)
 * @param {string} location - A string describing the location of the new Experience. (defaults to "")
 * @param {JSON} keywords - The keywords associated with the new Experience. (defaults to {})
 * @param {number} user_id - An ID of the User creating the new Experience.
 */
function createExperience(
  title,
  description,
  latitude,
  longitude,
  image = "",
  rating = 0,
  location = "",
  keywords = {},
  user_id
) {
  const newExperience = {
    title: title,
    description: description,
    latitude: latitude,
    longitude: longitude,
    image: image,
    rating: rating,
    location: location,
    keywords: keywords,
    user_id: user_id,
  };

  return postData("/experience", {}, newExperience);
}

/**
 * getExperience returns the experience matching the given ID from the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} experienceId - The ID of the Trip.
 */
function getExperience(experienceId) {
  return getData("/experience/" + experienceId);
}

/**
 * getExperiences returns Experiences matching the search parameters from the Database.
 * The return value is the response from the server in JSON format.
 * @param {JSON} searchParams - The optional search parameters for desired Experience(s).
 */
function getExperiences(searchParams = {}) {
  return getData("/experience", searchParams);
}

/**
 * editExperience modifies an existing Experience in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the Experience being modified.
 * @param {JSON} newData - The key/value pairs being modified.
 */
function editExperience(id, newData = {}) {
  const idObj = { id: id };
  const oldExperience = getExperiences(idObj);

  const newExperience = Object.keys(newData).length
    ? { ...idObj, ...newData }
    : oldExperience;

  return patchData("/experience", newExperience);
}

/**
 * deleteExperience removes an existing Experience in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the Experience being deleted.
 */
function deleteExperience(id) {
  return deleteData("/experience", { id: id });
}

export {
  createExperience,
  editExperience,
  getExperience,
  getExperiences,
  deleteExperience,
};
