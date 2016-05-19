(function() {
  var $, RubyNavigatorView, fs, path,
    __hasProp = {}.hasOwnProperty;

  fs = require('fs-plus');

  path = require('path');

  $ = require('atom-space-pen-views').$;

  $(document).ready(function() {
    $('.method').on('click', function(e) {
      var method, promise;
      method = $(this);
      return promise = atom.workspace.open(method.data("name"), {
        initialLine: method.data("line")
      });
    });
    return $('.ruby-class').on('click', function(e) {
      if (!(e.target === this)) {
        return;
      }
      return $(this).children().slideToggle();
    });
  });

  module.exports = RubyNavigatorView = (function() {
    function RubyNavigatorView(serializedState) {
      this.navigator = document.createElement('div');
      this.navigator.classList.add('ruby-navigator');
    }

    RubyNavigatorView.prototype.load_data = function() {
      var class_element, class_name, contents, file, file_name, json, method, projectPath, _results;
      projectPath = atom.project.getPaths()[0];
      file = path.join(projectPath, 'class-index.json');
      if (!fs.existsSync(file)) {
        this.display_missing_file_warning();
        return;
      }
      contents = fs.readFileSync(file);
      json = JSON.parse(contents);
      _results = [];
      for (file_name in json) {
        if (!__hasProp.call(json, file_name)) continue;
        _results.push((function() {
          var _ref, _results1;
          _ref = json[file_name];
          _results1 = [];
          for (class_name in _ref) {
            if (!__hasProp.call(_ref, class_name)) continue;
            class_element = this.add_class(class_name);
            _results1.push((function() {
              var _i, _len, _ref1, _results2;
              _ref1 = json[file_name][class_name];
              _results2 = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                method = _ref1[_i];
                _results2.push(this.add_method(method, file_name, class_element));
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    RubyNavigatorView.prototype.add_method = function(method, file_name, class_element) {
      var message;
      message = document.createElement('a');
      message.textContent = method["name"];
      message.setAttribute('data-name', file_name);
      message.setAttribute('data-line', method["line"]);
      message.classList.add('method');
      return class_element.appendChild(message);
    };

    RubyNavigatorView.prototype.add_class = function(name) {
      var ruby_class;
      ruby_class = document.createElement('div');
      ruby_class.textContent = name;
      ruby_class.classList.add('ruby-class');
      this.navigator.appendChild(ruby_class);
      return ruby_class;
    };

    RubyNavigatorView.prototype.display_missing_file_warning = function() {
      return atom.notifications.addWarning('Missing class-index.json. You can generate it using the indexer command from the class-indexer gem.');
    };

    RubyNavigatorView.prototype.serialize = function() {};

    RubyNavigatorView.prototype.destroy = function() {
      return this.navigator.remove();
    };

    RubyNavigatorView.prototype.getElement = function() {
      return this.navigator;
    };

    return RubyNavigatorView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3J1YnktbmF2aWdhdG9yL2xpYi9ydWJ5LW5hdmlnYXRvci12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw4QkFBQTtJQUFBLDZCQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFPLE9BQUEsQ0FBUSxTQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFJQyxJQUFLLE9BQUEsQ0FBUSxzQkFBUixFQUFMLENBSkQsQ0FBQTs7QUFBQSxFQU9BLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUEsR0FBQTtBQUNoQixJQUFBLENBQUEsQ0FBRSxTQUFGLENBQVksQ0FBQyxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFNBQUMsQ0FBRCxHQUFBO0FBQ3ZCLFVBQUEsZUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFVLENBQUEsQ0FBRSxJQUFGLENBQVYsQ0FBQTthQUNBLE9BQUEsR0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaLENBQXBCLEVBQXlDO0FBQUEsUUFBRSxXQUFBLEVBQWEsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaLENBQWY7T0FBekMsRUFGYTtJQUFBLENBQXpCLENBQUEsQ0FBQTtXQUdBLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsU0FBQyxDQUFELEdBQUE7QUFDM0IsTUFBQSxJQUFBLENBQUEsQ0FBZSxDQUFDLENBQUMsTUFBRixLQUFZLElBQWIsQ0FBZDtBQUFBLGNBQUEsQ0FBQTtPQUFBO2FBQ0EsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBQSxD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

//# sourceURL=/Users/broberto/.atom/packages/ruby-navigator/lib/ruby-navigator-view.coffee
