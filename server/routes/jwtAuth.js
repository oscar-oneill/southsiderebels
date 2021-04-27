const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/login", validInfo, async (req, res) => {
    try {
        // Destructure 'req.body'
        const { username, password } = req.body;

        // Check if user does not exist in database
        const user =  await db.query('SELECT * FROM authorized_users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).send("User not found.")
        }

        // Check if incoming password matches database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).send("Password incorrect.");
        }
    
        // Give user JWT token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error @ login.");
    }
});

router.post("/register", validInfo, async (req, res) => {
    try {
        // Destructure 'req.body'
        let { username, password, credentials, player_id } = req.body;
    
        // Determine if user exists in the database 
        const user = await db.query('SELECT * FROM authorized_users WHERE username = $1', [username]);
        if (user.rows.length !== 0) {
            console.log(`The user "${username}" already exists in the database. Try another name.`);
            return res.status(401).send("Error adding to database. Username exists.");
        } 

        // Hash Password with Bcrypt
        const saltRound = 10; 
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Enter user into database 
        const newUser = await db.query('INSERT INTO authorized_users (username, password, credentials, player_id) values($1, $2, $3, $4) RETURNING *', [username, bcryptPassword, credentials, player_id]);

        // Generate JWT
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error @ registration.");
    }
});

router.get("/verified", authorization, async (req, res) => {
    try {
        res.json(true);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error @ verification.");
    }
});

module.exports = router;