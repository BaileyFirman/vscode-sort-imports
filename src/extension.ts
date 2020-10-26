import * as vscode from 'vscode';
import * as path from 'path';
// import * as fs from 'fs';

const sortLines = (text: string) => text.split('\n').sort().join('\n');

const sortLinesExtension = () => {
	let editor = vscode.window.activeTextEditor;

	if (editor) {
		let document = editor.document;
		let selection = editor.selection;

		let selectionText = document.getText(selection);
		let sortedSelection = sortLines(selectionText);
		
		editor.edit(editBuilder => editBuilder.replace(selection, sortedSelection));
	}
};

export const activate = (context: vscode.ExtensionContext) => {
    let disposable = vscode.commands.registerCommand('extension.sortTypeScriptImports', sortLinesExtension);
    let root = vscode.workspace.rootPath ?? "";
    const packageJsonPath = path.join(root, 'package.json');
	context.subscriptions.push(disposable);
}