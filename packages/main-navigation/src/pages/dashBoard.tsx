import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '@mui/material';
import {PieChart} from "../components/charts";
export const DashBoard = () => {

  const items = [
    {
      title: 'chart1',
      grid: {
        lg: 3,
        xs: 12
      }
    },
    {
      title: 'chart2',
      grid: {
        lg: 3,
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
                  >
                  <Card sx={{
                    maxHeight: 280
                  }} className={'h-full border-solid bg-white p-4 shadow-lg rounded-3xl'}>
                    {/*{item.title}*/}
                    <PieChart data={[
                      {
                        name: 'Page A',
                        uv: 4000,
                        pv: 2400,
                        amt: 2400,
                      },
                      {
                        name: 'Page B',
                        uv: 3000,
                        pv: 1398,
                        amt: 2210,
                      },
                      {
                        name: 'Page C',
                        uv: 2000,
                        pv: 9800,
                      }
                    ]} value={'uv'} legend={'name'} />
                  </Card>
              </Grid>
            })
          }
        </Grid >
    )
}

export default DashBoard