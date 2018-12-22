'use strict';

(function () {
  var lastTimeout;
  var popularFilterButton = document.querySelector('#filter-popular');
  var newFilterButton = document.querySelector('#filter-new');
  var discussedFilterButton = document.querySelector('#filter-discussed');

  var showFilters = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var processButton = function (btn) {
    popularFilterButton.classList.remove('img-filters__button--active');
    newFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');
    btn.classList.add('img-filters__button--active');
  };

  var createFiltersCallbacks = function (picturesArr) {

    popularFilterButton.addEventListener('click', window.debounce(function () {
      processButton(popularFilterButton);
      var popularImgArr = picturesArr.slice();
      window.pictures.deleteThumbnails();
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      window.pictures.generateThumbnails(popularImgArr);
    }));

    newFilterButton.addEventListener('click', window.debounce(function () {
      processButton(newFilterButton);
      var newImgArr = window.data.createPicturesArr().slice(0, 10);
      window.pictures.deleteThumbnails();
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      window.pictures.generateThumbnails(newImgArr);
    }));

    discussedFilterButton.addEventListener('click', window.debounce(function () {
      processButton(discussedFilterButton);
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
