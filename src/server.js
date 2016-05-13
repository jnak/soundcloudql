import express from 'express';
import { GraphQLSchema } from 'graphql'
// import { exposeSchema } from './exposeSchema';
// import { rootType } from './schema/root';
import { 
  rootQueryType,
  rootMutationType,
  rootSchemaType, 
  exposeSchema, 
} from './index';


const app = express();

exposeSchema(app, new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType,
}));

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
