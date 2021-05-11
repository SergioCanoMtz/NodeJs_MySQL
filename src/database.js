const mysql = require('mysql');
const { database } = require('./keys');
const pool =  mysql.createPool(database);
const { promisify } = require ('util');

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('La conexion con la base de datos fue cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('la conexion tiene muchas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('La conexion fue rechazada');
        }
    }

    if(connection) connection.release();
    console.log('La base de datos está conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;