(function() {
  var InsertLinkView;

  InsertLinkView = require("../../lib/views/insert-link-view");

  describe("InsertLinkView", function() {
    var editor, insertLinkView, _ref;
    _ref = [], editor = _ref[0], insertLinkView = _ref[1];
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.workspace.open("empty.markdown");
      });
      return runs(function() {
        insertLinkView = new InsertLinkView({});
        return editor = atom.workspace.getActiveTextEditor();
      });
    });
    describe(".insertLink", function() {
      it("insert inline link", function() {
        var link;
        insertLinkView.editor = {
          setTextInBufferRange: function() {
            return {};
          }
        };
        spyOn(insertLinkView.editor, "setTextInBufferRange");
        link = {
          text: "text",
          url: "http://"
        };
        insertLinkView.insertLink(link);
        return expect(insertLinkView.editor.setTextInBufferRange).toHaveBeenCalledWith(void 0, "[text](http://)");
      });
      it("insert reference link", function() {
        var link;
        spyOn(insertLinkView, "insertReferenceLink");
        link = {
          text: "text",
          title: "this is title",
          url: "http://"
        };
        insertLinkView.insertLink(link);
        return expect(insertLinkView.insertReferenceLink).toHaveBeenCalledWith(link);
      });
      return it("update reference link", function() {
        var link;
        insertLinkView.definitionRange = {};
        spyOn(insertLinkView, "updateReferenceLink");
        link = {
          text: "text",
          title: "this is title",
          url: "http://"
        };
        insertLinkView.insertLink(link);
        return expect(insertLinkView.updateReferenceLink).toHaveBeenCalledWith(link);
      });
    });
    describe(".updateReferenceLink", function() {
      beforeEach(function() {
        return atom.config.set("markdown-writer.referenceIndentLength", 2);
      });
      return it("insert reference and definition", function() {
        var link;
        insertLinkView.referenceId = "ABC123";
        insertLinkView.range = "Range";
        insertLinkView.definitionRange = "DRange";
        insertLinkView.editor = {
          setTextInBufferRange: function() {
            return {};
          }
        };
        spyOn(insertLinkView.editor, "setTextInBufferRange");
        link = {
          text: "text",
          title: "this is title",
          url: "http://"
        };
        insertLinkView.updateReferenceLink(link);
        expect(insertLinkView.editor.setTextInBufferRange.calls[0].args).toEqual(["Range", "[text][ABC123]"]);
        return expect(insertLinkView.editor.setTextInBufferRange.calls[1].args).toEqual(["DRange", '  [ABC123]: http:// "this is title"']);
      });
    });
    describe(".setLink", function() {
      return it("sets all the editors", function() {
        var link;
        link = {
          text: "text",
          title: "this is title",
          url: "http://"
        };
        insertLinkView.setLink(link);
        expect(insertLinkView.textEditor.getText()).toBe(link.text);
        expect(insertLinkView.titleEditor.getText()).toBe(link.title);
        return expect(insertLinkView.urlEditor.getText()).toBe(link.url);
      });
    });
    describe(".getSavedLink", function() {
      beforeEach(function() {
        return insertLinkView.links = {
          "oldstyle": {
            "title": "this is title",
            "url": "http://"
          },
          "newstyle": {
            "text": "NewStyle",
            "title": "this is title",
            "url": "http://"
          }
        };
      });
      it("return undefined if text does not exists", function() {
        return expect(insertLinkView.getSavedLink("notExists")).toEqual(void 0);
      });
      return it("return the link with text, title, url", function() {
        expect(insertLinkView.getSavedLink("oldStyle")).toEqual({
          "text": "oldStyle",
          "title": "this is title",
          "url": "http://"
        });
        return expect(insertLinkView.getSavedLink("newStyle")).toEqual({
          "text": "NewStyle",
          "title": "this is title",
          "url": "http://"
        });
      });
    });
    describe(".isInSavedLink", function() {
      beforeEach(function() {
        return insertLinkView.links = {
          "oldstyle": {
            "title": "this is title",
            "url": "http://"
          },
          "newstyle": {
            "text": "NewStyle",
            "title": "this is title",
            "url": "http://"
          }
        };
      });
      it("return false if the text does not exists", function() {
        return expect(insertLinkView.isInSavedLink({
          text: "notExists"
        })).toBe(false);
      });
      it("return false if the url does not match", function() {
        var link;
        link = {
          text: "oldStyle",
          title: "this is title",
          url: "anything"
        };
        return expect(insertLinkView.isInSavedLink(link)).toBe(false);
      });
      return it("return true", function() {
        var link;
        link = {
          text: "NewStyle",
          title: "this is title",
          url: "http://"
        };
        return expect(insertLinkView.isInSavedLink(link)).toBe(true);
      });
    });
    describe(".updateToLinks", function() {
      beforeEach(function() {
        return insertLinkView.links = {
          "oldstyle": {
            "title": "this is title",
            "url": "http://"
          },
          "newstyle": {
            "text": "NewStyle",
            "title": "this is title",
            "url": "http://"
          }
        };
      });
      it("saves the new link if it does not exists before and checkbox checked", function() {
        var link;
        insertLinkView.saveCheckbox.prop("checked", true);
        link = {
          text: "New Link",
          title: "this is title",
          url: "http://new.link"
        };
        expect(insertLinkView.updateToLinks(link)).toBe(true);
        return expect(insertLinkView.links["new link"]).toEqual(link);
      });
      it("does not save the new link if checkbox is unchecked", function() {
        var link;
        insertLinkView.saveCheckbox.prop("checked", false);
        link = {
          text: "New Link",
          title: "this is title",
          url: "http://new.link"
        };
        return expect(insertLinkView.updateToLinks(link)).toBe(false);
      });
      it("saves the link if it is modified and checkbox checked", function() {
        var link;
        insertLinkView.saveCheckbox.prop("checked", true);
        link = {
          text: "NewStyle",
          title: "this is new title",
          url: "http://"
        };
        expect(insertLinkView.updateToLinks(link)).toBe(true);
        return expect(insertLinkView.links["newstyle"]).toEqual(link);
      });
      it("does not saves the link if it is not modified and checkbox checked", function() {
        var link;
        insertLinkView.saveCheckbox.prop("checked", true);
        link = {
          text: "NewStyle",
          title: "this is title",
          url: "http://"
        };
        return expect(insertLinkView.updateToLinks(link)).toBe(false);
      });
      return it("removes the existed link if checkbox is unchecked", function() {
        var link;
        insertLinkView.saveCheckbox.prop("checked", false);
        link = {
          text: "NewStyle",
          title: "this is title",
          url: "http://"
        };
        expect(insertLinkView.updateToLinks(link)).toBe(true);
        return expect(insertLinkView.links["newstyle"]).toBe(void 0);
      });
    });
    return describe("integration", function() {
      beforeEach(function() {
        atom.config.set("markdown-writer.referenceIndentLength", 2);
        insertLinkView.fetchPosts = function() {
          return {};
        };
        return insertLinkView.loadSavedLinks = function(cb) {
          return cb();
        };
      });
      it("insert new link", function() {
        insertLinkView.display();
        insertLinkView.textEditor.setText("text");
        insertLinkView.urlEditor.setText("url");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("[text](url)");
      });
      it("insert new link with text", function() {
        editor.setText("text");
        insertLinkView.display();
        insertLinkView.urlEditor.setText("url");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("[text](url)");
      });
      it("insert new reference link", function() {
        insertLinkView.display();
        insertLinkView.textEditor.setText("text");
        insertLinkView.titleEditor.setText("title");
        insertLinkView.urlEditor.setText("url");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("[text][" + insertLinkView.referenceId + "]\n\n  [" + insertLinkView.referenceId + "]: url \"title\"");
      });
      it("insert new reference link with text", function() {
        editor.setText("text");
        insertLinkView.display();
        insertLinkView.titleEditor.setText("title");
        insertLinkView.urlEditor.setText("url");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("[text][" + insertLinkView.referenceId + "]\n\n  [" + insertLinkView.referenceId + "]: url \"title\"");
      });
      it("update inline link", function() {
        editor.setText("[text](url)");
        editor.selectAll();
        insertLinkView.display();
        expect(insertLinkView.textEditor.getText()).toEqual("text");
        expect(insertLinkView.urlEditor.getText()).toEqual("url");
        insertLinkView.textEditor.setText("new text");
        insertLinkView.urlEditor.setText("new url");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("[new text](new url)");
      });
      it("update inline link to reference link", function() {
        editor.setText("[text](url)");
        editor.setCursorBufferPosition([0, 0]);
        editor.selectToEndOfLine();
        insertLinkView.display();
        expect(insertLinkView.textEditor.getText()).toEqual("text");
        expect(insertLinkView.urlEditor.getText()).toEqual("url");
        insertLinkView.textEditor.setText("new text");
        insertLinkView.titleEditor.setText("title");
        insertLinkView.urlEditor.setText("new url");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("[new text][" + insertLinkView.referenceId + "]\n\n  [" + insertLinkView.referenceId + "]: new url \"title\"");
      });
      it("update reference link to inline link", function() {
        editor.setText("[text][ABC123]\n\n[ABC123]: url \"title\"");
        editor.setCursorBufferPosition([0, 0]);
        editor.selectToEndOfLine();
        insertLinkView.display();
        expect(insertLinkView.textEditor.getText()).toEqual("text");
        expect(insertLinkView.titleEditor.getText()).toEqual("title");
        expect(insertLinkView.urlEditor.getText()).toEqual("url");
        insertLinkView.textEditor.setText("new text");
        insertLinkView.titleEditor.setText("");
        insertLinkView.urlEditor.setText("new url");
        insertLinkView.onConfirm();
        return expect(editor.getText().trim()).toBe("[new text](new url)");
      });
      it("remove inline link", function() {
        editor.setText("[text](url)");
        editor.setCursorBufferPosition([0, 0]);
        editor.selectToEndOfLine();
        insertLinkView.display();
        expect(insertLinkView.textEditor.getText()).toEqual("text");
        expect(insertLinkView.urlEditor.getText()).toEqual("url");
        insertLinkView.urlEditor.setText("");
        insertLinkView.onConfirm();
        return expect(editor.getText()).toBe("text");
      });
      return it("remove reference link", function() {
        editor.setText("[text][ABC123]\n\n[ABC123]: url \"title\"");
        editor.setCursorBufferPosition([0, 0]);
        editor.selectToEndOfLine();
        insertLinkView.display();
        expect(insertLinkView.textEditor.getText()).toEqual("text");
        expect(insertLinkView.titleEditor.getText()).toEqual("title");
        expect(insertLinkView.urlEditor.getText()).toEqual("url");
        insertLinkView.urlEditor.setText("");
        insertLinkView.onConfirm();
        return expect(editor.getText().trim()).toBe("text");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL21hcmtkb3duLXdyaXRlci9zcGVjL3ZpZXdzL2luc2VydC1saW5rLXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsY0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGtDQUFSLENBQWpCLENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFFBQUEsNEJBQUE7QUFBQSxJQUFBLE9BQTJCLEVBQTNCLEVBQUMsZ0JBQUQsRUFBUyx3QkFBVCxDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixnQkFBcEIsRUFBSDtNQUFBLENBQWhCLENBQUEsQ0FBQTthQUVBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxRQUFBLGNBQUEsR0FBcUIsSUFBQSxjQUFBLENBQWUsRUFBZixDQUFyQixDQUFBO2VBQ0EsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxFQUZOO01BQUEsQ0FBTCxFQUhTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLFFBQUEsQ0FBUyxhQUFULEVBQXdCLFNBQUEsR0FBQTtBQUN0QixNQUFBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsWUFBQSxJQUFBO0FBQUEsUUFBQSxjQUFjLENBQUMsTUFBZixHQUF3QjtBQUFBLFVBQUUsb0JBQUEsRUFBc0IsU0FBQSxHQUFBO21CQUFHLEdBQUg7VUFBQSxDQUF4QjtTQUF4QixDQUFBO0FBQUEsUUFDQSxLQUFBLENBQU0sY0FBYyxDQUFDLE1BQXJCLEVB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

//# sourceURL=/Users/broberto/.atom/packages/markdown-writer/spec/views/insert-link-view-spec.coffee
