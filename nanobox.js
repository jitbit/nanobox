//nanobox - lightest possible lightbox (c) jitbit, Alex Yumashev

"use strict";
const Nanobox = new (function () {
	let div = document.createElement('div');
	div.innerHTML = `<div style='position:fixed;display:none;background:#111111bb;width:100%;height:100%;top:0;left:0;z-index:10000;backdrop-filter:blur(10px)'>
		<a href="javascript:;" style='position:fixed;right:10px;top:10px;font-size:2em;color:#fff;text-decoration:none'>&#x1F7AE;</a>
		<img id='imgNanobox' style='display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-height:80%' />
		<iframe id='iframeNanobox' style='display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:80%;height:80%'></iframe>
	</div>`;
	let overlay = div.firstChild;
	document.body.appendChild(overlay);
	overlay.addEventListener('click', () => {
		overlay.style.display = 'none';
		_id('iframeNanobox').src = 'about:blank'; //stop YT
	});

	this.attach = (selector) => {
		document.querySelectorAll(selector).forEach(anchor => {
			let el = /\.(jpg|gif|png|webp|jpeg)/gi.test(anchor.href) ? _id("imgNanobox") : _id("iframeNanobox");

			anchor.addEventListener("click", (e) => {
				e.preventDefault();
				_id("imgNanobox").style.display = _id("iframeNanobox").style.display = 'none';
				el.style.display = '';
				el.src = anchor.href;
				overlay.style.display = '';
			});
		});
	}

	function _id(id) { return document.getElementById(id); }
});
