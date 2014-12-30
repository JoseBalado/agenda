var passport = require('passport');
var Account = require('./models/account');
var router = require('express').Router();

// Actividadad mongoose model
var Actividad = require('./models/actividad');


router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

// Ajax response to info about all activities
router.get('/data', function(req, res) {
    var respuesta = Actividad.find(function (err, actos) {
      if (err) return console.error(err);
      res.json(actos);
  })
});


router.get('/register', function(req, res) {
  res.render('register');
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
  res.render('nueva-actividad', { user: req.user });
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


/* repuesta a XHR solo con usuario para Angular.js
router.get('/user', function(req, res) {
  res.json({ username: req.user.username});
});
*/

router.put('/user/addtoactivity/:id', function(req, res) {
  console.log(req.user.username);
  console.log(req.params.id);
  Actividad.update({_id: req.params.id, genteAnotada: {$nin: [req.user.username]}}, {$push: {genteAnotada: req.user.username}},
    function() { res.end('true'); }
  );
});


router.put('/user/removefromactivity/:id', function(req, res) {
  console.log(req.user.username);
  console.log(req.params.id);
  Actividad.update({_id: req.params.id, genteAnotada: {$in: [req.user.username]}}, {$pull: {genteAnotada: req.user.username}},
    function() { res.end('true'); }
  );
});

module.exports = router;
