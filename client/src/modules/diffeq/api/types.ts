import { DiffEqMethod, Point } from "../types";

export type DiffEqRequest = {
  method: DiffEqMethod;
  f_expr: string;
  starting_point: Point;
  h: string;
  steps: number;
  epsilon: string | null;
};

export type DiffEqData = {
  points: Point[];
};

export type DiffEqMeta = {
  h: string;
  steps: number;
};

export type DiffEqResponse = {
  method: DiffEqMethod;
  time_ms: number;
} & (
  | { success: true; message: null; data: DiffEqData; meta: DiffEqMeta }
  | { success: false; message: string | null; data: null; meta: null }
);

export type ApiError = {
  status: number;
  data:
    | { detail: string }
    | {
        detail: { msg: string }[];
      };
};
