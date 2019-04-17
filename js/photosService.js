var photosService = (function() {

    var resultWrapper = document.querySelector(".js_results__wrapper");
    var showMoreBtn = document.querySelector(".js_results__btn");
    var itemsPerPage = 10;
    var itemsDisplayed = 0;
    var links = [];

    function _setLinks(data) {
        links = data;
    }

    function _render() {
        var li, img;

        if (itemsDisplayed >= links.length) {
            showMoreBtn.style.display = "none";
            return;
        }

        for (var i = itemsDisplayed; i < (itemsDisplayed + itemsPerPage); i++) {
            if (links[i] === undefined) continue;
            li = document.createElement("li");
            li.className = "results__item";
            img = document.createElement("img");
            img.src = links[i];
            li.appendChild(img);
            resultWrapper.appendChild(li);
        }

        itemsDisplayed += itemsPerPage;
    }

    function _reset() {
        resultWrapper.innerHTML = '';
        itemsDisplayed = 0;
    }

    return {
        setLinks: _setLinks,
        render: _render,
        reset: _reset
    }

})();