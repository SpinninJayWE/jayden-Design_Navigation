import React, { useState } from 'react';
import { css } from '@emotion/react'
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";


const Content: React.FC<{children: React.ReactNode}> = ({children}) => {
  const style = css`
    height: calc(100% - 80px);
  `
  return (
      <div css={style} className={`p-4 overflow-y-scroll`}>
        { children }
      </div>
  );
}
function App() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <div className={'h-full flex '}>
        <SideBar />
        <div className={'flex-1'}>
          <TopBar />
          <Content>
            <div className={`text-2xl`}>Content</div>
          </Content>
        </div>
      </div>
  );
}

export default App;
