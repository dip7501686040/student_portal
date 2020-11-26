import mongoose from "mongoose";
const Schema = mongoose.Schema;
let admin = new Schema({
  user_name: String,
  password: String,
});

export default mongoose.model("admins", admin);
