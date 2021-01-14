import React from "react";
import { render, screen, wait} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from 'axios';

import { TagWidget } from "./TagWidget";

jest.mock('axios');

test('render Tag widget', async () => {
  const resp = {
    data: {
      results: [
        {
          slug: "wagtail",
          name: "Wagtail",
        },
        {
          slug: "django",
          name: "Django",
        },
        {
          slug: "react",
          name: "React",
        },
      ],
    }
  };
  axios.get.mockResolvedValue(resp);

  const { asFragment } = render(
    <MemoryRouter>
      <TagWidget />
    </MemoryRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await wait(() => expect(axios.get).toHaveBeenCalled());

  await wait(() => expect(screen.getByText("Wagtail")).toBeInTheDocument());
  const el = screen.getByText("Wagtail");
  expect(el.tagName).toEqual('SPAN');
  expect(el).toHaveClass('badge badge-secondary');

  resp.data.results.map((tag) =>
    expect(screen.getByText(tag.name)).toBeInTheDocument()
  );

  expect(asFragment()).toMatchSnapshot();

});
