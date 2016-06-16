(function() {
  var dirname, extname, filename, firstDirname, secondDirname, sep, _ref;

  _ref = require('path'), dirname = _ref.dirname, filename = _ref.filename, extname = _ref.extname, sep = _ref.sep;

  firstDirname = function(filepath) {
    return filepath.split(sep)[0];
  };

  secondDirname = function(filepath) {
    return filepath.split(sep)[1];
  };

  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      esteWatch: {
        options: {
          dirs: ['keymaps/**/*', 'lib/**/*', 'menus/**/*', 'spec/**/*', 'styles/**/*', 'node_modules/atom-refactor/**/*', 'vender/coffeescript/lib/**/*'],
          livereload: {
            enabled: false
          }
        },
        '*': function() {
          return ['apm:test'];
        }
      }
    });
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.registerTask('apm:test', function() {
      var done;
      done = this.async();
      return grunt.util.spawn({
        cmd: 'apm',
        args: ['test']
      }, function(err, result, code) {
        if (err != null) {
          grunt.util.error(err);
        }
        if (result != null) {
          grunt.log.writeln(result);
        }
        return done();
      });
    });
    grunt.registerTask('cake:generate', function() {
      var done;
      done = this.async();
      return grunt.util.spawn({
        cmd: 'cake',
        args: ['generate']
      }, function(err, result, code) {
        if (err != null) {
          grunt.util.error(err);
        }
        if (result != null) {
          grunt.log.writeln(result);
        }
        return done();
      });
    });
    return grunt.registerTask('default', ['apm:test', 'esteWatch']);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3JlZmFjdG9yL0dydW50ZmlsZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0VBQUE7O0FBQUEsRUFBQSxPQUFzQyxPQUFBLENBQVEsTUFBUixDQUF0QyxFQUFFLGVBQUEsT0FBRixFQUFXLGdCQUFBLFFBQVgsRUFBcUIsZUFBQSxPQUFyQixFQUE4QixXQUFBLEdBQTlCLENBQUE7O0FBQUEsRUFDQSxZQUFBLEdBQWUsU0FBQyxRQUFELEdBQUE7V0FDYixRQUFRLENBQUMsS0FBVCxDQUFlLEdBQWYsQ0FBb0IsQ0FBQSxDQUFBLEVBRFA7RUFBQSxDQURmLENBQUE7O0FBQUEsRUFHQSxhQUFBLEdBQWdCLFNBQUMsUUFBRCxHQUFBO1dBQ2QsUUFBUSxDQUFDLEtBQVQsQ0FBZSxHQUFmLENBQW9CLENBQUEsQ0FBQSxFQUROO0VBQUEsQ0FIaEIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsS0FBRCxHQUFBO0FBQ2YsSUFBQSxLQUFLLENBQUMsVUFBTixDQUVFO0FBQUEsTUFBQSxHQUFBLEVBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFYLENBQW9CLGNBQXBCLENBQUw7QUFBQSxNQUVBLFNBQUEsRUFDRTtBQUFBLFFBQUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sQ0FDSixjQURJLEVBRUosVUFGSSxFQUdKLFlBSEksRUFJSixXQUpJLEVBS0osYUFMSSxFQU1KLGlDQU5JLEVBT0osOEJBUEksQ0FBTjtBQUFBLFVBU0EsVUFBQSxFQUNFO0FBQUEsWUFBQSxPQUFBLEVBQVMsS0FBVDtXQVZGO1NBREY7QUFBQSxRQVlBLEdBQUEsRUFBSyxTQUFBLEdBQUE7aUJBQ0gsQ0FBRSxVQUFGLEVBREc7UUFBQSxDQVpMO09BSEY7S0FGRixDQUFBLENBQUE7QUFBQSxJQW9CQSxLQUFLLENBQUMsWUFBTixDQUFtQixjQUFuQixDQXBCQSxDQUFBO0FBQUEsSUFxQkEsS0FBSyxDQUFDLFlBQU4sQ0FBbUIsa0JBQW5CLENBckJBLENBQUE7QUFBQSxJQXVCQSxLQUFLLENBQUMsWUFBTixDQUFtQixVQUFuQixFQUErQixTQUFBLEdBQUE7QUFDN0IsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFQLENBQUE7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQVgsQ0FDRTtBQUFBLFFBQUEsR0FBQSxFQUFLLEtBQUw7QUFBQSxRQUNBLElBQUEsRUFBTSxDQUFFLE1BQUYsQ0FETjtPQURGLEVBR0UsU0FBQyxHQUFELEVBQU0sTUFBTixFQUFjLElBQWQsR0FBQTtBQUNBLFFBQUEsSUFBRyxXQUFIO0FBQ0UsVUFBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQVgsQ0FBaUIsR0FBakIsQ0FBQSxDQURGO1NBQUE7QUFFQSxRQUFBLElBQUcsY0FBSDtBQUNFLFVBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFWLENBQWtCLE1BQWxCLENBQUEsQ0FERjtTQUZBO2VBSUEsSUFBQSxDQUFBLEVBTEE7TUFBQSxDQUhGLEVBRjZCO0lBQUEsQ0FBL0IsQ0F2QkEsQ0FBQTtBQUFBLElBbUNBLEtBQUssQ0FBQyxZQUFOLENBQW1CLGVBQW5CLEVBQW9DLFNBQUEsR0FBQTtBQUNsQyxVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsS0FBRCxDQUFBLENBQVAsQ0FBQTthQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBWCxDQUNFO0FBQUEsUUFBQSxHQUFBLEVBQUssTUFBTDtBQUFBLFFBQ0EsSUFBQSxFQUFNLENBQUUsVUFBRixDQUROO09BREYsRUFHRSxTQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsSUFBZCxHQUFBO0FBQ0EsUUFBQSxJQUFHLFdBQUg7QUFDRSxVQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBWCxDQUFpQixHQUFqQixDQUFBLENBREY7U0FBQTtBQUVBLFFBQUEsSUFBRyxjQUFIO0FBQ0UsVUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsQ0FBQSxDQURGO1NBRkE7ZUFJQSxJQUFBLENBQUEsRUFMQTtNQUFBLENBSEYsRUFGa0M7SUFBQSxDQUFwQyxDQW5DQSxDQUFBO1dBK0NBLEtBQUssQ0FBQyxZQUFOLENBQW1CLFNBQW5CLEVBQThCLENBQzVCLFVBRDRCLEVBRTVCLFdBRjRCLENBQTlCLEVBaERlO0VBQUEsQ0FOakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/refactor/Gruntfile.coffee
