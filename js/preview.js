'use strict';
(function () {
  // -------------------------------------------------------------------------------------
  // Заполнение big pictures
  // -------------------------------------------------------------------------------------
  window.preview = {
    fillBigImage: function (picture) {
      var bigPictureElement = document.querySelector('.big-picture');
      var bigPictureElementPopup = window.popup.createPopup(bigPictureElement);
      bigPictureElementPopup.open();

      bigPictureElement.querySelector('.big-picture__img').children[0].src = picture.url;
      bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
      bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
      var socialComments = bigPictureElement.querySelector('.social__comments');
      var socialCommentCount = document.querySelector('.social__comment-count');
      var commentsLoaderButton = document.querySelector('.comments-loader');

      var count = 0;


      Array.from(socialComments.children).forEach(function (comment) {
        socialComments.removeChild(comment);
      });

      if (picture.comments.length > 5) {
        commentsLoaderButton.classList.remove('visually-hidden');
      } else {
        commentsLoaderButton.classList.remove('visually-hidden');
      }


      for (var i = 0; i < picture.comments.length; i++) {
        if (i >= 5) {
          socialComments.innerHTML += '<li class="social__comment visually-hidden">\n' +
            '<img class="social__picture" src="' + picture.comments[i].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35">\n' +
            '<p class="social__text">' + picture.comments[i].message + '</p>\n' +
            '</li>';
        } else {
          socialComments.innerHTML += '<li class="social__comment">\n' +
            '<img class="social__picture" src="' + picture.comments[i].avatar + '" alt="Аватар комментатора фотографии" width="35" height="35">\n' +
            '<p class="social__text">' + picture.comments[i].message + '</p>\n' +
            '</li>';
        }
      }

      count = Math.min(picture.comments.length, 5);
      socialCommentCount.innerHTML = count.toString() + ' из <span class="comments-count">' + picture.comments.length + '</span> комментариев';


      commentsLoaderButton.addEventListener('click', function () {
        var socialCommentsVisuallyHidden = document.querySelectorAll('.social__comments .visually-hidden');

        if (socialCommentsVisuallyHidden.length >= 5) {
          for (var ind = 0; ind < 5; ind++) {
            socialCommentsVisuallyHidden[ind].classList.remove('visually-hidden');
          }
          count += 5;
        } else {
          socialCommentsVisuallyHidden.forEach(function (socialCommentVisuallyHidden) {
            socialCommentVisuallyHidden.classList.remove('visually-hidden');
            count++;
          });
          commentsLoaderButton.classList.add('visually-hidden');
        }

        socialCommentCount.innerHTML = count.toString() + ' из <span class="comments-count">' + picture.comments.length + '</span> комментариев';
      });
      bigPictureElement.querySelector('.social__caption').textContent = picture.description;
      bigPictureElement.querySelector('.cancel').addEventListener('click', function () {
        bigPictureElementPopup.close();
      });
    }
  };


})();
