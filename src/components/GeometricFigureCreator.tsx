import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Grid2,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  AVAILABLE_FIGURES,
  BUTTON_TEXTS,
  FIGURE_CHARACTERISTICS,
} from '../constants';
import { TShape } from '../interfaces/IComponent';

interface IGeometricFigureCreator {
  isOpen: boolean;
  handleClose: () => void;
  updateRows: (name: string, type: TShape) => void;
}

export const GeometricFigureCreator = ({
  isOpen,
  handleClose,
  updateRows,
}: IGeometricFigureCreator) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<TShape | ''>('');
  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const handleUpdateRows = () => {
    if (!name) {
      setNameError(true);

      return;
    }

    if (!type) {
      setTypeError(true);

      return;
    }

    updateRows(name, type);
    handleClose();
    setName('');
    setType('');
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeError(false);
    setType(event.target.value as TShape | '');
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="geometry figures creator dialog"
      aria-describedby="geometry-figures-creator"
      fullWidth
      maxWidth="sm"
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle variant="h5" align="center">
        Create Modal
      </DialogTitle>
      <DialogContent sx={{ pb: 25 }}>
        <Grid2
          container
          spacing={2}
          justifyContent="right"
          alignItems="center"
          sx={{ py: 2 }}
        >
          <Grid2 size={4}>
            <Typography variant="body2" align="center">
              {FIGURE_CHARACTERISTICS.name}
            </Typography>
          </Grid2>
          <Grid2 size={8}>
            <TextField
              required
              label="Required"
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={
                nameError
                  ? 'Please enter geometry figure name (letters, numbers and spaces only)'
                  : ''
              }
              inputProps={{
                pattern: '[A-Za-z0-9 ]+',
              }}
            />
          </Grid2>
        </Grid2>
        <Grid2
          container
          spacing={2}
          justifyContent="right"
          alignItems="center"
          sx={{ py: 2 }}
        >
          <Grid2 size={4}>
            <Typography variant="body2" align="center">
              {FIGURE_CHARACTERISTICS.type}
            </Typography>
          </Grid2>
          <Grid2 size={8}>
            <FormControl sx={{ width: 225 }} error={typeError}>
              <InputLabel id="shape-type">Shape</InputLabel>
              <Select
                labelId="shape-type"
                id="shape-type"
                value={type}
                label="Select a shape"
                onChange={handleTypeChange}
                variant="outlined"
              >
                {AVAILABLE_FIGURES.map((shape: string) => (
                  <MenuItem key={shape} value={shape}>
                    {shape}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleUpdateRows}>
          {BUTTON_TEXTS.create}
        </Button>
        <Button variant="contained" onClick={handleClose} autoFocus>
          {BUTTON_TEXTS.cancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
