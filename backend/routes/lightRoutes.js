"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/lightController.js");

// Fetch all lights
router.get("/allligths", controller.alllights);

// Change state of light
router.post("/lights/:id", controller.changelight);

// router.get("/lights/:id", controller.getspecificlight);

module.exports = router;
