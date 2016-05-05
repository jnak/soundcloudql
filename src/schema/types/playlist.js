import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

import { relayCollectionType } from './collection';

import { TrackType } from './track';
import { UserType } from './user';


let _extraFields = {};

export function addFieldsToPlaylistType(fields) {
  _extraFields = {
    ..._extraFields,
    ...fields,
  }
}  

export const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'A playlist on SoundCloud.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the playlist.',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the playlist.',
    },
    createdAt: {
      type: GraphQLString,
      description: 'The creation date of the playlist.',
      resolve: (playlist) => playlist.created_at
    },
    permalinkUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The permalink URL of the playlist.',
      resolve: (playlist) => playlist.permalink_url
    },
    description: {
      type: GraphQLString,
      description: 'The description of the playlist.',
    },
    artworkUrl: {
      type: GraphQLString,
      description: 'The artwork URL of the playlist.',
      resolve: (playlist) => playlist.artwork_url
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the playlist in milliseconds.',
    },
    tracksCount: {
      type: GraphQLInt,
      description: 'The number of tracks in the playlist.',
      resolve: (playlist) => playlist.track_count
    },
    owner: {
      type: new GraphQLNonNull(UserType),
      description: 'The user who posted the playlist.',
      resolve: (root, args, {loaders}) => loaders.soundcloud.load('/users/' + root.user_id),
    },
    tracks: relayCollectionType(
      'PlaylistTracks',
      TrackType,
      (root) => `/playlists/${root.id}/tracks`
    ),
    ..._extraFields
  }),
});
