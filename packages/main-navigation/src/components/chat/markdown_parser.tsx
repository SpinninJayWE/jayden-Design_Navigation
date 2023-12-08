/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box, Button, Card, Typography } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import markdown_css from './markdown_css';
// dracula

const CodeBlock: React.FC<React.HTMLAttributes<HTMLElement>> = React.memo(({inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={dracula}
      children={String(children).replace(/\n$/, "")}
      wrapLongLines={true}
      {...props}
    />
  ) : (
    <Box
      display={"inline"}
      bgcolor={'background.default'}
      color={'text.primary'}
      className={`${className} px-2 py-1 font-bold rounded-md`}
      {...props}
      >
      {children}
    </Box>
  );
});
const MarkDownParser = React.memo(({ content }: { content: string }) => {
  // 创建样式
  // const defaultStyles = css`
  //   p {
  //     /* 添加默认样式 */
  //     margin: 1em 0;
  //   }

  //   h1, h2, h3, h4, h5, h6 {
  //     /* 添加默认样式 */
  //     margin: 1em 0;
  //     font-weight: 600;
  //   }

  //   ol, ul {
  //     /* 添加默认样式 */
  //     padding: 0;
  //     margin: 1em 0;
  //   }

  //   li {
  //     /* 添加默认样式 */
  //     margin-bottom: 0.5em;
  //   }
  // `;

  return <Markdown
    css={markdown_css}
    // components={components}
    components={{
      code: CodeBlock
    }}
    remarkPlugins={[
      remarkGfm
    ]}
    >
      {content}
    </Markdown>;
});

export default MarkDownParser;
