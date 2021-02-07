const express = require("express");
const router = express.Router();

const session =  require('express-session')
let pass = process.env.PASS
const redis = require('redis')
const redisStore = require('connect-redis')(session)
const client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true, auth_pass: pass});

router.get('/', (req, res, next) => {
    const validateUser = () => {
        const userEmail = typeof req.body.email === 'string' && req.body.email.trim()!= '';
        const userPassword = typeof req.body.temporary_pw === 'string' && req.body.temporary_pw.trim()!= '';
        if(userEmail){
          return userEmail
        }
        else {
          next(new Error("Invalid user"));
        }
        if(userPassword){
          return userPassword
        }
        else{
          next(new Error("Invalid user"));
      }
      }
      if(validateUser){
        res.json({message:"auth successful"})
      }
});

router.use(session({
  secret:"secret",
  store: new redisStore({host: 'redis://redis-10548.c57.us-east-1-4.ec2.cloud.redislabs.com', port: 10548, client: client, ttl: 260}),
  resave:false,
  saveUnitialized:false
}));

// router.use(session({
//   // genid: function(req) {
//   //     console.log('session id created');
//   //   return genuuid();
//   // },  
//   secret:"secret",
//   store: new redisStore({host: 'localhost', port: 6370 , client: client, ttl: 260}), // time to live
//   resave:false,
//   saveUnitialized:false
// }));

router.get('/login', (req, res, next) => {
  const validateUser = () => {
      const userEmail = typeof req.body.email === 'string' && req.body.email.trim()!= '';
      const userPassword = typeof req.body.temporary_pw === 'string' && req.body.temporary_pw.trim()!= '';
      if(userEmail){
        return userEmail
      }
      else {
        next(new Error("Invalid user"));
      }
      if(userPassword){
        return userPassword
      }
      else{
        next(new Error("Invalid user"));
    }
    }
    if(validateUser){
      res.json({message:"auth successful"})
    }

});

router.post('/createuser', (req, res) => {
    if(typeof req.body.email === 'string' && req.body.email.trim()!= '') {
        if(typeof req.body.temporary_pw === 'string' && req.body.temporary_pw.trim()!= ''){
            res.json({message:"auth successful"})
        }        
    }
    else{
        next(new Error("Invalid user"));
    } 
});

module.exports = router;