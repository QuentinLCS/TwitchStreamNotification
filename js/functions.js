async function OAuth() {
    return await new Promise(resolve => {
        $.ajax({
            type: 'POST',
            url: `https://id.twitch.tv/oauth2/token?client_id=${config.twitch.client_id}&client_secret=${config.twitch.client_secret}&grant_type=client_credentials`,
            success: res => resolve(res || null),
            error: err => resolve(null),
        })
    });
}

async function streamIsOpen() {
    return await new Promise(resolve =>
        chrome.windows.getAll({populate: true}, (windows) => {
            for (let window of windows) {
                const tabs = window.tabs;
                for (let tab of tabs) {
                    if (tab.url.includes('twitch.tv/' + config.twitch.channel_name)) {
                        return resolve(true);
                    }
                }
            }
            return resolve(false);
        })
    );
}

async function getUserInfos() {
    return await new Promise(resolve => {
        $.ajax({
            dataType: 'json',
            headers: {'Client-ID': config.twitch.client_id, 'Authorization': 'Bearer ' + config.twitch.access_token},
            url: "https://api.twitch.tv/helix/users?login=" + config.channel_name,
            success: user =>
                user && user.data && user.data[0]
                    ? resolve(user.data[0])
                    : resolve(null),
            error: err => resolve(null),
        })
    });
}

async function getStreamData() {
    return await new Promise(resolve => {
        $.ajax({
            dataType: 'json',
            headers: {'Client-ID': config.twitch.client_id, 'Authorization': 'Bearer ' + config.twitch.access_token},
            url: "https://api.twitch.tv/helix/streams?user_login=" + config.twitch.channel_name,
            success: stream =>
                stream && stream.data && stream.data[0]
                    ? resolve(stream.data[0])
                    : resolve(null),
            error: err => resolve(null),
        });
    });
}
