import { render as renderDOM } from "test-utils";
import userEvent from "@testing-library/user-event";
import CreateAccountForm, { CreateAccountFormProps } from "components/CreateAccountForm/CreateAccountForm";

const render = (props: Partial<CreateAccountFormProps> = {}) => {
  return {
    user: userEvent.setup(),
    renderedComponent: renderDOM(<CreateAccountForm openSnackbar={() => {}} {...props} />),
  };
};

describe("CreateAccountForm", () => {
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
