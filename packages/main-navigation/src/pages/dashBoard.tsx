import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '@mui/material';
import {HighChart, PieChart} from "../components/charts";
import {mockChartProps} from "../components/charts/mock";
export const DashBoard = () => {
  const items = [
    {
      title: 'chart1',
      grid: {
        lg: 8,
        xs: 12
      },
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
        lg: 3,
        xs: 12
      }
    },
    {
      title: 'chart4',
      grid: {
        lg: 3,
        xs: 12
      }
    },
    {
      title: 'chart5',
      grid: {
        lg: 3,
        xs: 12
      }
    },
    {
      title: 'chart6',
      grid: {
        lg: 3,
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
                  sx={{
                    marginBottom: '16px'
                  }}
                  >
                  <div className={'h-full max-h-[320px] border-solid bg-white p-4 shadow-lg rounded-2xl'}>
                    {/*{item.title}*/}
                    <HighChart {...mockChartProps()} />
                  </div>
              </Grid>
            })
          }
        </Grid >
    )
}

export default DashBoard