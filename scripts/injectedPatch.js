// injectedPatch.js
(() => {
	console.log('Hello from injectedPatch.js!');
	
	// Patch XMLHttpRequest
	const origOpen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function(...openArgs) {
		this._requestUrl = openArgs[1];
		return origOpen.apply(this, openArgs);
	};
	
	const origSend = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function(body) {
		// If it's JSON, parse, fix the "query" field, then re-stringify
		try {
			const data = JSON.parse(body);
			if (typeof data.query === 'string') {
				// If data.query is "\"something\"" remove the extra quotes
				// e.g. "\"asd\"" -> "asd"
				data.query = data.query.replace(/^"|"$/g, '');
			}
			body = JSON.stringify(data);
		} catch (e) {
			// Body might not be JSON or we don't need to handle other cases
			console.warn('XHR body is not JSON or could not be parsed:', body);
		}
		
		console.log('Modified XHR body:', body);
		return origSend.call(this, body);
	};
})();