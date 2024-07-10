import { useEditor } from '@craftjs/core';
import React from 'react';

// 从相应文件导出 ToolbarItem、ToolbarSection、ToolbarTextInput 和 ToolbarDropdown 组件
export * from './ToolbarItem';
export * from './ToolbarSection';
export * from './ToolbarTextInput';
export * from './ToolbarDropdown';

// 定义 Toolbar 组件
export const Toolbar = () => {
  // 使用 useEditor hook 从 Craft.js 中获取 active 和 related 数据
  const { active, related } = useEditor((state, query) => {
    // 获取当前选择的节点 ID
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId, // 当前选择的节点 ID
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related, // 当前选择节点的相关信息
    };
  });

  return (
    <div className="py-1 h-full"> {/* 工具栏的容器 */}
      {active && related.toolbar && React.createElement(related.toolbar)} {/* 如果有活动节点且有相关的工具栏，动态创建工具栏 */}
      {!active && (
        <div
          className="px-5 py-2 flex flex-col items-center h-full justify-center text-center" // 没有活动节点时显示的信息
          style={{
            color: 'rgba(0, 0, 0, 0.5607843137254902)', // 设置文本颜色
            fontSize: '11px', // 设置字体大小
          }}
        >
          <h2 className="pb-1">Click on a component to start editing.</h2> {/* 提示用户点击组件进行编辑 */}
          <h2>
            You could also double click on the layers below to edit their names,
            like in Photoshop
          </h2> {/* 提示用户可以双击图层名称进行编辑 */}
        </div>
      )}
    </div>
  );
};
