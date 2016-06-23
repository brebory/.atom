(function() {
  var CSONParser, fs, path;

  fs = require('fs');

  path = require('path');

  CSONParser = require('cson-parser');

  module.exports = {
    config: {
      debug: {
        type: 'boolean',
        "default": false
      }
    },
    activate: function() {
      console.log('activate editor-settings');
      this.watching = [];
      this.configDir = atom.getConfigDirPath() + "/grammar-config";
      if (!fs.existsSync(this.configDir)) {
        fs.mkdirSync(this.configDir);
      }
      this.registerCommands();
      atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function() {
          return _this.reconfigureCurrentEditor();
        };
      })(this));
      atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return editor.observeGrammar(function() {
            return _this.reconfigureCurrentEditor();
          });
        };
      })(this));
      return this.reconfigureCurrentEditor();
    },
    debug: function(msg) {
      if (atom.config.get('editor-settings.debug')) {
        return console.log(msg);
      }
    },
    registerCommands: function() {
      return atom.commands.add('atom-text-editor', {
        'editor-settings:open-grammar-config': (function(_this) {
          return function() {
            return _this.editCurrentGrammarConfig();
          };
        })(this)
      });
    },
    reconfigureCurrentEditor: function() {
      var buffer, config, editor, view;
      editor = atom.workspace.getActiveTextEditor();
      this.debug("reconfigure current editor");
      if (editor != null) {
        config = this.loadAllConfigFiles(editor.getGrammar().name);
        if (config.tabLength != null) {
          editor.setTabLength(config.tabLength);
        }
        if (config.softTabs != null) {
          editor.setSoftTabs(config.softTabs);
        }
        if (config.softWrap != null) {
          editor.setSoftWrapped(config.softWrap);
        }
        if (config.themes != null) {
          atom.config.settings.core.themes = [config.themes[0], config.themes[1]];
        }
        if (editor.buffer != null) {
          buffer = editor.buffer;
          if (config.encoding) {
            buffer.setEncoding(config.encoding);
          }
        }
        view = atom.views.getView(editor);
        if (view != null) {
          if (config.fontFamily != null) {
            view.style.fontFamily = config.fontFamily;
          }
          if (config.fontSize != null) {
            return view.style.fontSize = config.fontSize;
          }
        }
      }
    },
    loadAllConfigFiles: function(grammarName) {
      var config, defaults, directoryConfig, directoryConfigPath, directoryPath, editor, fileExtension, grammarConfig, projectConfig, projectConfigPath, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      editor = atom.workspace.getActiveTextEditor();
      fileExtension = path.extname(editor.getPath()).substring(1);
      this.debug('current editor file extension: ' + fileExtension);
      config = {};
      defaults = this.merge(atom.config.defaultSettings.editor, atom.config.settings.editor);
      config = this.merge(config, defaults);
      if (fs.existsSync(this.grammarConfigPath(grammarName))) {
        grammarConfig = this.loadConfig(this.grammarConfigPath(grammarName));
        this.debug('loading grammar config: ' + grammarName);
        config = this.merge(config, grammarConfig);
      } else {
        this.debug('no grammar config for: ' + grammarName);
      }
      if (((_ref = atom.project) != null ? (_ref1 = _ref.rootDirectories) != null ? (_ref2 = _ref1[0]) != null ? _ref2.path : void 0 : void 0 : void 0) != null) {
        projectConfigPath = atom.project.rootDirectories[0].path + "/.editor-settings";
        if (projectConfig = this.loadConfig(projectConfigPath)) {
          this.debug('loading project config: ' + projectConfigPath);
          config = this.merge(config, projectConfig);
        }
      }
      if (((_ref3 = editor.buffer) != null ? (_ref4 = _ref3.file) != null ? (_ref5 = _ref4.getParent()) != null ? _ref5.path : void 0 : void 0 : void 0) != null) {
        directoryPath = editor.buffer.file.getParent().path;
        directoryConfigPath = directoryPath + "/.editor-settings";
        if (directoryConfig = this.loadConfig(directoryConfigPath)) {
          this.debug('loading directory config: ' + directoryConfigPath);
          config = this.merge(config, directoryConfig);
        }
      }
      if (((_ref6 = config.grammarConfig) != null ? _ref6[grammarName] : void 0) != null) {
        this.debug('merging grammar config: ' + grammarName);
        config = this.merge(config, config.grammarConfig[grammarName]);
      }
      if ((((_ref7 = config.extensionConfig) != null ? _ref7[fileExtension] : void 0) != null) && fileExtension.length > 0) {
        this.debug('merging file extension config: ' + fileExtension);
        config = this.merge(config, config.extensionConfig[fileExtension]);
      }
      return config;
    },
    merge: function(first, second) {
      var a, b, c, config, d;
      config = {};
      for (a in first) {
        b = first[a];
        if (typeof b === "object") {
          config[a] = this.merge({}, b);
        } else {
          config[a] = b;
        }
      }
      for (c in second) {
        d = second[c];
        if (typeof d === "object") {
          config[c] = this.merge({}, d);
        } else {
          config[c] = d;
        }
      }
      return config;
    },
    editCurrentGrammarConfig: function() {
      var editor, filePath, grammar, workspace;
      workspace = atom.workspace != null;
      if (!workspace) {
        return;
      }
      editor = atom.workspace.getActiveTextEditor();
      if (editor != null) {
        grammar = editor.getGrammar();
        filePath = this.grammarConfigPath(grammar.name);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '');
        }
        this.watchFile(filePath);
        return atom.workspace.open(filePath);
      }
    },
    watchFile: function(path) {
      if (!this.watching[path]) {
        fs.watch(path, (function(_this) {
          return function() {
            _this.debug('watched file updated: ' + path);
            return _this.reconfigureCurrentEditor();
          };
        })(this));
        this.debug('watching: ' + path);
        return this.watching[path] = true;
      }
    },
    fileNameFor: function(text) {
      return text.replace(/\s+/gi, '-').toLowerCase();
    },
    grammarConfigPath: function(name) {
      var fileName;
      fileName = this.fileNameFor(name);
      return this.configDir + "/" + fileName + ".cson";
    },
    loadConfig: function(path) {
      var contents, error;
      if (fs.existsSync(path)) {
        contents = fs.readFileSync(path);
        this.watchFile(path);
        if (contents.length > 1) {
          try {
            return CSONParser.parse(contents);
          } catch (_error) {
            error = _error;
            return console.log(error);
          }
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2VkaXRvci1zZXR0aW5ncy9saWIvZWRpdG9yLXNldHRpbmdzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvQkFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBYyxPQUFBLENBQVEsSUFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQWMsT0FBQSxDQUFRLE1BQVIsQ0FEZCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFjLE9BQUEsQ0FBUSxhQUFSLENBRmQsQ0FBQTs7QUFBQSxFQXFCQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLEtBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BREY7S0FERjtBQUFBLElBS0EsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwwQkFBWixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxRQUFELEdBQWEsRUFGYixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUksQ0FBQyxnQkFBTCxDQUFBLENBQUEsR0FBMEIsaUJBSHZDLENBQUE7QUFNQSxNQUFBLElBQUcsQ0FBQSxFQUFNLENBQUMsVUFBSCxDQUFjLElBQUMsQ0FBQSxTQUFmLENBQVA7QUFDRSxRQUFBLEVBQUUsQ0FBQyxTQUFILENBQWEsSUFBQyxDQUFBLFNBQWQsQ0FBQSxDQURGO09BTkE7QUFBQSxNQVNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBLENBVEEsQ0FBQTtBQUFBLE1BV0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBZixDQUF5QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFB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

//# sourceURL=/Users/broberto/.atom/packages/editor-settings/lib/editor-settings.coffee
