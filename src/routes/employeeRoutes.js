const express = require("express");
const router = express.Router();
const Employee = require("./src/models/employee");

router.post("/emp", async (req, res) => {
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

module.exports = router;
