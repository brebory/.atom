(function() {
  var $, Point, Tabularize, TabularizeView, TextEditorView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tabularize = require('./tabularize');

  Point = require('atom').Point;

  _ref = require('atom-space-pen-views'), $ = _ref.$, TextEditorView = _ref.TextEditorView, View = _ref.View;

  module.exports = TabularizeView = (function(_super) {
    __extends(TabularizeView, _super);

    function TabularizeView() {
      return TabularizeView.__super__.constructor.apply(this, arguments);
    }

    TabularizeView.activate = function() {
      return new TabularizeView;
    };

    TabularizeView.content = function() {
      return this.div({
        "class": 'tabularize overlay from-top mini'
      }, (function(_this) {
        return function() {
          _this.subview('miniEditor', new TextEditorView({
            mini: true
          }));
          _this.div({
            "class": 'message',
            outlet: 'message'
          });
          return _this.div({
            "class": 'block'
          }, function() {
            return _this.div({
              "class": 'btn-group centered'
            }, function() {
              _this.button({
                "class": 'btn selected'
              }, 'Left');
              _this.button({
                "class": 'btn disabled'
              }, 'Center');
              return _this.button({
                "class": 'btn disabled'
              }, 'Right');
            });
          });
        };
      })(this));
    };

    TabularizeView.prototype.detaching = false;

    TabularizeView.prototype.initialize = function() {
      this.panel = atom.workspace.addModalPanel({
        item: this,
        visible: false
      });
      atom.commands.add('atom-text-editor', 'tabularize:toggle', (function(_this) {
        return function() {
          _this.toggle();
          return false;
        };
      })(this));
      this.miniEditor.on('blur', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this));
      atom.commands.add(this.miniEditor.element, 'core:confirm', (function(_this) {
        return function() {
          return _this.confirm();
        };
      })(this));
      return atom.commands.add(this.miniEditor.element, 'core:cancel', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this));
    };

    TabularizeView.prototype.toggle = function() {
      if (this.panel.isVisible()) {
        return this.close();
      } else {
        return this.open();
      }
    };

    TabularizeView.prototype.close = function() {
      var miniEditorFocused;
      if (!this.panel.isVisible()) {
        return;
      }
      miniEditorFocused = this.miniEditor.hasFocus();
      this.miniEditor.setText('');
      this.panel.hide();
      if (miniEditorFocused) {
        return this.restoreFocus();
      }
    };

    TabularizeView.prototype.confirm = function() {
      var editor, regex;
      regex = this.miniEditor.getText();
      editor = atom.workspace.getActiveTextEditor();
      this.close();
      if (!(editor && regex.length)) {
        return;
      }
      return Tabularize.tabularize(regex, editor);
    };

    TabularizeView.prototype.storeFocusedElement = function() {
      return this.previouslyFocusedElement = $(':focus');
    };

    TabularizeView.prototype.restoreFocus = function() {
      var _ref1;
      if ((_ref1 = this.previouslyFocusedElement) != null ? _ref1.isOnDom() : void 0) {
        return this.previouslyFocusedElement.focus();
      } else {
        return atom.views.getView(atom.workspace).focus();
      }
    };

    TabularizeView.prototype.open = function() {
      var editor;
      if (this.panel.isVisible()) {
        return;
      }
      if (editor = atom.workspace.getActiveTextEditor()) {
        this.storeFocusedElement();
        this.panel.show();
        this.message.text("Use a regex to select the separator");
        return this.miniEditor.focus();
      }
    };

    return TabularizeView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3RhYnVsYXJpemUvbGliL3RhYnVsYXJpemUtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0VBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEsY0FBUixDQUFiLENBQUE7O0FBQUEsRUFFQyxRQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsS0FGRCxDQUFBOztBQUFBLEVBR0EsT0FBNkIsT0FBQSxDQUFRLHNCQUFSLENBQTdCLEVBQUMsU0FBQSxDQUFELEVBQUksc0JBQUEsY0FBSixFQUFvQixZQUFBLElBSHBCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0oscUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsY0FBQyxDQUFBLFFBQUQsR0FBVyxTQUFBLEdBQUE7YUFBRyxHQUFBLENBQUEsZUFBSDtJQUFBLENBQVgsQ0FBQTs7QUFBQSxJQUVBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGtDQUFQO09BQUwsRUFBZ0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM5QyxVQUFBLEtBQUMsQ0FBQSxPQUFELENBQVMsWUFBVCxFQUEyQixJQUFBLGNBQUEsQ0FBZTtBQUFBLFlBQUEsSUFBQSxFQUFNLElBQU47V0FBZixDQUEzQixDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxTQUFQO0FBQUEsWUFBa0IsTUFBQSxFQUFRLFNBQTFCO1dBQUwsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9B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

//# sourceURL=/Users/broberto/.atom/packages/tabularize/lib/tabularize-view.coffee
