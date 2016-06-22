(function (angular) {
  'use strict';

  var ReactiveWebSocket = function ($q, $log, callbackContainer) {

    this.url = null;
    this.encoder = _.noop;
    this.decoder = _.noop;
    this.closeOnError = true;

    this.onOpen = callbackContainer();
    this.onMessage = callbackContainer();
    this.onClose = callbackContainer();
    this.onError = callbackContainer();

    this._ws = null;

    this.open = function () {
      var self = this;

      $log.debug('Opening connection to', this.url);

      this._ws = new WebSocket(this.url);

      this._ws.onopen = function () {
        $log.debug('Connected to', self.url);
        self.onOpen.invoke();
      };

      this._ws.onmessage = function (event) {
        var decodedData = self.decoder(event.data);
        self.onMessage.invoke(decodedData);
      };

      this._ws.onclose = function () {
        $log.debug('Closing connection to', self.url);

        self.onClose.invoke();
        self._ws = null;
      };

      this._ws.onerror = function (e) {
        $log.debug('Got error on connection to', self.url, ':', e);

        try {
          self.onError.invoke();
        } finally {
          if (self.closeOnError) {
            self.close();
          }
        }
      };

    };

    this.isOpen = function () {
      return this._ws !== null && this._ws.readyState === WebSocket.OPEN;
    };

    this.send = function (data) {
      var self = this;

      return $q(function (resolve, reject) {
        if (!self.isOpen()) {
          reject({ action: 'send', message: 'WebSocket is not in OPEN state' });
          return;
        }

        var encodedData = self.encoder(data);
        self._ws.send(encodedData);
        resolve(null);
      });
    };

    this.close = function () {
      if (this.isOpen()) {
        var ws = this._ws;
        this._ws = null;
        ws.close();
      }
    };

  };


  angular.module('zucchini-ui-frontend')
    .factory('ReactiveWebSocket', function ($q, $log, callbackContainer) {
      return function () {
        return new ReactiveWebSocket($q, $log, callbackContainer);
      };
    });

})(angular);
