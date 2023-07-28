
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get('urls', (result) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      const urls = result.urls;
      const randomIndex = Math.floor(Math.random() * urls.length);
      const randomUrl = urls[randomIndex].url;
      chrome.tabs.create({ url: randomUrl });
    }
  });
});
