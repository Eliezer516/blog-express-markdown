const express  = require('express');
const app      = express();
const path = require('path');
const http     = require('http');
const reload   = require('reload');

const global = process.cwd()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({extended: false}))

app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));

// Ruta principal
app.use('/', require('./routes/routes.js'));
app.use('/admin', require('./routes/adminRoutes.js'))

// Iniciamos el servidor
const serv = http.createServer(app)
serv.listen(3000, (req, rea) => {
	console.log('servidor iniciado');
})
reload(app)