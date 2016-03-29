import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import {
  JSONDataWithPath
} from '../api';

import TrackType from './types/track';
import UserType from './types/user';
import PlaylistType from './types/playlist';
import CommentType from './types/comment';
import GroupType from './types/group';
import {
  SearchTracksType,
  SearchPlaylistsType,
  SearchGroupsType,
  SearchUsersType
} from './types/search';

var rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    track: {
      type: TrackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find track by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/tracks/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find user by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/users/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) }
      },
      description: 'Find user by ids',
      resolve: (_, {ids}) => {
        if (ids === undefined || ids === null) {
          throw new Error('must provide id');
        }
        
        return ids.map((userId) => {
          return JSONDataWithPath('/users/' + userId);  
        });
      }
    },
    playlist: {
      type: PlaylistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find playlist by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/playlists/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    },
    comment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find comment by id',
      resolve: (_, {args}) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/comments/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    },
    group: {
      type: GroupType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find group by id',
      resolve: (_, args) => {
        return JSONDataWithPath('/groups/' + args.id);
      }
    },
    searchTracks: SearchTracksType,
    searchPlaylists: SearchPlaylistsType,
    searchGroups: SearchGroupsType,
    searchUsers: SearchUsersType
  })
});

var mutationType = new GraphQLObjectType({
    fields: {
      followUser: {
        type: GraphQLBoolean,
        args: { 
          userId: {type: GraphQLID} 
        },
        resolve: (_, {userId}) => {
          return JSONDataWithPath(`/users/212979/followings/${userId}`, 'put')
          console.log('follow user');
          return true;
        },
      },
    },
    name: 'Mutation',
  })

export var SoundCloudGraphQLSchema = new GraphQLSchema({ 
  query: rootType,
  mutation: mutationType,
});
