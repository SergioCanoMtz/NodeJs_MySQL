const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const sesion = require('express-session');
const smysql = require('express-mysql-session'); 
const { database } = require('./keys');
const passport = require('passport');


 //inicializacion 
const app = express();
require('./lib/passport');

 //Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(sesion({
    secret: 'Cano',
    resave: false,
    saveUninitialized: false,
    store: new smysql(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.correcto = req.flash('correcto');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')));


//Iniciando el servidor, para correr el servidor configuramos el 
//package.json en ves de correrlo normalmen nodemon src/index.js.
//ahora solo lo corremos con npm run dev
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})