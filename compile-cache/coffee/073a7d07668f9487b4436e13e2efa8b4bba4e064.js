(function() {
  var EventEmitter2, ModuleManager, config, isFunction, packageManager, satisfies, workspace,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  satisfies = require('semver').satisfies;

  EventEmitter2 = require('eventemitter2').EventEmitter2;

  workspace = atom.workspace, config = atom.config, packageManager = atom.packages;

  isFunction = function(func) {
    return (typeof func) === 'function';
  };

  module.exports = ModuleManager = (function(_super) {
    __extends(ModuleManager, _super);

    ModuleManager.prototype.modules = {};

    ModuleManager.prototype.version = '0.0.0';

    function ModuleManager() {
      this.update = __bind(this.update, this);
      ModuleManager.__super__.constructor.apply(this, arguments);
      this.setMaxListeners(0);
      this.version = require('../package.json').version;
      this.update();
    }

    ModuleManager.prototype.destruct = function() {
      return delete this.modules;
    };

    ModuleManager.prototype.update = function() {
      var engines, metaData, name, requiredVersion, _i, _len, _ref, _results;
      this.modules = {};
      _ref = packageManager.getAvailablePackageMetadata();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        metaData = _ref[_i];
        name = metaData.name, engines = metaData.engines;
        if (!(!packageManager.isPackageDisabled(name) && ((requiredVersion = engines != null ? engines.refactor : void 0) != null) && satisfies(this.version, requiredVersion))) {
          continue;
        }
        _results.push(this.activate(name));
      }
      return _results;
    };

    ModuleManager.prototype.activate = function(name) {
      return packageManager.activatePackage(name).then((function(_this) {
        return function(pkg) {
          var Ripper, module, scopeName, _i, _len, _ref;
          Ripper = (module = pkg.mainModule).Ripper;
          if (!((Ripper != null) && Array.isArray(Ripper.scopeNames) && isFunction(Ripper.prototype.parse) && isFunction(Ripper.prototype.find))) {
            console.error("'" + name + "' should implement Ripper.scopeNames, Ripper.parse() and Ripper.find()");
            return;
          }
          _ref = Ripper.scopeNames;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            scopeName = _ref[_i];
            _this.modules[scopeName] = module;
          }
          return _this.emit('changed');
        };
      })(this));
    };

    ModuleManager.prototype.getModule = function(sourceName) {
      return this.modules[sourceName];
    };

    return ModuleManager;

  })(EventEmitter2);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3JlZmFjdG9yL2xpYi9tb2R1bGVfbWFuYWdlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0ZBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBRSxZQUFjLE9BQUEsQ0FBUSxRQUFSLEVBQWQsU0FBRixDQUFBOztBQUFBLEVBQ0UsZ0JBQWtCLE9BQUEsQ0FBUSxlQUFSLEVBQWxCLGFBREYsQ0FBQTs7QUFBQSxFQUVFLGlCQUFBLFNBQUYsRUFBYSxjQUFBLE1BQWIsRUFBK0Isc0JBQVYsUUFGckIsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxTQUFDLElBQUQsR0FBQTtXQUFVLENBQUMsTUFBQSxDQUFBLElBQUQsQ0FBQSxLQUFpQixXQUEzQjtFQUFBLENBSmIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixvQ0FBQSxDQUFBOztBQUFBLDRCQUFBLE9BQUEsR0FBUyxFQUFULENBQUE7O0FBQUEsNEJBQ0EsT0FBQSxHQUFTLE9BRFQsQ0FBQTs7QUFHYSxJQUFBLHVCQUFBLEdBQUE7QUFDWCw2Q0FBQSxDQUFBO0FBQUEsTUFBQSxnREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsQ0FBakIsQ0FEQSxDQUFBO0FBQUEsTUFJRSxJQUFDLENBQUEsVUFBWSxPQUFBLENBQVEsaUJBQVIsRUFBWixPQUpILENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FOQSxDQURXO0lBQUEsQ0FIYjs7QUFBQSw0QkFZQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBSVIsTUFBQSxDQUFBLElBQVEsQ0FBQSxRQUpBO0lBQUEsQ0FaVixDQUFBOztBQUFBLDRCQWtCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxrRUFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQUFYLENBQUE7QUFFQTtBQUFBO1dBQUEsMkNBQUE7NEJBQUE7QUFFRSxRQUFFLGdCQUFBLElBQUYsRUFBUSxtQkFBQSxPQUFSLENBQUE7QUFDQSxRQUFBLElBQUEsQ0FBQSxDQUFnQixDQUFBLGNBQWUsQ0FBQyxpQkFBZixDQUFpQyxJQUFqQyxDQUFELElBQ0EseUVBREEsSUFFQSxTQUFBLENBQVUsSUFBQyxDQUFBLE9BQVgsRUFBb0IsZUFBcEIsQ0FGaEIsQ0FBQTtBQUFBLG1CQUFBO1NBREE7QUFBQSxzQkFJQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFKQSxDQUZGO0FBQUE7c0JBSE07SUFBQSxDQWxCUixDQUFBOztBQUFBLDRCQTZCQSxRQUFBLEdBQVUsU0FBQyxJQUFELEdBQUE7YUFDUixjQUNBLENBQUMsZUFERCxDQUNpQixJQURqQixDQUVBLENBQUMsSUFGRCxDQUVNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsR0FBQTtBQUVKLGNBQUEseUNBQUE7QUFBQSxVQUFFLFNBQVcsQ0FBQSxNQUFBLEdBQVMsR0FBRyxDQUFDLFVBQWIsRUFBWCxNQUFGLENBQUE7QUFDQSxVQUFBLElBQUEsQ0FBQSxDQUFPLGdCQUFBLElBQ0EsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFNLENBQUMsVUFBckIsQ0FEQSxJQUVBLFVBQUEsQ0FBVyxNQUFNLENBQUEsU0FBRSxDQUFBLEtBQW5CLENBRkEsSUFHQSxVQUFBLENBQVcsTUFBTSxDQUFBLFNBQUUsQ0FBQSxJQUFuQixDQUhQLENBQUE7QUFJRSxZQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWUsR0FBQSxHQUFHLElBQUgsR0FBUSx3RUFBdkIsQ0FBQSxDQUFBO0FBQ0Esa0JBQUEsQ0FMRjtXQURBO0FBUUE7QUFBQSxlQUFBLDJDQUFBO2lDQUFBO0FBQ0UsWUFBQSxLQUFDLENBQUEsT0FBUSxDQUFBLFNBQUEsQ0FBVCxHQUFzQixNQUF0QixDQURGO0FBQUEsV0FSQTtpQkFXQSxLQUFDLENBQUEsSUFBRCxDQUFNLFNBQU4sRUFiSTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRk4sRUFEUTtJQUFBLENBN0JWLENBQUE7O0FBQUEsNEJBK0NBLFNBQUEsR0FBVyxTQUFDLFVBQUQsR0FBQTthQUNULElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQSxFQURBO0lBQUEsQ0EvQ1gsQ0FBQTs7eUJBQUE7O0tBRjBCLGNBUDVCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/refactor/lib/module_manager.coffee
