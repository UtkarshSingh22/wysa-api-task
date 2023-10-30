const express = require("express");
const sleepController = require("../controllers/sleepDetails.js");
const { requireSignIn } = require("../middlewares/index.js");

const router = express.Router();

router.post(
    "/sleep-details",
    requireSignIn,
    sleepController.submitSleepDetails
);

module.exports = router;
