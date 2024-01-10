import { render, screen } from "@testing-library/react";
import CreateMappingForm from "./CreateMappingForm";

test("renders the form", () => {
  render(<CreateMappingForm />);

  const inputElements = screen.getAllByRole("textbox");
  expect(inputElements.length).toBe(2);

  const submitButton = screen.getAllByRole("button");
  expect(submitButton.length).toBe(1);
});

test("can submit with valid arguments", () => {
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

  submitButton.click();
  expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
});

test("has valid 'Your URL Mapping' section", () => {
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

  const shortUrl = screen.getByTestId('url-key');
  expect(shortUrl).toHaveTextContent(expectedShortUrl);

  const fullUrl = screen.getByTestId('full-url');
  expect(fullUrl).toHaveTextContent(expectedFullUrl);
});

test("`fullUrl` text color changes in 'Your URL Mapping' section when there is an validation error", () => {
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

  const fullUrl = screen.getByTestId('full-url-error');
  expect(fullUrl).toHaveTextContent(expectedFullUrl);

  const shortUrl = screen.getByTestId('url-key');
  expect(shortUrl).toHaveTextContent(expectedShortUrl);
});

test("`urlKey` text color changes in 'Your URL Mapping' section when there is an validation error", () => {
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

  const fullUrl = screen.getByTestId('full-url');
  expect(fullUrl).toHaveTextContent(expectedFullUrl);

  const shortUrl = screen.getByTestId('url-key-error');
  expect(shortUrl).toHaveTextContent(expectedShortUrl);
});

test("both `fullUrl` and `urlKey` text color changes in 'Your URL Mapping' section when they both have validation errors", () => {
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

  const fullUrl = screen.getByTestId('full-url-error');
  expect(fullUrl).toHaveTextContent(expectedFullUrl);

  const shortUrl = screen.getByTestId('url-key-error');
  expect(shortUrl).toHaveTextContent(expectedShortUrl);
});