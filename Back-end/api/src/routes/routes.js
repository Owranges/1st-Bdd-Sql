const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../database/database');

let router = express.Router();
const saltRounds = 10;
// const connection = require('../database/database')


    router.post('/sign-up',  (req,res) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let hashpassword = '';
        bcrypt.hash(password, saltRounds).then(function(hash) {
            hashpassword = hash
            
            let object = {
                name,
                email,
                password: hashpassword,
            }
          
             connection.query("INSERT INTO Client SET ?", object, function(err, result){
                if(err) throw err;
                
                res.send()
            })
        });
    })
    
    router.post('/sign-in', (req,res) => {
        let email = req.body.email
        let password = req.body.password
        
        connection.query(`SELECT * FROM Client WHERE email = '${email}'`, (err,result,fields) => {
            console.log(err);
            console.log(result);
            if(!result.length){
                res.status(404).send("Ur email or password is Incorrect")
            }else{
                let hash = result[0].password
                bcrypt.compare(password, hash).then(function(result){
                    if(result === true){
                      
                        res.send( "you are authenticated")
                    }else {
                        
                        res.send("Sorry, we don't know this user")
                    }
                })
            }
            
            
        })
    })    


module.exports = router;


