;!function() {

  'use strict';

  angular
    .module('app.commandLog.config', ['ngRoute'])
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/command-log.tpl.html',
        controller: 'CommandLogCtrl',
        controllerAs: 'vm'
      });
  }

}();