const express = require('express');
const router = express.Router();
const login = require('../../controller/login');
const register = require('../../controller/register');
const gSignIn = require("../../controller/gSignIn");
const verify = require("../../controller/verify")

router.get('/', (req, res) => {
    res.send("Auth");
})
router.post('/register', register);

router.post('/login', login);

router.post('/gLogin', gSignIn);

router.get('/verify', verify);

module.exports = router;