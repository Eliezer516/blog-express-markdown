const express  = require('express');
const ruta     = express.Router();

const { getPostMeadata, getPost } = require('../lib/lib.js')


ruta.get('/', (req, res) => {
	res.render('index', {data: getPostMeadata()})
})

ruta.get('/posts/:post', (req, res) => {
	const { post } = req.params
	res.render(`[post].ejs`, {contenido: getPost(post).contenido, metadata: getPost(post).datos})
})

// ruta.get('/admin', require('./adminRoutes.js'))

module.exports = ruta;