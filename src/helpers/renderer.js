import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import App from '../components/App';

export default (store) => {
    const content = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    return `
      <html>
	  <head>
	    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css"  href="client.css">
      </head>
	  <body>
	     <div id="root">${content}</div>
	     <script>
	     window.INITIAL_STATE = ${serialize(store.getState())}
         </script>
	     <script src="client.bundle.js"></script>
	  </body>
      </html>
	`;
};
