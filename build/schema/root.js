'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootQueryType = undefined;

var _graphql = require('graphql');

var _api = require('../api');

var _track = require('./types/track');

var _user = require('./types/user');

var _playlist = require('./types/playlist');

var _comment = require('./types/comment');

var _group = require('./types/group');

var _search = require('./types/search');

var rootQueryType = exports.rootQueryType = new _graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: function fields() {
    return {
      track: {
        type: _track.TrackType,
        args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
        },
        description: 'Find track by id',
        resolve: function resolve(_, args) {
          if (args.id !== undefined && args.id !== null) {
            return (0, _api.JSONDataWithPath)('/tracks/' + args.id);
          } else {
            throw new Error('must provide id');
          }
        }
      },
      user: {
        type: _user.UserType,
        args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
        },
        description: 'Find user by id',
        resolve: function resolve(_, args, _ref) {
          var loaders = _ref.loaders;

          if (args.id !== undefined && args.id !== null) {
            return loaders.soundcloud.load('/users/' + args.id);
          } else {
            throw new Error('must provide id');
          }
        }
      },
      playlist: {
        type: _playlist.PlaylistType,
        args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
        },
        description: 'Find playlist by id',
        resolve: function resolve(_, args) {
          if (args.id !== undefined && args.id !== null) {
            return (0, _api.JSONDataWithPath)('/playlists/' + args.id);
          } else {
            throw new Error('must provide id');
          }
        }
      },
      comment: {
        type: _comment.CommentType,
        args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
        },
        description: 'Find comment by id',
        resolve: function resolve(_, _ref2) {
          var args = _ref2.args;

          if (args.id !== undefined && args.id !== null) {
            return (0, _api.JSONDataWithPath)('/comments/' + args.id);
          } else {
            throw new Error('must provide id');
          }
        }
      },
      group: {
        type: _group.GroupType,
        args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
        },
        description: 'Find group by id',
        resolve: function resolve(_, args) {
          return (0, _api.JSONDataWithPath)('/groups/' + args.id);
        }
      },
      searchTracks: _search.SearchTracksType,
      searchPlaylists: _search.SearchPlaylistsType,
      searchGroups: _search.SearchGroupsType,
      searchUsers: _search.SearchUsersType
    };
  }
});

// export const rootMutationType = new GraphQLObjectType({
//   name: 'RootMutation',
//   fields: () => {
//     return {
//       id: {
//         type: new GraphQLNonNull(GraphQLID),
//         description: 'Find playlist by id',
//       }
//     }
//   },
// });