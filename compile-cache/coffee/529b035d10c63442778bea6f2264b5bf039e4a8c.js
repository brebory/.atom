(function() {
  describe('Bottom Container', function() {
    var BottomContainer, bottomContainer, trigger;
    BottomContainer = require('../../lib/ui/bottom-container');
    bottomContainer = null;
    trigger = require('../common').trigger;
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('linter').then(function() {
          if (bottomContainer != null) {
            bottomContainer.dispose();
          }
          return bottomContainer = BottomContainer.create('File');
        });
      });
    });
    describe('::getTab', function() {
      return it('returns HTMLElements of tabs', function() {
        expect(bottomContainer.getTab('File') instanceof HTMLElement).toBe(true);
        expect(bottomContainer.getTab('Line') instanceof HTMLElement).toBe(true);
        expect(bottomContainer.getTab('Project') instanceof HTMLElement).toBe(true);
        return expect(bottomContainer.getTab('a') instanceof HTMLElement).toBe(false);
      });
    });
    describe('::setCount', function() {
      return it('updates count on underlying HTMLElements', function() {
        bottomContainer.setCount({
          Project: 1,
          File: 2,
          Line: 3
        });
        bottomContainer.iconScope = 'File';
        expect(bottomContainer.getTab('Project').count).toBe(1);
        expect(bottomContainer.getTab('File').count).toBe(2);
        return expect(bottomContainer.getTab('Line').count).toBe(3);
      });
    });
    describe('::{set, get}ActiveTab', function() {
      return it('works', function() {
        expect(bottomContainer.getTab('File').active).toBe(true);
        expect(bottomContainer.getTab('Line').active).toBe(false);
        expect(bottomContainer.getTab('Project').active).toBe(false);
        expect(bottomContainer.activeTab).toBe('File');
        bottomContainer.activeTab = 'Line';
        expect(bottomContainer.getTab('File').active).toBe(false);
        expect(bottomContainer.getTab('Line').active).toBe(true);
        expect(bottomContainer.getTab('Project').active).toBe(false);
        expect(bottomContainer.activeTab).toBe('Line');
        bottomContainer.activeTab = 'Project';
        expect(bottomContainer.getTab('File').active).toBe(false);
        expect(bottomContainer.getTab('Line').active).toBe(false);
        expect(bottomContainer.getTab('Project').active).toBe(true);
        expect(bottomContainer.activeTab).toBe('Project');
        bottomContainer.activeTab = 'File';
        expect(bottomContainer.activeTab).toBe('File');
        expect(bottomContainer.getTab('File').active).toBe(true);
        expect(bottomContainer.getTab('Line').active).toBe(false);
        return expect(bottomContainer.getTab('Project').active).toBe(false);
      });
    });
    describe('::{get, set}Visibility', function() {
      return it('manages element visibility', function() {
        bottomContainer.visibility = false;
        expect(bottomContainer.visibility).toBe(false);
        expect(bottomContainer.hasAttribute('hidden')).toBe(true);
        bottomContainer.visibility = true;
        expect(bottomContainer.visibility).toBe(true);
        return expect(bottomContainer.hasAttribute('hidden')).toBe(false);
      });
    });
    describe('::onDidChangeTab', function() {
      return it('is triggered when tab is changed', function() {
        var listener;
        listener = jasmine.createSpy('onDidChangeTab');
        bottomContainer.onDidChangeTab(listener);
        trigger(bottomContainer.getTab('File'), 'click');
        expect(listener).not.toHaveBeenCalled();
        trigger(bottomContainer.getTab('Project'), 'click');
        expect(listener).toHaveBeenCalledWith('Project');
        trigger(bottomContainer.getTab('File'), 'click');
        expect(listener).toHaveBeenCalledWith('File');
        trigger(bottomContainer.getTab('Line'), 'click');
        return expect(listener).toHaveBeenCalledWith('Line');
      });
    });
    describe('::onShouldTogglePanel', function() {
      return it('is triggered when active tab is clicked', function() {
        var listener;
        listener = jasmine.createSpy('onShouldTogglePanel');
        bottomContainer.onShouldTogglePanel(listener);
        trigger(bottomContainer.getTab('Project'), 'click');
        expect(listener).not.toHaveBeenCalled();
        trigger(bottomContainer.getTab('Project'), 'click');
        return expect(listener).toHaveBeenCalled();
      });
    });
    describe('::visibility', function() {
      return it('depends on displayLinterInfo', function() {
        atom.config.set('linter.displayLinterInfo', true);
        bottomContainer.visibility = true;
        expect(bottomContainer.visibility).toBe(true);
        atom.config.set('linter.displayLinterInfo', false);
        expect(bottomContainer.visibility).toBe(false);
        bottomContainer.visibility = true;
        expect(bottomContainer.visibility).toBe(false);
        atom.config.set('linter.displayLinterInfo', true);
        bottomContainer.visibility = true;
        expect(bottomContainer.visibility).toBe(true);
        bottomContainer.visibility = false;
        return expect(bottomContainer.visibility).toBe(false);
      });
    });
    return describe('.status::visibility', function() {
      return it('depends on displayLinterStatus', function() {
        atom.config.set('linter.displayLinterStatus', true);
        expect(bottomContainer.status.visibility).toBe(true);
        atom.config.set('linter.displayLinterStatus', false);
        expect(bottomContainer.status.visibility).toBe(false);
        atom.config.set('linter.displayLinterStatus', true);
        return expect(bottomContainer.status.visibility).toBe(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2xpbnRlci9zcGVjL3VpL2JvdHRvbS1jb250YWluZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLGtCQUFULEVBQTZCLFNBQUEsR0FBQTtBQUMzQixRQUFBLHlDQUFBO0FBQUEsSUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSwrQkFBUixDQUFsQixDQUFBO0FBQUEsSUFDQSxlQUFBLEdBQWtCLElBRGxCLENBQUE7QUFBQSxJQUdDLFVBQVcsT0FBQSxDQUFRLFdBQVIsRUFBWCxPQUhELENBQUE7QUFBQSxJQUtBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7YUFDVCxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixRQUE5QixDQUF1QyxDQUFDLElBQXhDLENBQTZDLFNBQUEsR0FBQTs7WUFDM0MsZUFBZSxDQUFFLE9BQWpCLENBQUE7V0FBQTtpQkFDQSxlQUFBLEdBQWtCLGVBQWUsQ0FBQyxNQUFoQixDQUF1QixNQUF2QixFQUZ5QjtRQUFBLENBQTdDLEVBRGM7TUFBQSxDQUFoQixFQURTO0lBQUEsQ0FBWCxDQUxBLENBQUE7QUFBQSxJQVdBLFFBQUEsQ0FBUyxVQUFULEVBQXFCLFNBQUEsR0FBQTthQUNuQixFQUFBLENBQUcsOEJBQUgsRUFBbUMsU0FBQSxHQUFBO0FBQ2pDLFFBQUEsTUFBQSxDQUFPLGVBQWUsQ0FBQyxNQUFoQixDQUF1QixNQUF2QixDQUFBLFlBQTBDLFdBQWpELENBQTZELENBQUMsSUFBOUQsQ0FBbUUsSUFBbkUsQ0FBQSxDQUFBO0FBQUEsUUFDQSxNQUFBLENBQU8sZUFBZSxDQUFDLE1BQWhCLENBQXVCLE1BQXZCLENBQUEsWUFBMEMsV0FBakQsQ0FBNkQsQ0FBQyxJ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

//# sourceURL=/Users/broberto/.atom/packages/linter/spec/ui/bottom-container-spec.coffee
