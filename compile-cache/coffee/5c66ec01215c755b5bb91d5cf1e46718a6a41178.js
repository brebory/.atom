(function() {
  var dispatchCommand, openCommandPalette;

  dispatchCommand = function(command) {
    var workspaceView;
    workspaceView = atom.views.getView(atom.workspace);
    return atom.commands.dispatch(workspaceView, command);
  };

  openCommandPalette = function() {
    return dispatchCommand('command-palette:toggle');
  };

  atom.packages.onDidActivatePackage(function(pack) {
    var Ex;
    if (pack.name === 'ex-mode') {
      Ex = pack.mainModule.provideEx();
      return Ex.registerCommand('p', function() {
        return process.nextTick(openCommandPalette);
      });
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL2luaXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBY0E7QUFBQSxNQUFBLG1DQUFBOztBQUFBLEVBQUEsZUFBQSxHQUFrQixTQUFDLE9BQUQsR0FBQTtBQUNkLFFBQUEsYUFBQTtBQUFBLElBQUEsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQWhCLENBQUE7V0FDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0MsT0FBdEMsRUFGYztFQUFBLENBQWxCLENBQUE7O0FBQUEsRUFJQSxrQkFBQSxHQUFxQixTQUFBLEdBQUE7V0FDakIsZUFBQSxDQUFnQix3QkFBaEIsRUFEaUI7RUFBQSxDQUpyQixDQUFBOztBQUFBLEVBT0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBZCxDQUFtQyxTQUFDLElBQUQsR0FBQTtBQUNqQyxRQUFBLEVBQUE7QUFBQSxJQUFBLElBQUcsSUFBSSxDQUFDLElBQUwsS0FBYSxTQUFoQjtBQUNFLE1BQUEsRUFBQSxHQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBaEIsQ0FBQSxDQUFMLENBQUE7YUFDQSxFQUFFLENBQUMsZUFBSCxDQUFtQixHQUFuQixFQUF3QixTQUFBLEdBQUE7ZUFDcEIsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsa0JBQWpCLEVBRG9CO01BQUEsQ0FBeEIsRUFGRjtLQURpQztFQUFBLENBQW5DLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/init.coffee
