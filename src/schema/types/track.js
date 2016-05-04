import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import { JSONDataWithPath } from '../../api';
import { relayCollectionType } from './collection';

import { UserType } from './user';
import { CommentType } from './comment';

export const LicenseType = new GraphQLEnumType({
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

let _extraFields = {};

export function addFieldsToTrackType(fields) {
  _extraFields = {
    ..._extraFields,
    ...fields,
  }
}

export const TrackType = new GraphQLObjectType({
  name: 'Track',
  description: 'A track on SoundCloud.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the track.',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the track.',
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The creation date of the track.',
      resolve: (track) => track.created_at
    },
    description: {
      type: GraphQLString,
      description: 'The description of the track.',
    },
    commentCount: {
      type: GraphQLInt,
      description: 'The number of comments of the track.',
      resolve: (track) => track.comment_count
    },
    downloadCount: {
      type: GraphQLInt,
      description: 'The number of downloads of the track.',
      resolve: (track) => track.download_count
    },
    playbackCount: {
      type: GraphQLInt,
      description: 'The number of plays of the track.',
      resolve: (track) => track.playback_count
    },
    likeCount: {
      type: GraphQLInt,
      description: 'The number of likes of the track.',
      resolve: (track) => track.likeCount
    },
    permalinkUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The permalink URL of the track.',
      resolve: (track) => track.permalink_url
    },
    streamUrl: {
      type: GraphQLString,
      description: 'The stream URL of the track.',
      resolve: (track) => track.stream_url
    },
    waveformUrl: {
      type: GraphQLString,
      description: 'The waveform URL of the track.',
      resolve: (track) => track.waveform_url
    },
    artworkUrl: {
      type: GraphQLString,
      description: 'The artwork URL of the track.',
      resolve: (track) => track.artwork_url
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the track in milliseconds.',
    },
    license: {
      type: LicenseType,
      description: 'The license of the track.',
    },
    owner: {
      type: new GraphQLNonNull(UserType),
      description: 'The user who posted the track.',
      resolve: (root) => JSONDataWithPath('/users/' + root.user_id),
    },
    comments: relayCollectionType(
      'TrackComments',
      CommentType,
      (root) => `/tracks/${root.id}/comments`
    ),
    favoriters: relayCollectionType(
      'TrackFavoriters',
      UserType,
      (root) => `/tracks/${root.id}/favoriters`
    ),
    ..._extraFields,
  })
});
