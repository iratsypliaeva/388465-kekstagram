'use strict';

var onError = function (error) {
  alert(error);
};

var onLoad = function (picturesArr) {
  window.pictures.generateThumbnails(picturesArr);
  window.gallery.createGallery();
  window.preview.showImage(picturesArr[0]);
  window.form.createNewImageForm();
};
window.backend.receiveData(onLoad, onError);


