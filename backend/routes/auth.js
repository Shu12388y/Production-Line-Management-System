import { Router } from "express";
import { User } from "../models/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/auth/register", async (req, res) => {
  try {
    const { data } = await req.body;
    if (!data) {
      return res.status(402).json({ message: "No request body" });
    }
    const findUsername = await User.findOne({
      username: data.username,
    });

    if (findUsername) {
      return res.status(403).json({ message: "User alreay exist" });
    }
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const createUser = await new User({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      department: data.department,
    });
    await createUser.save();
    return res.status(201).json({ message: "Created" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

authRouter.get("/auth/login", async (req, res) => {
  try {
    const { data } = await req.body;
    if (!data) {
      return res.status(402).json({ message: "No request body" });
    }
    const findUsername = await User.findOne({
      username: data.username,
    });

    if (!findUsername) {
      return res.status(402).json({ message: "User not found" });
    }

    const checkPassword = await bcryptjs.compare(
      data.password,
      findUsername.password
    );

    if (!checkPassword) {
      return res.status(402).json({ message: "Wrong Password" });
    }

    const userInfo = {
      userId: findUsername._id,
      role: findUsername.role,
    };
    if (findUsername.role == "manager") {
      const createToken = await jwt.sign(userInfo, "sceret", {
        expiresIn: 20 * 50,
      });
      return res.status(200).json({ message: createToken });
    }
    const createToken = await jwt.sign(userInfo, "sceretoperator", {
      expiresIn: 20 * 50,
    });
    return res.status(200).json({ message: createToken });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});
