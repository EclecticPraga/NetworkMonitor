'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';
import dayjs from 'dayjs';
import { formatNumber } from '@/lib/numbers';

const data = {
  "data": [
      {
          "status": "default",
          "queries": [
              0,
              0,
              0,
              14368,
              12914,
              45333,
              54730,
              30869,
              28053,
              22892,
              19732,
              26564,
              26525,
              17026,
              6212,
              9170,
              6407,
              9388,
              6980,
              8610,
              5437,
              3315,
              5084,
              6754,
              7427,
              7229,
              6330,
              1781,
              4101
          ]
      },
      {
          "status": "blocked",
          "queries": [
              0,
              0,
              0,
              732,
              109,
              2339,
              1845,
              1337,
              448,
              250,
              818,
              625,
              596,
              602,
              125,
              222,
              92,
              62,
              40,
              54,
              53,
              83,
              27,
              55,
              186,
              89,
              44,
              20,
              20,
             
          ]
      },
      {
          "status": "allowed",
          "queries": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              28,
              31,
              5,
              19,
              9,
              35,
              17,
              0,
              8,
              1,
              1,
              0,
              0,
              0,
              9,
              0,
              0,
              0,
              4,
              0,
              0,
              0,
          ]
      }
  ],
  "meta": {
      "series": {
          "times": [
              "2024-07-27T05:15:18.233Z",
              "2024-07-28T05:15:18.233Z",
              "2024-07-29T05:15:18.233Z",
              "2024-07-30T05:15:18.233Z",
              "2024-07-31T05:15:18.233Z",
              "2024-08-01T05:15:18.233Z",
              "2024-08-02T05:15:18.233Z",
              "2024-08-03T05:15:18.233Z",
              "2024-08-04T05:15:18.233Z",
              "2024-08-05T05:15:18.233Z",
              "2024-08-06T05:15:18.233Z",
              "2024-08-07T05:15:18.233Z",
              "2024-08-08T05:15:18.233Z",
              "2024-08-09T05:15:18.233Z",
              "2024-08-10T05:15:18.233Z",
              "2024-08-11T05:15:18.233Z",
              "2024-08-12T05:15:18.233Z",
              "2024-08-13T05:15:18.233Z",
              "2024-08-14T05:15:18.233Z",
              "2024-08-15T05:15:18.233Z",
              "2024-08-16T05:15:18.233Z",
              "2024-08-17T05:15:18.233Z",
              "2024-08-18T05:15:18.233Z",
              "2024-08-19T05:15:18.233Z",
              "2024-08-20T05:15:18.233Z",
              "2024-08-21T05:15:18.233Z",
              "2024-08-22T05:15:18.233Z",
              "2024-08-23T05:15:18.233Z",
              "2024-08-24T05:15:18.233Z",
          ],
          "interval": 86400
      },
      "pagination": {
          "cursor": null
      }
  }
};

export interface NextDnsQueriesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
}

export function NextDnsQueries({ sx }: NextDnsQueriesProps): React.JSX.Element {
  const chartSeries = React.useMemo(() => {
    return data.data.map(({status, queries}) => ({
      name: status,
      data: queries
    }))
  }, []);
  console.log(chartSeries);
  const chartOptions = useChartOptions(data.meta.series.times);

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sync
          </Button>
        }
        title="NextDNS Queries"
      />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="area" width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Overview
        </Button>
      </CardActions>
    </Card>
  );
}

function useChartOptions(labelsData: string[]): ApexOptions {
  const theme = useTheme();

  return React.useMemo(() => {
    const categories = labelsData.map((time) => dayjs(time).format('MMM DD'));

    return {
      chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
      colors: [theme.palette.primary.main, theme.palette.secondary.main, alpha(theme.palette.secondary.main, 0.25)],
      dataLabels: { enabled: false },
      tooltip: {
        shared: true,
        x: { formatter: (value) => dayjs(value).format('MMM DD') },
      },
      fill: { opacity: 1, type: 'solid' },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 2,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      legend: { show: false },
      plotOptions: { bar: { columnWidth: '40px' } },
      stroke: { colors: ['transparent'], show: true, width: 2 },
      theme: { mode: theme.palette.mode },
      xaxis: {
        axisBorder: { color: theme.palette.divider, show: true },
        axisTicks: { color: theme.palette.divider, show: true },
        categories,
        labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
      },
      yaxis: {
        labels: {
          formatter: formatNumber,
          offsetX: -10,
          style: { colors: theme.palette.text.secondary },
        },
      },
    }
  }, [labelsData]);
}
