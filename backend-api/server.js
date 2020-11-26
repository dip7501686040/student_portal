// importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Admin from "./models/admin.js";
import Student from "./models/student.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewire
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// DB config
const connection_url =
  "mongodb+srv://dipankar:NCSDsaha@12345@cluster0.7hlou.mongodb.net/student_portal?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//DB operations
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});

//routes
app.post("/", (req, res) => {
  // (err, data) => {
  //     if (err) {
  //       res.status(500).send("Internal Server Error");
  //     } else {
  //       if (data.length) res.status(200).send("Welcome Admin");
  //       else res.status(404).send("User Not Found");
  //     }
  //   }
  console.log(req.body);
  Admin.find({
    user_name: "admin",
    password: "admin",
  }).then((data) => {
    res.send(data);
  });
});

app.post("/students", async (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  const student = new Student({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    university_email: req.body.university_email,
    dob: req.body.dob,
    phone_number: req.body.phone_number,
    address: req.body.address,
    personal_email: req.body.personal_email,
    degree_enrolled: req.body.degree_enrolled,
    college_institute: req.body.college_institute,
    department: req.body.department,
    specialization: req.body.specialization,
    overall_grade: req.body.overall_grade,
    enrollment_status: req.body.enrollment_status,
    timestamp: today,
  });
  try {
    const savedStudent = await student.save();
    res.status(201).send("Student Data Added Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/students", (req, res) => {
  Student.find().then((data) => {
    res.status(200).send(data);
  });
});

app.put("/students/:id", (req, res) => {
  Student.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Student.findOne({ _id: req.params.id }).then(() => {
      res.status(200).send("Student Data Updated Successfully");
    });
  });
});

app.delete("/students/:id", (req, res) => {
  Student.findByIdAndRemove({ _id: req.params.id }).then(() => {
    res.status(200).send("Student Data Deleted Successfully");
  });
});

//listener
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
