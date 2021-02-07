// const express = require('express');
// const jwt = require('jsonwebtoken');

// // const protectRoute = (req,res, next) => {
// //     jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
// //         if(err){
// //           res.sendStatus(403);
// //         } else{
// //           res.json({
// //              message:"Forbidden",
// //             data:data
// //           });
// //         }
// //       });    
// //     next();
// // }

// const protectRoute = (req,res, next) => {
//   jwt.verify(req.token, process.env.jwtSecret, (err, data) => {
//       if(err){
//         res.sendStatus(403);
//       } else{
//         res.json({
//            message:"Authorized",
//           data:data
//         });
//       }
//     });    
//   next();
// }



// module.exports = protectRoute;

