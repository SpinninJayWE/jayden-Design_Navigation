import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {HighChart, PieChart} from "../components/charts";
import {mockChartProps} from "../components/charts/mock";
import useTheme from "../hooks/useTheme";
import { Card } from '@mui/material';

const DashBoardCard = ({ children }: {children: React.ReactNode} ) => {
  return (
      <Card
          sx={{
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)',  // 细微的阴影
            borderRadius: '16px',  // 圆角弧度
          }}
          className={'h-full max-h-[320px] border-solid p-6 shadow-lg rounded-2xl'}
      >
          {children}
      </Card>
  )
}

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

  const { theme } = useTheme()
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
                  <DashBoardCard>
                    <HighChart {...mockChartProps()} />
                  </DashBoardCard>
              </Grid>
            })
          }
        </Grid >
    )
}

export default DashBoard