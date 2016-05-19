'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relayCollectionType = relayCollectionType;
exports.collectionType = collectionType;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _jsuri = require('jsuri');

var _jsuri2 = _interopRequireDefault(_jsuri);

var _api = require('../../api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function soundcloudArgsFromRelayArgs(args) {
  // Because soundcloud does not allow pagination from the end
  var after = args.after;
  var before = args.before;
  var first = args.first;
  var last = args.last;

  var beforeOffset = (0, _graphqlRelay.getOffsetWithDefault)(before, 1 / 0);
  var afterOffset = (0, _graphqlRelay.getOffsetWithDefault)(after, -1);

  var startOffset = Math.max(afterOffset + 1, 0);

  var endOffset = beforeOffset;

  if (typeof first === 'number') {
    endOffset = Math.min(endOffset, startOffset + first);
  }
  if (typeof last === 'number') {
    startOffset = Math.max(startOffset, endOffset - last);
  }
  return {
    startOffset: startOffset,
    limit: endOffset - startOffset
  };
}

function connectionFromSouncloudPage(soundcloudPage, soundcloudArgs, relayArgs) {
  var startOffset = soundcloudArgs.startOffset;
  var limit = soundcloudArgs.limit;
  var first = relayArgs.first;
  var last = relayArgs.last;
  var after = relayArgs.after;
  var before = relayArgs.before;

  var afterOffset = (0, _graphqlRelay.getOffsetWithDefault)(after, -1);

  var edges = soundcloudPage.map(function (value, index) {
    return {
      cursor: (0, _graphqlRelay.offsetToCursor)(startOffset + index),
      node: value
    };
  });

  var firstEdge = edges[0];
  var lastEdge = edges[edges.length - 1];
  var lowerBound = after ? afterOffset + 1 : 0;
  return {
    edges: edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage:
      // Is this correct 
      typeof last === 'number' ? startOffset > lowerBound : false,
      hasNextPage:
      // Good enough simplifcication
      typeof first === 'number' ? soundcloudPage.length === limit : false
    }
  };
}

function relaySoundcloudResolve(basePath, relayArgs) {
  // TODO Support first/last > 50
  var souncloudArgs = soundcloudArgsFromRelayArgs(relayArgs);
  var uri = new _jsuri2.default()
  // .setPath(`/users/${user.id}/tracks`)
  .setPath(basePath).addQueryParam('limit', souncloudArgs.limit).addQueryParam('linked_partitioning', 1).addQueryParam('offset', souncloudArgs.startOffset);

  return (0, _api.JSONDataWithPath)(uri.toString()).then(function (body) {
    // console.log(body);
    return connectionFromSouncloudPage(body.collection, souncloudArgs, relayArgs);
  });
}

function relayCollectionType(name, nodeType, constructBasePath, description) {
  var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: name,
    nodeType: nodeType
  });

  var connectionType = _connectionDefinition.connectionType;
  // We could use edgeFields if we wanted to create a connection.item shortcut
  // instead of the verbose relay connection.edges.nodes


  return {
    type: connectionType,
    args: _graphqlRelay.connectionArgs,
    resolve: function resolve(root, args) {
      var basePath = constructBasePath(root, args);
      return relaySoundcloudResolve(basePath, args);
    }
  };
}

function collectionType(name, type, description, pathArgs, constructPath) {
  return {
    type: new _graphql.GraphQLNonNull(new _graphql.GraphQLObjectType({
      name: name,
      fields: {
        collection: {
          type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(type))
        },
        next: {
          type: _graphql.GraphQLString,
          description: 'The next page cursor.',
          resolve: function resolve(root) {
            return root.next_href;
          }
        }
      }
    })),
    args: argsWithDefaultCollectionArgs(pathArgs),
    description: description,
    resolve: function resolve(_, args) {
      if (args.next) {
        return (0, _api.JSONDataWithPath)(args.next);
      }
      var path = constructPath(_, args);
      if (path.indexOf('?') > -1) {
        path += '&linked_partitioning=1';
      } else {
        path += '?linked_partitioning=1';
      }
      if (args.limit) {
        path += '&limit=' + args.limit;
      }
      return (0, _api.JSONDataWithPath)(path);
    }
  };
}

function argsWithDefaultCollectionArgs(additionalArgs) {
  var args = {};
  Object.keys(additionalArgs).forEach(function (key) {
    args[key] = additionalArgs[key];
  });
  args.limit = {
    type: _graphql.GraphQLInt,
    description: 'The number of items returned. Default 50, maximum 200.'
  };
  args.next = {
    type: _graphql.GraphQLString,
    description: 'The next page cursor.'
  };
  return args;
}