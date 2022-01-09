[vscode-issue139907-demo](https://github.com/microsoft/vscode/issues/139907)
![screenshot1](./Screenshot2022-01-0950819.jpg)
![screenshot1](./Screenshot2022-01-09150707.jpg)
# issue 139907 Reproduce steps
- debug this extension
- open index.md in Resource Folder
- execute command "ChenDeGui: chendegui.vscode-issue139907-demo" from command palette
- thus you open a index.md from fileSystemProvider
- ctl+shift+v to open markdown preview
- the image won't show, and you click the image placehoder，the image will open, it is also privided by fileSystemProvider
