(function() {
  var dispatchCommand, openCommandPalette, toggleMarkdownPreview;

  dispatchCommand = function(command) {
    var workspaceView;
    workspaceView = atom.views.getView(atom.workspace);
    return atom.commands.dispatch(workspaceView, command);
  };

  openCommandPalette = function() {
    return dispatchCommand('command-palette:toggle');
  };

  toggleMarkdownPreview = function() {
    return dispatchCommand('markdown-preview:toggle');
  };

  atom.packages.onDidActivatePackage(function(pack) {
    var Ex;
    if (pack.name === 'ex-mode') {
      Ex = pack.mainModule.provideEx();
      Ex.registerCommand('p', function() {
        return process.nextTick(openCommandPalette);
      });
      return Ex.registerCommand('md', function() {
        return process.nextTick(toggleMarkdownPreview);
      });
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL2luaXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBY0E7QUFBQSxNQUFBLDBEQUFBOztBQUFBLEVBQUEsZUFBQSxHQUFrQixTQUFDLE9BQUQsR0FBQTtBQUNkLFFBQUEsYUFBQTtBQUFBLElBQUEsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQWhCLENBQUE7V0FDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0MsT0FBdEMsRUFGYztFQUFBLENBQWxCLENBQUE7O0FBQUEsRUFJQSxrQkFBQSxHQUFxQixTQUFBLEdBQUE7V0FDakIsZUFBQSxDQUFnQix3QkFBaEIsRUFEaUI7RUFBQSxDQUpyQixDQUFBOztBQUFBLEVBT0EscUJBQUEsR0FBd0IsU0FBQSxHQUFBO1dBQ3BCLGVBQUEsQ0FBZ0IseUJBQWhCLEVBRG9CO0VBQUEsQ0FQeEIsQ0FBQTs7QUFBQSxFQVVBLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQWQsQ0FBbUMsU0FBQyxJQUFELEdBQUE7QUFDakMsUUFBQSxFQUFBO0FBQUEsSUFBQSxJQUFHLElBQUksQ0FBQyxJQUFMLEtBQWEsU0FBaEI7QUFDRSxNQUFBLEVBQUEsR0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQWhCLENBQUEsQ0FBTCxDQUFBO0FBQUEsTUFDQSxFQUFFLENBQUMsZUFBSCxDQUFtQixHQUFuQixFQUF3QixTQUFBLEdBQUE7ZUFDcEIsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsa0JBQWpCLEVBRG9CO01BQUEsQ0FBeEIsQ0FEQSxDQUFBO2FBR0EsRUFBRSxDQUFDLGVBQUgsQ0FBbUIsSUFBbkIsRUFBeUIsU0FBQSxHQUFBO2VBQ3JCLE9BQU8sQ0FBQyxRQUFSLENBQWlCLHFCQUFqQixFQURxQjtNQUFBLENBQXpCLEVBSkY7S0FEaUM7RUFBQSxDQUFuQyxDQVZBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/init.coffee
