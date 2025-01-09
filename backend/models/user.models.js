import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 4,
      maxLength: 30,
      trim: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
