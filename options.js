const domainsList = document.getElementById('domains');
const domainInput = document.getElementById('domainInput');
const addDomainButton = document.getElementById('addDomain');

function renderDomains(domains) {
  domainsList.innerHTML = '';
  domains.forEach((domain, index) => {
    const li = document.createElement('li');
    li.textContent = domain;
    
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
      removeDomain(index);
    });

    li.appendChild(deleteButton);
    domainsList.appendChild(li);
  });
}

function removeDomain(index) {
  chrome.storage.sync.get(['blockedDomains'], function(result) {
    const domains = result.blockedDomains || [];
    domains.splice(index, 1);
    chrome.storage.sync.set({ blockedDomains: domains }, function() {
      renderDomains(domains);
    });
  });
}

// Load the blocked domains from storage
chrome.storage.sync.get(['blockedDomains'], function(result) {
  const domains = result.blockedDomains || [];
  renderDomains(domains);
});

// Add a new domain to the list
addDomainButton.addEventListener('click', function() {
  const newDomains = domainInput.value.split('\n').map(domain => domain.trim()).filter(domain => domain);
  if (newDomains.length > 0) {
    chrome.storage.sync.get(['blockedDomains'], function(result) {
      const domains = result.blockedDomains || [];
      newDomains.forEach(newDomain => {
        if (!domains.includes(newDomain)) {
          domains.push(newDomain);
        }
      });
      chrome.storage.sync.set({ blockedDomains: domains }, function() {
        renderDomains(domains);
        domainInput.value = '';
      });
    });
  }
});
