// project/src/app/bot-trap/page.jsx

// This page is a honeypot for bad bots.
// Good bots will not crawl this page because of robots.txt.
// We can return null or a minimal component.
export default function BotTrapPage() {
  // Returning null sends a 200 OK status but with no content.
  // This is efficient and gives the bot nothing to scrape.
  return null;
}
