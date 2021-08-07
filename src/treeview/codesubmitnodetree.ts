import * as vscode from 'vscode';
import * as path from 'path';

/**
 * @Description: 创建一个代码提交的视图数
 * @Author: zengwenbo
 * @LastModified: 2021/8/7
 */
export class CodeSubmitNode implements vscode.TreeDataProvider<Dependency> {

  // 暂时用不上
  onDidChangeTreeData?: vscode.Event<void | Dependency | null | undefined> | undefined;

  // 获取节点
  getTreeItem(element: Dependency): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(element?: Dependency): vscode.ProviderResult<Dependency[]> {
    return Promise.resolve([
      new Dependency('下载代码', vscode.TreeItemCollapsibleState.None, 'download'),
      new Dependency('更新代码', vscode.TreeItemCollapsibleState.None, 'update'),
      new Dependency('提交代码', vscode.TreeItemCollapsibleState.None, 'submit'),
      new Dependency('合并代码', vscode.TreeItemCollapsibleState.None, 'merge'),
    ]);
  }

}




// 定义一个单项节点
class Dependency extends vscode.TreeItem {
  constructor(
    // 单项节点的标题(展示的view)
    public readonly label: string,
    //TreeItemCollapsibleState.Collapsed 折叠 TreeItemCollapsibleState.Expanded 展开 TreeItemCollapsibleState.None 没有子项
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    // 设置节点的图标
    public readonly nodeIcon: string
  ) {
    super(label, collapsibleState);
  }

  // 设置节点的图标展示 `${this.nodeIcon}.svg`
  iconPath = {
    light: path.join(__filename, '..', '..', '..', 'resources', 'light', `${this.nodeIcon}.svg`),
    dark: path.join(__filename, '..', '..', '..', 'resources', 'dark', `${this.nodeIcon}.svg`)
  };
}