import { URL } from 'url';
import { JSDOM } from 'jsdom';

const normalizeUrl = (url) => {
  const parsedUrl = new URL(url);
  let parsedUrlHost = parsedUrl.host
  if (parsedUrlHost.startsWith('www.')) {
    parsedUrlHost = parsedUrlHost.substring(4)
  }

  const returnUrl = parsedUrlHost + (parsedUrl.pathname ?? '')
  return returnUrl.endsWith('/') ? returnUrl.substring(0, returnUrl.length - 1) : returnUrl
}

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const dom = new JSDOM(htmlBody)
  const aTags = dom.window.document.querySelectorAll('a')
  const linkValues = []
  for (let i = 0; i < aTags.length; i++) {
    if (aTags[i].hasAttribute('href')) {
      try {
        let linkValue = new URL(aTags[i].href, baseUrl).href
        linkValues.push(linkValue)
      } catch (error) {
        throw Error(error)
      }
    }
  }
  return linkValues
}

const crawlPage = async (baseUrl) => {
  try{
    const basePage = await fetch(baseUrl)
  } catch (error) {
    throw new Error(error)
  }
  if (basePage.status >= 400){
    console.log(basePage.status, basePage.headerReason ?? '')
    return {
      status: basePage.status,
      reason: basePage.headerReason
    }
  }
  
  return basePage.status
}

export { normalizeUrl, getURLsFromHTML, crawlPage };
