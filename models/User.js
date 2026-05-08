const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: Number,

    email: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: ["student", "teacher"],
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);