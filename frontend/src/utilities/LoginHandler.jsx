import { getUser, createUser } from "./UserHandler.jsx";
import { jwtDecode } from "jwt-decode";

/**
 * handleGoogleLogin assists to:
 * 1. Decodes the JWT from google for use as user state in app.
 * 2. Checks if user exists in the Users table in DB.
 * 3. If user does not exist, create new user in DB.
 * The function further appends the 'raw_jwt' and local app 'user_id' values to
 * the decoded jwt object and sets this as user state.
 * @param {object} res - response object from google identity login via client id
 * @param {function} userSetter - useState setter function for the user piece of state
 */
async function handleGoogleLogin(res, userSetter) {
  if (!res.credential) {
    console.error("Login response error.");
    return;
  }

  const decodedJwt = decodeJwt(res.credential);
  if (!decodedJwt) return;

  const userExists = await checkUserExists(res.credential);
  if (userExists) {
    userSetter({
      ...decodedJwt,
      raw_jwt: res.credential,
      user_id: userExists.id,
    });
  } else {
    await createUserInDb(decodedJwt, res.credential);
  }
}

function decodeJwt(credential) {
  try {
    const decoded = jwtDecode(credential);
    console.log(decoded);
    return decoded;
  } catch (err) {
    console.error("JWT Decode failure: ", err);
    return null;
  }
}

async function checkUserExists(credential) {
  try {
    const userRes = await getUser(credential);
    if (userRes.status === true) {
      return userRes.data;
    } else if (userRes.status === false) {
      return null;
    } else {
      console.error("User fetch failed", userRes.error);
      return null;
    }
  } catch (err) {
    console.error("Error validating user:", err);
    return null;
  }
}

async function createUserInDb(decodedJwt, credential, userSetter) {
  try {
    const createUserRes = await createUser(
      decodedJwt.email,
      decodedJwt.email,
      credential
    );
    if (createUserRes.status) {
      userSetter({
        ...decodeJwt,
        raw_jwt: res.credential,
        user_id: createUserRes.id,
      });
      console.log("New user created successfully in DB.");
    } else {
      console.log("User not able to be created.");
    }
  } catch (err) {
    console.error("Create user failed", err);
  }
}

export { handleGoogleLogin };
