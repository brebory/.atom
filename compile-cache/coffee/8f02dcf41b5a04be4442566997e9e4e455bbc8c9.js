(function() {
  var EventEmitter2, Watcher, d,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  d = (require('debug'))('watcher');

  module.exports = Watcher = (function(_super) {
    __extends(Watcher, _super);

    function Watcher(moduleManager, editor) {
      this.moduleManager = moduleManager;
      this.editor = editor;
      this.onCursorMovedAfter = __bind(this.onCursorMovedAfter, this);
      this.onCursorMoved = __bind(this.onCursorMoved, this);
      this.onBufferChanged = __bind(this.onBufferChanged, this);
      this.abort = __bind(this.abort, this);
      this.createErrors = __bind(this.createErrors, this);
      this.onParseEnd = __bind(this.onParseEnd, this);
      this.parse = __bind(this.parse, this);
      this.verifyGrammar = __bind(this.verifyGrammar, this);
      this.onDestroyed = __bind(this.onDestroyed, this);
      this.destruct = __bind(this.destruct, this);
      Watcher.__super__.constructor.call(this);
      this.editor.onDidDestroy(this.onDestroyed);
      this.editor.onDidStopChanging(this.onBufferChanged);
      this.editor.onDidChangeCursorPosition(this.onCursorMoved);
      this.verifyGrammar();
      this.moduleManager.on('changed', this.verifyGrammar);
    }

    Watcher.prototype.destruct = function() {
      this.removeAllListeners();
      this.deactivate();
      this.moduleManager.off('changed', this.verifyGrammar);
      delete this.moduleManager;
      delete this.editor;
      return delete this.module;
    };

    Watcher.prototype.onDestroyed = function() {
      if (!this.eventDestroyed) {
        return;
      }
      return this.emit('destroyed', this);
    };


    /*
    Grammar valification process
    1. Detect grammar changed.
    2. Destroy instances and listeners.
    3. Exit process when the language plugin of the grammar can't be found.
    4. Create instances and listeners.
     */

    Watcher.prototype.verifyGrammar = function() {
      var module, scopeName;
      scopeName = this.editor.getGrammar().scopeName;
      module = this.moduleManager.getModule(scopeName);
      d('verify grammar', scopeName, module);
      if (module === this.module) {
        return;
      }
      this.deactivate();
      if (module == null) {
        return;
      }
      this.module = module;
      return this.activate();
    };

    Watcher.prototype.activate = function() {
      this.ripper = new this.module.Ripper();
      this.eventCursorMoved = true;
      this.eventDestroyed = true;
      this.eventBufferChanged = true;
      d('activate and parse');
      return this.parse();
    };

    Watcher.prototype.deactivate = function() {
      var _ref;
      this.cursorMoved = false;
      this.eventCursorMoved = false;
      this.eventDestroyed = false;
      this.eventBufferChanged = false;
      clearTimeout(this.bufferChangedTimeoutId);
      clearTimeout(this.cursorMovedTimeoutId);
      if ((_ref = this.ripper) != null) {
        _ref.destruct();
      }
      delete this.bufferChangedTimeoutId;
      delete this.cursorMovedTimeoutId;
      delete this.module;
      delete this.ripper;
      delete this.renamingCursor;
      return delete this.renamingMarkers;
    };


    /*
    Reference finder process
    1. Stop listening cursor move event and reset views.
    2. Parse.
    3. Show errors and exit process when compile error is thrown.
    4. Show references.
    5. Start listening cursor move event.
     */

    Watcher.prototype.parse = function() {
      var text;
      d('parse');
      this.eventCursorMoved = false;
      text = this.editor.buffer.getText();
      if (text !== this.cachedText) {
        this.destroyReferences();
        this.destroyErrors();
        this.cachedText = text;
        this.ripper.parse(text, this.onParseEnd);
      } else {
        this.onParseEnd();
      }
      return this.eventCursorMoved = true;
    };

    Watcher.prototype.onParseEnd = function(errors) {
      if (errors != null) {
        return this.createErrors(errors);
      } else {
        return this.createReferences();
      }
    };

    Watcher.prototype.destroyErrors = function() {
      var marker, _i, _len, _ref;
      d('destroy errors');
      if (this.errorMarkers == null) {
        return;
      }
      _ref = this.errorMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return delete this.errorMarkers;
    };

    Watcher.prototype.createErrors = function(errors) {
      var marker, message, range;
      d('create errors');
      return this.errorMarkers = (function() {
        var _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          _ref = errors[_i], range = _ref.range, message = _ref.message;
          marker = this.editor.markBufferRange(range);
          d('marker', range, marker);
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": 'refactor-error'
          });
          this.editor.decorateMarker(marker, {
            type: 'line-number',
            "class": 'refactor-error'
          });
          _results.push(marker);
        }
        return _results;
      }).call(this);
    };

    Watcher.prototype.destroyReferences = function() {
      var marker, _i, _len, _ref;
      if (this.referenceMarkers == null) {
        return;
      }
      _ref = this.referenceMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return delete this.referenceMarkers;
    };

    Watcher.prototype.createReferences = function() {
      var marker, range, ranges;
      ranges = this.ripper.find(this.editor.getSelectedBufferRange().start);
      if (!((ranges != null) && ranges.length > 0)) {
        return;
      }
      return this.referenceMarkers = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = ranges.length; _i < _len; _i++) {
          range = ranges[_i];
          marker = this.editor.markBufferRange(range);
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": 'refactor-reference'
          });
          _results.push(marker);
        }
        return _results;
      }).call(this);
    };


    /*
    Renaming life cycle.
    1. When detected rename command, start renaming process.
    2. When the cursors move out from the symbols, abort and exit renaming process.
    3. When detected done command, exit renaming process.
     */

    Watcher.prototype.rename = function() {
      var cursor, marker, range, ranges;
      if (!this.isActive()) {
        return false;
      }
      cursor = this.editor.getLastCursor();
      ranges = this.ripper.find(cursor.getBufferPosition());
      if (!((ranges != null) && ranges.length > 0)) {
        return false;
      }
      this.destroyReferences();
      this.eventBufferChanged = false;
      this.eventCursorMoved = false;
      this.renamingCursor = cursor;
      this.renamingMarkers = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = ranges.length; _i < _len; _i++) {
          range = ranges[_i];
          this.editor.addSelectionForBufferRange(range);
          marker = this.editor.markBufferRange(range);
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": 'refactor-reference'
          });
          _results.push(marker);
        }
        return _results;
      }).call(this);
      this.eventCursorMoved = false;
      this.eventCursorMoved = 'abort';
      return true;
    };

    Watcher.prototype.abort = function() {
      var isMarkerContainsCursor, isMarkersContainsCursors, marker, markerRange, selectedRange, selectedRanges, _i, _j, _len, _len1, _ref;
      if (!(this.isActive() && (this.renamingCursor != null) && (this.renamingMarkers != null))) {
        return;
      }
      selectedRanges = this.editor.getSelectedBufferRanges();
      isMarkersContainsCursors = true;
      _ref = this.renamingMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        markerRange = marker.getBufferRange();
        isMarkerContainsCursor = false;
        for (_j = 0, _len1 = selectedRanges.length; _j < _len1; _j++) {
          selectedRange = selectedRanges[_j];
          isMarkerContainsCursor || (isMarkerContainsCursor = markerRange.containsRange(selectedRange));
          if (isMarkerContainsCursor) {
            break;
          }
        }
        isMarkersContainsCursors && (isMarkersContainsCursors = isMarkerContainsCursor);
        if (!isMarkersContainsCursors) {
          break;
        }
      }
      if (isMarkersContainsCursors) {
        return;
      }
      return this.done();
    };

    Watcher.prototype.done = function() {
      var marker, _i, _len, _ref;
      if (!(this.isActive() && (this.renamingCursor != null) && (this.renamingMarkers != null))) {
        return false;
      }
      this.eventCursorMoved = false;
      this.editor.setCursorBufferPosition(this.renamingCursor.getBufferPosition());
      delete this.renamingCursor;
      _ref = this.renamingMarkers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      delete this.renamingMarkers;
      d('done and reparse');
      this.parse();
      this.eventBufferChanged = true;
      this.eventCursorMoved = true;
      return true;
    };


    /*
    User events
     */

    Watcher.prototype.onBufferChanged = function() {
      if (!this.eventBufferChanged) {
        return;
      }
      d('buffer changed');
      return this.parse();
    };

    Watcher.prototype.onCursorMoved = function() {
      if (!this.eventCursorMoved) {
        return;
      }
      if (this.eventCursorMoved === 'abort') {
        return this.abort();
      } else {
        clearTimeout(this.cursorMovedTimeoutId);
        return this.cursorMovedTimeoutId = setTimeout(this.onCursorMovedAfter, 100);
      }
    };

    Watcher.prototype.onCursorMovedAfter = function() {
      this.destroyReferences();
      return this.createReferences();
    };


    /*
    Utility
     */

    Watcher.prototype.isActive = function() {
      return (this.module != null) && atom.workspace.getActivePaneItem() === this.editor;
    };

    Watcher.prototype.rangeToRows = function(_arg) {
      var end, pixel, point, raw, rowRange, start, _i, _ref, _ref1, _results;
      start = _arg.start, end = _arg.end;
      _results = [];
      for (raw = _i = _ref = start.row, _ref1 = end.row; _i <= _ref1; raw = _i += 1) {
        rowRange = this.editor.buffer.rangeForRow(raw);
        point = {
          left: raw === start.row ? start : rowRange.start,
          right: raw === end.row ? end : rowRange.end
        };
        pixel = {
          tl: this.editorView.pixelPositionForBufferPosition(point.left),
          br: this.editorView.pixelPositionForBufferPosition(point.right)
        };
        pixel.br.top += this.editorView.lineHeight;
        _results.push(pixel);
      }
      return _results;
    };

    return Watcher;

  })(EventEmitter2);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3JlZmFjdG9yL2xpYi93YXRjaGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5QkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFFLGdCQUFrQixPQUFBLENBQVEsZUFBUixFQUFsQixhQUFGLENBQUE7O0FBQUEsRUFDQSxDQUFBLEdBQUksQ0FBQyxPQUFBLENBQVEsT0FBUixDQUFELENBQUEsQ0FBa0IsU0FBbEIsQ0FESixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLDhCQUFBLENBQUE7O0FBQWEsSUFBQSxpQkFBRSxhQUFGLEVBQWtCLE1BQWxCLEdBQUE7QUFDWCxNQURZLElBQUMsQ0FBQSxnQkFBQSxhQUNiLENBQUE7QUFBQSxNQUQ0QixJQUFDLENBQUEsU0FBQSxNQUM3QixDQUFBO0FBQUEscUVBQUEsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSwrREFBQSxDQUFBO0FBQUEsMkNBQUEsQ0FBQTtBQUFBLHlEQUFBLENBQUE7QUFBQSxxREFBQSxDQUFBO0FBQUEsMkNBQUEsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSx1REFBQSxDQUFBO0FBQUEsaURBQUEsQ0FBQTtBQUFBLE1BQUEsdUNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBcUIsSUFBQyxDQUFBLFdBQXRCLENBSEEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxpQkFBUixDQUEwQixJQUFDLENBQUEsZUFBM0IsQ0FKQSxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsTUFBTSxDQUFDLHlCQUFSLENBQWtDLElBQUMsQ0FBQSxhQUFuQyxDQUxBLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxhQUFELENBQUEs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

//# sourceURL=/Users/broberto/.atom/packages/refactor/lib/watcher.coffee
