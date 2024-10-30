import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { IComponent, ConeArgs } from '../interfaces/IComponent';
import {
  FIGURE_FORM_ERROR_MESSAGE,
  FIGURE_PARAMETER_PATTERN,
  FIGURE_SEGMENT_AMOUNT,
} from '../constants';

interface IConeForm {
  activeComponent: IComponent;
  changeArgs: (args: ConeArgs) => void;
}

export const ConeForm = ({ activeComponent, changeArgs }: IConeForm) => {
  const [radius, setRadius] = useState<string>('0');
  const [height, setHeight] = useState<string>('0');
  const [radiusError, setRadiusError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  useEffect(() => {
    setRadius(String(activeComponent.args[0]));
    setHeight(String(activeComponent.args[1]));
  }, [activeComponent]);

  const handleConeRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.value);
    if (event.target.validity.valid) {
      changeArgs([
        Number(event.target.value),
        Number(height),
        FIGURE_SEGMENT_AMOUNT,
      ]);
      setRadiusError(false);
    } else {
      setRadiusError(true);
    }
  };

  const handleConeHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
    if (event.target.validity.valid) {
      changeArgs([
        Number(radius),
        Number(event.target.value),
        FIGURE_SEGMENT_AMOUNT,
      ]);
      setHeightError(false);
    } else {
      setHeightError(true);
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
        onChange={handleConeRadiusChange}
        error={radiusError}
        helperText={radiusError ? FIGURE_FORM_ERROR_MESSAGE : ''}
        inputProps={{
          pattern: FIGURE_PARAMETER_PATTERN,
        }}
      />
      <TextField
        required
        label="Height"
        value={height}
        onChange={handleConeHeightChange}
        error={heightError}
        helperText={heightError ? FIGURE_FORM_ERROR_MESSAGE : ''}
        inputProps={{
          pattern: FIGURE_PARAMETER_PATTERN,
        }}
      />
    </Box>
  );
};
