'use client';

import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MaterialSelect } from '@mui/material';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';

type SelectProps = {
  name: string;
  label: string;
  options: { value: string; label: React.ReactNode }[];
  control?: Control<FieldValues>;
};

export function Select({ name, label, options, control }: SelectProps): React.JSX.Element {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <MaterialSelect label={label} variant="outlined" {...field}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MaterialSelect>
          {error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  );
}
