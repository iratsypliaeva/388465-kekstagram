'use strict';

(function () {
  var createPopup = function (node) {

    var openPopup = function () {
      node.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      node.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.utils.keyCodes.ESC_KEYCODE) {
        closePopup();
      }
    };

    return {
      openPopup: openPopup,
      closePopup: closePopup
    };
  };

  window.popup = {
    createPopup: createPopup
  };
})();
