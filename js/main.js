'use strict';
(function () {
  var onLoad = function (picturesArr) {
    window.picturesArr = picturesArr;
    window.pictures.generateThumbnails(picturesArr);
    window.filters.showFilters();
    window.filters.createFiltersCallbacks(picturesArr);
    window.gallery.createGallery();
    window.form.createNewImageForm();
  };
  window.backend.receiveData(onLoad, function () {});
})();


