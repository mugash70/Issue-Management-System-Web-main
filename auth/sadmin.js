const validateSAdmin = (req,res,next) => {
    const userEmail = typeof req.body.email === 'string' && req.body.email.trim()!= '';
    const userPassword = typeof req.body.password === 'string' && req.body.password.trim()!= '';

      if(userEmail && userPassword){
        console.log(`userEmail:${userEmail} and userPassword:${userPassword}`)
      }
      else {
        next(new Error("Invalid user"));
      }

    next();      
}

module.exports = validateSAdmin;
