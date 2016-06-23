'use babel';

// Demand-load these modules.

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DocView = null;
var QueryView = null;

var CompositeDisposable = require('atom').CompositeDisposable;
var Library = require('./library');
var Url = require('url');

var Application = (function () {
  _createClass(Application, null, [{
    key: 'LAZY_LOAD_DELAY_MS_',
    value: 3000,
    enumerable: true
  }]);

  function Application() {
    _classCallCheck(this, Application);

    this.subscriptions_ = new CompositeDisposable();
    this.library_ = new Library();

    setTimeout(this.lazyLoad_.bind(this), Application.LAZY_LOAD_DELAY_MS_);
  }

  _createClass(Application, [{
    key: 'activate',
    value: function activate(state) {
      // Keep all Disposables in a composite so we can clean up easily.
      this.subscriptions_.add(atom.commands.add('atom-workspace', { 'api-docs:search-under-cursor': this.searchUnderCursor_.bind(this) }));
      this.subscriptions_.add(atom.workspace.addOpener(this.opener_.bind(this)));
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.subscriptions_.dispose();
    }
  }, {
    key: 'searchUnderCursor_',
    value: function searchUnderCursor_() {
      var editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return;
      }

      var grammar = editor.getGrammar();
      var selectedText = editor.getSelectedText();
      var wordUnderCursor = editor.getWordUnderCursor({ includeNonWordCharacters: false });
      var items = this.library_.queryAll();

      var searchQuery = selectedText ? selectedText : wordUnderCursor;

      this.lazyLoad_();
      new QueryView(searchQuery, items);
    }
  }, {
    key: 'opener_',
    value: function opener_(url) {
      if (Url.parse(url).protocol == 'api-docs:') {
        this.lazyLoad_();
        return new DocView(this.library_, url);
      }
    }
  }, {
    key: 'lazyLoad_',
    value: function lazyLoad_() {
      if (!QueryView) {
        QueryView = require('./query_view');
      }
      if (!DocView) {
        DocView = require('./doc_view');
      }
    }
  }]);

  return Application;
})();

