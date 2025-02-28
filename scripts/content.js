(() => {
	// Create a script tag pointing to an external file within your extension.
	const script = document.createElement('script');
	// 'injectedPatch.js' is another file you'll include in your extension (see below).
	script.src = chrome.runtime.getURL('scripts/injectedPatch.js');
	
	// Once the script is loaded into the page, remove the <script> element to keep the DOM clean.
	script.onload = function() {
		this.remove();
	};
	
	// Inject this <script> into the *real* page so it runs in the main world
	// (thus letting us override window.fetch, XHR, etc.).
	(document.head || document.documentElement).appendChild(script);
})();
