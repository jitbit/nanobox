//nanobox - lightest possible lightbox (c) jitbit, Alex Yumashev

const Nanobox = new (function () {
	const imgRx = /\.(jpg|gif|png|webp|jpeg|avif)$/i;
	const div = document.createElement('div');
	div.innerHTML = `<div style='display:none;' class="nanobox-overlay">
		<a href="javascript:;">×</a>
		<img />
		<iframe></iframe>
	</div>`;
	const overlay = div.firstElementChild;
	const img = overlay.firstElementChild.nextElementSibling;
	const ifr = img.nextElementSibling;

	const style = document.createElement('style');
	style.textContent = `
		.nanobox-overlay { position:fixed;background:#111111bb;width:100%;height:100%;inset:0;z-index:10000;backdrop-filter:blur(10px);
			a { position:fixed;right:10px;top:10px;font-size:3em;color:#fff;text-decoration:none; }
			img, iframe { position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:8px;border:none; }
			iframe { width:80%;height:80%; }
			img { max-width:80%;max-height:80%; }
		}

		@media (max-width: 768px) {
			.nanobox-overlay {
				img { max-width: 95vw !important; }
				iframe { width: 95vw !important; }
			}
		}
	`;
	document.head.appendChild(style);

	document.body.appendChild(overlay);

	function closeOverlay() {
		overlay.style.display = 'none';
		ifr.src = 'about:blank'; //stop YT
	};
	overlay.addEventListener('click', closeOverlay);
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeOverlay();
	});

	this.attach = (selector) => {
		document.querySelectorAll(selector).forEach(link => {
			let el = imgRx.test(link.href) ? img : ifr;

			link.addEventListener("click", (e) => {
				e.preventDefault();
				img.style.display = ifr.style.display = 'none';
				el.style.display = '';
				el.src = link.href;
				overlay.style.display = '';
			});
		});
	}
});
