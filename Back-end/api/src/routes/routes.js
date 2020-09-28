const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../database/database");
const jwt = require("jsonwebtoken");
let router = express.Router();
const saltRounds = 10;

router.delete("/sign-out/:email&:password", (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  connection.query(
    `SELECT * FROM Client WHERE email = '${email}'`,
    (err, result, fields) => {
      if (result.length) {
        let hash = result[0].password;
        bcrypt.compare(password, hash).then(function (resultat) {
          if (resultat == true) {
            connection.query(
              `DELETE FROM Client WHERE email = '${email}'`,
              (err, result, fields) => {
                if (err) throw err;
                res.status(200).send("Ur account has been deleted");
              }
            );
          } else {
            res.status(400).send("The password is incorrect");
          }
        });
      } else {
        console.log(err + "else err");
        res.status(400).send("Ur password or email is incorrect");
      }
    }
  );
});

router.post("/sign-up", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let hashpassword = "";
  bcrypt.hash(password, saltRounds).then(function (hash) {
    connection.query(
      `SELECT * FROM Client WHERE email = '${email}'`,
      (err, result, fields) => {
        if (result.length) {
          res.send("This email already exist");
        } else {
          hashpassword = hash;
          let object = {
            name,
            email,
            password: hashpassword,
          };
          // let token = jwt.sign({name, email}, name + email + Math.floor(Math.random() * 5 + 1), {expiresIn: 86400 // expires in 24 hours
          // });
          connection.query("INSERT INTO Client SET ?", object, function (
            err,
            result
          ) {
            if (err) throw err;

            res.send("hi");
          });
        }
      }
    );
  });
});

router.post("/sign-in", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  connection.query(
    `SELECT * FROM Client WHERE email = '${email}'`,
    (err, result, fields) => {
      let token = jwt.sign(
        { name: result[0].name, email: result[0].email, id: result[0].id },
        result[0].name + result[0].email + Math.floor(Math.random() * 5 + 1),
        {
          expiresIn: 86400, // expires in 24 hours
        }
      );
      if (!result.length) {
        res.status(404).send("Ur email or password is Incorrect");
      } else {
        let hash = result[0].password;
        bcrypt.compare(password, hash).then(function (result) {
          if (result === true) {
            res.status(200).send({ auth: true, token: token });
          } else {
            res.status(400).send("Sorry, we don't know this user");
          }
        });
      }
    }
  );
});

// CHANGER EN UTILISANT L ID DU STOR0
// CHANGER EN UTILISANT L ID DU STORE
// CHANGER EN UTILISANT L ID DU STOREE
// CHANGER EN UTILISANT L ID DU STORE
// CHANGER EN UTILISANT L ID DU STORE
// CHANGER EN UTILISANT L ID DU STORE

//
//
//
//
//
router.post("/addcontact", (req, res) => {
  let client = req.body.client;
  let email = req.body.email;
  let name = req.body.name;
  connection.query(
    `SELECT * FROM Client WHERE email = '${client}'`,
    (err, result, field) => {
      if (!result.length) {
        res.status(404).send("Ur email or password is Incorrect");
      } else {
        connection.query(
          "INSERT INTO contacts SET ?",
          {
            name: name,
            email: email,
            user_affiliate: result[0].id,
          },
          function (err, result) {
            if (err) throw err;
            res.send("hi");
          }
        );
      }
    }
  );
});

router.get("/get-contacts/:id", (req, res) => {
  let x = req.params.id;
  console.log(x);
  connection.query(
    `SELECT * FROM client INNER JOIN contacts ON client.id = contacts.user_affiliate WHERE client.id = ${connection.escape(
      x
    )}`,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      console.log("merde");
      res.send(results);
    }
  );
});

module.exports = router;
