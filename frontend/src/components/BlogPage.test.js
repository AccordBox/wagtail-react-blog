import React from "react";
import BlogPage from "./BlogPage";
import { screen, render } from "@testing-library/react";
import { blogPageData } from "./mockData";
import { PostPageCardContainer } from "./PostPageCardContainer";
import { SideBar } from "./SideBar";
import camelcaseKeys from "camelcase-keys";
import { MemoryRouter } from "react-router-dom";

jest.mock("./PostPageCardContainer", () => ({
  PostPageCardContainer: jest.fn(({ children }) => (
    <div data-testid="PostPageCardContainer">{children}</div>
  )),
}));

jest.mock("./SideBar", () => ({
  SideBar: jest.fn(({ children }) => (
    <div data-testid="SideBar">{children}</div>
  )),
}));

test("BlogPage Test", () => {
  const data = camelcaseKeys(blogPageData, { deep: true });

  const { asFragment } = render(
    <MemoryRouter>
      <BlogPage {...data} />
    </MemoryRouter>
  );

  expect(screen.queryByTestId("PostPageCardContainer")).toBeInTheDocument();
  expect(PostPageCardContainer).toHaveBeenCalledWith(data, expect.anything());

  expect(screen.queryByTestId("SideBar")).toBeInTheDocument();
  expect(SideBar).toHaveBeenCalledWith(data, expect.anything());

  expect(asFragment()).toMatchSnapshot();
});
