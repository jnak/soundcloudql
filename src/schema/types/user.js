import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import { 
  relaySoundcloudResolve,
  relayCollectionType,
} from './collection';

import { TrackType } from './track';
import { PlaylistType } from './playlist';
import { CommentType } from './comment';
import { GroupType } from './group';

let _extraFields = {};

export function addFieldsToUserType(fields) {
  _extraFields = {
    ..._extraFields,
    ...fields,
  }
}


export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user on SoundCloud.',
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The identifier of the user.',
        resolve: (user) => user.id
      },
      username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The name of the user.',
        resolve: (user) => user.username
      },
      permalinkUrl: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The permalink URL of the user.',
        resolve: (user) => user.permalink_url
      },
      avatarUrl: {
        type: GraphQLString,
        description: 'The avatar URL of the user.',
        resolve: (user) => user.avatar_url
      },
      country: {
        type: GraphQLString,
        description: 'The country of the user.',
      },
      city: {
        type: GraphQLString,
        description: 'The city of the user.',
        
      },
      description: {
        type: GraphQLString,
        description: 'The description of the user.',
      },
      playlistCount: {
        type: GraphQLInt,
        description: 'The public playlist count of the user.',
        resolve: (user) => user.playlist_count
      },
      trackCount: {
        type: GraphQLInt,
        description: 'The public track count of the user.',
        resolve: (user) => user.track_count
      },
      followersCount: {
        type: GraphQLInt,
        description: 'The number of followers of the user.',
        resolve: (user) => user.followers_count
      },
      followingsCount: {
        type: GraphQLInt,
        description: 'The number of followings of the user.',
        resolve: (user) => user.followings_count
      },
      tracks: relayCollectionType(
        'UserPostedPaginated',
        TrackType,
        (root) => `/users/${root.id}/tracks`
      ),
      playlists: relayCollectionType(
        'UserPostedPlaylists',
        PlaylistType,
        (root) => `/users/${root.id}/playlists`
      ),
      favorites: relayCollectionType(
        'UserFavoritedTracks',
        TrackType,
        (root) => `/users/${root.id}/favorites`
      ),
      comments: relayCollectionType(
        'UserComments',
        CommentType,
        (root) => `/users/${root.id}/comments`
      ),
      followers: relayCollectionType(
        'UserFollowers',
        UserType,
        (root) => `/users/${root.id}/followers`
      ),
      followings: relayCollectionType(
        'UserFollowings',
        UserType,
        (root) => `/users/${root.id}/followings`
      ),
      groups: relayCollectionType(
        'UserGroups',
        GroupType,
        (root) => `/users/${root.id}/groups`
      ),
      ..._extraFields,
    }
  },
});

