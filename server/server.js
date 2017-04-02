// server.js
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const statify = require('./statify')

const app = express()

// serve our static stuff like index.css
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/api/find-player', (req, res) => {
  const gamertag = ((req.query.gamertag).replace(/\s/g, '')).toLowerCase();
  console.log(gamertag);

  if ((req.query.gamertag).length > 0) {
    Promise.all([statify.getPlaylists(),statify.getPlayerInfo(gamertag)])
    .then(results => statify.getDetailedStats(results))
    .catch((error) => {
      res.status(404).send(error)
    })
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(404).send(error)
    })
  } else {
    res.status(404).send('Gamertag Not Found')
  }
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 9000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})

// const hostname = 'hw2playerstatsfinder.herokuapp.com';
// const port = 443;
//
// const options = {
//   ca: fs.readFileSync('server/hw2playerstatsfinder_com.ca-bundle'),
//   key: fs.readFileSync('server/hw2playerstatsfinder_com.key'),
//   crt: fs.readFileSync('server/hw2playerstatsfinder_com.crt')
// }
//
// const server = https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Welcome to Halo Wars 2 Player Stats Finder');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// })
