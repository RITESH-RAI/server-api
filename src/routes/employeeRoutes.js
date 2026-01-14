const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");


//TODO: GET all employees
router.get("/employee-list", async (req, res) => {
  try {
    const employees = await Employee.find({}, { name: 1});

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Server error (GET)",
    });
  }
});

router.post("/employee-create", async (req, res) => {
  try {
    const { name, password, address } = req.body;

    // sanity check
    if (!name || !password || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const employee = await Employee.create({
      name,
      password,
      address,
    });

    res.status(201).json({
      message: "Employee created",
      employee,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

//TODO: PUT - Update Employees

router.put("/employee-update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, address } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        password,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error (PUT)",
      error: error.message
    });
  }
});

//TODO: DELETE Endpoint for Employee deletion
router.delete("/employee-delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEmployee = await Employee.findByIdAndDelete(id);

    if (!deleteEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {

    res.status(500).json({
      message: "Server error (DELETE)",
      error: error.message,
    })
  }
});
module.exports = router;
