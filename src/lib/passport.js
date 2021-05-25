const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const { fullname } = req.body;

    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const resultado = await pool.query('INSERT INTO users SET ?', [newUser]);
    console.log(resultado);

    newUser.id = resultado.insertId;
    return done(null, newUser); 
}));  

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    const rows = await pool.query('select * from users where username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassport = await helpers.machPassword(password, user.password);
        if(validPassport){
            done (null, user, req.flash('correcto','Bienvenido '+ user.username));
        } else{
            done(null, false, req.flash('message','Contraseña incorrecta'));
        }
    } else{
        return done(null, false, req.flash('message','El usuario NO exixte'));
    }
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser( async (id, done)=>{
    const rows = await pool.query('select * from users where id = ?', [id]);
    done(null, rows[0]);
});
