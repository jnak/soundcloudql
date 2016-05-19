'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soundcloud = soundcloud;

var _graphql = require('graphql');

var _ = require('../');

function soundcloud(query) {
  return (0, _graphql.graphql)(_.SoundCloudGraphQLSchema, query);
}