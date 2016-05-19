'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposeSchema = exposeSchema;

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _api = require('./api/');

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exposeSchema(app, rootQuery, rootMutation) {
  /*
  * The usefulness of loaders here is limited since:
  *  - they would not work for the items of a soundcloud collection
  *  - a lot of the data come from soundcloud collections (urls shaped like this object/:id/connections/ )
  * It's implemented here for the sake of example
  * When data depends on the query other the graphql string (arguments for example), the loaders should be 
  * implemented instantiated per query
  */
  var soundcloud = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(_api.JSONDataWithPath));
  });

  app.use('/graphql', (0, _expressGraphql2.default)(function (res) {
    return {
      context: {
        loaders: {
          soundcloud: soundcloud
        }
      },
      schema: new _graphql.GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
      }),
      graphiql: true
    };
  }));
}