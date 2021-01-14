import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { TagWidget } from "../components/TagWidget";

import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { mockTag } from "./mockUtils";

export default {
  title: "TagWidget",
  component: TagWidget,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockTag(mock);

  return (
    <MemoryRouter>
      <Container>
        <Row>
          <Col md={4}>
            <TagWidget/>
          </Col>
        </Row>
      </Container>
    </MemoryRouter>
  );
};
