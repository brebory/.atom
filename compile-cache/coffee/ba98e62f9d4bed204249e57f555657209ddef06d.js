(function() {
  var CommandRunner, CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  CommandRunner = require('../lib/command-runner');

  describe("CommandRunner", function() {
    beforeEach(function() {
      return this.runner = new CommandRunner();
    });
    it("runs commands", function() {
      var command;
      command = 'echo "Hello, wrold!"';
      return waitsForPromise((function(_this) {
        return function() {
          return _this.runner.run(command).then(function(result) {
            expect(result.output).toEqual("Hello, wrold!\r\n");
            return expect(result.exited).toBe(true);
          });
        };
      })(this));
    });
    it("runs commands in the working directory", function() {
      var command;
      spyOn(CommandRunner, 'workingDirectory').andReturn('/usr');
      command = 'pwd';
      return waitsForPromise((function(_this) {
        return function() {
          return _this.runner.run(command).then(function(result) {
            return expect(result.output).toEqual('/usr\r\n');
          });
        };
      })(this));
    });
    it("returns all command results", function() {
      var command;
      command = 'echo "out"; echo "more out"; >&2 echo "error"; false';
      return waitsForPromise((function(_this) {
        return function() {
          return _this.runner.run(command).then(function(result) {
            expect(result.output).toEqual("out\r\nmore out\r\nerror\r\n");
            return expect(result.exited).toBe(true);
          });
        };
      })(this));
    });
    it("returns raw escape codes", function() {
      var command;
      command = 'echo -e "\\x1B[31mHello\\033[0m, wrold!"';
      return waitsForPromise((function(_this) {
        return function() {
          return _this.runner.run(command).then(function(result) {
            return expect(result.output).toEqual("\x1B[31mHello\x1B[0m, wrold!\r\n");
          });
        };
      })(this));
    });
    it("can kill a long-running command", function() {
      var command, promise;
      command = 'while true; do echo -n; done';
      promise = this.runner.run(command);
      this.runner.kill('SIGKILL');
      return waitsForPromise(function() {
        return promise.then(function(result) {
          return expect(result.signal).toEqual('SIGKILL');
        });
      });
    });
    it("kills one command before starting another", function() {
      var firstCommand, firstPromise, secondCommand, secondPromise;
      firstCommand = 'while true; do echo -n; done';
      secondCommand = 'echo -n';
      firstPromise = this.runner.run(firstCommand);
      secondPromise = this.runner.run(secondCommand);
      waitsForPromise(function() {
        return firstPromise.then(function(result) {
          return expect(result.signal).toBeTruthy();
        });
      });
      return waitsForPromise(function() {
        return secondPromise.then(function(result) {
          return expect(result.exited).toBe(true);
        });
      });
    });
    describe("the working directory", function() {
      it("is set to a project directory", function() {
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn(null);
        spyOn(atom.project, 'getPaths').andReturn(['/foo/bar/baz']);
        return expect(CommandRunner.workingDirectory()).toEqual('/foo/bar/baz');
      });
      it("is set to the project directory of the current file", function() {
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn({
          getPath: function() {
            return '/foo/baz/asdf/jkl.txt';
          }
        });
        spyOn(atom.project, 'getPaths').andReturn(['/foo/bar', '/foo/baz', '/foo/qux']);
        spyOn(atom.project, 'relativizePath').andReturn(['/foo/baz', 'asdf/jkl.txt']);
        expect(CommandRunner.workingDirectory()).toEqual('/foo/baz');
        return expect(atom.project.relativizePath).toHaveBeenCalledWith('/foo/baz/asdf/jkl.txt');
      });
      it("is set to the current file path if not in a project", function() {
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn({
          getPath: function() {
            return '/foo/baz/asdf/jkl.txt';
          }
        });
        spyOn(atom.project, 'getPaths').andReturn(null);
        return expect(CommandRunner.workingDirectory()).toEqual('/foo/baz/asdf');
      });
      return it("is set to the user's home directory if nothing is open", function() {
        spyOn(CommandRunner, 'homeDirectory').andReturn('/home/me');
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn(null);
        spyOn(atom.project, 'getPaths').andReturn(null);
        return expect(CommandRunner.workingDirectory()).toEqual('/home/me');
      });
    });
    return describe("events", function() {
      it("emits an event when running a command", function() {
        var command, handler;
        command = 'echo "foo"';
        handler = jasmine.createSpy('onCommand');
        this.runner.onCommand(handler);
        return waitsForPromise((function(_this) {
          return function() {
            return _this.runner.run(command).then(function() {
              expect(handler).toHaveBeenCalledWith('echo "foo"');
              return expect(handler.calls.length).toEqual(1);
            });
          };
        })(this));
      });
      it("emits events on output", function() {
        var command, dataHandler;
        command = 'echo "foobar"';
        dataHandler = jasmine.createSpy('onData');
        this.runner.onData(dataHandler);
        return waitsForPromise((function(_this) {
          return function() {
            return _this.runner.run(command).then(function() {
              expect(dataHandler).toHaveBeenCalledWith("foobar\r\n");
              return expect(dataHandler.calls.length).toEqual(1);
            });
          };
        })(this));
      });
      it("emits an event on exit", function() {
        var command, handler;
        command = 'echo "Hello, wrold!"';
        handler = jasmine.createSpy('onExit');
        this.runner.onExit(handler);
        return waitsForPromise((function(_this) {
          return function() {
            return _this.runner.run(command).then(function() {
              expect(handler).toHaveBeenCalled();
              return expect(handler.calls.length).toEqual(1);
            });
          };
        })(this));
      });
      return it("emits an event on kill", function() {
        var command, handler, promise;
        command = 'while true; do echo -n; done';
        handler = jasmine.createSpy('onKill');
        this.runner.onKill(handler);
        promise = this.runner.run(command);
        this.runner.kill('SIGKILL');
        return waitsForPromise(function() {
          return promise.then(function() {
            expect(handler).toHaveBeenCalledWith('SIGKILL');
            return expect(handler.calls.length).toEqual(1);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1bi1jb21tYW5kL3NwZWMvY29tbWFuZC1ydW5uZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0NBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLGFBQUEsR0FBd0IsT0FBQSxDQUFRLHVCQUFSLENBRHhCLENBQUE7O0FBQUEsRUFHQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7QUFDeEIsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO2FBQ1QsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLGFBQUEsQ0FBQSxFQURMO0lBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxJQUdBLEVBQUEsQ0FBRyxlQUFILEVBQW9CLFNBQUEsR0FBQTtBQUNsQixVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxzQkFBVixDQUFBO2FBQ0EsZUFBQSxDQUFnQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNkLEtBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZLE9BQVosQ0FBb0IsQ0FBQyxJQUFyQixDQUEwQixTQUFDLE1BQUQsR0FBQTtBQUN4QixZQUFBLE1BQUEsQ0FBTyxNQUFNLENBQUMsTUFBZCxDQUFxQixDQUFDLE9BQXRCLENBQThCLG1CQUE5QixDQUFBLENBQUE7bUJBQ0EsTUFBQSxDQUFPLE1BQU0sQ0FBQyxNQUFkLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsSUFBM0IsRUFGd0I7VUFBQSxDQUExQixFQURjO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEIsRUFGa0I7SUFBQSxDQUFwQixDQUhBLENBQUE7QUFBQSxJQVVBLEVBQUEsQ0FBRyx3Q0FBSCxFQUE2QyxTQUFBLEdBQUE7QUFDM0MsVUFBQSxPQUFBO0FBQUEsTUFBQSxLQUFBLENBQU0sYUFBTixFQUFxQixrQkFBckIsQ0FBd0MsQ0FBQyxTQUF6QyxDQUFtRCxNQUFuRCxDQUFBLENBQUE7QUFBQSxNQUNBLE9BQUEsR0FBVSxLQURWLENBQUE7YUFHQSxlQUFBLENBQWdCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2QsS0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQVksT0FBWixDQUFvQixDQUFDLElBQXJCLENBQTBCLFNBQUMsTUFBRCxHQUFBO21CQUN4QixNQUFBLENBQU8sTUFBTSxDQUFDLE1BQWQsQ0FBcUIsQ0FBQyxPQUF0QixDQUE4QixVQUE5QixFQUR3QjtVQUFBLENBQTFCLEVBRGM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQixFQUoyQztJQUFBLENBQTdDLENBVkEsQ0FBQTtBQUFBLElBa0JBLEVBQUEsQ0FBRyw2QkFBSCxFQUFrQyxTQUFBLEdBQUE7QUFDaEMsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsc0RBQVYsQ0FBQTthQUNBLGVBQUEsQ0FBZ0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDZCxLQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBWSxPQUFaLENBQW9CLENBQUMsSUFBckIsQ0FBMEIsU0FBQyxNQUFELEdBQUE7QUFDeEIsWUFBQSxNQUFBLENBQU8sTUFBTSxDQUFDLE1BQWQsQ0FBcUIsQ0FBQyxPQUF0QixDQUE4Qiw4QkFBOUIsQ0FBQSxDQUFBO21CQUNBLE1BQUEsQ0FBTyxNQUFNLENBQUMsTUFBZCxDQUFxQixDQUFDLElBQXRCLENBQTJCLElBQTNCLEVBRndCO1VBQUEsQ0FBMUIsRUFEYztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhCLEVBRmdDO0lBQUEsQ0FBbEMsQ0FsQkEsQ0FBQTtBQUFBLElBeUJBLEVBQUEsQ0FBRywwQkFBSCxFQUErQixTQUFBLEdBQUE7QUFDN0IsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsMENBQVYsQ0FBQTthQUNBLGVBQUEsQ0FBZ0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDZCxLQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBWSxPQUFaLENBQW9CLENBQUMsSUFBckIsQ0FBMEIsU0FBQyxNQUFELEdBQUE7bUJBQ3hCLE1BQUEsQ0FBTyxNQUFNLENBQUMsTUFBZCxDQUFxQixDQUFDLE9BQXRCLENBQThCLGtDQUE5QixFQUR3QjtVQUFBLENBQTFCLEVBRGM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQixFQUY2QjtJQUFBLENBQS9CLENBekJBLENBQUE7QUFBQSxJQStCQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBQ3BDLFVBQUEsZ0JBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSw4QkFBVixDQUFBO0FBQUEsTUFFQSxPQUFBLEdBQVUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQVksT0FBWixDQUZWLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLFNBQWIsQ0FIQSxDQUFBO2FBS0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxPQUFPLENBQUMsSUFBUixDQUFhLFNBQUMsTUFBRCxHQUFBO2lCQUNYLE1BQUEsQ0FBTyxNQUFNLENBQUMsTUFBZCxDQUFxQixDQUFDLE9BQXRCLENBQThCLFNBQTlCLEVBRFc7UUFBQSxDQUFiLEVBRGM7TUFBQSxDQUFoQixFQU5vQztJQUFBLENBQXRDLENBL0JBLENBQUE7QUFBQSxJQXlDQSxFQUFBLENBQUcsMkNBQUgsRUFBZ0QsU0FBQSxHQUFBO0FBQzlDLFVBQUEsd0RBQUE7QUFBQSxNQUFBLFlBQUEsR0FBZSw4QkFBZixDQUFBO0FBQUEsTUFDQSxhQUFBLEdBQWdCLFNBRGhCLENBQUE7QUFBQSxNQUdBLFlBQUEsR0FBZSxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBWSxZQUFaLENBSGYsQ0FBQTtBQUFBLE1BSUEsYUFBQSxHQUFnQixJQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBWSxhQUFaLENBSmhCLENBQUE7QUFBQSxNQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsWUFBWSxDQUFDLElBQWIsQ0FBa0IsU0FBQyxNQUFELEdBQUE7aUJBQ2hCLE1BQUEsQ0FBTyxNQUFNLENBQUMsTUFBZCxDQUFxQixDQUFDLFVBQXRCLENBQUEsRUFEZ0I7UUFBQSxDQUFsQixFQURjO01BQUEsQ0FBaEIsQ0FOQSxDQUFBO2FBVUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxhQUFhLENBQUMsSUFBZCxDQUFtQixTQUFDLE1BQUQsR0FBQTtpQkFDakIsTUFBQSxDQUFPLE1BQU0sQ0FBQyxNQUFkLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsSUFBM0IsRUFEaUI7UUFBQSxDQUFuQixFQURjO01BQUEsQ0FBaEIsRUFYOEM7SUFBQSxDQUFoRCxDQXpDQSxDQUFBO0FBQUEsSUF3REEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUNoQyxNQUFBLEVBQUEsQ0FBRywrQkFBSCxFQUFvQyxTQUFBLEdBQUE7QUFDbEMsUUFBQSxLQUFBLENBQU0sSUFBSSxDQUFDLFNBQVgsRUFBc0IscUJBQXRCLENBQTRDLENBQUMsU0FBN0MsQ0FBdUQsSUFBdkQsQ0FBQSxDQUFBO0FBQUEsUUFDQSxLQUFBLENBQU0sSUFBSSxDQUFDLE9BQVgsRUFBb0IsVUFBcEIsQ0FBK0IsQ0FBQyxTQUFoQyxDQUEwQyxDQUFDLGNBQUQsQ0FBMUMsQ0FEQSxDQUFBO2VBR0EsTUFBQSxDQUFPLGFBQWEsQ0FBQyxnQkFBZCxDQUFBLENBQVAsQ0FBd0MsQ0FBQyxPQUF6QyxDQUFpRCxjQUFqRCxFQUprQztNQUFBLENBQXBDLENBQUEsQ0FBQTtBQUFBLE1BTUEsRUFBQSxDQUFHLHFEQUFILEVBQTBELFNBQUEsR0FBQTtBQUN4RCxRQUFBLEtBQUEsQ0FBTSxJQUFJLENBQUMsU0FBWCxFQUFzQixxQkFBdEIsQ0FBNEMsQ0FBQyxTQUE3QyxDQUNFO0FBQUEsVUFBQSxPQUFBLEVBQVMsU0FBQSxHQUFBO21CQUFHLHdCQUFIO1VBQUEsQ0FBVDtTQURGLENBQUEsQ0FBQTtBQUFBLFFBRUEsS0FBQSxDQUFNLElBQUksQ0FBQyxPQUFYLEVBQW9CLFVBQXBCLENBQStCLENBQUMsU0FBaEMsQ0FBMEMsQ0FDeEMsVUFEd0MsRUFFeEMsVUFGd0MsRUFHeEMsVUFId0MsQ0FBMUMsQ0FGQSxDQUFBO0FBQUEsUUFPQSxLQUFBLENBQU0sSUFBSSxDQUFDLE9BQVgsRUFBb0IsZ0JBQXBCLENBQXFDLENBQUMsU0FBdEMsQ0FBZ0QsQ0FDOUMsVUFEOEMsRUFDbEMsY0FEa0MsQ0FBaEQsQ0FQQSxDQUFBO0FBQUEsUUFXQSxNQUFBLENBQU8sYUFBYSxDQUFDLGdCQUFkLENBQUEsQ0FBUCxDQUF3QyxDQUFDLE9BQXpDLENBQWlELFVBQWpELENBWEEsQ0FBQTtlQVlBLE1BQUEsQ0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQXBCLENBQ0UsQ0FBQyxvQkFESCxDQUN3Qix1QkFEeEIsRUFid0Q7TUFBQSxDQUExRCxDQU5BLENBQUE7QUFBQSxNQXNCQSxFQUFBLENBQUcscURBQUgsRUFBMEQsU0FBQSxHQUFBO0FBQ3hELFFBQUEsS0FBQSxDQUFNLElBQUksQ0FBQyxTQUFYLEVBQXNCLHFCQUF0QixDQUE0QyxDQUFDLFNBQTdDLENBQ0U7QUFBQSxVQUFBLE9BQUEsRUFBUyxTQUFBLEdBQUE7bUJBQUcsd0JBQUg7VUFBQSxDQUFUO1NBREYsQ0FBQSxDQUFBO0FBQUEsUUFFQSxLQUFBLENBQU0sSUFBSSxDQUFDLE9BQVgsRUFBb0IsVUFBcEIsQ0FBK0IsQ0FBQyxTQUFoQyxDQUEwQyxJQUExQyxDQUZBLENBQUE7ZUFJQSxNQUFBLENBQU8sYUFBYSxDQUFDLGdCQUFkLENBQUEsQ0FBUCxDQUF3QyxDQUFDLE9BQXpDLENBQWlELGVBQWpELEVBTHdEO01BQUEsQ0FBMUQsQ0F0QkEsQ0FBQTthQTZCQSxFQUFBLENBQUcsd0RBQUgsRUFBNkQsU0FBQSxHQUFBO0FBQzNELFFBQUEsS0FBQSxDQUFNLGFBQU4sRUFBcUIsZUFBckIsQ0FBcUMsQ0FBQyxTQUF0QyxDQUFnRCxVQUFoRCxDQUFBLENBQUE7QUFBQSxRQUNBLEtBQUEsQ0FBTSxJQUFJLENBQUMsU0FBWCxFQUFzQixxQkFBdEIsQ0FBNEMsQ0FBQyxTQUE3QyxDQUF1RCxJQUF2RCxDQURBLENBQUE7QUFBQSxRQUVBLEtBQUEsQ0FBTSxJQUFJLENBQUMsT0FBWCxFQUFvQixVQUFwQixDQUErQixDQUFDLFNBQWhDLENBQTBDLElBQTFDLENBRkEsQ0FBQTtlQUlBLE1BQUEsQ0FBTyxhQUFhLENBQUMsZ0JBQWQsQ0FBQSxDQUFQLENBQXdDLENBQUMsT0FBekMsQ0FBaUQsVUFBakQsRUFMMkQ7TUFBQSxDQUE3RCxFQTlCZ0M7SUFBQSxDQUFsQyxDQXhEQSxDQUFBO1dBNkZBLFFBQUEsQ0FBUyxRQUFULEVBQW1CLFNBQUEsR0FBQTtBQUNqQixNQUFBLEVBQUEsQ0FBRyx1Q0FBSCxFQUE0QyxTQUFBLEdBQUE7QUFDMUMsWUFBQSxnQkFBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLFlBQVYsQ0FBQTtBQUFBLFFBQ0EsT0FBQSxHQUFVLE9BQU8sQ0FBQyxTQUFSLENBQWtCLFdBQWxCLENBRFYsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQWtCLE9BQWxCLENBSEEsQ0FBQTtlQUtBLGVBQUEsQ0FBZ0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQ2QsS0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQVksT0FBWixDQUFvQixDQUFDLElBQXJCLENBQTBCLFNBQUEsR0FBQTtBQUN4QixjQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxvQkFBaEIsQ0FBcUMsWUFBckMsQ0FBQSxDQUFBO3FCQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQXJCLENBQTRCLENBQUMsT0FBN0IsQ0FBcUMsQ0FBckMsRUFGd0I7WUFBQSxDQUExQixFQURjO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEIsRUFOMEM7TUFBQSxDQUE1QyxDQUFBLENBQUE7QUFBQSxNQVdBLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsWUFBQSxvQkFBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLGVBQVYsQ0FBQTtBQUFBLFFBRUEsV0FBQSxHQUFjLE9BQU8sQ0FBQyxTQUFSLENBQWtCLFFBQWxCLENBRmQsQ0FBQTtBQUFBLFFBSUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQWUsV0FBZixDQUpBLENBQUE7ZUFNQSxlQUFBLENBQWdCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUNkLEtBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZLE9BQVosQ0FBb0IsQ0FBQyxJQUFyQixDQUEwQixTQUFBLEdBQUE7QUFDeEIsY0FBQSxNQUFBLENBQU8sV0FBUCxDQUFtQixDQUFDLG9CQUFwQixDQUF5QyxZQUF6QyxDQUFBLENBQUE7cUJBQ0EsTUFBQSxDQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBekIsQ0FBZ0MsQ0FBQyxPQUFqQyxDQUF5QyxDQUF6QyxFQUZ3QjtZQUFBLENBQTFCLEVBRGM7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQixFQVAyQjtNQUFBLENBQTdCLENBWEEsQ0FBQTtBQUFBLE1BdUJBLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsWUFBQSxnQkFBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLHNCQUFWLENBQUE7QUFBQSxRQUNBLE9BQUEsR0FBVSxPQUFPLENBQUMsU0FBUixDQUFrQixRQUFsQixDQURWLENBQUE7QUFBQSxRQUdBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixDQUFlLE9BQWYsQ0FIQSxDQUFBO2VBS0EsZUFBQSxDQUFnQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFDZCxLQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBWSxPQUFaLENBQW9CLENBQUMsSUFBckIsQ0FBMEIsU0FBQSxHQUFBO0FBQ3hCLGNBQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLGdCQUFoQixDQUFBLENBQUEsQ0FBQTtxQkFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFyQixDQUE0QixDQUFDLE9BQTdCLENBQXFDLENBQXJDLEVBRndCO1lBQUEsQ0FBMUIsRUFEYztVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhCLEVBTjJCO01BQUEsQ0FBN0IsQ0F2QkEsQ0FBQTthQWtDQSxFQUFBLENBQUcsd0JBQUgsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFlBQUEseUJBQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSw4QkFBVixDQUFBO0FBQUEsUUFDQSxPQUFBLEdBQVUsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsUUFBbEIsQ0FEVixDQUFBO0FBQUEsUUFHQSxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQVIsQ0FBZSxPQUFmLENBSEEsQ0FBQTtBQUFBLFFBS0EsT0FBQSxHQUFVLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZLE9BQVosQ0FMVixDQUFBO0FBQUEsUUFNQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxTQUFiLENBTkEsQ0FBQTtlQVFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLE9BQU8sQ0FBQyxJQUFSLENBQWEsU0FBQSxHQUFBO0FBQ1gsWUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsb0JBQWhCLENBQXFDLFNBQXJDLENBQUEsQ0FBQTttQkFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFyQixDQUE0QixDQUFDLE9BQTdCLENBQXFDLENBQXJDLEVBRlc7VUFBQSxDQUFiLEVBRGM7UUFBQSxDQUFoQixFQVQyQjtNQUFBLENBQTdCLEVBbkNpQjtJQUFBLENBQW5CLEVBOUZ3QjtFQUFBLENBQTFCLENBSEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/run-command/spec/command-runner-spec.coffee
