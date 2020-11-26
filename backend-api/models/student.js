import mongoose from "mongoose";

const Schema = mongoose.Schema;

let student = new Schema({
  first_name: String,
  last_name: String,
  university_email: String,
  dob: String,
  phone_number: String,
  address: String,
  personal_email: String,
  degree_enrolled: String,
  college_institute: String,
  department: String,
  specialization: String,
  overall_grade: String,
  enrollment_status: String,
  timestamp: String,
});

export default mongoose.model("students", student);
