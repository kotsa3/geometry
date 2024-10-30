import {
  Sphere,
  Box,
  Cylinder,
  Cone,
  MeshDistortMaterial,
} from '@react-three/drei';
import { IComponent } from '../interfaces/IComponent';

const componentMap = {
  Sphere: Sphere,
  Cube: Box,
  Cylinder: Cylinder,
  Cone: Cone,
};

interface IComponentRenderer {
  components: IComponent[];
}

export const ComponentRenderer = ({ components }: IComponentRenderer) => {
  return (
    <>
      {components.map((componentData) => {
        const { id, type, saveActiveShapeId, args, position } = componentData;
        const Component = componentMap[type];
        return Component ? (
          <Component
            key={id}
            onClick={saveActiveShapeId}
            scale={1}
            position={position}
            args={args as never}
          >
            <MeshDistortMaterial
              color="#4A90E2"
              attach="material"
              distort={0}
            />
          </Component>
        ) : null;
      })}
    </>
  );
};
