import { User } from "../db.js";

const userMiddleware = async (req, res, next) => {
  try {
    if (!req.auth) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findOne({ where: { jwt_unique: req.auth.sub } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user object to the request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default userMiddleware;
