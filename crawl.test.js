import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normalizeUrl, crawlPage } from "./crawl.js";


// Normalize URL
test('normalise a url', () => {
  expect(normalizeUrl('https://www.google.com')).toEqual('google.com');
});

test('normalise a url with path', () => {
  expect(normalizeUrl('https://www.google.com/test/function')).toEqual('google.com/test/function');
});

test('string query params', () => {
  expect(normalizeUrl('https://www.google.com/test/function?queryParam=value')).toEqual('google.com/test/function');
});

// getURLsFromHTML
test('getURLsFromHTML', () => {
  expect(getURLsFromHTML(`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://www.google.com/images"><span>Another url</span></a>
    </body>
</html>`)).toEqual(['https://blog.boot.dev/', 'https://www.google.com/images']);
})

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = ['https://blog.boot.dev/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = ['https://blog.boot.dev/path/one']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = ['https://blog.boot.dev/path/one', 'https://other.com/path/one']
  expect(actual).toEqual(expected)
})

test('crawlPage', async () => {
  const actual = await crawlPage('https://wagslane.dev');
  expect(actual).toContain('I write about code, business, philosophy, or whatever else is interesting to me');
});