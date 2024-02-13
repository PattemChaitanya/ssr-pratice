// // server.js
// const express = require("express");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const App = require("./App");

// const app = express();

// app.use(express.static("build"));

// app.get("*", (req, res) => {
//   // Render App component to string
//   res.setHeader("Content-Type", "text/html");
//   // Send response with rendered HTML
//   res.send(`
//     <html>
//       <head>
//         <script src="/index.js"></script>
//       </head>
//       <body>
//         <div id="root">${ReactDOMServer.renderToReadableStream(<App />)}</div>
//       </body>
//     </html>
//   `);
// });

// app.listen(8000, "0.0.0.0", () => {
//   console.log("http://localhost:8000");
// });

import fs from "fs";
import path from "path";
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import App from "./App.js";

const server = express();

server.use(express.static("build/index.html"));

server.get("*", (request, response) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.err(err, "place 1");
      return response.status(500).send("Some error happened");
    }

    return response.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

server.listen(8000, "0.0.0.0", () => {
  console.log("http://localhost:8000");
});
