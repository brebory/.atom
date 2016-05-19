(function() {
  var Promise, TreeView, TreeViewItem, TreeViewUtils, gotoBreakpoint, h, hg, listeners, log, _ref;

  hg = require('mercury');

  Promise = require('bluebird');

  h = hg.h;

  listeners = [];

  log = function(msg) {};

  _ref = require('./TreeView'), TreeView = _ref.TreeView, TreeViewItem = _ref.TreeViewItem, TreeViewUtils = _ref.TreeViewUtils;

  gotoBreakpoint = function(breakpoint) {
    return atom.workspace.open(breakpoint.script, {
      initialLine: breakpoint.line,
      initialColumn: 0,
      activatePane: true,
      searchAllPanes: true
    });
  };

  exports.create = function(_debugger) {
    var BreakpointPanel, builder;
    builder = {
      listBreakpoints: function() {
        log("builder.listBreakpoints");
        return Promise.resolve(_debugger.breakpointManager.breakpoints);
      },
      breakpoint: function(breakpoint) {
        log("builder.breakpoint");
        return TreeViewItem(TreeViewUtils.createFileRefHeader(breakpoint.script, breakpoint.line + 1), {
          handlers: {
            click: function() {
              return gotoBreakpoint(breakpoint);
            }
          }
        });
      },
      root: function() {
        return TreeView("Breakpoints", (function() {
          return builder.listBreakpoints().map(builder.breakpoint);
        }), {
          isRoot: true
        });
      }
    };
    BreakpointPanel = function() {
      var refresh, state;
      state = builder.root();
      refresh = function() {
        return TreeView.populate(state);
      };
      listeners.push(_debugger.onAddBreakpoint(refresh));
      listeners.push(_debugger.onRemoveBreakpoint(refresh));
      listeners.push(_debugger.onBreak(refresh));
      return state;
    };
    BreakpointPanel.render = function(state) {
      return TreeView.render(state);
    };
    BreakpointPanel.cleanup = function() {
      var remove, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = listeners.length; _i < _len; _i++) {
        remove = listeners[_i];
        _results.push(remove());
      }
      return _results;
    };
    return BreakpointPanel;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvQnJlYWtQb2ludFBhbmUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJGQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLE9BQUEsR0FBVSxPQUFBLENBQVEsVUFBUixDQURWLENBQUE7O0FBQUEsRUFFQyxJQUFLLEdBQUwsQ0FGRCxDQUFBOztBQUFBLEVBSUEsU0FBQSxHQUFZLEVBSlosQ0FBQTs7QUFBQSxFQU1BLEdBQUEsR0FBTSxTQUFDLEdBQUQsR0FBQSxDQU5OLENBQUE7O0FBQUEsRUFRQSxPQUEwQyxPQUFBLENBQVEsWUFBUixDQUExQyxFQUFDLGdCQUFBLFFBQUQsRUFBVyxvQkFBQSxZQUFYLEVBQXlCLHFCQUFBLGFBUnpCLENBQUE7O0FBQUEsRUFVQSxjQUFBLEdBQWlCLFNBQUMsVUFBRCxHQUFBO1dBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLFVBQVUsQ0FBQyxNQUEvQixFQUF1QztBQUFBLE1BQ3JDLFdBQUEsRUFBYSxVQUFVLENBQUMsSUFEYTtBQUFBLE1BRXJDLGFBQUEsRUFBZSxDQUZzQjtBQUFBLE1BR3JDLFlBQUEsRUFBYyxJQUh1QjtBQUFBLE1BSXJDLGNBQUEsRUFBZ0IsSUFKcUI7S0FBdkMsRUFEZTtFQUFBLENBVmpCLENBQUE7O0FBQUEsRUFrQkEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxTQUFELEdBQUE7QUFFZixRQUFBLHdCQUFBO0FBQUEsSUFBQSxPQUFBLEdBQ0U7QUFBQSxNQUFBLGVBQUEsRUFBaUIsU0FBQSxHQUFBO0FBQ2YsUUFBQSxHQUFBLENBQUkseUJBQUosQ0FBQSxDQUFBO2VBQ0EsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFdBQTVDLEVBRmU7TUFBQSxDQUFqQjtBQUFBLE1BSUEsVUFBQSxFQUFZLFNBQUMsVUFBRCxHQUFBO0FBQ1YsUUFBQSxHQUFBLENBQUksb0JBQUosQ0FBQSxDQUFBO2VBQ0EsWUFBQSxDQUNFLGFBQWEsQ0FBQyxtQkFBZCxDQUFrQyxVQUFVLENBQUMsTUFBN0MsRUFBcUQsVUFBVSxDQUFDLElBQVgsR0FBZ0IsQ0FBckUsQ0FERixFQUVFO0FBQUEsVUFBQSxRQUFBLEVBQVU7QUFBQSxZQUFFLEtBQUEsRUFBTyxTQUFBLEdBQUE7cUJBQU0sY0FBQSxDQUFlLFVBQWYsRUFBTjtZQUFBLENBQVQ7V0FBVjtTQUZGLEVBRlU7TUFBQSxDQUpaO0FBQUEsTUFVQSxJQUFBLEVBQU0sU0FBQSxHQUFBO2VBQ0osUUFBQSxDQUFTLGFBQVQsRUFBd0IsQ0FBQyxTQUFBLEdBQUE7aUJBQU0sT0FBTyxDQUFDLGVBQVIsQ0FBQSxDQUF5QixDQUFDLEdBQTFCLENBQThCLE9BQU8sQ0FBQyxVQUF0QyxFQUFOO1FBQUEsQ0FBRCxDQUF4QixFQUFtRjtBQUFBLFVBQUEsTUFBQSxFQUFRLElBQVI7U0FBbkYsRUFESTtNQUFBLENBVk47S0FERixDQUFBO0FBQUEsSUFjQSxlQUFBLEdBQWtCLFNBQUEsR0FBQTtBQUNoQixVQUFBLGNBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxPQUFPLENBQUMsSUFBUixDQUFBLENBQVIsQ0FBQTtBQUFBLE1BQ0EsT0FBQSxHQUFVLFNBQUEsR0FBQTtlQUFNLFFBQVEsQ0FBQyxRQUFULENBQWtCLEtBQWxCLEVBQU47TUFBQSxDQURWLENBQUE7QUFBQSxNQUVBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBUyxDQUFDLGVBQVYsQ0FBMEIsT0FBMUIsQ0FBZixDQUZBLENBQUE7QUFBQSxNQUdBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBUyxDQUFDLGtCQUFWLENBQTZCLE9BQTdCLENBQWYsQ0FIQSxDQUFBO0FBQUEsTUFJQSxTQUFTLENBQUMsSUFBVixDQUFlLFNBQVMsQ0FBQyxPQUFWLENBQWtCLE9BQWxCLENBQWYsQ0FKQSxDQUFBO0FBS0EsYUFBTyxLQUFQLENBTmdCO0lBQUEsQ0FkbEIsQ0FBQTtBQUFBLElBc0JBLGVBQWUsQ0FBQyxNQUFoQixHQUF5QixTQUFDLEtBQUQsR0FBQTthQUN2QixRQUFRLENBQUMsTUFBVCxDQUFnQixLQUFoQixFQUR1QjtJQUFBLENBdEJ6QixDQUFBO0FBQUEsSUF5QkEsZUFBZSxDQUFDLE9BQWhCLEdBQTBCLFNBQUEsR0FBQTtBQUN4QixVQUFBLDBCQUFBO0FBQUE7V0FBQSxnREFBQTsrQkFBQTtBQUNFLHNCQUFBLE1BQUEsQ0FBQSxFQUFBLENBREY7QUFBQTtzQkFEd0I7SUFBQSxDQXpCMUIsQ0FBQTtBQTZCQSxXQUFPLGVBQVAsQ0EvQmU7RUFBQSxDQWxCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/BreakPointPane.coffee
