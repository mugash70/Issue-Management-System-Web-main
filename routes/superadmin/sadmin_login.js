const express = require('express');
const router = express.Router();
const session = require('express-session')
const pool = require("../../dbConfig.js");
const jwtGenerator = require("../jwtAuth.js");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { response } = require('express');

let pass = process.env.PASS
const redis = require('redis');
const validateSAdmin = require('../../auth/sadmin');
const verifyToken = require('../../auth/verify.js');
const protectRoute = require('../../auth/protectRoute.js');

const redisStore = require('connect-redis')(session)
const client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true, auth_pass: pass });

router.use(session({
  secret: "secret",
  store: new redisStore({ host: 'redis://redis-10548.c57.us-east-1-4.ec2.cloud.redislabs.com', port: 10548, client: client, ttl: 260 }),
  resave: false,
  saveUnitialized: false
}));
//routes

router.post("/", validateSAdmin, (req, res, next) => {
  try {
    const { email } = req.body;

    pool.query(`SELECT * FROM superadmins WHERE email= $1`, [email], (err, response) => {
      if (err) {
        console.log(err.stack)
      } else {
        //check whether user email and password exist in db, and whether role is 'superadmin'
        if (response.rows.length === 0) {
          res.status(400).json({ msg: "user not found" });
        }
        else if (response.rows[0].length != 0) {

          //check whether the user is logging in for the first time - sessions and cookies
          //to be used when admin code is ready

          let hash = response.rows[0].password; //pw in db
          bcrypt.compare(req.body.password, hash, function (err, result) {
            if (err) {
              console.log(err);
            }
            if (result) {

              let token = jwtGenerator(response.rows[0].sadmin_id, response.rows[0].role);

              //redirect to create superadmin page or create organization page
              if (protectRoute) {
                res.status(200).json({
                  token,
                  user: { id: response.rows[0].ID, email: response.rows[0].email, name: response.rows[0].name }
                });
              }
              else {
                res.status(400).json({ msg: "Forbidden" });

              }
            }
            else {
              return res.status(400).json({ msg: "passwords do not match" });
            }
          });

        }
        else {
          return res.json({ msg: "not allowed" });
        }
      }


    });
  }
  catch (error) {
    console.log(error);
  }

});

module.exports = router;
