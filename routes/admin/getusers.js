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

router.get('/', verifyToken, async(req,res) => {
  try{
      //cb
     return await pool.query(`SELECT * FROM employees`, (err, response) => {
          if (err) {
            console.log(err.stack);
          } else {
            jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
              if(err){
                res.sendStatus(403);
              } else{
                res.json({
                  data:response.rows
                });
              }
            });            
          }
      });
  }     
  catch {
      console.log(error);
  }
});

router.get('/:emp_id', verifyToken, async(req,res) => {
  try{
    
    let {emp_id} = req.params.emp_id;

     return await pool.query(`SELECT * FROM employees WHERE emp_id = $1`, [emp_id], (err, response) => {
          if (err) {
            console.log(err.stack);
          } else {
            jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
              if(err){
                res.sendStatus(403);
              } else{
                res.json(data);  
              }
            });            
          }
      });
  }     
  catch {
      console.log(error);
  }
});


module.exports = router;


           
 