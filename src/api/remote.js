/*
 *  Superagent has a superweird and inconsistent behavior...
 */ 

// import request from 'superagent';

// export function apiJSONDataWithPath(path, method='get') {
//     var pathWithClientId = '';
//     if (path.indexOf('?') > -1) {
//       pathWithClientId = path + '&client_id=' + process.env.CLIENT_ID;
//     } else {
//       pathWithClientId = path + '?client_id=' + process.env.CLIENT_ID;
//     }

//   return new Promise((resolve) => {
//     var apiRequest = request
//       [method](`https://api.soundcloud.com${pathWithClientId}`)
//       //.query({'client_id': process.env.CLIENT_ID})

//     // console.log('headers', apiRequest.req._headers);

//     return apiRequest
//       .send()
//       .end(function(err, result) {
//         // if (err) {
//         //   console.log('kikerror', err);
//         //   return;
//         // }
//         resolve(result.body);
//         console.log('kioo: ', result.request.url,
//           ' ', result.request.method);
//         // console.log(result.request.header);
//       });
//   });
// }

import http from 'http';

export function apiJSONDataWithPath(path, method='get', body=null) {
  return new Promise( function (resolve) {
    var pathWithClientId = '';
    if (path.indexOf('?') > -1) {
      pathWithClientId = path + '&client_id=' + process.env.CLIENT_ID;
    } else {
      pathWithClientId = path + '?client_id=' + process.env.CLIENT_ID;
    }
    http[method]({
      host: 'api.soundcloud.com',
      path: pathWithClientId,
      body,
    }, function (response) {
      console.log(this.path);
      var body = '';
      response.on('data', function (d) {
        body += d;
      });
      response.on('end', function () {
        resolve(JSON.parse(body));
      });
    });
  });
}
