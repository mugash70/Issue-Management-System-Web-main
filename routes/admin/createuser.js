const express = require('express');
const router = express.Router();

const pool = require("../../dbConfig");
const bcrypt = require("bcrypt");

const { response } = require('express');
const jwtGenerator = require("../jwtAuth");
const jwt = require('jsonwebtoken');


const verifyToken = require("../../auth/verify");


//routes
//creating a user with authentication
router.post("/", (req, res) => {
  try {
    let { name, email, temporary_pw, role, token } = req.body;
    jwt.verify(token, process.env.jwtSecret, (err, data) => {
      console.log(data)
      if (err) {
        res.sendStatus(403)
        console.log(err);
      } else {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(temporary_pw, salt, function (err, hash) {
            //console.log(hash);
            temporary_pw = hash;
            pool.query(
              "INSERT INTO employees ( name, email, temporary_pw, role) VALUES($1, $2, $3, $4) RETURNING *",
              [name, email, temporary_pw, role], (err, response) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  res.json({
                    msg: "created successfully"
                  })
                }
              }
            );
          });
        });
      }
    });


    // }
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;



