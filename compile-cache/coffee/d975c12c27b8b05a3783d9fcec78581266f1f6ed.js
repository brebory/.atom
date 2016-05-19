(function() {
  var BTN_ICON_MAP, h, hg;

  hg = require('mercury');

  h = hg.h;

  BTN_ICON_MAP = {
    'continue': 'icon-playback-play btn btn-primary',
    'next': 'icon-chevron-right btn btn-primary',
    'out': 'icon-chevron-up btn btn-primary',
    'in': 'icon-chevron-down btn btn-primary'
  };

  exports.StepButton = function(_debugger) {
    var StepButton, onNext;
    onNext = function(state) {
      var promise, type;
      type = state.type();
      state.waiting(true);
      promise = null;
      if (type === 'continue') {
        promise = _debugger.reqContinue();
      } else {
        promise = _debugger.step(type, 1);
      }
      return promise.then(function() {
        return state.waiting(false);
      })["catch"](function(e) {
        return state.waiting(false);
      });
    };
    StepButton = function(name, type) {
      return hg.state({
        title: hg.value(name),
        type: hg.value(type),
        waiting: hg.value(false),
        channels: {
          next: onNext
        }
      });
    };
    StepButton.render = function(state) {
      var channels;
      channels = state.channels();
      return h('div', {
        'ev-click': hg.send(channels.next),
        'className': BTN_ICON_MAP[state.type()],
        'distabled': !state.waiting
      }, []);
    };
    return StepButton;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvU3RlcEJ1dHRvbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUJBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0MsSUFBSyxHQUFMLENBREQsQ0FBQTs7QUFBQSxFQUdBLFlBQUEsR0FBZTtBQUFBLElBQ2IsVUFBQSxFQUFZLG9DQURDO0FBQUEsSUFFYixNQUFBLEVBQVEsb0NBRks7QUFBQSxJQUdiLEtBQUEsRUFBTyxpQ0FITTtBQUFBLElBSWIsSUFBQSxFQUFNLG1DQUpPO0dBSGYsQ0FBQTs7QUFBQSxFQVVBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUMsU0FBRCxHQUFBO0FBQ25CLFFBQUEsa0JBQUE7QUFBQSxJQUFBLE1BQUEsR0FBUyxTQUFDLEtBQUQsR0FBQTtBQUNQLFVBQUEsYUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FBUCxDQUFBO0FBQUEsTUFDQSxLQUFLLENBQUMsT0FBTixDQUFjLElBQWQsQ0FEQSxDQUFBO0FBQUEsTUFFQSxPQUFBLEdBQVUsSUFGVixDQUFBO0FBSUEsTUFBQSxJQUFHLElBQUEsS0FBUSxVQUFYO0FBQ0UsUUFBQSxPQUFBLEdBQVUsU0FBUyxDQUFDLFdBQVYsQ0FBQSxDQUFWLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxPQUFBLEdBQVUsU0FBUyxDQUFDLElBQVYsQ0FBZSxJQUFmLEVBQXFCLENBQXJCLENBQVYsQ0FIRjtPQUpBO2FBU0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxTQUFBLEdBQUE7ZUFDWCxLQUFLLENBQUMsT0FBTixDQUFjLEtBQWQsRUFEVztNQUFBLENBQWIsQ0FFQSxDQUFDLE9BQUQsQ0FGQSxDQUVPLFNBQUMsQ0FBRCxHQUFBO2VBQ0wsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLEVBREs7TUFBQSxDQUZQLEVBVk87SUFBQSxDQUFULENBQUE7QUFBQSxJQWVBLFVBQUEsR0FBYSxTQUFDLElBQUQsRUFBTyxJQUFQLEdBQUE7YUFDWCxFQUFFLENBQUMsS0FBSCxDQUFTO0FBQUEsUUFDUCxLQUFBLEVBQU8sRUFBRSxDQUFDLEtBQUgsQ0FBUyxJQUFULENBREE7QUFBQSxRQUVQLElBQUEsRUFBTSxFQUFFLENBQUMsS0FBSCxDQUFTLElBQVQsQ0FGQztBQUFBLFFBR1AsT0FBQSxFQUFTLEVBQUUsQ0FBQyxLQUFILENBQVMsS0FBVCxDQUhGO0FBQUEsUUFJUCxRQUFBLEVBQVU7QUFBQSxVQUNSLElBQUEsRUFBTSxNQURFO1NBSkg7T0FBVCxFQURXO0lBQUEsQ0FmYixDQUFBO0FBQUEsSUF5QkEsVUFBVSxDQUFDLE1BQVgsR0FBb0IsU0FBQyxLQUFELEdBQUE7QUFDbEIsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFYLENBQUE7YUFFQSxDQUFBLENBQUUsS0FBRixFQUFTO0FBQUEsUUFDUCxVQUFBLEVBQVksRUFBRSxDQUFDLElBQUgsQ0FBUSxRQUFRLENBQUMsSUFBakIsQ0FETDtBQUFBLFFBRVAsV0FBQSxFQUFhLFlBQWEsQ0FBQSxLQUFLLENBQUMsSUFBTixDQUFBLENBQUEsQ0FGbkI7QUFBQSxRQUdQLFdBQUEsRUFBYSxDQUFBLEtBQU0sQ0FBQyxPQUhiO09BQVQsRUFJRyxFQUpILEVBSGtCO0lBQUEsQ0F6QnBCLENBQUE7QUFtQ0EsV0FBTyxVQUFQLENBcENtQjtFQUFBLENBVnJCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/StepButton.coffee
