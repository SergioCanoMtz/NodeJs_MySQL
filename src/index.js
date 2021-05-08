const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

 //inicializacion 
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) => {

    next();
})


//rutas
app.use(require('./routes'));


//public

//Iniciando el servidor, para correr el servidor configuramos el 
//package.json en ves de correrlo normalmen nodemon src/index.js.
//ahora solo lo corremos con npm run dev
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})