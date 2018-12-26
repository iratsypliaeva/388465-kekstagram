'use strict';
(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];

  var NUM_PHOTOS = 25;
  var NUM_LIKES_MIN = 15;
  var NUM_LIKES_MAX = 200;

  // -------------------------------------------------------------------------------------
  // Генерация данных
  // -------------------------------------------------------------------------------------

  window.data = {
    createPicturesArr: function () {
      // создание массива ссылок
      var urlPictures = [];
      for (var i = 1; i <= NUM_PHOTOS; i++) {
        var urlAddress = 'photos/' + window.utils.createRandomNumber(1, NUM_PHOTOS) + '.jpg';
        if (urlPictures.includes(urlAddress) === false) {
          urlPictures.push(urlAddress);
        } else {
          i--;
        }
      }
      var picturesArr = [];

      for (var ind = 0; ind < NUM_PHOTOS; ind++) {
        picturesArr.push({
          url: urlPictures[ind],
          likes: window.utils.createRandomNumber(NUM_LIKES_MIN, NUM_LIKES_MAX),
          comments: window.utils.createRandomNumber(1, 2) === 1 ? [window.utils.randomValue(COMMENTS)] : [window.utils.randomValue(COMMENTS), window.utils.randomValue(COMMENTS)],
          description: window.utils.randomValue(DESCRIPTION)
        });
      }
      return picturesArr;
    }
  };
})();
