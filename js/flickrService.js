var flickrService = (function() {

    var searchInput = document.querySelector(".js_search-form__input");

    var options = {
        "api_key": window.apiKey,
        "method": "flickr.photos.search",
        "format": "json",
        "nojsoncallback": "1"
    };

    function _makeUrl() {
        var url = "http://api.flickr.com/services/rest/",
            first = true;

        for (var item in options) {
            if (options.hasOwnProperty(item)) {
                url += (first ? "?" : "&") + item + "=" + options[item];
                first = false;
            }
        }

        return url + "&text=" + searchInput.value;
    }

    function _sendRequest(callback) {
        var url = _makeUrl(),
            xhr;

        xhr = new XMLHttpRequest();
        xhr.onload = function() { callback(this.response); };
        xhr.open('get', url, true);
        xhr.send();
    }

    function _makeLinks(data) {
        var d = JSON.parse(data);
        var p = d.photos.photo;
        var links = [];

        for (var z = 0; z < d.photos.photo.length; z++) {
            links.push(
                'https://farm'+p[z]['farm']+'.staticflickr.com/'+p[z]['server']+'/'+p[z]['id']+'_'+p[z]['secret']+'_n.jpg'
            );
        }

        return links;
    }

    return {
        sendRequest: function(callback) {
            _sendRequest(function(data) {
                callback(_makeLinks(data))
            });
        }
    }

})();