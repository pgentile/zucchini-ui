(function (angular, appConfig) {
  'use strict';

  var WindowVisibility = function ($window, $rootScope, $log) {

    var visibleListeners = [];

    var hiddenListeners = [];

    var eventListener = null;

    var callListeners = function (listeners) {
      if (listeners.length > 0) {
        $rootScope.$apply(function () {
          _.forEach(listeners, function (listener) {
            listener();
          });
        });
      }
    };

    var handleEvent = function (state) {
      switch (state) {
        case 'visible':
          callListeners(visibleListeners);
          break;

        case 'hidden':
          callListeners(hiddenListeners);
          break;
      }
    };

    var onListenerChange = function () {
      if (!eventListener) {
        eventListener =  function () {
          $log.debug('Window visibility event:', $window.document.visibilityState);
          handleEvent($window.document.visibilityState);
        };
        $window.document.addEventListener('visibilitychange', eventListener);
      }

    };

    this.onVisible = function (callback) {
      visibleListeners.push(callback);
      onListenerChange();
    };

    this.onHidden = function (callback) {
      hiddenListeners.push(callback);
      onListenerChange();
    };

  };


  var PresenceService = function (WindowVisibility, wsBaseUri, $log, $timeout, $rootScope) {

    var service = this;

    this.onOtherWatchersUpdated = null;

    this._watcherId = new UUID(4).format();

    this._ws = null;

    this._reference = null;

    this._otherWatchers = [];

    this.setReference = function (reference) {
      var oldReference = this._reference;
      this._reference = reference;
      this._updateReference(oldReference);
    };

    this._createWebSocket = function () {
      if (!this._ws) {
        this._ws = new WebSocket(wsBaseUri + '/presence/' + this._watcherId);

        this._ws.onopen = function () {
          $log.debug('WebSocket is ready');
          service._enableKeepAlive();
          service._updateReference();
        };

        this._ws.onerror = function (e) {
          $log.error('Got an error:', e);

          service._disableKeepAlive();
          this._ws = null;
        };

        this._ws.onmessage = function (message) {
          var content = angular.fromJson(message.data);
          $log.info('Received message:', content);

          if (content['@type'] === 'WATCHERS') {
            service._updateWatchers(content.reference, content.watcherIds);
          }
        };

        this._ws.onclose = function () {
          service._disableKeepAlive();
          this._ws = null;
        };
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
      this._keepAliveTimer = $timeout(function () {
        service._updateReference();
        service._enableKeepAlive();
      }, 5000);
    };

    this._disableKeepAlive = function () {
      if (this._keepAliveTimer) {
        $timeout.cancel(this._keepAliveTimer);
      }
    };

    this._updateWatchers = function (currentReference, watcherIds) {
      if (this._reference && this._reference.reference === currentReference.reference) {
        this._otherWatchers = _.filter(watcherIds, function (id) {
          return id !== service._watcherId;
        });
      } else {
        this._otherWatchers = [];
      }

      if (this.onOtherWatchersUpdated) {
        $rootScope.$apply(function () {
          service.onOtherWatchersUpdated(service._otherWatchers);
        });
      }

      $log.debug('Other watchers:', this._otherWatchers);
    };

    this._updateReference = function (oldReference) {
      if (this._ws && this._ws.readyState === WebSocket.OPEN) {
        if (oldReference) {
          this._ws.send(angular.toJson({
            '@type': 'UNWATCHING',
            'reference': oldReference
          }));
        }

        if (this._reference) {
          this._ws.send(angular.toJson({
            '@type': 'WATCHING',
            'reference': this._reference
          }));
        }
      }
    };

    this._sendAlive = function () {
      this._ws.send(angular.toJson({
        '@type': 'ALIVE',
        'reference': this._reference
      }));
    };

    this._createWebSocket();

    WindowVisibility.onVisible(function () {
      service._createWebSocket();
    });

    WindowVisibility.onHidden(function () {
      service._closeWebSocket();
    });

  };


  angular.module('zucchini-ui-frontend')
    .constant('wsBaseUri', _.trimEnd(appConfig.wsBaseUri, '/'))
    .service('WindowVisibility', WindowVisibility)
    .service('PresenceService', PresenceService);

})(angular, configuration);
