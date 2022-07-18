import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
