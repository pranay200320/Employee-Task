const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    enum: ["HR", "Engineering", "Marketing", "Sales", "Finance"],
  },
  profileImage: {
    type: String,
  },
  salary: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  updatedAt: {
    type: String,
    default: new Date(),
  },
});
// employees is name of collections
const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;

// A Mongoose model is a wrapper on the Mongoose schema.
//  A Mongoose schema defines the structure of the document,
// default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating,
//  querying, updating, deleting records, etc.
