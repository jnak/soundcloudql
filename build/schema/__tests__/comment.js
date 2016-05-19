'use strict';

var _chai = require('chai');

var _mocha = require('mocha');

var _soundcloudql = require('./soundcloudql');

(0, _mocha.describe)('Comment type', function () {
  (0, _mocha.it)('Gets an object by id', function () {
    var query = '{ comment(id: 264502049) { body }}';
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.comment.body).to.equal('🙌');
    });
  });

  (0, _mocha.it)('Gets all properties', function () {
    var query = '\n{\n  comment(id: 264502049) {\n    id\n    body\n    timestamp\n    createdAt\n    userConnection { username }\n    trackConnection { title }\n  }\n}';
    var expected = {
      id: '264502049',
      body: '🙌',
      timestamp: 42076,
      createdAt: '2016/01/11 09:59:30 +0000',
      userConnection: { username: 'Eric' },
      trackConnection: { title: 'Electro 1' }
    };
    return (0, _soundcloudql.soundcloud)(query).then(function (result) {
      (0, _chai.expect)(result.data.comment).to.deep.equal(expected);
    });
  });
});