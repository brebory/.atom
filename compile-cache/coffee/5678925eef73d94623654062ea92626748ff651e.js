(function() {
  var CommandOutputView, CommandRunner, ContentDisposable, RunCommandView;

  ContentDisposable = require('atom').ContentDisposable;

  CommandRunner = require('./command-runner');

  RunCommandView = require('./run-command-view');

  CommandOutputView = require('./command-output-view');

  module.exports = {
    config: {
      shellCommand: {
        type: 'string',
        "default": '/bin/bash'
      },
      useLoginShell: {
        type: 'boolean',
        "default": true
      }
    },
    activate: function(state) {
      this.runner = new CommandRunner();
      this.commandOutputView = new CommandOutputView(this.runner);
      this.runCommandView = new RunCommandView(this.runner);
      return this.subscriptions = atom.commands.add('atom-workspace', {
        'run-command:run': (function(_this) {
          return function() {
            return _this.run();
          };
        })(this),
        'run-command:toggle-panel': (function(_this) {
          return function() {
            return _this.togglePanel();
          };
        })(this),
        'run-command:kill-last-command': (function(_this) {
          return function() {
            return _this.killLastCommand();
          };
        })(this)
      });
    },
    deactivate: function() {
      this.runCommandView.destroy();
      return this.commandOutputView.destroy();
    },
    dispose: function() {
      return this.subscriptions.dispose();
    },
    run: function() {
      return this.runCommandView.show();
    },
    togglePanel: function() {
      if (this.commandOutputView.isVisible()) {
        return this.commandOutputView.hide();
      } else {
        return this.commandOutputView.show();
      }
    },
    killLastCommand: function() {
      return this.runner.kill();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1bi1jb21tYW5kL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtRUFBQTs7QUFBQSxFQUFDLG9CQUFxQixPQUFBLENBQVEsTUFBUixFQUFyQixpQkFBRCxDQUFBOztBQUFBLEVBQ0EsYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVIsQ0FEaEIsQ0FBQTs7QUFBQSxFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBRmpCLENBQUE7O0FBQUEsRUFHQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsdUJBQVIsQ0FIcEIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsWUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLFdBRFQ7T0FERjtBQUFBLE1BR0EsYUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FKRjtLQURGO0FBQUEsSUFRQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxhQUFBLENBQUEsQ0FBZCxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsaUJBQUQsR0FBeUIsSUFBQSxpQkFBQSxDQUFrQixJQUFDLENBQUEsTUFBbkIsQ0FGekIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxjQUFBLENBQWUsSUFBQyxDQUFBLE1BQWhCLENBSHRCLENBQUE7YUFLQSxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQ2Y7QUFBQSxRQUFBLGlCQUFBLEVBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxHQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CO0FBQUEsUUFDQSwwQkFBQSxFQUE0QixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsV0FBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUQ1QjtBQUFBLFFBRUEsK0JBQUEsRUFBaUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLGVBQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FGakM7T0FEZSxFQU5UO0lBQUEsQ0FSVjtBQUFBLElBbUJBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxjQUFjLENBQUMsT0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsaUJBQWlCLENBQUMsT0FBbkIsQ0FBQSxFQUZVO0lBQUEsQ0FuQlo7QUFBQSxJQXVCQSxPQUFBLEVBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUEsRUFETztJQUFBLENBdkJUO0FBQUEsSUE0QkEsR0FBQSxFQUFLLFNBQUEsR0FBQTthQUNILElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBaEIsQ0FBQSxFQURHO0lBQUEsQ0E1Qkw7QUFBQSxJQStCQSxXQUFBLEVBQWEsU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFHLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxTQUFuQixDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsaUJBQWlCLENBQUMsSUFBbkIsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixDQUFBLEVBSEY7T0FEVztJQUFBLENBL0JiO0FBQUEsSUFxQ0EsZUFBQSxFQUFpQixTQUFBLEdBQUE7YUFDZixJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBQSxFQURlO0lBQUEsQ0FyQ2pCO0dBTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/run-command/lib/main.coffee
