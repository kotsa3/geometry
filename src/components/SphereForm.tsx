import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { IComponent, SphereArgs } from '../interfaces/IComponent';
import {
  FIGURE_FORM_ERROR_MESSAGE,
  FIGURE_PARAMETER_PATTERN,
  FIGURE_SEGMENT_AMOUNT,
} from '../constants';

interface ISphereForm {
  activeComponent: IComponent;
  changeArgs: (args: SphereArgs) => void;
}

export const SphereForm = ({ activeComponent, changeArgs }: ISphereForm) => {
  const [radius, setRadius] = useState<string>('0');
  const [radiusError, setRadiusError] = useState(false);

  useEffect(() => {
    setRadius(String(activeComponent.args[0]));
  }, [activeComponent]);

  const handleSphereParameterChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setRadius(event.target.value);
    if (event.target.validity.valid) {
      changeArgs([
        Number(event.target.value),
        FIGURE_SEGMENT_AMOUNT,
        FIGURE_SEGMENT_AMOUNT,
      ]);
      setRadiusError(false);
    } else {
      setRadiusError(true);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        gap: 2,
        py: 3,
        flexWrap: 'wrap',
      }}
    >
      <TextField
        required
        label="Radius"
        value={radius}
        onChange={handleSphereParameterChange}
        error={radiusError}
        helperText={radiusError ? FIGURE_FORM_ERROR_MESSAGE : ''}
        inputProps={{
          pattern: FIGURE_PARAMETER_PATTERN,
        }}
      />
    </Box>
  );
};
