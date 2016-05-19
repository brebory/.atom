(function() {
  var bunyan, fs, logStream, path;

  bunyan = require('bunyan');

  path = require('path');

  fs = require('fs');

  logStream = fs.createWriteStream(path.join(__dirname, '..', '/debugger.log'));

  module.exports = bunyan.createLogger({
    name: 'debugger',
    stream: logStream,
    level: 'info'
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL2xvZ2dlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkJBQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FBVCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxTQUFBLEdBQVksRUFBRSxDQUFDLGlCQUFILENBQXFCLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixJQUFyQixFQUEyQixlQUEzQixDQUFyQixDQUpaLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQUFNLENBQUMsWUFBUCxDQUFvQjtBQUFBLElBQ25DLElBQUEsRUFBTSxVQUQ2QjtBQUFBLElBRW5DLE1BQUEsRUFBUSxTQUYyQjtBQUFBLElBR25DLEtBQUEsRUFBTyxNQUg0QjtHQUFwQixDQU5qQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/logger.coffee
