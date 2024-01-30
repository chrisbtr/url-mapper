import { render as renderDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateAccountForm, { CreateAccountFormProps } from "components/CreateAccountForm/CreateAccountForm";

const render = (props: Partial<CreateAccountFormProps> = {}) => {
  return {
    user: userEvent.setup(),
    renderedComponent: renderDOM(<CreateAccountForm {...props} />),
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

  it("can submit", async () => {
    const handleSubmit = jest
      .fn()
      .mockImplementation((e) => e.preventDefault());
    const { renderedComponent, user } = render({
      paperFormProps: { onSubmit: handleSubmit },
    });

    const submitButton = renderedComponent.getByRole("button");

    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
