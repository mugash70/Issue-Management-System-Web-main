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

const redisStore = require('connect-redis')(session)
const client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true, auth_pass: pass });

router.use(session({
  secret: "secret",
  store: new redisStore({ host: 'redis://redis-10548.c57.us-east-1-4.ec2.cloud.redislabs.com', port: 10548, client: client, ttl: 260 }),
  resave: false,
  saveUnitialized: false
}));

//routes

router.get('/', async (req, res) => {
  try {
    //cb
    return await pool.query(`SELECT * from organizations`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        // jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
        if (err) {
          console.log(err)
          res.sendStatus(403);
        } else {
          res.status(200).json({
            users: response.rows
          });
        }
        // });
      }
    });
  }
  catch {
    console.log(error);
  }
});

module.exports = router;




