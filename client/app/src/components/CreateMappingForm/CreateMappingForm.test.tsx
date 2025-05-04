import userEvent from "@testing-library/user-event";
import { UrlMappingPostError } from "api/urlMappings";
import { AxiosError, AxiosResponse } from "axios";
import CreateMappingForm, { CreateMappingFormProps } from "./CreateMappingForm";
import { render as renderDOM, screen, waitFor } from "test-utils";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer();

const render = (props: Partial<CreateMappingFormProps> = {}) => {
  const user = userEvent.setup();

  const renderResult = renderDOM(
    <CreateMappingForm openSnackbar={() => {}} {...props} />
  );

  const urlKeyInput = screen.getByRole("textbox", { name: "Key" });
  const urlInput = screen.getByRole("textbox", { name: "Website URL" });

  return {
    user,
    urlKeyInput,
    urlInput,
    ...renderResult,
  };
};

describe("CreateMappingForm", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders the form", () => {
    render();

    const inputElements = screen.getAllByRole("textbox");
    expect(inputElements.length).toBe(2);

    const submitButton = screen.getAllByRole("button");
    expect(submitButton.length).toBe(1);
  });

  it("can submit with valid arguments", async () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
      handleSubmit: jest.fn(),
    };

    server.use(
      rest.post("*/api/mappings/", (req, res, ctx) => {
        testValues.handleSubmit();
        return res(ctx.status(200));
      })
    );

    const { user } = render();

    const submitButton = screen.getByRole("button");

    await user.click(submitButton);

    await waitFor(() => {
      expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("has valid 'Your URL Mapping' section", async () => {
    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    const { user, urlKeyInput, urlInput } = render();

    await user.type(urlKeyInput, testValues.urlKey);
    await user.type(urlInput, testValues.url);

    const shortUrl = screen.getByTestId("url-key");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);

    const fullUrl = screen.getByTestId("full-url");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);
  });

  it("`fullUrl` text color changes in 'Your URL Mapping' section when there is an validation error", async () => {
    // jest.mock("api/urlMappings", () => ({
    //   urlMappingsApi: {
    //     post: jest.fn().mockImplementation(() =>
    //       Promise.reject(
    //         new AxiosError<UrlMappingPostError>("", "", undefined, undefined, {
    //           data: { fullURL: ["test error"] },
    //         } as AxiosResponse<UrlMappingPostError>)
    //       )
    //     ),
    //   },
    // }));

    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    server.use(
      rest.post("*/api/mappings/", (req, res, ctx) => {
        return res(
          ctx.json<UrlMappingPostError>({ fullURL: ["error"] }),
          ctx.status(400)
        );
      })
    );

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    const { user, urlKeyInput, urlInput } = render();

    const submitButton = screen.getByRole("button");

    await user.type(urlKeyInput, testValues.urlKey);
    await user.type(urlInput, testValues.url);

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("full-url-error")).toBeVisible();
    });

    const fullUrl = screen.getByTestId("full-url-error");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);

    const shortUrl = screen.getByTestId("url-key");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);
  });

  it("`urlKey` text color changes in 'Your URL Mapping' section when there is an validation error", async () => {
    server.use(
      rest.post("*/api/mappings/", (req, res, ctx) => {
        return res(
          ctx.json<UrlMappingPostError>({ urlKey: ["error"] }),
          ctx.status(400)
        );
      })
    );

    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    const {urlInput, urlKeyInput, user} = render();

    const submitButton = screen.getByRole("button");

    await user.type(urlKeyInput, testValues.urlKey);
    await user.type(urlInput, testValues.url);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("url-key-error")).toBeVisible();
    });

    const fullUrl = screen.getByTestId("full-url");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);

    const shortUrl = screen.getByTestId("url-key-error");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);
  });

  it("both `fullUrl` and `urlKey` text color changes in 'Your URL Mapping' section when they both have validation errors", async () => {
    server.use(
      rest.post("*/api/mappings/", (req, res, ctx) => {
        return res(
          ctx.json<UrlMappingPostError>({ urlKey: ["urlKey error"], fullURL:  ["fullURL error"] }),
          ctx.status(400)
        );
      })
    );

    const testValues = {
      urlKey: "FOO",
      url: "https://foo.com",
    };

    const expectedShortUrl = `${window.location.origin}/m/${testValues.urlKey}`;
    const expectedFullUrl = testValues.url;

    const {urlInput, urlKeyInput, user} = render();

    const submitButton = screen.getByRole("button");

    await user.type(urlKeyInput, testValues.urlKey);
    await user.type(urlInput, testValues.url);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("url-key-error")).toBeVisible();
    });

    const fullUrl = screen.getByTestId("full-url-error");
    expect(fullUrl).toHaveTextContent(expectedFullUrl);

    const shortUrl = screen.getByTestId("url-key-error");
    expect(shortUrl).toHaveTextContent(expectedShortUrl);
  });
});
