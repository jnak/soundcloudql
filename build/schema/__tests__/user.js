'use strict';

var _chai = require('chai');

var _mocha = require('mocha');

var _soundcloudql = require('./soundcloudql');

/* eslint-disable max-len */

(0, _mocha.describe)('User type', function () {
  (0, _mocha.it)('Gets an object by id', function () {
    var query = '{ user(id: 2) { username }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.user.username).to.equal('Eric');
    });
  });

  (0, _mocha.it)('Gets all properties', function () {
    var query = '\n{\n  user(id: 2) {\n    id\n    username\n    permalinkUrl\n    avatarUrl\n    country\n    city\n    description\n    playlistCount\n    trackCount\n    followersCount\n    followingsCount\n    postedTracksCollection(limit:1) { collection { title } }\n    postedPlaylistsCollection(limit: 1) { collection { title } }\n    likedTracksCollection(limit:1) { collection { title } }\n    commentsCollection(limit:1) { collection { body } }\n    followersCollection(limit:1) { collection { username } }\n    followingsCollection(limit:1) { collection { username } }\n    groupsCollection(limit:1) { collection { name } }\n  }\n}';
    var expected = {
      id: '2',
      username: 'Eric',
      permalinkUrl: 'http://soundcloud.com/eric',
      avatarUrl: 'https://i1.sndcdn.com/avatars-000153316546-tqxejr-large.jpg',
      country: 'Germany',
      city: 'Berlin',
      description: 'Founder/CTO SoundCloud.\r\nMusician under the alias http://soundcloud.com/forss',
      playlistCount: 20,
      trackCount: 154,
      followersCount: 44654,
      followingsCount: 1654,
      postedTracksCollection: { collection: [{ title: 'Obama\'s 2013 Berlin Speech at Pariser Platz' }] },
      postedPlaylistsCollection: { collection: [{ title: 'Show favorites' }] },
      likedTracksCollection: { collection: [{ title: 'Javi Frias - Red Bull Mix' }] },
      commentsCollection: { collection: [{ body: '🙌' }] },
      followersCollection: { collection: [{ username: 'viktiria' }] },
      followingsCollection: { collection: [{ username: 'Florence + The Machine' }] },
      groupsCollection: { collection: [{ name: 'MINIMAL TECHNO' }] }
    };
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.user).to.deep.equal(expected);
    });
  });
});