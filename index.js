module.exports = (event, context, status, responseData) => {
  if (
      typeof (event) !== 'object' ||
      typeof (context) !== 'object' ||
      typeof (status) !== 'string' ||
      typeof (responseData) !== 'object'
      ) {
    throw new Error('You must pass valid arguments to the function');
  }
  const responseBody = JSON.stringify({
    Status: status,
    Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData
  });

  const https = require('https');
  const url = require('url');
  const parsedUrl = url.parse(event.ResponseURL);

  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: 'PUT',
    headers: {
      'content-type': '',
      'content-length': responseBody.length
    }
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, (err, response) => {
      if (err) return reject(new Error('Invalid or expired URL'));
    });
    request.on('error', (err) => (reject(err)));
    request.write(responseBody);
    request.end();
  });
};
