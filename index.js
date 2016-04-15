var escape = require('html-escape');
var hljs = require('highlight.js');


var map = {
	'c_cpp': 'c'
};

module.exports = {

	website: {
		assets: "./assets",
		css: [
			"ace.css"
		],
		js: [
			"ace/ace.js",
			"ace.js"
		]
	},

	ebook: {
		assets: "./assets",
		css: [
			"pdf.css"
		]
	},

	blocks: {
		ace: {
			process: function(blk) {
				if (this.generator === 'website') {
					var config = {
						edit: blk.kwargs.edit,
						lang: blk.kwargs.lang || 'c_cpp',
						check: blk.kwargs.check,
						theme: blk.kwargs.theme
					};
					return '<div class="ace"><div class="aceCode" data-config=' + JSON.stringify(config) + '>' + escape(blk.body.trim()) + '<br></div></div>';
				} else {
					var content;
					var lang = blk.kwargs.lang || 'c_cpp';
					lang = map[lang] || lang;

					if (hljs.getLanguage(lang))
						content = hljs.highlight(lang, blk.body.trim()).value;
					else
						content = blk.body.trim();

					return '<pre><code class="hljs lang-' + lang + '">' + content + '</code></pre>';
				}
			}
		}
	}
};
