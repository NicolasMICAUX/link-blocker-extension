const statusDiv = document.getElementById('status');
const toggleBlockButton = document.getElementById('toggleBlock');

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    if (!activeTab.url) {
        statusDiv.textContent = 'You cannot use Link Blocker on this tab.';
        return;
    }
    let activeTabHostname = new URL(activeTab.url).hostname;
    activeTabHostname = activeTabHostname.replace(/^www\./, '');  // Remove leading www. prefix if present

    // Load the blocked domains from storage
    chrome.storage.sync.get(['blockedDomains'], function(result) {
    const domains = result.blockedDomains || [];
    const isBlocked = domains.includes(activeTabHostname);

    statusDiv.textContent = `Current site: ${activeTabHostname} is ${isBlocked ? 'blocked' : 'not blocked'}`;
    toggleBlockButton.textContent = isBlocked ? 'Unblock Site' : 'Block Site';

    toggleBlockButton.addEventListener('click', function() {
        if (isBlocked) {
        const updatedDomains = domains.filter(domain => domain !== activeTabHostname);
        chrome.storage.sync.set({ blockedDomains: updatedDomains }, function() {
            statusDiv.textContent = `${activeTabHostname} has been unblocked.`;
            toggleBlockButton.textContent = 'Block Site';
        });
        } else {
        domains.push(activeTabHostname);
        chrome.storage.sync.set({ blockedDomains: domains }, function() {
            statusDiv.textContent = `${activeTabHostname} has been blocked.`;
            toggleBlockButton.textContent = 'Unblock Site';
        });
        }
    });
    });
});