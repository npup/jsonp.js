/**
*
* Name: jsonp.js
* Version: 0.1
* Description: Simple utility to make (a possibly cross domain) call for JSON data and handle it in a callback.
* Author: P. Envall (petter.envall@gmail.com, @npup)
* Date: 2013-07-09
*
* API:
* jsonp(url, callback[, callbackName]);
*   url           - (string) URL to probe for JSON data
*   callback      - (function) handler of retrieved data
*   callbackName  - (string) optional name for JSONp padding function. Defaults to "c"
*
*/
var jsonp = (function () {
  var win = this, doc = win.document
    , defaultCallbackName = "c"
    , Nonce = (function () {
      var tokenAttr = "data-nonce";
      return {
        "set": function (script) {
          var token = ["jsonpId", +new Date, Math.floor(Math.random()*100000)].join("_");
          script.setAttribute(tokenAttr, token);
          return token;
        }
        , "get": function (script) {
          return script.getAttribute(tokenAttr);
        }
      };
    })();
  function cleanup() {
    var script = this
      , nonce = Nonce.get(script);
    script.parentNode.removeChild(script);
    delete win[nonce];
  }
  return function (url, handler, name) {
    arguments.length > 2 || (name = defaultCallbackName);
    var link = doc.createElement("a")
      , script = doc.createElement("script")
      , nonce = Nonce.set(script);
    window[nonce] = handler;
    link.href = url;
    url += [(link.search ? "&" : "?"), name, "=", nonce].join("");
    script.src = url;
    script.onload = script.onerror = cleanup;
    (doc.getElementsByTagName("head")[0] || doc.body).appendChild(script);
  };
})();
