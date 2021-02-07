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

const verifyToken = require('../../auth/verify.js');
const protectRoute = require('../../auth/protectRoute.js');
const validateAdmin = require('../../auth/orgadmin');

const redisStore = require('connect-redis')(session)
const client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true, auth_pass: pass });

router.use(session({
  secret: "secret",
  store: new redisStore({ host: 'redis://redis-10548.c57.us-east-1-4.ec2.cloud.redislabs.com', port: 10548, client: client, ttl: 260 }),
  resave: false,
  saveUnitialized: false
}));
//routes

router.post("/", validateAdmin, (req, res, next) => {
  try {
    // validateAdmin, verifyToken,
    const { email } = req.body;

    pool.query(`SELECT * FROM organizations WHERE admin_email = $1`, [email], (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        //check whether user email and admin_password exist in db, and whether role is 'admin'
        if (response.rows.length === 0) {
          res.status(400).json({ msg: "user not found" });
        }
        else if (response.rows[0].length != 0) {
          let hash = response.rows[0].admin_password; //pw in db
          bcrypt.compare(req.body.password, hash, function (err, result) {
            if (err) {
              console.log(err);
            }
            if (result) {

              let token = jwtGenerator(response.rows[0].emp_id, response.rows[0].role);

              //redirect to update admin profile or create user page 
              if (protectRoute) {
                res.status(200).json({
                  token,
                  user: { org: response.rows[0].org_id, id: response.rows[0].admin_id, email: response.rows[0].admin_email, name: response.rows[0].admin_name, org_name: response.rows[0].org_name, phone: response.rows[0].admin_phone_no }
                });
              }
              else {
                res.status(400).json({ msg: "Forbidden" });

              }
            }
            else {
              return res.status(400).json({ success: false, msg: `admin_passwords do not match` });
            }
          });

        }
        else {
          return res.status(400).json({ success: false, msg: `not allowed` });
        }
      }
    });
  }
  catch (error) {
    console.log(error);
  }

});

module.exports = router;
