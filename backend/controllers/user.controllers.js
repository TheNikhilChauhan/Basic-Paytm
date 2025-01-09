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

const signinBody = zod.object({
  username: zod.string().email(),
  password: string(),
});

const signinUser = async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userID: user._id,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
    });

    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
};

const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

const updateUser = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, {
    id: req.userID,
  });

  res.json({
    message: "Updated successfully",
  });
};

const searchUsers = async (req, res) => {
  const filter = req.body.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    })),
  });
};

export { registerUser, signinUser, updateUser, searchUsers };
