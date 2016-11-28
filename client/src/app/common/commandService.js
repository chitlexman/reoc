;!function() {

  'use strict';

  angular
    .module('app.commandService', ['ngResource'])
    .service('commandService', commandService);

  commandService.$inject = ['$http'];

  function commandService($http) {
    this.getExecutedCommands = getExecutedCommands;
    this.runCommand = runCommand;

    function getExecutedCommands() {
      return $http.get('/commands');
    }

    function runCommand(command, comment) {
      return $http.post('/commands', {command: command, comment: comment});
    }
  }

}();