import { getUser } from "./UserHandler.jsx";
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
    console.error("Google authentication response error.");
    return;
  }

  const decodedJwt = decodeJwt(res.credential);
  if (!decodedJwt) return;

  try {
    const dbUser = await getUser(res.credential);
    if (dbUser.status === true) {
      userSetter({
        ...decodedJwt,
        raw_jwt: res.credential,
        user_id: dbUser.data.id,
      });
    } else {
      console.error("User fetch failed", dbUser.error);
      return;
    }
  } catch (err) {
    console.error("Error getting user:", err);
    return;
  }
}

function decodeJwt(credential) {
  try {
    const decoded = jwtDecode(credential);
    return decoded;
  } catch (err) {
    console.error("JWT Decode failure: ", err);
    return;
  }
}

export { handleGoogleLogin };
