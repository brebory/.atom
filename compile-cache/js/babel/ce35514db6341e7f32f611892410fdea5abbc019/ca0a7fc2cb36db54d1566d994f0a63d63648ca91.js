'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');
var SelectListView = require('atom-space-pen-views').SelectListView;

var QueryView = (function (_SelectListView) {
  _inherits(QueryView, _SelectListView);

  function QueryView(word, items) {
    _classCallCheck(this, QueryView);

    _get(Object.getPrototypeOf(QueryView.prototype), 'constructor', this).call(this);

    this.confirmed_ = false;
    this.setViewPromise_ = null;
    this.docView_ = null;
    this.panel_ = atom.workspace.addModalPanel({ item: this });

    this.filterEditorView.setText(word);
    this.setMaxItems(50);
    this.setItems(items);
    this.storeFocusedElement();
    this.focusFilterEditor();
  }

  _createClass(QueryView, [{
    key: 'viewForItem',
    value: function viewForItem(item) {
      // HTML escape item.name.
      var text = $('<div/>').text(item.name).html();
      return '<li><div><img class="api-docs-icon" src="atom://api-docs/images/icon-' + item.id + '.png" />' + text + '</div></li>';
    }
  }, {
    key: 'confirmed',
    value: function confirmed(item) {
      this.confirmed_ = true;
      this.showViewForItem(item);
      this.filterEditorView.blur();
    }
  }, {
    key: 'cancelled',
    value: function cancelled() {
      if (!this.confirmed_ && this.docView_) {
        this.docView_.destroy();
      }

      this.panel_.destroy();
    }
  }, {
    key: 'getFilterKey',
    value: function getFilterKey() {
      return 'name';
    }
  }, {
    key: 'showViewForItem',
    value: function showViewForItem(item) {
      var _this = this;

      if (!this.setViewPromise_) {
        this.setViewPromise_ = atom.workspace.open('api-docs://', { split: 'right', activatePane: false }).then(function (docView) {
          _this.docView_ = docView;
          _this.docView_.setView(item.url);
        });
      } else {
        this.setViewPromise_ = this.setViewPromise_.then(function () {
          _this.docView_.setView(item.url);
        });
      }
    }
  }]);

  return QueryView;
})(SelectListView);

