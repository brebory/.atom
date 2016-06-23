(function() {
  var manuallyIndented;

  manuallyIndented = new WeakSet();

  module.exports = {
    getIndentation: function(editor) {
      var indentationName, softTabs, tabLength;
      softTabs = editor.getSoftTabs();
      tabLength = editor.getTabLength();
      if (softTabs) {
        indentationName = tabLength + ' Spaces';
      } else {
        indentationName = 'Tabs (' + tabLength + ' wide)';
      }
      return indentationName;
    },
    getIndentations: function() {
      return atom.config.get("auto-detect-indentation.indentationTypes");
    },
    autoDetectIndentation: function(editor) {
      var firstSpaces, found, i, length, lineCount, numLinesWithSpaces, numLinesWithTabs, shortest, softTabs, spaceChars, tabLength, _i, _ref;
      lineCount = editor.getLineCount();
      shortest = 0;
      numLinesWithTabs = 0;
      numLinesWithSpaces = 0;
      found = false;
      for (i = _i = 0, _ref = lineCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (!(i < 100 || !found)) {
          continue;
        }
        if (editor.isBufferRowCommented(i)) {
          continue;
        }
        firstSpaces = editor.lineTextForBufferRow(i).match(/^([ \t]+)[^ \t]/m);
        if (firstSpaces) {
          spaceChars = firstSpaces[1];
          if (spaceChars[0] === '\t') {
            numLinesWithTabs++;
          } else {
            length = spaceChars.length;
            if (length === 1) {
              continue;
            }
            numLinesWithSpaces++;
            if (length < shortest || shortest === 0) {
              shortest = length;
            }
          }
          found = true;
        }
      }
      softTabs = null;
      tabLength = null;
      if (found) {
        if (numLinesWithTabs > numLinesWithSpaces) {
          softTabs = false;
        } else {
          softTabs = true;
          tabLength = shortest;
        }
      }
      return {
        softTabs: softTabs,
        tabLength: tabLength
      };
    },
    setIndentation: function(editor, indentation, automatic) {
      if (automatic == null) {
        automatic = false;
      }
      if (!automatic) {
        manuallyIndented.add(editor);
      }
      if ("softTabs" in indentation && indentation.softTabs !== null) {
        editor.setSoftTabs(indentation.softTabs);
      } else {
        editor.setSoftTabs(atom.config.get("editor.softTabs", {
          scope: editor.getRootScopeDescriptor().scopes
        }));
      }
      if ("tabLength" in indentation) {
        return editor.setTabLength(indentation.tabLength);
      } else {
        return editor.setTabLength(atom.config.get("editor.tabLength", {
          scope: editor.getRootScopeDescriptor().scopes
        }));
      }
    },
    isManuallyIndented: function(editor) {
      return manuallyIndented.has(editor);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F1dG8tZGV0ZWN0LWluZGVudGF0aW9uL2xpYi9pbmRlbnRhdGlvbi1tYW5hZ2VyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQkFBQTs7QUFBQSxFQUFBLGdCQUFBLEdBQXVCLElBQUEsT0FBQSxDQUFBLENBQXZCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQWdCLFNBQUMsTUFBRCxHQUFBO0FBQ2QsVUFBQSxvQ0FBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FBWCxDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQVksTUFBTSxDQUFDLFlBQVAsQ0FBQSxDQURaLENBQUE7QUFFQSxNQUFBLElBQUcsUUFBSDtBQUNFLFFBQUEsZUFBQSxHQUFrQixTQUFBLEdBQVksU0FBOUIsQ0FERjtPQUFBLE1BQUE7QUFHRSxRQUFBLGVBQUEsR0FBa0IsUUFBQSxHQUFXLFNBQVgsR0FBdUIsUUFBekMsQ0FIRjtPQUZBO2FBTUEsZ0JBUGM7SUFBQSxDQUFoQjtBQUFBLElBU0EsZUFBQSxFQUFpQixTQUFBLEdBQUE7YUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMENBQWhCLEVBRGU7SUFBQSxDQVRqQjtBQUFBLElBWUEscUJBQUEsRUFBdUIsU0FBQyxNQUFELEdBQUE7QUFDckIsVUFBQSxtSUFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLE1BQU0sQ0FBQyxZQUFQLENBQUEsQ0FBWixDQUFBO0FBQUEsTUFDQSxRQUFBLEdBQVcsQ0FEWCxDQUFBO0FBQUEsTUFFQSxnQkFBQSxHQUFtQixDQUZuQixDQUFBO0FBQUEsTUFHQSxrQkFBQSxHQUFxQixDQUhyQixDQUFBO0FBQUEsTUFJQSxL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

//# sourceURL=/Users/broberto/.atom/packages/auto-detect-indentation/lib/indentation-manager.coffee
