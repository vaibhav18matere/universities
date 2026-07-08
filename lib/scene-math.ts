import { Vector3 } from "three";

export function latLngToVector3(
  latitude: number,
  longitude: number,
  radius: number,
): Vector3 {
  const phi = ((90 - latitude) * Math.PI) / 180;
  const theta = ((longitude + 180) * Math.PI) / 180;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new Vector3(x, y, z);
}

export function lerpValue(current: number, target: number, alpha: number): number {
  return current + (target - current) * alpha;
}

export function lerpVector3(
  current: Vector3,
  target: Vector3,
  alpha: number,
): Vector3 {
  current.x = lerpValue(current.x, target.x, alpha);
  current.y = lerpValue(current.y, target.y, alpha);
  current.z = lerpValue(current.z, target.z, alpha);
  return current;
}
