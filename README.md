# Nanobox

Extremely lightweight "lightbox". Zero-dependencies. Only 1.4 KB. And that's *without* minification and gzip.

## Usage

```html
<script src="https://cdn.jsdelivr.net/gh/jitbit/nanobox/nanobox.js"></script>

<a class="something" href="https://i.imgur.com/F36gf2O.jpg">click me</a>

<script>
	Nanobox.attach("a.something");
</script>
```

## Supports images and iframes

If the link points to an image - clicking the link will show an image modal.

If not - if will show an iframe pointing to the link (so you can use it with Yoututbe videos for example)

## Demo

https://codepen.io/jitbit/pen/MWBaNPq
