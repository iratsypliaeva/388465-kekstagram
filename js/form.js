'use strict';
(function () {
  // -------------------------------------------------------------------------------------
  // Перемещение слайдера
  // -------------------------------------------------------------------------------------
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectLevelValue = document.querySelector('.effect-level__value');
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
  var imageUploadScale = document.querySelector('.img-upload__scale');
  /**
   *

   При изменении значения поля .scale__control--value
   изображению .img-upload__preview должен добавляться соответствующий стиль CSS,
   который с помощью трансформации effect-level задаёт масштаб.
   Например, если в поле стоит значение 75%, то в стиле изображения
   должно быть написано transform: scale(0.75).


   * **/


  var setInitialPosition = function () {
    scaleControlValue.value = 100 + '%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.value = 100;
    effectLevelDepth.style.width = '100%';
    setIntensity(1);
  };


  scaleControlSmaller.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) !== 25) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) - 25 + '%';
      effectLevelValue.value = effectLevelValue.value - 25;
      effectLevelDepth.style.width = parseInt(effectLevelDepth.style.width, 10) - 25 + '%';
      effectLevelPin.style.left = parseInt(effectLevelPin.style.left, 10) - 25 + '%';
      setIntensity(parseInt(scaleControlValue.value, 10) / 100);

    }
  });
  scaleControlBigger.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) !== 100) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) + 25 + '%';
      effectLevelValue.value = effectLevelValue.value + 25;
      effectLevelDepth.style.width = parseInt(effectLevelDepth.style.width, 10) + 25 + '%';
      effectLevelPin.style.left = parseInt(effectLevelPin.style.left, 10) + 25 + '%';
      setIntensity(parseInt(scaleControlValue.value, 10) / 100);
    }
  });

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
        imageUploadScale.classList.add('hidden');
        imageUploadEffectLevelPopup.close();
      } else {
        imageUploadScale.classList.remove('hidden');
        imageUploadEffectLevelPopup.open();
      }
    }
  };

  var createNewImageForm = function () {
    setEffect('none');

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

        effectLevelValue.value = intensity * 100;
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
  };

  window.form = {
    createNewImageForm: createNewImageForm,
    setEffect: setEffect
  };
})();
