import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as os from 'os';
import * as path from 'path';

export function generateCommandId(appPath: string): string {
	const baseName = path.basename(appPath, path.extname(appPath));
	return `peter-s-app-opener.open_${baseName.replace(/\s+/g, '_')}`;
}

export function activate(context: vscode.ExtensionContext) {
	const appPaths: string[] = [
		'/usr/local/bin/datagrip',
		'/usr/local/bin/appcode',
		'/usr/local/bin/mps',
		'/usr/local/bin/dataspell',
		'/usr/local/bin/clion',
		'/usr/local/bin/webstorm',
		'/usr/local/bin/phpstorm',
		'/usr/local/bin/studio',
		'/usr/local/bin/aqua',
		'/usr/local/bin/rubymine',
		'/usr/local/bin/goland',
		'/usr/local/bin/fleet',
		'/usr/local/bin/space',
		'/usr/local/bin/pycharm',
		'/usr/local/bin/gateway',
		'/usr/local/bin/idea',
		'/Applications/Visual Studio Code.app',
		'/Applications/VLC.app',
		'/Applications/Astrill.app',
		'/Applications/WeChat.app',
		'/System/Applications/Books.app',
		'/System/Applications/Notes.app',
		'/System/Applications/Preview.app',
		'/System/Applications/Mail.app',
		'/System/Applications/Dictionary.app',
		'/System/Applications/Contacts.app',
		'/System/Applications/Time Machine.app',
		'/System/Applications/FaceTime.app',
		'/System/Applications/Shortcuts.app',
		'/System/Applications/Maps.app',
		'/System/Applications/Photos.app',
		'/System/Applications/Messages.app',
		'/System/Applications/Calculator.app',
		'/System/Applications/VoiceMemos.app',
		'/System/Applications/Launchpad.app',
		'/System/Applications/Reminders.app',
		'/System/Applications/App Store.app',
		'/System/Applications/Clock.app',
		'/System/Applications/Automator.app',
		'/System/Applications/Calendar.app',
		'/Applications/Qfinder Pro.app',
		'/Applications/Visual Studio Code.app',
		'/Applications/VLC.app',
		'/Applications/Astrill.app',
		'/Applications/Sourcetree.app',
		'/Applications/Xmind.app',
		'/Applications/MindManager.app',
		'/Applications/Figma.app',
		'/Applications/Google Chrome.app',
		'/Applications/Maccy.app',
		'/Applications/Karabiner-Elements.app',
		'/Applications/Karabiner-EventViewer.app',
		'/Applications/Numbers.app',
		'/Applications/IINA.app',
		'/Applications/Parallels Desktop.app',
		'/Applications/Xcode.app',
		'/Applications/iTerm2.app',
		'/Applications/腾讯文档.app',
		'/Applications/MindNode.app',
		'/Applications/飞书开发者工具.app',
		'/Applications/Dash.app',
		'/Applications/FreeChatGPT.app',
		'/Applications/DBeaver.app',
		'/Applications/iCanHazShortcut.app',
		'/Applications/Zend Studio.app',
		'/Applications/Cursor.app',
		'/Applications/XLPlayer.app',
		'/Applications/wechatwebdevtools.app',
		'/Applications/Microsoft Word.app',
		'/Applications/Time Out.app',
		'/Applications/Brightness Sync.app',
		'/Applications/Thunder.app',
		'/Applications/TheBrain 12.app',
		'/Applications/OmniFocus.app',
		'/Applications/chat gpt.app',
		'/Applications/Commander One.app',
		'/Applications/Google Chrome Canary.app',
		'/Applications/微信读书.app',
		'/Applications/Shotcut.app',
		'/Applications/Audacity.app',
		'/Applications/Docker.app',
		'/Applications/Obsidian.app',
		'/Applications/balenaEtcher.app',
		'/Applications/TencentMeeting.app',
		'/Applications/Safari.app',
		'/Applications/Keeper Password Manager.app',
		'/Applications/ecs workbench ali cloud.app',
		'/Applications/Espanso.app',
		'/Applications/zoom.us.app',
		'/Applications/FeiShu.app',
		'/Applications/Keynote.app',
		'/Applications/Fork.app',
		'/Applications/.Karabiner-VirtualHIDDevice-Manager.app',
		'/Applications/Pages.app',
		'/Applications/企业微信.app',
		'/Applications/OmniGraffle.app',
		'/Applications/Insomnia.app',
		'/Applications/Lunar.app',
		'/Applications/Flow.app',
		'/Applications/Fluor.app',
		'/Applications/Microsoft Edge.app',
		'/Applications/Microsoft OneNote.app',
		'/Applications/Chromium.app',
		'/Applications/Alfred 5.app',
		'/Applications/Postman.app',
		'/Applications/JetBrains Toolbox.app',
		'/Applications/Microsoft PowerPoint.app',
		'/Applications/NeteaseMusic.app',
		'/Applications/Clion Editor.app',
		'/Applications/SunloginClient.app',
		'/Applications/Tab Duplicator.app',
		'/Applications/QQ.app',
		'/Applications/Sublime Text.app',
		'/Applications/TextMate.app',
	];

	appPaths.forEach((appPath) => {
		const commandId = generateCommandId(appPath);
		const commandName = `Open ${path.basename(appPath, path.extname(appPath))}`;

		let disposable = vscode.commands.registerCommand(commandId, () => {
			const platform = os.platform();
			let command = '';

			if (platform === 'darwin') {
				if (appPath.endsWith('.app')) {
					command = `open '${appPath}'`;
				} else if (appPath.startsWith('/usr')) {
					command = `"${appPath}"`;
				}
			} else if (platform === 'win32') {
				command = `"${appPath}"`;
			} else if (platform === 'linux') {
				command = `"${appPath}"`;
			}

			if (command) {
				exec(command, (error, stdout, stderr) => {
					if (error) {
						vscode.window.showErrorMessage(`Failed to open ${path.basename(appPath)}: ${error.message}`);
						return;
					}
					vscode.window.showInformationMessage(`${path.basename(appPath)} opened successfully`);
				});
			} else {
				vscode.window.showErrorMessage(`Unsupported platform or path for ${path.basename(appPath)}`);
			}
		});

		context.subscriptions.push(disposable);
	});
}

export function deactivate() {}