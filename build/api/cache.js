'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheJSONDataWithPath = cacheJSONDataWithPath;

var _remote = require('./remote');

var _fs = require('fs');

var _path = require('path');

var cachePath = (0, _path.join)(__dirname, 'cache.json');

function JSONCache() {
  return new Promise(function (resolve, reject) {
    (0, _fs.readFile)(cachePath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

function replaceStoredCache(cache) {
  return new Promise(function (resolve, reject) {
    (0, _fs.writeFile)(cachePath, JSON.stringify(cache, null, '  '), function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function fetchRemoteJSONThenCacheIt(path, cleanPath, cache) {
  return (0, _remote.apiJSONDataWithPath)(path).then(function (json) {
    cache[cleanPath] = json;
    return replaceStoredCache(cache).then(function () {
      return json;
    });
  });
}

function cacheJSONDataWithPath(path) {
  var cleanPath = path.replace('[?&]client_id=.*$', '');
  return JSONCache().then(function (cache) {
    if (cache[cleanPath]) {
      return cache[cleanPath];
    }
    console.error('No cache for "' + cleanPath + '". Fetching remotely...');
    return fetchRemoteJSONThenCacheIt(path, cleanPath, cache);
  }).catch(console.log.bind(console));
}