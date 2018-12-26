'use strict';

(function () {
  var TIMEOUT_MS = 10000;

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.contentType = 'multipart/form-data';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_MS;
    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };

  var receiveData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        if (onLoad) {
          onLoad(xhr.response);
        }
      } else {
        if (onError) {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });
    xhr.addEventListener('error', function () {
      if (onError) {
        onError('Произошла ошибка соединения');
      }
    });
    xhr.addEventListener('timeout', function () {
      if (onError) {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      }
    });

    xhr.timeout = TIMEOUT_MS;
    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send(null);
  };

  window.backend = {
    sendData: sendData,
    receiveData: receiveData
  };
})();
