const express  = require('express');
const app      = express();
const path     = require('path');
const fs       = require('fs');
const showdown = require('showdown')
const matter   = require('gray-matter');
const {uid} = require('uid');
const http = require('http');
const reload = require('reload');

const root = process.cwd()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({extended: false}))
app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));



// Funcion para obtener los metadatos de los post markdown
const getPostMeadata = () => {
	const files = 	fs.readdirSync(path.join(root, '/src/post')).map( item => item.replace('.md', ''))

	const metaDataFiles = files.map( post => {
		const mdSource = fs.readFileSync(path.join(root, '/src/post', `${post}.md`), 'utf-8')
		const { data } = matter(mdSource)

		return data
	} )

	return metaDataFiles
}
// Funcion para obtener todos los post
const getPost = (post) => {
	const md = fs.readFileSync(path.join(root, '/src/post', `${post}.md`), 'utf-8')
	const { content,  data} = matter(md)

	const contenido = new showdown.Converter().makeHtml(content)
	const datos = data

	return {contenido, datos}
}
// Ruta principal
app.get('/', (req, res) => {
	res.render('index', {data: getPostMeadata()})
})


app.post('/make-post', (req, res) => {
	const {titulo, editor} = req.body

	const metadatos = {
		title: titulo,
		date: new Date().getFullYear() + "-" + (new Date().getMonth() +1) + "-" + new Date().getDate(),
		slug: titulo.toLowerCase().split(' ').join('-'),
		id: uid(10),
	}

	const postReady = matter.stringify(editor, metadatos)

	fs.writeFileSync(__dirname + `/post/${titulo.toLowerCase().split(' ').join('-')}.md`, postReady)

	res.redirect('/')
})

app.get('/creando-post', (req, res) => {
	res.render('editor')
})

// Mostramos todas las rutas a los post utilizando el mismo nombre de cada post markdown
app.get('/posts/:post', (req, res) => {
	const { post } = req.params
	res.render(`[post].ejs`, {contenido: getPost(post).contenido, metadata: getPost(post).datos})
})

// Iniciamos el servidor
app.listen(3000, (req, rea) => {
	console.log('servidor iniciado');
})
reload(app)


