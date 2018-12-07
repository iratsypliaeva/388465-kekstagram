'use strict';
// функция случайного числа
(function () {
  window.utils = {
    keyCodes: {
      ESC_KEYCODE: 27
    },
    createRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // функция случайного значения в массиве
    randomValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
