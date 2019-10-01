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

function agregarEmpleado(req,res) {
   //var username= req.body.username;
   //var password= req.body.password;
   var nomEm= req.body.nomEm;
   var apEm= req.body.apEm;
   var dpi= req.body.dpi;
   var email= req.body.email;

   const employee = {nombre: nomEm, apellido: apEm, dpi: dpi, email: email };
   db.query('INSERT INTO empleado SET ?', employee, (err, result) => {
    if(err) throw err;
    res.status(200).send(result)
  });
    
}
function eliminarEmpleado(req,res) {
    var id= req.params.id;
    var sql = "DELETE FROM empleado WHERE idEmpleado = ?";
  db.query(sql, id,function (err, result) {
    if (err) throw err;
    console.log("ok");
  });
}
module.exports={
    login,
    agregarEmpleado,
    eliminarEmpleado
}

