var module
  , config = module.exports;

config["My tests"] = {
  env: "browser" // or "node"
  , "rootPath": "../"
  , "sources": [ // Paths are relative to config file
    "build/jsonp.js"
  ]
  , "tests": [
    "test/test-main.js"
  ]
};
