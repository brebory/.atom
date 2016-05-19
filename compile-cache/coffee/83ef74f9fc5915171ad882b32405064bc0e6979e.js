(function() {
  var Module, NonEditableEditorView, PROTOCOL, Promise, cleanupListener, currentMarker, exists, fs, url;

  Promise = require('bluebird');

  fs = require('fs');

  url = require('url');

  Module = require('module');

  NonEditableEditorView = require('./non-editable-editor');

  PROTOCOL = 'atom-node-debugger://';

  currentMarker = null;

  cleanupListener = null;

  exists = function(path) {
    return new Promise(function(resolve) {
      return fs.exists(path, function(isExisted) {
        return resolve(isExisted);
      });
    });
  };

  module.exports = function(_debugger) {
    atom.workspace.addOpener(function(filename, opts) {
      var parsed;
      parsed = url.parse(filename, true);
      if (parsed.protocol === 'atom-node-debugger:') {
        return new NonEditableEditorView({
          uri: filename,
          id: parsed.host,
          _debugger: _debugger,
          query: opts
        });
      }
    });
    return cleanupListener = _debugger.onBreak(function(breakpoint) {
      var id, script, sourceColumn, sourceLine, _ref;
      if (currentMarker != null) {
        currentMarker.destroy();
      }
      sourceLine = breakpoint.sourceLine, sourceColumn = breakpoint.sourceColumn;
      script = breakpoint.script && breakpoint.script.name;
      id = (_ref = breakpoint.script) != null ? _ref.id : void 0;
      return exists(script).then(function(isExisted) {
        var newSourceName, promise;
        if (isExisted) {
          promise = atom.workspace.open(script, {
            initialLine: sourceLine,
            initialColumn: sourceColumn,
            activatePane: true,
            searchAllPanes: true
          });
        } else {
          if (id == null) {
            return;
          }
          newSourceName = "" + PROTOCOL + id;
          promise = atom.workspace.open(newSourceName, {
            initialColumn: sourceColumn,
            initialLine: sourceLine,
            name: script,
            searchAllPanes: true
          });
        }
        return promise;
      }).then(function(editor) {
        if (editor == null) {
          return;
        }
        currentMarker = editor.markBufferPosition([sourceLine, sourceColumn]);
        return editor.decorateMarker(currentMarker, {
          type: 'line-number',
          "class": 'node-debugger-stop-line'
        });
      });
    });
  };

  module.exports.cleanup = function() {
    if (currentMarker != null) {
      return currentMarker.destroy();
    }
  };

  module.exports.destroy = function() {
    module.exports.cleanup();
    if (cleanupListener != null) {
      return cleanupListener();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL2p1bXAtdG8tYnJlYWtwb2ludC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUdBQUE7O0FBQUEsRUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFVBQVIsQ0FBVixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsS0FBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FIVCxDQUFBOztBQUFBLEVBSUEscUJBQUEsR0FBd0IsT0FBQSxDQUFRLHVCQUFSLENBSnhCLENBQUE7O0FBQUEsRUFPQSxRQUFBLEdBQVcsdUJBUFgsQ0FBQTs7QUFBQSxFQVNBLGFBQUEsR0FBZ0IsSUFUaEIsQ0FBQTs7QUFBQSxFQVVBLGVBQUEsR0FBa0IsSUFWbEIsQ0FBQTs7QUFBQSxFQVlBLE1BQUEsR0FBUyxTQUFDLElBQUQsR0FBQTtXQUNILElBQUEsT0FBQSxDQUFRLFNBQUMsT0FBRCxHQUFBO2FBQ1YsRUFBRSxDQUFDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLFNBQUMsU0FBRCxHQUFBO2VBQ2QsT0FBQSxDQUFRLFNBQVIsRUFEYztNQUFBLENBQWhCLEVBRFU7SUFBQSxDQUFSLEVBREc7RUFBQSxDQVpULENBQUE7O0FBQUEsRUFpQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxTQUFELEdBQUE7QUFDZixJQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBZixDQUF5QixTQUFDLFFBQUQsRUFBVyxJQUFYLEdBQUE7QUFDdkIsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUosQ0FBVSxR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

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/jump-to-breakpoint.coffee
