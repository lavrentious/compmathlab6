export type Point = {
  x: string; // float as string
  y: string; // float as string
};

export enum DiffEqMethod {
  EULER = "EULER",
  MOD_EULER = "MOD_EULER",
  RK4 = "RK4",
  ADAMS = "ADAMS",
}
