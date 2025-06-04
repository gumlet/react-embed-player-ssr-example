// server.js
const path = require('path');
const fs = require('fs');
const express = require('express');

const originalAppGet = express.application.get;
express.application.get = function (path, ...handlers) {
  console.log('[DEBUG] app.get path:', path);
  return originalAppGet.call(this, path, ...handlers);
};


const React = require('react');
const ReactDOMServer = require('react-dom/server');

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/],
});

const App = require('../src/App').default;

const app = express();
const PORT = 3000;

app.use('/static', express.static(path.resolve(__dirname, '../build/static')));


app.get('/', (req, res) => {
  const appHtml = ReactDOMServer.renderToString(React.createElement(App));
  const template = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
  const html = template.replace(
    '<div id="root"><!-- SSR Rendered Content --></div>',
    `<div id="root">${appHtml}</div>`
  );

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`);
});
