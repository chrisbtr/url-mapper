import { render as renderDOM } from "test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm, { LoginFormProps } from "components/LoginForm/LoginForm";

const render = (props: Partial<LoginFormProps> = {}) => {
  return {
    user: userEvent.setup(),
    renderedComponent: renderDOM(
      <LoginForm
        openSnackbar={() => {
          return;
        }}
        {...props}
      />
    ),
  };
};

describe("LoginForm", () => {
  it("renders the form", () => {
    const { renderedComponent } = render();

    const usernameInput = renderedComponent.getByLabelText(/username/i);

    expect(usernameInput).toHaveAttribute("type", "text");

    const passwordInput = renderedComponent.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    const submitButton = renderedComponent.getAllByRole("button");
    expect(submitButton.length).toBe(1);
  });
});
