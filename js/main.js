var searchForm = document.querySelector(".js_search-form");
var showMoreBtn = document.querySelector(".js_results__btn");

flickrService.setSearchInput(".js_search-form__input");
photosService.setElems({
    resultsItemClassName: "results__item",
    resultsWrapper: ".js_results__wrapper",
    showMoreBtn: ".js_results__btn"
});

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    flickrService.sendRequest(function(links) {
        photosService.reset();
        photosService.setLinks(links);
        photosService.render();
    });
});

showMoreBtn.addEventListener("click", function() {
    photosService.render()
});