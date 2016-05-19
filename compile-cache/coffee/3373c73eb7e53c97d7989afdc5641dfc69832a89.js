(function() {
  var AutocompleteRuby;

  AutocompleteRuby = require('../lib/autocomplete-ruby');

  describe("AutocompleteRuby", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('autocomplete-ruby');
    });
    return describe("autocomplete-ruby", function() {
      return it("contains spec with an expectation", function() {
        return expect(true).toBe(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F1dG9jb21wbGV0ZS1ydWJ5L3NwZWMvYXV0b2NvbXBsZXRlLXJ1Ynktc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0JBQUE7O0FBQUEsRUFBQSxnQkFBQSxHQUFtQixPQUFBLENBQVEsMEJBQVIsQ0FBbkIsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxrQkFBVCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsbUJBQVQsRUFBOEIsU0FBQSxHQUFBO2FBQzVCLEVBQUEsQ0FBRyxtQ0FBSCxFQUF3QyxTQUFBLEdBQUE7ZUFDdEMsTUFBQSxDQUFPLElBQVAsQ0FBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEIsRUFEc0M7TUFBQSxDQUF4QyxFQUQ0QjtJQUFBLENBQTlCLEVBUDJCO0VBQUEsQ0FBN0IsQ0FGQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/autocomplete-ruby/spec/autocomplete-ruby-spec.coffee
