(function() {
  var $, Module, NonEditableEditorView, TextEditorView, View, path, removeModuleWrapper, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View, TextEditorView = _ref.TextEditorView;

  Module = require('module');

  path = require('path');

  removeModuleWrapper = function(str) {
    var lines, popItem;
    lines = str.split('\n');
    lines = lines.filter(function(line) {
      if (line === Module.wrapper[0]) {
        return false;
      }
      return true;
    });
    lines = lines.map(function(line) {
      if (line.indexOf(Module.wrapper[0]) >= 0) {
        return line.replace(Module.wrapper[0], '');
      }
      return line;
    });
    popItem = null;
    lines.pop();
    return lines.join('\n');
  };

  module.exports = NonEditableEditorView = (function(_super) {
    __extends(NonEditableEditorView, _super);

    function NonEditableEditorView() {
      return NonEditableEditorView.__super__.constructor.apply(this, arguments);
    }

    NonEditableEditorView.content = TextEditorView.content;

    NonEditableEditorView.prototype.initialize = function(opts) {
      this.uri = opts.uri, this._debugger = opts._debugger;
      if (opts.script) {
        this.id = opts.script.id;
        this.onDone();
        return this.setText(removeModuleWrapper(script.source));
      }
      if (opts.id) {
        this.id = opts.id;
        this._debugger.getScriptById(this.id).then((function(_this) {
          return function(script) {
            _this.script = script;
            _this.setText(removeModuleWrapper(script.source));
            return _this.onDone();
          };
        })(this)).then((function(_this) {
          return function() {};
        })(this));
      }
      return this.title = opts.query.name;
    };

    NonEditableEditorView.prototype.onDone = function() {
      var extname, grammar;
      extname = path.extname(this.script.name);
      if (extname === '.js') {
        grammar = atom.grammars.grammarForScopeName('source.js');
      } else if (extname === '.coffee') {
        grammar = atom.grammars.grammarForScopeName('source.coffee');
      } else {
        return;
      }
      return this.getModel().setGrammar(grammar);
    };

    NonEditableEditorView.prototype.setCursorBufferPosition = function(opts) {
      return this.getModel().setCursorBufferPosition(opts, {
        autoscroll: true
      });
    };

    NonEditableEditorView.prototype.markBufferPosition = function(opts) {
      return this.getModel().markBufferPosition(opts);
    };

    NonEditableEditorView.prototype.decorateMarker = function(marker, opts) {
      return this.getModel().decorateMarker(marker, opts);
    };

    NonEditableEditorView.prototype.serialize = function() {
      return {
        uri: this.uri,
        id: this.id,
        script: this.script
      };
    };

    NonEditableEditorView.prototype.deserialize = function(state) {
      return new NonEditableEditorView(state);
    };

    NonEditableEditorView.prototype.getTitle = function() {
      return this.title || 'NativeScript';
    };

    NonEditableEditorView.prototype.getUri = function() {
      return this.uri;
    };

    return NonEditableEditorView;

  })(TextEditorView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL25vbi1lZGl0YWJsZS1lZGl0b3IuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUE0QixPQUFBLENBQVEsc0JBQVIsQ0FBNUIsRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosRUFBVSxzQkFBQSxjQUFWLENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLG1CQUFBLEdBQXNCLFNBQUMsR0FBRCxHQUFBO0FBQ3BCLFFBQUEsY0FBQTtBQUFBLElBQUEsS0FBQSxHQUFRLEdBQUcsQ0FBQyxLQUFKLENBQVUsSUFBVixDQUFSLENBQUE7QUFBQSxJQUVBLEtBQUEsR0FBUSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ25CLE1BQUEsSUFBZ0IsSUFBQSxLQUFRLE1BQU0sQ0FBQyxPQUFRLENBQUEsQ0FBQSxDQUF2QztBQUFBLGVBQU8sS0FBUCxDQUFBO09BQUE7QUFDQSxhQUFPLElBQVAsQ0FGbUI7SUFBQSxDQUFiLENBRlIsQ0FBQTtBQUFBLElBTUEsS0FBQSxHQUFRLEtBQUssQ0FBQyxHQUFOLENBQVUsU0FBQyxJQUFELEdBQUE7QUFDaEIsTUFBQSxJQUFHLElBQUksQ0FBQyxPQUFMLENBQWEsTUFBTSxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQTVCLENBQUEsSUFBbUMsQ0FBdEM7QUFDRSxlQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsTUFBTSxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQTVCLEVBQWdDLEVBQWhDLENB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

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/non-editable-editor.coffee
