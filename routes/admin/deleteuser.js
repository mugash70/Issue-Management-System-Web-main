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
router.delete("/:emp_id", verifyToken, (req, res) => {
  try {
    let {emp_id} = req.params.emp_id;
      
    
    jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
      if(err){
        res.sendStatus(403);
      } else{
        pool.query(
          "DELETE FROM employees WHERE emp_id = $1 RETURNING *",
            [emp_id], (err, response) => {
              if(err){
                console.log(err.stack);
              }else{
                res.json({
                  data:"deleted successfully"
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


           
 