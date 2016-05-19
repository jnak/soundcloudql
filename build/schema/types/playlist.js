'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaylistType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addFieldsToPlaylistType = addFieldsToPlaylistType;

var _graphql = require('graphql');

var _api = require('../../api');

var _collection = require('./collection');

var _track = require('./track');

var _user = require('./user');

var _extraFields = {};

function addFieldsToPlaylistType(fields) {
  _extraFields = _extends({}, _extraFields, fields);
}

var PlaylistType = exports.PlaylistType = new _graphql.GraphQLObjectType({
  name: 'Playlist',
  description: 'A playlist on SoundCloud.',
  fields: function fields() {
    return _extends({
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The identifier of the playlist.'
      },
      title: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The title of the playlist.'
      },
      createdAt: {
        type: _graphql.GraphQLString,
        description: 'The creation date of the playlist.',
        resolve: function resolve(playlist) {
          return playlist.created_at;
        }
      },
      permalinkUrl: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The permalink URL of the playlist.',
        resolve: function resolve(playlist) {
          return playlist.permalink_url;
        }
      },
      description: {
        type: _graphql.GraphQLString,
        description: 'The description of the playlist.'
      },
      artworkUrl: {
        type: _graphql.GraphQLString,
        description: 'The artwork URL of the playlist.',
        resolve: function resolve(playlist) {
          return playlist.artwork_url;
        }
      },
      duration: {
        type: _graphql.GraphQLInt,
        description: 'The duration of the playlist in milliseconds.'
      },
      tracksCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of tracks in the playlist.',
        resolve: function resolve(playlist) {
          return playlist.track_count;
        }
      },
      owner: {
        type: new _graphql.GraphQLNonNull(_user.UserType),
        description: 'The user who posted the playlist.',
        resolve: function resolve(root, args, _ref) {
          var loaders = _ref.loaders;
          return loaders.soundcloud.load('/users/' + root.user_id);
        }
      },
      tracks: (0, _collection.relayCollectionType)('PlaylistTracks', _track.TrackType, function (root) {
        return '/playlists/' + root.id + '/tracks';
      })
    }, _extraFields);
  }
});