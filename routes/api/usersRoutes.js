const router = require("express").Router();
const{
    getUsers,
    addUsers,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    getFriends,
    getThoughts,
} = require("../../controllers/usersController");

router.route("/").get(getUsers).post(addUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
router.route("/:id/friends").get(getFriends);
router.route("/:id/thoughts").get(getThoughts);

module.exports = router;
