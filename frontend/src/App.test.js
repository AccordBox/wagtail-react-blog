import React from 'react';
import { render, screen, wait, fireEvent } from "@testing-library/react";
import { within } from '@testing-library/dom';
import { MemoryRouter } from "react-router-dom";

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockPost, mockCategory, mockTag } from "./stories/mockUtils";

import App from './App';


test('Test Category Link', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>,
  );

  const elTag = screen.getByText("Categories");
  expect(elTag.tagName).toEqual('H5');
  expect(elTag).toHaveClass('card-header');
  const { getByText } = within(elTag.parentNode);

  await wait(() => expect(getByText("Programming")).toBeInTheDocument());
  const el = getByText('Programming');

  fireEvent.click(el);

  await wait(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());
  await wait(() => expect(screen.getByText("Love React 3")).toBeInTheDocument());

});

test('Test Tag Link', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>,
  );

  const elTag = screen.getByText("Tags");
  expect(elTag.tagName).toEqual('H5');
  expect(elTag).toHaveClass('card-header');
  const { getByText } = within(elTag.parentNode);

  await wait(() => expect(getByText("React")).toBeInTheDocument());
  const el = getByText('React');

  fireEvent.click(el);

  await wait(() => expect(screen.getByText("Love React 2")).toBeInTheDocument());
  await wait(() => expect(screen.getByText("Love React 4")).toBeInTheDocument());

});


test('Test Pagination', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>,
  );

  await wait(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());

  const el = screen.getByText("Next");

  fireEvent.click(el);

  await wait(() => expect(screen.getByText("Love React 3")).toBeInTheDocument());
  await wait(() => expect(screen.getByText("Love React 4")).toBeInTheDocument());

});

test('Check Post Link', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>,
  );

  await wait(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());

  // click post link
  const el = screen.getByText("Love React 1");
  fireEvent.click(el);

  // check if content can render
  await wait(() => expect(screen.getByText("The Zen of Wagtail")).toBeInTheDocument());

});
