//nanobox - lightest possible lightbox (c) jitbit, Alex Yumashev
const Nanobox = {
	attach(selector) {
		document.querySelectorAll(selector).forEach(link => link.addEventListener('click', (e) => {
			e.preventDefault();
			if (!this.overlay) this.init();
			const isImg = /\.(jpg|gif|png|webp|jpeg|avif)$/i.test(link.href);
			const el = isImg ? this.img : this.ifr;
			this.img.style.display = this.ifr.style.display = 'none';
			el.style.display = 'block';
			el.src = link.href;
			this.overlay.style.display = 'block';
		}));
	},
	init() {
		document.head.insertAdjacentHTML('beforeend', `<style>
			.nanobox { position:fixed; inset:0; background:#111111bb; z-index:10000; backdrop-filter:blur(10px); }
			.nanobox a { position:fixed; right:15px; top:10px; font-size:3em; color:#fff; text-decoration:none; }
			.nanobox img, .nanobox iframe { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:8px; border:0; }
			.nanobox img { max-width:80%; max-height:80%; }
			.nanobox iframe { width:80%; height:80%; }
			@media(max-width:800px) { .nanobox img, .nanobox iframe { width:95vw; height:95vw; max-width:95vw; max-height:95vw; } }
		</style>`);

		this.overlay = document.createElement('div');
		this.overlay.className = 'nanobox';
		this.overlay.innerHTML = '<a href="javascript:;">×</a><img><iframe></iframe>';
		document.body.append(this.overlay);

		[this.img, this.ifr] = this.overlay.querySelectorAll('img,iframe');
		
		const close = () => { this.overlay.style.display = 'none'; this.ifr.src = 'about:blank'; };
		this.overlay.addEventListener('click', close);
		document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
	}
};
