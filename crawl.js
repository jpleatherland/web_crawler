import { URL } from 'url';
import { JSDOM } from 'jsdom';

const normalizeUrl = (url) => {
  const parsedUrl = new URL(url);
  let parsedUrlHost = parsedUrl.host
  if (parsedUrlHost.startsWith('www.')){
    parsedUrlHost = parsedUrlHost.substring(4)
  }

  const returnUrl = parsedUrlHost + (parsedUrl.pathname ?? '')
  return returnUrl.endsWith('/') ? returnUrl.substring(0, returnUrl.length-1) : returnUrl
}

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const dom = new JSDOM(htmlBody)
  const URLs = dom.window.document.querySelectorAll('a')
  console.log(URLs)
  return URLs
}

export { normalizeUrl, getURLsFromHTML };
