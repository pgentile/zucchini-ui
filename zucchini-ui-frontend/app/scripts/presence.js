(function (angular) {
  'use strict';


  var PresenceService = function ($log, $interval, WindowVisibility, ReactiveWebSocket, UrlBuilder, presenceInfos, callbackContainer) {

    var service = this;

    this.onOtherWatchersUpdated = callbackContainer();
    this.onConnectionLost = callbackContainer();

    this.keepAliveTimeout = 25 * 1000;

    this._watcherId = presenceInfos.get().watcherId;

    this._reference = null;

    this._otherWatchers = [];

    this._onVisibleCallback = null;
    this._onHiddenCallback = null;

    this.watchReference = function (reference) {
      this._reference = reference;

      this._onVisibleCallback = WindowVisibility.onVisible(function () {
        $log.debug('Visible, resuming');
        service.resume();
      });

      this._onHiddenCallback = WindowVisibility.onHidden(function () {
        $log.debug('Hidden, pausing');
        service.pause();
      });

      if (WindowVisibility.isVisible()) {
        this._createWebSocket();
      }

    };

    this.pause = function () {
      this._closeWebSocket();
    };

    this.resume = function () {
      this._createWebSocket();
    };

    this.unwatch = function () {
      this._closeWebSocket();

      if (this._onVisibleCallback) {
        this._onVisibleCallback.remove();
      }
      if (this._onHiddenCallback) {
        this._onHiddenCallback.remove();
      }
    };

    this._createWebSocket = function () {
      if (!this._ws) {

        this._ws = ReactiveWebSocket();
        this._ws.url = UrlBuilder.createWebSocketUrl('/presence', {
          watcherId: this._watcherId,
          type: this._reference.type,
          reference: this._reference.reference
        });
        this._ws.encoder = angular.toJson;
        this._ws.decoder = angular.fromJson;

        this._ws.onOpen(function () {
          service._enableKeepAlive();
        });

        this._ws.onMessage(function (message) {
          $log.debug('Received message:', message);

          if (message.type === 'OTHER_WATCHERS') {
            service._updateWatchers(message.watcherIds);
          }
        });

        this._ws.onClose(function () {
          service._disableKeepAlive();
          service._ws = null;
          service._otherWatchers = [];

          service.onConnectionLost.invoke();
        });

        this._ws.open();

      }
    };

    this._closeWebSocket = function () {
      if (this._ws) {
        this._ws.close();
        this._ws = null;
      }
    };

    this._keepAliveTimer = null;

    this._enableKeepAlive = function () {
      if (!this._keepAliveTimer) {
        this._keepAliveTimer = $interval(function () {
          service._sendRefresh();
        }, this.keepAliveTimeout);
      }
    };

    this._disableKeepAlive = function () {
      if (this._keepAliveTimer) {
        $interval.cancel(this._keepAliveTimer);
        this._keepAliveTimer = null;
      }
    };

    this._updateWatchers = function (watcherIds) {
      this._otherWatchers = watcherIds;
      this.onOtherWatchersUpdated.invoke(service._otherWatchers);
    };

    this._sendRefresh = function () {
      if (this._ws) {
        this._ws.send({ type: 'REFRESH' });
      }
    };

  };


  angular.module('zucchini-ui-frontend')
    .service('PresenceService', PresenceService)
    .factory('presenceInfos', function (BrowserLocalStorage) {
      return BrowserLocalStorage.getItem('presenceInfos', function () {
        return {
          watcherId: new UUID(4).format()
        };
      });
    });

})(angular);
