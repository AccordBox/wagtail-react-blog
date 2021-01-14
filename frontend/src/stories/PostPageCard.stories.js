import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MemoryRouter } from "react-router-dom";
import { PostPageCard } from "../components/PostPageCard";

import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { mockPost } from "./mockUtils";

export default {
  title: "PostPageCard",
  component: PostPageCard,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <MemoryRouter>
            <PostPageCard postPk={1} />
          </MemoryRouter>
        </Col>
      </Row>
    </Container>
  );
};
