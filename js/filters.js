'use strict';

(function () {
  var lastTimeout;
  var showFilters = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };
  var popularFilterButton = document.querySelector('#filter-popular');
  var newFilterButton = document.querySelector('#filter-new');
  var discussedFilterButton = document.querySelector('#filter-discussed');

  var createFiltersCallbacks = function (picturesArr) {
 
    popularFilterButton.addEventListener('click', window.debounce(function () {
      var popularImgArr = picturesArr.slice();
      window.pictures.deleteThumbnails();
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      window.pictures.generateThumbnails(popularImgArr);
    }));

    newFilterButton.addEventListener('click', window.debounce(function () {
      var newImgArr = window.data.createPicturesArr().slice(0, 10);
      window.pictures.deleteThumbnails();
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      window.pictures.generateThumbnails(newImgArr);
    }));

    discussedFilterButton.addEventListener('click', window.debounce(function () {
      var copyArr = picturesArr.slice();
      var comparePict = function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        } else if (a.comments.length > b.comments.length) {
          return -1;
        } else {
          return 0;
        }
      };
      var discussedImgArr = copyArr.sort(comparePict);
      window.pictures.deleteThumbnails();
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      window.pictures.generateThumbnails(discussedImgArr);
    }));
  };

  window.filters = {
    showFilters: showFilters,
    createFiltersCallbacks: createFiltersCallbacks
  };
})();
