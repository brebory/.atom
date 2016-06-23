(function() {
  var IndentationListView, IndentationManager, SelectListView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SelectListView = require('atom-space-pen-views').SelectListView;

  IndentationManager = require('./indentation-manager');

  module.exports = IndentationListView = (function(_super) {
    __extends(IndentationListView, _super);

    function IndentationListView() {
      return IndentationListView.__super__.constructor.apply(this, arguments);
    }

    IndentationListView.prototype.initialize = function() {
      IndentationListView.__super__.initialize.apply(this, arguments);
      this.addClass('auto-detect-indentation-selector');
      return this.list.addClass('mark-active');
    };

    IndentationListView.prototype.getFilterKey = function() {
      return 'name';
    };

    IndentationListView.prototype.destroy = function() {
      return this.cancel();
    };

    IndentationListView.prototype.viewForItem = function(indentation) {
      var element;
      element = document.createElement('li');
      if (indentation.name === this.currentIndentation) {
        element.classList.add('active');
      }
      element.textContent = indentation.name;
      return element;
    };

    IndentationListView.prototype.cancelled = function() {
      var _ref;
      if ((_ref = this.panel) != null) {
        _ref.destroy();
      }
      this.panel = null;
      return this.currentIndentation = null;
    };

    IndentationListView.prototype.confirmed = function(indentation) {
      var editor;
      editor = atom.workspace.getActiveTextEditor();
      IndentationManager.setIndentation(editor, indentation);
      return this.cancel();
    };

    IndentationListView.prototype.attach = function() {
      this.storeFocusedElement();
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      return this.focusFilterEditor();
    };

    IndentationListView.prototype.toggle = function() {
      var editor;
      if (this.panel != null) {
        return this.cancel();
      } else {
        editor = atom.workspace.getActiveTextEditor();
        if (editor) {
          this.currentIndentation = IndentationManager.getIndentation(editor);
          this.setItems(IndentationManager.getIndentations());
          return this.attach();
        }
      }
    };

    return IndentationListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F1dG8tZGV0ZWN0LWluZGVudGF0aW9uL2xpYi9pbmRlbnRhdGlvbi1saXN0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxpQkFBa0IsT0FBQSxDQUFRLHNCQUFSLEVBQWxCLGNBQUQsQ0FBQTs7QUFBQSxFQUNBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx1QkFBUixDQURyQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDBDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxrQ0FBQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxxREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxrQ0FBVixDQUZBLENBQUE7YUFHQSxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sQ0FBZSxhQUFmLEVBSlU7SUFBQSxDQUFaLENBQUE7O0FBQUEsa0NBTUEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUNaLE9BRFk7SUFBQSxDQU5kLENBQUE7O0FBQUEsa0NBU0EsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxNQUFELENBQUEsRUFETztJQUFBLENBVFQsQ0FBQTs7QUFBQSxrQ0FZQSxXQUFBLEdBQWEsU0FBQyxXQUFELEdBQUE7QUFDWCxVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFWLENBQUE7QUFDQSxNQUFBLElBQW1DLFdBQVcsQ0FBQyxJQUFaLEtBQW9CLElBQUMsQ0FBQSxrQkFBeEQ7QUFBQSxRQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbEIsQ0FBc0IsUUFBdEIsQ0FBQSxDQUFBO09BREE7QUFBQSxNQUVBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLFdBQVcsQ0FBQyxJQUZsQyxDQUFBO2FBR0EsUUFKVztJQUFBLENBWmIsQ0FBQTs7QUFBQSxrQ0FrQkEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsSUFBQTs7WUFBTSxDQUFFLE9BQVIsQ0FBQTtPQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBRFQsQ0FBQTthQUVBLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixLQUhiO0lBQUEsQ0FsQlgsQ0FBQTs7QUFBQSxrQ0F1QkEsU0FBQSxHQUFXLFNBQUMsV0FBRCxHQUFBO0FBQ1QsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTtBQUFBLE1BQ0Esa0JBQWtCLENBQUMsY0FBbkIsQ0FBa0MsTUFBbEMsRUFBMEMsV0FBMUMsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhTO0lBQUEsQ0F2QlgsQ0FBQTs7QUFBQSxrQ0E0QkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBQyxDQUFBLG1CQUFELENBQUEsQ0FBQSxDQUFBOztRQUNBLElBQUMsQ0FBQSxRQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUE2QjtBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47U0FBN0I7T0FEVjthQUVBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBSE07SUFBQSxDQTVCUixDQUFBOztBQUFBLGtDQWlDQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxNQUFBO0FBQUEsTUFBQSxJQUFHLGtCQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQUFULENBQUE7QUFDQSxRQUFBLElBQUcsTUFBSDtBQUNFLFVBQUEsSUFBQyxDQUFBLGtCQUFELEdBQXNCLGtCQUFrQixDQUFDLGNBQW5CLENBQWtDLE1BQWxDLENBQXRCLENBQUE7QUFBQSxVQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQWtCLENBQUMsZUFBbkIsQ0FBQSxDQUFWLENBREEsQ0FBQTtpQkFFQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBSEY7U0FKRjtPQURNO0lBQUEsQ0FqQ1IsQ0FBQTs7K0JBQUE7O0tBRGdDLGVBTGxDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/auto-detect-indentation/lib/indentation-list-view.coffee
