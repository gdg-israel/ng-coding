'use strict';

/**
 * default messages by httpCode
 * @type {{200: string, 500: string, 400: string, 404: string, 201: string, 502: string, 403: string, 401: string, 301: string, 405: string, 204: string}}
 */
var defaultMessages = {
    200: 'ok',
    500: 'internal server error',
    400: 'bad request',
    404: 'resource not found',
    201: 'created',
    502: 'bad gateway',
    403: 'forbidden',
    401: 'unauthorized',
    301: 'not modified',
    405: 'method not allowed',
    204: 'no content'
};

/**
 *
 * @param httpCode
 * @param payload
 * @param message
 * @param responseCode
 * @returns {{code: *, message: *, payload: (*|null)}}
 */
function generateResponseObject(httpCode, payload, message, responseCode) {
    if (!httpCode) {
        throw new Error('cannot generate response object without httpCode');
    }

    return {
        code: responseCode || httpCode,
        message: message || defaultMessages[httpCode],
        payload: payload === undefined ? null : payload
    };
}

/**
 * Expressty middleware
 * @param req
 * @param res
 * @param next
 */
function expressty(req, res, next) {

    function respond(httpCode, payload, message, responseCode) {
        res.json(httpCode, generateResponseObject(httpCode, payload, message, responseCode));
    }

    /**
     * Returns 200 ok response
     * @param {object} payload
     * @param {string} message
     * @param {number} httpCode
     * @param {number} responseCode
     */
    res.ok = function(payload, message, httpCode) {
        httpCode = httpCode || 200;

        if (httpCode >= 300 || httpCode < 200) {
            throw new Error('cannot respond ok with httpCode different from 2xx');
        }

        respond(httpCode, payload, message);
    };

    /**
     * Return 404 resource not found response
     */
    res.notFound = function() {
        respond(404);
    };

    /**
     * return 500 error
     * @param payload
     * @param message
     * @param responseCode
     */
    res.error = function(message, responseCode, payload) {
        respond(500, payload, message, responseCode);
    };

    res.unauthorized = function(message) {
        respond(401, null, message);
    };

    next();
}

module.exports = expressty;
