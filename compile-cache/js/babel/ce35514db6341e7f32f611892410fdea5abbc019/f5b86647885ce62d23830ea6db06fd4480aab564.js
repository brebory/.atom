'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');
var Disposable = require('atom').Disposable;
var Emitter = require('atom').Emitter;
var Highlight = require('./highlight');
var Resource = require('./resource');
var ScrollView = require('atom-space-pen-views').ScrollView;
var Shell = require('shell');
var Url = require('url');

var DocView = (function (_ScrollView) {
  _inherits(DocView, _ScrollView);

  _createClass(DocView, null, [{
    key: 'content',
    value: function content() {
      // Magic required to enable scrolling and keyboard shortcuts for scrolling.
      return this.div({ 'class': 'api-docs-doc', tabindex: -1 });
    }
  }, {
    key: 'DOC_STYLE_LIGHT_',
    value: '',
    enumerable: true
  }, {
    key: 'DOC_STYLE_DARK_',
    value: '',
    enumerable: true
  }, {
    key: 'DOC_STYLE_PROMISE_',
    value: Resource.get('style-light.css').then(function (result) {
      return DocView.DOC_STYLE_LIGHT_ = result;
    }).then(function () {
      return Resource.get('style-dark.css');
    }).then(function (result) {
      return DocView.DOC_STYLE_DARK_ = result;
    }),
    enumerable: true
  }]);

  function DocView(library, url) {
    _classCallCheck(this, DocView);

    _get(Object.getPrototypeOf(DocView.prototype), 'constructor', this).call(this);
    this.emitter_ = new Emitter();
    this.library_ = library;
    this.title_ = 'Loading...';
    this.url_ = url;
    this.pane_ = null;
  }

  _createClass(DocView, [{
    key: 'setView',
    value: function setView(url) {
      var _this = this;

      // Set the view only after DOC_STYLE_{LIGHT|DARK}_ are set.
      DocView.DOC_STYLE_PROMISE_.then(function () {
        var parsedUrl = Url.parse(url, true);
        var path = parsedUrl.pathname.substr(1);
        var docset = _this.library_.get(parsedUrl.hostname);

        var style = DocView.DOC_STYLE_LIGHT_;
        var styleClass = '#fff';
        if (atom.config.get('api-docs._theme') == 'Dark') {
          style = DocView.DOC_STYLE_DARK_;
          styleClass = '#303030';
        }

        var root = _this.element.createShadowRoot();
        root.innerHTML = '<style type="text/css">' + style + '</style>';
        root.innerHTML += '<div class="' + docset.classNames + '" style="font-size: 10pt; background-color: ' + styleClass + '">' + docset.getContent(path) + '</div>';

        // Set up click handlers for relative URLs so we can resolve internally.
        var elements = $(root).find('a');

        var _loop = function (i) {
          var href = elements[i].getAttribute('href');
          if (!href) {
            return 'continue';
          }

          if (href.startsWith('http')) {
            elements[i].onclick = function (event) {
              return Shell.openExternal(href);
            };
          } else {
            elements[i].onclick = function (event) {
              return _this.setView(Url.resolve(url, href));
            };
          }
        };

        for (var i = 0; i < elements.length; ++i) {
          var _ret = _loop(i);

          if (_ret === 'continue') continue;
        }

        Highlight(docset.type, root);

        _this.title_ = docset.getTitle(path);
        _this.emitter_.emit('did-change-title');
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.pane_.destroyItem(this);
      if (this.pane_.getItems().length === 0) {
        this.pane_.destroy();
      }
    }
  }, {
    key: 'attached',
    value: function attached() {
      this.pane_ = atom.workspace.paneForURI(this.getURI());
      this.pane_.activateItem(this);
    }
  }, {
    key: 'onDidChangeTitle',
    value: function onDidChangeTitle(callback) {
      return this.emitter_.on('did-change-title', callback);
    }
  }, {
    key: 'onDidChangeModified',
    value: function onDidChangeModified(callback) {
      return new Disposable();
    }

    // Required to find the pane for this instance.
  }, {
    key: 'getURI',
    value: function getURI() {
      return this.url_;
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      return this.title_;
    }
  }]);

  return DocView;
})(ScrollView);

module.exports = DocView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvZG9jX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7Ozs7O0FBRVosSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDOUMsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN4QyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUM5RCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOztJQUVyQixPQUFPO1lBQVAsT0FBTzs7ZUFBUCxPQUFPOztXQU1HLG1CQUFHOztBQUVmLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFNBQU8sY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDeEQ7OztXQVJ5QixFQUFFOzs7O1dBQ0gsRUFBRTs7OztXQUNDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2FBQUksT0FBTyxDQUFDLGdCQUFnQixHQUFHLE1BQU07S0FBQSxDQUFDLENBQ3hHLElBQUksQ0FBQzthQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7S0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTthQUFJLE9BQU8sQ0FB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Q0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdEMsWUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUN0QjtLQUNGOzs7V0FFTyxvQkFBRztBQUNULFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDdEQsVUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7OztXQUVlLDBCQUFDLFFBQVEsRUFBRTtBQUN6QixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZEOzs7V0FFa0IsNkJBQUMsUUFBUSxFQUFFO0FBQzVCLGFBQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7V0FHSyxrQkFBRztBQUNQLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7O1dBRU8sb0JBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7OztTQXZGRyxPQUFPO0dBQVMsVUFBVTs7QUEwRmhDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvZG9jX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuY29uc3QgRGlzcG9zYWJsZSA9IHJlcXVpcmUoJ2F0b20nKS5EaXNwb3NhYmxlO1xuY29uc3QgRW1pdHRlciA9IHJlcXVpcmUoJ2F0b20nKS5FbWl0dGVyO1xuY29uc3QgSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi9oaWdobGlnaHQnKTtcbmNvbnN0IFJlc291cmNlID0gcmVxdWlyZSgnLi9yZXNvdXJjZScpO1xuY29uc3QgU2Nyb2xsVmlldyA9IHJlcXVpcmUoJ2F0b20tc3BhY2UtcGVuLXZpZXdzJykuU2Nyb2xsVmlldztcbmNvbnN0IFNoZWxsID0gcmVxdWlyZSgnc2hlbGwnKTtcbmNvbnN0IFVybCA9IHJlcXVpcmUoJ3VybCcpO1xuXG5jbGFzcyBEb2NWaWV3IGV4dGVuZHMgU2Nyb2xsVmlldyB7XG4gIHN0YXRpYyBET0NfU1RZTEVfTElHSFRfID0gJyc7XG4gIHN0YXRpYyBET0NfU1RZTEVfREFSS18gPSAnJztcbiAgc3RhdGljIERPQ19TVFlMRV9QUk9NSVNFXyA9IFJlc291cmNlLmdldCgnc3R5bGUtbGlnaHQuY3NzJykudGhlbihyZXN1bHQgPT4gRG9jVmlldy5ET0NfU1RZTEVfTElHSFRfID0gcmVzdWx0KVxuICAgICAgLnRoZW4oKCkgPT4gUmVzb3VyY2UuZ2V0KCdzdHlsZS1kYXJrLmNzcycpKS50aGVuKHJlc3VsdCA9PiBEb2NWaWV3LkRPQ19TVFlMRV9EQVJLXyA9IHJlc3VsdCk7XG5cbiAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgLy8gTWFnaWMgcmVxdWlyZWQgdG8gZW5hYmxlIHNjcm9sbGluZyBhbmQga2V5Ym9hcmQgc2hvcnRjdXRzIGZvciBzY3JvbGxpbmcuXG4gICAgcmV0dXJuIHRoaXMuZGl2KHtjbGFzczogJ2FwaS1kb2NzLWRvYycsIHRhYmluZGV4OiAtMX0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IobGlicmFyeSwgdXJsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVtaXR0ZXJfID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB0aGlzLmxpYnJhcnlfID0gbGlicmFyeTtcbiAgICB0aGlzLnRpdGxlXyA9ICdMb2FkaW5nLi4uJztcbiAgICB0aGlzLnVybF8gPSB1cmw7XG4gICAgdGhpcy5wYW5lXyA9IG51bGw7XG4gIH1cblxuICBzZXRWaWV3KHVybCkge1xuICAgIC8vIFNldCB0aGUgdmlldyBvbmx5IGFmdGVyIERPQ19TVFlMRV97TElHSFR8REFSS31fIGFyZSBzZXQuXG4gICAgRG9jVmlldy5ET0NfU1RZTEVfUFJPTUlTRV8udGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBwYXJzZWRVcmwgPSBVcmwucGFyc2UodXJsLCB0cnVlKTtcbiAgICAgIGNvbnN0IHBhdGggPSBwYXJzZWRVcmwucGF0aG5hbWUuc3Vic3RyKDEpO1xuICAgICAgY29uc3QgZG9jc2V0ID0gdGhpcy5saWJyYXJ5Xy5nZXQocGFyc2VkVXJsLmhvc3RuYW1lKTtcblxuICAgICAgbGV0IHN0eWxlID0gRG9jVmlldy5ET0NfU1RZTEVfTElHSFRfO1xuICAgICAgbGV0IHN0eWxlQ2xhc3MgPSAnI2ZmZic7XG4gICAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdhcGktZG9jcy5fdGhlbWUnKSA9PSAnRGFyaycpIHtcbiAgICAgICAgc3R5bGUgPSBEb2NWaWV3LkRPQ19TVFlMRV9EQVJLXztcbiAgICAgICAgc3R5bGVDbGFzcyA9ICcjMzAzMDMwJztcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZWxlbWVudC5jcmVhdGVTaGFkb3dSb290KCk7XG4gICAgICByb290LmlubmVySFRNTCA9IGA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+JHtzdHlsZX08L3N0eWxlPmA7XG4gICAgICByb290LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cIiR7ZG9jc2V0LmNsYXNzTmFtZXN9XCIgc3R5bGU9XCJmb250LXNpemU6IDEwcHQ7IGJhY2tncm91bmQtY29sb3I6ICR7c3R5bGVDbGFzc31cIj4ke2RvY3NldC5nZXRDb250ZW50KHBhdGgpfTwvZGl2PmA7XG5cbiAgICAgIC8vIFNldCB1cCBjbGljayBoYW5kbGVycyBmb3IgcmVsYXRpdmUgVVJMcyBzbyB3ZSBjYW4gcmVzb2x2ZSBpbnRlcm5hbGx5LlxuICAgICAgY29uc3QgZWxlbWVudHMgPSAkKHJvb3QpLmZpbmQoJ2EnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgaHJlZiA9IGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICBpZiAoIWhyZWYpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChocmVmLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgIGVsZW1lbnRzW2ldLm9uY2xpY2sgPSBldmVudCA9PiBTaGVsbC5vcGVuRXh0ZXJuYWwoaHJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudHNbaV0ub25jbGljayA9IGV2ZW50ID0+IHRoaXMuc2V0VmlldyhVcmwucmVzb2x2ZSh1cmwsIGhyZWYpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBIaWdobGlnaHQoZG9jc2V0LnR5cGUsIHJvb3QpO1xuXG4gICAgICB0aGlzLnRpdGxlXyA9IGRvY3NldC5nZXRUaXRsZShwYXRoKTtcbiAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnZGlkLWNoYW5nZS10aXRsZScpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnBhbmVfLmRlc3Ryb3lJdGVtKHRoaXMpO1xuICAgIGlmICh0aGlzLnBhbmVfLmdldEl0ZW1zKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnBhbmVfLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnBhbmVfID0gYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSSh0aGlzLmdldFVSSSgpKTtcbiAgICB0aGlzLnBhbmVfLmFjdGl2YXRlSXRlbSh0aGlzKTtcbiAgfVxuXG4gIG9uRGlkQ2hhbmdlVGl0bGUoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyXy5vbignZGlkLWNoYW5nZS10aXRsZScsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uRGlkQ2hhbmdlTW9kaWZpZWQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKTtcbiAgfVxuXG4gIC8vIFJlcXVpcmVkIHRvIGZpbmQgdGhlIHBhbmUgZm9yIHRoaXMgaW5zdGFuY2UuXG4gIGdldFVSSSgpIHtcbiAgICByZXR1cm4gdGhpcy51cmxfO1xuICB9XG5cbiAgZ2V0VGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGl0bGVfO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jVmlldztcbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/doc_view.js
