/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box, Button, Card, Typography } from '@mui/material';
import { Components } from 'react-markdown/lib';

const MarkDownParser = React.memo(({ content }: { content: string }) => {
  const components = useMemo<Partial<Components>>(
      () => {
          return {
            // code(props: any) {
            //   const { children, className, node, ...rest } = props;
            //   const match = /language-(\w+)/.exec(className || '');
            //   return match ? (
            //       <>
            //         <Box bgcolor={'background.default'} className={`flex justify-between items-center px-4 py-2 mt-2 -mb-2 rounded-t-lg`}>
            //           <Typography variant='button' color={'text.secondary'}>{match[1].toUpperCase()}</Typography>
            //           <CopyToClipboard text={String(children).replace(/\n$/, '')}>
            //             <Button size='small' variant={'outlined'}>Copy code</Button>
            //           </CopyToClipboard>
            //         </Box>
            //         <CodeBlock {...rest} language={match[1]}>
            //           {children}
            //         </CodeBlock>
            //       </>
            //   ) : (
            //       <code {...rest} className={className}>
            //         {children}
            //       </code>
            //   );
            // },
          }
      },
      []
  );

  return <Markdown components={components}>{content}</Markdown>;
});

export default MarkDownParser;
