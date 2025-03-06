import jwt from "jsonwebtoken";

export const managerMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const userInfo = jwt.decode(authHeader, "sceret");
    if (userInfo.role !== "manager") {
      return res.status(401).json({ message: "UnAuthorize" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const operatorMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const userInfo = await jwt.decode(authHeader, "sceretoperator");
    if (userInfo.role === "operator") {
      next();
    }
    return res.status(401).json({ message: "UnAuthorize" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
