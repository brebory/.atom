(function() {
  var CommandError, Ex, VimOption, fs, getFullPath, getSearchTerm, path, replaceGroups, saveAs, trySave, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  path = require('path');

  CommandError = require('./command-error');

  fs = require('fs-plus');

  VimOption = require('./vim-option');

  _ = require('underscore-plus');

  trySave = function(func) {
    var deferred, error, errorMatch, fileName, _ref;
    deferred = Promise.defer();
    try {
      func();
      deferred.resolve();
    } catch (_error) {
      error = _error;
      if (error.message.endsWith('is a directory')) {
        atom.notifications.addWarning("Unable to save file: " + error.message);
      } else if (error.path != null) {
        if (error.code === 'EACCES') {
          atom.notifications.addWarning("Unable to save file: Permission denied '" + error.path + "'");
        } else if ((_ref = error.code) === 'EPERM' || _ref === 'EBUSY' || _ref === 'UNKNOWN' || _ref === 'EEXIST') {
          atom.notifications.addWarning("Unable to save file '" + error.path + "'", {
            detail: error.message
          });
        } else if (error.code === 'EROFS') {
          atom.notifications.addWarning("Unable to save file: Read-only file system '" + error.path + "'");
        }
      } else if ((errorMatch = /ENOTDIR, not a directory '([^']+)'/.exec(error.message))) {
        fileName = errorMatch[1];
        atom.notifications.addWarning("Unable to save file: A directory in the " + ("path '" + fileName + "' could not be written to"));
      } else {
        throw error;
      }
    }
    return deferred.promise;
  };

  saveAs = function(filePath, editor) {
    return fs.writeFileSync(filePath, editor.getText());
  };

  getFullPath = function(filePath) {
    filePath = fs.normalize(filePath);
    if (path.isAbsolute(filePath)) {
      return filePath;
    } else if (atom.project.getPaths().length === 0) {
      return path.join(fs.normalize('~'), filePath);
    } else {
      return path.join(atom.project.getPaths()[0], filePath);
    }
  };

  replaceGroups = function(groups, string) {
    var char, escaped, group, replaced;
    replaced = '';
    escaped = false;
    while ((char = string[0]) != null) {
      string = string.slice(1);
      if (char === '\\' && !escaped) {
        escaped = true;
      } else if (/\d/.test(char) && escaped) {
        escaped = false;
        group = groups[parseInt(char)];
        if (group == null) {
          group = '';
        }
        replaced += group;
      } else {
        escaped = false;
        replaced += char;
      }
    }
    return replaced;
  };

  getSearchTerm = function(term, modifiers) {
    var char, escaped, hasC, hasc, modFlags, term_, _i, _len;
    if (modifiers == null) {
      modifiers = {
        'g': true
      };
    }
    escaped = false;
    hasc = false;
    hasC = false;
    term_ = term;
    term = '';
    for (_i = 0, _len = term_.length; _i < _len; _i++) {
      char = term_[_i];
      if (char === '\\' && !escaped) {
        escaped = true;
        term += char;
      } else {
        if (char === 'c' && escaped) {
          hasc = true;
          term = term.slice(0, -1);
        } else if (char === 'C' && escaped) {
          hasC = true;
          term = term.slice(0, -1);
        } else if (char !== '\\') {
          term += char;
        }
        escaped = false;
      }
    }
    if (hasC) {
      modifiers['i'] = false;
    }
    if ((!hasC && !term.match('[A-Z]') && atom.config.get('vim-mode.useSmartcaseForSearch')) || hasc) {
      modifiers['i'] = true;
    }
    modFlags = Object.keys(modifiers).filter(function(key) {
      return modifiers[key];
    }).join('');
    try {
      return new RegExp(term, modFlags);
    } catch (_error) {
      return new RegExp(_.escapeRegExp(term), modFlags);
    }
  };

  Ex = (function() {
    function Ex() {
      this.vsp = __bind(this.vsp, this);
      this.s = __bind(this.s, this);
      this.sp = __bind(this.sp, this);
      this.xit = __bind(this.xit, this);
      this.saveas = __bind(this.saveas, this);
      this.xa = __bind(this.xa, this);
      this.xall = __bind(this.xall, this);
      this.wqa = __bind(this.wqa, this);
      this.wqall = __bind(this.wqall, this);
      this.wa = __bind(this.wa, this);
      this.wq = __bind(this.wq, this);
      this.w = __bind(this.w, this);
      this.e = __bind(this.e, this);
      this.tabp = __bind(this.tabp, this);
      this.tabn = __bind(this.tabn, this);
      this.tabc = __bind(this.tabc, this);
      this.tabclose = __bind(this.tabclose, this);
      this.tabnew = __bind(this.tabnew, this);
      this.tabe = __bind(this.tabe, this);
      this.tabedit = __bind(this.tabedit, this);
      this.qall = __bind(this.qall, this);
      this.q = __bind(this.q, this);
    }

    Ex.singleton = function() {
      return Ex.ex || (Ex.ex = new Ex);
    };

    Ex.registerCommand = function(name, func) {
      return Ex.singleton()[name] = func;
    };

    Ex.registerAlias = function(alias, name) {
      return Ex.singleton()[alias] = function(args) {
        return Ex.singleton()[name](args);
      };
    };

    Ex.prototype.quit = function() {
      return atom.workspace.getActivePane().destroyActiveItem();
    };

    Ex.prototype.quitall = function() {
      return atom.close();
    };

    Ex.prototype.q = function() {
      return this.quit();
    };

    Ex.prototype.qall = function() {
      return this.quitall();
    };

    Ex.prototype.tabedit = function(args) {
      if (args.args.trim() !== '') {
        return this.edit(args);
      } else {
        return this.tabnew(args);
      }
    };

    Ex.prototype.tabe = function(args) {
      return this.tabedit(args);
    };

    Ex.prototype.tabnew = function(args) {
      if (args.args.trim() === '') {
        return atom.workspace.open();
      } else {
        return this.tabedit(args);
      }
    };

    Ex.prototype.tabclose = function(args) {
      return this.quit(args);
    };

    Ex.prototype.tabc = function() {
      return this.tabclose();
    };

    Ex.prototype.tabnext = function() {
      var pane;
      pane = atom.workspace.getActivePane();
      return pane.activateNextItem();
    };

    Ex.prototype.tabn = function() {
      return this.tabnext();
    };

    Ex.prototype.tabprevious = function() {
      var pane;
      pane = atom.workspace.getActivePane();
      return pane.activatePreviousItem();
    };

    Ex.prototype.tabp = function() {
      return this.tabprevious();
    };

    Ex.prototype.edit = function(_arg) {
      var args, editor, filePath, force, fullPath, range;
      range = _arg.range, args = _arg.args, editor = _arg.editor;
      filePath = args.trim();
      if (filePath[0] === '!') {
        force = true;
        filePath = filePath.slice(1).trim();
      } else {
        force = false;
      }
      if (editor.isModified() && !force) {
        throw new CommandError('No write since last change (add ! to override)');
      }
      if (filePath.indexOf(' ') !== -1) {
        throw new CommandError('Only one file name allowed');
      }
      if (filePath.length !== 0) {
        fullPath = getFullPath(filePath);
        if (fullPath === editor.getPath()) {
          return editor.getBuffer().reload();
        } else {
          return atom.workspace.open(fullPath);
        }
      } else {
        if (editor.getPath() != null) {
          return editor.getBuffer().reload();
        } else {
          throw new CommandError('No file name');
        }
      }
    };

    Ex.prototype.e = function(args) {
      return this.edit(args);
    };

    Ex.prototype.enew = function() {
      var buffer;
      buffer = atom.workspace.getActiveTextEditor().buffer;
      buffer.setPath(void 0);
      return buffer.load();
    };

    Ex.prototype.write = function(_arg) {
      var args, deferred, editor, filePath, force, fullPath, range, saveas, saved;
      range = _arg.range, args = _arg.args, editor = _arg.editor, saveas = _arg.saveas;
      if (saveas == null) {
        saveas = false;
      }
      filePath = args;
      if (filePath[0] === '!') {
        force = true;
        filePath = filePath.slice(1);
      } else {
        force = false;
      }
      filePath = filePath.trim();
      if (filePath.indexOf(' ') !== -1) {
        throw new CommandError('Only one file name allowed');
      }
      deferred = Promise.defer();
      editor = atom.workspace.getActiveTextEditor();
      saved = false;
      if (filePath.length !== 0) {
        fullPath = getFullPath(filePath);
      }
      if ((editor.getPath() != null) && ((fullPath == null) || editor.getPath() === fullPath)) {
        if (saveas) {
          throw new CommandError("Argument required");
        } else {
          trySave(function() {
            return editor.save();
          }).then(deferred.resolve);
          saved = true;
        }
      } else if (fullPath == null) {
        fullPath = atom.showSaveDialogSync();
      }
      if (!saved && (fullPath != null)) {
        if (!force && fs.existsSync(fullPath)) {
          throw new CommandError("File exists (add ! to override)");
        }
        if (saveas) {
          editor = atom.workspace.getActiveTextEditor();
          trySave(function() {
            return editor.saveAs(fullPath, editor);
          }).then(deferred.resolve);
        } else {
          trySave(function() {
            return saveAs(fullPath, editor);
          }).then(deferred.resolve);
        }
      }
      return deferred.promise;
    };

    Ex.prototype.wall = function() {
      return atom.workspace.saveAll();
    };

    Ex.prototype.w = function(args) {
      return this.write(args);
    };

    Ex.prototype.wq = function(args) {
      return this.write(args).then((function(_this) {
        return function() {
          return _this.quit();
        };
      })(this));
    };

    Ex.prototype.wa = function() {
      return this.wall();
    };

    Ex.prototype.wqall = function() {
      this.wall();
      return this.quitall();
    };

    Ex.prototype.wqa = function() {
      return this.wqall();
    };

    Ex.prototype.xall = function() {
      return this.wqall();
    };

    Ex.prototype.xa = function() {
      return this.wqall();
    };

    Ex.prototype.saveas = function(args) {
      args.saveas = true;
      return this.write(args);
    };

    Ex.prototype.xit = function(args) {
      return this.wq(args);
    };

    Ex.prototype.split = function(_arg) {
      var args, file, filePaths, newPane, pane, range, _i, _len, _results;
      range = _arg.range, args = _arg.args;
      args = args.trim();
      filePaths = args.split(' ');
      if (filePaths.length === 1 && filePaths[0] === '') {
        filePaths = void 0;
      }
      pane = atom.workspace.getActivePane();
      if ((filePaths != null) && filePaths.length > 0) {
        newPane = pane.splitUp();
        _results = [];
        for (_i = 0, _len = filePaths.length; _i < _len; _i++) {
          file = filePaths[_i];
          _results.push((function() {
            return atom.workspace.openURIInPane(file, newPane);
          })());
        }
        return _results;
      } else {
        return pane.splitUp({
          copyActiveItem: true
        });
      }
    };

    Ex.prototype.sp = function(args) {
      return this.split(args);
    };

    Ex.prototype.substitute = function(_arg) {
      var args, args_, char, delim, e, editor, escapeChars, escaped, flags, flagsObj, parsed, parsing, pattern, patternRE, range, substition, vimState;
      range = _arg.range, args = _arg.args, editor = _arg.editor, vimState = _arg.vimState;
      args_ = args.trimLeft();
      delim = args_[0];
      if (/[a-z1-9\\"|]/i.test(delim)) {
        throw new CommandError("Regular expressions can't be delimited by alphanumeric characters, '\\', '\"' or '|'");
      }
      args_ = args_.slice(1);
      escapeChars = {
        t: '\t',
        n: '\n',
        r: '\r'
      };
      parsed = ['', '', ''];
      parsing = 0;
      escaped = false;
      while ((char = args_[0]) != null) {
        args_ = args_.slice(1);
        if (char === delim) {
          if (!escaped) {
            parsing++;
            if (parsing > 2) {
              throw new CommandError('Trailing characters');
            }
          } else {
            parsed[parsing] = parsed[parsing].slice(0, -1);
          }
        } else if (char === '\\' && !escaped) {
          parsed[parsing] += char;
          escaped = true;
        } else if (parsing === 1 && escaped && (escapeChars[char] != null)) {
          parsed[parsing] += escapeChars[char];
          escaped = false;
        } else {
          escaped = false;
          parsed[parsing] += char;
        }
      }
      pattern = parsed[0], substition = parsed[1], flags = parsed[2];
      if (pattern === '') {
        pattern = vimState.getSearchHistoryItem();
        if (pattern == null) {
          atom.beep();
          throw new CommandError('No previous regular expression');
        }
      } else {
        vimState.pushSearchHistory(pattern);
      }
      try {
        flagsObj = {};
        flags.split('').forEach(function(flag) {
          return flagsObj[flag] = true;
        });
        patternRE = getSearchTerm(pattern, flagsObj);
      } catch (_error) {
        e = _error;
        if (e.message.indexOf('Invalid flags supplied to RegExp constructor') === 0) {
          throw new CommandError("Invalid flags: " + e.message.slice(45));
        } else if (e.message.indexOf('Invalid regular expression: ') === 0) {
          throw new CommandError("Invalid RegEx: " + e.message.slice(27));
        } else {
          throw e;
        }
      }
      return editor.transact(function() {
        var line, _i, _ref, _ref1, _results;
        _results = [];
        for (line = _i = _ref = range[0], _ref1 = range[1]; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; line = _ref <= _ref1 ? ++_i : --_i) {
          _results.push(editor.scanInBufferRange(patternRE, [[line, 0], [line + 1, 0]], function(_arg1) {
            var match, replace;
            match = _arg1.match, replace = _arg1.replace;
            return replace(replaceGroups(match.slice(0), substition));
          }));
        }
        return _results;
      });
    };

    Ex.prototype.s = function(args) {
      return this.substitute(args);
    };

    Ex.prototype.vsplit = function(_arg) {
      var args, file, filePaths, newPane, pane, range, _i, _len, _results;
      range = _arg.range, args = _arg.args;
      args = args.trim();
      filePaths = args.split(' ');
      if (filePaths.length === 1 && filePaths[0] === '') {
        filePaths = void 0;
      }
      pane = atom.workspace.getActivePane();
      if ((filePaths != null) && filePaths.length > 0) {
        newPane = pane.splitLeft();
        _results = [];
        for (_i = 0, _len = filePaths.length; _i < _len; _i++) {
          file = filePaths[_i];
          _results.push((function() {
            return atom.workspace.openURIInPane(file, newPane);
          })());
        }
        return _results;
      } else {
        return pane.splitLeft({
          copyActiveItem: true
        });
      }
    };

    Ex.prototype.vsp = function(args) {
      return this.vsplit(args);
    };

    Ex.prototype["delete"] = function(_arg) {
      var range;
      range = _arg.range;
      range = [[range[0], 0], [range[1] + 1, 0]];
      return atom.workspace.getActiveTextEditor().buffer.setTextInRange(range, '');
    };

    Ex.prototype.set = function(_arg) {
      var args, option, options, range, _i, _len, _results;
      range = _arg.range, args = _arg.args;
      args = args.trim();
      if (args === "") {
        throw new CommandError("No option specified");
      }
      options = args.split(' ');
      _results = [];
      for (_i = 0, _len = options.length; _i < _len; _i++) {
        option = options[_i];
        _results.push((function() {
          var nameValPair, optionName, optionProcessor, optionValue;
          if (option.includes("=")) {
            nameValPair = option.split("=");
            if (nameValPair.length !== 2) {
              throw new CommandError("Wrong option format. [name]=[value] format is expected");
            }
            optionName = nameValPair[0];
            optionValue = nameValPair[1];
            optionProcessor = VimOption.singleton()[optionName];
            if (optionProcessor == null) {
              throw new CommandError("No such option: " + optionName);
            }
            return optionProcessor(optionValue);
          } else {
            optionProcessor = VimOption.singleton()[option];
            if (optionProcessor == null) {
              throw new CommandError("No such option: " + option);
            }
            return optionProcessor();
          }
        })());
      }
      return _results;
    };

    return Ex;

  })();

  module.exports = Ex;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2V4LW1vZGUvbGliL2V4LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvR0FBQTtJQUFBLGtGQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FEZixDQUFBOztBQUFBLEVBRUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBRkwsQ0FBQTs7QUFBQSxFQUdBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUhaLENBQUE7O0FBQUEsRUFJQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBSkosQ0FBQTs7QUFBQSxFQU1BLE9BQUEsR0FBVSxTQUFDLElBQUQsR0FBQTtBQUNSLFFBQUEsMkNBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxPQUFPLENBQUMsS0FBUixDQUFBLENBQVgsQ0FBQTtBQUVBO0FBQ0UsTUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxRQUFRLENBQUMsT0FBVCxDQUFBLENBREEsQ0FERjtLQUFBLGNBQUE7QUFJRSxNQURJLGNBQ0osQ0FBQTtBQUFBLE1BQUEsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLENBQUg7QUFDRSxRQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBbkIsQ0FBK0IsdUJBQUEsR0FBdUIsS0FBSyxDQUFDLE9BQTVELENBQUEsQ0FERjtPQUFBLE1BRUssSUFBRyxrQkFBSDtBQUNILFFBQUEsSUFBRyxLQUFLLENBQUMsSUFBTixLQUFjLFFBQWpCO0FBQ0UsVUFBQSxJQUFJLENBQUMsYUFDSCxDQUFDLFVBREgsQ0FDZSwwQ0FBQSxHQUEwQyxLQUFLLENBQUMsSUFBaEQs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

//# sourceURL=/Users/broberto/.atom/packages/ex-mode/lib/ex.coffee
