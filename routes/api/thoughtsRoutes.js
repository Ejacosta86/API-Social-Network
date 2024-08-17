const router = require("express").Router();
const {
    getThought,
    addThought,
    getThoughts,
    deleteThought,
    getReactions,
    addReaction,
    deleteReaction,
    updateThought,
} = require("../../controllers/thoughtsController");


router.route("/").get(getThoughts).post(addThought);
router.route("/:id").get(getThought).delete(deleteThought).put(updateThought);
router.route("/:id/reactions").get(getReactions).post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;