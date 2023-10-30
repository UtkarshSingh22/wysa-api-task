const SleepRecords = require("../models/sleepRecords");

exports.submitSleepDetails = async (req, res) => {
    try {
        const { userid: userId } = req.headers;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: "No user id found",
            });
        }

        if (!req.body) {
            return res.status(400).json({
                success: false,
                error: "No sleep data found",
            });
        }

        const newSleepData = new SleepRecords({ ...req.body, userId });
        await newSleepData.save();

        return res.json({
            success: true,
            sleepEfficiency: 90, // hardcoded sleep efficiency value
            message: "Sleep data submitted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "An error occurred while submitting sleep data",
        });
    }
};
