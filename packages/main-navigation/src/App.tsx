import React, {createContext, Suspense} from 'react';
import { css } from '@emotion/react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom'
import {Skeleton} from "@mui/material";

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const style = css`
		height: calc(100% - 80px);
	`;
	return <div css={style} className={`p-4 pl-0 overflow-y-scroll`}>
    {children}
  </div>;
};

const AppThemeProvider = createContext({
	light: {

	},
	dark: {

	}
})


function App() {
	return (
		<div className={`h-full flex md:gap-10 gap-0 bg-[#EFF3F4]`}>
			<SideBar />
			<div className={'flex-1'}>
				<TopBar />
				<Content>
					<Suspense fallback={<Skeleton animation={'wave'} variant="rounded" height={420} />}>
						<Outlet /> {/* 使用 Outlet 组件 */}
					</Suspense>
				</Content>
			</div>
		</div>
	);
}

export default App;
