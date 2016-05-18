'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const response = require('../index');
const PassThrough = require('stream').PassThrough;
const https = require('https');
const event = {
  ResponseURL: "https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/",
  StackId: "stack id",
  RequestId: "some request",
  LogicalResourceId: "some id"
};
const context = {
  logStreamName: "hello Stream"
};

describe('The response Module', () => {
  it('should exist and be a function', () => {
    expect(response).to.exist;
    expect(response).to.be.a('function');
  });

  it('should throw an error if the type of argument passed is incorrect', () => {
    expect(() => {
      response({}, {}, {}, {});
    }).to.throw(Error, 'You must pass valid arguments to the function');
  });
});

describe('Sending a PUT request', () => {
  afterEach(() => (https.request.restore()));

  it('should send a PUT request', (done) => {
    const request = sinon.stub(https, 'request');
    const responseData = { foo: 'bar' };
    const expected = JSON.stringify(responseData);
    const req = new PassThrough();
    const write = sinon.spy(req, 'write');
    request.returns(req);

    response(event, context, 'SUCCESS', responseData);
    expect(write.withArgs(expected)).to.have.been.calledOnce;
    done();
  });

  it('should reject with an error', done => {
    const failedRequest = sinon.stub(https, 'request');
    const expectedError = 'An error occured during the request';
    const stream = new PassThrough();
    failedRequest.returns(stream);

    response(event, context, 'FAILED', {hello: 'world'})
    .then(() => (console.log('hello')))
    .catch((e) => {
      expect(e).to.equal('An error occured during the request');
      done();
    });
    stream.emit('error', expectedError);
  });
});
