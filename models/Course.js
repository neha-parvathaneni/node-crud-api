const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    credits: {
        type: Number,
        required: true
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

});
module.exports = mongoose.model("Course", courseSchema);