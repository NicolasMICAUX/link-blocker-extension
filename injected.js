chrome.storage.sync.get(['blockedDomains'], function(result) {
    const DOMAINS_TO_BLOCK = new Set(result.blockedDomains || []);

    function process_node(node) {
        let links = node.querySelectorAll('a[href]');
        for (let link of links) {
            let hostname = new URL(link.href).hostname;
            // remove leading www. prefix if present
            hostname = hostname.replace(/^www\./, '');
            if (DOMAINS_TO_BLOCK.has(hostname)) {
                link.href = 'javascript:void(0)';
                link.onclick = () => {
                    alert('This website is blocked by extension: Link Blocker');
                };
                // remove link formatting
                link.style.textDecoration = 'none';
                link.style.color = 'inherit';
                link.style.cursor = 'default';
            }
        }
    }
    
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // find any link with `href` in a pre-defined set
                    process_node(node);
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    process_node(document.body);
  });
