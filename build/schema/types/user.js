'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addFieldsToUserType = addFieldsToUserType;

var _graphql = require('graphql');

var _collection = require('./collection');

var _track = require('./track');

var _playlist = require('./playlist');

var _comment = require('./comment');

var _group = require('./group');

var _extraFields = {};

function addFieldsToUserType(fields) {
  _extraFields = _extends({}, _extraFields, fields);
}

var UserType = exports.UserType = new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'A user on SoundCloud.',
  fields: function fields() {
    return _extends({
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The identifier of the user.',
        resolve: function resolve(user) {
          return user.id;
        }
      },
      username: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The name of the user.',
        resolve: function resolve(user) {
          return user.username;
        }
      },
      permalinkUrl: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The permalink URL of the user.',
        resolve: function resolve(user) {
          return user.permalink_url;
        }
      },
      avatarUrl: {
        type: _graphql.GraphQLString,
        description: 'The avatar URL of the user.',
        resolve: function resolve(user) {
          return user.avatar_url;
        }
      },
      country: {
        type: _graphql.GraphQLString,
        description: 'The country of the user.'
      },
      city: {
        type: _graphql.GraphQLString,
        description: 'The city of the user.'

      },
      description: {
        type: _graphql.GraphQLString,
        description: 'The description of the user.'
      },
      playlistCount: {
        type: _graphql.GraphQLInt,
        description: 'The public playlist count of the user.',
        resolve: function resolve(user) {
          return user.playlist_count;
        }
      },
      trackCount: {
        type: _graphql.GraphQLInt,
        description: 'The public track count of the user.',
        resolve: function resolve(user) {
          return user.track_count;
        }
      },
      followersCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of followers of the user.',
        resolve: function resolve(user) {
          return user.followers_count;
        }
      },
      followingsCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of followings of the user.',
        resolve: function resolve(user) {
          return user.followings_count;
        }
      },
      tracks: (0, _collection.relayCollectionType)('UserPostedPaginated', _track.TrackType, function (root) {
        return '/users/' + root.id + '/tracks';
      }),
      playlists: (0, _collection.relayCollectionType)('UserPostedPlaylists', _playlist.PlaylistType, function (root) {
        return '/users/' + root.id + '/playlists';
      }),
      favorites: (0, _collection.relayCollectionType)('UserFavoritedTracks', _track.TrackType, function (root) {
        return '/users/' + root.id + '/favorites';
      }),
      comments: (0, _collection.relayCollectionType)('UserComments', _comment.CommentType, function (root) {
        return '/users/' + root.id + '/comments';
      }),
      followers: (0, _collection.relayCollectionType)('UserFollowers', UserType, function (root) {
        return '/users/' + root.id + '/followers';
      }),
      followings: (0, _collection.relayCollectionType)('UserFollowings', UserType, function (root) {
        return '/users/' + root.id + '/followings';
      }),
      groups: (0, _collection.relayCollectionType)('UserGroups', _group.GroupType, function (root) {
        return '/users/' + root.id + '/groups';
      })
    }, _extraFields);
  }
});