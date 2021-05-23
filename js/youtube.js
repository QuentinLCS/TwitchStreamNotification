// For older browsers
if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {
        }

        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {
    const Youtube = {
        API_CHANNEL_URL: "https://www.googleapis.com/youtube/v3/channels",
        API_VIDEOS_URL: "https://www.googleapis.com/youtube/v3/playlistItems",

        /**
         * Initializes the plugin.
         * @param {object} options
         * @param {jQuery Object} elem
         */
        initialize: function (options, elem) {
            this.elem = elem;
            this.$elem = $(elem);
            (this.key = $.fn.Youtube.accessData.key),
                (this.channelId = $.fn.Youtube.accessData.channelId),
                (this.options = $.extend({}, $.fn.Youtube.options, options));

            this.messages = {
                defaultImageAltText: "Youtube video",
                notFound: "Chaine introuvable ou aucun contenu trouvé.",
            };

            this.getChannelInfos();
        },

        /**
         * Calls the fetch function and work with the response.
         */
        getChannelInfos: function () {
            const self = this;

            self.fetchChannel().done(function (results) {
                if (results.items) {
                    $.each(results.items, function (i, item) {
                        let pid = item.contentDetails.relatedPlaylists.uploads;
                        self.getVideos(pid);
                    });
                } else {
                    $.error("Youtube - Error: Aucune chaine trouvée.");
                }
            });
        },

        getVideos: function (pid) {
            const self = this;


            self.fetchVideos(pid).done(function (results) {

                if (results.items) {
                    self.displayVideos(results.items)
                } else {
                    $.error("Youtube - Error: Aucune vidéo trouvée.");
                }
            });
        },

        /**
         * Makes the ajax call and returns the result.
         */
        fetchChannel: function () {
            const getUrl =
                this.API_CHANNEL_URL + "?key=" + this.key + "&id=" + this.channelId + "&part=contentDetails";

            return $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: getUrl,
            });
        },

        /**
         * Makes the ajax call and returns the result.
         */
        fetchVideos: function (pid) {
            const getUrl =
                this.API_VIDEOS_URL + "?key=" + this.key + "&maxResults=" + this.options.max + "&playlistId=" + pid + "&part=snippet";

            return $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: getUrl,
            });
        },

        /**
         * Appends the markup to the DOM with the images.
         * @param {object} results
         */
        displayVideos: function (results) {
            let $element,
                hasCaption,
                videoGroup = [],
                videoCaption,
                videoDiv = [],
                max;

            max =
                this.options.max >= results.length
                    ? results.length
                    : this.options.max;

            if (results.length === 0) {

                this.$elem.append(this.messages.notFound);

                return;
            }

            for (let i = 0; i < max; i++) {

                videoGroup = [];

                hasCaption =
                    results[i].snippet.title !== null;

                videoCaption =
                    ($("<p>").text(
                        hasCaption
                        ? results[i].snippet.title
                        : this.messages.defaultImageAltText
                    ));

                $element = $("<a>", {
                    href: "https://www.youtube.com/watch?v=" + results[i].snippet.resourceId.videoId,
                    style:
                        "background:url(" +
                        results[i].snippet.thumbnails.default.url +
                        ") no-repeat center / cover;",
                    rel: "nofollow",
                });

                // Add item
                videoGroup.push($element.append($("<span>").append(videoCaption)));
                videoDiv.push(($("<div>").append(videoGroup)));
            }

            this.$elem.append(videoDiv);

            if (typeof this.options.complete === "function") {
                this.options.complete.call(this);
            }
        },
    };

    /**
     * FCInstagram Plugin Definition.
     */
    jQuery.fn.Youtube = function (options) {
        if (jQuery.fn.Youtube.accessData.key) {
            this.each(function () {
                const youtube = Object.create(Youtube);

                youtube.initialize(options, this);
            });
        } else {
            $.error("Une clé API est nécessaire afin de récupérer des données.");
        }
    };

    // Plugin Default Options.
    jQuery.fn.Youtube.options = {
        complete: null,
        max: 3,
    };

    // Instagram Access Data.
    jQuery.fn.Youtube.accessData = {
        accessToken: null,
        channelId: null,
    };
})(jQuery, window, document);

jQuery.fn.Youtube.accessData = {
    key: config.youtube.key,
    channelId: config.youtube.channelId
};
$('#youtube-feed').Youtube({
    max: 3, // A number between 1 and 25 of photos to show. Default: 9
    complete: function () { // A callback function to execute after the display of the photos.
        console.log('Youtube completed');
    }
});
