import { Point } from "../types";

export const presets: {
  presetName: string;
  sourceFExpr: string;
  h: string; // x step
  steps: number;
  startingPoint: Point;
  realFExpr?: string;
}[] = [
  {
    presetName: "linear",
    sourceFExpr: "x+y",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "1" },
    realFExpr: "2*e**x - x - 1",
  },
  {
    presetName: "independent",
    sourceFExpr: "y*(1-y)",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "0.1" },
    realFExpr: "1/(1+9*e**(-x))",
  },
  {
    presetName: "sin",
    sourceFExpr: "cos(x)",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "0" },
    realFExpr: "sin(x)",
  },
  {
    presetName: "fimoz",
    sourceFExpr: "-15*y",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "1" },
    realFExpr: "e**(-15*x)",
  },
  {
    presetName: "nonlinear",
    sourceFExpr: "x**2+y**2",
    h: "0.1",
    steps: 10,
    startingPoint: { x: "0", y: "0" },
  },
];
