const router = require("express").Router();
const db = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        const user = await db.query('SELECT username, player_id, credentials FROM authorized_users WHERE user_id = $1', [req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;