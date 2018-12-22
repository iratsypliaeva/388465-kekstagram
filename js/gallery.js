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
  var textHashtags = document.querySelector('.text__hashtags');
  var success = document.querySelector('#success').content;
  var error = document.querySelector('#error').content;
  var main = document.querySelector('main');
  var imageUploadOverlayImg = document.querySelector('.img-upload__overlay').querySelector('img');

  // clear form

  var clearForm = function () {
    imageUploadOverlayPopup.close();
    textHashtags.value = '';
    textDescription.value = '';
    window.form.setEffect('none');
  };

  var createGallery = function () {
    window.hashtags.initHashtags();

    // create success message
    var successMessage = success.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    // success popup
    var successPopup = window.popup.createPopup(document.querySelector('.success'));
    successPopup.close();

    var successButton = document.querySelector('.success__button');
    successButton.onclick = function () {
      successPopup.close();
    };

    // create error message
    var errorMessage = error.cloneNode(true);
    fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    main.appendChild(fragment);

    // error popup
    var errorPopup = window.popup.createPopup(document.querySelector('.error'));
    errorPopup.close();

    var errorButton = document.querySelector('.error__button');
    errorButton.onclick = function () {
      errorPopup.close();
    };
    // on submit
    imageUploadForm.onsubmit = function (evt) {
      evt.preventDefault();

      var formData = new FormData(imageUploadForm);
      window.backend.sendData(formData, function () {
        successPopup.open();
        clearForm();
      }, function () {
        errorPopup.open();
        clearForm();
      });
    };

    // file loading
    var handleFileSelect = function (onLoad) {
      var file = uploadFile.files[0];
      var fr = new FileReader();
      fr.onload = function () {
        onLoad(fr.result);
      };
      fr.readAsDataURL(file);
    };

    uploadFile.addEventListener('change', function () {
      handleFileSelect(function (data) {
        imageUploadOverlayImg.setAttribute('src', data);
        imageUploadOverlayPopup.open();
      });
    });

    //
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
  };

  window.gallery = {
    createGallery: createGallery
  };
})();
