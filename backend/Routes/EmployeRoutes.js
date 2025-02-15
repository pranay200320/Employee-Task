const express = require("express");
const { cloudinaryFileUploder } = require("../Middelware/FileUploder");
const {
  createEmployeeList,
  getAllEmployee,
  getEmployeeDetails,
  deleteEmployee,
  UpdateEmployee,
} = require("../Controller/CreateEmployee");

const router = express.Router();
router.get("/", getAllEmployee);

router.post(
  "/",
  cloudinaryFileUploder.single("profileImage"),
  createEmployeeList
); // Middleware + Controller
router.put(
  "/:id",
  cloudinaryFileUploder.single("profileImage"),
  UpdateEmployee
); // Middleware + Controller
router.get("/:id", getEmployeeDetails);
router.delete("/:id", deleteEmployee);

module.exports = router;
