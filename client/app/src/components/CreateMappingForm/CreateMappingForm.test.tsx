import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateMappingForm from "components/CreateMappingForm/CreateMappingForm";

describe("CreateMappingForm", () => {
  it("renders the form", () => {
    render(<CreateMappingForm />);

    const inputElements = screen.getAllByRole("textbox");
    expect(inputElements.length).toBe(2);

    const submitButton = screen.getAllByRole("button");
    expect(submitButton.length).toBe(1);
  });

  it("can submit with valid arguments", async () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
      handleSubmit: jest.fn().mockImplementation((e) => e.preventDefault()),
    };

    render(
      <CreateMappingForm
        paperFormProps={{ onSubmit: testValues.handleSubmit }}
        urlKeyTextFieldProps={{ value: testValues.urlKey }}
        urlTextFieldProps={{ value: testValues.url }}
      />
    );

    const submitButton = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(submitButton)

    expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("has valid 'Your URL Mapping' section", () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    render(
      <CreateMappingForm
        urlKeyTextFieldProps={{ value: testValues.urlKey }}
        urlTextFieldProps={{ value: testValues.url }}
      />
    );

    const shortUrl = screen.getByTestId("url-key");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);

    const fullUrl = screen.getByTestId("full-url");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);
  });

  it("`fullUrl` text color changes in 'Your URL Mapping' section when there is an validation error", () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    render(
      <CreateMappingForm
        urlKeyTextFieldProps={{ value: testValues.urlKey }}
        urlTextFieldProps={{ value: testValues.url, error: true }}
      />
    );

    const fullUrl = screen.getByTestId("full-url-error");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);

    const shortUrl = screen.getByTestId("url-key");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);
  });

  it("`urlKey` text color changes in 'Your URL Mapping' section when there is an validation error", () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    render(
      <CreateMappingForm
        urlKeyTextFieldProps={{ value: testValues.urlKey, error: true }}
        urlTextFieldProps={{ value: testValues.url }}
      />
    );

    const fullUrl = screen.getByTestId("full-url");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);

    const shortUrl = screen.getByTestId("url-key-error");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);
  });

  it("both `fullUrl` and `urlKey` text color changes in 'Your URL Mapping' section when they both have validation errors", () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    render(
      <CreateMappingForm
        urlKeyTextFieldProps={{ value: testValues.urlKey, error: true }}
        urlTextFieldProps={{ value: testValues.url, error: true }}
      />
    );

    const fullUrl = screen.getByTestId("full-url-error");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);

    const shortUrl = screen.getByTestId("url-key-error");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);
  });
});
