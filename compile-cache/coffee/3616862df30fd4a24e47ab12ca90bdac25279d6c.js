(function() {
  var $panel, $root, App, isInited;

  App = require('./Components/App');

  $root = null;

  $panel = null;

  isInited = false;

  exports.show = function(_debugger) {
    if (!isInited) {
      $root = document.createElement('div');
      App.start($root, _debugger);
    }
    $panel = atom.workspace.addBottomPanel({
      item: $root
    });
    return isInited = true;
  };

  exports.hide = function() {
    if (!$panel) {
      return;
    }
    $panel.destroy();
    return atom.workspace.getActivePane().activate();
  };

  exports.destroy = function() {
    exports.hide();
    App.stop();
    isInited = false;
    if ($root != null) {
      $root.remove();
    }
    return $root = null;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL25vZGUtZGVidWdnZXItdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEJBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLGtCQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUVBLEtBQUEsR0FBUSxJQUZSLENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsSUFIVCxDQUFBOztBQUFBLEVBSUEsUUFBQSxHQUFXLEtBSlgsQ0FBQTs7QUFBQSxFQU1BLE9BQU8sQ0FBQyxJQUFSLEdBQWUsU0FBQyxTQUFELEdBQUE7QUFDYixJQUFBLElBQUcsQ0FBQSxRQUFIO0FBQ0UsTUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBUixDQUFBO0FBQUEsTUFDQSxHQUFHLENBQUMsS0FBSixDQUFVLEtBQVYsRUFBaUIsU0FBakIsQ0FEQSxDQURGO0tBQUE7QUFBQSxJQUlBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEI7QUFBQSxNQUFBLElBQUEsRUFBTSxLQUFOO0tBQTlCLENBSlQsQ0FBQTtXQUtBLFFBQUEsR0FBVyxLQU5FO0VBQUEsQ0FOZixDQUFBOztBQUFBLEVBY0EsT0FBTyxDQUFDLElBQVIsR0FBZSxTQUFBLEdBQUE7QUFDYixJQUFBLElBQUEsQ0FBQSxNQUFBO0FBQUEsWUFBQSxDQUFBO0tBQUE7QUFBQSxJQUNBLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FEQSxDQUFBO1dBRUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUEsQ0FBOEIsQ0FBQyxRQUEvQixDQUFBLEVBSGE7RUFBQSxDQWRmLENBQUE7O0FBQUEsRUFtQkEsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQSxHQUFBO0FBQ2hCLElBQUEsT0FBTyxDQUFDLElBQVIsQ0FBQSxDQUFBLENBQUE7QUFBQSxJQUNBLEdBQUcsQ0FBQyxJQUFKLENBQUEsQ0FEQSxDQUFBO0FBQUEsSUFFQSxRQUFBLEdBQVcsS0FGWCxDQUFBO0FBR0EsSUFBQSxJQUFrQixhQUFsQjtBQUFBLE1BQUEsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFBLENBQUE7S0FIQTtXQUlBLEtBQUEsR0FBUSxLQUxRO0VBQUEsQ0FuQmxCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/node-debugger-view.coffee