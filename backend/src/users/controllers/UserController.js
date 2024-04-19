import { 
    findUser, 
    createUser as _createUser, 
    updateUser as _updateUser, 
    deleteUser as _deleteUser, 
    findAllUsers 
  } from "./../../common/models/User.js";
  
  // Find user by ID
  export function getUser(req, res) {
    //const { body: payload, } = req;

    findUser()
      .then((user) => {
        if (user.data.length < 1) {
          return res.status(400).json({
            status: false,
            data: "User not found"
          })
        }
        
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // Create a new User
  export function createUser(req, res) {
    const { body: payload, } = req;
  
    // Return Error if no Payload provided
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, can't create the user.",
        },
      });
    }
  
    // Returns a 200 status and Success message upon successful creation
    _createUser(payload)
      .then(() => {
        return res.status(200).json({
          status: true,
          data: "Successfully created new user.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // Update an existing User
  export function updateUser(req, res) {
    const { body: payload, } = req;
  
    const userId = payload.id;
  
    // If the payload does not have any keys,
    // Return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, can't update the user.",
        },
      });
    }
  
    // Returns a 200 status and Success message upon successful update
    _updateUser({ id: userId }, payload)
      .then(() => {
        return res.status(200).json({
          status: true,
          data: "Successfully updated user.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // Delete exitisting User
  export function deleteUser(req, res) {
    const { params: { userId }, } = req;
  
      // Returns a 200 status and number of deleted users upon succes
    _deleteUser({ id: userId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfUsersDeleted: numberOfEntriesDeleted
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
  
  // Return all Users in DB
  export function getAllUsers(req, res) {
    findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  //export default UserController;