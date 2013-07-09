jsonp.js
========

Simple utility to make (a possibly cross domain) call for JSON data

API:

    jsonp(url, callback[, callbackName]);
      url           - (string) URL to probe for JSON data
      callback      - (function) handler of retrieved data
      callbackName  - (string) optional name for JSONp padding function. Defaults to "c"
