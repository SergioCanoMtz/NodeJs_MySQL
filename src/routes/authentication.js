const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) =>{
    res.render('auth/signup');
});

router.post('/signup', (req, res) =>{

});

module.exports = router;