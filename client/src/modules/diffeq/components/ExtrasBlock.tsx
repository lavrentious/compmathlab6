import { useEffect, useMemo, useState } from "react";
import { Badge, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import { InlineMath } from "react-katex";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/store";
import { setRealFExpr } from "src/store/simulation.reducer";
import { useDebounce } from "use-debounce";
import { fExprToFunction } from "../utils/utils";

const FExprStatusBadge: React.FC<{
  visible: boolean;
  loading: boolean;
  fnOk: boolean;
}> = ({ visible, fnOk, loading }) => {
  if (!visible) return <></>;
  if (loading) {
    return (
      <Badge bg="secondary" style={{ display: "flex", alignItems: "center" }}>
        <Spinner animation="border" size="sm" />
      </Badge>
    );
  }
  return (
    <Badge
      bg={fnOk ? "success" : "danger"}
      style={{ display: "flex", alignItems: "center" }}
    >
      {fnOk ? "OK" : "X"}
    </Badge>
  );
};

const ExtrasBlock = () => {
  const dispatch = useAppDispatch();
  const realFExpr = useSelector(
    (state: RootState) => state.simulation.realFExpr,
  );

  const [fExpr, setFExpr] = useState<string>(realFExpr || "");
  const [debouncedFExpr] = useDebounce(fExpr, 500);

  const fn = useMemo(() => {
    try {
      if (!debouncedFExpr) return null;
      return fExprToFunction(debouncedFExpr);
    } catch {
      return null;
    }
  }, [debouncedFExpr]);

  useEffect(() => {
    if (fExpr !== debouncedFExpr) return;
    dispatch(setRealFExpr(fn ? fExpr : null));
  }, [fn, fExpr, debouncedFExpr, dispatch]);

  useEffect(() => {
    setFExpr(realFExpr || "");
  }, [realFExpr]);

  return (
    <Card>
      <Card.Header>Extras</Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Label>
            Real <InlineMath>f</InlineMath>
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <InlineMath>y=</InlineMath>
            </InputGroup.Text>
            <Form.Control
              value={fExpr}
              onChange={(e) => setFExpr(e.target.value)}
              placeholder="enter to visualize (optional)"
            />
            <FExprStatusBadge
              visible={!!fExpr}
              loading={fExpr !== debouncedFExpr}
              fnOk={!!fn}
            />
          </InputGroup>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default ExtrasBlock;
