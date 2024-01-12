import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./TopBar";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe("TopBar", () => {
  it("is rendered correctly", () => {
    renderWithRouter(<TopBar />);

    const homeNavLink = screen.getByTestId("nav-link-home");
    const createMappingNavLink = screen.getByTestId("nav-link-create");
    const allMappingsNavLink = screen.getByTestId("nav-link-mappings");

    expect(homeNavLink).toHaveAttribute("href", "/");
    expect(homeNavLink).toHaveTextContent(/URL Mapper/i);

    expect(createMappingNavLink).toHaveAttribute("href", "/create");
    expect(createMappingNavLink).toHaveTextContent(/Create Mapping/i);

    expect(allMappingsNavLink).toHaveAttribute("href", "/mappings");
    expect(allMappingsNavLink).toHaveTextContent(/All Mappings/i);
  });

  it("can navigate to different routes", async () => {
    renderWithRouter(<TopBar />);

    const createMappingNavLink = screen.getByTestId("nav-link-create");
    const homeNavLink = screen.getByTestId("nav-link-home");
    const allMappingsNavLink = screen.getByTestId("nav-link-mappings");

    expect(location.pathname).toBe("/");

    act(() => {
      userEvent.click(createMappingNavLink);
    });
    expect(location.pathname).toBe("/create");

    act(() => {
      userEvent.click(allMappingsNavLink);
    });
    expect(location.pathname).toBe("/mappings");

    act(() => {
      userEvent.click(homeNavLink);
    });
    expect(location.pathname).toBe("/");
  });
});
