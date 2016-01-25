(function() {
  var JadeProvider, jade, loophole, _ref;

  _ref = [], loophole = _ref[0], jade = _ref[1];

  module.exports = JadeProvider = (function() {
    function JadeProvider() {}

    JadeProvider.prototype.fromScopeName = 'source.jade';

    JadeProvider.prototype.toScopeName = 'text.html.basic';

    JadeProvider.prototype.transform = function(code, _arg) {
      var filePath, options;
      filePath = (_arg != null ? _arg : {}).filePath;
      if (jade == null) {
        jade = this.unsafe(function() {
          return require('jade');
        });
      }
      options = {
        pretty: true,
        filename: filePath
      };
      return {
        code: this.unsafe(function() {
          return jade.render(code, options);
        }),
        sourceMap: null
      };
    };

    JadeProvider.prototype.unsafe = function(fn) {
      var allowUnsafeEval, allowUnsafeNewFunction;
      if (loophole == null) {
        loophole = require('loophole');
      }
      allowUnsafeEval = loophole.allowUnsafeEval, allowUnsafeNewFunction = loophole.allowUnsafeNewFunction;
      return allowUnsafeNewFunction(function() {
        return allowUnsafeEval(function() {
          return fn();
        });
      });
    };

    return JadeProvider;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3NvdXJjZS1wcmV2aWV3LWphZGUvbGliL2phZGUtcHJvdmlkZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtDQUFBOztBQUFBLEVBQUEsT0FBbUIsRUFBbkIsRUFBQyxrQkFBRCxFQUFXLGNBQVgsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007OEJBQ0o7O0FBQUEsMkJBQUEsYUFBQSxHQUFlLGFBQWYsQ0FBQTs7QUFBQSwyQkFDQSxXQUFBLEdBQWEsaUJBRGIsQ0FBQTs7QUFBQSwyQkFHQSxTQUFBLEdBQVcsU0FBQyxJQUFELEVBQU8sSUFBUCxHQUFBO0FBQ1QsVUFBQSxpQkFBQTtBQUFBLE1BRGlCLDJCQUFELE9BQWEsSUFBWixRQUNqQixDQUFBOztRQUFBLE9BQVEsSUFBQyxDQUFBLE1BQUQsQ0FBUSxTQUFBLEdBQUE7aUJBQUcsT0FBQSxDQUFRLE1BQVIsRUFBSDtRQUFBLENBQVI7T0FBUjtBQUFBLE1BRUEsT0FBQSxHQUNFO0FBQUEsUUFBQSxNQUFBLEVBQVEsSUFBUjtBQUFBLFFBQ0EsUUFBQSxFQUFVLFFBRFY7T0FIRixDQUFBO2FBTUE7QUFBQSxRQUNFLElBQUEsRUFBTSxJQUFDLENBQUEsTUFBRCxDQUFRLFNBQUEsR0FBQTtpQkFBRyxJQUFJLENBQUMsTUFBTCxDQUFZLElBQVosRUFBa0IsT0FBbEIsRUFBSDtRQUFBLENBQVIsQ0FEUjtBQUFBLFFBRUUsU0FBQSxFQUFXLElBRmI7UUFQUztJQUFBLENBSFgsQ0FBQTs7QUFBQSwyQkFlQSxNQUFBLEdBQVEsU0FBQyxFQUFELEdBQUE7QUFDTixVQUFBLHVDQUFBOztRQUFBLFdBQVksT0FBQSxDQUFRLFVBQVI7T0FBWjtBQUFBLE1BQ0MsMkJBQUEsZUFBRCxFQUFrQixrQ0FBQSxzQkFEbEIsQ0FBQTthQUVBLHNCQUFBLENBQXVCLFNBQUEsR0FBQTtlQUFHLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUFHLEVBQUEsQ0FBQSxFQUFIO1FBQUEsQ0FBaEIsRUFBSDtNQUFBLENBQXZCLEVBSE07SUFBQSxDQWZSLENBQUE7O3dCQUFBOztNQUpGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/source-preview-jade/lib/jade-provider.coffee
