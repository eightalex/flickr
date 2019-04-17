var flickrService = (function() {

    var searchInput;
    var API_URL = "http://api.flickr.com/services/rest/";

    var options = {
        "api_key": window.apiKey,
        "method": "flickr.photos.search",
        "format": "json",
        "nojsoncallback": "1"
    };

    function _setSearchInput(selector) {
        searchInput = document.querySelector(selector);
    }

    function _makeUrl(url) {
        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                url += (url === API_URL ? "?" : "&") + option + "=" + options[option];
            }
        }

        return url + "&text=" + searchInput.value;
    }

    function _sendRequest(callback) {
        var url = _makeUrl(API_URL);
        var xhr;

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
        setSearchInput: _setSearchInput,
        sendRequest: function(callback) {
            _sendRequest(function(data) {
                callback(_makeLinks(data))
            });
        }
    }

})();