;!function() {

  'use strict';

  angular
    .module('app', ['app.commandLog', 'app.commandRun', 'templates']);
    
}();
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