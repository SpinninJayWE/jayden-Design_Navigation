import React, {useState, ReactNode, createContext, useContext, useMemo} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {ListItemIcon} from "@mui/material";

interface TreeProviderProps {
  selectedNode: TreeNode | null;
  handleNodeToggle: (node: TreeNode) => void;
  handleNodeSelect: (node: TreeNode) => void;
}

const TreeProvider = createContext<TreeProviderProps>({
  selectedNode: null,
  handleNodeToggle: (node:TreeNode) => {},
  handleNodeSelect: (node:TreeNode) => {}
});

// 定义 node 的类型
export interface TreeNode {
  title: string;
  key: React.Key;
  children?: TreeNode[]; // 可选的子节点数组
  icon?: ReactNode; // 可选的图标
}

// 定义 TreeItem 的属性类型
export interface TreeItemProps {
  level: number;
  node: TreeNode;
}

export const TreeItem: React.FC<TreeItemProps> = React.memo(({ node, level }) => {
  const [open, setOpen] = useState(false);

  const { selectedNode, handleNodeSelect, handleNodeToggle } = useContext(TreeProvider);
  const isSelected = useMemo(()=> {
    return selectedNode?.key === node.key
  }, [selectedNode])
  const handleClick = () => {
    handleNodeToggle(node);
    setOpen(!open);
  };

  const handleSelect = () => {
    handleNodeSelect(node); // 当节点被选中时触发
    if (node.children && node.children.length) {
      handleClick()
    }
  };

  return (
      <>
        <ListItem
            button
            onClick={handleSelect}
            selected={isSelected}
            sx={{
              paddingLeft: (level + 1) * 16 + 'px',
            }}
            style={{ backgroundColor: (isSelected && (!node.children || node.children.length === 0)) ? '#e0f7fa' : 'inherit' }} // 当节点被选中时改变背景色
        >
          {node.icon && <ListItemIcon sx={{
            minWidth: '30px',
          }}>{node.icon}</ListItemIcon>}
          <ListItemText primary={node.title} />
          {node.children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItem>
        {node.children && node.children.length && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {node.children.map((childNode) => (
                    <TreeItem
                        key={childNode.key}
                        node={childNode}
                        level={level + 1}
                    />
                ))}
              </List>
            </Collapse>
        )}
      </>
  );
});


export interface TreeProps {
  treeData: TreeNode[];
  onNodeToggle?: (node: TreeNode) => void;
  onNodeSelect?: (node: TreeNode) => void;
}




export const Tree: React.FC<TreeProps> = ({ treeData, onNodeToggle, onNodeSelect }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const handleNodeToggle = (node: TreeNode) => {
    // 调用外部传入的onNodeToggle事件处理器
    onNodeToggle?.(node);
  };

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNode(node); // 更新当前选中的节点状态
    onNodeSelect?.(node); // 调用外部传入的onNodeSelect事件处理器
  };

  const renderTreeItems = (nodes: TreeNode[], level: number = 0): React.ReactNode => {
    return nodes.map((node) => (
        <TreeItem
            key={node.key}
            node={node}
            level={0}
        />
    ));
  };

  return (
      <TreeProvider.Provider value={{ selectedNode, handleNodeSelect, handleNodeToggle }}>
        <List>{renderTreeItems(treeData)}</List>
      </TreeProvider.Provider>
  );
};