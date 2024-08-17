const router = require("express").Router();
const usersRoute = require("./usersRoutes");
const thoughtsRoute = require("./thoughtsRoutes");
const { Thought, User } = require("../../models");

router.use("/users", usersRoute);
router.use("/thoughts", thoughtsRoute);

router.delete("/reloadDatabase", async (req, res) => {
    await User.deleteMany({});
    await Thought.deleteMany({});
    res.status(200).json({ message: "Database deleted!"});
});

model.exports = router;

