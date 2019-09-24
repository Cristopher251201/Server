'use strict'
const db= require('../database');

function login(req,res){
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		db.query('SELECT * FROM usuario', function(error, results, fields) {
            results.forEach(element => {
                if (username==element.username && password==element.password) {
                    res.redirect('/prueba');
                } else {
                    console.log('la contraseña y/o usuario incorrectos')
                }
            });		
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
}

module.exports={
    login
}