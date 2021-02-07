// const validateUser = (req, res, next) => {
//   const userEmail = typeof req.body.email === 'string' && req.body.email.trim()!= '';
//   const userPassword = typeof req.body.temporary_pw === 'string' && req.body.temporary_pw.trim()!= '';
  
//   if(userEmail){
//     console.log(userEmail)
//   }
//   else {
//     next(new Error("IPlease enter a valid email"));
//   }
//   if(userPassword){
//     console.log(userPassword)
//   }
//   else{
//     next(new Error("Please enter a valid password"));
//   }
// };

// module.exports = validateUser;