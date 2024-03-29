'use strict'
const db = require('../database');

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    var response
    db.query('SELECT * FROM usuario', function (error, results, fields) {
      results.forEach(element => {
        if (username == element.username && password == element.password) {
          res.send('ok');
          response = 1
        }
      });
      if (response != 1) {
        res.send('error')
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
}

function agregarEmpleado(req, res) {
  //var username= req.body.username;
  //var password= req.body.password;
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var dpi = req.body.dpi;
  var email = req.body.email;
  var diasDisponibles = req.body.dias;

  const employee = { nombre: nombre, apellido: apellido, dpi: dpi, email: email, diasDisponibles: diasDisponibles };
  db.query('INSERT INTO empleado SET ?', employee, (err, result) => {
    if (err) throw err;
    res.status(200).send(result)
  });

}
function eliminarEmpleado(req, res) {
  var id = req.params.id;
  var sql = "DELETE FROM empleado WHERE idEmpleado = ?";
  db.query(sql, id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

function eliminarSolicitud(req, res) {
  var id = req.params.id;
  var sql = "DELETE FROM solicitud WHERE idSolicitud = ?";
  db.query(sql, id, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
}

function crearSolicitud(req, res) {
  var idEmpleado = req.params.id;
  var diasSolicitados = req.body.dias;
  var dat = new Date();
  const solicitud = { idEmpleado: idEmpleado, fecha: dat, diasSolicitados: diasSolicitados, status: "pendiente" };
  db.query('INSERT INTO solicitud SET ?', solicitud, (err, result) => {
    if (err) throw err;
    res.status(200).send(result)
    restar(diasSolicitados,idEmpleado)
  });
}

function restar(diasSolicitados,idEmpleado) {
  db.query('UPDATE empleado INNER JOIN solicitud ON solicitud.idEmpleado=empleado.idEmpleado SET empleado.diasDisponibles = empleado.diasDisponibles - ? WHERE  empleado.idEmpleado=?', [diasSolicitados,idEmpleado], (err, result) => {
    if (err) throw err;
    //rrs res.status(200).send(result)
  })
}

function getSolicitudes(req, res) {
  var sql = 'SELECT solicitud.idSolicitud, empleado.nombre, empleado.apellido, solicitud.fecha,solicitud.diasSolicitados, solicitud.status FROM empleado INNER JOIN solicitud ON empleado.idEmpleado = solicitud.idEmpleado';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
    //rrs res.status(200).send(result)
  })
}

function getEmpleado(req, res) {
  var id = req.params.id;
  var sql = 'SELECT diasDisponibles FROM empleado WHERE idEmpleado=?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result)
    //rrs res.status(200).send(result)
  })
}

module.exports = {
  login,
  agregarEmpleado,
  eliminarEmpleado,
  crearSolicitud,
  getSolicitudes,
  getEmpleado,
  eliminarSolicitud
}

