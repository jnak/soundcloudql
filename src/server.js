import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema } from 'graphql'
import { rootType } from './schema/root';

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({
    query: rootType,
  }),
  graphiql: true
}));

app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT);
});
