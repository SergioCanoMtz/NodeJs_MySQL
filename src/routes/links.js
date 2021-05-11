const express = require('express');
const router = express.Router();

const pool = require('../database'); 

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO link set ?', [newLink]);
    req.flash('correcto', 'Link agregado correctamente');
    res.redirect('/links');
});

router.get('/', async (req, res)=>{
    const links = await pool.query('SELECT * FROM link');
    console.log(links);
    res.render('links/list', {links});
});

router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM link WHERE id = ?', [id]);
    res.redirect('/links'); 
});

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM link WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async(req, res) => {
    const {id} = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    
    await pool.query('update link set ? where id = ?',[newLink, id]);
    res.redirect('/links');
});

module.exports = router;