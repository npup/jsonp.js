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
    , defaultCallbackName = "c";
  function cleanup() {
    var script = this
      , nonce = script.getAttribute("data-nonce");
    script.parentNode.removeChild(script);
    delete win[nonce];
  }
  return function (url, handler, name) {
    arguments.length > 2 || (name = defaultCallbackName);
    var link = doc.createElement("a")
      , nonce = ["jsonpId", +new Date, Math.floor(Math.random()*100000)].join("_")
      , script = doc.createElement("script");
    window[nonce] = handler;
    script.setAttribute("data-nonce", nonce);
    link.href = url;
    url += [(link.search ? "&" : "?"), name, "=", nonce].join("");
    script.src = url;
    script.onload = cleanup;
    (doc.getElementsByTagName("head")[0] || doc.body).appendChild(script);
  };
})();
