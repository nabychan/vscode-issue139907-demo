import {ZipOpenFS, VirtualFS, PosixFS, npath} from '@yarnpkg/fslib';
import {getLibzipSync}                        from '@yarnpkg/libzip';
import * as vscode                            from 'vscode';

export class FSProvider implements vscode.FileSystemProvider {
  private readonly fs = new PosixFS(
    new VirtualFS({
      baseFs: new ZipOpenFS({
        libzip: getLibzipSync(),
        useCache: true,
        maxOpenFiles: 80
      }),
    }),
  );

  stat(uri: vscode.Uri): vscode.FileStat {
    const stat: any = this.fs.statSync(uri.fsPath);

    switch (true) {
      case stat.isDirectory(): {
        stat.type = vscode.FileType.Directory;
      } break;

      case stat.isFile(): {
        stat.type = vscode.FileType.File;
      } break;

      case stat.isSymbolicLink(): {
        stat.type = vscode.FileType.SymbolicLink;
      } break;

      default: {
        stat.type = vscode.FileType.Unknown;
      } break;
    }

    return stat;
  }

  readDirectory(uri: vscode.Uri): Array<[string, vscode.FileType]> {
    return [];
  }

  readFile(uri: vscode.Uri): Uint8Array {
    if(uri.scheme === 'md') {
      return this.fs.readFileSync(uri.fsPath);
    } else {
      throw new Error(`Not supported`);
    }
  }

  writeFile(uri: vscode.Uri, content: Uint8Array, options: {create: boolean, overwrite: boolean}): void {
    //do nothing
  }

  rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): void {
    throw new Error(`Not supported`);
  }

  delete(uri: vscode.Uri, options: {recursive: boolean}): void {
    //do nothing
  }

  createDirectory(uri: vscode.Uri): void {
    //do nothing
  }

  private _emitter = new vscode.EventEmitter<Array<vscode.FileChangeEvent>>();
  readonly onDidChangeFile = this._emitter.event;

  watch(resource: vscode.Uri, opts: any): vscode.Disposable {
    return new vscode.Disposable(() => {
      //do nothing
    });
  }
}
