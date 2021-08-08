import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @Description: 创建代码下载的一个控制面板,设计成单例模式
 * @Author: zengwenbo
 * @LastModified: 2021/8/8
 */
export class UploadWebView {

  public static currentInstance: UploadWebView | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  public static createPanel(extensionPath: string) {

    //有则返回，没有则创建
    if (UploadWebView.currentInstance) {
      // 跳转到已经存在的
      UploadWebView.currentInstance._panel.reveal();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'upload', // 唯一标识，可随意
      'upload',  // 面板标题,最好望文生义
      vscode.ViewColumn.One, // 面板显示在哪里，one表示整屏，two会分成2个屏，显示在最右边，以此类推
      {
        localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'media'))] // 定义可加载本地资源的路径
      }
    );

    UploadWebView.currentInstance = new UploadWebView(panel, extensionPath);
  }

  constructor(currentPanel: vscode.WebviewPanel, extensionPath: string) {
    this._panel = currentPanel;
    this._extensionPath = extensionPath;
    // 获取要展示的html内容
    currentPanel.webview.html = this.getHtmlForWebview();
    // 监听面板关闭
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  private getHtmlForWebview(): string {
    const htmlPath = vscode.Uri.file(path.join(this._extensionPath, 'media', 'upload', 'upload.html'));
    return fs.readFileSync(htmlPath.fsPath).toString();
  }

  public dispose() {
    UploadWebView.currentInstance = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

}

