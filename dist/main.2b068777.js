// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"b6fz":[function(require,module,exports) {
module.exports = "leetCode.035dc05f.png";
},{}],"NJZl":[function(require,module,exports) {
module.exports = "MDN.557cb223.jpeg";
},{}],"yRMo":[function(require,module,exports) {
module.exports = "React.d9276b00.png";
},{}],"O2Ui":[function(require,module,exports) {
module.exports = "Vue.169855c4.png";
},{}],"epB2":[function(require,module,exports) {
'use strict';

var _leetCode = require('./imgs/leetCode.png');

var _leetCode2 = _interopRequireDefault(_leetCode);

var _MDN = require('./imgs/MDN.jpeg');

var _MDN2 = _interopRequireDefault(_MDN);

var _React = require('./imgs/React.png');

var _React2 = _interopRequireDefault(_React);

var _Vue = require('./imgs/Vue.png');

var _Vue2 = _interopRequireDefault(_Vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.lastLi');
var addNewURL = $(".addNewURL");
var cover = $(".cover");
var oldSiteList = localStorage.getItem('oldSiteList');
var oldSiteListToObj = JSON.parse(oldSiteList);
var hashMap = oldSiteListToObj || [{ name: 'MDN', logoType: 'image', logoImg: _MDN2.default, newURL: 'https://developer.mozilla.org/' }, { name: 'Vue', logoType: 'image', logoImg: _Vue2.default, newURL: 'https://vuejs.org' }, { name: 'React', logoType: 'image', logoImg: _React2.default, newURL: 'https://reactjs.org' }, { name: 'leetCode', logoType: 'image', logoImg: _leetCode2.default, newURL: 'https://leetcode.com' }];

var render = function render() {
  $siteList.find('li:not(.lastLi)').remove();
  hashMap.forEach(function (node, index) {
    if (node.logoType === 'image') {
      var $li = $('\n      <li>\n        <div class="site">\n          <div class="site-inner-container">\n            <div class="logo"><img src="' + node.logoImg + '" alt="' + node.name[0] + '"></div>\n            <div class="name">' + node.name + '</div>\n          </div>\n          <div class="deleteSite">\n            <svg class="icon" aria-hidden="true">\n              <use xlink:href="#icon-more_operation"></use>\n            </svg>\n          <div>\n        </div>\n      </li>\n    ').insertBefore($lastLi);
      $li.on('click', function () {
        window.open(node.newURL, '_self');
      });
      $li.on('click', '.deleteSite', function (event) {
        event.stopPropagation();
        var info = window.confirm("Are you sure you want to delete this shortcut?");
        if (info === true) {
          hashMap.splice(index, 1);
        }
        render();
      });
    } else {
      var _$li = $('\n      <li>\n        <div class="site">\n          <div class="site-inner-container">\n            <div class="logo">' + node.name[0].toUpperCase() + '</div>\n            <div class="name">' + node.name + '</div>\n          </div>\n          <div class="deleteSite">\n            <svg class="icon" aria-hidden="true">\n              <use xlink:href="#icon-more_operation"></use>\n            </svg>\n          <div>\n        </div>\n      </li>\n    ').insertBefore($lastLi);
      _$li.on('click', function () {
        window.open(node.newURL, '_self');
      });
      _$li.on('click', '.deleteSite', function (event) {
        event.stopPropagation();
        var info = window.confirm("Are you sure you want to delete this shortcut?");
        if (info === true) {
          hashMap.splice(index, 1);
        }
        render();
      });
    };
  });
};

render();

var openAddForm = function openAddForm() {
  addNewURL.css('display', 'flex');
  cover.css('display', 'block');
};

var closeAddForm = function closeAddForm() {
  addNewURL.css('display', 'none');
  cover.css('display', 'none');
};

var submitAddForm = function submitAddForm() {
  var newURLName = $("input[name='newURLName']").val();
  if (newURLName === null || newURLName === "") {
    alert("Name required.");
    return false;
  }
  var newURL = $("input[name='newURL']").val();
  if (newURL === null || newURL === "") {
    alert("URL required.");
    return false;
  }
  if (newURL.indexOf('http') !== 0) {
    newURL = 'https://' + newURL;
  }
  hashMap.push({
    name: newURLName,
    logoType: 'text',
    newURL: newURL
  });
  render();
  closeAddForm();
};

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('oldSiteList', string);
};

$(".addButton").on('click', openAddForm);
$(".cancel").on('click', closeAddForm);
$(".add").on('click', function (event) {
  submitAddForm();
  event.preventDefault();
});

var activeNav = function activeNav(event) {
  var trackNav = event.currentTarget.getAttribute('class');
  if (trackNav.indexOf('navItem') === 0) {
    $('.navItem1').removeAttr('style');
    $('.navItem2').removeAttr('style');
    $('.navItem3').removeAttr('style');
    $('.search-engine-logo').css('display', 'none');
    $('.' + trackNav).css('display', 'flex').css('background', '#4285f43d').css('background', '#4285f43d').css('color', '#4285f4').css('border-radius', '24px').css('padding', '0 10px').css('font-weight', '500');
    if (trackNav === 'navItem1') {
      $('.searchForm').attr('action', 'https://www.google.com/search');
      $('.searchForm').find('input').attr('name', 'q');
    } else if (trackNav === 'navItem2') {
      $('.searchForm').attr('action', 'https://www.baidu.com/s');
      $('.searchForm').find('input').attr('name', 'wd');
    } else if (trackNav === 'navItem3') {
      $('.searchForm').attr('action', 'https://www.bing.com/search');
      $('.searchForm').find('input').attr('name', 'q');
    }
  }
  $('.' + trackNav + '>.search-engine-logo').css('display', 'block');
};

var initEngine = function initEngine() {
  $('.navItem1').css('display', 'flex').css('background', '#4285f43d').css('background', '#4285f43d').css('color', '#4285f4').css('border-radius', '24px').css('padding', '0 10px').css('font-weight', '500');
  $('.navItem1>.search-engine-logo').css('display', 'block');
};
initEngine();
$('.nav-bar').find('div').on('click', activeNav);

$(document).on('keypress', function (event) {
  var key = event.key; // equal to const key = event.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].name[0].toLowerCase() === key) {
      window.open(hashMap[i].newURL, '_self');
    };
  };
}).on('keypress', 'input:focus', function (event) {
  event.stopPropagation();
});
},{"./imgs/leetCode.png":"b6fz","./imgs/MDN.jpeg":"NJZl","./imgs/React.png":"yRMo","./imgs/Vue.png":"O2Ui"}]},{},["epB2"], null)
//# sourceMappingURL=main.565e8e91.map