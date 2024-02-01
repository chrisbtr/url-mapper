import { render as renderDOM, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountLoginSwitcher, {
  AccountLoginSwitcherProps,
} from "components/AccountLoginSwitcher/AccountLoginSwitcher";

const render = (props: Partial<AccountLoginSwitcherProps> = {}) => {
  const renderedComponent = renderDOM(<AccountLoginSwitcher {...props} />);

  const tabsComponent = renderedComponent.getByRole("tablist");
  const loginTabButton = tabsComponent.children[0];
  const registerTabButton = tabsComponent.children[1];

  return {
    user: userEvent.setup(),
    tabsComponent,
    loginTabButton,
    registerTabButton,
    renderedComponent,
  };
};

describe("AccountLoginSwitcher", () => {
  it("renders the tab buttons correctly", () => {
    const { tabsComponent, loginTabButton, registerTabButton } = render();

    expect(tabsComponent.childElementCount).toBe(2);

    expect(loginTabButton).toHaveTextContent(/login/i);
    expect(loginTabButton).toHaveAttribute("type", "button");

    expect(registerTabButton).toHaveTextContent(/register/i);
    expect(registerTabButton).toHaveAttribute("type", "button");
  });

  it("can switch between forms", async () => {
    const { user, loginTabButton, registerTabButton } = render();
    const currentForm = screen.getByRole("form");
    expect(currentForm).toHaveAttribute("name", "login-form");

    await user.click(registerTabButton);

    expect(screen.getByRole("form")).toHaveAttribute("name", "register-form");

    await user.click(loginTabButton);

    expect(screen.getByRole("form")).toHaveAttribute("name", "login-form");
  });

  it("calls onClearForm when switching to a new tab", async () => {
    const handleClearForm = jest.fn();
    const { user, registerTabButton } = render({
      onClearForm: handleClearForm,
    });

    await user.click(registerTabButton);
    expect(handleClearForm).toHaveBeenCalledTimes(1);
  });
});
