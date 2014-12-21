var passport = require('passport');
var Account = require('./models/account');
var router = require('express').Router();

// Actividadad mongoose model
var Actividad = require('./models/actividad');


router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

// Trying to respond to an Ajax get request
router.get('/data/productData.json', function(req, res) {
    var respuesta = Actividad.find(function (err, actos) {
      if (err) return console.error(err);
      res.json(actos);
  })
});

// End of Ajax get request

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err) {
    if (err) { console.log('error while user register!', err); return next(err); }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/nueva-actividad', function(req, res) {
  res.render('nueva-actividad');
});

router.post('/nueva-actividad', function(req, res) {
  var acto = new Actividad({  
    nombre: req.body.name,
    día: req.body.day,
    número: req.body.daynumber,
    mes: req.body.month,
    hora: req.body.hour,
    lugar: req.body.place,
    texto: req.body.text,
    genteAnotada: []
  });
  
  acto.save(function (err, acto) {
    if (err) return console.error(err);
    console.log('Actividad "' + acto.nombre + '" salvada correctamente' );
  });


  res.redirect('/');
});

module.exports = router;
