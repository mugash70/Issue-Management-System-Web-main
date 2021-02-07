const express = require('express');
const router = express.Router();

const session = require('express-session')
const pool = require("../../dbConfig.js");
const jwtGenerator = require("../jwtAuth.js");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { response } = require('express');

router.post("/", (req, res) => {

  try {
    //check whether organization already exists in db

    let { org_id, org_name, colour_scheme, logo, admin_name, admin_email, admin_password, admin_phone_no, admin_id } = req.body;

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(admin_password, salt, function (err, hash) {
        admin_password = hash;
        pool.query(

          "INSERT INTO organizations (org_id, org_name, colour_scheme, logo, admin_name, admin_email, admin_password, admin_phone_no, admin_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
          [org_id, org_name, colour_scheme, logo, admin_name, admin_email, admin_password, admin_phone_no, admin_id]
        );
      });
    });

    res.json("created successfully!");

  } catch (err) {
    console.error(err.message);
  }
});


// get all users created by organization admin

router.get('/', async (req, res) => {
  try {
    //cb
    await pool.query(`SELECT * from employees`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch {
    console.log(error);
  }
});


// retrieve a specific user

router.get('/:id', async (req, res) => {

  const { id } = req.params;

  //cb
  await pool.query('SELECT * FROM organizations where org_id = $1', [id], (err, response) => {
    if (err) {
      console.log(err.message)
    } else {
      let hash = response.rows[0].temporary_pw;
      bcrypt.compare(req.body.temporary_pw, hash, function (err, result) {
        let orgToken = jwtGenerator(response.rows[0].id);
        res.json([response.rows[0], `This ${orgToken} shows that organization information has been retrieved successfully`]);
      });
    }
  });
});

router.put('/:org_id', (req, res) => {
  try {
    let { org_name, admin_name, admin_email, admin_password, admin_id } = req.body;

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(admin_password, salt, function (err, hash) {
        //console.log(hash);
        admin_password = hash;

        const query = `UPDATE organizations SET org_name = '${org_name}', admin_name = '${admin_name}', admin_email = '${admin_email}', 
          admin_password = '${admin_password}, emp_id = '${admin_id}'
          WHERE org_id = ${req.params.org_id} RETURNING org_name, admin_name, admin_email, admin_password, admin_id`

        pool.query(query, (err, response) => {
          if (err) {
            console.log(err.message);
          } else {
            res.json('Successfully updated')
          }
        });

      });
    });
  } catch (error) {
    console.error(err.message);
  }
});

// // delete route
router.delete("/:org_id", async (req, res) => {

  const query = {
    // give the query a unique name    
    text: "DELETE FROM organizations WHERE org_id = $1 RETURNING *",
    values: [req.params.org_id]
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