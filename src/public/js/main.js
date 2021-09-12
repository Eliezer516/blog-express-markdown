const $ = (selector) => document.querySelector(selector);



const editor = $('#editor')
const markdownparsed = $('.markdownparsed')

$('.cerrar').addEventListener('click', () => {
	$('.blur-box').classList.toggle('blur-activo')
	$('.form-controll').classList.toggle('form-controll-hide')
})

editor.addEventListener('keyup', function(e) {
	markdownparsed.innerHTML = marked(editor.value, {headerIds: false})
	hljs.highlightAll();
});
