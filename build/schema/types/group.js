'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addFieldsToGroupType = addFieldsToGroupType;

var _graphql = require('graphql');

var _api = require('../../api');

var _collection = require('./collection');

var _user = require('./user');

var _track = require('./track');

var _extraFields = {};

function addFieldsToGroupType(fields) {
  _extraFields = _extends({}, _extraFields, fields);
}

var GroupType = exports.GroupType = new _graphql.GraphQLObjectType({
  name: 'Group',
  description: 'A group on SoundCloud.',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The identifier of the group.'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the group.'
      },
      description: {
        type: _graphql.GraphQLString,
        description: 'The description of the group.'
      },
      createdAt: {
        type: _graphql.GraphQLString,
        description: 'The creation date of the group.',
        resolve: function resolve(group) {
          return group.created_at;
        }
      },
      creatorConnection: {
        type: new _graphql.GraphQLNonNull(_user.UserType),
        description: 'The creator of the group.',
        resolve: function resolve(root) {
          return (0, _api.JSONDataWithPath)('/users/' + root.creator.id);
        }
      },
      users: (0, _collection.relayCollectionType)('GroupUsers', _user.UserType, function (root) {
        return '/groups/' + root.id + '/users';
      }),
      moderators: (0, _collection.relayCollectionType)('GroupModerators', _user.UserType, function (root) {
        return '/groups/' + root.id + '/moderators';
      }),
      members: (0, _collection.relayCollectionType)('GroupMembers', _user.UserType, function (root) {
        return '/groups/' + root.id + '/members';
      }),
      contributors: (0, _collection.relayCollectionType)('GroupContributors', _user.UserType, function (root) {
        return '/groups/' + root.id + '/contributors';
      }),
      tracks: (0, _collection.relayCollectionType)('GroupTracks', _track.TrackType, function (root) {
        return '/groups/' + root.id + '/tracks';
      })
    };
  }
});