'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Path = require('path');
var Resource = require('./resource');

var DocSet = (function () {
  function DocSet(item) {
    _classCallCheck(this, DocSet);

    this.id_ = item.slug;
    this.name_ = item.name;
    this.type_ = item.type;
    this.version_ = item.version;
    this.indexPath_ = item.slug + '/index.json';
    this.dbPath_ = item.slug + '/db.json';
    this.version_ = item.mtime;
    this.sizeBytes_ = item.db_size;
    this.index_ = null;
    this.database_ = null;

    // TODO: dispose the returned disposable...
    atom.config.observe('api-docs.' + this.id_, this.setEnabled_.bind(this));
  }

  _createClass(DocSet, [{
    key: 'setEnabled_',
    value: function setEnabled_(enabled) {
      var _this = this;

      if (!enabled) {
        this.index_ = null;
        this.database_ = null;
        return;
      }

      var indexPromise = Resource.getVersion(this.indexPath_, this.version_);
      var dbPromise = Resource.getVersion(this.dbPath_, this.version_);

      Promise.all([indexPromise, dbPromise]).then(function (results) {
        _this.index_ = JSON.parse(results[0]);
        _this.database_ = JSON.parse(results[1]);

        // Fix up the paths to include the docset name.
        for (var i = 0; i < _this.index_.entries.length; ++i) {
          _this.index_.entries[i].id = _this.id_;
          _this.index_.entries[i].url = 'api-docs://' + _this.id_ + '/' + _this.index_.entries[i].path;
        }
      });
    }
  }, {
    key: 'getTitle',
    value: function getTitle(path) {
      for (var i = 0; i < this.index_.entries.length; ++i) {
        if (this.index_.entries[i].path == path) {
          return this.index_.entries[i].name;
        }
      }
      return '';
    }
  }, {
    key: 'getContent',
    value: function getContent(path) {
      return this.database_[path];
    }
  }, {
    key: 'queryAll',
    value: function queryAll() {
      if (!this.index_) {
        return [];
      }

      return this.index_.entries;
    }
  }, {
    key: 'type',
    get: function get() {
      return this.type_;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.name_;
    }
  }, {
    key: 'classNames',
    get: function get() {
      return '_content _page _' + this.type_;
    }
  }, {
    key: 'version',
    get: function get() {
      return this.version_;
    }
  }]);

  return DocSet;
})();

