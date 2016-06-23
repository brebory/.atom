(function() {
  var Disposable, IndentationManager, IndentationStatusView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  IndentationManager = require('./indentation-manager');

  IndentationStatusView = (function(_super) {
    __extends(IndentationStatusView, _super);

    function IndentationStatusView() {
      return IndentationStatusView.__super__.constructor.apply(this, arguments);
    }

    IndentationStatusView.prototype.initialize = function(statusBar) {
      this.statusBar = statusBar;
      this.classList.add('indentation-status', 'inline-block');
      this.indentationLink = document.createElement('a');
      this.indentationLink.classList.add('inline-block');
      this.indentationLink.href = '#';
      this.appendChild(this.indentationLink);
      this.handleEvents();
      return this;
    };

    IndentationStatusView.prototype.attach = function() {
      var _ref;
      if ((_ref = this.statusBarTile) != null) {
        _ref.destroy();
      }
      this.statusBarTile = atom.config.get('auto-detect-indentation.showSpacingInStatusBar') ? this.statusBar.addRightTile({
        item: this,
        priority: 10
      }) : void 0;
      return this.updateIndentationText();
    };

    IndentationStatusView.prototype.handleEvents = function() {
      var clickHandler;
      this.activeItemSubscription = atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function() {
          return _this.subscribeToActiveTextEditor();
        };
      })(this));
      this.configSubscription = atom.config.observe('auto-detect-indentation.showSpacingInStatusBar', (function(_this) {
        return function() {
          return _this.attach();
        };
      })(this));
      clickHandler = (function(_this) {
        return function() {
          return atom.commands.dispatch(atom.views.getView(_this.getActiveTextEditor()), 'auto-detect-indentation:show-indentation-selector');
        };
      })(this);
      this.addEventListener('click', clickHandler);
      this.clickSubscription = new Disposable((function(_this) {
        return function() {
          return _this.removeEventListener('click', clickHandler);
        };
      })(this));
      return this.subscribeToActiveTextEditor();
    };

    IndentationStatusView.prototype.destroy = function() {
      var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      if ((_ref = this.activeItemSubscription) != null) {
        _ref.dispose();
      }
      if ((_ref1 = this.indentationSubscription) != null) {
        _ref1.dispose();
      }
      if ((_ref2 = this.paneOpenSubscription) != null) {
        _ref2.dispose();
      }
      if ((_ref3 = this.paneCreateSubscription) != null) {
        _ref3.dispose();
      }
      if ((_ref4 = this.paneDestroySubscription) != null) {
        _ref4.dispose();
      }
      if ((_ref5 = this.clickSubscription) != null) {
        _ref5.dispose();
      }
      if ((_ref6 = this.configSubscription) != null) {
        _ref6.dispose();
      }
      return this.statusBarTile.destroy();
    };

    IndentationStatusView.prototype.getActiveTextEditor = function() {
      return atom.workspace.getActiveTextEditor();
    };

    IndentationStatusView.prototype.subscribeToActiveTextEditor = function() {
      var editor, workspace, _ref, _ref1, _ref2, _ref3, _ref4;
      workspace = atom.workspace;
      editor = workspace.getActiveTextEditor();
      if ((_ref = this.indentationSubscription) != null) {
        _ref.dispose();
      }
      this.indentationSubscription = editor != null ? (_ref1 = editor.emitter) != null ? _ref1.on('did-change-indentation', (function(_this) {
        return function() {
          return _this.updateIndentationText();
        };
      })(this)) : void 0 : void 0;
      if ((_ref2 = this.paneOpenSubscription) != null) {
        _ref2.dispose();
      }
      this.paneOpenSubscription = workspace.onDidOpen((function(_this) {
        return function(event) {
          return _this.updateIndentationText();
        };
      })(this));
      if ((_ref3 = this.paneCreateSubscription) != null) {
        _ref3.dispose();
      }
      this.paneCreateSubscription = workspace.onDidAddPane((function(_this) {
        return function(event) {
          return _this.updateIndentationText();
        };
      })(this));
      if ((_ref4 = this.paneDestroySubscription) != null) {
        _ref4.dispose();
      }
      this.paneDestroySubscription = workspace.onDidDestroyPaneItem((function(_this) {
        return function(event) {
          return _this.updateIndentationText();
        };
      })(this));
      return this.updateIndentationText();
    };

    IndentationStatusView.prototype.updateIndentationText = function() {
      var editor, indentationName;
      editor = this.getActiveTextEditor();
      if (editor) {
        indentationName = IndentationManager.getIndentation(editor);
        this.indentationLink.textContent = indentationName;
        return this.style.display = '';
      } else {
        return this.style.display = 'none';
      }
    };

    return IndentationStatusView;

  })(HTMLDivElement);

  module.exports = document.registerElement('indentation-selector-status', {
    prototype: IndentationStatusView.prototype
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F1dG8tZGV0ZWN0LWluZGVudGF0aW9uL2xpYi9pbmRlbnRhdGlvbi1zdGF0dXMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscURBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLE1BQVIsRUFBZCxVQUFELENBQUE7O0FBQUEsRUFDQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsdUJBQVIsQ0FEckIsQ0FBQTs7QUFBQSxFQUdNO0FBQ0osNENBQUEsQ0FBQTs7OztLQUFBOztBQUFBLG9DQUFBLFVBQUEsR0FBWSxTQUFFLFNBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFlBQUEsU0FDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsU0FBUyxDQUFDLEdBQVgsQ0FBZSxvQkFBZixFQUFxQyxjQUFyQyxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxlQUFELEdBQW1CLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBRG5CLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQTNCLENBQStCLGNBQS9CLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLGVBQWUsQ0FBQyxJQUFqQixHQUF3QixHQUh4QixDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsV0FBRCxDQUFhLElBQUMsQ0FBQSxlQUFkLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUxBLENBQUE7YUFNQSxLQVBVO0lBQUEsQ0FBWixDQUFBOztBQUFBLG9DQVNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixVQUFBLElBQUE7O1lBQWMsQ0FBRSxPQUFoQixDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMs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

//# sourceURL=/Users/broberto/.atom/packages/auto-detect-indentation/lib/indentation-status-view.coffee
