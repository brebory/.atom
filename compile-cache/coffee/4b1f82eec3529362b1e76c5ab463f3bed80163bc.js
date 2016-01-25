(function() {
  var $, CommandOutputView, CommandRunner, CompositeDisposable, Utils, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View;

  CommandRunner = require('./command-runner').CommandRunner;

  Utils = require('./utils');

  module.exports = CommandOutputView = (function(_super) {
    __extends(CommandOutputView, _super);

    function CommandOutputView() {
      return CommandOutputView.__super__.constructor.apply(this, arguments);
    }

    CommandOutputView.content = function() {
      return this.div({
        "class": 'command-runner'
      }, (function(_this) {
        return function() {
          _this.header({
            "class": 'panel-heading'
          }, function() {
            _this.span('Command: ');
            return _this.span({
              "class": 'command-name',
              outlet: 'header'
            });
          });
          return _this.div({
            "class": 'panel-body',
            outlet: 'outputContainer'
          }, function() {
            return _this.pre({
              "class": 'command-output',
              outlet: 'output'
            });
          });
        };
      })(this));
    };

    CommandOutputView.prototype.attrs = null;

    CommandOutputView.prototype.initialize = function(runner) {
      this.panel = atom.workspace.addBottomPanel({
        item: this,
        visible: false
      });
      this.subscriptions = new CompositeDisposable();
      this.subscriptions.add = runner.onCommand((function(_this) {
        return function(command) {
          return _this.setCommand(command);
        };
      })(this));
      this.subscriptions.add = runner.onData((function(_this) {
        return function(data) {
          return _this.addOutput(data);
        };
      })(this));
      this.subscriptions.add = runner.onExit((function(_this) {
        return function() {
          return _this.setExited();
        };
      })(this));
      return this.subscriptions.add = runner.onKill((function(_this) {
        return function(signal) {
          return _this.setKillSignal(signal);
        };
      })(this));
    };

    CommandOutputView.prototype.destroy = function() {
      return this.subscriptions.destroy();
    };

    CommandOutputView.prototype.show = function() {
      this.panel.show();
      return this.scrollToBottomOfOutput();
    };

    CommandOutputView.prototype.hide = function() {
      return this.panel.hide();
    };

    CommandOutputView.prototype.isVisible = function() {
      return this.panel.isVisible();
    };

    CommandOutputView.prototype.atBottomOfOutput = function() {
      return this.output[0].scrollHeight <= this.output.scrollTop() + this.output.outerHeight();
    };

    CommandOutputView.prototype.scrollToBottomOfOutput = function() {
      return this.output.scrollToBottom();
    };

    CommandOutputView.prototype.setCommand = function(command) {
      this.clearOutput();
      this.header.text(command);
      return this.show();
    };

    CommandOutputView.prototype.clearOutput = function() {
      return this.output.empty();
    };

    CommandOutputView.prototype.classesForAnsiCodes = function(codes) {
      return codes != null ? codes.map(function(code) {
        switch (code) {
          case 39:
            return 'ansi-default-fg';
          case 30:
            return 'ansi-black-fg';
          case 31:
            return 'ansi-red-fg';
          case 32:
            return 'ansi-green-fg';
          case 33:
            return 'ansi-yellow-fg';
          case 34:
            return 'ansi-blue-fg';
          case 35:
            return 'ansi-magenta-fg';
          case 36:
            return 'ansi-cyan-fg';
          case 37:
            return 'ansi-light-gray-fg';
          case 90:
            return 'ansi-dark-gray-fg';
          case 91:
            return 'ansi-light-red-fg';
          case 92:
            return 'ansi-light-green-fg';
          case 93:
            return 'ansi-light-yellow-fg';
          case 94:
            return 'ansi-light-blue-fg';
          case 95:
            return 'ansi-light-magenta-fg';
          case 96:
            return 'ansi-light-cyan-fg';
          case 97:
            return 'ansi-white-fg';
          case 49:
            return 'ansi-default-bg';
          case 40:
            return 'ansi-black-bg';
          case 41:
            return 'ansi-red-bg';
          case 42:
            return 'ansi-green-bg';
          case 43:
            return 'ansi-yellow-bg';
          case 44:
            return 'ansi-blue-bg';
          case 45:
            return 'ansi-magenta-bg';
          case 46:
            return 'ansi-cyan-bg';
          case 47:
            return 'ansi-light-gray-bg';
          case 100:
            return 'ansi-dark-gray-bg';
          case 101:
            return 'ansi-light-red-bg';
          case 102:
            return 'ansi-light-green-bg';
          case 103:
            return 'ansi-light-yellow-bg';
          case 104:
            return 'ansi-light-blue-bg';
          case 105:
            return 'ansi-light-magenta-bg';
          case 106:
            return 'ansi-light-cyan-bg';
          case 107:
            return 'ansi-white-bg';
        }
      }).filter(function(x) {
        return x != null;
      }) : void 0;
    };

    CommandOutputView.prototype.attrsForCodes = function(codes) {
      var attrs, code, _i, _len;
      attrs = {};
      for (_i = 0, _len = codes.length; _i < _len; _i++) {
        code = codes[_i];
        switch (code) {
          case 0:
            attrs.fg = 'default';
            attrs.bg = 'default';
            break;
          case 39:
            attrs.fg = 'default';
            break;
          case 30:
            attrs.fg = 'black';
            break;
          case 31:
            attrs.fg = 'red';
            break;
          case 32:
            attrs.fg = 'green';
            break;
          case 33:
            attrs.fg = 'yellow';
            break;
          case 34:
            attrs.fg = 'blue';
            break;
          case 35:
            attrs.fg = 'magenta';
            break;
          case 36:
            attrs.fg = 'cyan';
            break;
          case 37:
            attrs.fg = 'light-gray';
            break;
          case 90:
            attrs.fg = 'dark-gray';
            break;
          case 91:
            attrs.fg = 'light-red';
            break;
          case 92:
            attrs.fg = 'light-green';
            break;
          case 93:
            attrs.fg = 'light-yellow';
            break;
          case 94:
            attrs.fg = 'light-blue';
            break;
          case 95:
            attrs.fg = 'light-magenta';
            break;
          case 96:
            attrs.fg = 'light-cyan';
            break;
          case 97:
            attrs.fg = 'white';
            break;
          case 49:
            attrs.bg = 'default';
            break;
          case 40:
            attrs.bg = 'black';
            break;
          case 41:
            attrs.bg = 'red';
            break;
          case 42:
            attrs.bg = 'green';
            break;
          case 43:
            attrs.bg = 'yellow';
            break;
          case 44:
            attrs.bg = 'blue';
            break;
          case 45:
            attrs.bg = 'magenta';
            break;
          case 46:
            attrs.bg = 'cyan';
            break;
          case 47:
            attrs.bg = 'light-gray';
            break;
          case 100:
            attrs.bg = 'dark-gray';
            break;
          case 101:
            attrs.bg = 'light-red';
            break;
          case 102:
            attrs.bg = 'light-green';
            break;
          case 103:
            attrs.bg = 'light-yellow';
            break;
          case 104:
            attrs.bg = 'light-blue';
            break;
          case 105:
            attrs.bg = 'light-magenta';
            break;
          case 106:
            attrs.bg = 'light-cyan';
            break;
          case 107:
            attrs.bg = 'white';
        }
      }
      return attrs;
    };

    CommandOutputView.prototype.applyCodesToAttrs = function(codes, attrs) {
      var next;
      next = this.attrsForCodes(codes);
      return $.extend({}, attrs || {}, next);
    };

    CommandOutputView.prototype.classesForAttrs = function(attrs) {
      return ["ansi-fg-" + ((attrs != null ? attrs.fg : void 0) || 'default'), "ansi-bg-" + ((attrs != null ? attrs.bg : void 0) || 'default')];
    };

    CommandOutputView.prototype.createOutputNode = function(text) {
      var colorCodeRegex, colorizedHtml, node, parent;
      node = $('<span />').text(text);
      parent = $('<span />').append(node);
      colorCodeRegex = /\x1B\[([0-9;]*)m/g;
      colorizedHtml = parent.html().replace(colorCodeRegex, (function(_this) {
        return function(_, matches) {
          var classes, codes;
          codes = matches != null ? matches.split(';').map(function(x) {
            return parseInt(x, 10);
          }).filter(function(x) {
            return !isNaN(x);
          }) : void 0;
          if (codes.length === 0) {
            codes = [0];
          }
          _this.attrs = _this.applyCodesToAttrs(codes, _this.attrs);
          classes = _this.classesForAttrs(_this.attrs);
          return "</span><span class='" + (classes.join(' ')) + "'>";
        };
      })(this));
      return parent.html(colorizedHtml);
    };

    CommandOutputView.prototype.addOutput = function(data, classes) {
      var atBottom, node;
      atBottom = this.atBottomOfOutput();
      node = this.createOutputNode(data);
      if (classes != null) {
        node.addClass(classes.join(' '));
      }
      this.output.append(node);
      if (atBottom) {
        return this.scrollToBottomOfOutput();
      }
    };

    CommandOutputView.prototype.setExited = function() {
      var message;
      message = 'Command exited\n';
      return this.addOutput(message, ['exit', 'exited']);
    };

    CommandOutputView.prototype.setKillSignal = function(signal) {
      var message;
      message = 'Command killed with signal ' + signal + '\n';
      return this.addOutput(message, ['exit', 'kill-signal']);
    };

    return CommandOutputView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1bi1jb21tYW5kL2xpYi9jb21tYW5kLW91dHB1dC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwyRUFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxPQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQURKLENBQUE7O0FBQUEsRUFFQyxnQkFBaUIsT0FBQSxDQUFRLGtCQUFSLEVBQWpCLGFBRkQsQ0FBQTs7QUFBQSxFQUdBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUhSLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osd0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsaUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGdCQUFQO09BQUwsRUFBOEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM1QixVQUFBLEtBQUMsQ0FBQSxNQUFELENBQVE7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO1dBQVIsRUFBZ0MsU0FBQSxHQUFBO0FBQzlCLFlBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxXQUFOLENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsY0FBQSxPQUFBLEVBQU8sY0FBUDtBQUFBLGNBQXVCLE1BQUEsRUFBUSxRQUEvQjthQUFOLEVBRjhCO1VBQUEsQ0FBaEMsQ0FBQSxDQUFBO2lCQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEs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

//# sourceURL=/Users/broberto/.atom/packages/run-command/lib/command-output-view.coffee
