;!function() {

  'use strict';

  angular
    .module('app.commandRun.config', ['ngRoute'])
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/command-run', {
        templateUrl: 'templates/command-run.tpl.html',
        controller: 'CommandRunCtrl',
        controllerAs: 'vm'
      });
  }
  
}();