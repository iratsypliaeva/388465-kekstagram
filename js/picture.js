'use strict';
(function () {
  // -------------------------------------------------------------------------------------
  // Генерация маленьких картинок
  // -------------------------------------------------------------------------------------
  var generateThumbnails = function (picturesArr) {
    var previewElement = document.querySelector('.big-picture');
    var picture = document.querySelector('#picture').content;


    var renderPicture = function (pic) {
      var pictureElement = picture.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = pic.url;
      pictureElement.querySelector('.picture__likes').textContent = pic.likes;
      pictureElement.querySelector('.picture__comments').textContent = pic.comments.length.toString();
      pictureElement.querySelector('.picture').onclick = function () {
        window.preview.fillBigImage(pic);
      };
      return pictureElement;
    };


    // отрисовка элементов в блок pictures с использованием для вставки DocumentFragment
    var fragment = document.createDocumentFragment();
    var pictures = document.querySelector('.pictures');
    for (var index = 0; index < picturesArr.length; index++) {
      fragment.appendChild(renderPicture(picturesArr[index]));
    }
    pictures.appendChild(fragment);
  };

  // удаление всех картинок
  var deleteThumbnails = function () {
    var elems = document.querySelectorAll('.picture');
    elems.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };

  window.pictures = {
    generateThumbnails: generateThumbnails,
    deleteThumbnails: deleteThumbnails
  };
})();
