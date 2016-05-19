(function() {
  var CompositeDisposable, fs, path,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CompositeDisposable = require('atom').CompositeDisposable;

  path = require('path');

  fs = require("fs");

  module.exports = {
    config: {
      jslintVersion: {
        title: "JSLint version:",
        type: "string",
        "default": "latest",
        "enum": ["latest", "es6", "es5", "2015-05-08", "2014-07-08", "2014-04-21", "2014-02-06", "2014-01-26", "2013-11-23", "2013-09-22", "2013-08-26", "2013-08-13", "2013-02-03", "2012-02-03"]
      },
      disableWhenNoJslintrcFileInPath: {
        type: 'boolean',
        "default": false,
        description: 'Disable linter when no `.jslintrc` is found in project.'
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.scopes = ['source.js', 'source.js.jsx', 'source.js-semantic'];
      return this.subscriptions.add(atom.config.observe('linter-jslint.disableWhenNoJslintrcFileInPath', (function(_this) {
        return function(disableWhenNoJslintrcFileInPath) {
          return _this.disableWhenNoJslintrcFileInPath = disableWhenNoJslintrcFileInPath;
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var helpers, infos, provider, warnings;
      helpers = require('atom-linter');
      warnings = ['unused_a', 'empty_block'];
      infos = ['nested_comment', 'todo_comment', 'too_long'];
      return provider = {
        name: 'JSLint',
        grammarScopes: this.scopes,
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(textEditor) {
            var column, config, defaultConfigPath, entry, err, filePath, jsLint, jsLinter, jslintrcPath, message, output, pointEnd, pointStart, result, text, type, _i, _len, _ref, _ref1, _ref2;
            filePath = textEditor.getPath();
            jslintrcPath = helpers.find(filePath, '.jslintrc');
            if (_this.disableWhenNoJslintrcFileInPath && !jslintrcPath) {
              return [];
            }
            jsLint = require("jslint").load(atom.config.get("linter-jslint.jslintVersion"));
            jsLinter = require("jslint").linter.doLint;
            config = {};
            defaultConfigPath = path.normalize(path.join(process.env.HOME || process.env.HOMEPATH, ".jslintrc"));
            if (defaultConfigPath) {
              try {
                config = JSON.parse(fs.readFileSync(defaultConfigPath, "utf-8"));
              } catch (_error) {
                err = _error;
                if (err.code !== "ENOENT") {
                  console.log("Error reading config file \"" + jslintrcPath + "\": " + err);
                }
              }
            }
            if (jslintrcPath) {
              try {
                config = JSON.parse(fs.readFileSync(jslintrcPath, "utf-8"));
              } catch (_error) {
                err = _error;
                if (err.code !== "ENOENT") {
                  console.log("Error reading config file \"" + jslintrcPath + "\": " + err);
                }
              }
            }
            text = textEditor.getText();
            result = jsLinter(jsLint, text, config);
            if (!(result && result.errors.length)) {
              return [];
            }
            output = [];
            _ref = result.errors;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entry = _ref[_i];
              if (entry == null) {
                continue;
              }
              message = entry.message != null ? entry.message : entry.reason;
              column = entry.column != null ? entry.column : entry.character;
              pointStart = [entry.line, column];
              pointEnd = [entry.line, column + message.length];
              if (atom.config.get("linter-jslint.jslintVersion").match(/^201[0-4]/)) {
                pointStart = [pointStart[0] - 1, pointStart[1] - 1];
                pointEnd = [pointEnd[0] - 1, pointEnd[1] - 1];
                if (entry.raw === "Expected '{a}' at column {b}, not column {c}.") {
                  message = entry.raw.replace("{a}", entry.a).replace("{b}", entry.b - 1).replace("{c}", entry.c - 1).replace("{d}", entry.d);
                }
              }
              if (_ref1 = entry.code, __indexOf.call(infos, _ref1) >= 0) {
                type = 'Info';
              } else if (_ref2 = entry.code, __indexOf.call(warnings, _ref2) >= 0) {
                type = 'Warning';
              } else {
                type = 'Error';
              }
              output.push({
                type: type,
                text: message,
                range: [pointStart, pointEnd],
                filePath: filePath
              });
            }
            return output;
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1qc2xpbnQvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZCQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FGTCxDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxpQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxRQUZUO0FBQUEsUUFHQSxNQUFBLEVBQU0sQ0FBQyxRQUFELEVBQVcsS0FBWCxFQUFrQixLQUFsQixFQUF5QixZQUF6QixFQUF1QyxZQUF2QyxFQUFxRCxZQUFyRCxFQUFtRSxZQUFuRSxFQUFpRixZQUFqRixFQUErRixZQUEvRixFQUE2RyxZQUE3RyxFQUEySCxZQUEzSCxFQUF5SSxZQUF6SSxFQUF1SixZQUF2SixFQUFxSyxZQUFySyxDQUhOO09BREY7QUFBQSxNQUtBLCtCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLHlEQUZiO09BTkY7S0FERjtBQUFBLElBV0EsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBRCxH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

//# sourceURL=/Users/broberto/.atom/packages/linter-jslint/lib/main.coffee
