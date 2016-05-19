'use strict';

var _chai = require('chai');

var _mocha = require('mocha');

var _soundcloudql = require('./soundcloudql');

/* eslint-disable max-len */

(0, _mocha.describe)('Group type', function () {
  (0, _mocha.it)('Gets an object by id', function () {
    var query = '{ group(id: 3) { name }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.group.name).to.equal('Made with Ableton Live!');
    });
  });

  (0, _mocha.it)('Gets all properties', function () {
    var query = '\n{\n  group(id: 3) {\n    id\n    name\n    description,\n    createdAt,\n    creatorConnection { username }\n    usersCollection(limit: 1) { collection { username } }\n    moderatorsCollection(limit: 1) { collection { username } }\n    membersCollection(limit: 1) { collection { username } }\n    contributorsCollection(limit: 1) { collection { username } }\n    tracksCollection(limit: 1) { collection { title } }\n  }\n}';
    var expected = {
      id: '3',
      name: 'Made with Ableton Live!',
      description: 'send your tracks, no DJ mixes please!',
      createdAt: '2009/06/18 15:46:46 +0000',
      creatorConnection: { username: 'Ableton' },
      usersCollection: { collection: [{ username: 'bridges' }] },
      moderatorsCollection: { collection: [{ username: 'Ableton' }] },
      membersCollection: { collection: [{ username: 'bridges' }] },
      contributorsCollection: { collection: [{ username: 'bridges' }] },
      tracksCollection: { collection: [{ title: 'Colours ft. Veronika Wildova' }] }
    };
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.group).to.deep.equal(expected);
    });
  });
});