import { Point } from "../types";

export const presets: {
  presetName: string;
  sourceFExpr: string;
  h: string; // x step
  steps: number;
  startingPoint: Point;
}[] = [
  {
    presetName: "simple",
    sourceFExpr: "x+y",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "1" },
  },
  {
    presetName: "div",
    sourceFExpr: "x*y",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "1" },
  },
  {
    presetName: "nonlinear",
    sourceFExpr: "y**2",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "1" },
  },
];
