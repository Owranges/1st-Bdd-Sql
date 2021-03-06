const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../database/database");
const jwt = require("jsonwebtoken");
let router = express.Router();
const saltRounds = 10;

router.use("/sign-up", (req, response, next) => {
  connection.query(
    `SELECT * FROM Client WHERE name = '${req.body.name}'`,
    (err, res) => {
      console.log(res);
      console.log(res.length);
      if (res.length > 0) {
        response.status(201).send("This USER NAME already exist");
      } else {
        next();
      }
    }
  );
});

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
        "result[0].name + result[0].email + Math.floor(Math.random() * 5 + 1)",
        {
          expiresIn: 86400, // expires in 24 hours
        }
      );
      if (!result.length) {
        res.status(404).send("Ur email or password is Incorrect");
      } else {
        // let hash = ;
        // console.log(hash);
        bcrypt.compare(password, result[0].password).then(function (results) {
          console.log(results);
          if (results) {
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

router.use("/addcontacts", (req, res, next) => {
  let token = req.headers.authorization;
  jwt.verify(
    token,
    "result[0].name + result[0].email + Math.floor(Math.random() * 5 + 1)",
    (err, decoded) => {
      if (err) res.status(403).send("Token is invalid");
      else if (decoded) {
        next();
      }
    }
  );
});

router.post("/addcontacts", (req, res) => {
  connection.query(
    "INSERT INTO contacts SET ?",
    {
      name: req.body.name,
      email: req.body.email,
      user_affiliate: req.body.user_affiliate,
    },
    (err, results, fields) => {
      if (err) throw err;

      res.send(res + results);
    }
  );
  //     }
  //   }
  // );
});

router.use("/get-contacts/:id", (req, res, next) => {
  let token = req.headers.authorization;
  jwt.verify(
    token,
    "result[0].name + result[0].email + Math.floor(Math.random() * 5 + 1)",
    (err, decoded) => {
      if (err) res.status(403).send("Token is invalid");
      else if (decoded) {
        next();
      }
    }
  );
});

router.get("/get-contacts/:id", (req, res) => {
  let x = req.params.id;
  console.log(x);
  connection.query(
    `SELECT contacts.name,contacts.email,contacts.user_affiliate,contacts.id
     FROM client INNER JOIN contacts ON client.id = contacts.user_affiliate WHERE client.id = ${connection.escape(
      x
    )} `,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      // console.log(JSON.parse(JSON.stringify({ results })));
      res.send(results);
    }
  );
});

module.exports = router;
