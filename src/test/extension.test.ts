import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import { generateCommandId } from '../extension';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Command ID generation', () => {
		const appPath = '/Applications/WeChat.app';
		const expectedCommandId = 'peter-s-app-opener.open_WeChat';
		
		const commandId = generateCommandId(appPath);
		
		assert.strictEqual(commandId, expectedCommandId);
	});
});
