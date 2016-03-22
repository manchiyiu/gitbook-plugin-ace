var escape = require('html-escape');
var highlight = require('highlight.js');

var map = {
	c_cpp: 'c'
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
						lang: blk.kwargs.lang,
						check: blk.kwargs.check,
						theme: blk.kwargs.theme
					};
					return '<div class="ace"><div class="aceCode" data-config=' + JSON.stringify(config) + '>' + escape(blk.body.trim()) + '<br></div></div>';
				} else {
					var body = blk.body.trim();

					var lang = blk.kwargs.lang;
					lang = map[lang] || lang.toLowerCase();

					var content = highlight.highlight(lang, body).value;
					content = '<div class="aceCode">' + content + '</div>';
					return content;
				}
			}
		}
	}
};
