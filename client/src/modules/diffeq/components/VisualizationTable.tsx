import "katex/dist/katex.min.css";
import React, { useMemo } from "react";
import { Accordion, Badge, Table } from "react-bootstrap";

import { DiffEqResponse } from "../api/types";
import { calculateError, fExprToFunction } from "../utils/utils";

interface VisualizationTableProps {
  result: DiffEqResponse;
  realFExpr?: string | null;
  precision?: number;
}

const VisualizationTable: React.FC<VisualizationTableProps> = ({
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

  return (
    <Table bordered hover responsive className="mb-0">
      <tbody>
        <tr>
          <th>Status</th>
          <td>
            {result.success ? (
              <Badge bg="success">Success</Badge>
            ) : (
              <Badge bg="danger">Failed</Badge>
            )}
          </td>
        </tr>
        <tr>
          <th>Used Method</th>
          <td>{result.method}</td>
        </tr>

        {result.data && (
          <>
            <tr>
              <td colSpan={2}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Points</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {result.data.points.map((p, i) => (
                          <li key={i}>
                            ({p.x} ; {p.y})
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
            </tr>
            {realFn && (
              <tr>
                <th>Error</th>
                <td>{calculateError(realFn, result.data.points).toString()}</td>
              </tr>
            )}
          </>
        )}

        {result.meta && (
          <>
            <tr>
              <th>Steps</th>
              <td>{result.meta.steps}</td>
            </tr>
            <tr>
              <th>h</th>
              <td>{result.meta.h}</td>
            </tr>
          </>
        )}

        {result.message && (
          <tr>
            <th>Message</th>
            <td>{result.message}</td>
          </tr>
        )}

        <tr>
          <th>calculation time</th>
          <td>{result.time_ms.toFixed(3)} ms</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default VisualizationTable;
