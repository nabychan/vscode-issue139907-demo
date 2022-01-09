import * as vscode from 'vscode';
import { FSProvider } from './FSProvider';


export function activate(context: vscode.ExtensionContext) {

	// Until a more specific activation event exists this requires onStartupFinished
	context.subscriptions.push(vscode.workspace.registerFileSystemProvider(`md`, new FSProvider(), {
		isCaseSensitive: true,
	}));

	// Register our custom commands
	context.subscriptions.push(vscode.commands.registerCommand('chendegui.vscode-issue139907-demo', () => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if(activeTextEditor && activeTextEditor.document.uri.path.endsWith(".md")) {
			const uriWithMDSchema = activeTextEditor.document.uri.with({
				scheme: 'md'
			});
			vscode.window.showTextDocument(uriWithMDSchema);
			vscode.window.showWarningMessage(`Modification to ${uriWithMDSchema.toString()} won't be saved. Just For Test`);
		}
	}));
}
