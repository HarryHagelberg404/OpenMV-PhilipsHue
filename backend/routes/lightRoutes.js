"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/lightController.js");

router.get("/", controller.initSubsription);
// Fetch all lights
router.get("/allligths", controller.alllights);

// Change state of boolean if a person is infront of camera
// router.post("/person/toggleperson", controller.togglePerson);

// Change state of light
router.post("/lights/:id", controller.changelight);

// router.get("/lights/:id", controller.getspecificlight);

module.exports = router;
