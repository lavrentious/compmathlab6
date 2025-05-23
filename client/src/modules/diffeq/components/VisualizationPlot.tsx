import React, { useMemo } from "react";
import Plot from "react-plotly.js";

import { DiffEqResponse } from "../api/types";

interface VisualizationPlotProps {
  result: DiffEqResponse | null;
}

const VisualizationPlot: React.FC<VisualizationPlotProps> = ({ result }) => {
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

    return ans;
  }, [result]);

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
