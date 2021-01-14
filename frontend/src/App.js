import React from "react";
import { Route, Switch } from "react-router";
import { Container, Row } from "react-bootstrap";
import { BlogPage } from "./components/BlogPage";
import { PostPage } from "./components/PostPage";

function App() {
  return (
    <Switch>
      <Route path="/post/:id([\d]+)" component={PostPage}/>
      <Route path="/category/:category/:page([\d]+)?" component={BlogPage}/>
      <Route path="/tag/:tag/:page([\d]+)?" component={BlogPage}/>
      <Route path="/:page([\d]+)?" component={BlogPage}/>
      <Route
        path="*"
        component={() => (
          <Container>
            <Row>
              <h1>404</h1>
            </Row>
          </Container>
        )}
      />
    </Switch>
  );
}

export default App;
