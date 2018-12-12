'use strict';

/**
 * Создайте модуль backend.js, который экспортирует в глобальную область видимости функции для взаимодействия с удаленным севером через XHR.

 получать с сервера данные с помощью объекта XMLHttpRequest, обрабатывать полученные запросы и
 передавать полученную информацию в функцию обратного вызова;
 отправлять данные на сервер.
 Функция получения данных с сервера должна принимать на вход следующие параметры:

 onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса.
 При вызове функции onLoad в её единственный параметр передаётся набор полученных данных;
 onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
 При вызове функции onError в её единственный параметр передаётся сообщение об ошибке.
 Функция для отправки данных на сервер должна принимать на вход следующие параметры:

 data — объект FormData, который содержит данные формы, которые будут отправлены на сервер;
 onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса;
 onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
 При вызове функции onError в её единственный параметр передается сообщение об ошибке или объект с описанием ошибки полученный с сервера.
 Подключите модуль backend.js в index.html.
  */
(function () {
  /**
  window.upload = function (data, onSuccess) {
    var xhr = new HMLHttprequest();


    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

  };*/
  window.backend = {
    sendData: function (data, onLoad, onError) {
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

      xhr.timeout = 10000; // 10s
      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(data);
    },

    receiveData: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
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

      xhr.timeout = 10000; // 10s
      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send(null);
    }
  };
})();
