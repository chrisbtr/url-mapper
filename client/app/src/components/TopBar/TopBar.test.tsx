import React from "react";
import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { faker } from "@faker-js/faker";
import TopBar, { TopBarProps, NavBarOption } from "components/TopBar/TopBar";

const renderWithRouter = (
  { rootNav, navBarOptions, ...props }: Partial<TopBarProps> = {},
  { route = "/" } = {}
) => {
  window.history.pushState({}, "Test page", route);

  const defaultRootNav: NavBarOption = {
    key: faker.string.uuid(),
    label: faker.string.alpha(10),
    to: `/${faker.string.alpha(10)}`,
  };

  const navBarElmCount = faker.number.int({ min: 0, max: 3 });
  const defaultNavBarOptions: NavBarOption[] = [];

  for (let i = 0; i < navBarElmCount; i++) {
    defaultNavBarOptions.push({
      key: faker.string.uuid(),
      label: faker.string.alpha(10),
      to: `/${faker.string.alpha(10)}`,
    });
  }

  return {
    user: userEvent.setup(),
    renderedRootNav: rootNav ?? defaultRootNav,
    renderedNavBarOptions: navBarOptions ?? defaultNavBarOptions,
    renderedComponent: render(
      <TopBar
        rootNav={rootNav ?? defaultRootNav}
        navBarOptions={navBarOptions ?? defaultNavBarOptions}
        {...props}
      />
    ),
  };
};

describe("TopBar", () => {
  it("renders the correct number of links", () => {
    const { renderedNavBarOptions, renderedComponent } = renderWithRouter();
    const expectedLinkCount = renderedNavBarOptions.length + 1;

    const linkElements = renderedComponent.getAllByRole("link");

    expect(linkElements.length).toBe(expectedLinkCount);
  });

  it("is has the correct hrefs and names", () => {
    const { renderedRootNav, renderedNavBarOptions, renderedComponent } =
      renderWithRouter();

    [renderedRootNav, ...renderedNavBarOptions].forEach(
      (renderedNavBarOption) => {
        const navBarLink = renderedComponent.getByText(
          renderedNavBarOption.label
        );
        expect(navBarLink).toHaveAttribute("href", renderedNavBarOption.to);
        expect(navBarLink).toHaveTextContent(renderedNavBarOption.label);
      }
    );
  });

  it("can navigate to different routes", async () => {
    const { user, renderedRootNav, renderedNavBarOptions, renderedComponent } =
      renderWithRouter();

    for (const renderedNavBarOption of [
      renderedRootNav,
      ...renderedNavBarOptions,
    ]) {
      const navBarLink = renderedComponent.getByText(
        renderedNavBarOption.label
      );

      await user.click(navBarLink);
      expect(location.pathname).toBe(renderedNavBarOption.to);
    }
  });
});
