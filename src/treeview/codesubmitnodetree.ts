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

  // 添加一个静态方法去注册数视图
  public static initTreeNode() {
    // 代码提交树视图注册
    vscode.window.registerTreeDataProvider('codesubmit', new CodeSubmitNode());
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

  // 给树节点注册事件
  command = {
    title: this.label,  // 标题
    command: "codeSubmitNodeClick", // 命令的id,注册命令的时候用到
    tooltip: this.label,  // 鼠标悬停时的提示信息
    arguments: [     // 传递的参数: 保留，可能以后会用到
      this.label,
      this.nodeIcon,
    ]

  }
}