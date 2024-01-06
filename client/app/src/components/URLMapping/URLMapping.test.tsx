import { render, screen } from '@testing-library/react';
import URLMapping from './URLMapping';
import { BrowserRouter } from 'react-router-dom';

test("renders links", () => {
  const testValues = {
    urlKey: 'FOO',
    url: 'https://foo.com',
  };

  render(<URLMapping urlMapping={{fullURL: testValues.url, urlKey: testValues.urlKey}} />, {wrapper: BrowserRouter});

  const allLinkElements = screen.getAllByRole('link');

  expect(allLinkElements.length).toBe(2);
});

test("links are correct", () => {
  const testValues = {
    urlKey: 'FOO',
    url: 'https://foo.com',
  };

  render(<URLMapping urlMapping={{fullURL: testValues.url, urlKey: testValues.urlKey}} />, {wrapper: BrowserRouter});

  const allLinkElements = screen.getAllByRole('link');
  
  expect(allLinkElements[0].getAttribute("href")).toBe(`/m/${testValues.urlKey}`);
  expect(allLinkElements[1].getAttribute("href")).toBe(testValues.url);
});

test("link names are correct", () => {
  const testValues = {
    urlKey: 'FOO',
    url: 'https://foo.com',
  };

  render(<URLMapping urlMapping={{fullURL: testValues.url, urlKey: testValues.urlKey}} />, {wrapper: BrowserRouter});

  const allLinkElements = screen.getAllByRole('link');

  expect(allLinkElements[0]).toHaveTextContent(testValues.urlKey);
  expect(allLinkElements[1]).toHaveTextContent(testValues.url);
});