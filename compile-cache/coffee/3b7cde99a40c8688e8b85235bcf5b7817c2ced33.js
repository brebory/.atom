(function() {
  var openCommandPalette;

  openCommandPalette = function() {
    var workspaceView;
    workspaceView = atom.views.getView(atom.workspace);
    return atom.commands.dispatch(workspaceView, 'command-palette:toggle');
  };

  atom.packages.onDidActivatePackage(function(pack) {
    var Ex;
    if (pack.name === 'ex-mode') {
      Ex = pack.mainModule.provideEx();
      return Ex.registerCommand('p', function() {
        return setTimeout(openCommandPalette, 10);
      });
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL2luaXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBY0E7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsa0JBQUEsR0FBcUIsU0FBQSxHQUFBO0FBQ2pCLFFBQUEsYUFBQTtBQUFBLElBQUEsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQWhCLENBQUE7V0FDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0Msd0JBQXRDLEVBRmlCO0VBQUEsQ0FBckIsQ0FBQTs7QUFBQSxFQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQWQsQ0FBbUMsU0FBQyxJQUFELEdBQUE7QUFDakMsUUFBQSxFQUFBO0FBQUEsSUFBQSxJQUFHLElBQUksQ0FBQyxJQUFMLEtBQWEsU0FBaEI7QUFDRSxNQUFBLEVBQUEsR0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQWhCLENBQUEsQ0FBTCxDQUFBO2FBQ0EsRUFBRSxDQUFDLGVBQUgsQ0FBbUIsR0FBbkIsRUFBd0IsU0FBQSxHQUFBO2VBQ3BCLFVBQUEsQ0FBVyxrQkFBWCxFQUErQixFQUEvQixFQURvQjtNQUFBLENBQXhCLEVBRkY7S0FEaUM7RUFBQSxDQUFuQyxDQUpBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/init.coffee
