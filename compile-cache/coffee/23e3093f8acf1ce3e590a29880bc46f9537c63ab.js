(function() {
  var EventEmitter, TestEmitter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('../../lib/eventing').EventEmitter;

  TestEmitter = (function(_super) {
    __extends(TestEmitter, _super);

    function TestEmitter() {
      return TestEmitter.__super__.constructor.apply(this, arguments);
    }

    TestEmitter.prototype.emitTestEvent = function() {
      return this.emit('testEvent', "some data");
    };

    return TestEmitter;

  })(EventEmitter);

  describe('EventEmitter', function() {
    describe('.subscribe', function() {
      return it('should return an unsubscribe function', function() {
        var emitter, eventCounter, unsubscribe;
        emitter = new TestEmitter();
        eventCounter = 0;
        unsubscribe = emitter.subscribe('testEvent', function(data) {
          return eventCounter = eventCounter + 1;
        });
        emitter.emitTestEvent();
        expect(eventCounter).toEqual(1);
        unsubscribe();
        emitter.emitTestEvent();
        return expect(eventCounter).toEqual(1);
      });
    });
    return describe('.subscribeDisposable', function() {
      return it('should return an subscribe object', function() {
        var emitter, eventCounter, subscription;
        emitter = new TestEmitter();
        eventCounter = 0;
        subscription = emitter.subscribeDisposable('testEvent', function(data) {
          return eventCounter = eventCounter + 1;
        });
        emitter.emitTestEvent();
        expect(eventCounter).toEqual(1);
        subscription.dispose();
        emitter.emitTestEvent();
        return expect(eventCounter).toEqual(1);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvc3BlYy9zcmMvZXZlbnRpbmctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseUJBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLGVBQWdCLE9BQUEsQ0FBUSxvQkFBUixFQUFoQixZQUFELENBQUE7O0FBQUEsRUFFTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwwQkFBQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsSUFBQyxDQUFBLElBQUQsQ0FBTSxXQUFOLEVBQW1CLFdBQW5CLEVBRGE7SUFBQSxDQUFmLENBQUE7O3VCQUFBOztLQUR3QixhQUYxQixDQUFBOztBQUFBLEVBTUEsUUFBQSxDQUFTLGNBQVQsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLElBQUEsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO2FBQ3JCLEVBQUEsQ0FBRyx1Q0FBSCxFQUE0QyxTQUFBLEdBQUE7QUFDMUMsWUFBQSxrQ0FBQTtBQUFBLFFBQUEsT0FBQSxHQUFjLElBQUEsV0FBQSxDQUFBLENBQWQsQ0FBQTtBQUFBLFFBQ0EsWUFBQSxHQUFlLENBRGYsQ0FBQTtBQUFBLFFBRUEsV0FBQSxHQUFjLE9BQU8sQ0FBQyxTQUFSLENBQWtCLFdBQWxCLEVBQStCLFNBQUMsSUFBRCxHQUFBO2lCQUFVLFlBQUEsR0FBZSxZQUFBLEdBQWUsRUFBeEM7UUFBQSxDQUEvQixDQUZkLENBQUE7QUFBQSxRQUdBLE9BQU8sQ0FBQyxhQUFSLENBQUEsQ0FIQSxDQUFBO0FBQUEsUUFJQSxNQUFBLENBQU8sWUFBUCxDQUFvQixDQUFDLE9BQXJCLENBQTZCLENBQTdCLENBSkEsQ0FBQTtBQUFBLFFBS0EsV0FBQSxDQUFBLENBTEEsQ0FBQTtBQUFBLFFBTUEsT0FBTyxDQUFDLGFBQVIsQ0FBQSxDQU5BLENBQUE7ZUFPQSxNQUFBLENBQU8sWUFBUCxDQUFvQixDQUFDLE9BQXJCLENBQTZCLENBQTdCLEVBUjBDO01BQUEsQ0FBNUMsRUFEcUI7SUFBQSxDQUF2QixDQUFBLENBQUE7V0FVQSxRQUFBLENBQVMsc0JBQVQsRUFBaUMsU0FBQSxHQUFBO2FBQy9CLEVBQUEsQ0FBRyxtQ0FBSCxFQUF3QyxTQUFBLEdBQUE7QUFDdEMsWUFBQSxtQ0FBQTtBQUFBLFFBQUEsT0FBQSxHQUFjLElBQUEsV0FBQSxDQUFBLENBQWQsQ0FBQTtBQUFBLFFBQ0EsWUFBQSxHQUFlLENBRGYsQ0FBQTtBQUFBLFFBRUEsWUFBQSxHQUFlLE9BQU8sQ0FBQyxtQkFBUixDQUE0QixXQUE1QixFQUF5QyxTQUFDLElBQUQsR0FBQTtpQkFBVSxZQUFBLEdBQWUsWUFBQSxHQUFlLEVBQXhDO1FBQUEsQ0FBekMsQ0FGZixDQUFBO0FBQUEsUUFHQSxPQUFPLENBQUMsYUFBUixDQUFBLENBSEEsQ0FBQTtBQUFBLFFBSUEsTUFBQSxDQUFPLFlBQVAsQ0FBb0IsQ0FBQyxPQUFyQixDQUE2QixDQUE3QixDQUpBLENBQUE7QUFBQSxRQUtBLFlBQVksQ0FBQyxPQUFiLENBQUEsQ0FMQSxDQUFBO0FBQUEsUUFNQSxPQUFPLENBQUMsYUFBUixDQUFBLENBTkEsQ0FBQTtlQU9BLE1BQUEsQ0FBTyxZQUFQLENBQW9CLENBQUMsT0FBckIsQ0FBNkIsQ0FBN0IsRUFSc0M7TUFBQSxDQUF4QyxFQUQrQjtJQUFBLENBQWpDLEVBWHVCO0VBQUEsQ0FBekIsQ0FOQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/spec/src/eventing-spec.coffee
