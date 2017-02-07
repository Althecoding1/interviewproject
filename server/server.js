const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const callbacks = require('./synapseAPI.js');
const bodyParser = require('body-parser');
const db = require('./dbfunctions.js');
const config = require('./config.js');
const app = express();
const authRoutes = require('./routes/auth.js');
const apiRoutes = require('./routes/synapseApi.js');
const PORT = process.env.PORT || 8080;

app.use(express.static('./client/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
