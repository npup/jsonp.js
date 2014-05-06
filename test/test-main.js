var buster = require("buster");
var jsonp = require("../build/jsonp");
var assert = buster.assert;

buster.testCase("jsonp::setup", {
  "setUp": function () {
      this.foo = {};
    }
    , "jsonp should be defined as an object": function () {
      assert.isObject(jsonp);
    }
});