require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8980;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use("/auth", require('./routes/jwtAuth'));
app.use("/user", require('./routes/user'));

// Get all players
app.get('/api/v1/roster', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM roster ORDER BY last_name ASC');
        res.status(200).json( 
            results.rows
        )

    } catch (err) {
       console.log(err) 
    }
});

// Get individual player
app.get('/api/v1/roster/:id', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM roster where id = $1', [req.params.id]);
        if (!results.rows[0]) {
            res.status(400).json({
                message: "No player found with that id."
            })
        } else {
            res.status(200).json({
                status: "success", 
                data: {
                    player: results.rows[0]
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
});

// Add player
app.post('/api/v1/roster', async (req, res) => {
    try {
        const results = await db.query('INSERT INTO roster (first_name, last_name, jersey_number, primary_position, secondary_position, image_url, health_condition, is_active, gameday_status, nickname) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *', 
        [req.body.first_name, req.body.last_name, req.body.jersey_number, req.body.primary_position, req.body.secondary_position, req.body.image_url, req.body.health_condition, req.body.is_active, req.body.gameday_status, req.body.nickname])
        res.status(201).json({
            status: req.body.first_name + " " + req.body.last_name,
            data: {
                player: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
});

// Update player data
app.put('/api/v1/roster/:id', async (req, res) => {
    try {
        const results = await db.query("UPDATE roster SET first_name = $1, last_name = $2, jersey_number = $3, primary_position = $4, secondary_position = $5, image_url = $6, health_condition = $7, is_active = $8, gameday_status = $9, nickname = $10 where id = $11 returning *", 
        [req.body.first_name, req.body.last_name, req.body.jersey_number, req.body.primary_position, req.body.secondary_position, req.body.image_url, req.body.health_condition, req.body.is_active, req.body.gameday_status, req.body.nickname, req.params.id]);
        res.status(201).json({
            status: "success",
            data: {
                roster: results.rows[0]
            },
        });
    } catch (err) {
        console.log(err)
    }
});

// Delete player
app.delete('/api/v1/roster/:id', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM roster where id = $1", [req.params.id]);
        res.status(204).json({
            status: "Player removed",
        });
    } catch (err) {
        console.log(err)
    }
});

// Listening
app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
});