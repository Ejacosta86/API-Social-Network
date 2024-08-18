const mongoose = require('mongoose');

const formatDate = function (d) {
    return (
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":")
    );
};

const reactSchema = new mongoose.Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
    },
    {
        toJSON:{
            getters: true,
        },
    }
);


const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 256,
        },
        createdAt: {
            type: Date,
            get: formatDate,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        reactions: [reactSchema],
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const Thought = mongoose.model("thoughts", thoughtSchema);

module.exports = Thought;