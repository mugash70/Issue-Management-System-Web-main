const express = require('express');
const router = express.Router();
const session = require('express-session')
const pool = require("../../dbConfig.js");
const jwtGenerator = require("../jwtAuth.js");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { response } = require('express');

let pass = process.env.PASS
const redis = require('redis')
const redisStore = require('connect-redis')(session)
const client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true, auth_pass: pass });

router.use(session({
  secret: "secret",
  // store: new redisStore({ host: 'redis://redis-10548.c57.us-east-1-4.ec2.cloud.redislabs.com', port: 10548, client: client, ttl: 260 }),
  store: new redisStore({ host: '127.0.0.1', port: 6379, client: client, ttl: 260 }),
  resave: false,
  saveUnitialized: false
}));
//routes

router.post("/", async (req, res, next) => {
  try {

    const { email } = req.body;
    console.log(req.body)
    await pool.query(`SELECT * FROM employees WHERE email = $1`, [email], (err, response) => {

      //check whether email and password are valid - they must be in string format and must not be empty

      const validateUser = () => {
        const userEmail = typeof req.body.email === 'string' && req.body.email.trim() != '';
        const userPassword = typeof req.body.temporary_pw === 'string' && req.body.temporary_pw.trim() != '';

        if (userEmail) {
          return userEmail
        }
        else {
          next(new Error({ msg: "Invalid user" }));
        }
        if (userPassword) {
          return userPassword
        }
        else {
          next(new Error({ msg: "Invalid user" }));
        }

      }
      validateUser();

      if (err) {
        console.log(err.stack)
      } else {

        //check whether user email and password exist in db

        if (response.rows.length === 0) {
          res.status(400).json({ msg: "user not found" });
        }

        else if (response.rows[0].length != 0) {
          //check whether the user is logging in for the first time - sessions and cookies
          //to be used when admin code is ready
          let token = jwtGenerator(response.rows[0].emp_id);
          res.status(200).json({
            token, user: { id: response.rows[0].emp_id, email: response.rows[0].email, name: response.rows[0].name }
          });

        }
      }
    });
  }
  catch (error) {
    console.log(error);
  }
});

module.exports = router;