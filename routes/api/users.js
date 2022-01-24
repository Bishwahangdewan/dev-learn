const express = require('express');
const router = express.Router();

//ROUTE - GET /api/users/test
//desc - test api
//@access - Public
router.get('/test', (req, res) => res.json({ status: "Success" }))

module.exports = router;