(function() {
  atom.packages.onDidActivatePackage(function(pack) {
    var Ex, workspaceView;
    if (pack.name === 'ex-mode') {
      Ex = pack.mainModule.provideEx();
      workspaceView = atom.views.getView(atom.workspace);
      return Ex.registerCommand('p', function() {
        return atom.commands.dispatch(workspaceView, 'command-palette:toggle');
      });
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL2luaXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBYUE7QUFBQSxFQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQWQsQ0FBbUMsU0FBQyxJQUFELEdBQUE7QUFDakMsUUFBQSxpQkFBQTtBQUFBLElBQUEsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLFNBQWhCO0FBQ0UsTUFBQSxFQUFBLEdBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFoQixDQUFBLENBQUwsQ0FBQTtBQUFBLE1BQ0EsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBRGhCLENBQUE7YUFFQSxFQUFFLENBQUMsZUFBSCxDQUFtQixHQUFuQixFQUF3QixTQUFBLEdBQUE7ZUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0Msd0JBQXRDLEVBQUg7TUFBQSxDQUF4QixFQUhGO0tBRGlDO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/init.coffee
