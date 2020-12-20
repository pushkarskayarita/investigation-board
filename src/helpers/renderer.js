import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/App';

export default () => {
    const content = renderToString(<App />);
    return `
      <html>
	  <head>
	    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css"  href="client.css">
      </head>
	  <body>
	     <div id="root">${content}</div>
	     <script src="client.bundle.js"></script>
	  </body>
      </html>
	`;
};
