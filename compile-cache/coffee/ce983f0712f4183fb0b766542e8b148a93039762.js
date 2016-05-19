(function() {
  var h, hg;

  hg = require('mercury');

  h = hg.h;

  exports.create = function(_debugger) {
    var cancel;
    cancel = function() {
      return _debugger.cleanup();
    };
    return hg.state({
      channels: {
        cancel: cancel
      }
    });
  };

  exports.render = function(state) {
    return h('button.btn.btn-error', {
      'ev-click': hg.send(state.channels.cancel)
    }, ['x']);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvQ2FuY2VsQnV0dG9uLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxLQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNDLElBQUssR0FBTCxDQURELENBQUE7O0FBQUEsRUFHQSxPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLFNBQUQsR0FBQTtBQUVmLFFBQUEsTUFBQTtBQUFBLElBQUEsTUFBQSxHQUFTLFNBQUEsR0FBQTthQUNQLFNBQVMsQ0FBQyxPQUFWLENBQUEsRUFETztJQUFBLENBQVQsQ0FBQTtXQUdBLEVBQUUsQ0FBQyxLQUFILENBQVM7QUFBQSxNQUNQLFFBQUEsRUFBVTtBQUFBLFFBQ1IsTUFBQSxFQUFRLE1BREE7T0FESDtLQUFULEVBTGU7RUFBQSxDQUhqQixDQUFBOztBQUFBLEVBY0EsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFELEdBQUE7V0FDZixDQUFBLENBQUUsc0JBQUYsRUFBMEI7QUFBQSxNQUN4QixVQUFBLEVBQVksRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQXZCLENBRFk7S0FBMUIsRUFFRyxDQUFDLEdBQUQsQ0FGSCxFQURlO0VBQUEsQ0FkakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/CancelButton.coffee
