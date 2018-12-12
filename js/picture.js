'use strict';
(function () {
  // -------------------------------------------------------------------------------------
  // Генерация маленьких картинок
  // -------------------------------------------------------------------------------------
  window.pictures = {
    generateThumbnails: function (picturesArr) {
      var bigPictureElement = document.querySelector('.big-picture');
      var picture = document.querySelector('#picture').content;
      var popup = window.popup.createPopup(bigPictureElement);


      var renderPicture = function (pic) {
        var pictureElement = picture.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = pic.url;
        pictureElement.querySelector('.picture__likes').textContent = pic.likes;
        pictureElement.querySelector('.picture__comments').textContent = pic.comments.length.toString();
        pictureElement.querySelector('.picture').onclick = function () {
          popup.openPopup();
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
    }
  };
})();
