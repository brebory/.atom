(function() {
  var $, RunCommandView, TextEditorView, Utils, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View, TextEditorView = _ref.TextEditorView;

  Utils = require('./utils');

  module.exports = RunCommandView = (function(_super) {
    __extends(RunCommandView, _super);

    function RunCommandView() {
      return RunCommandView.__super__.constructor.apply(this, arguments);
    }

    RunCommandView.content = function() {
      return this.div({
        "class": 'command-entry'
      }, (function(_this) {
        return function() {
          return _this.subview('commandEntryView', new TextEditorView({
            mini: true,
            placeholderText: 'rake spec'
          }));
        };
      })(this));
    };

    RunCommandView.prototype.initialize = function(runner) {
      this.panel = atom.workspace.addModalPanel({
        item: this,
        visible: false
      });
      this.runner = runner;
      this.subscriptions = atom.commands.add(this.element, {
        'core:confirm': (function(_this) {
          return function(event) {
            _this.confirm();
            return event.stopPropagation();
          };
        })(this),
        'core:cancel': (function(_this) {
          return function(event) {
            _this.cancel();
            return event.stopPropagation();
          };
        })(this)
      });
      return this.commandEntryView.on('blur', (function(_this) {
        return function() {
          return _this.cancel();
        };
      })(this));
    };

    RunCommandView.prototype.destroy = function() {
      return this.subscriptions.destroy();
    };

    RunCommandView.prototype.show = function() {
      var editor;
      this.panel.show();
      this.storeFocusedElement();
      this.commandEntryView.focus();
      editor = this.commandEntryView.getModel();
      return editor.setSelectedBufferRange(editor.getBuffer().getRange());
    };

    RunCommandView.prototype.hide = function() {
      return this.panel.hide();
    };

    RunCommandView.prototype.isVisible = function() {
      return this.panel.isVisible();
    };

    RunCommandView.prototype.getCommand = function() {
      var command;
      command = this.commandEntryView.getModel().getText();
      if (!Utils.stringIsBlank(command)) {
        return command;
      }
    };

    RunCommandView.prototype.cancel = function() {
      this.restoreFocusedElement();
      return this.hide();
    };

    RunCommandView.prototype.confirm = function() {
      if (this.getCommand()) {
        this.runner.run(this.getCommand());
      }
      return this.cancel();
    };

    RunCommandView.prototype.storeFocusedElement = function() {
      return this.previouslyFocused = $(document.activeElement);
    };

    RunCommandView.prototype.restoreFocusedElement = function() {
      var _ref1;
      return (_ref1 = this.previouslyFocused) != null ? typeof _ref1.focus === "function" ? _ref1.focus() : void 0 : void 0;
    };

    return RunCommandView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1bi1jb21tYW5kL2xpYi9ydW4tY29tbWFuZC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvREFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUEsT0FBNEIsT0FBQSxDQUFRLHNCQUFSLENBQTVCLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLEVBQVUsc0JBQUEsY0FBVixDQUFBOztBQUFBLEVBQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBRFIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixxQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxjQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxlQUFQO09BQUwsRUFBNkIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDM0IsS0FBQyxDQUFBLE9BQUQsQ0FBUyxrQkFBVCxFQUFpQyxJQUFBLGNBQUEsQ0FDL0I7QUFBQSxZQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsWUFDQSxlQUFBLEVBQWlCLFdBRGpCO1dBRCtCLENBQWpDLEVBRDJCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBN0IsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSw2QkFNQSxVQUFBLEdBQVksU0FBQyxNQUFELEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQ1A7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsUUFDQSxPQUFBLEVBQVMsS0FEVDtPQURPLENBQVQsQ0FBQTtBQUFBLE1BSUEsSUFB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

//# sourceURL=/Users/broberto/.atom/packages/run-command/lib/run-command-view.coffee
