// INVESTIGATE WHY NEED TO EXPORT THE SAME GRAPHQL INSTANCE!!

export {
  graphql,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLString,  
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

export {
  mutationWithClientMutationId
} from 'graphql-relay';

export { 
  exposeSchema
} from './exposeSchema'; 

export { 
  rootQueryType,
} from './schema/root';

export { 
  CommentType,
  addFieldsToCommentType,
} from './schema/types/comment';

export { 
  GroupType,
  addFieldsToGroupType,
} from './schema/types/group';

export { 
  PlaylistType,
  addFieldsToPlaylistType,
} from './schema/types/playlist';

export { 
  SearchUsersType,
  SearchTracksType,
  SearchPlaylistsType,
  SearchGroupsType,
} from './schema/types/search';

export { 
  TrackType,
  LicenseType,
  addFieldsToTrackType,
} from './schema/types/track';

export { 
  UserType,
  addFieldsToUserType,
} from './schema/types/user';

export {
  followUser,
} from './api'
