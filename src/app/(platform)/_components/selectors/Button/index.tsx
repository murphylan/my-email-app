import { UserComponent, useNode } from '@craftjs/core'; // 从 Craft.js 导入 UserComponent 类型和 useNode hook
import cx from 'classnames'; // 从 classnames 库导入 cx 用于条件合并 class 名
import React from 'react'; // 从 React 导入 React

import { ButtonSettings } from './ButtonSettings'; // 导入按钮设置组件
import { Text } from '../Text'; // 导入文本组件

// 定义 Button 组件的属性类型
type ButtonProps = {
  background?: Record<'r' | 'g' | 'b' | 'a', number>; // 背景颜色
  color?: Record<'r' | 'g' | 'b' | 'a', number>; // 文本颜色
  buttonStyle?: string; // 按钮样式类型
  margin?: any[]; // 按钮外边距
  text?: string; // 按钮文本
  textComponent?: any; // 文本组件
};

// 生成背景颜色的字符串
const rgbaColor = (color: Record<'r' | 'g' | 'b' | 'a', number>) =>
  `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

// 定义 Button 组件
export const Button: UserComponent<ButtonProps> = (props: any) => {
  // 使用 useNode hook 获取节点的连接器和事件
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected, // 获取节点的 selected 事件
  }));

  // 从 props 中解构出文本和文本组件
  const { text, textComponent, color, background, buttonStyle, margin } = props;

  return (
    <button
      ref={connect as any} // 连接节点以启用拖拽和其他功能
      className={cx(
        'rounded w-full px-4 py-2', // 添加基本样式
        {
          'shadow-lg': buttonStyle === 'full', // 如果按钮样式为 'full'，则添加阴影样式
          'border-2': buttonStyle === 'outline', // 如果按钮样式为 'outline'，则添加边框样式
        }
      )}
      style={{
        background: buttonStyle === 'full' ? rgbaColor(background) : 'transparent', // 根据 buttonStyle 设置背景颜色
        borderColor: buttonStyle === 'outline' ? rgbaColor(background) : 'transparent', // 根据 buttonStyle 设置边框颜色
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`, // 设置外边距
      }}
    >
      {/* 渲染文本组件 */}
      <Text {...textComponent} text={text} color={color} />
    </button>
  );
};

// 为 Button 组件添加 Craft.js 配置
Button.craft = {
  displayName: 'Button', // 组件显示名称
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 }, // 默认背景颜色
    color: { r: 92, g: 90, b: 90, a: 1 }, // 默认文本颜色
    buttonStyle: 'full', // 默认按钮样式
    text: 'Button', // 默认按钮文本
    margin: ['5', '0', '5', '0'], // 默认外边距
    textComponent: {
      ...Text.craft.props, // 继承 Text 组件的默认属性
      textAlign: 'center', // 设置文本对齐方式为居中
    },
  },
  related: {
    toolbar: ButtonSettings, // 关联的工具栏组件
  },
};
