'use strict';

var _chai = require('chai');

var _mocha = require('mocha');

var _soundcloudql = require('./soundcloudql');

/* eslint-disable max-len */

(0, _mocha.describe)('Search type', function () {
  (0, _mocha.it)('Searches for tracks', function () {
    var query = '{ searchTracks(q: "Boiler Room", limit: 1) { collection { title } }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.searchTracks.collection[0].title).to.equal('Carl Cox 45 min Boiler Room Ibiza Villa Takeovers mix');
    });
  });

  (0, _mocha.it)('Searches for users', function () {
    var query = '{ searchUsers(q: "Eric", limit: 1) { collection { username } }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.searchUsers.collection[0].username).to.equal('Eric Prydz');
    });
  });

  (0, _mocha.it)('Searches for playlists', function () {
    var query = '{ searchPlaylists(q: "Eric", limit: 1) { collection { title } }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.searchPlaylists.collection[0].title).to.equal('Eric Prydz presents EPIC Radio');
    });
  });

  (0, _mocha.it)('Searches for groups', function () {
    var query = '{ searchGroups(q: "Boiler Room", limit: 1) { collection { name } }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.searchGroups.collection[0].name).to.equal('We Love the Boiler Room');
    });
  });
});