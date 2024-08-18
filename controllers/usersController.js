const { User, Thought } = require("../models");


//get all users
function getUsers(req, res) {
    User.find({}).then((data) => {
        res.json(data);
    });
}

//add a user
function addUsers(req, res) {
    User.create(req.body)
    .then((user) => {
        res.json({ message: "User Created!", user });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Error creating user, duplicate username?" });
    });
}

//get users data
function getUser(req, res) {
    User.findById(req.params.id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json({ message: "Invalid user id!" });
    });
}

//update user
function updateUser(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    })
    .then((updated) => {
        res.json(updated);
    })
    .catch((err) => res.json({ message: "Invalid user id!" }));
}

//delete a user by ID
async function deleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id).then(
        async (deleted) => {
            if (deleted) {
                await Thought.deleteMany({ userId: deleted._id });
                await User.updateMany({ $pull: { friends: { _id: req.params.id } } });
                res.json({ message: "Deleted user and related thoughts!", deleted });
            } else {
                res.json({ message: "Invalid user id!" });
            }
        }
    );
}

//get a user and users friends
async function getFriends( req, res) {
    try {
        User.findById(req.params.id)
        .lean()
        .populate("friends", "-friends -thoughts -__v")
        .then((data) => {
            res.json(data);
        });
    } catch (err) {
        res.status(404).json({ message: "Invalid userId!" });
    }
}

//adding a friend 
async function addFriend(req, res) {
    try {
        const user = await User.findById(req.params.userId);
        const friending = await User.findById(req.params.userId);
        if(user._id === friending._id) {
            res.json({ message: "Cannot friend yourself!" });
            return;
        }
        //already friends
        if (user.friends.indexOf(friending._id) != -1) {
            res.json({ message: `Already friends with ${friending.username}` });
            return;
        }
        //add friend to users friends list
        await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => {
            console.log(user);
        })
        .catch((err) => {
            console.log(err);
            return;
        });
        //add friend to other users friends list
        await User.findByIdAndUpdate(req.params.friendId, {
            $push: { friends: req.params.userId },
        });
        res.json({ message: "Added to friends list!", user });
    } catch (err) {
        console.log(err);
    }
}

//delete a friend 
async function deleteFriend(req, res) {
    try {
        const user = await User.findById(req.params.userId);
        const unfriending = await User.findById(req.params.friendId);

        if(!user || !unfriending) {    
        }

        //add friend to users friends list
        await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => {
            console.log(user);
        })
        .catch((err) => {
            console.log(err);
            return;
        });

        //add friend to other users friends list
        await User.findByIdAndUpdate(req.params.friendId, {
            $pull: {friends: req.params.userId },
        });
        res.status(200).json({ message: "Deleted friend!" });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Invalid userId or friendId!" });
    }
}

//get user and their thoughts
function getThoughts(req, res) {
    try {
        User.findById(req.params.id)
        .lean()
        .populate("thoughts", "-__v")
        .then((data) => {
            res.json(data);
        });
    } catch (err) {
        res.status(404).json({ message: "Invalid userId!" });
    }
}

module.exports = {
    getUsers,
    addUsers,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    getFriends,
    getThoughts,
};
