import { render as renderDOM, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SnackbarAlert, { SnackbarAlertProps } from "components/SnackbarAlert/SnackbarAlert";

const render = ({
  open = true,
  autoHideDuration = null,
  ...props
}: SnackbarAlertProps = {}) => {
  return {
    user: userEvent.setup(),
    renderedComponent: renderDOM(
      <SnackbarAlert
        open={open}
        autoHideDuration={autoHideDuration}
        {...props}
      />
    ),
  };
};

describe("SnackbarAlert", () => {
  it("can be closed manually", async () => {
    const handleClose = jest.fn();

    const { user, renderedComponent } = render({
      onClose: handleClose,
    });

    const closeButton = renderedComponent.getByTitle("Close");

    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("closes automatically after a set amount of time", async () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();

    render({
      autoHideDuration: 1000,
      onClose: handleClose,
    });

    expect(handleClose).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("has the severity set to success when `error` is set to false", async () => {
    const { renderedComponent } = render({ error: false });

    const alertComponent = renderedComponent.getByRole("alert");

    expect(alertComponent).toHaveClass("MuiAlert-filledSuccess");
  });

  it("has the severity set to error when `error` is set to true", async () => {
    const { renderedComponent } = render({ error: true });

    const alertComponent = renderedComponent.getByRole("alert");

    expect(alertComponent).toHaveClass("MuiAlert-filledError");
  });
});
