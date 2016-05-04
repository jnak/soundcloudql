import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  getOffsetWithDefault,
  offsetToCursor,
} from 'graphql-relay';

import Uri from 'jsuri';

import {
  JSONDataWithPath
} from '../../api';


function soundcloudArgsFromRelayArgs(args) {
  // Because soundcloud does not allow pagination from the end
  var {after, before, first, last} = args;
  var beforeOffset = getOffsetWithDefault(before, 1/0);
  var afterOffset = getOffsetWithDefault(after, -1);

  var startOffset = Math.max(
    afterOffset + 1,
    0
  );
   
  var endOffset = beforeOffset;
  
  if (typeof first === 'number') {
    endOffset = Math.min(
      endOffset,
      startOffset + first
    );
  }
  if (typeof last === 'number') {
    startOffset = Math.max(
      startOffset,
      endOffset - last
    );
  }
  return {
    startOffset,
    limit: endOffset - startOffset,
  }
}

function connectionFromSouncloudPage(soundcloudPage, soundcloudArgs, relayArgs) {
  let {startOffset, limit} = soundcloudArgs;
  let {first, last, after, before} = relayArgs;
  var afterOffset = getOffsetWithDefault(after, -1);
  
  var edges = soundcloudPage.map((value, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: value,
  }));

  var firstEdge = edges[0];
  var lastEdge = edges[edges.length - 1];
  var lowerBound = after ? (afterOffset + 1) : 0;
  return {
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage:
        // Is this correct  
        typeof last === 'number' ? startOffset > lowerBound : false,
      hasNextPage:
        // Good enough simplifcication
        typeof first === 'number' ? soundcloudPage.length === limit : false,
    },
  };
}

function relaySoundcloudResolve(basePath, relayArgs) {
  // TODO Support first/last > 50
  let souncloudArgs = soundcloudArgsFromRelayArgs(relayArgs);
  let uri = new Uri()
    // .setPath(`/users/${user.id}/tracks`)
    .setPath(basePath)
    .addQueryParam('limit', souncloudArgs.limit)
    .addQueryParam('linked_partitioning', 1)
    .addQueryParam('offset', souncloudArgs.startOffset);
  
  return JSONDataWithPath(uri.toString()).
    then((body) => {
      // console.log(body);
      return connectionFromSouncloudPage(body.collection, souncloudArgs, relayArgs)
    });
}

export function relayCollectionType(name, nodeType, constructBasePath, description)  {
  let {connectionType} = connectionDefinitions({
    name,
    nodeType,
    // We could use edgeFields if we wanted to create a connection.item shortcut 
    // instead of the verbose relay connection.edges.nodes
  });
  
  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (root, args) => {
      let basePath = constructBasePath(root, args);
      return relaySoundcloudResolve(basePath, args)
    }
  }
}

export function collectionType(
  name, type, description, pathArgs, constructPath) {
  return {
    type: new GraphQLNonNull(new GraphQLObjectType({
      name: name,
      fields: {
        collection: {
          type: new GraphQLNonNull(new GraphQLList(type))
        },
        next: {
          type: GraphQLString,
          description: 'The next page cursor.',
          resolve: (root) => {
            return root.next_href;
          }
        }
      }
    })),
    args: argsWithDefaultCollectionArgs(pathArgs),
    description: description,
    resolve: (_, args) => {
      if (args.next) {
        return JSONDataWithPath(args.next);
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
      return JSONDataWithPath(path);
    }
  };
}

function argsWithDefaultCollectionArgs(additionalArgs) {
  var args = {};
  Object.keys(additionalArgs).forEach(function (key) {
    args[key] = additionalArgs[key];
  });
  args.limit = {
    type: GraphQLInt,
    description: 'The number of items returned. Default 50, maximum 200.'
  };
  args.next = {
    type: GraphQLString,
    description: 'The next page cursor.'
  };
  return args;
}
