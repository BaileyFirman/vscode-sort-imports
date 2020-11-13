import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
// Entire Module
import * as validator from "./ZipCodeValidator";
// Default Import
import $ from "jquery";
// Default + Module
import Default, { SubModule } from "jquery";
// Single Module
import { ZipCodeValidator } from "./ZipCodeValidator";
// Renamed Module
import { ZipCodeValidator as ZCV, } from "./ZipCodeValidator";
// Type Import
import type { APIResponseType } from "./api";
// Side Effect Module
import "./my-module.js";


const trimImport = (module: string) => {
    return module.slice(7);
}

const getModules = (lines: string[], allDependencies: string[]) => {
    return lines.filter(line => {
        const subline: string[] = line.split(' ');
        const module: string = subline[subline.length - 1].split('\"')[1];
        return allDependencies.includes(module);
    })
};

const sortLinesExtension = () => {
    let editor = vscode.window.activeTextEditor;
    let root = vscode.workspace.rootPath ?? "";
    const packageJsonPath = path.join(root, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const dependencies: string[] = Object.keys(packageJson.dependencies);
    const devDependencies: string[] = Object.keys(packageJson.devDependencies);
    const allDependencies = [...dependencies, ...devDependencies];
    console.log(allDependencies);

	if (editor) {
		let document = editor.document;
		let selection = editor.selection;

        const module = [];
        const defaults = [];
        const defaultAndModules = [];
        const singleModule = [];
        const typeModule = [];
        const sideEffect = []


	    const selectionText: string = document.getText(selection);
        const selectionLines: string[] = selectionText.split('\n');
        // const dependancyLines: string[] = getModules(selectionLines, allDependencies);
        // const resultLines: string = dependancyLines.join('\n');
		
		editor.edit(editBuilder => editBuilder.replace(selection, resultLines));
	}
};

export const activate = (context: vscode.ExtensionContext) => {
    let disposable = vscode.commands.registerCommand('extension.sortTypeScriptImports', sortLinesExtension);
	context.subscriptions.push(disposable);
}