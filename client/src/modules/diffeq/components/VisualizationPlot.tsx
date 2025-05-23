import React, { useMemo } from "react";
import Plot from "react-plotly.js";

import Decimal from "decimal.js";
import { DiffEqResponse } from "../api/types";
import { fExprToFunction, generatePoints } from "../utils/utils";

interface VisualizationPlotProps {
  result: DiffEqResponse | null;
  realFExpr?: string | null;
}

const VisualizationPlot: React.FC<VisualizationPlotProps> = ({
  result,
  realFExpr,
}) => {
  const realFn = useMemo(() => {
    if (!realFExpr) return null;
    try {
      return fExprToFunction(realFExpr);
    } catch {
      return null;
    }
  }, [realFExpr]);
  const { xs: realFnXs, ys: realFnYs } = useMemo(() => {
    if (!realFn || !result?.success) return { xs: [], ys: [] };
    const points = generatePoints(
      realFn,
      new Decimal(Math.min(...result.data.points.map((p) => +p.x))),
      new Decimal(Math.max(...result.data.points.map((p) => +p.x))),
    );
    return points;
  }, [realFn, result]);

  const plotData = useMemo(() => {
    const ans: Plotly.Data[] = [];

    if (result?.success) {
      ans.push({
        x: result.data?.points.map((p) => p.x),
        y: result.data?.points.map((p) => p.y),
        type: "scatter",
        mode: "markers",
        line: { color: "blue" },
        name: "ф(x)",
      });
    }

    if (realFExpr) {
      ans.push({
        x: realFnXs.map((x) => x.toString()),
        y: realFnYs.map((y) => y.toString()),
        type: "scatter",
        mode: "lines",
        line: { color: "red" },
        name: "ф(x) (реальное)",
      });
    }

    return ans;
  }, [realFExpr, realFnXs, realFnYs, result]);

  return (
    <Plot
      style={{ width: "100%", height: "450px" }}
      useResizeHandler={true}
      config={{ responsive: true }}
      data={plotData}
      layout={{
        title: { text: "Result" },
        xaxis: { title: { text: "x" } },
        yaxis: { title: { text: "ф(x)" } },
        autosize: true,
      }}
    />
  );
};

export default VisualizationPlot;
