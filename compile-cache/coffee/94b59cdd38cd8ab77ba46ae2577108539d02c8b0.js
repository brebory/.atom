(function() {
  var spawn;

  spawn = require('child_process').spawn;

  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      esteWatch: {
        options: {
          dirs: ['keymaps/**/*', 'lib/**/*', 'menus/**/*', 'spec/**/*', 'styles/**/*', 'node_modules/atom-refactor/**/*'],
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
    return grunt.registerTask('default', ['apm:test', 'esteWatch']);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2pzLXJlZmFjdG9yL0dydW50ZmlsZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsS0FBQTs7QUFBQSxFQUFFLFFBQVUsT0FBQSxDQUFRLGVBQVIsRUFBVixLQUFGLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLEtBQUQsR0FBQTtBQUNmLElBQUEsS0FBSyxDQUFDLFVBQU4sQ0FFRTtBQUFBLE1BQUEsR0FBQSxFQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBWCxDQUFvQixjQUFwQixDQUFMO0FBQUEsTUFFQSxTQUFBLEVBQ0U7QUFBQSxRQUFBLE9BQUEsRUFDRTtBQUFBLFVBQUEsSUFBQSxFQUFNLENBQ0osY0FESSxFQUVKLFVBRkksRUFHSixZQUhJLEVBSUosV0FKSSxFQUtKLGFBTEksRUFNSixpQ0FOSSxDQUFOO0FBQUEsVUFRQSxVQUFBLEVBQ0U7QUFBQSxZQUFBLE9BQUEsRUFBUyxLQUFUO1dBVEY7U0FERjtBQUFBLFFBV0EsR0FBQSxFQUFLLFNBQUEsR0FBQTtpQkFDSCxDQUFFLFVBQUYsRUFERztRQUFBLENBWEw7T0FIRjtLQUZGLENBQUEsQ0FBQTtBQUFBLElBbUJBLEtBQUssQ0FBQyxZQUFOLENBQW1CLGNBQW5CLENBbkJBLENBQUE7QUFBQSxJQW9CQSxLQUFLLENBQUMsWUFBTixDQUFtQixrQkFBbkIsQ0FwQkEsQ0FBQTtBQUFBLElBc0JBLEtBQUssQ0FBQyxZQUFOLENBQW1CLFVBQW5CLEVBQStCLFNBQUEsR0FBQTtBQUM3QixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsS0FBRCxDQUFBLENBQVAsQ0FBQTthQUNBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBWCxDQUNFO0FBQUEsUUFBQSxHQUFBLEVBQUssS0FBTDtBQUFBLFFBQ0EsSUFBQSxFQUFNLENBQUUsTUFBRixDQUROO09BREYsRUFHRSxTQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsSUFBZCxHQUFBO0FBQ0EsUUFBQSxJQUFHLFdBQUg7QUFDRSxVQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBWCxDQUFpQixHQUFqQixDQUFBLENBREY7U0FBQTtBQUVBLFFBQUEsSUFBRyxjQUFIO0FBQ0UsVUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsQ0FBQSxDQURGO1NBRkE7ZUFJQSxJQUFBLENBQUEsRUFMQTtNQUFBLENBSEYsRUFGNkI7SUFBQSxDQUEvQixDQXRCQSxDQUFBO1dBa0NBLEtBQUssQ0FBQyxZQUFOLENBQW1CLFNBQW5CLEVBQThCLENBQzVCLFVBRDRCLEVBRTVCLFdBRjRCLENBQTlCLEVBbkNlO0VBQUEsQ0FGakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/broberto/.atom/packages/js-refactor/Gruntfile.coffee
