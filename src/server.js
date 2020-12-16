import express from 'express';
// const express = require('express');

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';

const server = express();
server.use(express.static('dist'));

server.get('/', (req, res) => {
    const initialMarkup = ReactDOMServer.renderToString(<App />);

    res.send(`
   <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css"  href="client.css">
    <title>My Server Side App</title>
    </head>
    <body>
    <div id="mountNode">${initialMarkup}</div>
    <script src="client.bundle.js"></script>
    </body>
    </html>

  `);
});

server.listen(8080, () => console.log('Server is running...'));
