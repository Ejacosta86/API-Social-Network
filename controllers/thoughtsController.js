const { Thought, User } = require("../models");

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
            .populate('thoughts');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //single thought
    async getSingleThought( req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .populate('thoughts');

            if(!course) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a thouoght
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});

            if(!course) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            await Thought.deleteMany({ _id: { $in: thought.user} });
            res.json({ message: 'Thoughts and Users deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update a thought
    async updateThought(req, res) {
     try {
        const thought = await Thought.findOneAndUpdate(
            { _id: res.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if(!thought) {
            return res.status(404).json({ message: 'No thought with this id!'});
        }

        res.json(thought);
     } catch (err) {
        res.status(500).json(err);
     }
    },
};