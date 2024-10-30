import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { IRow } from '../interfaces/IRow';
import cloneDeep from 'lodash.clonedeep';
import {
  BoxArgs,
  ConeArgs,
  CylinderArgs,
  IComponent,
  SphereArgs,
} from '../interfaces/IComponent';
import { IconButton, Typography, Box } from '@mui/material';
import { ComponentRenderer } from './ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import { FigureParametersForm } from './FigureParametersForm';
import { FIGURE_SEGMENT_AMOUNT } from '../constants';

interface IScene {
  rows: IRow[];
  hideScene: () => void;
}

const componentMapArgs: Record<
  IComponent['type'],
  SphereArgs | BoxArgs | CylinderArgs | ConeArgs
> = {
  Sphere: [1, FIGURE_SEGMENT_AMOUNT, FIGURE_SEGMENT_AMOUNT],
  Cube: [1, 1, 1],
  Cylinder: [1, 1, 3, FIGURE_SEGMENT_AMOUNT],
  Cone: [0.75, 1.5, FIGURE_SEGMENT_AMOUNT],
};

const xCoordinateStep = 2;

export const Scene = ({ rows, hideScene }: IScene) => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const [activeComponent, setActiveComponent] = useState<IComponent | null>(
    null
  );

  const defineActiveComponentId = (component: IComponent) => {
    setActiveComponent(component);
  };

  const changeComponentParameters = (
    position: [number, number, number],
    args: SphereArgs | BoxArgs | CylinderArgs | ConeArgs | null
  ) => {
    const clonedComponents: IComponent[] = cloneDeep(components);
    const activeElement = clonedComponents.find(
      (element: IComponent) => element.id === activeComponent?.id
    );

    if (!activeElement) {
      throw new Error(`Something went wrong with collection filtration`);
    }
    console.log(args);

    activeElement.position = position;
    if (args) {
      activeElement.args = args;
    }
    setComponents(clonedComponents);
    setActiveComponent(activeElement);
  };

  useEffect(() => {
    const componentsData: IComponent[] = rows.reduce(
      (accumulator: IComponent[], { type, name }, index) => {
        const xPosition = index * xCoordinateStep - (rows.length - 1);
        const id = uuidv4();
        const componentData: IComponent = {
          id: id,
          type: type,
          position: [xPosition, 0, 0],
          args: componentMapArgs[type],
          name: name,
          saveActiveShapeId: () => defineActiveComponentId(componentData),
        };
        accumulator.push(componentData);

        return accumulator;
      },
      []
    );
    setComponents(componentsData);
  }, [rows]);

  return (
    <Box>
      {activeComponent && <Typography>{activeComponent.name}</Typography>}
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={hideScene}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 12,
            color: theme.palette.common.white,
            zIndex: theme.zIndex.fab,
          })}
        >
          <CloseIcon />
        </IconButton>
        <Canvas style={{ height: '40vh', background: '#1a1a1a' }}>
          {/* OrbitControls for camera rotation */}
          <OrbitControls enableZoom={false} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <ComponentRenderer components={components} />
        </Canvas>
        {activeComponent && (
          <FigureParametersForm
            activeComponent={activeComponent}
            changeComponentParameters={changeComponentParameters}
          />
        )}
      </Box>
    </Box>
  );
};
