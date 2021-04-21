module.exports = (req, res, next) => {
    const { username, password, credentials, player_id } = req.body; 

    if (req.path === "/register") {
        if (![username, password, credentials, player_id].every(Boolean)) {
            return res.status(401).send("Missing credentials.");
        }
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).send("Missing credentials.");
        }
    }

    next();
};