import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { IComponent, CylinderArgs } from '../interfaces/IComponent';
import {
  FIGURE_FORM_ERROR_MESSAGE,
  FIGURE_PARAMETER_PATTERN,
  FIGURE_SEGMENT_AMOUNT,
} from '../constants';

interface ICylinderForm {
  activeComponent: IComponent;
  changeArgs: (args: CylinderArgs) => void;
}

export const CylinderForm = ({
  activeComponent,
  changeArgs,
}: ICylinderForm) => {
  const [radius, setRadius] = useState<string>('0');
  const [height, setHeight] = useState<string>('0');
  const [radiusError, setRadiusError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  useEffect(() => {
    setRadius(String(activeComponent.args[0]));
    setHeight(String(activeComponent.args[2]));
  }, [activeComponent]);

  const handleCylinderRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.value);
    if (event.target.validity.valid) {
      changeArgs([
        Number(event.target.value),
        Number(event.target.value),
        Number(height),
        FIGURE_SEGMENT_AMOUNT,
      ]);
      setRadiusError(false);
    } else {
      setRadiusError(true);
    }
  };

  const handleCylinderHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
    if (event.target.validity.valid) {
      changeArgs([
        Number(radius),
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
        onChange={handleCylinderRadiusChange}
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
        onChange={handleCylinderHeightChange}
        error={heightError}
        helperText={heightError ? FIGURE_FORM_ERROR_MESSAGE : ''}
        inputProps={{
          pattern: FIGURE_PARAMETER_PATTERN,
        }}
      />
    </Box>
  );
};
