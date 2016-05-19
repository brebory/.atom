(function() {
  var BufferedProcess, CompositeDisposable, lint, _ref;

  _ref = require('atom'), BufferedProcess = _ref.BufferedProcess, CompositeDisposable = _ref.CompositeDisposable;

  lint = function(editor, command, options) {
    var file, helpers, regex;
    helpers = require('atom-linter');
    regex = '(?<file>.+):(?<line>\\d+)\\s-\\s(?<message>.+)';
    file = editor.getPath();
    return new Promise(function(resolve, reject) {
      var args, stdout;
      stdout = '';
      args = ['--without-color', '--silent', options, file].filter(Boolean);
      return new BufferedProcess({
        command: command,
        args: args,
        stdout: function(data) {
          return stdout += data;
        },
        exit: function() {
          var warnings;
          warnings = helpers.parse(stdout, regex).map(function(message) {
            message.type = 'warning';
            return message;
          });
          return resolve(warnings);
        }
      });
    });
  };

  module.exports = {
    config: {
      executablePath: {
        title: 'rails_best_practices Executable Path',
        description: 'The path to `rails_best_practices` executable',
        type: 'string',
        "default": 'rails_best_practices'
      },
      extraOptions: {
        title: 'Extra Options',
        description: 'Options for `rails_best_practices` command',
        type: 'string',
        "default": ''
      }
    },
    activate: function(state) {
      var linterName;
      linterName = 'linter-rails-best-practices';
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe("" + linterName + ".executablePath", (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe("" + linterName + ".extraOptions", (function(_this) {
        return function(extraOptions) {
          return _this.extraOptions = extraOptions;
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var provider;
      return provider = {
        grammarScopes: ['source.ruby', 'source.ruby.rails', 'source.ruby.rabl', 'text.html.ruby', 'text.html.erb', 'text.haml', 'text.slim'],
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(editor) {
            return lint(editor, _this.executablePath, _this.extraOptions);
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1yYWlscy1iZXN0LXByYWN0aWNlcy9saWIvbGludGVyLXJhaWxzLWJlc3QtcHJhY3RpY2VzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnREFBQTs7QUFBQSxFQUFBLE9BQXlDLE9BQUEsQ0FBUSxNQUFSLENBQXpDLEVBQUMsdUJBQUEsZUFBRCxFQUFrQiwyQkFBQSxtQkFBbEIsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxTQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLE9BQWxCLEdBQUE7QUFDTCxRQUFBLG9CQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLGFBQVIsQ0FBVixDQUFBO0FBQUEsSUFDQSxLQUFBLEdBQVEsZ0RBRFIsQ0FBQTtBQUFBLElBRUEsSUFBQSxHQUFPLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FGUCxDQUFBO1dBSUksSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEVBQVUsTUFBVixHQUFBO0FBQ1YsVUFBQSxZQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsRUFBVCxDQUFBO0FBQUEsTUFDQSxJQUFBLEdBQU8sQ0FBQyxpQkFBRCxFQUFvQixVQUFwQixFQUFnQyxPQUFoQyxFQUF5QyxJQUF6QyxDQUE4QyxDQUFDLE1BQS9DLENBQXNELE9BQXRELENBRFAsQ0FBQTthQUdJLElBQUEsZUFBQSxDQUNGO0FBQUEsUUFBQSxPQUFBLEVBQVMsT0FBVDtBQUFBLFFBQ0EsSUFBQSxFQUFNLElBRE47QUFBQSxRQUVBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtpQkFBVSxNQUFBLElBQVUsS0FBcEI7UUFBQSxDQUZSO0FBQUEsUUFHQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osY0FBQSxRQUFBO0FBQUEsVUFBQSxRQUFBLEdB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

//# sourceURL=/Users/broberto/.atom/packages/linter-rails-best-practices/lib/linter-rails-best-practices.coffee
