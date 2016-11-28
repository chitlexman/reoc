var exec = require('child_process').exec;

var stateEnum = {
  COMPLETE: 'Завершено',
  PROCESS:  'В процессе',
  ERR:      'Ошибка'
};

function Command(command, comment) {
  var that = this;

  that.command = command;
  that.comment = comment;
  that.state = stateEnum.PROCESS;
  that.start = new Date();

  exec(that.command, function(error, stdout, stderr) {
    that.finish = new Date();
    that.state = stderr || error ? stateEnum.ERR : stateEnum.COMPLETE,
    that.result = stdout;
  });
}

exports.Command = Command;

