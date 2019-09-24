var express = require('express');
var router = express.Router();
var database= require('../database');
var UserController=require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/prueba',(req,res)=>{
  database.query("Select * from empleado", function (err, result) {
    if (err) throw err;
    res.json(result)
  });
})

router.post('/login',UserController.login)


module.exports = router;
