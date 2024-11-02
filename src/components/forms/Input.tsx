'use client';

import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';

type InputProps = {
  name: string;
  label: string;
  type?: string;
  control?: Control<FieldValues>;
};

export function Input({ name, label, type = 'text', control }: InputProps): React.JSX.Element {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput {...field} label={label} type={type} />
          {error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  );
}
