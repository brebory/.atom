(function() {
  var EventEmitter2, Watcher, d,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  d = (require('debug'))('refactor:watcher');

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
      d('constructor');
      Watcher.__super__.constructor.call(this);
      this.editor.onDidDestroy(this.onDestroyed);
      this.editor.onDidStopChanging(this.onBufferChanged);
      this.editor.onDidChangeCursorPosition(this.onCursorMoved);
      this.verifyGrammar();
      this.moduleManager.on('changed', this.verifyGrammar);
    }

    Watcher.prototype.destruct = function() {
      d('destruct');
      this.removeAllListeners();
      this.deactivate();
      this.moduleManager.off('changed', this.verifyGrammar);
      delete this.moduleManager;
      delete this.editor;
      return delete this.module;
    };

    Watcher.prototype.onDestroyed = function() {
      d('onDestroyed');
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
      d('deactivate');
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
      }
      return this.eventCursorMoved = true;
    };

    Watcher.prototype.onParseEnd = function(errors) {
      d('onParseEnd');
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
      d('destroyReferences');
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
      d('createReferences');
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
      d('abort');
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
      d('done');
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3JlZmFjdG9yL2xpYi93YXRjaGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5QkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFFLGdCQUFrQixPQUFBLENBQVEsZUFBUixFQUFsQixhQUFGLENBQUE7O0FBQUEsRUFDQSxDQUFBLEdBQUksQ0FBQyxPQUFBLENBQVEsT0FBUixDQUFELENBQUEsQ0FBa0Isa0JBQWxCLENBREosQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSiw4QkFBQSxDQUFBOztBQUFhLElBQUEsaUJBQUUsYUFBRixFQUFrQixNQUFsQixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsZ0JBQUEsYUFDYixDQUFBO0FBQUEsTUFENEIsSUFBQyxDQUFBLFNBQUEsTUFDN0IsQ0FBQTtBQUFBLHFFQUFBLENBQUE7QUFBQSwyREFBQSxDQUFBO0FBQUEsK0RBQUEsQ0FBQTtBQUFBLDJDQUFBLENBQUE7QUFBQSx5REFBQSxDQUFBO0FBQUEscURBQUEsQ0FBQTtBQUFBLDJDQUFBLENBQUE7QUFBQSwyREFBQSxDQUFBO0FBQUEsdURBQUEsQ0FBQTtBQUFBLGlEQUFBLENBQUE7QUFBQSxNQUFBLENBQUEsQ0FBRSxhQUFGLENBQUEsQ0FBQTtBQUFBLE1BQ0EsdUNBQUEsQ0FEQSxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBcUIsSUFBQyxDQUFBLFdBQXRCLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxpQkFBUixDQUEwQixJQUFDLENBQUEsZUFBM0IsQ0FMQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsTUFBTSxDQUFDLHlCQUFSLENBQWtDLElBQUMsQ0FBQSxhQUFuQyxDQU5B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

//# sourceURL=/Users/broberto/.atom/packages/refactor/lib/watcher.coffee
