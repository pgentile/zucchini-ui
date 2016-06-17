(function (angular) {
  'use strict';


  var PresenceService = function ($log, $interval, $rootScope, WindowVisibility, ReactiveWebSocket, UrlBuilder, callbackContainer) {

    var service = this;

    this.onOtherWatchersUpdated = callbackContainer();

    this.keepAliveTimeout = 10 * 1000;

    this._watcherId = new UUID(4).format();

    this._reference = null;

    this._otherWatchers = [];

    this.watchReference = function (reference) {
      this._reference = reference;

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

          service._updateWatchers([]);
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
      this._keepAliveTimer = $interval(function () {
        service._sendRefresh();
      }, this.keepAliveTimeout);
    };

    this._disableKeepAlive = function () {
      if (this._keepAliveTimer) {
        $interval.cancel(this._keepAliveTimer);
      }
    };

    this._updateWatchers = function (watcherIds) {
      var self = this;

      this._otherWatchers = watcherIds;
      $log.debug('Other watchers:', this._otherWatchers);

      $rootScope.$apply(function () {
        self.onOtherWatchersUpdated.invoke(service._otherWatchers);
      });

    };

    this._sendRefresh = function () {
      this._ws.send({ type: 'REFRESH' });
    };

    WindowVisibility.onVisible(function () {
      $log.debug('Visible, resuming');
      service.resume();
    });

    WindowVisibility.onHidden(function () {
      $log.debug('Hidden, pausing');
      service.pause();
    });

  };


  angular.module('zucchini-ui-frontend')
    .service('PresenceService', PresenceService);

})(angular);
