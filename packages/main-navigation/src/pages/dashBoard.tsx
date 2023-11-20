import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '@mui/material';
export const DashBoard = () => {

  const items = [
    {
      title: 'chart1',
      grid: {
        lg: 8,
        xs: 12
      }
    },
    {
      title: 'chart2',
      grid: {
        lg: 4,
        xs: 12
      }
    },
    {
      title: 'chart3',
      grid: {
        lg: 6,
        xs: 12
      }
    },
    {
      title: 'chart4',
      grid: {
        lg: 6,
        xs: 12
      }
    }
  ]
    return (
        <Grid container spacing={{md: 2, xs: 1}}>
          {
            items.map((item) => {
              // @ts-ignore
              return <Grid
                  item
                  key={item.title} {...item.grid}
                  height={320}
                  >
                  <Card className={'h-full border-solid bg-white p-4 shadow-lg rounded-3xl'}>
                    {item.title}
                  </Card>
              </Grid>
            })
          }
        </Grid >
    )
}

export default DashBoard