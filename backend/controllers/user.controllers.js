import User from "../models/user.models.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import Account from "../models/account.models.js";

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
    const userId = newUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const createdUser = await User.findById(userId).select("-password");
    if (!createdUser) {
      throw new Error("Failed to create a user");
    }

    const token = jwt.sign(
      {
        userId,
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
  password: zod.string(),
});

const signinUser = async (req, res) => {
  const validationResult = signinBody.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResult.error.format(), // Provide detailed error messages
    });
  }

  const { username, password } = validationResult.data;

  const user = await User.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
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
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
};

const searchUsers = async (req, res) => {
  const filter = req.query.filter?.trim() || "";

  try {
    const users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: filter,
            $options: "i",
          },
        },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({
        msg: "No users found",
      });
    }

    res.json({
      users: users.map((user) => ({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "An error occurred while searching for users",
    });
  }
};

export { registerUser, signinUser, updateUser, searchUsers };
