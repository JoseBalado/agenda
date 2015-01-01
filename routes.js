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




// Registrar usuario
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

// login
router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

// logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




// Crear nueva actividad
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




// Add user to activity
router.put('/user/addtoactivity/:id', function(req, res) {
  console.log(req.user.username);
  console.log(req.params.id);
  Actividad.update({_id: req.params.id, genteAnotada: {$nin: [req.user.username]}}, {$push: {genteAnotada: req.user.username}},
    function() { res.end('true'); }
  );
});

// Remove user from activity
router.put('/user/removefromactivity/:id', function(req, res) {
  console.log(req.user.username);
  console.log(req.params.id);
  Actividad.update({_id: req.params.id, genteAnotada: {$in: [req.user.username]}}, {$pull: {genteAnotada: req.user.username}},
    function() { res.end('true'); }
  );
});




// Eliminar actividad
router.delete('/activity/delete/:id', function(req, res) {
  console.log(req.user.username);
  console.log(req.params.id);
  Actividad.remove({_id: req.params.id}, function (err) {
    if (!err) { 
      res.redirect('true'); 
    }
  });
});

// Editar actividad
router.get('/editar-actividad/:id', function(req, res) {
  console.log('Editar id = ' + req.params.id);
  Actividad.findById(req.params.id, function(err, acto) {
    if(err) {
      console.log(err);
    } else {
      console.log(acto);
      res.render('editar-actividad', { user: req.user, 
        acto: {
          id: req.params.id,
          nombre: acto.nombre,
          día: acto.día,
          número: acto.número,
          mes: acto.mes,
          hora: acto.hora,
          lugar: acto.lugar,
          texto: acto.texto
        }
      })
    }
  });
});

router.post('/editar-actividad', function(req, res) {
  console.log('post: /editar-actividad: ' + req.body.id);
  Actividad.findByIdAndUpdate(req.body.id, {
    nombre: req.body.name,
    día: req.body.day,
    número: req.body.daynumber,
    mes: req.body.month,
    hora: req.body.hour,
    lugar: req.body.place,
    texto: req.body.text
  }, function(err) {
    if(err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Objeto actualizado correctamente');
    }
  });
  res.redirect('/');

});

module.exports = router;
