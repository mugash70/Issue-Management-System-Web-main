const express = require('express');
const router = express.Router();

const pool = require ("../../dbConfig");
const bcrypt = require("bcrypt");

const { response } = require('express');
const jwtGenerator = require("../jwtAuth");
const jwt = require('jsonwebtoken');


const verifyToken = require("../../auth/verify");
const protectRoute = require('../../auth/protectRoute.js');

//routes
//creating a user with authentication
router.put("/:emp_id", verifyToken, (req, res) => {
  try {
    let {emp_id} = req.params.emp_id;
    let {name, email, temporary_pw, role} = req.body;
      
    
    jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
      if(err){
        res.sendStatus(403);
      } else{
        pool.query(
          `UPDATE employees SET name = '${name}', email = '${email}', temporary_pw = '${temporary_pw}', role ='${role}'
            WHERE emp_id = ${req.params.emp_id}
            RETURNING name, email, temporary_pw, role`, (err, response) => {
              if(err){
                console.log(err.stack);
              }else{
                res.json({
                  data:"updated successfully"
                })
              }
            }          
          );
        }
      });
     
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;


           
 