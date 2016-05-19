import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import { JSONDataWithPath } from '../../api';

import { UserType } from './user';
import { TrackType } from './track';

let _extraFields = {};

export function addFieldsToCommentType(fields) {
  _extraFields = {
    ..._extraFields,
    ...fields,
  }
}  

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a SoundCloud track.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the comment.',
    },
    body: {
      type: GraphQLString,
      description: 'The body of the comment.',
    },
    timestamp: {
      type: GraphQLInt,
      description: 'The position of the comment on the track in milliseconds.',

    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The creation date of the comment.',
      resolve: (comment) => comment.created_at
    },
    user: {
      type: new GraphQLNonNull(UserType),
      description: 'The user who posted the comment.',
      resolve: (root) => JSONDataWithPath('/users/' + root.user_id),
    },
    track: {
      type: new GraphQLNonNull(TrackType),
      description: 'The track the comment is posted on.',
      resolve: (root) => JSONDataWithPath('/tracks/' + root.track_id),
    },
    ..._extraFields,
  })
});
