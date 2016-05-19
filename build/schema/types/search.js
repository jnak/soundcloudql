'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchGroupsType = exports.SearchPlaylistsType = exports.SearchTracksType = exports.SearchUsersType = undefined;

var _graphql = require('graphql');

var _collection = require('./collection');

var _track = require('./track');

var _user = require('./user');

var _playlist = require('./playlist');

var _group = require('./group');

var SearchUsersType = exports.SearchUsersType = (0, _collection.collectionType)('SearchUsersCollection', _user.UserType, 'Search for users on SoundCloud', {
  q: {
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
    description: 'The search query.'
  }
}, function (root, args) {
  return '/users?q=' + encodeURIComponent(args.q);
});

var SearchTracksType = exports.SearchTracksType = (0, _collection.collectionType)('SearchTracksCollection', _track.TrackType, 'Search for tracks on SoundCloud', {
  q: {
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
    description: 'The search query.'
  },
  tags: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
  genres: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
  bpm: {
    type: new _graphql.GraphQLInputObjectType({
      name: 'BPM',
      fields: {
        from: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
        to: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
      }
    })
  },
  duration: {
    type: new _graphql.GraphQLInputObjectType({
      name: 'Duration',
      fields: {
        from: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
        to: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
      }
    })
  },
  license: { type: _track.LicenseType }
}, function (root, args) {
  var path = '/tracks?q=' + encodeURIComponent(args.q);
  if (args.tags) {
    path += '&tags=' + encodeURIComponent(args.tags.join());
  }
  if (args.genres) {
    path += '&genres=' + args.genres.join();
  }
  if (args.bpm) {
    path += '&bpm[from]=' + args.bpm.from;
    path += '&bpm[to]=' + args.bpm.to;
  }
  if (args.duration) {
    path += '&duration[from]=' + args.duration.from;
    path += '&duration[to]=' + args.duration.to;
  }
  if (args.license) {
    path += '&license=' + args.license;
  }
  return path;
});

var SearchPlaylistsType = exports.SearchPlaylistsType = (0, _collection.collectionType)('SearchPlaylistsCollection', _playlist.PlaylistType, 'Search for playlists on SoundCloud', {
  q: {
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
    description: 'The search query.'
  }
}, function (root, args) {
  return '/playlists?q=' + encodeURIComponent(args.q);
});

var SearchGroupsType = exports.SearchGroupsType = (0, _collection.collectionType)('SearchGroupsCollection', _group.GroupType, 'Search for groups on SoundCloud', {
  q: {
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
    description: 'The search query.'
  }
}, function (root, args) {
  return '/groups?q=' + encodeURIComponent(args.q);
});