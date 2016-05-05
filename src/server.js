import express from 'express';
import graphqlHTTP from 'express-graphql';
import DataLoader from 'dataloader';
import { GraphQLSchema } from 'graphql'
import { rootType } from './schema/root';
import { JSONDataWithPath } from './api/';

var app = express();

/*
 * The usefulness of loaders here is limited since:
 *  - they would not work for the items of a soundcloud collection
 *  - a lot of the data come from soundcloud collections (urls shaped like this object/:id/connections/ )
 * It's implemented here for the sake of example
 * When data depends on the query other the graphql string (arguments for example), the loaders should be 
 * implemented instantiated per query
 */
const soundcloud = new DataLoader(
  keys => Promise.all(keys.map(JSONDataWithPath))
);


app.use('/graphql', graphqlHTTP((res) => {
  return {
    context: {
      loaders: {
        soundcloud,
      },
    },
    schema: new GraphQLSchema({
      query: rootType,
    }),
    graphiql: true
  }
}));

app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT);
});
