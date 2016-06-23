(function() {
  var CompositeDisposable, IndentationManager;

  CompositeDisposable = require('atom').CompositeDisposable;

  IndentationManager = require('./indentation-manager');

  module.exports = {
    activate: function(state) {
      this.disposables = new CompositeDisposable;
      this.disposables.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return _this._handleLoad(editor);
        };
      })(this)));
      this.disposables.add(atom.commands.add('atom-text-editor', 'auto-detect-indentation:show-indentation-selector', this.createIndentationListView));
      this.indentationListView = null;
      return this.indentationStatusView = null;
    },
    _handleLoad: function(editor) {
      var onSaveDisposable, onTokenizeDisposable, _ref;
      this._attach(editor);
      onSaveDisposable = editor.buffer.onDidSave((function(_this) {
        return function() {
          var indentation;
          if (IndentationManager.isManuallyIndented(editor)) {
            return onSaveDisposable != null ? onSaveDisposable.dispose() : void 0;
          } else {
            indentation = IndentationManager.autoDetectIndentation(editor);
            return IndentationManager.setIndentation(editor, indentation, true);
          }
        };
      })(this));
      if ((_ref = editor.displayBuffer) != null ? _ref.onDidTokenize : void 0) {
        onTokenizeDisposable = editor.displayBuffer.onDidTokenize((function(_this) {
          return function() {
            _this._attach(editor);
            if (onTokenizeDisposable != null) {
              onTokenizeDisposable.dispose();
            }
            return onTokenizeDisposable = null;
          };
        })(this));
      } else {
        onTokenizeDisposable = null;
      }
      return editor.onDidDestroy(function() {
        if (onSaveDisposable != null) {
          onSaveDisposable.dispose();
        }
        return onTokenizeDisposable != null ? onTokenizeDisposable.dispose() : void 0;
      });
    },
    deactivate: function() {
      return this.disposables.dispose();
    },
    createIndentationListView: (function(_this) {
      return function() {
        var IndentationListView, indentationListView;
        if (_this.indentationListView == null) {
          IndentationListView = require('./indentation-list-view');
          indentationListView = new IndentationListView();
        }
        return indentationListView.toggle();
      };
    })(this),
    consumeStatusBar: function(statusBar) {
      var IndentationStatusView, indentationStatusView;
      if (this.IndentationStatusView == null) {
        IndentationStatusView = require('./indentation-status-view');
        indentationStatusView = new IndentationStatusView().initialize(statusBar);
      }
      return indentationStatusView.attach();
    },
    _attach: function(editor) {
      var indentation, originalSetSoftTabs, originalSetTabLength;
      originalSetSoftTabs = editor.setSoftTabs;
      originalSetTabLength = editor.setTabLength;
      editor.shouldUseSoftTabs = function() {
        return this.softTabs;
      };
      editor.setSoftTabs = function(softTabs) {
        var value;
        this.softTabs = softTabs;
        value = originalSetSoftTabs.call(editor, this.softTabs);
        this.emitter.emit('did-change-indentation');
        return value;
      };
      editor.setTabLength = function(tabLength) {
        var value;
        value = originalSetTabLength.call(editor, tabLength);
        this.emitter.emit('did-change-indentation');
        return value;
      };
      indentation = IndentationManager.autoDetectIndentation(editor);
      return IndentationManager.setIndentation(editor, indentation, true);
    },
    config: {
      showSpacingInStatusBar: {
        type: 'boolean',
        "default": true,
        title: 'Show spacing in status bar',
        description: 'Show current editor\'s spacing settings in status bar'
      },
      indentationTypes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            softTabs: {
              type: 'boolean'
            },
            tabLength: {
              type: 'integer'
            }
          }
        },
        "default": [
          {
            name: "2 Spaces",
            softTabs: true,
            tabLength: 2
          }, {
            name: "4 Spaces",
            softTabs: true,
            tabLength: 4
          }, {
            name: "8 Spaces",
            softTabs: true,
            tabLength: 8
          }, {
            name: "Tabs (default width)",
            softTabs: false
          }, {
            name: "Tabs (2 wide)",
            softTabs: false,
            tabLength: 2
          }, {
            name: "Tabs (4 wide)",
            softTabs: false,
            tabLength: 4
          }, {
            name: "Tabs (8 wide)",
            softTabs: false,
            tabLength: 8
          }
        ]
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F1dG8tZGV0ZWN0LWluZGVudGF0aW9uL2xpYi9hdXRvLWRldGVjdC1pbmRlbnRhdGlvbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx1QkFBUixDQURyQixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEdBQUEsQ0FBQSxtQkFBZixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBZixDQUFrQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7aUJBQ2pELEtBQUMsQ0FBQSxXQUFELENBQWEsTUFBYixFQURpRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxDLENBQWpCLENBREEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsbURBQXRDLEVBQTJGLElBQUMsQ0FBQSx5QkFBNUYsQ0FBakIsQ0FIQSxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsbUJBQUQsR0FBdUIsSUFMdkIsQ0FBQTthQU1BLElBQUMsQ0FBQSxxQkFBRCxHQUF5QixLQVBqQjtJQUFBLENBQVY7QUFBQSxJQVNBLFdBQUEsRUFBYSxTQUFDLE1BQUQsR0FBQTtBQUNY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

//# sourceURL=/Users/broberto/.atom/packages/auto-detect-indentation/lib/auto-detect-indentation.coffee
