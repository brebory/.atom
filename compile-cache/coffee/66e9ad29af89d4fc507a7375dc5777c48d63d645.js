(function() {
  var BreakPointPane, LeftSidePane, RightSidePane, StepButton, breakpointPanel, callstackPaneModule, cancelButton, consolePane, dragHandler, h, hg, logger, stepButton;

  hg = require('mercury');

  h = hg.h;

  stepButton = require('./StepButton');

  breakpointPanel = require('./BreakPointPane');

  callstackPaneModule = require('./CallStackPane');

  consolePane = require('./ConsolePane');

  cancelButton = require('./CancelButton');

  dragHandler = require('./drag-handler');

  logger = require('../logger');

  StepButton = null;

  BreakPointPane = null;

  LeftSidePane = function(ConsolePane, state) {
    return h('div', {
      style: {
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column'
      }
    }, [ConsolePane.render(state.logger)]);
  };

  RightSidePane = function(BreakPointPane, CallStackPane, LocalsPane, WatchPane, StepButton, state) {
    return h('div', {
      style: {
        display: 'flex',
        width: "" + state.sideWidth + "px",
        flexBasis: "" + state.sideWidth + "px",
        height: "" + state.height + "px",
        flexDirection: 'row'
      }
    }, [
      h('div.resizer', {
        style: {
          width: '5px',
          flexBasis: '5px',
          cursor: 'ew-resize'
        },
        'ev-mousedown': dragHandler(state.channels.changeWidth, {})
      }), h('div.inset-panel', {
        style: {
          flexDirection: 'column',
          display: 'flex',
          flex: 'auto'
        }
      }, [
        h('div.debugger-panel-heading', {
          style: {
            'flex-shrink': 0
          }
        }, [h('div.btn-group', {}, [StepButton.render(state.steps.stepContinue), StepButton.render(state.steps.stepNext), StepButton.render(state.steps.stepIn), StepButton.render(state.steps.stepOut), cancelButton.render(state.cancel)])]), h('div.panel-body', {
          style: {
            flex: 'auto',
            display: 'list-item',
            overflow: 'auto'
          }
        }, [BreakPointPane.render(state.breakpoints), CallStackPane.render(state.callstack), LocalsPane.render(state.locals), WatchPane.render(state.watch)])
      ])
    ]);
  };

  exports.start = function(root, _debugger) {
    var App, CallStackPane, ConsolePane, LocalsPane, WatchPane, changeHeight, changeWidth, _ref;
    StepButton = stepButton.StepButton(_debugger);
    BreakPointPane = breakpointPanel.create(_debugger);
    _ref = callstackPaneModule.create(_debugger), CallStackPane = _ref.CallStackPane, LocalsPane = _ref.LocalsPane, WatchPane = _ref.WatchPane;
    ConsolePane = consolePane.create(_debugger);
    changeHeight = function(state, data) {
      return state.height.set(data.height);
    };
    changeWidth = function(state, data) {
      return state.sideWidth.set(data.sideWidth);
    };
    App = function() {
      var define, stepContinue, stepIn, stepNext, stepOut;
      stepContinue = StepButton('continue', 'continue');
      stepIn = StepButton('step in', 'in');
      stepOut = StepButton('step out', 'out');
      stepNext = StepButton('step next', 'next');
      define = {
        height: hg.value(350),
        sideWidth: hg.value(400),
        channels: {
          changeHeight: changeHeight,
          changeWidth: changeWidth
        },
        steps: {
          stepIn: stepIn,
          stepOut: stepOut,
          stepNext: stepNext,
          stepContinue: stepContinue
        },
        breakpoints: BreakPointPane(),
        callstack: CallStackPane(),
        watch: WatchPane(),
        locals: LocalsPane(),
        logger: ConsolePane(),
        cancel: cancelButton.create(_debugger)
      };
      logger.info('app init', define);
      return hg.state(define);
    };
    App.render = function(state) {
      logger.info('app state', state);
      return h('div', {
        style: {
          display: 'flex',
          flex: 'auto',
          flexDirection: 'column',
          position: 'relative',
          height: "" + state.height + "px"
        }
      }, [
        h('div.resizer', {
          style: {
            height: '5px',
            cursor: 'ns-resize',
            flex: '0 0 auto'
          },
          'ev-mousedown': dragHandler(state.channels.changeHeight, {})
        }), h('div', {
          style: {
            display: 'flex',
            flex: 'auto',
            flexDirection: 'row'
          }
        }, [LeftSidePane(ConsolePane, state), RightSidePane(BreakPointPane, CallStackPane, LocalsPane, WatchPane, StepButton, state)])
      ]);
    };
    return hg.app(root, App(), App.render);
  };

  exports.stop = function() {
    BreakPointPane.cleanup();
    return callstackPaneModule.cleanup();
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvQXBwLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnS0FBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxDQUFBLEdBQUksRUFBRSxDQUFDLENBRFAsQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEsY0FBUixDQUhiLENBQUE7O0FBQUEsRUFJQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxrQkFBUixDQUpsQixDQUFBOztBQUFBLEVBS0EsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLGlCQUFSLENBTHRCLENBQUE7O0FBQUEsRUFNQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGVBQVIsQ0FOZCxDQUFBOztBQUFBLEVBT0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxnQkFBUixDQVBmLENBQUE7O0FBQUEsRUFRQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBUmQsQ0FBQTs7QUFBQSxFQVNBLE1BQUEsR0FBUyxPQUFBLENBQVEsV0FBUixDQVRULENBQUE7O0FBQUEsRUFXQSxVQUFBLEdBQWEsSUFYYixDQUFBOztBQUFBLEVBWUEsY0FBQSxHQUFpQixJQVpqQixDQUFBOztBQUFBLEVBY0EsWUFBQSxHQUFlLFNBQUMsV0FBRCxFQUFjLEtBQWQsR0FBQTtXQUNiLENBQUEsQ0FBRSxLQUFGLEVBQVM7QUFBQSxNQUNQLEtBQUEsRUFBTztBQUFBLFFBQ0wsT0FBQSxFQUFTLE1BREo7QUFBQSxRQUVMLElBQUEsRUFBTSxNQUZEO0FBQUEsUUFHTCxhQUFBLEVBQWUsUUFIVjtPQURBO0tBQVQsRUFNRyxDQUNELFdBQVcsQ0FBQyxNQUFaLENBQW1CLEtBQUssQ0FBQyxN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

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/App.coffee
