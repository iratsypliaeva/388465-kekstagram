'use strict';
(function () {
  // -------------------------------------------------------------------------------------
  // Popup
  // -------------------------------------------------------------------------------------
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var imageUploadOverlayPopup = window.popup.createPopup(imageUploadOverlay);
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var bigPictureUploadCancel = document.querySelector('.big-picture__cancel');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var textDescription = document.querySelector('.text__description');
  var success = document.querySelector('#success').content;
  var main = document.querySelector('main');


  window.gallery = {

    createGallery: function () {
      // create success message
      var successMessage = success.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(successMessage);
      main.appendChild(fragment);

      var successPopup = window.popup.createPopup(document.querySelector('.success'));
      successPopup.close();

      var successButton = document.querySelector('.success__button');
      successButton.onclick = function () {
        successPopup.close();
      };

      // on submit
      imageUploadForm.onsubmit = function (evt) {
        evt.preventDefault();

        var formData = new FormData(imageUploadForm);
        window.backend.sendData(formData, function () {
          imageUploadOverlayPopup.closePopup();
          textHashtags.value = '';
          textDescription.value = '';
          window.form.setEffect('none');
          successPopup.openPopup();
        }, function () {
          imageUploadOverlayPopup.closePopup();
          textHashtags.value = '';
          textDescription.value = '';
          window.form.setEffect('none');
          successPopup.openPopup();
        });
      };

      /**
       * 1.3. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
       * который стилизован под букву «О» в логотипе.
       * После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
       */

      uploadFile.addEventListener('change', function () {
        imageUploadOverlayPopup.open();
      });

      /**
       * 1.4. Закрытие формы редактирования изображения производится либо нажатием на кнопку .upload-cancel,
       * либо нажатием клавиши Esc.
       */
      var validateHashtags = function () {
        var arrTextHashtags = textHashtags.value.split(' ');
        if (arrTextHashtags.length > 5) {
          textHashtags.setCustomValidity('указано больше пяти хэш-тегов');
          return;
        }
        var dict = {};
        for (var i = 0; i < arrTextHashtags.length; i++) {
          if (arrTextHashtags[i].length > 20) {
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


      uploadCancel.addEventListener('click', function () {
        imageUploadOverlayPopup.close();
      });

      /**
       6.1. Взаимодействие со всеми активными элементами на странице должно быть доступно не только с помощью курсора
       и кликов на них, но и с помощью клавиатуры: все активные элементы должны фокусироваться и реагировать
       на нажатие клавиши Enter так же, как и на клик.
       **/
      bigPictureUploadCancel.addEventListener('click', function () {
        imageUploadOverlayPopup.close();
      });


      /**
       * 2.3. Хэш-теги
       */
      var textHashtags = document.querySelector('.text__hashtags');
      var imageUploadSubmitButton = document.querySelector('.img-upload__submit');

      textHashtags.addEventListener('input', function () {
        textHashtags.setCustomValidity('');
      });
      imageUploadSubmitButton.onclick = validateHashtags;
    }
  };
})();
