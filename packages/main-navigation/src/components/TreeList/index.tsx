import React, {useState, ReactNode, createContext, useContext, useMemo} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {Box, ListItemButton, ListItemIcon} from "@mui/material";
import useTheme from "../../hooks/useTheme";
import {TransitionGroup} from "react-transition-group";
import {css} from "@emotion/react";

interface TreeProviderProps {
  selectedNode: TreeNode | null | undefined;
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
  path?: string
}

// 定义 TreeItem 的属性类型
export interface TreeItemProps {
  level: number;
  node: TreeNode;
}

export const TreeItem: React.FC<TreeItemProps> = React.memo(({ node, level }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme()
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

  const textColorClass = isSelected? 'text-white' : ''

  return (
      <>
        <ListItem
            className=''
            button
            onClick={handleSelect}
            selected={isSelected}
            sx={{
              paddingLeft: (level + 1) * 16 + 'px'
            }}
            style={{ backgroundColor: (isSelected) ? theme.primary.main : 'inherit' }} // 当节点被选中时改变背景色
        >
          {node.icon && <ListItemIcon classes={{
            root: textColorClass
          }} sx={{
            color: isSelected ? 'white' : '',
            minWidth: '32px'
          }}>{node.icon}</ListItemIcon>}
          <ListItemText
            className={`${textColorClass} truncate`}
            primaryTypographyProps={{
              fontSize: '14px'
            }}
          >
            {node.title}
          </ListItemText>
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
  customSelectedNode?: TreeProviderProps['selectedNode'];
  treeData: TreeNode[];
  onNodeToggle?: (node: TreeNode) => void;
  onNodeSelect?: (node: TreeNode) => void;
  animations?: boolean
}




export const Tree: React.FC<TreeProps> = ({
    treeData,
    onNodeToggle,
    onNodeSelect ,
    customSelectedNode,
    animations
  }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const handleNodeToggle = (node: TreeNode) => {
    // 调用外部传入的onNodeToggle事件处理器
    onNodeToggle?.(node);
  };

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNode(node); // 更新当前选中的节点状态
    onNodeSelect?.(node); // 调用外部传入的onNodeSelect事件处理器
  };

  const renderTreeItem = (node: TreeNode, level: number = 0): React.ReactNode => {
    return (
      <TreeItem
        key={node.key}
        node={node}
        level={level}
      />
    );
  };

  const renderTreeItems = (nodes: TreeNode[], level: number = 0): React.ReactNode => {
    return nodes.map((node) => (
      renderTreeItem(node, level)
    ));
  };

  return (
      <TreeProvider.Provider value={{ selectedNode: customSelectedNode ?? selectedNode, handleNodeSelect, handleNodeToggle }}>
        <List>
          {
            animations ?
              <TransitionGroup>
                {
                  treeData.map(item => (
                    <Collapse key={item.key}>
                      {renderTreeItem(item,  0)}
                    </Collapse>
                  ))
                }
              </TransitionGroup>
              :
              renderTreeItems(treeData)
          }
        </List>
      </TreeProvider.Provider>
  );
};

export type ListItemInstanceCallBack<T = void> =  (params : { key: string | number, text: string }) => T
interface ListsProps {
  // 动画
  animations?: boolean;
  list: any[];
  width?: number | string;
  height?: number | string;
  activeKey?: string;
  fields?: {
    title?: string
    key?: string
  };
  itemProps ?: {
    onItemClick?: ListItemInstanceCallBack;
    customActionNode?: ListItemInstanceCallBack<ReactNode>
  }
}
interface ListItemProps extends Pick<ListsProps, 'fields' | 'activeKey' |'itemProps'>{
  itemData: any
}
const _ListItem: React.FC<ListItemProps> = (props) =>{

  const { itemData, fields, activeKey, itemProps } = props

  const { onItemClick, customActionNode } = itemProps ?? {}
  const text = useMemo(() =>{
    return fields?.title? itemData[fields.title] : itemData.title ?? ''
  }, [itemData, fields])
  const key = useMemo(() =>{
    return fields?.key? itemData[fields.key] : itemData.key ?? ''
  }, [itemData, fields])
  const isSelected = useMemo(() =>{
    return key === activeKey
  }, [key, activeKey])
  const { theme } = useTheme()
  return (
    <ListItemButton
      onClick={() =>{
        onItemClick && onItemClick({ text, key })
      }}
      selected={isSelected}
    >
      <ListItemText primaryTypographyProps={{
        fontSize: '14px',
        noWrap: true
      }}>
        {text}
      </ListItemText>
      {
        (customActionNode && isSelected) && customActionNode({ text, key })
      }
    </ListItemButton>
  )
}

const ListsItem = React.memo(_ListItem)
export const Lists: React.FC<ListsProps> = (props) =>{

  const {
    width,
    animations,
    list, height,
    fields,
    activeKey,
    itemProps
  } = props

  const renderItems = (list:any[]) =>{
    return (
        animations ?
          <TransitionGroup>
            {
              list.map((item, index) => {
                const key = fields?.key? item[fields.key] : index
                return <Collapse key={key}>
                  <ListsItem itemData={item} fields={fields} activeKey={activeKey} itemProps={itemProps} />
                </Collapse>
              })
            }
          </TransitionGroup>
          :
          list.map((item, index) => {
            const key = fields?.key? item[fields.key] : index
            return <ListsItem key={key} itemData={item} fields={fields} activeKey={activeKey} itemProps={itemProps} />
          })
    )
  }

  const { theme } = useTheme()

  const styles = css`
    width: ${width? width : 'auto'};
    height: ${height ? height : 'auto'};
    overflow-y: auto;
    transform: translateZ(0);
    /* 修改滚动条的样式 */
    ::-webkit-scrollbar {
      width: 4px; /* 设置滚动条的宽度 */
    }

    /* 为滚动条轨道添加背景颜色 */
    ::-webkit-scrollbar-track {
      background-color: ${theme.background.paper};
    }

    /* 为滚动条添加滑块的样式 */
    ::-webkit-scrollbar-thumb {
      background-color: ${theme.border};
    }

    /* 鼠标移入滚动条时的样式 */
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `
  return (
    <Box css={styles}>
      <List>
        {renderItems(list)}
      </List>
    </Box>
  )
}