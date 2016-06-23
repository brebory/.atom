'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DocSet = require('./docset');
var Resource = require('./resource');

var Library = (function () {
  _createClass(Library, null, [{
    key: 'RESOURCE_NAME_',
    value: 'docs.json',
    enumerable: true
  }, {
    key: 'REFRESH_PERIOD_MS_',
    value: 6 * 60 * 60 * 1000,
    enumerable: true
  }, {
    key: 'DEFAULT_DOCSETS_',
    value: new Set(['css', 'dom', 'dom_events', 'html', 'http', 'javascript']),
    enumerable: true
  }]);

  function Library() {
    var _this = this;

    _classCallCheck(this, Library);

    this.eventQueue_ = Promise.resolve();
    this.catalog_ = null;

    this.fetchLibrary_();
    setInterval(function () {
      _this.fetchLibrary_();
    }, Library.REFRESH_PERIOD_MS_);
  }

  _createClass(Library, [{
    key: 'get',
    value: function get(id) {
      return this.catalog_[id];
    }
  }, {
    key: 'queryAll',
    value: function queryAll() {
      var ret = [];
      for (var id in this.catalog_) {
        ret = ret.concat(this.catalog_[id].queryAll());
      }
      return ret;
    }
  }, {
    key: 'fetchLibrary_',
    value: function fetchLibrary_() {
      var _this2 = this;

      this.eventQueue_ = this.eventQueue_.then(function () {
        return Resource.get(Library.RESOURCE_NAME_, true);
      }).then(function (text) {
        _this2.buildCatalog_(JSON.parse(text));
        Resource.collectGarbage(_this2);
      });
    }
  }, {
    key: 'buildCatalog_',
    value: function buildCatalog_(items) {
      var catalog = {};

      for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        catalog[item.slug] = new DocSet(item);

        var schema = {
          title: item.name,
          type: 'boolean',
          'default': Library.DEFAULT_DOCSETS_.has(item.slug)
        };

        atom.config.setSchema('api-docs.' + item.slug, schema);
      }

      this.catalog_ = catalog;
    }
  }]);

  return Library;
})();

module.exports = Library;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvbGlicmFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7OztBQUVaLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBRWpDLE9BQU87ZUFBUCxPQUFPOztXQUNhLFdBQVc7Ozs7V0FDUCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJOzs7O1dBQ3BCLElBQUksR0FBRyxDQUFDLENBQ2hDLEtBQUssRUFDTCxLQUFLLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFDTixNQUFNLEVBQ04sWUFBWSxDQUNiLENBQUM7Ozs7QUFFUyxXQVpQLE9BQU8sR0FZRzs7OzBCQVpWLE9BQU87O0FBYVQsUUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckMsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNyQixlQUFXLENBQUMsWUFBTTtBQUFFLFlBQUssYUFBYSxFQUFFLENBQUM7S0FBRSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0dBQzFFOztlQWxCRyxPQUFPOztXQW9CUixhQUFDLEVBQUUsRUFBRTtBQUNOLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxQjs7O1dBRU8sb0JBQUc7QUFDVCxVQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixXQUFLLElBQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDOUIsV0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ2hEO0FBQ0QsYUFBTyxHQUFHLENBQUM7S0FDWjs7O1dBRVkseUJBQUc7OztBQUNkLFVBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDOUIsSUFBSSxDQUFDO2VBQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQztPQUFBLENBQUMsQ0FDdEQsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ1osZUFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLGdCQUFRLENBQUMsY0FBYyxRQUFNLENBQUM7T0FDL0IsQ0FBQyxDQUFDO0tBQ1I7OztXQUVZLHVCQUFDLEtBQUssRUFBRTtBQUNuQixVQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRW5CLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ3JDLFlBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixlQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV0QyxZQUFNLE1BQU0sR0FBRztBQUNiLGVBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNoQixjQUFJLEVBQUUsU0FBUztBQUNmLHFCQUFTLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqRCxDQUFDOztBQUVGLFlBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQ3hEOztBQUVELFVBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0tBQ3pCOzs7U0ExREcsT0FBTzs7O0FBNkRiLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvbGlicmFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5jb25zdCBEb2NTZXQgPSByZXF1aXJlKCcuL2RvY3NldCcpO1xuY29uc3QgUmVzb3VyY2UgPSByZXF1aXJlKCcuL3Jlc291cmNlJyk7XG5cbmNsYXNzIExpYnJhcnkge1xuICBzdGF0aWMgUkVTT1VSQ0VfTkFNRV8gPSAnZG9jcy5qc29uJztcbiAgc3RhdGljIFJFRlJFU0hfUEVSSU9EX01TXyA9IDYgKiA2MCAqIDYwICogMTAwMDtcbiAgc3RhdGljIERFRkFVTFRfRE9DU0VUU18gPSBuZXcgU2V0KFtcbiAgICAnY3NzJyxcbiAgICAnZG9tJyxcbiAgICAnZG9tX2V2ZW50cycsXG4gICAgJ2h0bWwnLFxuICAgICdodHRwJyxcbiAgICAnamF2YXNjcmlwdCdcbiAgXSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudFF1ZXVlXyA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHRoaXMuY2F0YWxvZ18gPSBudWxsO1xuXG4gICAgdGhpcy5mZXRjaExpYnJhcnlfKCk7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLmZldGNoTGlicmFyeV8oKTsgfSwgTGlicmFyeS5SRUZSRVNIX1BFUklPRF9NU18pO1xuICB9XG5cbiAgZ2V0KGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuY2F0YWxvZ19baWRdO1xuICB9XG5cbiAgcXVlcnlBbGwoKSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5jYXRhbG9nXykge1xuICAgICAgcmV0ID0gcmV0LmNvbmNhdCh0aGlzLmNhdGFsb2dfW2lkXS5xdWVyeUFsbCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGZldGNoTGlicmFyeV8oKSB7XG4gICAgdGhpcy5ldmVudFF1ZXVlXyA9IHRoaXMuZXZlbnRRdWV1ZV9cbiAgICAgICAgLnRoZW4oKCkgPT4gUmVzb3VyY2UuZ2V0KExpYnJhcnkuUkVTT1VSQ0VfTkFNRV8sIHRydWUpKVxuICAgICAgICAudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgICB0aGlzLmJ1aWxkQ2F0YWxvZ18oSlNPTi5wYXJzZSh0ZXh0KSk7XG4gICAgICAgICAgUmVzb3VyY2UuY29sbGVjdEdhcmJhZ2UodGhpcyk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgYnVpbGRDYXRhbG9nXyhpdGVtcykge1xuICAgIGNvbnN0IGNhdGFsb2cgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgIGNhdGFsb2dbaXRlbS5zbHVnXSA9IG5ldyBEb2NTZXQoaXRlbSk7XG5cbiAgICAgIGNvbnN0IHNjaGVtYSA9IHtcbiAgICAgICAgdGl0bGU6IGl0ZW0ubmFtZSxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBMaWJyYXJ5LkRFRkFVTFRfRE9DU0VUU18uaGFzKGl0ZW0uc2x1ZylcbiAgICAgIH07XG5cbiAgICAgIGF0b20uY29uZmlnLnNldFNjaGVtYSgnYXBpLWRvY3MuJyArIGl0ZW0uc2x1Zywgc2NoZW1hKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhdGFsb2dfID0gY2F0YWxvZztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpYnJhcnk7XG4iXX0=
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/library.js
