const express = require('express');
const router = express.Router();

const pool = require("../dbConfig");
const bcrypt = require("bcrypt");

const { response } = require('express');
const jwtGenerator = require("./jwtAuth");
const protectRoute = require('../auth/protectRoute');


//routes
//creating a POST route using destructuring
router.post("/", (req, res) => {
  try {
    let { emp_id, name, email, temporary_pw, role } = req.body;
    console.log(req.body)
    if (req.body.emp_id == null) {
      res.json({ msg: "id cannot be null" })
    } else {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(temporary_pw, salt, function (err, hash) {
          //console.log(hash);
          temporary_pw = hash;
          pool.query(
            "INSERT INTO employees (emp_id, name, email, temporary_pw, role) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [emp_id, name, email, temporary_pw, role]
          );
        });
      });
      res.json({ msg: "created successfully!" });
    }

  } catch (err) {
    console.error(err.message);
  }
});

//creating a GET route - retrieve all employee data from the employees table

router.get("/", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:emp_id", async (req, res) => {
  const query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM employees WHERE emp_id = $1'
  }

  query.values = [req.params.emp_id];

  // callback
  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack);
    }
    else {
      let hash = response.rows[0].temporary_pw;
      bcrypt.compare(req.body.temporary_pw, hash, function (err, result) {
        let token = jwtGenerator(response.rows[0].emp_id);
        res.json([response.rows[0], `This ${token} shows that employee information has been retrieved successfully`]);
      });
    }
  });
});

router.put("/:emp_id", (req, res) => {

  try {

    let { name, email, temporary_pw, role } = req.body;

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(temporary_pw, salt, function (err, hash) {
        //console.log(hash);
        temporary_pw = hash;

        const query = `UPDATE employees SET name = '${name}', email = '${email}', temporary_pw = '${temporary_pw}', role ='${role}'
        WHERE emp_id = ${req.params.emp_id}
        RETURNING name, email, temporary_pw, role`


        // callback
        pool.query(query, (err, response) => {
          if (err) {
            console.log(err.stack)
          } else {
            res.json("Successfully updated!");
          }
        });
      });
    });
  }
  catch {
    console.error(err.message);
  }

});


//creating a DELETE route - delete a specific employee's data in the employees table

router.delete("/:emp_id", async (req, res) => {

  const query = {
    // give the query a unique name    
    text: "DELETE FROM employees WHERE emp_id = $1 RETURNING *",
    values: [req.params.emp_id]
  }

  // callback
  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.json("Successfully deleted!");
    }
  });
});

module.exports = router;