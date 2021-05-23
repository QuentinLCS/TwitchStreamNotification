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
    const Instagram = {
        API_URL: "https://graph.instagram.com/me/media?fields=",
        API_FIELDS: "caption,media_url,media_type,permalink,timestamp,username",

        /**
         * Initializes the plugin.
         * @param {object} options
         * @param {jQuery Object} elem
         */
        initialize: function (options, elem) {
            this.elem = elem;
            this.$elem = $(elem);
            (this.accessToken = $.fn.Instagram.accessData.accessToken),
                (this.options = $.extend({}, $.fn.Instagram.options, options));

            this.messages = {
                defaultImageAltText: "Cliquez pour accéder à l'image.",
                notFound: "Cet utilisateur instagram n'existe pas ou a passé son compte en privé.",
            };

            this.getPhotos();
        },

        /**
         * Calls the fetch function and work with the response.
         */
        getPhotos: function () {
            const self = this;

            self.fetch().done(function (results) {
                if (results.data) {
                    self.displayPhotos(results);
                } else if (results.error.message) {
                    $.error("Instagram - Error: " + results.error.message);
                } else {
                    $.error("Instagram - Error: Aucune photo sur le compte.");
                }
            });
        },

        /**
         * Makes the ajax call and returns the result.
         */
        fetch: function () {
            const getUrl =
                this.API_URL + this.API_FIELDS + "&access_token=" + this.accessToken;

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
        displayPhotos: function (results) {
            let $element,
                $video,
                hasCaption,
                imageGroup = [],
                postDiv = [],
                imageCaption,
                autoplay,
                max;

            max =
                this.options.max >= results.data.length
                    ? results.data.length
                    : this.options.max;

            if (results.data.length === 0) {

                this.$elem.append(this.messages.notFound);

                return;
            }

            for (let i = 0; i < max; i++) {

                imageGroup = [];

                if (
                    results.data[i].media_type === "IMAGE" ||
                    results.data[i].media_type === "CAROUSEL_ALBUM"
                ) {
                    hasCaption =
                        results.data[i].caption !== undefined;

                    imageCaption =
                        ($("<p>").text(hasCaption
                            ? results.data[i].caption
                            : this.messages.defaultImageAltText
                        ));

                    $element = $("<a>", {
                        href: results.data[i].permalink,
                        style:
                            "background:url(" +
                            results.data[i].media_url +
                            ") no-repeat center / cover;",
                        rel: "nofollow",
                    });

                    // Add item
                    imageGroup.push($element.append($("<span>").append(imageCaption)));
                    postDiv.push(($("<div>").append(imageGroup)));

                } else if (results.data[i].media_type === "VIDEO") {

                    hasCaption =
                      results.data[i].caption !== undefined;

                    autoplay =
                        this.options.autoplay === true
                            ? "autoplay muted loop playsinline"
                            : "";

                    imageCaption =
                      ($("<p>").text(hasCaption
                        ? results.data[i].caption
                        : this.messages.defaultImageAltText
                      ));

                    $source = $("<source>", {
                        src: results.data[i].media_url,
                        type: "video/mp4",
                    });

                    $video = $("<video " + autoplay + ">").append($source);

                    $element = $("<a>", {
                        href: results.data[i].permalink,
                        target: "_blank",
                        rel: "nofollow",
                    }).append($video);

                    // Add item
                    imageGroup.push($element.append($("<span>").append(imageCaption)));
                    postDiv.push(($("<div>").append(imageGroup)));

                }
            }

            this.$elem.append(postDiv);

            if (typeof this.options.complete === "function") {
                this.options.complete.call(this);
            }
        },
    };

    /**
     * FCInstagram Plugin Definition.
     */
    jQuery.fn.Instagram = function (options) {
        if (jQuery.fn.Instagram.accessData.accessToken) {
            this.each(function () {
                let instagram = Object.create(Instagram);

                instagram.initialize(options, this);
            });
        } else {
            $.error("Instagram - error : Token non valide.");
        }
    };

    // Plugin Default Options.
    jQuery.fn.Instagram.options = {
        complete: null,
        max: 4,
        autoplay: false
    };

    // Instagram Access Data.
    jQuery.fn.Instagram.accessData = {
        accessToken: null,
    };
})(jQuery, window, document);

jQuery.fn.Instagram.accessData = {
    accessToken: config.instagram.accessToken, // Token
};

$('#instagram-feed').Instagram({
    max: 4, // A number between 1 and 25 of photos to show. Default: 9
    autoplay: true, // Set autoplay video: true/false. Default: false
    complete: function () { // A callback function to execute after the display of the photos.
        console.log('Instagram completed');
    }
});
