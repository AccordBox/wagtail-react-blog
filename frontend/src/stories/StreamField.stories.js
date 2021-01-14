import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StreamField } from "../components/StreamField/StreamField";

import { mockStreamFieldData } from "./mockUtils";

export default {
  title: "StreamField",
  component: StreamField,
};

export const Example = () => {

  return (
    <Container>
      <Row>
        <Col md={8}>
          <StreamField value={mockStreamFieldData}/>
        </Col>
      </Row>
    </Container>
  );
};
