'use strict';

(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var imageUploadSubmitButton = document.querySelector('.img-upload__submit');
  var HASHTAG_LENGTH_MAX = 5;
  var HASHTAG_NUM_MAX = 20;


  var validateHashtags = function () {
    if (textHashtags.value === '') {
      textHashtags.setCustomValidity('');
      return;
    }
    var arrTextHashtags = textHashtags.value.split(' ');
    if (arrTextHashtags.length > HASHTAG_LENGTH_MAX) {
      textHashtags.setCustomValidity('указано больше пяти хэш-тегов');
      return;
    }
    var dict = {};
    for (var i = 0; i < arrTextHashtags.length; i++) {
      if (arrTextHashtags[i].length > HASHTAG_NUM_MAX) {
        textHashtags.setCustomValidity('длина хэш-тега превышает 20 символов');
        return;
      }
      if (arrTextHashtags[i].charAt(0) !== '#') {
        textHashtags.setCustomValidity('хэштэг должен начинаться с #');
        return;
      }
      if (arrTextHashtags[i].length <= 1) {
        textHashtags.setCustomValidity('длина хэш-тега меньше 2 символов');
        return;
      }
      if (arrTextHashtags[i].substring(1).indexOf('#') !== -1) {
        textHashtags.setCustomValidity('хэш-теги должны разделяться пробелами');
        return;
      }
      dict[arrTextHashtags[i].toLowerCase()] = 1;
    }
    var dictLen = Object.keys(dict).length;
    if (dictLen !== arrTextHashtags.length) {
      textHashtags.setCustomValidity('oдин и тот же хэш-тег был использован дважды');
      return;
    }
    textHashtags.setCustomValidity('');
  };

  var initHashtags = function () {
    textHashtags.addEventListener('input', function () {
      textHashtags.setCustomValidity('');
    });

    imageUploadSubmitButton.onclick = validateHashtags;
  };

  window.hashtags = {
    initHashtags: initHashtags
  };
})();
