'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'immigration-management-system' });
});

const modulesDir = path.join(__dirname, 'modules');
if (fs.existsSync(modulesDir)) {
  for (const name of fs.readdirSync(modulesDir)) {
    const routesFile = path.join(modulesDir, name, name + '.routes.js');
    if (fs.existsSync(routesFile)) {
      app.use('/api/' + name, require(routesFile));
    }
  }
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message, details: err.details });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('Immigration system API listening on port ' + port));
}

module.exports = app;