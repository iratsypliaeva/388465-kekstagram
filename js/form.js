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

  var currentEffect = null;


  var setInitialPosition = function () {
    effectLevelPin.style.left = '100%';
    effectLevelValue.value = 100;
    effectLevelDepth.style.width = '100%';
    setIntensity(1);
  };
  var setIntensity = function (intensity) {
    imageUploadEffectLevel.classList.remove('hidden');
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
      imageUploadEffectLevel.classList.add('hidden');
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
    }
  };
  var createNewImageForm = function () {
    /**
     * В этом задании мы закончим работу над слайдером, задающим глубину эффекта, заставив его перемещаться.

     Теперь, когда вы знакомы с тем, как работает механизм перетаскивания элементов, вы можете закончить работу над слайдером.

     Вам нужно описать полный цикл Drag n Drop для пина маркера, то есть добавить обработчики событий mousedown, mousemove и mouseup на маркер.

     Обработчики mousemove и mouseup должны добавляться только при вызове обработчика mousedown.

     Обработчик mousemove должен запускать логику изменения положения пина: в нём должны вычисляться новые координаты пина на основании смещения,
     применяться через стили к элементу и записываться в поле уровня эффекта (с поправкой на то, что в это поле записываются координаты середины пина).

     При перемещении, кроме состояния слайдера, должна меняться глубина эффекта, наложенного на изображение,
     то есть меняться значение CSS-фильтра, добавленного на изображение. Это нетривиальная задача,
     потому что значение CSS-фильтра записывается в одних границах, а положение слайдера в других.
     Вам нужно использовать пропорцию, чтобы рассчитать насыщенность правильно.

     Учтите, что расчёт координат пина и их запись в поле должны дублироваться и в обработчике mouseup,
     потому что в некоторых случаях, пользователь может нажать мышь на слайдере, но никуда его не переместить.

     Ещё один момент касается ограничения перетаскивания: не забудьте сделать так,
     чтобы слайдер можно было двигать только горизонтально и при этом движение должно быть ограничено пределами слайдера.

     Пункты ТЗ, выполненные в задании:
     2.2. Наложение эффекта на изображение:

     На изображение может накладываться только один эффект.
     При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс,
     соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
     Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value.
     При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются следующим образом:

     Для эффекта «Хром» — filter: grayscale(0..1);
     Для эффекта «Сепия» — filter: sepia(0..1);
     Для эффекта «Марвин» — filter: invert(0..100%);
     Для эффекта «Фобос» — filter: blur(0..3px);
     Для эффекта «Зной» — filter: brightness(1..3).
     При выборе эффекта «Оригинал» слайдер скрывается.
     При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
     */

    imageUploadEffectLevel.classList.add('hidden');

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
