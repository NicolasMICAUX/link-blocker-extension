**Link Blocker** is an Open Source Chrome extension that disable all links to the websites you chose to blacklist, in any websites.

## Contributing
Feel free to contribute and improve this extension. The licence is MIT.

## How it works?
For the moment, the extension works like this:  
- Setup a MutationObserver
- Which detects all created `<a>` with an `href` matching the blacklisted domains
- Blacklisted domains are stored using `chrome.storage.sync`

Maybe this won't work on any type of link: if you want to improve it, make a PR :)

## Licence
This code is licenced under MIT.
