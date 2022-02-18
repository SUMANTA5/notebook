const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create auser using
router.post('/',[
    body('name','Enter valid name').isLength({ min: 3 }),
    body('email','Enter valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({ min: 5 }),
],(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
    res.json({error:'please enter a unique value for email'})})

})

module.exports = router