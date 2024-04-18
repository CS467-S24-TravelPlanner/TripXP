import { 
  findExperience, 
  createExperience as _createExperience, 
  updateExperience as _updateExperience, 
  deleteExperience as _deleteExperience, 
  findAllExperiences 
} from "./../../common/models/Experience.js";

export function getExperience(req, res) {
  const {
    experience: { experienceId }, } = req;

  findExperience({ id: experienceId })
    .then((experience) => {
      return res.status(200).json({
        status: true,
        data: experience.toJSON(),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// Create a new Experience
export function createExperience(req, res) {
  const {
    body: payload, } = req;

    console.log(payload);

  // Return Error if no Payload provided
  if (!Object.keys(payload).length) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Body is empty, can't create the experience.",
      },
    });
  }

  // Returns a 200 status and Success message upon successful creation
  _createExperience(payload)
    .then(() => {
      return res.status(200).json({
        status: true,
        data: "Successfully created new experience.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// Update an existing Experience
export function updateExperience(req, res) {
  const {
    experience: { experienceId }, body: payload, } = req;

  console.log(payload);

  // If the payload does not have any keys,
  // Return an error, as nothing can be updated
  if (!Object.keys(payload).length) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Body is empty, can't update the experience.",
      },
    });
  }

  // Returns a 200 status and Success message upon successful update
  _updateExperience({ id: experienceId }, payload)
    .then(() => {
      return findExperience({ id: experienceId });
    })
    .then((experience) => {
      return res.status(200).json({
        status: true,
        data: experience.toJSON(),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// Delete exitisting Experience
export function deleteExperience(req, res) {
  const {
    params: { experienceId }, } = req;

    // Returns a 200 status and number of deleted experiences upon succes
  _deleteExperience({ id: experienceId })
    .then((numberOfEntriesDeleted) => {
      return res.status(200).json({
        status: true,
        data: {
          numberOfExperiencesDeleted: numberOfEntriesDeleted
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

// Return all Experiences in DB
export function getAllExperiences(req, res) {
  findAllExperiences(req.query)
    .then((experiences) => {
      return res.status(200).json({
        status: true,
        data: experiences,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}

//export default ExperienceController;