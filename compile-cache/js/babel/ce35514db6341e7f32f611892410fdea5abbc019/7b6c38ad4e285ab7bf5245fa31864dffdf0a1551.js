function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _atom = require('atom');

'use babel';

module.exports = {
  config: {
    executablePath: {
      type: 'string',
      'default': _path2['default'].join(__dirname, '..', 'node_modules', 'jshint', 'bin', 'jshint'),
      description: 'Path of the `jshint` node script'
    },
    lintInlineJavaScript: {
      type: 'boolean',
      'default': false,
      description: 'Lint JavaScript inside `<script>` blocks in HTML or PHP files.'
    },
    disableWhenNoJshintrcFileInPath: {
      type: 'boolean',
      'default': false,
      description: 'Disable linter when no `.jshintrc` is found in project.'
    },
    lintJSXFiles: {
      title: 'Lint JSX Files',
      type: 'boolean',
      'default': false
    },
    jshintFileName: {
      type: 'string',
      'default': '.jshintrc',
      description: 'jshint file name'
    }
  },

  activate: function activate() {
    var _this = this;

    require('atom-package-deps').install('linter-jshint');
    this.scopes = ['source.js', 'source.js-semantic'];
    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(atom.config.observe('linter-jshint.executablePath', function (executablePath) {
      _this.executablePath = executablePath;
    }));
    this.subscriptions.add(atom.config.observe('linter-jshint.disableWhenNoJshintrcFileInPath', function (disableWhenNoJshintrcFileInPath) {
      _this.disableWhenNoJshintrcFileInPath = disableWhenNoJshintrcFileInPath;
    }));

    this.subscriptions.add(atom.config.observe('linter-jshint.jshintFileName', function (jshintFileName) {
      _this.jshintFileName = jshintFileName;
    }));

    var scopeJSX = 'source.js.jsx';
    this.subscriptions.add(atom.config.observe('linter-jshint.lintJSXFiles', function (lintJSXFiles) {
      _this.lintJSXFiles = lintJSXFiles;
      if (lintJSXFiles) {
        _this.scopes.push(scopeJSX);
      } else {
        if (_this.scopes.indexOf(scopeJSX) !== -1) {
          _this.scopes.splice(_this.scopes.indexOf(scopeJSX), 1);
        }
      }
    }));

    var scopeEmbedded = 'source.js.embedded.html';
    this.subscriptions.add(atom.config.observe('linter-jshint.lintInlineJavaScript', function (lintInlineJavaScript) {
      _this.lintInlineJavaScript = lintInlineJavaScript;
      if (lintInlineJavaScript) {
        _this.scopes.push(scopeEmbedded);
      } else {
        if (_this.scopes.indexOf(scopeEmbedded) !== -1) {
          _this.scopes.splice(_this.scopes.indexOf(scopeEmbedded), 1);
        }
      }
    }));
  },

  deactivate: function deactivate() {
    this.subscriptions.dispose();
  },

  provideLinter: function provideLinter() {
    var _this2 = this;

    var Helpers = require('atom-linter');
    var Reporter = require('jshint-json');

    return {
      name: 'JSHint',
      grammarScopes: this.scopes,
      scope: 'file',
      lintOnFly: true,
      lint: _asyncToGenerator(function* (textEditor) {
        var results = [];
        var filePath = textEditor.getPath();
        var fileContents = textEditor.getText();
        var parameters = ['--reporter', Reporter, '--filename', filePath];

        var configFile = yield Helpers.findCachedAsync(_path2['default'].dirname(filePath), _this2.jshintFileName);

        if (configFile) {
          parameters.push('--config', configFile);
        } else if (_this2.disableWhenNoJshintrcFileInPath) {
          return results;
        }

        if (_this2.lintInlineJavaScript && textEditor.getGrammar().scopeName.indexOf('text.html') !== -1) {
          parameters.push('--extract', 'always');
        }
        parameters.push('-');

        var result = yield Helpers.execNode(_this2.executablePath, parameters, { stdin: fileContents });
        var parsed = undefined;
        try {
          parsed = JSON.parse(result);
        } catch (_) {
          console.error('[Linter-JSHint]', _, result);
          atom.notifications.addWarning('[Linter-JSHint]', { detail: 'JSHint return an invalid response, check your console for more info' });
          return results;
        }

        for (var entry of parsed.result) {
          if (!entry.error.id) {
            continue;
          }

          var error = entry.error;
          var errorType = error.code.substr(0, 1);
          var errorLine = error.line > 0 ? error.line - 1 : 0;
          var range = undefined;

          // TODO: Remove workaround of jshint/jshint#2846
          if (error.character === null) {
            range = Helpers.rangeFromLineNumber(textEditor, errorLine);
          } else {
            var character = error.character > 0 ? error.character - 1 : 0;
            var line = errorLine;
            var buffer = textEditor.getBuffer();
            var maxLine = buffer.getLineCount();
            // TODO: Remove workaround of jshint/jshint#2894
            if (errorLine >= maxLine) {
              line = maxLine;
            }
            var maxCharacter = buffer.lineLengthForRow(line);
            // TODO: Remove workaround of jquery/esprima#1457
            if (character > maxCharacter) {
              character = maxCharacter;
            }
            range = Helpers.rangeFromLineNumber(textEditor, line, character);
          }

          results.push({
            type: errorType === 'E' ? 'Error' : errorType === 'W' ? 'Warning' : 'Info',
            html: '<a href="http://jslinterrors.com/' + error.code + '">' + error.code + '</a> - ' + error.reason,
            filePath: filePath,
            range: range
          });
        }
        return results;
      })
    };
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9saW50ZXItanNoaW50L2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0JBSWlCLE1BQU07Ozs7b0JBQ2EsTUFBTTs7QUFMMUMsV0FBVyxDQUFBOztBQVNYLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixRQUFNLEVBQUU7QUFDTixrQkFBYyxFQUFFO0FBQ2QsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxrQkFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7QUFDOUUsaUJBQVcsRUFBRSxrQ0FBa0M7S0FDaEQ7QUFDRCx3QkFBb0IsRUFBRTtBQUNwQixVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLEtBQUs7QUFDZCxpQkFBVyxFQUFFLGdFQUFnRTtLQUM5RTtBQUNELG1DQUErQixFQUFFO0FBQy9CLFVBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQVMsS0FBSztBQUNkLGlCQUFXLEVBQUUseURBQXlEO0tBQ3ZFO0FBQ0QsZ0JBQVksRUFBRTtBQUNaLFdBQUssRUFBRSxnQkFBZ0I7QUFDdkIsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxLQUFLO0tBQ2Y7QUFDRCxrQkFBYyxFQUFFO0FBQ2QsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxXQUFXO0FBQ3BCLGlCQUFXLEVBQUUsa0JBQWtCO0tBQ2hDO0dBQ0Y7O0FBRUQsVUFBUSxFQUFBLG9CQUFHOzs7QUFDVCxXQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDckQsUUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO0FBQ2pELFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUE7QUFDOUMsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxD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LE9BQU8sR0FBRyxTQUFTLEtBQUssR0FBRyxHQUFHLFNBQVMsR0FBRyxNQUFNO0FBQzFFLGdCQUFJLHdDQUFzQyxLQUFLLENBQUMsSUFBSSxVQUFLLEtBQUssQ0FBQyxJQUFJLGVBQVUsS0FBSyxDQUFDLE1BQU0sQUFBRTtBQUMzRixvQkFBUSxFQUFSLFFBQVE7QUFDUixpQkFBSyxFQUFMLEtBQUs7V0FDTixDQUFDLENBQUE7U0FDSDtBQUNELGVBQU8sT0FBTyxDQUFBO09BQ2YsQ0FBQTtLQUNGLENBQUE7R0FDRjtDQUNGLENBQUEiLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1qc2hpbnQvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG4vKiBAZmxvdyAqL1xuXG5pbXBvcnQgUGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5cbnR5cGUgTGludGVyJFByb3ZpZGVyID0gT2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb25maWc6IHtcbiAgICBleGVjdXRhYmxlUGF0aDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiBQYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnbm9kZV9tb2R1bGVzJywgJ2pzaGludCcsICdiaW4nLCAnanNoaW50JyksXG4gICAgICBkZXNjcmlwdGlvbjogJ1BhdGggb2YgdGhlIGBqc2hpbnRgIG5vZGUgc2NyaXB0J1xuICAgIH0sXG4gICAgbGludElubGluZUphdmFTY3JpcHQ6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdMaW50IEphdmFTY3JpcHQgaW5zaWRlIGA8c2NyaXB0PmAgYmxvY2tzIGluIEhUTUwgb3IgUEhQIGZpbGVzLidcbiAgICB9LFxuICAgIGRpc2FibGVXaGVuTm9Kc2hpbnRyY0ZpbGVJblBhdGg6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdEaXNhYmxlIGxpbnRlciB3aGVuIG5vIGAuanNoaW50cmNgIGlzIGZvdW5kIGluIHByb2plY3QuJ1xuICAgIH0sXG4gICAgbGludEpTWEZpbGVzOiB7XG4gICAgICB0aXRsZTogJ0xpbnQgSlNYIEZpbGVzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBqc2hpbnRGaWxlTmFtZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiAnLmpzaGludHJjJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnanNoaW50IGZpbGUgbmFtZSdcbiAgICB9XG4gIH0sXG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgcmVxdWlyZSgnYXRvbS1wYWNrYWdlLWRlcHMnKS5pbnN0YWxsKCdsaW50ZXItanNoaW50JylcbiAgICB0aGlzLnNjb3BlcyA9IFsnc291cmNlLmpzJywgJ3NvdXJjZS5qcy1zZW1hbnRpYyddXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLWpzaGludC5leGVjdXRhYmxlUGF0aCcsIGV4ZWN1dGFibGVQYXRoID0+IHtcbiAgICAgIHRoaXMuZXhlY3V0YWJsZVBhdGggPSBleGVjdXRhYmxlUGF0aFxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItanNoaW50LmRpc2FibGVXaGVuTm9Kc2hpbnRyY0ZpbGVJblBhdGgnLFxuICAgICAgICBkaXNhYmxlV2hlbk5vSnNoaW50cmNGaWxlSW5QYXRoID0+IHtcbiAgICAgICAgICB0aGlzLmRpc2FibGVXaGVuTm9Kc2hpbnRyY0ZpbGVJblBhdGggPSBkaXNhYmxlV2hlbk5vSnNoaW50cmNGaWxlSW5QYXRoXG4gICAgICAgIH1cbiAgICAgIClcbiAgICApXG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci1qc2hpbnQuanNoaW50RmlsZU5hbWUnLCBqc2hpbnRGaWxlTmFtZSA9PiB7XG4gICAgICB0aGlzLmpzaGludEZpbGVOYW1lID0ganNoaW50RmlsZU5hbWVcbiAgICB9KSlcblxuICAgIGNvbnN0IHNjb3BlSlNYID0gJ3NvdXJjZS5qcy5qc3gnXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItanNoaW50LmxpbnRKU1hGaWxlcycsIGxpbnRKU1hGaWxlcyA9PiB7XG4gICAgICB0aGlzLmxpbnRKU1hGaWxlcyA9IGxpbnRKU1hGaWxlc1xuICAgICAgaWYgKGxpbnRKU1hGaWxlcykge1xuICAgICAgICB0aGlzLnNjb3Blcy5wdXNoKHNjb3BlSlNYKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGVzLmluZGV4T2Yoc2NvcGVKU1gpICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2NvcGVzLnNwbGljZSh0aGlzLnNjb3Blcy5pbmRleE9mKHNjb3BlSlNYKSwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKVxuXG4gICAgY29uc3Qgc2NvcGVFbWJlZGRlZCA9ICdzb3VyY2UuanMuZW1iZWRkZWQuaHRtbCdcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci1qc2hpbnQubGludElubGluZUphdmFTY3JpcHQnLFxuICAgICAgbGludElubGluZUphdmFTY3JpcHQgPT4ge1xuICAgICAgICB0aGlzLmxpbnRJbmxpbmVKYXZhU2NyaXB0ID0gbGludElubGluZUphdmFTY3JpcHRcbiAgICAgICAgaWYgKGxpbnRJbmxpbmVKYXZhU2NyaXB0KSB7XG4gICAgICAgICAgdGhpcy5zY29wZXMucHVzaChzY29wZUVtYmVkZGVkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnNjb3Blcy5pbmRleE9mKHNjb3BlRW1iZWRkZWQpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zY29wZXMuc3BsaWNlKHRoaXMuc2NvcGVzLmluZGV4T2Yoc2NvcGVFbWJlZGRlZCksIDEpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKSlcbiAgfSxcblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgfSxcblxuICBwcm92aWRlTGludGVyKCk6IExpbnRlciRQcm92aWRlciB7XG4gICAgY29uc3QgSGVscGVycyA9IHJlcXVpcmUoJ2F0b20tbGludGVyJylcbiAgICBjb25zdCBSZXBvcnRlciA9IHJlcXVpcmUoJ2pzaGludC1qc29uJylcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnSlNIaW50JyxcbiAgICAgIGdyYW1tYXJTY29wZXM6IHRoaXMuc2NvcGVzLFxuICAgICAgc2NvcGU6ICdmaWxlJyxcbiAgICAgIGxpbnRPbkZseTogdHJ1ZSxcbiAgICAgIGxpbnQ6IGFzeW5jICh0ZXh0RWRpdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXVxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRleHRFZGl0b3IuZ2V0UGF0aCgpXG4gICAgICAgIGNvbnN0IGZpbGVDb250ZW50cyA9IHRleHRFZGl0b3IuZ2V0VGV4dCgpXG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBbJy0tcmVwb3J0ZXInLCBSZXBvcnRlciwgJy0tZmlsZW5hbWUnLCBmaWxlUGF0aF1cblxuICAgICAgICBsZXQgY29uZmlnRmlsZSA9IGF3YWl0IEhlbHBlcnMuZmluZENhY2hlZEFzeW5jKFBhdGguZGlybmFtZShmaWxlUGF0aCksIHRoaXMuanNoaW50RmlsZU5hbWUpXG5cbiAgICAgICAgaWYgKGNvbmZpZ0ZpbGUpIHtcbiAgICAgICAgICBwYXJhbWV0ZXJzLnB1c2goJy0tY29uZmlnJywgY29uZmlnRmlsZSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpc2FibGVXaGVuTm9Kc2hpbnRyY0ZpbGVJblBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGludElubGluZUphdmFTY3JpcHQgJiZcbiAgICAgICAgICB0ZXh0RWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWUuaW5kZXhPZigndGV4dC5odG1sJykgIT09IC0xXG4gICAgICAgICkge1xuICAgICAgICAgIHBhcmFtZXRlcnMucHVzaCgnLS1leHRyYWN0JywgJ2Fsd2F5cycpXG4gICAgICAgIH1cbiAgICAgICAgcGFyYW1ldGVycy5wdXNoKCctJylcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBIZWxwZXJzLmV4ZWNOb2RlKFxuICAgICAgICAgIHRoaXMuZXhlY3V0YWJsZVBhdGgsIHBhcmFtZXRlcnMsIHsgc3RkaW46IGZpbGVDb250ZW50cyB9XG4gICAgICAgIClcbiAgICAgICAgbGV0IHBhcnNlZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocmVzdWx0KVxuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignW0xpbnRlci1KU0hpbnRdJywgXywgcmVzdWx0KVxuICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nKCdbTGludGVyLUpTSGludF0nLFxuICAgICAgICAgICAgeyBkZXRhaWw6ICdKU0hpbnQgcmV0dXJuIGFuIGludmFsaWQgcmVzcG9uc2UsIGNoZWNrIHlvdXIgY29uc29sZSBmb3IgbW9yZSBpbmZvJyB9XG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiByZXN1bHRzXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHBhcnNlZC5yZXN1bHQpIHtcbiAgICAgICAgICBpZiAoIWVudHJ5LmVycm9yLmlkKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGVycm9yID0gZW50cnkuZXJyb3JcbiAgICAgICAgICBjb25zdCBlcnJvclR5cGUgPSBlcnJvci5jb2RlLnN1YnN0cigwLCAxKVxuICAgICAgICAgIGNvbnN0IGVycm9yTGluZSA9IGVycm9yLmxpbmUgPiAwID8gZXJyb3IubGluZSAtIDEgOiAwXG4gICAgICAgICAgbGV0IHJhbmdlXG5cbiAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgd29ya2Fyb3VuZCBvZiBqc2hpbnQvanNoaW50IzI4NDZcbiAgICAgICAgICBpZiAoZXJyb3IuY2hhcmFjdGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICByYW5nZSA9IEhlbHBlcnMucmFuZ2VGcm9tTGluZU51bWJlcih0ZXh0RWRpdG9yLCBlcnJvckxpbmUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXIgPSBlcnJvci5jaGFyYWN0ZXIgPiAwID8gZXJyb3IuY2hhcmFjdGVyIC0gMSA6IDBcbiAgICAgICAgICAgIGxldCBsaW5lID0gZXJyb3JMaW5lXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0ZXh0RWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgICAgICAgICBjb25zdCBtYXhMaW5lID0gYnVmZmVyLmdldExpbmVDb3VudCgpXG4gICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgd29ya2Fyb3VuZCBvZiBqc2hpbnQvanNoaW50IzI4OTRcbiAgICAgICAgICAgIGlmIChlcnJvckxpbmUgPj0gbWF4TGluZSkge1xuICAgICAgICAgICAgICBsaW5lID0gbWF4TGluZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWF4Q2hhcmFjdGVyID0gYnVmZmVyLmxpbmVMZW5ndGhGb3JSb3cobGluZSlcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB3b3JrYXJvdW5kIG9mIGpxdWVyeS9lc3ByaW1hIzE0NTdcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXIgPiBtYXhDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgY2hhcmFjdGVyID0gbWF4Q2hhcmFjdGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYW5nZSA9IEhlbHBlcnMucmFuZ2VGcm9tTGluZU51bWJlcih0ZXh0RWRpdG9yLCBsaW5lLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IGVycm9yVHlwZSA9PT0gJ0UnID8gJ0Vycm9yJyA6IGVycm9yVHlwZSA9PT0gJ1cnID8gJ1dhcm5pbmcnIDogJ0luZm8nLFxuICAgICAgICAgICAgaHRtbDogYDxhIGhyZWY9XCJodHRwOi8vanNsaW50ZXJyb3JzLmNvbS8ke2Vycm9yLmNvZGV9XCI+JHtlcnJvci5jb2RlfTwvYT4gLSAke2Vycm9yLnJlYXNvbn1gLFxuICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICByYW5nZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHNcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/linter-jshint/lib/main.js
