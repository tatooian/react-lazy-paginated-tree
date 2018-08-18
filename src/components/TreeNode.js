// @flow

import React, { Component } from 'react';
import type { Node, TreeNodeProps } from '../types';
import DefaultIcon from './Icon';
import DefaultBody from './Body';
import Animated from '../decorators/Animated';

@Animated()
class TreeNode extends Component<TreeNodeProps> {
  hasChildren = (): boolean => {
    const { node } = this.props;
    return (
      node.children &&
      node.children.constructor === Array &&
      node.children.length > 0
    );
  };

  render() {
    const {
      node,
      depth,
      theme,
      toggle,
      onKeyToggle,
      select,
      onKeySelect,
    } = this.props;
    return (
      <li style={theme.nodeContainerStyle}>
        <div
          style={{
            ...theme.nodeStyle,
            ...(node.selected ? theme.nodeHighlightStyle : {}),
          }}
        >
          {this.hasChildren() && (
            <DefaultIcon
              theme={theme}
              node={node}
              onClick={toggle}
              onKeyPress={onKeyToggle}
            />
          )}
          <DefaultBody
            theme={theme}
            node={node}
            onClick={select}
            onKeyPress={onKeySelect}
          />
        </div>
        <span style={theme.listContainerStyle}>
          <ul style={theme.listStyle}>
            {node.toggled &&
              this.hasChildren() &&
              node.children.map((childNode: Node) => (
                <TreeNode
                  key={childNode.id}
                  node={childNode}
                  depth={depth + 1}
                  theme={theme}
                  toggle={toggle}
                  onKeyToggle={onKeyToggle}
                  select={select}
                  onKeySelect={onKeySelect}
                />
              ))}
          </ul>
        </span>
      </li>
    );
  }
}

export default TreeNode;