(function() {
  var CommandHistory, Event, TextEditorView, h, hg, merge, split, stream, _ref;

  TextEditorView = require('atom-space-pen-views').TextEditorView;

  Event = require('geval/event');

  _ref = require('event-stream'), merge = _ref.merge, split = _ref.split;

  stream = require('stream');

  hg = require('mercury');

  h = hg.h;

  CommandHistory = require('./consolepane-utils').CommandHistory;

  exports.create = function(_debugger) {
    var ConsoleInput, ConsolePane, input, jsGrammar, tokenizeLine;
    jsGrammar = atom.grammars.grammarForScopeName('source.js');
    tokenizeLine = function(text) {
      var tokens;
      if (!jsGrammar) {
        return h('div.line', {}, text);
      }
      tokens = jsGrammar.tokenizeLine(text).tokens;
      return h('div.line', {}, [
        h('span.test.shell-session', {}, tokens.map(function(token) {
          return h('span', {
            className: token.scopes.join(' ').split('.').join(' ')
          }, [token.value]);
        }))
      ]);
    };
    ConsoleInput = (function() {
      function ConsoleInput(_debugger1) {
        this["debugger"] = _debugger1;
        this.type = "Widget";
        this._changer = Event();
        this.onEvalOrResult = this._changer.listen;
      }

      ConsoleInput.prototype.init = function() {
        var self;
        self = this;
        this.editorView = new TextEditorView({
          mini: true
        });
        this.editor = this.editorView.getModel();
        this.historyTracker = new CommandHistory(this.editor);
        this.editorView.on('keyup', function(ev) {
          var keyCode, text;
          keyCode = ev.keyCode;
          switch (keyCode) {
            case 13:
              text = self.editor.getText();
              self._changer.broadcast(text);
              self.editor.setText('');
              self.historyTracker.saveIfNew(text);
              return self["debugger"]["eval"](text).then(function(result) {
                return self._changer.broadcast(result.text);
              })["catch"](function(e) {
                if (e.message != null) {
                  return self._changer.broadcast(e.message);
                } else {
                  return self._changer.broadcast(e);
                }
              });
            case 38:
              return self.historyTracker.moveUp();
            case 40:
              return self.historyTracker.moveDown();
          }
        });
        return this.editorView.get(0);
      };

      ConsoleInput.prototype.update = function(prev, el) {
        return el;
      };

      return ConsoleInput;

    })();
    input = new ConsoleInput(_debugger);
    ConsolePane = function() {
      var newWriter, state;
      state = hg.state({
        lines: hg.array([]),
        channels: {
          clear: function(state) {
            return state.lines.set([]);
          }
        }
      });
      input.onEvalOrResult(function(text) {
        return state.lines.push(text);
      });
      newWriter = function() {
        return new stream.Writable({
          write: function(chunk, encoding, next) {
            state.lines.push(chunk.toString());
            return next();
          }
        });
      };
      _debugger.processManager.on('processCreated', function() {
        var stderr, stdout, _ref1;
        _ref1 = _debugger.processManager.process, stdout = _ref1.stdout, stderr = _ref1.stderr;
        stdout.on('data', function(d) {
          return console.log(d.toString());
        });
        stderr.on('data', function(d) {
          return console.log(d.toString());
        });
        stdout.pipe(split()).pipe(newWriter());
        return stderr.pipe(split()).pipe(newWriter());
      });
      _debugger.on('reconnect', function(_arg) {
        var count, host, message, port, timeout;
        count = _arg.count, host = _arg.host, port = _arg.port, timeout = _arg.timeout;
        message = "Connection attempt " + count + " to node process on " + host + ":" + port + " failed. Will try again in " + timeout + ".";
        return state.lines.push(message);
      });
      return state;
    };
    ConsolePane.render = function(state) {
      return h('div.inset-panel', {
        style: {
          flex: '1 1 0',
          display: 'flex',
          flexDirection: 'column'
        }
      }, [
        h('div.debugger-panel-heading', {
          style: {
            display: 'flex',
            flexDirection: 'row',
            'align-items': 'center',
            'justify-content': 'center'
          }
        }, [
          h('div', {}, 'stdout/stderr'), h('div', {
            style: {
              'margin-left': 'auto'
            },
            className: 'icon-trashcan btn btn-primary',
            'ev-click': hg.send(state.channels.clear)
          })
        ]), h('div.panel-body.padded.native-key-bindings', {
          attributes: {
            tabindex: '-1'
          },
          style: {
            flex: '1',
            overflow: 'auto',
            "font-family": "Menlo, Consolas, 'DejaVu Sans Mono', monospace"
          }
        }, state.lines.map(tokenizeLine)), h('div.debugger-editor', {
          style: {
            height: '33px',
            flexBasis: '33px'
          }
        }, [input])
      ]);
    };
    return ConsolePane;
  };

  exports.cleanup = function() {};

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvQ29uc29sZVBhbmUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdFQUFBOztBQUFBLEVBQUMsaUJBQWtCLE9BQUEsQ0FBUSxzQkFBUixFQUFsQixjQUFELENBQUE7O0FBQUEsRUFDQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGFBQVIsQ0FEUixDQUFBOztBQUFBLEVBRUEsT0FBaUIsT0FBQSxDQUFRLGNBQVIsQ0FBakIsRUFBQyxhQUFBLEtBQUQsRUFBUSxhQUFBLEtBRlIsQ0FBQTs7QUFBQSxFQUdBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUEsRUFJQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FKTCxDQUFBOztBQUFBLEVBS0MsSUFBSyxHQUFMLENBTEQsQ0FBQTs7QUFBQSxFQU1DLGlCQUFrQixPQUFBLENBQVEscUJBQVIsRUFBbEIsY0FORCxDQUFBOztBQUFBLEVBUUEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxTQUFELEdBQUE7QUFDZixRQUFBLHlEQUFBO0FBQUEsSUFBQSxTQUFBLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxXQUFsQyxDQUFaLENBQUE7QUFBQSxJQUVBLFlBQUEsR0FBZSxTQUFDLElBQUQsR0FBQTtBQUNiLFVBQUEsTUFBQTtBQUFBLE1BQUEsSUFBQSxDQUFBLFNBQUE7QUFBQSxlQUFPLENBQUEsQ0FBRSxVQUFGLEVBQWMsRUFBZCxFQUFrQixJQUFsQixDQUFQLENBQUE7T0FBQTtBQUFBLE1BQ0MsU0FBVSxTQUFTLENBQUMsWUFBVixDQUF1QixJQUF2QixFQUFWLE1BREQsQ0FBQTthQUVBLENBQUEsQ0FBRSxVQUFGLEVBQWMs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

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/ConsolePane.coffee
