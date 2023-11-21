import React, {createContext, Suspense, useState} from 'react';
import { css } from '@emotion/react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom'
import {Box, CssBaseline, Skeleton, ThemeProvider} from "@mui/material";
import {AppThemeProvider, createMuiTheme, themeDefaultVal} from './providers/theme';

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const style = css`
		height: calc(100% - 80px);
	`;
	return <div css={style} className={`p-4 pl-0 overflow-y-scroll`}>
    {children}
  </div>;
};


function App() {
	const [activeTheme, setTheme] =
			useState<'light' | 'dark'>('light')

	const theme = createMuiTheme(activeTheme)
	return (
			<AppThemeProvider.Provider value={{
				...themeDefaultVal,
				activeTheme,
				setTheme,
			}}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Box className={`h-full flex md:gap-10 gap-0`} sx={{
						backgroundColor: theme.palette.background.default,
					}}>
						<SideBar />
						<div className={'flex-1'}>
							<TopBar />
							<Content>
								<Suspense fallback={<Skeleton animation={'wave'} variant="rounded" height={420} />}>
									<Outlet /> {/* 使用 Outlet 组件 */}
								</Suspense>
							</Content>
						</div>
					</Box>
				</ThemeProvider>
			</AppThemeProvider.Provider>
	);
}

export default App;
