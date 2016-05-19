'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackType = exports.LicenseType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addFieldsToTrackType = addFieldsToTrackType;

var _graphql = require('graphql');

var _api = require('../../api');

var _collection = require('./collection');

var _user = require('./user');

var _comment = require('./comment');

var LicenseType = exports.LicenseType = new _graphql.GraphQLEnumType({
  name: 'License',
  description: 'License under which a track is published',
  values: {
    TO_SHARE: {
      value: 'to_share',
      description: 'to share'
    },
    TO_USE_COMMERCIALLY: {
      value: 'to_use_commercially',
      description: 'to use commercially'
    },
    TO_MODIFY_COMMERCIALLY: {
      value: 'to_modify_commercially',
      description: 'to modify commercially'
    },
    CC_BY: {
      value: 'cc-by',
      description: 'cc by'
    },
    CC_BY_NC: {
      value: 'cc-by-nc',
      description: 'cc by nc'
    },
    CC_BY_ND: {
      value: 'cc-by-nd',
      description: 'cc by nd'
    },
    CC_BY_SA: {
      value: 'cc-by-sa',
      description: 'cc by sa'
    },
    CC_BY_NC_ND: {
      value: 'cc-by-nc-nd',
      description: 'cc by nc nd'
    },
    CC_BY_NC_SA: {
      value: 'cc-by-nc-sa',
      description: 'cc by nc sa'
    }
  }
});

var _extraFields = {};

function addFieldsToTrackType(fields) {
  _extraFields = _extends({}, _extraFields, fields);
}

var TrackType = exports.TrackType = new _graphql.GraphQLObjectType({
  name: 'Track',
  description: 'A track on SoundCloud.',
  fields: function fields() {
    return _extends({
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The identifier of the track.'
      },
      title: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The title of the track.'
      },
      createdAt: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The creation date of the track.',
        resolve: function resolve(track) {
          return track.created_at;
        }
      },
      description: {
        type: _graphql.GraphQLString,
        description: 'The description of the track.'
      },
      commentCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of comments of the track.',
        resolve: function resolve(track) {
          return track.comment_count;
        }
      },
      downloadCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of downloads of the track.',
        resolve: function resolve(track) {
          return track.download_count;
        }
      },
      playbackCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of plays of the track.',
        resolve: function resolve(track) {
          return track.playback_count;
        }
      },
      likeCount: {
        type: _graphql.GraphQLInt,
        description: 'The number of likes of the track.',
        resolve: function resolve(track) {
          return track.likeCount;
        }
      },
      permalinkUrl: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The permalink URL of the track.',
        resolve: function resolve(track) {
          return track.permalink_url;
        }
      },
      streamUrl: {
        type: _graphql.GraphQLString,
        description: 'The stream URL of the track.',
        resolve: function resolve(track) {
          return track.stream_url;
        }
      },
      waveformUrl: {
        type: _graphql.GraphQLString,
        description: 'The waveform URL of the track.',
        resolve: function resolve(track) {
          return track.waveform_url;
        }
      },
      artworkUrl: {
        type: _graphql.GraphQLString,
        description: 'The artwork URL of the track.',
        resolve: function resolve(track) {
          return track.artwork_url;
        }
      },
      duration: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
        description: 'The duration of the track in milliseconds.'
      },
      license: {
        type: LicenseType,
        description: 'The license of the track.'
      },
      owner: {
        type: new _graphql.GraphQLNonNull(_user.UserType),
        description: 'The user who posted the track.',
        resolve: function resolve(root) {
          return (0, _api.JSONDataWithPath)('/users/' + root.user_id);
        }
      },
      comments: (0, _collection.relayCollectionType)('TrackComments', _comment.CommentType, function (root) {
        return '/tracks/' + root.id + '/comments';
      }),
      favoriters: (0, _collection.relayCollectionType)('TrackFavoriters', _user.UserType, function (root) {
        return '/tracks/' + root.id + '/favoriters';
      })
    }, _extraFields);
  }
});