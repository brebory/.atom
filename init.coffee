# Your init script
#
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# An example hack to log to the console when each text editor is saved.
#
# atom.workspace.observeTextEditors (editor) ->
#   editor.onDidSave ->
#     console.log "Saved! #{editor.getPath()}"

# Ex mode

dispatchCommand = (command) ->
    workspaceView = atom.views.getView atom.workspace
    atom.commands.dispatch workspaceView, command

openCommandPalette = ->
    dispatchCommand 'command-palette:toggle'

toggleMarkdownPreview = ->
    dispatchCommand 'markdown-preview:toggle'

atom.packages.onDidActivatePackage (pack) ->
  if pack.name == 'ex-mode'
    Ex = pack.mainModule.provideEx()
    Ex.registerCommand 'p', ->
        process.nextTick openCommandPalette
    Ex.registerCommand 'md', ->
        process.nextTick toggleMarkdownPreview
