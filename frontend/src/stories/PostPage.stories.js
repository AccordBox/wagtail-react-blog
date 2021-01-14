import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { PostPage } from "../components/PostPage";

import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { mockPost, mockTag, mockCategory } from "./mockUtils";

export default {
  title: "PostPage",
  component: PostPage,
};

export const Example1 = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockTag(mock);
  mockCategory(mock);

  return (
    <MemoryRouter initialEntries={['/post/1/']}>
      <Switch>
        <Route path="/post/:id" component={PostPage}/>
      </Switch>
    </MemoryRouter>
  );
};

export const Example2 = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockTag(mock);
  mockCategory(mock);

  return (
    <MemoryRouter initialEntries={['/post/2/']}>
      <Switch>
        <Route path="/post/:id" component={PostPage}/>
      </Switch>
    </MemoryRouter>
  );
};
