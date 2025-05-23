import { useCallback } from "react";
import { Button, Card } from "react-bootstrap";
import { BiExport } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import VisualizationPlot from "./VisualizationPlot";
import VisualizationTable from "./VisualizationTable";

const VisualizationBlock = () => {
  const { result, realFExpr } = useSelector(
    (state: RootState) => state.simulation,
  );

  const downloadJson = useCallback(() => {
    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  return (
    <Card>
      <Card.Header>Results</Card.Header>
      <Card.Body>
        {result ? (
          <>
            <VisualizationPlot result={result} realFExpr={realFExpr} />
          </>
        ) : (
          <p>No results yet</p>
        )}
        {result && (
          <>
            <h5>DiffEq solution result</h5>
            <VisualizationTable result={result} realFExpr={realFExpr} />
          </>
        )}
      </Card.Body>
      {result && (
        <Card.Footer>
          <Button onClick={downloadJson} variant="secondary">
            <BiExport /> Export to json
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default VisualizationBlock;
