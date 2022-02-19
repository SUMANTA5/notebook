const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sumantamongo$boy";

//Create a user -post /api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      //bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      //jwt Token
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);


//auth a user -post /api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
     let user = await User.findOne({email});

     if(!user){
       return res.status(400).json({error: "please try to login with correct credentials"});
     }

     const passwordCompare = await bcrypt.compare(password, user.password)
     if(!passwordCompare){
      return res.status(400).json({error: "please try to login with correct credentials"});
     }

     const data = {
      user: {
        id: user.id,
      },
    };
    //jwt Token
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });


    }catch (error){
      console.log(error.message);
      res.status(500).send("Some Error occured");
    }


  }
);



module.exports = router;
