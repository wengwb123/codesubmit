import * as vscode from 'vscode';
import { CodeSubmitNode } from './treeview/codesubmitnodetree';

// 插件激活时的入口函数
export function activate(context: vscode.ExtensionContext) {
	
	// 插件正在激活提示
	vscode.window.showInformationMessage('Congratulations, your extension "codesubmit" is now active!');

	// 代码提交树视图注册
	vscode.window.registerTreeDataProvider('codesubmit', new CodeSubmitNode());
}

// vscode关闭，或插件禁用或卸载时运行的方法(用来释放资源的)
export function deactivate() {}
