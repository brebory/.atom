(function() {
  var Context, Range, Ripper, d, parse,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Context = require('../vender/esrefactor').Context;

  parse = require('./parser').parse;

  Range = require('atom').Range;

  d = (require('debug'))('ripper');

  module.exports = Ripper = (function() {
    Ripper.locToRange = function(_arg) {
      var end, start;
      start = _arg.start, end = _arg.end;
      return new Range([start.line - 1, start.column], [end.line - 1, end.column]);
    };

    Ripper.scopeNames = ['source.js', 'source.js.jsx', 'source.babel'];

    Ripper.prototype.parseOptions = {
      loc: true,
      range: true,
      tokens: true,
      tolerant: true,
      sourceType: 'module',
      allowReturnOutsideFunction: true,
      features: {
        'es7.asyncFunctions': true,
        'es7.exponentiationOperator': true,
        'es7.objectRestSpread': true,
        'es7.decorators': true,
        'es7.exportExtensions': true,
        'es7.trailingFunctionCommas': true
      }
    };

    function Ripper() {
      this.context = new Context;
    }

    Ripper.prototype.destruct = function() {
      return delete this.context;
    };

    Ripper.prototype.parse = function(code, callback) {
      var column, err, line, lineNumber, loc, message, rLine, result, _ref;
      try {
        d('parse', code);
        rLine = /.*(?:\r?\n|\n?\r)/g;
        this.lines = ((function() {
          var _results;
          _results = [];
          while ((result = rLine.exec(code)) != null) {
            _results.push(result[0].length);
          }
          return _results;
        })());
        this.parseError = null;
        this.context.setCode(code, this.parseOptions);
        if (callback) {
          return callback();
        }
      } catch (_error) {
        err = _error;
        _ref = this.parseError = err, loc = _ref.loc, message = _ref.message;
        if ((loc != null) && (message != null)) {
          line = loc.line, column = loc.column;
          lineNumber = line - 1;
          if (callback) {
            return callback([
              {
                range: new Range([lineNumber, column], [lineNumber, column + 1]),
                message: message
              }
            ]);
          }
        } else {
          d('unknown error', err);
          if (callback) {
            return callback();
          }
        }
      }
    };

    Ripper.prototype.find = function(_arg) {
      var column, declaration, identification, pos, ranges, reference, references, row, _i, _len;
      row = _arg.row, column = _arg.column;
      if (this.parseError != null) {
        return;
      }
      d('find', row, column);
      pos = 0;
      while (--row >= 0) {
        pos += this.lines[row];
      }
      pos += column;
      identification = this.context.identify(pos);
      d('identification at', pos, identification);
      if (!identification) {
        return [];
      }
      declaration = identification.declaration, references = identification.references;
      if ((declaration != null) && !(__indexOf.call(references, declaration) >= 0)) {
        references.unshift(declaration);
      }
      ranges = [];
      for (_i = 0, _len = references.length; _i < _len; _i++) {
        reference = references[_i];
        ranges.push(Ripper.locToRange(reference.loc));
      }
      return ranges;
    };

    return Ripper;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2pzLXJlZmFjdG9yL2xpYi9yaXBwZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBRSxVQUFZLE9BQUEsQ0FBUSxzQkFBUixFQUFaLE9BQUYsQ0FBQTs7QUFBQSxFQUNFLFFBQVUsT0FBQSxDQUFRLFVBQVIsRUFBVixLQURGLENBQUE7O0FBQUEsRUFFRSxRQUFVLE9BQUEsQ0FBUSxNQUFSLEVBQVYsS0FGRixDQUFBOztBQUFBLEVBR0EsQ0FBQSxHQUFJLENBQUMsT0FBQSxDQUFRLE9BQVIsQ0FBRCxDQUFBLENBQWtCLFFBQWxCLENBSEosQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixJQUFBLE1BQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxJQUFELEdBQUE7QUFDWCxVQUFBLFVBQUE7QUFBQSxNQURjLGFBQUEsT0FBTyxXQUFBLEdBQ3JCLENBQUE7YUFBSSxJQUFBLEtBQUEsQ0FBTSxDQUFFLEtBQUssQ0FBQyxJQUFOLEdBQWEsQ0FBZixFQUFrQixLQUFLLENBQUMsTUFBeEIsQ0FBTixFQUF3QyxDQUFFLEdBQUcsQ0FBQyxJQUFKLEdBQVcsQ0FBYixFQUFnQixHQUFHLENBQUMsTUFBcEIsQ0FBeEMsRUFETztJQUFBLENBQWIsQ0FBQTs7QUFBQSxJQUdBLE1BQUMsQ0FBQSxVQUFELEdBQWEsQ0FDWCxXQURXLEVBRVgsZUFGVyxFQUdYLGNBSFcsQ0FIYixDQUFBOztBQUFBLHFCQVNBLFlBQUEsR0FDRTtBQUFBLE1BQUEsR0FBQSxFQUFLLElBQUw7QUFBQSxNQUNBLEtBQUEsRUFBTyxJQURQO0FBQUEsTUFFQSxNQUFBLEVBQVEsSUFGUjtBQUFBLE1BR0EsUUFBQSxFQUFVLElBSFY7QUFBQSxN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

//# sourceURL=/Users/broberto/.atom/packages/js-refactor/lib/ripper.coffee
