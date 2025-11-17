const express = require("express");
const router = express.Router();

let appointments = [];

router.post("/book", (req, res) => {
  try {
    const { name, date, doctor } = req.body;

    if (!name || !date || !doctor) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAppointment = {
      id: Date.now().toString(),
      name,
      date,
      doctor,
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);

    res.json({
      success: true,
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/appointments", (req, res) => {
  res.json({
    success: true,
    data: appointments,
  });
});

router.delete("/appointments/:id", (req, res) => {
  try {
    const { id } = req.params;
    const initialLength = appointments.length;

    appointments = appointments.filter((appointment) => appointment.id !== id);

    if (appointments.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
