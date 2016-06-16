(function() {
  var Main, ModuleManager, Watcher, d, packageManager,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Watcher = require('./watcher');

  ModuleManager = require('./module_manager');

  packageManager = atom.packages;

  d = (require('debug'))('refactor');

  module.exports = new (Main = (function() {
    function Main() {
      this.onDone = __bind(this.onDone, this);
      this.onRename = __bind(this.onRename, this);
      this.onDestroyed = __bind(this.onDestroyed, this);
      this.onCreated = __bind(this.onCreated, this);
    }

    Main.prototype.renameCommand = 'refactor:rename';

    Main.prototype.doneCommand = 'refactor:done';

    Main.prototype.config = {
      highlightError: {
        type: 'boolean',
        "default": true
      },
      highlightReference: {
        type: 'boolean',
        "default": true
      }
    };


    /*
    Life cycle
     */

    Main.prototype.activate = function(state) {
      d('activate');
      this.moduleManager = new ModuleManager;
      this.watchers = [];
      atom.workspace.observeTextEditors(this.onCreated);
      atom.commands.add('atom-text-editor', this.renameCommand, this.onRename);
      return atom.commands.add('atom-text-editor', this.doneCommand, this.onDone);
    };

    Main.prototype.deactivate = function() {
      var watcher, _i, _len, _ref;
      this.moduleManager.destruct();
      delete this.moduleManager;
      _ref = this.watchers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        watcher = _ref[_i];
        watcher.destruct();
      }
      delete this.watchers;
      atom.workspaceView.off(this.renameCommand, this.onRename);
      return atom.workspaceView.off(this.doneCommand, this.onDone);
    };

    Main.prototype.serialize = function() {};


    /*
    Events
     */

    Main.prototype.onCreated = function(editor) {
      var watcher;
      watcher = new Watcher(this.moduleManager, editor);
      watcher.on('destroyed', this.onDestroyed);
      return this.watchers.push(watcher);
    };

    Main.prototype.onDestroyed = function(watcher) {
      watcher.destruct();
      return this.watchers.splice(this.watchers.indexOf(watcher), 1);
    };

    Main.prototype.onRename = function(e) {
      var isExecuted, watcher, _i, _len, _ref;
      isExecuted = false;
      _ref = this.watchers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        watcher = _ref[_i];
        isExecuted || (isExecuted = watcher.rename());
      }
      d('rename', isExecuted);
      if (isExecuted) {
        return;
      }
      return e.abortKeyBinding();
    };

    Main.prototype.onDone = function(e) {
      var isExecuted, watcher, _i, _len, _ref;
      isExecuted = false;
      _ref = this.watchers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        watcher = _ref[_i];
        isExecuted || (isExecuted = watcher.done());
      }
      if (isExecuted) {
        return;
      }
      return e.abortKeyBinding();
    };

    return Main;

  })());

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3JlZmFjdG9yL2xpYi9yZWZhY3Rvci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsK0NBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUixDQUFWLENBQUE7O0FBQUEsRUFDQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQURoQixDQUFBOztBQUFBLEVBRVksaUJBQW1CLEtBQTdCLFFBRkYsQ0FBQTs7QUFBQSxFQUdBLENBQUEsR0FBSSxDQUFDLE9BQUEsQ0FBUSxPQUFSLENBQUQsQ0FBQSxDQUFrQixVQUFsQixDQUhKLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNBLEdBQUEsQ0FBQSxDQUFVOzs7Ozs7S0FFUjs7QUFBQSxtQkFBQSxhQUFBLEdBQWUsaUJBQWYsQ0FBQTs7QUFBQSxtQkFDQSxXQUFBLEdBQWEsZUFEYixDQUFBOztBQUFBLG1CQUdBLE1BQUEsR0FDRTtBQUFBLE1BQUEsY0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FERjtBQUFBLE1BR0Esa0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BSkY7S0FKRixDQUFBOztBQVlBO0FBQUE7O09BWkE7O0FBQUEsbUJBZ0JBLFFBQUEsR0FBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLE1BQUEsQ0FBQSxDQUFFLFVBQUYsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsYUFEakIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxFQUZaLENBQUE7QUFBQSxNQUlBLElB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

//# sourceURL=/Users/broberto/.atom/packages/refactor/lib/refactor.coffee
