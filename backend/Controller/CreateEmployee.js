const EmployeeModel = require("../Models/EmplooyeModels");

const createEmployeeList = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file?.path : null;
    const emp = new EmployeeModel(body);
    await emp.save();
    console.log("✅ Employee Created Successfully:");
    res.status(201).json({
      message: "Employee Created",
      success: true,
      data: emp,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
};
const getAllEmployee = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    let skip = (page - 1) * limit;
    //page = 1 => (1-1)*5 = 0 skip
    //page = 2 => (2-1)*5 = 5 skip
    //page = 3 => (3-1)*5 = 10 skip

    let seararchCritria = {};
    if (search) {
      seararchCritria = {
        name: {
          $regex: search,
          $regex: `^${search}$`, // Matches exact case-sensitive name
          // $regex: 'i'          //case-insentive
        },
      };
    }

    const totalEmployess = await EmployeeModel.countDocuments(seararchCritria);

    const emps = await EmployeeModel.find(seararchCritria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployess / limit);
    console.log("✅ Get ALL Employee Data Successfully:");
    res.status(200).json({
      message: "ALL Employee List",
      success: true,
      data: {
        employess: emps,
        pagination: {
          totalEmployess,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
};
const getEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });
    console.log("✅ Get Employee Details Successfully:");
    res.status(200).json({
      message: "Employee  Details",
      success: true,
      data: emp,
    });
  } catch (error) {
    console.error(message.error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
    console.log("✅ Deleted Employee Details  Successfully:");
    res.status(200).json({
      message: "Employee  Delete",
      success: true,
    });
  } catch (error) {
    console.error(message.error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
};

// Update List

const UpdateEmployee = async (req, res) => {
  try {
    const { name, phone, email, salary, department } = req.body;
    const { id } = req.params;
    let updateData = {
      name,
      email,
      phone,
      salary,
      department,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }
    const updateEmp = await EmployeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateData) {
      return res.status(404).json({
        message: "Employee Updated Lisdt Not Found",
      });
    }
    console.log("✅Update Employee Details Successfully:");
    res.status(200).json({
      message: "Employee Created",
      success: true,
      data: updateEmp,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createEmployeeList,
  getAllEmployee,
  getEmployeeDetails,
  deleteEmployee,
  UpdateEmployee,
};
// In Node.js, a controller handles incoming requests and sends responses back to the client.
//  Controllers are often used in the Model-View-Controller (MVC) architecture.
