import { User } from "../db.js";
import { createUser } from "../common/models/User.js";

const userMiddleware = async (req, res, next) => {
  try {
    if (!req.auth) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let user = await User.findOne({ where: { jwt_unique: req.auth.sub } });
    if (!user) {
      const newUser = {
        username: req.auth.email,
        email: req.auth.email,
        jwt_unique: req.auth.sub,
      };
      try {
        const createRes = await createUser(newUser);
        if (createRes) {
          user = await User.findOne({ where: { jwt_unique: req.auth.sub } });
        } else {
          throw new Error("User creation failure.");
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: false,
          error: err.message,
        });
      }
    }

    // Attach user object to the request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default userMiddleware;
