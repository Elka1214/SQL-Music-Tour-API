// Dependencies
const events = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");
const { Event } = db;

// Index Route
events.get("/", async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      offset: req.query.page ? (req.query.page - 1) * 10 : 0,
      limit: 10,
      order: [["date", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundEvents);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Show Route
events.get("/:id", async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { event_id: req.params.id },
    });
    res.status(200).json(foundEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Route
events.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new event",
      data: newEvent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Route
events.post("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: { event_id: req.params.id },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedEvent} event`,
      data: updatedEvent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Route
events.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.destroy({
      where: { event_id: req.params.id },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedEvent} event`,
      data: deletedEvent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export
module.exports = events;
