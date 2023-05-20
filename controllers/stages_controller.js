// Dependencies
const stages = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");
const { Stage } = db;

// Index Route
stages.get("/", async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
      offset: req.query.page ? (req.query.page - 1) * 10 : 0,
      limit: 10,
      where: {
        stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundStages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Show Route
stages.get("/:id", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_id: req.params.id },
    });
    res.status(200).json(foundStage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Route
stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new stage",
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Route
stages.post("/:id", async (req, res) => {
  try {
    const updatedStage = await Stage.update(req.body, {
      where: { stage_id: req.params.id },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStage} stage`,
      data: updatedStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Route
stages.delete("/:id", async (req, res) => {
  try {
    const deletedStage = await Stage.destroy({
      where: { stage_id: req.params.id },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStage} stage`,
      data: deletedStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export
module.exports = stages;
