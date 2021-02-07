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
    let {temporary_pw, email} =  req.body;

      //check whether email and password are valid - they must be in string format and must not be empty

      const validateUser = () => {
      let userEmail = typeof req.body.email === 'string' && req.body.email.trim()!= '';
      let userPassword = typeof req.body.temporary_pw === 'string' && req.body.temporary_pw.trim()!= '';
        if(userEmail && userPassword){
          return `${userEmail}, ${userPassword}`
        }
        else {
          next(new Error("Invalid user"));
        }
    
        }
        validateUser();
        
        jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
          if(err){
            res.sendStatus(403);
          } else{
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                  
              bcrypt.hash(temporary_pw, salt, function(err, hash) { 
                temporary_pw = hash;
                  pool.query(`UPDATE employees SET temporary_pw = $2 WHERE email = $3`, [temporary_pw, email], (err, response) => {
                    if(err){
                      console.log(err.stack);
                    } 
                    else{
                      res.json("update successful!");
                    }
                  });                 
                });
              }); 

          }
        });
  }
  catch (error) {
    console.log(error);
  }
});

module.exports = router;

