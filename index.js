var escape = require('html-escape');
var hljs = require('highlight.js');

var getParams = function (header, param) {
	var regex = new RegExp(param + '=([\\s\\S]+?)[\\s,%]', 'mg');
	if (!header.match(regex)) {
		return null;
	} else {
		var attr = header.match(regex)[0]
			.replace(regex, '$1')
			.replace(/^\'/, '"')
			.replace(/'$/, '"');
		return JSON.parse(attr);
	}
};

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

	// blocks: {
	// 	ace: {
	// 		process: function(blk) {
	// 			if (this.generator === 'website') {
	// 				var config = {
	// 					edit: blk.kwargs.edit,
	// 					lang: blk.kwargs.lang || 'c_cpp',
	// 					check: blk.kwargs.check,
	// 					theme: blk.kwargs.theme
	// 				};
	// 				return '<div class="ace"><div class="aceCode" data-config=' + JSON.stringify(config) + '>' + escape(blk.body.trim()) + '<br></div></div>';
	// 			} else {
	// 				var content;
	// 				var lang = blk.kwargs.lang || 'c_cpp';
	// 				lang = map[lang] || lang;

	// 				if (hljs.getLanguage(lang))
	// 					content = hljs.highlight(lang, blk.body.trim()).value;
	// 				else
	// 					content = blk.body.trim();

	// 				return '<pre><code class="hljs lang-' + lang + '">' + content + '</code></pre>';
	// 			}
	// 		}
	// 	}
	// },

	hooks: {
		'page:before': function (page) {
			var self = this;
			var blocks = page.content.match(/{%ace[\s\S]+?%}[\s\S]+?{%endace%}/mg);
			blocks && blocks.forEach(function (block) {
				var newBody = block;
				var header = block.replace(/{%ace[\s\S]+?%}/mg, '$&');
				var body = block.replace(/{%ace[\s\S]+?%}([\s\S]+?){%endace%}/mg, '$1').trim();
				var config = {
					edit: getParams(header, 'edit') || false,
					lang: getParams(header, 'lang') || 'c_cpp',
					check: getParams(header, 'check') || false,
					theme: getParams(header, 'theme') || false,
				};
				if (self.output.name === 'website') {
					newBody = '<div class="ace"><div class="aceCode" data-config=' + JSON.stringify(config) + '>' + escape(body) + '<br></div></div>';
				} else {
					config.lang = map[config.lang] || config.lang;
					if (hljs.getLanguage(lang)) {
						body = hljs.highlight(lang.body.trim()).value;
					} else {
						body = body.trim();
					}
					newBody = '<pre><code class="hljs lang-' + config.lang + '">' + body + '</code></pre>';
				}
				page.content = page.content.replace(block, newBody);
			});
			return page;
		}
	}
};
