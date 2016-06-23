(function() {
  var Path;

  Path = require('path');

  describe('auto-detect-indentation', function() {
    var activationPromise, editor, workspace, _ref;
    _ref = [], editor = _ref[0], workspace = _ref[1], activationPromise = _ref[2];
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage("auto-detect-indentation");
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage("language-c");
      });
      return waitsForPromise(function() {
        return atom.packages.activatePackage("language-sass");
      });
    });
    describe('when a file is opened with 4 spaces', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 2);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/4-spaces.rb'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report 4 spaces", function() {
        return expect(editor.getTabLength()).toBe(4);
      });
      return it("will report soft tabs", function() {
        return expect(editor.getSoftTabs()).toBe(true);
      });
    });
    describe('when a file is opened with 2 spaces', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 4);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/2-spaces.py'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report 2 spaces", function() {
        return expect(editor.getTabLength()).toBe(2);
      });
      return it("will report soft tabs", function() {
        return expect(editor.getSoftTabs()).toBe(true);
      });
    });
    describe('when a file is opened with 4 spaces but first spacing is longer', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 2);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/lined-up-params.py'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report 4 spaces", function() {
        return expect(editor.getTabLength()).toBe(4);
      });
      return it("will report soft tabs", function() {
        return expect(editor.getSoftTabs()).toBe(true);
      });
    });
    describe('when a file is opened with tabs', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 4);
        atom.config.set("editor.softTabs", true);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/tabs.rb'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report hard tabs", function() {
        return expect(editor.getSoftTabs()).toBe(false);
      });
      return it("will report tab length of 4", function() {
        return expect(editor.getTabLength()).toBe(4);
      });
    });
    describe('when a file is opened with mostly tabs but has one line with spaces', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 2);
        atom.config.set("editor.softTabs", true);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/mostly-tabs.rb'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report hard tabs", function() {
        return expect(editor.getSoftTabs()).toBe(false);
      });
      return it("will report tab length of 2", function() {
        return expect(editor.getTabLength()).toBe(2);
      });
    });
    describe('when a file is opened with mostly spaces but a couple lines have tabs', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 2);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/mostly-spaces.rb'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report 6 spaces", function() {
        return expect(editor.getTabLength()).toBe(6);
      });
      return it("will report soft tabs", function() {
        return expect(editor.getSoftTabs()).toBe(true);
      });
    });
    describe('when a file is opened with c style block comments', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 4);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/c-style-block-comments.c'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report 2 spaces", function() {
        return expect(editor.getTabLength()).toBe(2);
      });
      return it("will report soft tabs", function() {
        return expect(editor.getSoftTabs()).toBe(true);
      });
    });
    describe('when a file is opened with c style block comments near the end or line 100', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 4);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/c-style-block-comments-at-end.c'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will report 2 spaces", function() {
        return expect(editor.getTabLength()).toBe(2);
      });
      return it("will report soft tabs", function() {
        return expect(editor.getSoftTabs()).toBe(true);
      });
    });
    return describe('when a file is opened only comments', function() {
      beforeEach(function() {
        atom.config.set("editor.tabLength", 4);
        atom.config.set("editor.softTabs", false);
        waitsForPromise(function() {
          return atom.workspace.open(Path.join(__dirname, './fixtures/only-comments.scss'));
        });
        return runs(function() {
          return editor = atom.workspace.getActiveTextEditor();
        });
      });
      it("will pass this test because it didn't infinite loop", function() {
        return expect(true).toBe(true);
      });
      it("will report 4 spaces", function() {
        return expect(editor.getTabLength()).toBe(4);
      });
      return it("will report tabs", function() {
        return expect(editor.getSoftTabs()).toBe(false);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F1dG8tZGV0ZWN0LWluZGVudGF0aW9uL3NwZWMvYXV0by1kZXRlY3QtaW5kZW50YXRpb24tc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsSUFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMseUJBQVQsRUFBb0MsU0FBQSxHQUFBO0FBQ2xDLFFBQUEsMENBQUE7QUFBQSxJQUFBLE9BQXlDLEVBQXpDLEVBQUMsZ0JBQUQsRUFBUyxtQkFBVCxFQUFvQiwyQkFBcEIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUVULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIseUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7QUFBQSxNQUlBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFlBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUpBLENBQUE7YUFPQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixlQUE5QixFQURjO01BQUEsQ0FBaEIsRUFUUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFjQSxRQUFBLENBQVMscUNBQVQsRUFBZ0QsU0FBQSxHQUFBO0FBRTlDLE1BQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFFBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGtCQUFoQixFQUFvQyxDQUFwQyxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxNQUFNLENB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

//# sourceURL=/Users/broberto/.atom/packages/auto-detect-indentation/spec/auto-detect-indentation-spec.coffee
