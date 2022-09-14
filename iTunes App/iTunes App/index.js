const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

// App middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
// Use Helmet
app.use(helmet(
   helmet.contentSecurityPolicy(
      {
         useDefaults: true
      })));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
   // Serve any static files (Our frontend app)
   app.use(express.static(path.join(__dirname, 'frontend/build')));
   // Handle React routing, return all requests to React app
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
   });
}

// Port listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

module.exports = app;