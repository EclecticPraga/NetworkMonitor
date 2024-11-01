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
import { NextDnsQueriesResponse, useNextDns } from '@/lib/hooks/api/nextdns';

export interface NextDnsQueriesProps {
  sx?: SxProps;
}

export function NextDnsQueries({ sx }: NextDnsQueriesProps): React.JSX.Element {
  const { data, response: { meta } = {}, mutate } = useNextDns<
    NextDnsQueriesResponse['data'],
    NextDnsQueriesResponse
  >('analytics/status;series?interval=86400&from=-1w');

  const chartSeries = React.useMemo(() => {
    return data?.map(({status, queries}) => ({
      name: status,
      data: queries
    })) || [];
  }, [data]);
  const chartOptions = useChartOptions(meta?.series.times);

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}
            onClick={mutate}
          >
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

function useChartOptions(labelsData?: string[]): ApexOptions {
  const theme = useTheme();

  return React.useMemo(() => {
    const categories = (labelsData || []).map((time) => dayjs(time).format('MMM DD'));

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
