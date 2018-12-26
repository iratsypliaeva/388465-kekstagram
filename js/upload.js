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

  var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = imageUploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectRadio = document.querySelectorAll('.effects__radio');
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imageUploadEffectLevelPopup = window.popup.createPopup(imageUploadEffectLevel);
  var currentEffect = null;
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var EFFECT_LEVEL_STEP = 25;

  // clear form
  var clearForm = function () {
    textHashtags.value = '';
    textDescription.value = '';
    setEffect('none');
    scaleControlValue.value = '100%';
    imageUploadPreview.style.transform = 'scale(1.0)';
  };

  var setInitialPosition = function () {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    setIntensity(1);
  };

  var setIntensity = function (intensity) {
    if (currentEffect === 'chrome') {
      imageUploadPreview.style.filter = 'grayscale(' + intensity + ')';
    } else if (currentEffect === 'sepia') {
      imageUploadPreview.style.filter = 'sepia(' + intensity + ')';
    } else if (currentEffect === 'marvin') {
      imageUploadPreview.style.filter = 'invert(' + (intensity * 100) + '%)';
    } else if (currentEffect === 'phobos') {
      imageUploadPreview.style.filter = 'blur(' + (intensity * 3) + 'px)';
    } else if (currentEffect === 'heat') {
      imageUploadPreview.style.filter = 'brightness(' + (1 + intensity * 2) + ')';
    } else {
      imageUploadPreview.style.filter = '';
    }
  };

  var setEffect = function (effect) {
    if (effect !== currentEffect) {
      if (currentEffect) {
        imageUploadPreview.classList.remove('effects__preview--' + currentEffect);
      }
      imageUploadPreview.classList.add('effects__preview--' + effect);
      currentEffect = effect;
      setInitialPosition();
      if (currentEffect === 'none') {
        imageUploadEffectLevelPopup.close();
      } else {
        imageUploadEffectLevelPopup.open();
      }
    }
  };

  var createForm = function () {
    window.hashtags.initHashtags();
    setEffect('none');

    scaleControlSmaller.addEventListener('click', function () {
      if (parseInt(scaleControlValue.value, 10) !== EFFECT_LEVEL_STEP) {
        scaleControlValue.value = parseInt(scaleControlValue.value, 10) - EFFECT_LEVEL_STEP + '%';
        imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
      }
    });
    scaleControlBigger.addEventListener('click', function () {
      if (parseInt(scaleControlValue.value, 10) !== 100) {
        scaleControlValue.value = parseInt(scaleControlValue.value, 10) + EFFECT_LEVEL_STEP + '%';
        imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
      }
    });

    for (var i = 0; i < effectRadio.length; i++) {
      effectRadio[i].onclick = function () {
        setEffect(this.value);
      };
    }

    // на опускание мыши
    var startPinDrag = function (evt) {
      evt.preventDefault();
      var dragged = false;
      var offsetX = evt.clientX - effectLevelPin.getBoundingClientRect().left;
      var clickedPin = (evt.clientX >= effectLevelPin.getBoundingClientRect().left && evt.clientX <= effectLevelPin.getBoundingClientRect().right);

      var movePin = function (pinCoord) {
        var pinLeft = pinCoord - effectLevelLine.getBoundingClientRect().left;

        // Ограничить длиной линии
        if (pinLeft < 0) {
          pinLeft = 0;
        }
        if (pinLeft > effectLevelLine.offsetWidth) {
          pinLeft = effectLevelLine.offsetWidth;
        }
        effectLevelPin.style.left = pinLeft + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;

        var intensity = (effectLevelPin.offsetLeft + effectLevelPin.offsetWidth / 2) / effectLevelLine.offsetWidth;
        setIntensity(intensity);
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;
        if (clickedPin) {
          movePin(moveEvt.clientX - offsetX);
        }
      };
      // на отпускание кнопки мыши

      var onMouseUp = function (upEvt) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (!dragged) {
          movePin(upEvt.clientX);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    effectLevelLine.addEventListener('mousedown', startPinDrag);

    // create success message
    var successMessage = success.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    // success popup
    var successPopup = window.popup.createPopup(document.querySelector('.success'));
    successPopup.close();
    successPopup.getNode().onclick = function () {
      successPopup.close();
    };
    document.querySelector('.success__inner').onclick = function (evt) {
      evt.stopPropagation();
    };
    document.querySelector('.success__button').onclick = function () {
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
    errorPopup.getNode().onclick = function () {
      errorPopup.close();
    };
    document.querySelector('.error__inner').onclick = function (evt) {
      evt.stopPropagation();
    };
    document.querySelector('.error__button').onclick = function () {
      errorPopup.close();
    };

    // on submit
    imageUploadForm.onsubmit = function (evt) {
      evt.preventDefault();

      var formData = new FormData(imageUploadForm);
      window.backend.sendData(formData, function () {
        successPopup.open();
        clearForm();
        imageUploadOverlayPopup.close();
      }, function () {
        errorPopup.open();
        clearForm();
        imageUploadOverlayPopup.close();
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
        // clear and open
        clearForm();
        imageUploadOverlayPopup.open();
      });
    });

    //
    uploadCancel.addEventListener('click', function () {
      imageUploadOverlayPopup.close();
    });

    bigPictureUploadCancel.addEventListener('click', function () {
      imageUploadOverlayPopup.close();
    });
  };

  window.upload = {
    createForm: createForm
  };
})();
