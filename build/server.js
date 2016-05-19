'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphql = require('graphql');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _index.exposeSchema)(app, new _graphql.GraphQLSchema({
  query: _index.rootQueryType,
  mutation: _index.rootMutationType
}));

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});