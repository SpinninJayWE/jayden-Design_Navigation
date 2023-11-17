import React from 'react';
import { css } from '@emotion/react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom' 

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const style = css`
		height: calc(100% - 80px);
	`;
	return <div css={style} className={`p-4 overflow-y-scroll`}>
    {children}
  </div>;
};


function App() {
	return (
		<div className={'h-full flex gap-3 bg-[#F4F4F4]'}>
			<SideBar />
			<div className={'flex-1'}>
				<TopBar />
				<Content>
					<Outlet /> {/* 使用 Outlet 组件 */}
				</Content>
			</div>
		</div>
	);
}

export default App;
