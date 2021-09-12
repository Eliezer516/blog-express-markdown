const express = require('express');
const ruta    = express.Router();
const { uid } = require('uid');
const matter  = require('gray-matter');
const fs      = require('fs');
const { getPostMeadata, getPost } = require('../lib/lib.js');

const global = process.cwd()

ruta.get('/creando-post', (req, res) => {
	res.render('editor')
})

ruta.post('/make-post', (req, res) => {
	const {titulo, editor, imagen} = req.body

	const metadatos = {
		title: titulo,
		date: new Date().getFullYear() + "-" + (new Date().getMonth() +1) + "-" + new Date().getDate(),
		slug: titulo.toLowerCase().split(' ').join('-'),
		id: uid(10),
		postImg: imagen
	}

	const postReady = matter.stringify(editor, metadatos)

	fs.writeFileSync(global + `/src/post/${titulo.toLowerCase().split(' ').join('-')}.md`, postReady)

	res.redirect('/')
})

module.exports = ruta