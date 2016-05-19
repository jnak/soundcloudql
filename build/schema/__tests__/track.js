'use strict';

var _chai = require('chai');

var _mocha = require('mocha');

var _soundcloudql = require('./soundcloudql');

/* eslint-disable max-len */

(0, _mocha.describe)('Track type', function () {
  (0, _mocha.it)('Gets an object by id', function () {
    var query = '{ track(id: 2) { title }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.track.title).to.equal('Electro 1');
    });
  });

  (0, _mocha.it)('Gets all properties', function () {
    var query = '\n{\n  track(id: 2) {\n    id\n    title\n    createdAt\n    description\n    commentCount\n    downloadCount\n    playbackCount\n    likeCount\n    permalinkUrl\n    streamUrl\n    waveformUrl\n    artworkUrl\n    duration\n    license\n    userConnection { username }\n    commentsCollection(limit: 1) { collection { timestamp } }\n  }\n}';
    var expected = {
      id: '2',
      title: 'Electro 1',
      createdAt: '2007/07/21 23:29:05 +0000',
      description: 'This was the first track I did in about 10 minutes to test the logic installation on my new macbook. I only had one sample on the computer at the time…',
      commentCount: 72,
      downloadCount: 4526,
      playbackCount: 27243,
      likeCount: null,
      permalinkUrl: 'http://soundcloud.com/eric/oberholz5',
      streamUrl: 'https://api.soundcloud.com/tracks/2/stream',
      waveformUrl: 'https://w1.sndcdn.com/KcoNolQWb1bB_m.png',
      artworkUrl: null,
      duration: 45760,
      license: null,
      userConnection: { username: 'Eric' },
      commentsCollection: {
        collection: [{ timestamp: 42076 }]
      }
    };
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.track).to.deep.equal(expected);
    });
  });
});