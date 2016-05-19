(function() {
  var EventEmitter, ProcessManager, Stream, childprocess, makeFakeProcess;

  childprocess = require('child_process');

  EventEmitter = require('events').EventEmitter;

  ProcessManager = require('../../lib/debugger').ProcessManager;

  Stream = require('stream');

  makeFakeProcess = function() {
    var process;
    process = new EventEmitter();
    process.stdout = new Stream();
    process.stderr = new Stream();
    return process;
  };

  describe('ProcessManager', function() {
    return describe('.start', function() {
      return it('starts a process base on the atom config and if no file specify', function() {
        var atomStub, manager, mapping;
        mapping = {
          'node-debugger.nodePath': '/path/to/node',
          'node-debugger.appArgs': '--name',
          'node-debugger.debugPort': 5860
        };
        atomStub = {
          project: {
            resolvePath: function(file) {
              return '/path/to/file.js';
            }
          },
          workspace: {
            getActiveTextEditor: function() {
              return {
                getPath: function() {
                  return '/path/to/file.js';
                }
              };
            }
          },
          config: {
            get: function(key) {
              return mapping[key];
            }
          }
        };
        spyOn(childprocess, 'spawn').andReturn(makeFakeProcess());
        manager = new ProcessManager(atomStub);
        return waitsForPromise(function() {
          return manager.start().then(function() {
            expect(childprocess.spawn).toHaveBeenCalled();
            expect(childprocess.spawn.mostRecentCall.args[0]).toEqual('/path/to/node');
            expect(childprocess.spawn.mostRecentCall.args[1][0]).toEqual('--debug-brk=5860');
            expect(childprocess.spawn.mostRecentCall.args[1][1]).toEqual('/path/to/file.js');
            return expect(childprocess.spawn.mostRecentCall.args[1][2]).toEqual('--name');
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvc3BlYy9zcmMvZGVidWdnZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUVBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGVBQVIsQ0FBZixDQUFBOztBQUFBLEVBQ0MsZUFBZ0IsT0FBQSxDQUFRLFFBQVIsRUFBaEIsWUFERCxDQUFBOztBQUFBLEVBRUMsaUJBQWtCLE9BQUEsQ0FBUSxvQkFBUixFQUFsQixjQUZELENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FIVCxDQUFBOztBQUFBLEVBS0EsZUFBQSxHQUFrQixTQUFBLEdBQUE7QUFDaEIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQWMsSUFBQSxZQUFBLENBQUEsQ0FBZCxDQUFBO0FBQUEsSUFDQSxPQUFPLENBQUMsTUFBUixHQUFxQixJQUFBLE1BQUEsQ0FBQSxDQURyQixDQUFBO0FBQUEsSUFFQSxPQUFPLENBQUMsTUFBUixHQUFxQixJQUFBLE1BQUEsQ0FBQSxDQUZyQixDQUFBO0FBSUEsV0FBTyxPQUFQLENBTGdCO0VBQUEsQ0FMbEIsQ0FBQTs7QUFBQSxFQVlBLFFBQUEsQ0FBUyxnQkFBVCxFQUEyQixTQUFBLEdBQUE7V0FDekIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsU0FBQSxHQUFBO2FBQ2pCLEVBQUEsQ0FBRyxpRUFBSCxFQUFzRSxTQUFBLEdBQUE7QUFFcEUsWUFBQSwwQkFBQTtBQUFBLFFBQUEsT0FBQSxHQUFVO0FBQUEsVUFDUix3QkFBQSxFQUEwQixlQURsQjtBQUFBLFVBRVIsdUJBQUEsRUFBeUIsUUFGakI7QUFBQSxVQUdSLHlCQUFBLEVBQTJCLElBSG5CO1NBQVYsQ0FBQTtBQUFBLFFBTUEsUUFBQSxHQUNFO0FBQUEsVUFBQSxPQUFBLEVBQ0U7QUFBQSxZQUFBLFdBQUEsRUFBYSxTQUFDLElBQUQsR0FBQTtxQkFBVSxtQkFBVjtZQUFBLENBQWI7V0FERjtBQUFBLFVBRUEsU0FBQSxFQUNFO0FBQUEsWUFBQSxtQkFBQSxFQUFxQixTQUFBLEdBQUE7cUJBQ25CO0FBQUEsZ0JBQUEsT0FBQSxFQUFTLFNBQUEsR0FBQTt5QkFBRyxtQkFBSDtnQkFBQSxDQUFUO2dCQURtQjtZQUFBLENBQXJCO1dBSEY7QUFBQSxVQUtBLE1BQUEsRUFDRTtBQUFBLFlBQUEsR0FBQSxFQUFLLFNBQUMsR0FBRCxHQUFBO3FCQUFTLE9BQVEsQ0FBQSxHQUFBLEVBQWpCO1lBQUEsQ0FBTDtXQU5GO1NBUEYsQ0FBQTtBQUFBLFFBZUEsS0FBQSxDQUFNLFlBQU4sRUFBb0IsT0FBcEIsQ0FBNEIsQ0FBQyxTQUE3QixDQUF1QyxlQUFBLENBQUEsQ0FBdkMsQ0FmQSxDQUFBO0FBQUEsUUFpQkEsT0FBQSxHQUFjLElBQUEsY0FBQSxDQUFlLFFBQWYsQ0FqQmQsQ0FBQTtlQWtCQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxPQUFPLENBQUMsS0FBUixDQUFBLENBQWUsQ0FBQyxJQUFoQixDQUFxQixTQUFBLEdBQUE7QUFDbkIsWUFBQSxNQUFBLENBQU8sWUFBWSxDQUFDLEtBQXBCLENBQTBCLENBQUMsZ0JBQTNCLENBQUEsQ0FBQSxDQUFBO0FBQUEsWUFHQSxNQUFBLENBQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBOUMsQ0FBaUQsQ0FBQyxPQUFsRCxDQUEwRCxlQUExRCxDQUhBLENBQUE7QUFBQSxZQUlBLE1BQUEsQ0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqRCxDQUFvRCxDQUFDLE9BQXJELENBQTZELGtCQUE3RCxDQUpBLENBQUE7QUFBQSxZQUtBLE1BQUEsQ0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqRCxDQUFvRCxDQUFDLE9BQXJELENBQTZELGtCQUE3RCxDQUxBLENBQUE7bUJBTUEsTUFBQSxDQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpELENBQW9ELENBQUMsT0FBckQsQ0FBNkQsUUFBN0QsRUFQbUI7VUFBQSxDQUFyQixFQURjO1FBQUEsQ0FBaEIsRUFwQm9FO01BQUEsQ0FBdEUsRUFEaUI7SUFBQSxDQUFuQixFQUR5QjtFQUFBLENBQTNCLENBWkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/spec/src/debugger-spec.coffee
