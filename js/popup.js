'use strict';

(function () {
  var createPopup = function (node) {

    var open = function () {
      node.classList.remove('hidden');
      node.classList.remove('visually-hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var close = function () {
      node.classList.add('hidden');
      node.classList.add('visually-hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var getNode = function () {
      return node;
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.utils.keyCodes.ESC_KEYCODE) {
        close();
      }
    };

    return {
      open: open,
      close: close,
      getNode: getNode
    };
  };

  window.popup = {
    createPopup: createPopup
  };
})();
