import { getURLsFromHTML } from "./crawl.js"

function main(args) {
  if(args.length > 3 || args.length < 3){
    throw new Error('Number of arguments is invalid. Pass only the base URL you want to crawl.')
  }
  console.log(`crawling ${args[2]}`)
  getURLsFromHTML()
}

main(process.argv)


//Where BASE_URL is the root URL of the website we want to crawl. 
//For example, you can test with my blog if you want: https://wagslane.dev.