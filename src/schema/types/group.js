import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

import { relayCollectionType } from './collection';

import {UserType} from './user';
import {TrackType} from './track';

let _extraFields = {};

export function addFieldsToGroupType(fields) {
  _extraFields = {
    ..._extraFields,
    ...fields,
  }
} 

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  description: 'A group on SoundCloud.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the group.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the group.',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the group.',
    },
    createdAt: {
      type: GraphQLString,
      description: 'The creation date of the group.',
      resolve: (group) => group.created_at
    },
    creatorConnection: {
      type: new GraphQLNonNull(UserType),
      description: 'The creator of the group.',
      resolve: (root) => JSONDataWithPath('/users/' + root.creator.id),
    },
    users: relayCollectionType(
      'GroupUsers',
      UserType,
      (root) => `/groups/${root.id}/users`
    ),
    moderators: relayCollectionType(
      'GroupModerators',
      UserType,
      (root) => `/groups/${root.id}/moderators`
    ),
    members: relayCollectionType(
      'GroupMembers',
      UserType,
      (root) => `/groups/${root.id}/members`
    ),
    contributors: relayCollectionType(
      'GroupContributors',
      UserType,
      (root) => `/groups/${root.id}/contributors`
    ),
    tracks: relayCollectionType(
      'GroupTracks',
      TrackType,
      (root) => `/groups/${root.id}/tracks`
    ),
  })
});
