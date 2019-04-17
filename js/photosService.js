var photosService = (function() {

    var resultsWrapper;
    var resultsItemClassName;
    var showMoreBtn;
    var itemsPerPage = 10;
    var itemsDisplayed = 0;
    var links = [];

    function _setElems(elems) {
        resultsItemClassName = elems.resultsItemClassName;
        resultsWrapper = document.querySelector(elems.resultsWrapper);
        showMoreBtn = document.querySelector(elems.showMoreBtn);
    }

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
            li.className = resultsItemClassName;
            img = document.createElement("img");
            img.src = links[i];
            li.appendChild(img);
            resultsWrapper.appendChild(li);
        }

        itemsDisplayed += itemsPerPage;
    }

    function _reset() {
        resultsWrapper.innerHTML = '';
        itemsDisplayed = 0;
        showMoreBtn.style.display = "inline-block";
    }

    return {
        setElems: _setElems,
        setLinks: _setLinks,
        render: _render,
        reset: _reset
    }

})();