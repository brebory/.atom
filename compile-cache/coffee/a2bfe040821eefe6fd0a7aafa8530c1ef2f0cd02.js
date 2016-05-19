(function() {
  var CSON, CompositeDisposable, fs, path, temp, _;

  _ = require("lodash");

  fs = require("fs");

  path = require("path");

  temp = require("temp").track();

  CSON = require("season");

  CompositeDisposable = require("event-kit").CompositeDisposable;

  module.exports = {
    config: {
      autoEnable: {
        title: "Auto-Enable",
        description: "Whether to automatically load the local settings file\nwhen the project is opened.",
        type: "boolean",
        "default": true
      },
      configFilePath: {
        title: "Local Configuration File Name",
        description: "This is the name of the file containing the local settings.\n\n**Note that the *.cson* is appended automatically.**",
        type: "string",
        "default": ".atomrc"
      }
    },
    activate: function(state) {
      this.isEnabled = false;
      this.configFileName = atom.config.get("local-settings.configFilePath");
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "local-settings:enable": (function(_this) {
          return function() {
            return _this.enable();
          };
        })(this),
        "local-settings:disable": (function(_this) {
          return function() {
            return _this.disable();
          };
        })(this),
        "local-settings:reload": (function(_this) {
          return function() {
            return _this.disable(function() {
              return _this.enable();
            });
          };
        })(this)
      }));
      this.subscriptions.add(atom.config.onDidChange("local-settings.configFilePath", (function(_this) {
        return function(_arg) {
          var newValue;
          newValue = _arg.newValue;
          _this.configFileName = newValue || _this.config.configFilePath["default"];
          return _this.disable(function() {
            if (_this.isEnabled) {
              return _this.enable();
            }
          });
        };
      })(this)));
      return setTimeout((function(_this) {
        return function() {
          if (atom.config.get("local-settings.autoEnable")) {
            return _this.enable();
          }
        };
      })(this), 100);
    },
    deactivate: function() {
      temp.cleanupSync();
      return this.subscriptions.dispose();
    },
    enable: function() {
      var localConfigPath, projectPath;
      if (this.isEnabled) {
        return;
      }
      this.isEnabled = true;
      this.defaultConfigPath = atom.config.configFilePath;
      projectPath = atom.project.getPaths()[0];
      localConfigPath = CSON.resolve(path.join(projectPath, this.configFileName));
      if (!localConfigPath) {
        return;
      }
      return CSON.readFile(localConfigPath, (function(_this) {
        return function(err, localConfigData) {
          var tmpConfigData;
          if (err) {
            return console.error(err);
          }
          tmpConfigData = {};
          return CSON.readFile(_this.defaultConfigPath, function(err, defaultConfigData) {
            if (err) {
              defaultConfigData = {};
            }
            _.merge(tmpConfigData, defaultConfigData, localConfigData);
            return temp.open({
              prefix: "local-settings",
              suffix: ".cson"
            }, function(err, info) {
              if (err) {
                return console.error(err);
              }
              fs.write(info.fd, CSON.stringify(tmpConfigData));
              atom.config.configFilePath = info.path;
              return atom.config.load();
            });
          });
        };
      })(this));
    },
    disable: function(callback) {
      if (!this.isEnabled) {
        return;
      }
      this.isEnabled = false;
      return temp.cleanup((function(_this) {
        return function(err, stats) {
          atom.config.configFilePath = _this.defaultConfigPath;
          atom.config.load();
          return typeof callback === "function" ? callback() : void 0;
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2xvY2FsLXNldHRpbmdzL2xpYi9sb2NhbC1zZXR0aW5ncy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNENBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBZSxDQUFDLEtBQWhCLENBQUEsQ0FIUCxDQUFBOztBQUFBLEVBSUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSLENBSlAsQ0FBQTs7QUFBQSxFQUtDLHNCQUF1QixPQUFBLENBQVEsV0FBUixFQUF2QixtQkFMRCxDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxhQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsb0ZBRGI7QUFBQSxRQUtBLElBQUEsRUFBTSxTQUxOO0FBQUEsUUFNQSxTQUFBLEVBQVMsSUFOVDtPQURGO0FBQUEsTUFRQSxjQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTywrQkFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLHFIQURiO0FBQUEsUUFLQSxJQUFBLEVBQU0sUUFMTjtBQUFBLFFBTUEsU0FBQSxFQUFTLFNBTlQ7T0FURjtLQURGO0FBQUEsSUFrQkEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsU0FBRCxHQUFhLEtBQWIsQ0FBQTtBQUFBLE1BRUEsSUFB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

//# sourceURL=/Users/broberto/.atom/packages/local-settings/lib/local-settings.coffee
