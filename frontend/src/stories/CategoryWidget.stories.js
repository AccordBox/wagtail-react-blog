import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CategoryWidget } from "../components/CategoryWidget";

import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { mockCategory } from "./mockUtils";

export default {
  title: "CategoryWidget",
  component: CategoryWidget,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockCategory(mock);

  return (
    <MemoryRouter>
      <Container>
        <Row>
          <Col md={4}>
            <CategoryWidget/>
          </Col>
        </Row>
      </Container>
    </MemoryRouter>
  );
};
