const $ = (selector) => document.querySelector(selector);



const editor = $('#editor')
const markdownparsed = $('.markdownparsed')

editor.addEventListener('keyup', function(e) {
	markdownparsed.innerHTML = marked(editor.value, {headerIds: false})
	hljs.highlightAll();
});
