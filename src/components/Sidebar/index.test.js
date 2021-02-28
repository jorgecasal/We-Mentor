import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./";

describe("Sidebar", () => {
  test("renders Start menu item", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const linkElement = getByText(/Start/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Gravidveckor menu item", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const linkElement = getByText(/Gravid/i);
    expect(linkElement).toBeInTheDocument();
  });
});
