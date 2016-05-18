[![Code Climate](https://codeclimate.com/github/natachaS/lambda-cfn-response/badges/gpa.svg)](https://codeclimate.com/github/natachaS/lambda-cfn-response) ![Travis CI](https://travis-ci.org/natachaS/lambda-cfn-response.svg?branch=master) [![Issue Count](https://codeclimate.com/github/natachaS/lambda-cfn-response/badges/issue_count.svg)](https://codeclimate.com/github/natachaS/lambda-cfn-response) 

## lambda-cfn-response

The module contains a send method, which sends a response object to a custom resource by way of an Amazon S3 pre-signed URL.

This module is different from the cfn-response module available on NPM as it doesn't end your lambda upon execution.
This module returns a Promise and will need to be chained with ``` context.done ``` in order to stop the lambda execution.

## How do I use it?

To use in your Lambda function code:

```
const response = require('lambda-cfn-response');

.....then((data) => (response(event, context, 'SUCCESS', data);)).then(context.done).....

```
 The response function takes 4 arguments:
 - event and context provided by AWS Lambda
 - a status: 'SUCCESS' for successful executions or 'FAILED' for failed executions
 - responseData: an object containing all the data you wish to pass to your CFN custom resource which is calling the Lambda.

 ## License

Copyright Kickstarter, PBC.

Released under an [MIT License](http://opensource.org/licenses/MIT).
