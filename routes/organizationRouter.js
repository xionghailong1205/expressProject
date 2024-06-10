var express = require('express');
var router = express.Router();
const { getdb } = require('../utils/createdb')

router.get('/organizationList', function (req, res, next) {
    const db = getdb()
    db.query('SELECT * FROM volunteerOrganizations', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// router.get('/manager/',);

module.exports = router;