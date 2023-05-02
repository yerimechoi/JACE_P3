const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Middleware to allow https requests in production
/*app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});*/

/*app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/')) // since we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});*/
// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => { 
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  } else {
  res.sendFile(path.join(__dirname, '../client/'));
  }
});

app.get('/serviceWorker.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../client/src/serviceWorker.js'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
