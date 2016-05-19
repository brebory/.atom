(function() {
  var CompositeDisposable, Debugger, logger, onBreak, os, processManager, _debugger;

  CompositeDisposable = require('atom').CompositeDisposable;

  Debugger = require('./debugger').Debugger;

  logger = require('./logger');

  os = require('os');

  processManager = null;

  _debugger = null;

  onBreak = null;

  module.exports = {
    config: {
      nodePath: {
        type: 'string',
        "default": os.platform() === 'win32' ? 'node.exe' : '/bin/node'
      },
      debugPort: {
        type: 'number',
        minium: 5857,
        maxium: 65535,
        "default": 5858
      },
      debugHost: {
        type: 'string',
        "default": '127.0.0.1'
      },
      nodeArgs: {
        type: 'string',
        "default": ''
      },
      scriptMain: {
        type: 'string',
        "default": ''
      },
      appArgs: {
        type: 'string',
        "default": ''
      },
      env: {
        type: 'string',
        "default": ''
      }
    },
    activate: function() {
      this.disposables = new CompositeDisposable();
      _debugger = new Debugger(atom);
      this.disposables.add(_debugger.subscribeDisposable('connected', function() {
        return atom.notifications.addSuccess('connected, enjoy debugging : )');
      }));
      this.disposables.add(_debugger.subscribeDisposable('disconnected', function() {
        return atom.notifications.addInfo('finish debugging : )');
      }));
      return this.disposables.add(atom.commands.add('atom-workspace', {
        'node-debugger:start-resume': this.startOrResume,
        'node-debugger:start-active-file': this.startActiveFile,
        'node-debugger:stop': this.stop,
        'node-debugger:toggle-breakpoint': this.toggleBreakpoint,
        'node-debugger:step-next': this.stepNext,
        'node-debugger:step-in': this.stepIn,
        'node-debugger:step-out': this.stepOut,
        'node-debugger:attach': this.attach
      }));
    },
    startOrResume: (function(_this) {
      return function() {
        if (_debugger.isConnected()) {
          return _debugger.reqContinue();
        } else {
          return _debugger.start();
        }
      };
    })(this),
    attach: (function(_this) {
      return function() {
        if (_debugger.isConnected()) {
          return;
        }
        return _debugger.attach();
      };
    })(this),
    startActiveFile: (function(_this) {
      return function() {
        if (_debugger.isConnected()) {
          return;
        }
        return _debugger.startActiveFile();
      };
    })(this),
    toggleBreakpoint: (function(_this) {
      return function() {
        var editor, path, row;
        editor = atom.workspace.getActiveTextEditor();
        path = editor.getPath();
        row = editor.getCursorBufferPosition().row;
        return _debugger.breakpointManager.toggleBreakpoint(editor, path, row);
      };
    })(this),
    stepNext: (function(_this) {
      return function() {
        if (_debugger.isConnected()) {
          return _debugger.step('next', 1);
        }
      };
    })(this),
    stepIn: (function(_this) {
      return function() {
        if (_debugger.isConnected()) {
          return _debugger.step('in', 1);
        }
      };
    })(this),
    stepOut: (function(_this) {
      return function() {
        if (_debugger.isConnected()) {
          return _debugger.step('out', 1);
        }
      };
    })(this),
    stop: (function(_this) {
      return function() {
        return _debugger.cleanup();
      };
    })(this),
    deactivate: function() {
      logger.info('deactive', 'stop running plugin');
      this.stop();
      this.disposables.dispose();
      return _debugger.dispose();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL25vZGUtZGVidWdnZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZFQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQyxXQUFZLE9BQUEsQ0FBUSxZQUFSLEVBQVosUUFERCxDQUFBOztBQUFBLEVBRUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSLENBRlQsQ0FBQTs7QUFBQSxFQUdBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUhMLENBQUE7O0FBQUEsRUFLQSxjQUFBLEdBQWlCLElBTGpCLENBQUE7O0FBQUEsRUFNQSxTQUFBLEdBQVksSUFOWixDQUFBOztBQUFBLEVBT0EsT0FBQSxHQUFVLElBUFYsQ0FBQTs7QUFBQSxFQVNBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsUUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFZLEVBQUUsQ0FBQyxRQUFILENBQUEsQ0FBQSxLQUFpQixPQUFwQixHQUFpQyxVQUFqQyxHQUFpRCxXQUQxRDtPQURGO0FBQUEsTUFHQSxTQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxNQUFBLEVBQVEsSUFEUjtBQUFBLFFBRUEsTUFBQSxFQUFRLEtBRlI7QUFBQSxRQUdBLFNBQUEsRUFBUyxJQUhUO09BSkY7QUFBQSxNQVFBLFNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxXQURUO09BVEY7QUFBQSxNQVdBLFFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxF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

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/node-debugger.coffee
