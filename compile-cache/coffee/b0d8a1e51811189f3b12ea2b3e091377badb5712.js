(function() {
  var CompositeDisposable, RubyNavigator, RubyNavigatorView;

  RubyNavigatorView = require('./ruby-navigator-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = RubyNavigator = {
    rubyNavigatorView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      this.rubyNavigatorView = new RubyNavigatorView(state.rubyNavigatorViewState);
      this.modalPanel = atom.workspace.addRightPanel({
        item: this.rubyNavigatorView.getElement(),
        visible: false
      });
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'ruby-navigator:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
    },
    deactivate: function() {
      this.modalPanel.destroy();
      this.subscriptions.dispose();
      return this.rubyNavigatorView.destroy();
    },
    serialize: function() {
      return {
        rubyNavigatorViewState: this.rubyNavigatorView.serialize()
      };
    },
    toggle: function() {
      console.log('RubyNavigator was toggled!');
      if (this.modalPanel.isVisible()) {
        return this.modalPanel.hide();
      } else {
        this.rubyNavigatorView.load_data();
        return this.modalPanel.show();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1YnktbmF2aWdhdG9yL2xpYi9ydWJ5LW5hdmlnYXRvci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscURBQUE7O0FBQUEsRUFBQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsdUJBQVIsQ0FBcEIsQ0FBQTs7QUFBQSxFQUNDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFERCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsYUFBQSxHQUNmO0FBQUEsSUFBQSxpQkFBQSxFQUFtQixJQUFuQjtBQUFBLElBQ0EsVUFBQSxFQUFZLElBRFo7QUFBQSxJQUVBLGFBQUEsRUFBZSxJQUZmO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxpQkFBRCxHQUF5QixJQUFBLGlCQUFBLENBQWtCLEtBQUssQ0FBQyxzQkFBeEIsQ0FBekIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsaUJBQWlCLENBQUMsVUFBbkIsQ0FBQSxDQUFOO0FBQUEsUUFBdUMsT0FBQSxFQUFTLEtBQWhEO09BQTdCLENBRGQsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUpqQixDQUFBO2FBT0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7QUFBQSxRQUFBLHVCQUFBLEVBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpCO09BQXBDLENBQW5CLEVBUlE7SUFBQSxDQUpWO0FBQUEsSUFjQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxPQUFuQixDQUFBLEVBSFU7SUFBQSxDQWRaO0FBQUEsSUFtQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxzQkFBQSxFQUF3QixJQUFDLENBQUEsaUJBQWlCLENBQUMsU0FBbkIsQ0FBQSxDQUF4QjtRQURTO0lBQUEsQ0FuQlg7QUFBQSxJQXNCQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDRCQUFaLENBQUEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLFNBQVosQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQUEsRUFERjtPQUFBLE1BQUE7QUFHRSxRQUFBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxTQUFuQixDQUFBLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFBLEVBSkY7T0FITTtJQUFBLENBdEJSO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/ruby-navigator/lib/ruby-navigator.coffee
