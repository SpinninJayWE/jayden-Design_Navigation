/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box, Button, Typography } from '@mui/material';
import useTheme from '../../hooks/useTheme';

const MarkDownParser = React.memo(({ content }: { content: string }) => {
  const { theme } = useTheme()
  return (
    <Markdown components={{
      code({className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : 'text';
        const codeString = String(children).replace(/\n$/, '');
        return (
                language === 'text' ? <code className='px-1 mx-1' style={{
                  backgroundColor: theme.primary.main,
                  color: theme.primary.contrastText,
                }}>{codeString}</code> : (
                <>
                  <Box className={`flex justify-between items-center px-4 py-2 mt-2 -mb-2 rounded-t-lg`} sx={{
                    backgroundColor: theme.background.default
                  }}>
                    <Typography variant='button' color={'text.secondary'}>{language.toUpperCase()}</Typography>
                    <CopyToClipboard text={codeString}>
                      <Button size='small' variant={'outlined'}>Copy code</Button>
                    </CopyToClipboard>
                  </Box>
                  <SyntaxHighlighter
                    language={language}
                    style={{...oneDark}}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </>
              )
                  
        );
      }
    }}>
      {content}
    </Markdown>
  );
});

export default MarkDownParser;
