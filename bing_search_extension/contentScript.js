async function doRewardsTask() {
    // bing homepage
    const url = 'https://www.bing.com';
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { url: url });
    } else {
        chrome.tabs.create({ url: url });
    }

    // Find the iframe with the specified title
    const iframe = document.querySelector('iframe[title="Microsoft Rewards"]');

    if (!iframe) {
        console.error('Failed to find iframe with title "Microsoft Rewards"');
        return;
    }
    // Get the document within the iframe
    const iframeDocument = iframe.contentDocument;
    // Find all div elements with class "shortPoint point"
    const pointDivs = iframeDocument.querySelectorAll('div.shortPoint.point');
    if (!pointDivs.length) {
        console.error('Failed to find any div elements with class "shortPoint point"');
        return;
    }
    // Process each div element
    for (const pointDiv of pointDivs) {
        // Find the parent div with class "promo_cont"
        let parentDiv = pointDiv.parentNode;
        while (parentDiv && !parentDiv.classList.contains('promo_cont')) {
            parentDiv = parentDiv.parentNode;
        }
        if (!parentDiv) {
            console.error('Failed to find parent div with class "promo_cont" for pointDiv');
            continue;
        }
        // Find the first link within the parent div
        const linkElement = parentDiv.querySelector('a[href]');
        if (!linkElement) {
            console.error('Failed to find first link within parent div');
            continue;
        }
        // Get the link URL
        const linkURL = linkElement.getAttribute('href');
        if (!linkURL) {
            console.error('Failed to get link URL from linkElement');
            continue;
        }
        // Navigate to the link URL
        await window.open(linkURL, '_blank');
    }
}