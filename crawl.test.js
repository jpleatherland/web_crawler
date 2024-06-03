import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normalizeUrl } from "./crawl.js";


// Normalize URL
test('normalise a url', () => {
 expect(normalizeUrl('https://www.google.com')).toBe('google.com');
});

test('normalise a url with path', () => {
  expect(normalizeUrl('https://www.google.com/test/function')).toBe('google.com/test/function');
});

test('string query params', () => {
  expect(normalizeUrl('https://www.google.com/test/function?queryParam=value')).toBe('google.com/test/function');
});

// getURLsFromHTML
test('getURLsFromHTML', () => {
  expect(getURLsFromHTML(`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://www.google.com/images"><span>Another url</span></a>
    </body>
</html>`)).toBe('www.google.com');
})