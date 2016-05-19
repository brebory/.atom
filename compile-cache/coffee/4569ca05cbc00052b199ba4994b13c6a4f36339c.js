(function() {
  var Promise, TreeView, TreeViewItem, TreeViewUtils, h, hg, log;

  hg = require('mercury');

  h = hg.h;

  Promise = require('bluebird');

  log = function(msg) {};

  TreeView = function(title, loadChildren, _arg) {
    var handlers, isRoot, _ref;
    _ref = _arg != null ? _arg : {}, handlers = _ref.handlers, isRoot = _ref.isRoot;
    log("TreeView constructor. title=" + title + ", isRoot=" + isRoot);
    return hg.state({
      isRoot: hg.value(isRoot),
      title: hg.value(title),
      items: hg.array([]),
      isOpen: hg.value(false),
      loading: hg.value(false),
      loaded: hg.value(false),
      channels: {
        click: function(state) {
          log("TreeView event handler for click invoked");
          TreeView.toggle(state);
          return handlers != null ? typeof handlers.click === "function" ? handlers.click(state) : void 0 : void 0;
        },
        dblclick: function(state) {
          log("TreeView event handler for dblclick invoked");
          return handlers != null ? typeof handlers.dblclick === "function" ? handlers.dblclick(state) : void 0 : void 0;
        },
        customEvent: function(state) {
          log("TreeView event handler for customEvent invoked");
          return handlers != null ? typeof handlers.customEvent === "function" ? handlers.customEvent(state) : void 0 : void 0;
        }
      },
      functors: {
        render: TreeView.defaultRender,
        loadChildren: loadChildren
      }
    });
  };

  TreeView.toggle = function(state) {
    log("TreeView.toggle " + (state.isOpen()) + " item count=" + (state.items().length) + " loaded=" + (state.loaded()) + ", loading=" + (state.loading()));
    state.isOpen.set(!state.isOpen());
    if (state.loading() || state.loaded()) {
      return;
    }
    return TreeView.populate(state);
  };

  TreeView.reset = function(state) {
    log("TreeView.reset");
    if (!state.loaded()) {
      return;
    }
    state.items.set([]);
    state.isOpen.set(false);
    state.loaded.set(false);
    state.loading.set(false);
    return log("TreeView.reset: done");
  };

  TreeView.populate = function(state) {
    log("TreeView.populate");
    state.loading.set(true);
    return state.functors.loadChildren(state).then(function(children) {
      log("TreeView.populate: children loaded. count=" + children.length + ")");
      state.items.set(children);
      state.loaded.set(true);
      state.loading.set(false);
      return log("TreeView.populate: all done");
    })["catch"](function(e) {
      log("TreeView.populate:error!!!" + JSON.stringify(e));
      state.loaded.set(false);
      return state.loading.set(false);
    });
  };

  TreeView.render = function(state) {
    var _ref;
    return state != null ? (_ref = state.functors) != null ? typeof _ref.render === "function" ? _ref.render(state) : void 0 : void 0 : void 0;
  };

  TreeView.defaultRender = function(state) {
    var result, title, _ref;
    log("TreeView.render");
    title = (_ref = typeof state.title === "function" ? state.title(state) : void 0) != null ? _ref : state.title;
    result = h('li.list-nested-item', {
      className: state.isOpen ? '' : 'collapsed'
    }, [
      h('div.header.list-item' + (state.isRoot ? '.heading' : ''), {
        'ev-click': hg.send(state.channels.click),
        'ev-dblclick': hg.send(state.channels.dblclick)
      }, [title]), h('ul.entries.list-tree', {}, state.items.map(TreeView.render))
    ]);
    if (state.isRoot) {
      result = h('div.debugger-vertical-pane.inset-panel', {}, [h('ul.list-tree.has-collapsable-children', {}, [result])]);
    }
    return result;
  };

  TreeViewItem = function(value, _arg) {
    var handlers;
    handlers = (_arg != null ? _arg : {}).handlers;
    return hg.state({
      value: hg.value(value),
      channels: {
        click: function(state) {
          log("TreeViewItem event handler for click invoked");
          return handlers != null ? typeof handlers.click === "function" ? handlers.click(state) : void 0 : void 0;
        },
        dblclick: function(state) {
          log("TreeViewItem event handler for dblclick invoked");
          return handlers != null ? typeof handlers.dblclick === "function" ? handlers.dblclick(state) : void 0 : void 0;
        }
      },
      functors: {
        render: TreeViewItem.render
      }
    });
  };

  TreeViewItem.render = function(state) {
    var _ref;
    return h('li.list-item.entry', {
      'ev-click': hg.send(state.channels.click),
      'ev-dblclick': hg.send(state.channels.dblclick)
    }, [(_ref = typeof state.value === "function" ? state.value(state) : void 0) != null ? _ref : state.value]);
  };

  TreeViewUtils = (function() {
    function TreeViewUtils() {}

    TreeViewUtils.createFileRefHeader = function(fullPath, line) {
      return function(state) {
        return h("div", {
          title: fullPath,
          style: {
            display: 'inline'
          }
        }, ["" + (atom.project.relativizePath(fullPath)[1]) + " : " + line]);
      };
    };

    return TreeViewUtils;

  })();

  exports.TreeView = TreeView;

  exports.TreeViewItem = TreeViewItem;

  exports.TreeViewUtils = TreeViewUtils;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvVHJlZVZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBEQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNDLElBQUssR0FBTCxDQURELENBQUE7O0FBQUEsRUFFQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFVBQVIsQ0FGVixDQUFBOztBQUFBLEVBSUEsR0FBQSxHQUFNLFNBQUMsR0FBRCxHQUFBLENBSk4sQ0FBQTs7QUFBQSxFQU1BLFFBQUEsR0FBVyxTQUFDLEtBQUQsRUFBUSxZQUFSLEVBQXNCLElBQXRCLEdBQUE7QUFDVCxRQUFBLHNCQUFBO0FBQUEsMEJBRCtCLE9BQXVCLElBQXJCLGdCQUFBLFVBQVUsY0FBQSxNQUMzQyxDQUFBO0FBQUEsSUFBQSxHQUFBLENBQUssOEJBQUEsR0FBOEIsS0FBOUIsR0FBb0MsV0FBcEMsR0FBK0MsTUFBcEQsQ0FBQSxDQUFBO0FBQ0EsV0FBTyxFQUFFLENBQUMsS0FBSCxDQUFTO0FBQUEsTUFDWixNQUFBLEVBQVEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxNQUFULENBREk7QUFBQSxNQUVaLEtBQUEsRUFBTyxFQUFFLENBQUMsS0FBSCxDQUFTLEtBQVQsQ0FGSztBQUFBLE1BR1osS0FBQSxFQUFPLEVBQUUsQ0FBQyxLQUFILENBQVMsRUFBVCxDQUhLO0FBQUEsTUFJWixNQUFBLEVBQVEsRUFBRSxDQUFDLEtBQUgsQ0FBUyxLQUFULENBSkk7QUFBQSxNQUtaLE9BQUEsRUFBUyxFQUFFLENBQUMsS0FBSCxDQUFTLEtBQVQsQ0FMRztBQUFBLE1BTVosTUFBQSxFQUFRLEVBQUUsQ0FBQyxLQUFILENBQVMsS0FBVCxDQU5J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

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/TreeView.coffee
