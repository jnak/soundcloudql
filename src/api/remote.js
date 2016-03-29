import request from 'superagent';

export function apiJSONDataWithPath(path, method='get') {
  return new Promise((resolve) => {
    return request
      [method](`https://api.soundcloud.com${path}`)
      .query({'client_id': process.env.CLIENT_ID})
      .send()
      .end(function(err, result) {
        console.log('kioo', result)
        resolve(result.body);
      });
  });
}
