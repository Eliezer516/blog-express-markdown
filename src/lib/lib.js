const fs       = require('fs');
const path     = require('path');
const matter   = require('gray-matter');
const {uid}    = require('uid');
const showdown = require('showdown')

const global = process.cwd()

function getPostMeadata() {
	const files = 	fs.readdirSync(path.join(global, '/src/post')).map( item => item.replace('.md', ''))

	const metaDataFiles = files.map( post => {
		const mdSource = fs.readFileSync(path.join(global, '/src/post', `${post}.md`), 'utf-8')
		const { data } = matter(mdSource)

		return data
	} )

	return metaDataFiles
}

function getPost(post) {
	const md = fs.readFileSync(path.join(global, '/src/post', `${post}.md`), 'utf-8')
	const { content,  data} = matter(md)

	const contenido = new showdown.Converter().makeHtml(content)
	const datos = data

	return {contenido, datos}
}

module.exports = {
	getPostMeadata,
	getPost
}