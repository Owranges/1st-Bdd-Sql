const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../database/database');
const jwt = require('jsonwebtoken');
let router = express.Router();
const saltRounds = 10;
// const connection = require('../database/database')


    router.post('/sign-up',  (req,res) => {

        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let hashpassword = '';
        bcrypt.hash(password, saltRounds).then(function(hash) {
            connection.query(`SELECT * FROM Client WHERE email = '${email}'`, (err,result,fields) => {
                if(result.length){
                    res.send("This email already exist")
                }else{
                    hashpassword = hash
            
                    let object = {
                        name,
                        email,
                        password: hashpassword,
                    }
                    let token = jwt.sign({name, email}, name + email + Math.floor(Math.random() * 5 + 1), {expiresIn: 86400 // expires in 24 hours
                    });
                     connection.query("INSERT INTO Client SET ?", object, function(err, result){
                        if(err) throw err;
                        
                        res.send({auth: true, token : token, user : object})
                    })
                }
            })
        })
         
    })
    
    router.post('/sign-in', (req,res) => {
        let email = req.body.email
        let password = req.body.password
        
        connection.query(`SELECT * FROM Client WHERE email = '${email}'`, (err,result,fields) => {
            console.log(err);
            console.log(result);

            let token = jwt.sign({name : result[0].name, email: result[0].email}, result[0].name + result[0].email + Math.floor(Math.random() * 5 + 1), {expiresIn: 86400 // expires in 24 hours
            });
            if(!result.length){
                res.status(404).send("Ur email or password is Incorrect")
            }else{
                let hash = result[0].password
                bcrypt.compare(password, hash).then(function(result){
                    if(result === true){
                        
                        res.status(200).send({auth: true, token: token})
                    }else {
                        
                        res.status(400).send("Sorry, we don't know this user")
                    }
                })
            }
            
            
        })
    })    


module.exports = router;