module.exports = DocSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvZG9jc2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7O0FBRVosSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7SUFFakMsTUFBTTtBQUNHLFdBRFQsTUFBTSxDQUNJLElBQUksRUFBRTswQkFEaEIsTUFBTTs7QUFFUixRQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN2QixRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDN0IsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztBQUM1QyxRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBQ3RDLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMzQixRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDL0IsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7OztBQUd0QixRQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQzFFOztlQWZHLE1BQU07O1dBaUNDLHFCQUFDLE9BQWlCLEVBQUU7OztBQUM3QixVQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1osWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsWUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsZUFBTztPQUNSOztBQUVELFVBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekUsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFbkUsYUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUNqQyxJQUFJLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDZixjQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLGNBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUd4QyxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsTUFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtBQUNwRCxnQkFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFLLEdBQUcsQ0FBQztBQUNyQyxnQkFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsbUJBQWlCLE1BQUssR0FBRyxTQUFJLE1BQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEFBQUUsQ0FBQztTQUN0RjtPQUNGLENBQUMsQ0FBQztLQUNSOzs7V0FFTyxrQkFBQyxJQUFJLEVBQUU7QUFDYixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ25ELFlBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtBQUN2QyxpQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDcEM7T0FDRjtBQUNELGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztXQUVTLG9CQUFDLElBQUksRUFBRTtBQUNmLGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qjs7O1dBRU8sb0JBQW1CO0FBQ3pCLFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2hCLGVBQU8sRUFBRSxDQUFDO09BQ1g7O0FBRUQsYUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUM1Qjs7O1NBMURPLGVBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7OztTQUVPLGVBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7OztTQUVhLGVBQUc7QUFDZixhQUFPLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDeEM7OztTQUVVLGVBQUc7QUFDWixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7OztTQS9CRyxNQUFNOzs7QUE4RVosTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2FwaS1kb2NzL3NyYy9kb2NzZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IFJlc291cmNlID0gcmVxdWlyZSgnLi9yZXNvdXJjZScpO1xuXG5jbGFzcyBEb2NTZXQge1xuICAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICB0aGlzLmlkXyA9IGl0ZW0uc2x1ZztcbiAgICB0aGlzLm5hbWVfID0gaXRlbS5uYW1lO1xuICAgIHRoaXMudHlwZV8gPSBpdGVtLnR5cGU7XG4gICAgdGhpcy52ZXJzaW9uXyA9IGl0ZW0udmVyc2lvbjtcbiAgICB0aGlzLmluZGV4UGF0aF8gPSBpdGVtLnNsdWcgKyAnL2luZGV4Lmpzb24nO1xuICAgIHRoaXMuZGJQYXRoXyA9IGl0ZW0uc2x1ZyArICcvZGIuanNvbic7XG4gICAgdGhpcy52ZXJzaW9uXyA9IGl0ZW0ubXRpbWU7XG4gICAgdGhpcy5zaXplQnl0ZXNfID0gaXRlbS5kYl9zaXplO1xuICAgIHRoaXMuaW5kZXhfID0gbnVsbDtcbiAgICB0aGlzLmRhdGFiYXNlXyA9IG51bGw7XG5cbiAgICAvLyBUT0RPOiBkaXNwb3NlIHRoZSByZXR1cm5lZCBkaXNwb3NhYmxlLi4uXG4gICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnYXBpLWRvY3MuJyArIHRoaXMuaWRfLCB0aGlzLnNldEVuYWJsZWRfLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZV87XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXztcbiAgfVxuXG4gIGdldCBjbGFzc05hbWVzKCkge1xuICAgIHJldHVybiAnX2NvbnRlbnQgX3BhZ2UgXycgKyB0aGlzLnR5cGVfO1xuICB9XG5cbiAgZ2V0IHZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbl87XG4gIH1cblxuICBzZXRFbmFibGVkXyhlbmFibGVkIDogYm9vbGVhbikge1xuICAgIGlmICghZW5hYmxlZCkge1xuICAgICAgdGhpcy5pbmRleF8gPSBudWxsO1xuICAgICAgdGhpcy5kYXRhYmFzZV8gPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4UHJvbWlzZSA9IFJlc291cmNlLmdldFZlcnNpb24odGhpcy5pbmRleFBhdGhfLCB0aGlzLnZlcnNpb25fKTtcbiAgICBjb25zdCBkYlByb21pc2UgPSBSZXNvdXJjZS5nZXRWZXJzaW9uKHRoaXMuZGJQYXRoXywgdGhpcy52ZXJzaW9uXyk7XG5cbiAgICBQcm9taXNlLmFsbChbaW5kZXhQcm9taXNlLCBkYlByb21pc2VdKVxuICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgICB0aGlzLmluZGV4XyA9IEpTT04ucGFyc2UocmVzdWx0c1swXSk7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZV8gPSBKU09OLnBhcnNlKHJlc3VsdHNbMV0pO1xuXG4gICAgICAgICAgLy8gRml4IHVwIHRoZSBwYXRocyB0byBpbmNsdWRlIHRoZSBkb2NzZXQgbmFtZS5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0aGlzLmluZGV4Xy5lbnRyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4Xy5lbnRyaWVzW2ldLmlkID0gdGhpcy5pZF87XG4gICAgICAgICAgICB0aGlzLmluZGV4Xy5lbnRyaWVzW2ldLnVybCA9IGBhcGktZG9jczovLyR7dGhpcy5pZF99LyR7dGhpcy5pbmRleF8uZW50cmllc1tpXS5wYXRofWA7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIGdldFRpdGxlKHBhdGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW5kZXhfLmVudHJpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0aGlzLmluZGV4Xy5lbnRyaWVzW2ldLnBhdGggPT0gcGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleF8uZW50cmllc1tpXS5uYW1lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRDb250ZW50KHBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZV9bcGF0aF07XG4gIH1cblxuICBxdWVyeUFsbCgpIDogQXJyYXk8T2JqZWN0PiB7XG4gICAgaWYgKCF0aGlzLmluZGV4Xykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluZGV4Xy5lbnRyaWVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jU2V0O1xuIl19
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/docset.js
