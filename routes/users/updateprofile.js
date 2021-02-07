const express = require('express');
const router = express.Router();

const pool = require ("../../dbConfig");
const jwtGenerator = require("../jwtAuth");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { response } = require('express');
const verifyToken = require('../../auth/verify');

router.put("/:emp_id", verifyToken, (req,res, next) => {
  try {
    
    let {name, email, profile_photo, role} = req.body;

      //check whether email and password are valid - they must be in string format and must not be empty
       
        jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
          if(err){
            res.sendStatus(403);
          } else{
            pool.query(`UPDATE employees SET name = $1, email = $2, profile_photo = $3, role = $4 WHERE emp_id = ${req.params.emp_id}`, [name, email, profile_photo, role], (err, response) => {
              if(err){
                console.log(err.stack);
              } 
              else{
                res.json("update successful!");
              }
            });

          }
        });
  }
  catch (error) {
    console.log(error);
  }
});

module.exports = router;

 