module.exports = QueryView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvcXVlcnlfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7Ozs7Ozs7QUFFWixJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUIsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsY0FBYyxDQUFDOztJQUVoRSxTQUFTO1lBQVQsU0FBUzs7QUFDRixXQURQLFNBQVMsQ0FDRCxJQUFJLEVBQUUsS0FBSyxFQUFFOzBCQURyQixTQUFTOztBQUVYLCtCQUZFLFNBQVMsNkNBRUg7O0FBRVIsUUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsUUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDNUIsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDOztBQUV6RCxRQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFFBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixRQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUMzQixRQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztHQUMxQjs7ZUFkRyxTQUFTOztXQWdCRixxQkFBQyxJQUFJLEVBQUU7O0FBRWhCLFVBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2hELHVGQUErRSxJQUFJLENBQUMsRUFBRSxnQkFBVyxJQUFJLGlCQUFjO0tBQ3BIOzs7V0FFUSxtQkFBQyxJQUFJLEVBQUU7QUFDZCxVQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixVQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM5Qjs7O1dBRVEscUJBQUc7QUFDVixVQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3JDLFlBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDekI7O0FBRUQsVUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN2Qjs7O1dBRVcsd0JBQUc7QUFDYixhQUFPLE1BQU0sQ0FBQztLQUNmOzs7V0FFYyx5QkFBQyxJQUFJLEVBQUU7OztBQUNwQixVQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN6QixZQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQzdGLElBQUksQ0FBQyxVQUFBLE9BQU8sRUFBSTtBQUNmLGdCQUFLLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFDeEIsZ0JBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO09BQ1IsTUFBTTtBQUNMLFlBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUNyRCxnQkFBSyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7T0FDSjtLQUNGOzs7U0FwREcsU0FBUztHQUFTLGNBQWM7O0FBdUR0QyxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyIsImZpbGUiOiIvVXNlcnMvYnJvYmVydG8vLmF0b20vcGFja2FnZXMvYXBpLWRvY3Mvc3JjL3F1ZXJ5X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuY29uc3QgU2VsZWN0TGlzdFZpZXcgPSByZXF1aXJlKCdhdG9tLXNwYWNlLXBlbi12aWV3cycpLlNlbGVjdExpc3RWaWV3O1xuXG5jbGFzcyBRdWVyeVZpZXcgZXh0ZW5kcyBTZWxlY3RMaXN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHdvcmQsIGl0ZW1zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29uZmlybWVkXyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Vmlld1Byb21pc2VfID0gbnVsbDtcbiAgICB0aGlzLmRvY1ZpZXdfID0gbnVsbDtcbiAgICB0aGlzLnBhbmVsXyA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoe2l0ZW06IHRoaXN9KTtcblxuICAgIHRoaXMuZmlsdGVyRWRpdG9yVmlldy5zZXRUZXh0KHdvcmQpO1xuICAgIHRoaXMuc2V0TWF4SXRlbXMoNTApO1xuICAgIHRoaXMuc2V0SXRlbXMoaXRlbXMpO1xuICAgIHRoaXMuc3RvcmVGb2N1c2VkRWxlbWVudCgpO1xuICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKTtcbiAgfVxuXG4gIHZpZXdGb3JJdGVtKGl0ZW0pIHtcbiAgICAvLyBIVE1MIGVzY2FwZSBpdGVtLm5hbWUuXG4gICAgY29uc3QgdGV4dCA9ICQoJzxkaXYvPicpLnRleHQoaXRlbS5uYW1lKS5odG1sKCk7XG4gICAgcmV0dXJuIGA8bGk+PGRpdj48aW1nIGNsYXNzPVwiYXBpLWRvY3MtaWNvblwiIHNyYz1cImF0b206Ly9hcGktZG9jcy9pbWFnZXMvaWNvbi0ke2l0ZW0uaWR9LnBuZ1wiIC8+JHt0ZXh0fTwvZGl2PjwvbGk+YDtcbiAgfVxuXG4gIGNvbmZpcm1lZChpdGVtKSB7XG4gICAgdGhpcy5jb25maXJtZWRfID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dWaWV3Rm9ySXRlbShpdGVtKTtcbiAgICB0aGlzLmZpbHRlckVkaXRvclZpZXcuYmx1cigpO1xuICB9XG5cbiAgY2FuY2VsbGVkKCkge1xuICAgIGlmICghdGhpcy5jb25maXJtZWRfICYmIHRoaXMuZG9jVmlld18pIHtcbiAgICAgIHRoaXMuZG9jVmlld18uZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHRoaXMucGFuZWxfLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGdldEZpbHRlcktleSgpIHtcbiAgICByZXR1cm4gJ25hbWUnO1xuICB9XG5cbiAgc2hvd1ZpZXdGb3JJdGVtKGl0ZW0pIHtcbiAgICBpZiAoIXRoaXMuc2V0Vmlld1Byb21pc2VfKSB7XG4gICAgICB0aGlzLnNldFZpZXdQcm9taXNlXyA9IGF0b20ud29ya3NwYWNlLm9wZW4oJ2FwaS1kb2NzOi8vJywgeyBzcGxpdDogJ3JpZ2h0JywgYWN0aXZhdGVQYW5lOiBmYWxzZSB9KVxuICAgICAgICAgIC50aGVuKGRvY1ZpZXcgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb2NWaWV3XyA9IGRvY1ZpZXc7XG4gICAgICAgICAgICB0aGlzLmRvY1ZpZXdfLnNldFZpZXcoaXRlbS51cmwpO1xuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFZpZXdQcm9taXNlXyA9IHRoaXMuc2V0Vmlld1Byb21pc2VfLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmRvY1ZpZXdfLnNldFZpZXcoaXRlbS51cmwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUXVlcnlWaWV3O1xuIl19
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/query_view.js