var instance = new Application();
module.exports = {
  config: {
    '_theme': {
      title: 'Theme',
      description: 'This styles the documentation window.',
      type: 'string',
      'default': 'Light',
      'enum': ['Light', 'Dark']
    }
  },

  activate: function activate() {
    instance.activate();
  },

  deactivate: function deactivate() {
    instance.deactivate();
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7Ozs7O0FBR1osSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ25CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQzs7QUFFckIsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsbUJBQW1CLENBQUM7QUFDaEUsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFFckIsV0FBVztlQUFYLFdBQVc7O1dBQ2MsSUFBSTs7OztBQUV0QixXQUhQLFdBQVcsR0FHRDswQkFIVixXQUFXOztBQUliLFFBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0FBQ2hELFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7QUFFOUIsY0FBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0dBQ3hFOztlQVJHLFdBQVc7O1dBVVAsa0JBQUMsS0FBSyxFQUFFOztBQUVkLFVBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNySSxVQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUU7OztXQUVTLHNCQUFHO0FBQ1gsVUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMvQjs7O1dBRWlCLDhCQUFHO0FBQ25CLFVBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUNwRCxVQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZUFBTztPQUNSOztBQUVELFVBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQyxVQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDOUMsVUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN2RixVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOztBQUV2QyxVQUFNLFdBQVcsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLGVBQWUsQ0FBQzs7QUFFbEUsVUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLFVBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNuQzs7O1dBRU0saUJBQUMsR0FBRyxFQUFFO0FBQ1gsVUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7QUFDMUMsWUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLGVBQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztPQUN4QztLQUNGOzs7V0FFUSxxQkFBRztBQUNWLFVBQUksQ0FBQyxTQUFTLEVBQUU7QUFDZCxpQkFBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztPQUNyQztBQUNELFVBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixlQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO09BQ2pDO0tBQ0Y7OztTQW5ERyxXQUFXOzs7QUFzRGpCLElBQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNmLFFBQU0sRUFBRTtBQUNOLFlBQVEsRUFBRTtBQUNSLFdBQUssRUFBRSxPQUFPO0FBQ2QsaUJBQVcsRUFBRSx1Q0FBdUM7QUFDcEQsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxPQUFPO0FBQ2hCLGNBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQ3hCO0dBQ0Y7O0FBRUQsVUFBUSxFQUFFLG9CQUFXO0FBQ25CLFlBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUNyQjs7QUFFRCxZQUFVLEVBQUUsc0JBQVc7QUFDckIsWUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ3ZCO0NBQ0YsQ0FBQyIsImZpbGUiOiIvVXNlcnMvYnJvYmVydG8vLmF0b20vcGFja2FnZXMvYXBpLWRvY3Mvc3JjL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuLy8gRGVtYW5kLWxvYWQgdGhlc2UgbW9kdWxlcy5cbnZhciBEb2NWaWV3ID0gbnVsbDtcbnZhciBRdWVyeVZpZXcgPSBudWxsO1xuXG5jb25zdCBDb21wb3NpdGVEaXNwb3NhYmxlID0gcmVxdWlyZSgnYXRvbScpLkNvbXBvc2l0ZURpc3Bvc2FibGU7XG5jb25zdCBMaWJyYXJ5ID0gcmVxdWlyZSgnLi9saWJyYXJ5Jyk7XG5jb25zdCBVcmwgPSByZXF1aXJlKCd1cmwnKTtcblxuY2xhc3MgQXBwbGljYXRpb24ge1xuICBzdGF0aWMgTEFaWV9MT0FEX0RFTEFZX01TXyA9IDMwMDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zXyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5saWJyYXJ5XyA9IG5ldyBMaWJyYXJ5KCk7XG5cbiAgICBzZXRUaW1lb3V0KHRoaXMubGF6eUxvYWRfLmJpbmQodGhpcyksIEFwcGxpY2F0aW9uLkxBWllfTE9BRF9ERUxBWV9NU18pO1xuICB9XG5cbiAgYWN0aXZhdGUoc3RhdGUpIHtcbiAgICAvLyBLZWVwIGFsbCBEaXNwb3NhYmxlcyBpbiBhIGNvbXBvc2l0ZSBzbyB3ZSBjYW4gY2xlYW4gdXAgZWFzaWx5LlxuICAgIHRoaXMuc3Vic2NyaXB0aW9uc18uYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHsgJ2FwaS1kb2NzOnNlYXJjaC11bmRlci1jdXJzb3InOiB0aGlzLnNlYXJjaFVuZGVyQ3Vyc29yXy5iaW5kKHRoaXMpIH0pKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnNfLmFkZChhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIodGhpcy5vcGVuZXJfLmJpbmQodGhpcykpKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zXy5kaXNwb3NlKCk7XG4gIH1cblxuICBzZWFyY2hVbmRlckN1cnNvcl8oKSB7XG4gICAgY29uc3QgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpO1xuICAgIGlmICghZWRpdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ3JhbW1hciA9IGVkaXRvci5nZXRHcmFtbWFyKCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLmdldFNlbGVjdGVkVGV4dCgpO1xuICAgIGNvbnN0IHdvcmRVbmRlckN1cnNvciA9IGVkaXRvci5nZXRXb3JkVW5kZXJDdXJzb3IoeyBpbmNsdWRlTm9uV29yZENoYXJhY3RlcnM6IGZhbHNlIH0pO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5saWJyYXJ5Xy5xdWVyeUFsbCgpO1xuXG4gICAgY29uc3Qgc2VhcmNoUXVlcnkgPSBzZWxlY3RlZFRleHQgPyBzZWxlY3RlZFRleHQgOiB3b3JkVW5kZXJDdXJzb3I7XG5cbiAgICB0aGlzLmxhenlMb2FkXygpO1xuICAgIG5ldyBRdWVyeVZpZXcoc2VhcmNoUXVlcnksIGl0ZW1zKTtcbiAgfVxuXG4gIG9wZW5lcl8odXJsKSB7XG4gICAgaWYgKFVybC5wYXJzZSh1cmwpLnByb3RvY29sID09ICdhcGktZG9jczonKSB7XG4gICAgICB0aGlzLmxhenlMb2FkXygpO1xuICAgICAgcmV0dXJuIG5ldyBEb2NWaWV3KHRoaXMubGlicmFyeV8sIHVybCk7XG4gICAgfVxuICB9XG5cbiAgbGF6eUxvYWRfKCkge1xuICAgIGlmICghUXVlcnlWaWV3KSB7XG4gICAgICBRdWVyeVZpZXcgPSByZXF1aXJlKCcuL3F1ZXJ5X3ZpZXcnKTtcbiAgICB9XG4gICAgaWYgKCFEb2NWaWV3KSB7XG4gICAgICBEb2NWaWV3ID0gcmVxdWlyZSgnLi9kb2NfdmlldycpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBpbnN0YW5jZSA9IG5ldyBBcHBsaWNhdGlvbigpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbmZpZzoge1xuICAgICdfdGhlbWUnOiB7XG4gICAgICB0aXRsZTogJ1RoZW1lJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBzdHlsZXMgdGhlIGRvY3VtZW50YXRpb24gd2luZG93LicsXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlZmF1bHQ6ICdMaWdodCcsXG4gICAgICBlbnVtOiBbJ0xpZ2h0JywgJ0RhcmsnXVxuICAgIH1cbiAgfSxcblxuICBhY3RpdmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgaW5zdGFuY2UuYWN0aXZhdGUoKTtcbiAgfSxcblxuICBkZWFjdGl2YXRlOiBmdW5jdGlvbigpIHtcbiAgICBpbnN0YW5jZS5kZWFjdGl2YXRlKCk7XG4gIH1cbn07XG4iXX0=
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/main.js
