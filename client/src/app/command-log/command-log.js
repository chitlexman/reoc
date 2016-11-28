;!function() {

  'use strict';

  angular
    .module('app.commandLog', ['app.commandLog.config', 'app.commandService'])
    .controller('CommandLogCtrl', CommandLogCtrl);

  CommandLogCtrl.$inject = ['commandService'];

  function CommandLogCtrl(commandService) {
    var vm = this;

    vm.commands = [];
    vm.refresh = refresh;

    refresh();

    function refresh() {
      return commandService.getExecutedCommands().then(function(res) {
        vm.commands = res.data;
        return vm.commands;
      });
    }
  }

}();