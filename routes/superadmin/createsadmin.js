const express = require('express');
const router = express.Router();

const pool = require("../../dbConfig.js");
const bcrypt = require("bcrypt");

const { response } = require('express');
const jwtGenerator = require("../jwtAuth.js");


//routes
//creating a user with authentication
router.post("/", (req, res) => {

  try {
    let { name, email, password, phone_number, profile_photo, role, org_id } = req.body;

    //check whether user exists in db

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        password = hash;

        pool.query(
          "INSERT INTO superadmins (sadmin_id, name, email, password, phone_number, profile_photo, role, ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
          [name, email, password, phone_number, profile_photo, role,]
        );
      });
    });

    res.status(200).json({ msg: "organisation created  successfully!" });


  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;