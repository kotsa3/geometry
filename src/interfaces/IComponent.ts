import { ThreeEvent } from '@react-three/fiber';

export type TShape = 'Sphere' | 'Cube' | 'Cylinder' | 'Cone';

export interface IComponent {
  id: string;
  type: TShape;
  name: string;
  position: [number, number, number];
  args: SphereArgs | BoxArgs | CylinderArgs | ConeArgs;
  saveActiveShapeId: (Event: ThreeEvent<MouseEvent>) => void;
}

export type SphereArgs = [
  radius: number,
  widthSegments?: number,
  heightSegments?: number,
  phiStart?: number,
  phiLength?: number,
  thetaStart?: number,
  thetaLength?: number,
];

export type BoxArgs = [width: number, height: number, depth: number];

export type CylinderArgs = [
  radiusTop: number,
  radiusBottom: number,
  height: number,
  radialSegments?: number,
];

export type ConeArgs = [
  radius: number,
  height: number,
  radialSegments?: number,
];
