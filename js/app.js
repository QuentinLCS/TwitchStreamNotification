// Initilisation
$('body').on('click', 'a', function () {
    chrome.tabs.create({url: $(this).attr('href')});
});

async function app() {
    const auth = await OAuth();

    if (auth && auth.access_token) {
        config.twitch.access_token = auth.access_token;
    }

    const user = await getUserInfos();
    const data = await getStreamData();

    $('.stream').attr('href', 'https://twitch.tv/' + config.twitch.channel_name);

    $('.buttons').html("");
    for (let [key, value] of Object.entries(config.social)) {
        if (value) $('.buttons').append(`<a href="${value}" id="${key}"><img src="images/${key}.png" alt="${key}"></a>`);
    }

    if (user && data && data.type === 'live') {

        // Passer en mode EN LIVE
        $('.offline').addClass('disabled');
        $('.online').removeClass('disabled');

        // Récupération des informations
        const viewersCount = data.viewer_count ? data.viewer_count.toLocaleString('fr') : 0;
        const thumnailUrl = data.thumbnail_url.replace('-{width}x{height}', '') || 'images/assets/placeholder.png';

        // Modification des informations du front
        $('.online #viewers').html('<img src="images/eye.png" alt="Eye icon"> ' + viewersCount + ' spectateur' + (viewersCount < 2 ? '' : 's'));
        $('.online #stream-title').html(data.title);
        $('.online #thumbnail')[0].style.background = "url("+thumnailUrl+") no-repeat center / cover";

    } else if (user) { // Si le stream est HORS-LIGNE

        // Passer en mode HORS-LIGNE
        $('.online').addClass('disabled');
        $('.offline').removeClass('disabled');

    } else { // En cas d'erreur ( TWITCH / CONNEXION )
        $('.loading').addClass('disabled');
        $('.error').removeClass('disabled');
        return;
    }

    // Afficher la vue de l'application une fois chargée
    $('.loading').addClass('disabled');
    $('.app').removeClass('disabled');
}
