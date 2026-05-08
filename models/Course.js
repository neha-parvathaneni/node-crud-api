const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    code: String,

    title: String,

    credits: Number,

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Course", courseSchema);