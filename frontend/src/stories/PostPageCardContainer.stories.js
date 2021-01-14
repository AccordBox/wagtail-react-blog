import React from "react";

import { Route, Switch } from "react-router";
import { MemoryRouter } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import { PostPageCardContainer } from "../components/PostPageCardContainer";

import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { mockPost } from "./mockUtils";

export default {
  title: "PostPageCardContainer",
  component: PostPageCardContainer,
};

export const Pagination = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);

  return (
    <Container>
      <Row>
        <MemoryRouter initialEntries={["/"]}>
          <Switch>
            <Route path="/tag/:tag/:page([\d]+)?" component={PostPageCardContainer}/>
            <Route path="/:page([\d]+)?" component={PostPageCardContainer}/>
          </Switch>
        </MemoryRouter>
      </Row>
    </Container>
  );
};

export const TagFilter = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);

  return (
    <Container>
      <Row>
        <MemoryRouter initialEntries={["/tag/react"]}>
          <Switch>
            <Route path="/tag/:tag/:page([\d]+)?" component={PostPageCardContainer}/>
            <Route path="/:page([\d]+)?" component={PostPageCardContainer}/>
          </Switch>
        </MemoryRouter>
      </Row>
    </Container>
  );
};
