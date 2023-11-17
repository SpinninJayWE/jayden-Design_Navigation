import React, {useState} from "react";
import {css} from "@emotion/react";
import {Divider, IconButton} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

export const TopBar = () => {
  const [height, setHeight] = useState(80);
  const style = css`
    height: ${height}px;
    
    .MuiButton-root {
      margin-right: 6px;
      color: #1a1a1a;
      font-size: 18px;
    }
  `
  return (
      <>
        <div css={style} className={`flex items-center py-2 px-4`}>
          <IconButton>
            <DensityMediumIcon />
          </IconButton>
        </div>
        <Divider />
      </>
  );
}

export default TopBar
