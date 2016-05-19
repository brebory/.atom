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
        if (editor.buffer != null) {
          buffer = editor.buffer;
          if (config.encoding) {
            buffer.setEncoding(config.encoding);
          }
        }
        view = atom.views.getView(editor);
        if (view != null) {
          if (config.fontFamily != null) {
            return view.style.fontFamily = config.fontFamily;
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
