import { createServer } from "http";
import { dirname } from "path";
import fs from "fs";

const __dirname = new URL(".", import.meta.url).pathname;

let server = createServer((request, response) => {
  let html;

  switch (request.url) {
    case "/":
      html = createPage("Home");
      response.writeHead(200, {
        // "cache-control": "no-store",
      });
      response.end(html);
      break;

    case "/page-1":
      html = createPage("Page 1");
      response.writeHead(200, {
        // "cache-control": "no-store",
      });
      response.end(html);
      break;

    case "/favicon.ico":
      fs.readFile(__dirname + "favicon.ico", (_, data) => {
        response.writeHead(200);
        response.end(data);
      });
  }
});

server.listen(3000);

function createPage(title) {
  return `
<!DOCTYPE html>
<html lang=en>
  <head>
    <meta charset=UTF-8>
    <link rel="favicon" href="https://remix.run/favicon.ico"/>
    <title>${title}</title>
  </head>
<body>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/page-1">Page 1</a></li>
  </ul>
  <h1>${title}</h1>
  <ul>
    ${Array.from({ length: 1000 })
      .map(() => "<li>Just some junk</li>")
      .join("\n")}
  </ul>
</body>
</html>
`;
}
