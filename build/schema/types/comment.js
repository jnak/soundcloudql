'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addFieldsToCommentType = addFieldsToCommentType;

var _graphql = require('graphql');

var _api = require('../../api');

var _user = require('./user');

var _track = require('./track');

var _extraFields = {};

function addFieldsToCommentType(fields) {
  _extraFields = _extends({}, _extraFields, fields);
}

var CommentType = exports.CommentType = new _graphql.GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a SoundCloud track.',
  fields: function fields() {
    return _extends({
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The identifier of the comment.'
      },
      body: {
        type: _graphql.GraphQLString,
        description: 'The body of the comment.'
      },
      timestamp: {
        type: _graphql.GraphQLInt,
        description: 'The position of the comment on the track in milliseconds.'

      },
      createdAt: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The creation date of the comment.',
        resolve: function resolve(comment) {
          return comment.created_at;
        }
      },
      user: {
        type: new _graphql.GraphQLNonNull(_user.UserType),
        description: 'The user who posted the comment.',
        resolve: function resolve(root) {
          return (0, _api.JSONDataWithPath)('/users/' + root.user_id);
        }
      },
      track: {
        type: new _graphql.GraphQLNonNull(_track.TrackType),
        description: 'The track the comment is posted on.',
        resolve: function resolve(root) {
          return (0, _api.JSONDataWithPath)('/tracks/' + root.track_id);
        }
      }
    }, _extraFields);
  }
});