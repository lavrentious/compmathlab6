import Decimal from "decimal.js";
import "katex/dist/katex.min.css";
import React, { useMemo } from "react";
import { Accordion, Badge, Table } from "react-bootstrap";
import { InlineMath } from "react-katex";
import { DiffEqResponse } from "../api/types";
import { calculateErrors, fExprToFunction } from "../utils/utils";

interface VisualizationTableProps {
  result: DiffEqResponse;
  realFExpr?: string | null;
  precision?: number;
}

const VisualizationTable: React.FC<VisualizationTableProps> = ({
  result,
  realFExpr,
  precision = 6,
}) => {
  const realFn = useMemo(() => {
    if (!realFExpr) return null;
    try {
      return fExprToFunction(realFExpr);
    } catch {
      return null;
    }
  }, [realFExpr]);

  const format = (val: string | Decimal) => new Decimal(val).toFixed(precision);

  const errorValues = useMemo(() => {
    if (!result.data || !realFn) return null;
    return calculateErrors(realFn, result.data.points);
  }, [result.data, realFn]);

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
                    <Accordion.Header>
                      points ({result.data.points.length} items)
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover size="sm" responsive>
                        <thead>
                          <tr>
                            <th>
                              <InlineMath>i</InlineMath>
                            </th>
                            <th>
                              <InlineMath>x_i</InlineMath>
                            </th>
                            <th>
                              <InlineMath>y_i</InlineMath>
                            </th>
                            {errorValues && (
                              <th>
                                <InlineMath>\varepsilon_i</InlineMath>
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {result.data.points.map((p, i) => (
                            <tr key={i}>
                              <td>{i}</td>
                              <td>{format(p.x)}</td>
                              <td>{format(p.y)}</td>
                              {errorValues && <td>{format(errorValues[i])}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
            </tr>

            {realFn && (
              <tr>
                <th>total error</th>
                <td>
                  {calculateErrors(realFn, result.data.points)
                    .reduce((a, b) => (a.gt(b) ? a : b), new Decimal(0))
                    .toString()}
                </td>
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
              <td>{format(result.meta.h)}</td>
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
