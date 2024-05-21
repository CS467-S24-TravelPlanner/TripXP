import {
  findUser,
  updateUser as _updateUser,
  deleteUser as _deleteUser,
} from "./../../common/models/User.js";

// -----*** READ ***------

// Find user calling the request via auth'd JWT.
// If no match, returns a 404 with user not found message.
export async function getUser(req, res) {
  try {
    const user = await findUser({ jwt_unique: req.auth.sub });
    if (user) {
      return res.status(200).json({
        status: true,
        data: user.toJSON(),
      });
    } else {
      return res.status(404).json({
        status: false,
        error: {
          message: "User not found.",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** UPDATE ***------

// Update an existing User
export async function updateUser(req, res) {
  const { body: payload } = req;

  // If the payload does not have any keys,
  // Return an error, as nothing can be updated
  if (!Object.keys(payload).length) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Body is empty, can't update the user.",
      },
    });
  } else if ("jwt_unique" in payload) {
    return res.status(400).json({
      status: false,
      error: { message: "Body contains disallowed keys." },
    });
  }

  try {
    await _updateUser({ jwt_unique: req.auth.sub }, payload);
    return res.status(200).json({
      status: true,
      data: "Successfully updated user.",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}

// -----*** DELETE ***------

// Delete existing User
export async function deleteUser(req, res) {
  try {
    await _deleteUser({ jwt_unique: req.auth.sub });
    return res.status(200).json({
      status: true,
      data: "Successfully deleted user.",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
    });
  }
}
