import User from "../models/user.models.js";
import zod from "zod";
import jwt from "jsonwebtoken";

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const registerUser = async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Email already exists/ incorrect input",
      });
    }
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
      return res.status(411).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    const userID = newUser._id;
    const createdUser = await User.findById(userID).select("-password");
    if (!createdUser) {
      throw new Error("Failed to create a user");
    }

    const token = jwt.sign(
      {
        userID,
      },
      process.env.JWT_SECRET
    );
    res.status(201).json({
      createdUser,
      message: "User created successfully!",
      token: token,
    });
  } catch (error) {
    console.log("User creation failed");
    throw new Error(error);
  }
};

export { registerUser };
