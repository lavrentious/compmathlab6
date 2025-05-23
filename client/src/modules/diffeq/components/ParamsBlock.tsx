import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { BiImport } from "react-icons/bi";
import { InlineMath } from "react-katex";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/store";
import {
  setH,
  setImportModalShown,
  setMethod,
  setSourceFExpr,
  setStartingPoint,
  setSteps,
} from "src/store/simulation.reducer";
import { DiffEqMethod } from "../types";
import FloatInput from "./FloatInput";

const ParamsBlock = () => {
  const dispatch = useAppDispatch();
  const { method, sourceFExpr, h, steps, startingPoint } = useSelector(
    (state: RootState) => state.simulation.params,
  );

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as DiffEqMethod;
    dispatch(setMethod(selected));
  };

  return (
    <Card className="mb-3">
      <Card.Header>Params</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>f</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <InlineMath>y'=</InlineMath>
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={sourceFExpr}
                onChange={(e) => dispatch(setSourceFExpr(e.target.value))}
              />
            </InputGroup>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>h</Form.Label>
                <FloatInput value={h} setValue={(v) => dispatch(setH(v))} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>steps</Form.Label>
                <Form.Control
                  type="number"
                  value={steps}
                  onChange={(e) => dispatch(setSteps(+e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>
                  <InlineMath>x_0</InlineMath>
                </Form.Label>
                <FloatInput
                  value={startingPoint.x}
                  setValue={(v) => dispatch(setStartingPoint({ x: v, y: "0" }))}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>
                  <InlineMath>y_0</InlineMath>
                </Form.Label>
                <FloatInput
                  value={startingPoint.y}
                  setValue={(v) => dispatch(setStartingPoint({ x: "0", y: v }))}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>Method</Form.Label>
            <Form.Select onChange={handleMethodChange} value={method}>
              {(
                Object.keys(DiffEqMethod) as Array<keyof typeof DiffEqMethod>
              ).map((key) => (
                <option key={key} value={key}>
                  {DiffEqMethod[key]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(setImportModalShown(true))}
        >
          <BiImport /> import
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ParamsBlock;
