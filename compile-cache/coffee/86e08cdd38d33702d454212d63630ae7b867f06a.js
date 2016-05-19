(function() {
  var CommandHistory;

  CommandHistory = (function() {
    function CommandHistory(editor) {
      this.editor = editor;
      this.cmdHistory = [];
    }

    CommandHistory.prototype.saveIfNew = function(text) {
      if (!((this.cmdHistoryIndex != null) && this.cmdHistory[this.cmdHistoryIndex] === text)) {
        this.cmdHistoryIndex = this.cmdHistory.length;
        this.cmdHistory.push(text);
      }
      return this.historyMode = false;
    };

    CommandHistory.prototype.moveUp = function() {
      if (this.cmdHistoryIndex == null) {
        return;
      }
      if (this.cmdHistoryIndex > 0 && this.historyMode) {
        this.cmdHistoryIndex--;
      }
      this.editor.setText(this.cmdHistory[this.cmdHistoryIndex]);
      return this.historyMode = true;
    };

    CommandHistory.prototype.moveDown = function() {
      if (this.cmdHistoryIndex == null) {
        return;
      }
      if (!this.historyMode) {
        return;
      }
      if (this.cmdHistoryIndex < this.cmdHistory.length - 1 && this.historyMode) {
        this.cmdHistoryIndex++;
      }
      return this.editor.setText(this.cmdHistory[this.cmdHistoryIndex]);
    };

    return CommandHistory;

  })();

  exports.CommandHistory = CommandHistory;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvY29uc29sZXBhbmUtdXRpbHMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLGNBQUE7O0FBQUEsRUFBTTtBQUNTLElBQUEsd0JBQUMsTUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQVYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxFQURkLENBRFc7SUFBQSxDQUFiOztBQUFBLDZCQUlBLFNBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNULE1BQUEsSUFBQSxDQUFBLENBQU8sOEJBQUEsSUFBc0IsSUFBQyxDQUFBLFVBQVcsQ0FBQSxJQUFDLENBQUEsZUFBRCxDQUFaLEtBQWlDLElBQTlELENBQUE7QUFDRSxRQUFBLElBQUMsQ0FBQSxlQUFELEdBQW1CLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBL0IsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLElBQWpCLENBREEsQ0FERjtPQUFBO2FBR0EsSUFBQyxDQUFBLFdBQUQsR0FBZSxNQUpOO0lBQUEsQ0FKWCxDQUFBOztBQUFBLDZCQVNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQWMsNEJBQWQ7QUFBQSxjQUFBLENBQUE7T0FBQTtBQUNBLE1BQUEsSUFBRyxJQUFDLENBQUEsZUFBRCxHQUFtQixDQUFuQixJQUF5QixJQUFDLENBQUEsV0FBN0I7QUFDRSxRQUFBLElBQUMsQ0FBQSxlQUFELEVBQUEsQ0FERjtPQURBO0FBQUEsTUFHQSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBZ0IsSUFBQyxDQUFBLFVBQVcsQ0FBQSxJQUFDLENBQUEsZUFBRCxDQUE1QixDQUhBLENBQUE7YUFJQSxJQUFDLENBQUEsV0FBRCxHQUFlLEtBTFQ7SUFBQSxDQVRSLENBQUE7O0FBQUEsNkJBZUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBYyw0QkFBZDtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQ0EsTUFBQSxJQUFBLENBQUEsSUFBZSxDQUFBLFdBQWY7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUVBLE1BQUEsSUFBRyxJQUFDLENBQUEsZUFBRCxHQUFtQixJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsQ0FBeEMsSUFBOEMsSUFBQyxDQUFBLFdBQWxEO0FBQ0UsUUFBQSxJQUFDLENBQUEsZUFBRCxFQUFBLENBREY7T0FGQTthQUlBLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFnQixJQUFDLENBQUEsVUFBVyxDQUFBLElBQUMsQ0FBQSxlQUFELENBQTVCLEVBTFE7SUFBQSxDQWZWLENBQUE7OzBCQUFBOztNQURGLENBQUE7O0FBQUEsRUF3QkEsT0FBTyxDQUFDLGNBQVIsR0FBeUIsY0F4QnpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/consolepane-utils.coffee
