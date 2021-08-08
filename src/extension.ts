import * as vscode from 'vscode';
import { CodeSubmitNode } from './treeview/codesubmitnodetree';
import { UploadWebView } from './webview/uploadwebview';

// 插件激活时的入口函数
export function activate(context: vscode.ExtensionContext) {

	// 插件正在激活提示
	vscode.window.showInformationMessage('Congratulations, your extension "codesubmit" is now active!');

	// 注册代码提交数视图
	CodeSubmitNode.initTreeNode();

	// 注册每个节点的命令
	context.subscriptions.push(vscode.commands.registerCommand('codeSubmitNodeClick', (title, flag) => {
		switch (flag) {
			case 'download':
				UploadWebView.createPanel(context.extensionPath);
				break;
			case 'update':
				vscode.window.showInformationMessage("代码更新未实现");
				break;
			case 'codesubmit':
				vscode.window.showInformationMessage("代码提交未实现");
				break;
			case 'merge':
				vscode.window.showInformationMessage("代码合并未实现");
				break;
		}
		UploadWebView.createPanel(context.extensionPath);
	}));
}

// vscode关闭，或插件禁用或卸载时运行的方法(用来释放资源的)
export function deactivate() { }