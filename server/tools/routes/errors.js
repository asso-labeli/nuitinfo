/**
 * Error responses
 */

'use strict';

let Response = require('../response');

module.exports[404] = function pageNotFound(req, res) {
  Response.notFound(res, req.originalUrl);
};
