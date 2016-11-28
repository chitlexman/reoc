;!function() {

  'use strict';

  angular
  .module('app.commandRun', ['app.commandRun.config', 'app.commandService'])
  .controller('CommandRunCtrl', CommandRunCtrl);

  CommandRunCtrl.$inject = ['commandService'];

  function CommandRunCtrl (commandService) {
    var vm = this;

    vm.command = '';
    vm.comment = '';
    vm.run = run;

    function run() {
      return commandService.runCommand(vm.command, vm.comment).then(clear);
    }

    function clear() {
      vm.command = '';
      vm.comment = '';
    }
  }

}();