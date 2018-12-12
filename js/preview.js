'use strict';
(function () {

  // -------------------------------------------------------------------------------------
  // Заполнение big pictures
  // -------------------------------------------------------------------------------------
  window.preview = {
    showImage: function (picture) {
      var bigPictureElement = document.querySelector('.big-picture');
      bigPictureElement.querySelector('.big-picture__img').children[0].src = picture.url;
      bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
      bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;

      for (var i = 0; i < picture.comments.length; i++) {
        bigPictureElement.querySelector('.social__comments').innerHTML += '<li class="social__comment">\n' +
          '<img class="social__picture" src="' + picture.comments[i].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35">\n' +
          '<p class="social__text">' + picture.comments[i].message + '</p>\n' +
          '</li>';
      }
      bigPictureElement.querySelector('.social__caption').textContent = picture.description;


      // прячем блоки счетчика комментариев и загрузки новых комментариев
      var socialCommentCount = document.querySelector('.social__comment-count');
      var commentsLoader = document.querySelector('.comments-loader');

      socialCommentCount.classList.add('.visually-hidden');
      commentsLoader.classList.add('.visually-hidden');
    }
  };
})();
