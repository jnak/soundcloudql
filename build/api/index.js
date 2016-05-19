'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONDataWithPath = JSONDataWithPath;
exports.followUser = followUser;

var _remote = require('./remote');

var _cache = require('./cache');

function JSONDataWithPath(path) {
  if (process.env.NODE_ENV === 'test') {
    return (0, _cache.cacheJSONDataWithPath)(path);
  } else {
    return (0, _remote.apiJSONDataWithPath)(path);
  }
}

function followUser(userId, followingId) {
  return JSONDataWithPath('/users/' + userId + '/followings/' + followingId, 'put');
}