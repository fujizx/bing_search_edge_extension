
window.addEventListener('DOMContentLoaded', (event) => {
  chrome.storage.local.get('urls', (result) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      const urls = result.urls;
      const currentUrl = window.location.href;
      const matchingUrls = urls.filter((u) => u.url === currentUrl);
      if (matchingUrls.length > 0) {
        const title = matchingUrls[0].title;
        const div = document.createElement('div');
        div.textContent = title;
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.right = '0';
        div.style.backgroundColor = 'white';
        div.style.color = 'black';
        div.style.padding = '5px';
        div.style.zIndex = '99999';
        document.body.appendChild(div);
      }
    }
  });
});
