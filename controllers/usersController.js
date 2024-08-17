const { User } = require("../models");

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await users.find()
            .populate('User');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },


     //single user
     async getSingleUser( req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .populate('users');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a user
    async createUser(req, res) {
        try {
            const user = await user.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }

            await User.deleteMany({ _id: { $in: thought.user} });
            res.json({ message: 'Thoughts and Users deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update a user
    async updateUser(req, res) {
     try {
        const user = await User.findOneAndUpdate(
            { _id: res.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if(!user) {
            return res.status(404).json({ message: 'No user with this id!'});
        }

        res.json(user);
     } catch (err) {
        res.status(500).json(err);
     }
    },
}