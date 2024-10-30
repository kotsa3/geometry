import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { IComponent, BoxArgs } from '../interfaces/IComponent';
import {
  FIGURE_FORM_ERROR_MESSAGE,
  FIGURE_PARAMETER_PATTERN,
} from '../constants.ts';

interface ICubeForm {
  activeComponent: IComponent;
  changeArgs: (args: BoxArgs) => void;
}

export const CubeForm = ({ activeComponent, changeArgs }: ICubeForm) => {
  const [face, setFace] = useState<string>('0');
  const [faceError, setFaceError] = useState(false);

  useEffect(() => {
    setFace(String(activeComponent.args[0]));
  }, [activeComponent]);

  const handleCubeParameterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFace(event.target.value);
    if (event.target.validity.valid) {
      changeArgs([
        Number(event.target.value),
        Number(event.target.value),
        Number(event.target.value),
      ]);
      setFaceError(false);
    } else {
      setFaceError(true);
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
        label="Face"
        value={face}
        onChange={handleCubeParameterChange}
        error={faceError}
        helperText={faceError ? FIGURE_FORM_ERROR_MESSAGE : ''}
        inputProps={{
          pattern: FIGURE_PARAMETER_PATTERN,
        }}
      />
    </Box>
  );
};
