const mongoose = require("mongoose");

const { Schema } = mongoose;

const sleepSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    improveSleep: String,
    strugglingDuration: String,
    sleepTime: String,
    wakeUpTime: String,
    sleepDuration: Number,
});

module.exports = mongoose.model("SleepRecords", sleepSchema);
