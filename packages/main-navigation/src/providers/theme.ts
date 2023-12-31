import { createContext } from "react";
import {createTheme} from "@mui/material";

export const themeDefaultVal = {
  light: {
    primary: {
      main: '#4DB6B1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ec407a',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#757575',
    },
    border: '#e0e0e0',
  },
  dark: {
    primary: {
      main: '#2c8fbb', // 主题颜色
      contrastText: '#fff', // 与主题颜色对比的文字颜色
    },
    secondary: {
      main: '#f48fb1', // 次要颜色
      contrastText: '#fff',
    },
    background: {
      default: '#424242', // 背景色
      paper: '#121212', // 纸张颜色，如卡片、对话框等
    },
    text: {
      primary: '#fff', // 主要文字颜色
      secondary: '#b3b3b3', // 次要文字颜色
    },
    border: '#373737', // 边框颜色
  },
  cyberpunk: {
    primary: {
      main: '#3D5AFE', // 主题颜色 - 鲜艳的电子蓝色
      contrastText: '#fff', // 与主题颜色对比的文字颜色
    },
    secondary: {
      main: '#E91E63', // 次要颜色 - 鲜艳的粉红色
      contrastText: '#fff',
    },
    background: {
      default: '#121212', // 背景色 - 深色背景
      paper: '#1E1E1E', // 纸张颜色，如卡片、对话框等
    },
    text: {
      primary: '#fff', // 主要文字颜色 - 白色文字
      secondary: '#B0BEC5', // 次要文字颜色 - 淡蓝色文字
    },
    border: '#303030', // 边框颜色 - 浅灰色边框
  },
  activeTheme: 'light',
  setTheme: (theme: 'light' | 'dark') => {},
}
export const AppThemeProvider = createContext(themeDefaultVal)

// 基于你的默认值创建 MUI 主题
export function createMuiTheme(themeMode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode: themeMode, // 'light' 或 'dark'
      ...themeDefaultVal[themeMode], // 从你的默认值中扩展颜色
    },
    // 你也可以在这里扩展其他主题配置
  });
}