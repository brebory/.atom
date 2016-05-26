(function() {
  var Tabularize, _;

  _ = require('underscore');

  module.exports = Tabularize = (function() {
    function Tabularize() {}

    Tabularize.tabularize = function(separator, editor) {
      _(editor.getSelections()).each(function(selection) {
        var first_row, last_column, last_row, range;
        range = selection.getBufferRange();
        first_row = range.start.row;
        last_row = range.end.row;
        last_column = range.end.column;
        selection.setBufferRange([[first_row, 0], [last_row, last_column]]);
        if (!selection.isReversed()) {
          return selection.selectToEndOfLine();
        }
      });
      return editor.mutateSelectedText(function(selection, index) {
        var i, lines, matches, num_columns, padded_columns, padded_lines, result, separator_regex, stripped_lines;
        separator_regex = RegExp(separator, 'g');
        lines = selection.getText().split("\n");
        matches = [];
        lines = _(lines).map(function(line) {
          matches.push(line.match(separator_regex) || "");
          return line.split(separator_regex);
        });
        stripped_lines = Tabularize.stripSpaces(lines);
        num_columns = _.chain(stripped_lines).map(function(cells) {
          return cells.length;
        }).max().value();
        padded_columns = (function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = num_columns - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(Tabularize.paddingColumn(i, stripped_lines));
          }
          return _results;
        })();
        padded_lines = (function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = lines.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(Tabularize.paddedLine(i, padded_columns));
          }
          return _results;
        })();
        result = _.chain(padded_lines).zip(matches).map(function(e) {
          var line;
          line = _(e).first();
          matches = _(e).last();
          line = _.chain(line).zip(matches).flatten().compact().value().join(' ');
          return Tabularize.stripTrailingWhitespace(line);
        }).value().join("\n");
        return selection.insertText(result);
      });
    };

    Tabularize.leftAlign = function(string, fieldWidth) {
      var right, spaces;
      spaces = fieldWidth - string.length;
      right = spaces;
      return "" + string + (Tabularize.repeatPadding(right));
    };

    Tabularize.stripTrailingWhitespace = function(text) {
      return text.replace(/\s+$/g, "");
    };

    Tabularize.repeatPadding = function(size) {
      return Array(size + 1).join(' ');
    };

    Tabularize.paddingColumn = function(col_index, matrix) {
      var cell, cell_size, column, _i, _len, _results;
      cell_size = 0;
      column = _(matrix).map(function(line) {
        if (line.length > col_index) {
          if (cell_size < line[col_index].length) {
            cell_size = line[col_index].length;
          }
          return line[col_index];
        } else {
          return "";
        }
      });
      _results = [];
      for (_i = 0, _len = column.length; _i < _len; _i++) {
        cell = column[_i];
        _results.push(Tabularize.leftAlign(cell, cell_size));
      }
      return _results;
    };

    Tabularize.paddedLine = function(line_index, columns) {
      return _.chain(columns).map(function(column) {
        return column[line_index];
      }).compact().value();
    };

    Tabularize.stripSpaces = function(lines) {
      return _.map(lines, function(cells) {
        return cells = _.map(cells, function(cell, i) {
          if (i === 0) {
            return Tabularize.stripTrailingWhitespace(cell);
          } else {
            return cell.trim();
          }
        });
      });
    };

    return Tabularize;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3RhYnVsYXJpemUvbGliL3RhYnVsYXJpemUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVIsQ0FBSixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDUTs0QkFFSjs7QUFBQSxJQUFBLFVBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxTQUFELEVBQVksTUFBWixHQUFBO0FBRVgsTUFBQSxDQUFBLENBQUUsTUFBTSxDQUFDLGFBQVAsQ0FBQSxDQUFGLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsU0FBQyxTQUFELEdBQUE7QUFDN0IsWUFBQSx1Q0FBQTtBQUFBLFFBQUEsS0FBQSxHQUFRLFNBQVMsQ0FBQyxjQUFWLENBQUEsQ0FBUixDQUFBO0FBQUEsUUFDQSxTQUFBLEdBQVksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUR4QixDQUFBO0FBQUEsUUFFQSxRQUFBLEdBQVcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUZyQixDQUFBO0FBQUEsUUFHQSxXQUFBLEdBQWMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUh4QixDQUFBO0FBQUEsUUFJQSxTQUFTLENBQUMsY0FBVixDQUF5QixDQUFDLENBQUMsU0FBRCxFQUFXLENBQVgsQ0FBRCxFQUFlLENBQUMsUUFBRCxFQUFVLFdBQVYsQ0FBZixDQUF6QixDQUpBLENBQUE7QUFLQSxRQUFBLElBQUEsQ0FBQSxTQUFnQixDQUFDLFVBQVYsQ0FBQSxDQUFQO2lCQUNFLFNBQVMsQ0FBQyxpQkFBVixDQUFBLEVBREY7U0FONkI7TUFBQSxDQUEvQixDQUFBLENBQUE7YUFTQSxNQUFNLENBQUMsa0JBQVAsQ0FBMEIsU0FBQyxTQUFELEVBQVksS0FBWixHQUFBO0FB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

//# sourceURL=/Users/broberto/.atom/packages/tabularize/lib/tabularize.coffee
