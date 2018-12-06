'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
  'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


//-------------------------------------------------------------------------------------
// Генерация данных
//-------------------------------------------------------------------------------------

// функция случайного числа
var createRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// создание массива ссылок
var urlPictures = [];
for (var i = 1; i <= 25; i++) {
  var urlAddress = 'photos/' + createRandomNumber(1, 25) + '.jpg';
  if (urlPictures.includes(urlAddress) === false) {
    urlPictures.push(urlAddress);
  } else {
    i--;
  }
}


// функция случайного значения в массиве
var randomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var picturesArr = [];

for (var i = 0; i < 25; i++) {
  picturesArr.push({
    url: urlPictures[i],
    likes: createRandomNumber(15, 200),
    comments: createRandomNumber(1,2) === 1 ? [randomValue(COMMENTS)] : [randomValue(COMMENTS), randomValue(COMMENTS)],
    description: randomValue(DESCRIPTION)
  });
}

//-------------------------------------------------------------------------------------
// Генерация маленьких картинок
//-------------------------------------------------------------------------------------

var picture = document.querySelector('#picture')
  .content;

var bigPictureElement = document.querySelector('.big-picture');

var renderPicture = function (pic) {
  var pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pic.url;
  pictureElement.querySelector('.picture__likes').textContent = pic.likes;
  pictureElement.querySelector('.picture__comments').textContent = pic.comments.length;
  pictureElement.querySelector('.picture').onclick = function () {
    openPopup(bigPictureElement);
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

//-------------------------------------------------------------------------------------
// Popup
//-------------------------------------------------------------------------------------
var popup = null;
var focusFlag = false;

var openPopup = function (img) {
  img.classList.remove('hidden');
  popup = img;

  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  if (focusFlag) {
    return;
  }
  popup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};
//-------------------------------------------------------------------------------------
// Заполнение big pictures
//-------------------------------------------------------------------------------------
bigPictureElement.querySelector('.big-picture__img').children[0].src = picturesArr[0].url;
bigPictureElement.querySelector('.likes-count').textContent = picturesArr[0].likes;
bigPictureElement.querySelector('.comments-count').textContent = picturesArr[0].comments.length;

for (var i = 0; i < picturesArr[0].comments.length; i++) {
  bigPictureElement.querySelector('.social__comments').innerHTML +=  '<li class="social__comment">\
    <img class="social__picture" src="img/avatar-' + createRandomNumber(1,6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">\
    <p class="social__text">' + picturesArr[0].comments[i]+ '</p>\
  </li>';
}
bigPictureElement.querySelector('.social__caption').textContent = picturesArr[0].description;


// прячем блоки счетчика комментариев и загрузки новых комментариев
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

socialCommentCount.classList.add('.visually-hidden');
commentsLoader.classList.add('.visually-hidden');

var imageUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var bigPictureUploadCancel = document.querySelector('.big-picture__cancel');

/**
 * 1.3. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
 * который стилизован под букву «О» в логотипе.
 * После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
 */




uploadFile.addEventListener('change', function () {
  openPopup(imageUploadOverlay);
});
/**
 * 1.4. Закрытие формы редактирования изображения производится либо нажатием на кнопку .upload-cancel,
 * либо нажатием клавиши Esc.
 */


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};


uploadCancel.addEventListener('click', function () {
  closePopup();
});

/**
 6.1. Взаимодействие со всеми активными элементами на странице должно быть доступно не только с помощью курсора
 и кликов на них, но и с помощью клавиатуры: все активные элементы должны фокусироваться и реагировать
 на нажатие клавиши Enter так же, как и на клик.
 **/


bigPictureUploadCancel.addEventListener('click', function () {
  closePopup();
});
/**
 * 2.2. Наложение эффекта на изображение:

 На изображение может накладываться только один эффект.
 При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
 добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
 Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

 Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin.
 Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта,
 CSS-стили элемента .img-upload__preview обновляются следующим образом:

 Для эффекта «Хром» — filter: grayscale(0..1);
 Для эффекта «Сепия» — filter: sepia(0..1);
 Для эффекта «Марвин» — filter: invert(0..100%);
 Для эффекта «Фобос» — filter: blur(0..3px);
 Для эффекта «Зной» — filter: brightness(1..3).
 При выборе эффекта «Оригинал» слайдер скрывается.
 При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
 слайдер, CSS-стиль изображения и значение поля должны обновляться.

 *
 *
 */

/**var effectRadio = document.querySelectorAll('.effects__radio');
var imageUploadPreview = document.querySelector('.img-upload__preview');
var imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelDepth = document.querySelector('.effect-level__depth');


var currentEffect = null;

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

for (var i = 0; i < effectRadio.length; i++) {
  effectRadio[i].onclick = function () {
    setEffect(this.value);
  };
}


var setIntensity = function (intensity) {
  imageUploadEffectLevel.classList.remove('hidden');
  if (currentEffect === "chrome") {
    imageUploadPreview.style.filter = "grayscale(" + intensity + ")";
  } else if (currentEffect === "sepia") {
    imageUploadPreview.style.filter = "sepia(" + intensity + ")";
  } else if (currentEffect === "marvin") {
    imageUploadPreview.style.filter = "invert(" + (intensity*100) + ")";
  } else if (currentEffect === "phobos") {
    imageUploadPreview.style.filter = "blur(" + (intensity*3) + ")";
  } else if (currentEffect === "heat") {
    imageUploadPreview.style.filter = "brightness(" + (1 + intensity*2) + ")";
  } else {
    imageUploadEffectLevel.classList.add('hidden');
  }
};


var effectLevelValue = document.querySelector('.effect-level__value');

var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');

//
effectLevelPin.addEventListener('mouseup', function () {
  var intensity = effectLevelPin.offsetLeft / effectLevelPin.parentNode.offsetWidth;
  effectLevelValue.value = intensity * 100;
  setIntensity(intensity);
});

//
var setInitialPosition = function () {
  effectLevelPin.style.left = "100%";
  effectLevelValue.value = 100;
  effectLevelDepth.style.width = "100%";
  setIntensity(1);
};
*/
/**
 * 2.3. Хэш-теги:

 хэш-теги необязательны;+
 хэш-тег начинается с символа # (решётка);+
 хеш-тег не может состоять только из одной решётки;+
 хэш-теги разделяются пробелами;+
 один и тот же хэш-тег не может быть использован дважды;+
 нельзя указать больше пяти хэш-тегов;+
 максимальная длина одного хэш-тега 20 символов, включая решётку;+
 теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.+
 если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
 */
var textHashtags = document.querySelector('.text__hashtags');
var imageUploadSubmitButton = document.querySelector('.img-upload__submit');

var validateHashtags = function () {
  console.log(textHashtags.value);
  var arrTextHashtags = textHashtags.value.split(' ');
  if (arrTextHashtags.length > 5) {
    textHashtags.setCustomValidity('указано больше пяти хэш-тегов');
    return;
  }
  var dict = {};
  for (var i = 0; i < arrTextHashtags.length; i++ ) {
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

textHashtags.addEventListener('input', function () {
  textHashtags.setCustomValidity('');
});
imageUploadSubmitButton.onclick = validateHashtags;


textHashtags.onfocus = function () {
  focusFlag = true;
};
textHashtags.onblur = function () {
  focusFlag = false;
};

//-------------------------------------------------------------------------------------
// Перемещение слайдера
//-------------------------------------------------------------------------------------

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


var effectRadio = document.querySelectorAll('.effects__radio');
var imageUploadPreview = document.querySelector('.img-upload__preview');
var imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelDepth = document.querySelector('.effect-level__depth');

imageUploadEffectLevel.classList.add('hidden');


var currentEffect = null;

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

for (var i = 0; i < effectRadio.length; i++) {
  effectRadio[i].onclick = function () {
    setEffect(this.value);
  };
}


var setIntensity = function (intensity) {
  imageUploadEffectLevel.classList.remove('hidden');
  if (currentEffect === "chrome") {
    imageUploadPreview.style.filter = "grayscale(" + intensity + ")";
  } else if (currentEffect === "sepia") {
    imageUploadPreview.style.filter = "sepia(" + intensity + ")";
  } else if (currentEffect === "marvin") {
    imageUploadPreview.style.filter = "invert(" + (intensity*100) + "%)";
  } else if (currentEffect === "phobos") {
    imageUploadPreview.style.filter = "blur(" + (intensity*3) + "px)";
  } else if (currentEffect === "heat") {
    imageUploadPreview.style.filter = "brightness(" + (1 + intensity*2) + ")";
  } else {
    imageUploadPreview.style.filter = "";
    imageUploadEffectLevel.classList.add('hidden');
  }
};


var effectLevelValue = document.querySelector('.effect-level__value');

var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
var effectLevelLine = imageUploadOverlay.querySelector('.effect-level__line');

var setInitialPosition = function () {
  effectLevelPin.style.left = "100%";
  effectLevelValue.value = 100;
  effectLevelDepth.style.width = "100%";
  setIntensity(1);
};

// на опускание мыши
var startPinDrag = function (evt) {
  evt.preventDefault();
  var dragged = false;
  var offsetX = evt.clientX - effectLevelPin.getBoundingClientRect().left;
  var clickedPin = (evt.clientX >= effectLevelPin.getBoundingClientRect().left && evt.clientX <= effectLevelPin.getBoundingClientRect().right);

  var movePin = function (pinCoord) {
    var pinLeft = pinCoord -  effectLevelLine.getBoundingClientRect().left;

    //Ограничить длиной линии
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








































