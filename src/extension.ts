import * as vscode from 'vscode';

// 插件激活时的入口函数
export function activate(context: vscode.ExtensionContext) {
	
	// 告诉用户正在激活插件
	vscode.window.showInformationMessage('Congratulations, your extension "codesubmit" is now active!');

}

// vscode关闭，或插件禁用或卸载时运行的方法(用来释放资源的)
export function deactivate() {}
