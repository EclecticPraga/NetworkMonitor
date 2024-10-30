'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { Input } from '@/components/forms/Input';
import { useStorage } from '@/lib/hooks/useStorage';
import { Select } from '@/components/forms/Select';
import { profile } from 'console';
import { useNextDns } from '@/lib/hooks/api/nextdns';

const schema = zod.object({
  apikey: zod.string().min(1, { message: 'ApiKey is required' }),
  profile: zod.string(),
});

type Values = zod.infer<typeof schema>;

export function Nextdns(): React.JSX.Element {
  const [nextdnsSettings, setNextdnsSettings] = useStorage<Values>('nextdns', {
    apikey: '',
    profile: '',
  });

  const {data: nextProfiles = [], error} = useNextDns<{name: string, id: string}[]>('/profiles');

  const registerForm = useForm<Values>({
    defaultValues: nextdnsSettings,
    resolver: zodResolver(schema)
  });

  const {
    handleSubmit,
    setError,
  } = registerForm;


  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      console.log(values);
      setNextdnsSettings(values);
      // Redirect to confirm password reset
    },
    [setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...registerForm}>
        <Card>
          <CardHeader subheader="NextDNS dashboard settings" title="NextDNS" />
          <Divider />
          <CardContent>
            <Grid container spacing={6} wrap="wrap">
              <Grid md={4} sm={6} xs={12}>
                <Stack spacing={1}>
                  <Typography variant="h6">Api Settings</Typography>
                  <Input label="Api Key" name="apikey" />
                </Stack>
              </Grid>
              <Grid md={4} sm={6} xs={12}>
                <Stack spacing={1}>
                  <Typography variant="h6">Data Settings</Typography>
                  <Select
                    label="Profile"
                    name="profile"
                    options={
                      (nextProfiles || [])
                        .map((profile) => ({ label: profile.name, value: profile.id }))
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type='submit'>Save changes</Button>
          </CardActions>
        </Card>
      </FormProvider>
    </form>
  );
}
