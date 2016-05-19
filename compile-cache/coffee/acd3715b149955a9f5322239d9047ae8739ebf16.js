(function() {
  var RubyNavigator;

  RubyNavigator = require('../lib/ruby-navigator');

  describe("RubyNavigator", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('ruby-navigator');
    });
    return describe("when the ruby-navigator:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.ruby-navigator')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ruby-navigator:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var rubyNavigatorElement, rubyNavigatorPanel;
          expect(workspaceElement.querySelector('.ruby-navigator')).toExist();
          rubyNavigatorElement = workspaceElement.querySelector('.ruby-navigator');
          expect(rubyNavigatorElement).toExist();
          rubyNavigatorPanel = atom.workspace.panelForItem(rubyNavigatorElement);
          expect(rubyNavigatorPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'ruby-navigator:toggle');
          return expect(rubyNavigatorPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.ruby-navigator')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ruby-navigator:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var rubyNavigatorElement;
          rubyNavigatorElement = workspaceElement.querySelector('.ruby-navigator');
          expect(rubyNavigatorElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'ruby-navigator:toggle');
          return expect(rubyNavigatorElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1YnktbmF2aWdhdG9yL3NwZWMvcnVieS1uYXZpZ2F0b3Itc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsYUFBQTs7QUFBQSxFQUFBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLHVCQUFSLENBQWhCLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7QUFDeEIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGdCQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsbURBQVQsRUFBOEQsU0FBQSxHQUFBO0FBQzVELE1BQUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUdwQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixpQkFBL0IsQ0FBUCxDQUF5RCxDQUFDLEdBQUcsQ0FBQyxPQUE5RCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx1QkFBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLHdDQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsaUJBQS9CLENBQVAsQ0FBeUQsQ0FBQyxPQUExRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsb0JBQUEsR0FBdUIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsaUJBQS9CLENBRnZCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTyxvQkFBUCxDQUE0QixDQUFDLE9BQTdCLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSxrQkFBQSxHQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsb0JBQTVCLENBTHJCLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyxrQkFBa0IsQ0FBQyxTQUFuQixDQUFBLENBQVAsQ0FBc0MsQ0FBQyxJQUF2QyxDQUE0QyxJQUE1QyxDQU5BLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsdUJBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8sa0JBQWtCLENBQUMsU0FBbkIsQ0FBQSxDQUFQLENBQXNDLENBQUMsSUFBdkMsQ0FBNEMsS0FBNUMsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixpQkFBL0IsQ0FBUCxDQUF5RCxDQUFDLEdBQUcsQ0FBQyxPQUE5RCxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBTUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx1QkFBekMsQ0FOQSxDQUFBO0FBQUEsUUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBUkEsQ0FBQTtlQVdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxjQUFBLG9CQUFBO0FBQUEsVUFBQSxvQkFBQSxHQUF1QixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixpQkFBL0IsQ0FBdkIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLG9CQUFQLENBQTRCLENBQUMsV0FBN0IsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsdUJBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sb0JBQVAsQ0FBNEIsQ0FBQyxHQUFHLENBQUMsV0FBakMsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCNEQ7SUFBQSxDQUE5RCxFQVB3QjtFQUFBLENBQTFCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/ruby-navigator/spec/ruby-navigator-spec.coffee
