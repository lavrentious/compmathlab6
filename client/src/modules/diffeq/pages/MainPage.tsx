import { Col, Container, Row } from "react-bootstrap";

import ImportModal from "../components/ImportModal";
import ParamsBlock from "../components/ParamsBlock";
import SimulateButton from "../components/SimulateButton";
import VisualizationBlock from "../components/VisualizationBlock";

const MainPage = () => {
  return (
    <Container>
      <h2>Главная</h2>
      <Row>
        <Col md={6} lg={4}>
          <ParamsBlock />
          <SimulateButton />

          <ImportModal />
        </Col>
        <Col md={6} lg={8}>
          <VisualizationBlock />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
