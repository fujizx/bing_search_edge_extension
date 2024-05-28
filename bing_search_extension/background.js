
self.addEventListener('install', function (event) {
    self.skipWaiting();
});

let count = 0;
let queries = [];

async function loadQueries() {
    const response = await fetch('queries_new.json');
    const data = await response.json();
    queries = data;
}

async function doSearch() {
    if (count > 0) {
        // const query = queries[Math.floor(Math.random() * queries.length)];
        const questionWord = queries.question_words[Math.floor(Math.random() * queries.question_words.length)];
        const noun = queries.nouns[Math.floor(Math.random() * queries.nouns.length)];
        const verb = queries.verbs[Math.floor(Math.random() * queries.verbs.length)];
        const probabilityOfVerb = 0.7; 

        let query = `${questionWord} ${noun}`;
        if(Math.random() < probabilityOfVerb){
            query += ` ${verb}`;
        }
        const url = 'https://www.bing.com/search?q=' + encodeURIComponent(query)+'&form=QBRE';
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { url: url });
        } else {
            chrome.tabs.create({ url: url });
        }

        count--;
        chrome.action.setBadgeText({ text: count.toString() });
        const delay = Math.floor(Math.random() * 5 + 5) * 1000;
        setTimeout(doSearch, delay);
    }
}

loadQueries();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'start') {
        count = request.count;
        doSearch();
    } else if (request.command === 'stop') {
        count = 0;
        chrome.action.setBadgeText({ text: '' });
    }
});
