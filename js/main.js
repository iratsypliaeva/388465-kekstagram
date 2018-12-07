'use strict';

var picturesArr = window.data.createPicturesArr();
window.pictures.generateThumbnails(picturesArr);
window.gallery.createGallery();
window.preview.showImage(picturesArr[0]);
window.form.createNewImageForm();
