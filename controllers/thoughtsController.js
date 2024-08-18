const { Thought, User } = require("../models");

//get all thoughts
function getThoughts(req, res) {
    Thought.find({}).then((data) => {
        res.json(data);
    });
}
      
//add a thought 
async function addThought( req, res) {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: user.usernamr,
                userId: user._id,
            });
            //find another user and add thought
            await User.findByIdAndUpdate(
                req.body.userId,
                {$push: { thoughts: thought._id } }
            );
            res.json({ message: "Thought created!", thought });
        } else {
            res.status(404).json({ message: "Invalid username!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to creat thought! "});
    }
}

// update thought
function updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "Invalid thought id"});
        }
    })
    .catch((err) => {
        res.status(404).json({ message: "Unable to updaye thought!" });
    });
}

//get single thought
function getThought(req, res) {
    Thought.findById(req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(404).json({ message: "Invaild thought id!" });
    });
}


//delete a thought 
async function deleteThought(req, res) {
    try {
        const thought = await Thought.findById(req.params.id);
        if (thought) {
            await Thought.deleteOne(thought);
            const user = await User.findByIdAndUpdate(thought.userId, {
                $pull: {thoughts: thought._id },
            });
            res.status(200).json({ message: "Deleted thought", deleted: thought, from: user });
        } else {
            res.status(404).json({ message: "Invalid thought id!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to delete thought!" });
    }
}


//get all reactions
async function getReactions(req, res) {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought.reactions);
    } catch (err) {
        res.status(404).json({ message: "Inalid thoughtId!" });
    }
}

//add a reaction to a thought
async function addReaction(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate( 
            req.params.id, 
            {
              $push: { reactions: req.body}, 
            },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(404).json({ message: "Invalid thoughtId!"});
    }
}

//delete reaction 
async function deleteReaction(req, res) {
    try {
     const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
            $pull: { reactions: {_id: req.params.reactionId } },
        },
        { new: true }
     );
     if (thought) {
        res.json(thought);
     } else {
        res.status(404).json({ message: "Invaild thoughtId!"});
     }
    } catch (err) {
        res.status(404).json({ message: "Invaild thoughtId or reactionId!"});
    }
}


module.exports = {
    getThoughts,
    addThought,
    getThought,
    deleteThought,
    updateThought,
    getReactions,
    addReaction,
    deleteReaction,
};