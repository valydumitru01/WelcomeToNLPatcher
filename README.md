# Job Search Quote Remover
Chrome Extension Link: [Job Search Quote Remover](https://chromewebstore.google.com/detail/gfdcnenpmkdnhgbmfbnemebmcpoahpon?utm_source=item-share-cp)
This Chrome extension removes unwanted quotation marks from the search query in an XHR request on the `jobportal.ent.europe-west4.gcp.elastic-cloud.com` site, ensuring the site’s boolean operators (`+ | - " *`) work properly.

## Motivation

The job search form automatically wraps the entered query in quotes, preventing the use of boolean operators. By intercepting the XHR request body and removing the extra quotes, searches with boolean operators such as `manager + director` or `"managing director"` behave as intended.

## How It Works

1. **Content Script**  
   A content script injects a separate JavaScript file (`injectedPatch.js`) into the page’s main execution context.

2. **Monkey-Patching `XMLHttpRequest`**  
   `injectedPatch.js` overrides `XMLHttpRequest.prototype.send`:
    - When the request body is JSON, it looks for the `query` field and removes any wrapping quotes (`"\"something\""` → `"something"`).
    - The modified body is then sent to the server.

3. **Result**  
   The final request payload is free of double-quoted queries, enabling valid use of boolean and wildcard operators.

## File Structure
```
job-search-quote-remover/ 
    ├── manifest.json 
    ├── contentScript.js 
    ├── injectedPatch.js 
    └── README.md (this file)
```

## Installation

1. **Clone or download** this repository.
2. **Open Chrome** (or a Chromium-based browser) and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the folder containing `manifest.json`.

## Usage

- Navigate to the relevant job search page.
- Type your query with boolean operators (e.g. `manager + director`, `manager | director`, `manager -director`, `"managing director"`, `manage*`).
- The extension silently removes extra quotes on the backend, so searches with boolean operators work correctly.

## Notes

- This fix only applies to XHR requests on the target domain you specify (in `host_permissions`).
- Boolean operators, quotes, and other symbols will now be respected by the job portal’s search.