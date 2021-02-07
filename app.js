const express = require('express');
const app = express();


const bodyParser = require("body-parser");
const cors = require("cors");


const bcrypt = require("bcrypt");
const path = require("path");


const flash = require("express-flash");


//routes

// const {validateUser} = require("./auth/sadmin");
// const {verifyToken} = require("./auth/verify");
// const {protectRoute} = require("./auth/protectRoute");


// const {validateUser} = require ("./auth/user");

const employeeRoutes = require("./routes/employee");
const loginRoutes = require("./routes/users/login2");

const createuserRoutes = require("./routes/admin/createuser");
const deleteuserRoutes = require("./routes/admin/deleteuser");
const updateuserRoutes = require("./routes/admin/updateuser");
const getuserRoutes = require("./routes/admin/getusers");

const authRoutes = require("./auth/index");

const resetRoutes = require("./routes/users/reset");
const updateProfileRoutes = require("./routes/users/updateprofile");

const orgRoutes = require("./routes/organizations/organization");
const orgAdmin = require("./routes/organizations/orgadmin_login");

const sadminRoutes = require("./routes/superadmin/sadmin_login");
const sadminGetRoutes = require("./routes/superadmin/superadmins");
const CreateSuper = require("./routes/superadmin/createsadmin");

//middleware

app.use(cors());

app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/login', loginRoutes);

app.use('/createuser', createuserRoutes);
app.use('/deleteuser', deleteuserRoutes);
app.use('/updateuser', updateuserRoutes);
app.use('/getusers', getuserRoutes);

app.use('/reset', resetRoutes);
app.use('/updateprofile', updateProfileRoutes);

app.use('/organizations', orgRoutes);
app.use('/orgadmin_login', orgAdmin);

app.use('/sadmin_login', sadminRoutes);
app.use('/superadmins', sadminGetRoutes);
app.use('/createSAdmin', CreateSuper);
app.use(express.static(path.join(__dirname, 'frontend/build')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  //
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname = 'frontend/build/index.html'));
  // })
}

// //build mode
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/frontend/public/index.html'));
// })

app.use(flash());


//error handler
app.use(function (err, req, res, next) {
  // console.error(err.stack);
  // res.status(500).send('Something broke!');
  res.status(err.status || 500);
  res.status(500).json({ message: err.message, error: req.app.get('env') === 'development' ? err : {} });

});


module.exports = app;
