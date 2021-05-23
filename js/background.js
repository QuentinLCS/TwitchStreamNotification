check();
setInterval(function () {
    check();
}, 15000);

async function check() {
    const streamData = await getStreamData();
    if (streamData && streamData.type === 'live') {
        chrome.browserAction.setIcon({path: config.images.icon_on_64});
        chrome.browserAction.setTitle({title: 'QuentinLCS - EN LIVE'})
    } else chrome.browserAction.setIcon({path: config.images.icon_off_64});

    app();
}
