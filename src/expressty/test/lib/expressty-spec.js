'use strict';

/* global describe, it, beforeEach */

var rewire = require('rewire'),
    expressty = rewire('../../lib/expressty'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai);

describe('expressty', function() {

    var resMock;

    beforeEach(function() {
        resMock = {
            json: sinon.stub()
        };

        expressty({}, resMock, function(){});
    });

    describe('#res.ok()', function() {
        var payload = {
                property: 'some-string'
            },
            message = 'some message',
            httpCode = 201;

        it('should throw an error if code is outside of 2xx', function() {
            expect(function() {
                resMock.ok({}, 'tested something', 301);
            }).to.throw(Error);
        });

        it('should call res.json with the payload, httpCode, and message', function() {
            resMock.ok(payload, message, httpCode);

            expect(resMock.json).have.been.calledWith(201, {
                code: httpCode,
                message: message,
                payload: payload
            });
        });

        it('should call.res.json with default message code `ok` and 200 httpCode', function() {
            resMock.ok({});

            expect(resMock.json).have.been.calledWith(200, {
                code: 200,
                message: 'ok',
                payload: {}
            });
        });

    });

    describe('#res.notFound()', function() {
        it('should call res.json with http-code 404 and message `not found`', function() {
            resMock.notFound();

            expect(resMock.json).have.been.calledWith(404, {
                code: 404,
                message: 'resource not found',
                payload: null
            });
        });
    });

    describe('#res.error()', function() {
        var message = 'some error has occurred',
            responseCode = 5000,
            payload = {};


        it('should call res.json with httpCode 500, message, payload and responseCode', function() {
            resMock.error(message, responseCode, payload);

            expect(resMock.json).have.been.calledWith(500, {
                code: responseCode,
                message: message,
                payload: payload
            });
        });

        it('should call res.json with http-code 500 and default message', function() {
            resMock.error();

            expect(resMock.json).have.been.calledWith(500, {
                code: 500,
                message: 'internal server error',
                payload: null
            });
        });
    });

    describe('#res.unauthorized()', function() {
        it('should call res.json with 401 http code and default message', function() {
            resMock.unauthorized();

            expect(resMock.json).have.been.calledWith(401, {
                code: 401,
                message: 'unauthorized',
                payload: null
            });
        });
    });
});
