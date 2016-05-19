'use strict';

var _chai = require('chai');

var _mocha = require('mocha');

var _soundcloudql = require('./soundcloudql');

/* eslint-disable max-len */

(0, _mocha.describe)('Playlist type', function () {
  (0, _mocha.it)('Gets an object by id', function () {
    var query = '{ playlist(id: 6584580) { title }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.playlist.title).to.equal('Quarters');
    });
  });

  (0, _mocha.it)('Gets all properties', function () {
    var query = '\n{\n  playlist(id: 6584580) {\n    id\n    title\n    createdAt\n    permalinkUrl\n    description\n    artworkUrl\n    duration\n    tracksCount\n    userConnection { username }\n    tracksCollection(limit: 1) { collection { title } }\n  }\n}';
    var expected = {
      id: '6584580',
      title: 'Quarters',
      createdAt: '2013/06/10 16:23:37 +0000',
      permalinkUrl: 'http://soundcloud.com/seams/sets/quarters',
      description: 'My first full-length album, released by Full Time Hobby; available on vinyl, CD, and download.\r\n\r\nPurchase the album from Bleep.com and get an exclusive set of postcards showcasing the 4 locations the album was made.\r\n\r\nhttps://bleep.com/release/45240-seams-quarters',
      artworkUrl: 'https://i1.sndcdn.com/artworks-000052432909-2isoof-large.jpg',
      duration: 2397683,
      tracksCount: 8,
      userConnection: { username: 'Seams' },
      tracksCollection: {
        collection: [{ title: 'ClapOne' }]
      }
    };
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.playlist).to.deep.equal(expected);
    });
  });
});