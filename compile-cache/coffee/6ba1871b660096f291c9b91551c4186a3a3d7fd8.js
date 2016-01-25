(function() {
  var BufferedProcess, CommandRunner, CompositeDisposable, Emitter, path, pty, _ref;

  _ref = require('atom'), BufferedProcess = _ref.BufferedProcess, Emitter = _ref.Emitter, CompositeDisposable = _ref.CompositeDisposable;

  path = require('path');

  pty = require('pty.js');

  module.exports = CommandRunner = (function() {
    function CommandRunner() {
      this.subscriptions = new CompositeDisposable();
      this.emitter = new Emitter();
    }

    CommandRunner.prototype.spawnProcess = function(command) {
      var args, shell, useLogin;
      shell = atom.config.get('run-command.shellCommand') || '/bin/bash';
      useLogin = atom.config.get('run-command.useLoginShell');
      args = ['-c', command];
      if (useLogin) {
        args = ['-l'].concat(args);
      }
      console.log('args:', args);
      this.term = pty.spawn(shell, ['-c', command], {
        name: 'xterm-color',
        cwd: this.constructor.workingDirectory(),
        env: process.env
      });
      this.term.on('data', (function(_this) {
        return function(data) {
          return _this.emitter.emit('data', data);
        };
      })(this));
      return this.term.on('exit', (function(_this) {
        return function() {
          return _this.emitter.emit('exit');
        };
      })(this));
    };

    CommandRunner.homeDirectory = function() {
      return process.env['HOME'] || process.env['USERPROFILE'] || '/';
    };

    CommandRunner.workingDirectory = function() {
      var activePath, editor, relative, _ref1;
      editor = atom.workspace.getActiveTextEditor();
      activePath = editor != null ? editor.getPath() : void 0;
      relative = atom.project.relativizePath(activePath);
      if (activePath != null) {
        return relative[0] || path.dirname(activePath);
      } else {
        return ((_ref1 = atom.project.getPaths()) != null ? _ref1[0] : void 0) || this.homeDirectory();
      }
    };

    CommandRunner.prototype.onCommand = function(handler) {
      return this.emitter.on('command', handler);
    };

    CommandRunner.prototype.onData = function(handler) {
      return this.emitter.on('data', handler);
    };

    CommandRunner.prototype.onExit = function(handler) {
      return this.emitter.on('exit', handler);
    };

    CommandRunner.prototype.onKill = function(handler) {
      return this.emitter.on('kill', handler);
    };

    CommandRunner.prototype.run = function(command) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var result;
          _this.kill();
          _this.emitter.emit('command', command);
          result = {
            output: '',
            exited: false,
            signal: null
          };
          _this.spawnProcess(command);
          _this.subscriptions.add(_this.onData(function(data) {
            return result.output += data;
          }));
          _this.subscriptions.add(_this.onExit(function() {
            result.exited = true;
            return resolve(result);
          }));
          return _this.subscriptions.add(_this.onKill(function(signal) {
            result.signal = signal;
            return resolve(result);
          }));
        };
      })(this));
    };

    CommandRunner.prototype.kill = function(signal) {
      signal || (signal = 'SIGTERM');
      if (this.term != null) {
        this.emitter.emit('kill', signal);
        process.kill(this.term.pid, signal);
        this.term.destroy();
        this.term = null;
        this.subscriptions.dispose();
        return this.subscriptions.clear();
      }
    };

    return CommandRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1bi1jb21tYW5kL2xpYi9jb21tYW5kLXJ1bm5lci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkVBQUE7O0FBQUEsRUFBQSxPQUFrRCxPQUFBLENBQVEsTUFBUixDQUFsRCxFQUFDLHVCQUFBLGVBQUQsRUFBa0IsZUFBQSxPQUFsQixFQUEyQiwyQkFBQSxtQkFBM0IsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FGTixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsdUJBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxtQkFBQSxDQUFBLENBQXJCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxPQUFBLENBQUEsQ0FEZixDQURXO0lBQUEsQ0FBYjs7QUFBQSw0QkFJQSxZQUFBLEdBQWMsU0FBQyxPQUFELEdBQUE7QUFDWixVQUFBLHFCQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDBCQUFoQixDQUFBLElBQStDLFdBQXZELENBQUE7QUFBQSxNQUNBLFFBQUEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMkJBQWhCLENBRFgsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FIUCxDQUFBO0FBSUEsTUFBQSxJQUFHLFFBQUg7QUFDRSxRQUFBLElBQUEsR0FBTyxDQUFDLElBQUQsQ0FBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkLENBQVAsQ0FERjtPQUpB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

//# sourceURL=/Users/broberto/.atom/packages/run-command/lib/command-runner.coffee
