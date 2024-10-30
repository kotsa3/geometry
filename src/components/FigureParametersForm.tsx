import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import {
  BoxArgs,
  ConeArgs,
  CylinderArgs,
  IComponent,
  SphereArgs,
} from '../interfaces/IComponent';
import { BUTTON_TEXTS } from '../constants';
import { SphereForm } from './SphereForm';
import { CubeForm } from './CubeForm';
import { ConeForm } from './ConeForm';
import { CylinderForm } from './CylinderForm';

const componentMap = {
  Sphere: SphereForm,
  Cube: CubeForm,
  Cone: ConeForm,
  Cylinder: CylinderForm,
} as const;

type ComponentType = keyof typeof componentMap;

interface IFigureParametersForm {
  activeComponent: IComponent;
  changeComponentParameters: (
    position: [number, number, number],
    args: SphereArgs | BoxArgs | CylinderArgs | ConeArgs | null
  ) => void;
}

export const FigureParametersForm = ({
  activeComponent,
  changeComponentParameters,
}: IFigureParametersForm) => {
  const [x, setX] = useState<string>('0');
  const [y, setY] = useState<string>('0');
  const [z, setZ] = useState<string>('0');
  const [xError, setXError] = useState(false);
  const [yError, setYError] = useState(false);
  const [zError, setZError] = useState(false);
  const [args, setArgs] = useState<
    SphereArgs | BoxArgs | CylinderArgs | ConeArgs | null
  >(null);
  const { type } = activeComponent as { type: ComponentType };
  const ComponentForm = componentMap[type];

  useEffect(() => {
    setX(String(activeComponent.position[0]));
    setY(String(activeComponent.position[1]));
    setZ(String(activeComponent.position[2]));
  }, [activeComponent]);

  const handleParameterChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(value);
    if (!isNaN(Number(value)) && value !== '') {
      errorSetter(false);
    } else {
      errorSetter(true);
    }
  };

  const handleChangeArgs = (
    figureArguments: SphereArgs | BoxArgs | ConeArgs | null
  ) => {
    setArgs(figureArguments);
  };

  return (
    <>
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
          label="X Coordinate"
          value={x}
          onChange={(event) =>
            handleParameterChange(event.target.value, setX, setXError)
          }
          error={xError}
          helperText={xError ? 'Incorrect parameter' : ''}
          inputProps={{
            pattern: '[0-9.]+',
          }}
        />
        <TextField
          required
          label="Y Coordinate"
          value={y}
          onChange={(event) =>
            handleParameterChange(event.target.value, setY, setYError)
          }
          error={yError}
          helperText={yError ? 'Incorrect parameter' : ''}
          inputProps={{
            pattern: '[0-9.]+',
          }}
        />
        <TextField
          required
          label="Z Coordinate"
          value={z}
          onChange={(event) =>
            handleParameterChange(event.target.value, setZ, setZError)
          }
          error={zError}
          helperText={zError ? 'Incorrect parameter' : ''}
          inputProps={{
            pattern: '[0-9.]+',
          }}
        />
      </Box>
      <ComponentForm
        activeComponent={activeComponent}
        changeArgs={handleChangeArgs}
      />
      <Box>
        <Button
          variant="contained"
          disabled={xError || xError || yError || zError}
          onClick={() =>
            changeComponentParameters([Number(x), Number(y), Number(z)], args)
          }
        >
          {BUTTON_TEXTS.apply}
        </Button>
      </Box>
    </>
  );
};
