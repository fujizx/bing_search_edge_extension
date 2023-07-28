
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

let count = 0;
let queries = [];

async function loadQueries() {
    const response = await fetch('queries.json');
    const data = await response.json();
    queries = data.queries;
}

async function doSearch() {
    if (count > 0 && queries.length > 0) {
        const query = queries[Math.floor(Math.random() * queries.length)];
        const url = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, {url: url});
        } else {
            chrome.tabs.create({url: url});
        }

        count--;
        chrome.action.setBadgeText({text: count.toString()});
        const delay = Math.floor(Math.random() * 5 + 4) * 1000;
        setTimeout(doSearch, delay);
    } else {
        chrome.action.setBadgeText({text: ''});
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'MS Rewards Assistant',
            message: 'Mission Complete'
        });
    }
}

loadQueries();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'start') {
        count = request.count;
        doSearch();
    } else if (request.command === 'stop') {
        count = 0;
        chrome.action.setBadgeText({text: ''});
    }
});
