const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var express = require('express');
var app = express();
var nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});