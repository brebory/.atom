(function() {
  var PugProvider, loophole, pug, _ref;

  _ref = [], loophole = _ref[0], pug = _ref[1];

  module.exports = PugProvider = (function() {
    function PugProvider() {}

    PugProvider.prototype.fromScopeName = 'source.pug';

    PugProvider.prototype.toScopeName = 'text.html.basic';

    PugProvider.prototype.transform = function(code, _arg) {
      var filePath, options;
      filePath = (_arg != null ? _arg : {}).filePath;
      if (pug == null) {
        pug = this.unsafe(function() {
          return require('pug');
        });
      }
      options = {
        pretty: true,
        filename: filePath
      };
      return {
        code: this.unsafe(function() {
          return pug.render(code, options);
        }),
        sourceMap: null
      };
    };

    PugProvider.prototype.unsafe = function(fn) {
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

    return PugProvider;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3NvdXJjZS1wcmV2aWV3LXB1Zy9saWIvcHVnLXByb3ZpZGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQ0FBQTs7QUFBQSxFQUFBLE9BQWtCLEVBQWxCLEVBQUMsa0JBQUQsRUFBVyxhQUFYLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNOzZCQUNKOztBQUFBLDBCQUFBLGFBQUEsR0FBZSxZQUFmLENBQUE7O0FBQUEsMEJBQ0EsV0FBQSxHQUFhLGlCQURiLENBQUE7O0FBQUEsMEJBR0EsU0FBQSxHQUFXLFNBQUMsSUFBRCxFQUFPLElBQVAsR0FBQTtBQUNULFVBQUEsaUJBQUE7QUFBQSxNQURpQiwyQkFBRCxPQUFhLElBQVosUUFDakIsQ0FBQTs7UUFBQSxNQUFPLElBQUMsQ0FBQSxNQUFELENBQVEsU0FBQSxHQUFBO2lCQUFHLE9BQUEsQ0FBUSxLQUFSLEVBQUg7UUFBQSxDQUFSO09BQVA7QUFBQSxNQUVBLE9BQUEsR0FDRTtBQUFBLFFBQUEsTUFBQSxFQUFRLElBQVI7QUFBQSxRQUNBLFFBQUEsRUFBVSxRQURWO09BSEYsQ0FBQTthQU1BO0FBQUEsUUFDRSxJQUFBLEVBQU0sSUFBQyxDQUFBLE1BQUQsQ0FBUSxTQUFBLEdBQUE7aUJBQUcsR0FBRyxDQUFDLE1BQUosQ0FBVyxJQUFYLEVBQWlCLE9BQWpCLEVBQUg7UUFBQSxDQUFSLENBRFI7QUFBQSxRQUVFLFNBQUEsRUFBVyxJQUZiO1FBUFM7SUFBQSxDQUhYLENBQUE7O0FBQUEsMEJBZUEsTUFBQSxHQUFRLFNBQUMsRUFBRCxHQUFBO0FBQ04sVUFBQSx1Q0FBQTs7UUFBQSxXQUFZLE9BQUEsQ0FBUSxVQUFSO09BQVo7QUFBQSxNQUNDLDJCQUFBLGVBQUQsRUFBa0Isa0NBQUEsc0JBRGxCLENBQUE7YUFFQSxzQkFBQSxDQUF1QixTQUFBLEdBQUE7ZUFBRyxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFBRyxFQUFBLENBQUEsRUFBSDtRQUFBLENBQWhCLEVBQUg7TUFBQSxDQUF2QixFQUhNO0lBQUEsQ0FmUixDQUFBOzt1QkFBQTs7TUFKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/source-preview-pug/lib/pug-provider.coffee
