(function() {
  var Tabularize, TabularizeView;

  Tabularize = require('../lib/tabularize');

  TabularizeView = require('../lib/tabularize-view');

  describe("Tabularize", function() {
    var editor, editorView, tabularize, _ref;
    _ref = [], editor = _ref[0], editorView = _ref[1], tabularize = _ref[2];
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.workspace.open();
      });
      return runs(function() {
        editor = atom.workspace.getActiveTextEditor();
        editorView = atom.views.getView(editor);
        return tabularize = TabularizeView.activate();
      });
    });
    describe(".tabularize", function() {
      it("", function() {
        var actual, expected, regex, text;
        regex = "values";
        text = "INSERT INTO region(id, description, active) values(0, 0, 'AB', 'Alberta', true);";
        text += "\n";
        text += "INSERT INTO region(id, code, description, active) values (1, 0, 'BC', 'British Columbia', true);";
        expected = "INSERT INTO region(id, description, active)       values (0, 0, 'AB', 'Alberta', true);";
        expected += "\n";
        expected += "INSERT INTO region(id, code, description, active) values (1, 0, 'BC', 'British Columbia', true);";
        editor.setText(text);
        editor.selectAll();
        Tabularize.tabularize(regex, editor);
        actual = editor.getText();
        return expect(actual).toEqual(expected);
      });
      it("tabularizes columns", function() {
        var actual, expected, regex, text;
        regex = "\\|";
        text = "a | bbbbbbb | c\naaa | b | ccc";
        expected = "a   | bbbbbbb | c\naaa | b       | ccc";
        editor.setText(text);
        editor.selectAll();
        Tabularize.tabularize(regex, editor);
        actual = editor.getText();
        return expect(actual).toEqual(expected);
      });
      it("treats the input as a regex", function() {
        var actual, expected, regex, text;
        regex = "\\d";
        text = "a 1 bbbbbbb 2 c\naaa 3 b 4 ccc";
        expected = "a   1 bbbbbbb 2 c\naaa 3 b       4 ccc";
        editor.setText(text);
        editor.selectAll();
        Tabularize.tabularize(regex, editor);
        actual = editor.getText();
        return expect(actual).toEqual(expected);
      });
      it("deals with indenting correctly when not selecting whole lines", function() {
        var actual, expected, regex, text;
        text = "    @on 'core:confirm', => @confirm()";
        text += "\n";
        text += "    @on 'core:cancel', => @detach()";
        expected = "    @on 'core:confirm', => @confirm()";
        expected += "\n";
        expected += "    @on 'core:cancel',  => @detach()";
        regex = "=>";
        editor.setText(text);
        editor.setCursorBufferPosition([0, 4]);
        editor.selectToBottom();
        Tabularize.tabularize(regex, editor);
        actual = editor.getText();
        return expect(actual).toEqual(expected);
      });
      it("deals with partial reverse selections correctly", function() {
        var actual, expected, regex, text;
        text = "    @on 'core:confirm', => @confirm()";
        text += "\n";
        text += "    @on 'core:cancel', => @detach()";
        expected = "    @on 'core:confirm', => @confirm()";
        expected += "\n";
        expected += "    @on 'core:cancel',  => @detach()";
        regex = "=>";
        editor.setText(text);
        editor.moveToBottom();
        editor.moveToEndOfLine();
        editor.selectToBufferPosition([0, 4]);
        Tabularize.tabularize(regex, editor);
        actual = editor.getText();
        return expect(actual).toEqual(expected);
      });
      return it("does not explode with that stupid error", function() {
        var actual, text;
        text = "{\n";
        text += "  \"foo\" : 1,\n";
        text += "  \"large_row\" : 2,\n";
        text += "  \"small\" : 3,\n";
        text += "}\n";
        editor.setText(text);
        editor.moveToTop();
        editor.selectToBufferPosition([4, 15]);
        actual = editor.getText();
        console.log(actual);
        return Tabularize.tabularize(":", editor);
      });
    });
    return describe(".stripTrailingWhitespace", function() {
      return it("removes only trailing whitespace from string", function() {
        return expect(Tabularize.stripTrailingWhitespace("      object    ")).toEqual("      object");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3RhYnVsYXJpemUvc3BlYy90YWJ1bGFyaXplLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBCQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxtQkFBUixDQUFiLENBQUE7O0FBQUEsRUFDQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSx3QkFBUixDQURqQixDQUFBOztBQUFBLEVBUUEsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO0FBQ3JCLFFBQUEsb0NBQUE7QUFBQSxJQUFBLE9BQW1DLEVBQW5DLEVBQUMsZ0JBQUQsRUFBUyxvQkFBVCxFQUFxQixvQkFBckIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUVULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBQSxFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFFBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQUFULENBQUE7QUFBQSxRQUNBLFVBQUEsR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsQ0FEYixDQUFBO2VBRUEsVUFBQSxHQUFhLGNBQWMsQ0FBQyxRQUFmLENBQUEsRUFIVjtNQUFBLENBQUwsRUFMUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFZQSxRQUFBLENBQVMsYUFBVCxFQUF3QixTQUFBLEdBQUE7QUFFdEIsTUFBQSxFQUFBLENBQUcsRUFBSCxFQUFPLFNBQUEsR0FBQTtBQUNMLFlBQUEsNkJBQUE7QUFBQSxRQUFBLEtBQUEsR0FBUSxRQUFSLENBQUE7QUFBQSxR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

//# sourceURL=/Users/broberto/.atom/packages/tabularize/spec/tabularize-spec.coffee
