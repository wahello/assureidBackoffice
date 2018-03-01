//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var HTTP = Package.http.HTTP;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var FilesCollection;

var require = meteorInstall({"node_modules":{"meteor":{"ostrio:files":{"client.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/client.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
module.export({                                                                                                        // 1
  FilesCollection: function () {                                                                                       // 1
    return FilesCollection;                                                                                            // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Mongo = void 0;                                                                                                    // 1
module.watch(require("meteor/mongo"), {                                                                                // 1
  Mongo: function (v) {                                                                                                // 1
    Mongo = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
var Cookies = void 0;                                                                                                  // 1
module.watch(require("meteor/ostrio:cookies"), {                                                                       // 1
  Cookies: function (v) {                                                                                              // 1
    Cookies = v;                                                                                                       // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
var formatFleURL = void 0;                                                                                             // 1
module.watch(require("./lib.js"), {                                                                                    // 1
  formatFleURL: function (v) {                                                                                         // 1
    formatFleURL = v;                                                                                                  // 1
  }                                                                                                                    // 1
}, 4);                                                                                                                 // 1
var check = void 0,                                                                                                    // 1
    Match = void 0;                                                                                                    // 1
module.watch(require("meteor/check"), {                                                                                // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  },                                                                                                                   // 1
  Match: function (v) {                                                                                                // 1
    Match = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 5);                                                                                                                 // 1
var UploadInstance = void 0;                                                                                           // 1
module.watch(require("./upload.js"), {                                                                                 // 1
  UploadInstance: function (v) {                                                                                       // 1
    UploadInstance = v;                                                                                                // 1
  }                                                                                                                    // 1
}, 6);                                                                                                                 // 1
var FilesCollectionCore = void 0;                                                                                      // 1
module.watch(require("./core.js"), {                                                                                   // 1
  "default": function (v) {                                                                                            // 1
    FilesCollectionCore = v;                                                                                           // 1
  }                                                                                                                    // 1
}, 7);                                                                                                                 // 1
                                                                                                                       //
var NOOP = function () {}; /*                                                                                          // 10
                            * @locus Anywhere                                                                          //
                            * @class FilesCollection                                                                   //
                            * @param config           {Object}   - [Both]   Configuration object with next properties:
                            * @param config.debug     {Boolean}  - [Both]   Turn on/of debugging and extra logging     //
                            * @param config.ddp       {Object}   - [Client] Custom DDP connection. Object returned form `DDP.connect()`
                            * @param config.schema    {Object}   - [Both]   Collection Schema                          //
                            * @param config.public    {Boolean}  - [Both]   Store files in folder accessible for proxy servers, for limits, and more - read docs`
                            * @param config.chunkSize      {Number}  - [Both] Upload chunk size, default: 524288 bytes (0,5 Mb)
                            * @param config.downloadRoute  {String}  - [Both]   Server Route used to retrieve files    //
                            * @param config.collection     {Mongo.Collection} - [Both] Mongo Collection Instance       //
                            * @param config.collectionName {String}  - [Both]   Collection name                        //
                            * @param config.namingFunction {Function}- [Both]   Function which returns `String`        //
                            * @param config.onBeforeUpload {Function}- [Both]   Function which executes on server after receiving each chunk and on client right before beginning upload. Function context is `File` - so you are able to check for extension, mime-type, size and etc.
                            * return `true` to continue                                                                //
                            * return `false` or `String` to abort upload                                               //
                            * @param config.allowClientCode  {Boolean}  - [Both]   Allow to run `remove` from client   //
                            * @param config.onbeforeunloadMessage {String|Function} - [Client] Message shown to user when closing browser's window or tab while upload process is running
                            * @param config.disableUpload {Boolean} - Disable file upload, useful for server only solutions
                            * @summary Create new instance of FilesCollection                                          //
                            */                                                                                         //
                                                                                                                       //
var FilesCollection = function (_FilesCollectionCore) {                                                                //
  (0, _inherits3.default)(FilesCollection, _FilesCollectionCore);                                                      //
                                                                                                                       //
  function FilesCollection(config) {                                                                                   // 34
    (0, _classCallCheck3.default)(this, FilesCollection);                                                              // 34
                                                                                                                       //
    var _this = (0, _possibleConstructorReturn3.default)(this, _FilesCollectionCore.call(this));                       // 34
                                                                                                                       //
    if (config) {                                                                                                      // 36
      _this.ddp = config.ddp;                                                                                          // 38
      _this.debug = config.debug;                                                                                      // 39
      _this.schema = config.schema;                                                                                    // 40
      _this.public = config.public;                                                                                    // 41
      _this.chunkSize = config.chunkSize;                                                                              // 42
      _this.collection = config.collection;                                                                            // 43
      _this.downloadRoute = config.downloadRoute;                                                                      // 44
      _this.disableUpload = config.disableUpload;                                                                      // 45
      _this.namingFunction = config.namingFunction;                                                                    // 46
      _this.collectionName = config.collectionName;                                                                    // 47
      _this.onBeforeUpload = config.onBeforeUpload;                                                                    // 48
      _this.allowClientCode = config.allowClientCode;                                                                  // 49
      _this.onbeforeunloadMessage = config.onbeforeunloadMessage;                                                      // 50
    }                                                                                                                  // 52
                                                                                                                       //
    var self = _this;                                                                                                  // 54
    var cookie = new Cookies();                                                                                        // 55
                                                                                                                       //
    if (!_.isBoolean(_this.debug)) {                                                                                   // 56
      _this.debug = false;                                                                                             // 57
    }                                                                                                                  // 58
                                                                                                                       //
    if (!_.isBoolean(_this.public)) {                                                                                  // 60
      _this.public = false;                                                                                            // 61
    }                                                                                                                  // 62
                                                                                                                       //
    if (!_this.chunkSize) {                                                                                            // 64
      _this.chunkSize = 1024 * 512;                                                                                    // 65
    }                                                                                                                  // 66
                                                                                                                       //
    _this.chunkSize = Math.floor(_this.chunkSize / 8) * 8;                                                             // 67
                                                                                                                       //
    if (!_.isString(_this.collectionName) && !_this.collection) {                                                      // 69
      _this.collectionName = 'MeteorUploadFiles';                                                                      // 70
    }                                                                                                                  // 71
                                                                                                                       //
    if (!_this.collection) {                                                                                           // 73
      _this.collection = new Mongo.Collection(_this.collectionName);                                                   // 74
    } else {                                                                                                           // 75
      _this.collectionName = _this.collection._name;                                                                   // 76
    }                                                                                                                  // 77
                                                                                                                       //
    _this.collection.filesCollection = _this;                                                                          // 79
    check(_this.collectionName, String);                                                                               // 80
                                                                                                                       //
    if (_this.public && !_this.downloadRoute) {                                                                        // 82
      throw new Meteor.Error(500, "[FilesCollection." + _this.collectionName + "]: \"downloadRoute\" must be precisely provided on \"public\" collections! Note: \"downloadRoute\" must be equal or be inside of your web/proxy-server (relative) root.");
    }                                                                                                                  // 84
                                                                                                                       //
    if (!_.isBoolean(_this.disableUpload)) {                                                                           // 86
      _this.disableUpload = false;                                                                                     // 87
    }                                                                                                                  // 88
                                                                                                                       //
    if (!_.isString(_this.downloadRoute)) {                                                                            // 90
      _this.downloadRoute = '/cdn/storage';                                                                            // 91
    }                                                                                                                  // 92
                                                                                                                       //
    _this.downloadRoute = _this.downloadRoute.replace(/\/$/, '');                                                      // 94
                                                                                                                       //
    if (!_.isFunction(_this.namingFunction)) {                                                                         // 96
      _this.namingFunction = false;                                                                                    // 97
    }                                                                                                                  // 98
                                                                                                                       //
    if (!_.isFunction(_this.onBeforeUpload)) {                                                                         // 100
      _this.onBeforeUpload = false;                                                                                    // 101
    }                                                                                                                  // 102
                                                                                                                       //
    if (!_.isBoolean(_this.allowClientCode)) {                                                                         // 104
      _this.allowClientCode = true;                                                                                    // 105
    }                                                                                                                  // 106
                                                                                                                       //
    if (!_this.ddp) {                                                                                                  // 108
      _this.ddp = Meteor;                                                                                              // 109
    }                                                                                                                  // 110
                                                                                                                       //
    if (!_this.onbeforeunloadMessage) {                                                                                // 112
      _this.onbeforeunloadMessage = 'Upload in a progress... Do you want to abort?';                                   // 113
    }                                                                                                                  // 114
                                                                                                                       //
    var setTokenCookie = function () {                                                                                 // 116
      if (!cookie.has('x_mtok') && Meteor.connection._lastSessionId || cookie.has('x_mtok') && cookie.get('x_mtok') !== Meteor.connection._lastSessionId) {
        cookie.set('x_mtok', Meteor.connection._lastSessionId, {                                                       // 118
          path: '/'                                                                                                    // 119
        });                                                                                                            // 118
      }                                                                                                                // 121
    };                                                                                                                 // 122
                                                                                                                       //
    var unsetTokenCookie = function () {                                                                               // 124
      if (cookie.has('x_mtok')) {                                                                                      // 125
        cookie.remove('x_mtok', '/');                                                                                  // 126
      }                                                                                                                // 127
    };                                                                                                                 // 128
                                                                                                                       //
    if (typeof Accounts !== 'undefined' && Accounts !== null) {                                                        // 130
      Meteor.startup(function () {                                                                                     // 131
        setTokenCookie();                                                                                              // 132
      });                                                                                                              // 133
      Accounts.onLogin(function () {                                                                                   // 134
        setTokenCookie();                                                                                              // 135
      });                                                                                                              // 136
      Accounts.onLogout(function () {                                                                                  // 137
        unsetTokenCookie();                                                                                            // 138
      });                                                                                                              // 139
    }                                                                                                                  // 140
                                                                                                                       //
    check(_this.onbeforeunloadMessage, Match.OneOf(String, Function));                                                 // 142
                                                                                                                       //
    try {                                                                                                              // 144
      var _URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL || false;              // 145
                                                                                                                       //
      if (window.Worker && window.Blob && _URL) {                                                                      // 146
        _this._supportWebWorker = true;                                                                                // 147
        _this._webWorkerUrl = _URL.createObjectURL(new Blob(['!function(a){"use strict";a.onmessage=function(b){var c=b.data.f.slice(b.data.cs*(b.data.cc-1),b.data.cs*b.data.cc);if(b.data.ib===!0)postMessage({bin:c,chunkId:b.data.cc});else{var d;a.FileReader?(d=new FileReader,d.onloadend=function(a){postMessage({bin:(d.result||a.srcElement||a.target).split(",")[1],chunkId:b.data.cc,s:b.data.s})},d.onerror=function(a){throw(a.target||a.srcElement).error},d.readAsDataURL(c)):a.FileReaderSync?(d=new FileReaderSync,postMessage({bin:d.readAsDataURL(c).split(",")[1],chunkId:b.data.cc})):postMessage({bin:null,chunkId:b.data.cc,error:"File API is not supported in WebWorker!"})}}}(this);'], {
          type: 'application/javascript'                                                                               // 148
        }));                                                                                                           // 148
      } else if (window.Worker) {                                                                                      // 149
        _this._supportWebWorker = true;                                                                                // 150
        _this._webWorkerUrl = Meteor.absoluteUrl('packages/ostrio_files/worker.min.js');                               // 151
      } else {                                                                                                         // 152
        _this._supportWebWorker = false;                                                                               // 153
      }                                                                                                                // 154
    } catch (e) {                                                                                                      // 155
      self._debug('[FilesCollection] [Check WebWorker Availability] Error:', e);                                       // 156
                                                                                                                       //
      _this._supportWebWorker = false;                                                                                 // 157
    }                                                                                                                  // 158
                                                                                                                       //
    if (!_this.schema) {                                                                                               // 160
      _this.schema = FilesCollectionCore.schema;                                                                       // 161
    }                                                                                                                  // 162
                                                                                                                       //
    check(_this.debug, Boolean);                                                                                       // 164
    check(_this.schema, Object);                                                                                       // 165
    check(_this.public, Boolean);                                                                                      // 166
    check(_this.chunkSize, Number);                                                                                    // 167
    check(_this.downloadRoute, String);                                                                                // 168
    check(_this.disableUpload, Boolean);                                                                               // 169
    check(_this.namingFunction, Match.OneOf(false, Function));                                                         // 170
    check(_this.onBeforeUpload, Match.OneOf(false, Function));                                                         // 171
    check(_this.allowClientCode, Boolean);                                                                             // 172
    check(_this.ddp, Match.Any);                                                                                       // 173
    _this._methodNames = {                                                                                             // 175
      _Abort: "_FilesCollectionAbort_" + _this.collectionName,                                                         // 176
      _Write: "_FilesCollectionWrite_" + _this.collectionName,                                                         // 177
      _Start: "_FilesCollectionStart_" + _this.collectionName,                                                         // 178
      _Remove: "_FilesCollectionRemove_" + _this.collectionName                                                        // 179
    };                                                                                                                 // 175
    return _this;                                                                                                      // 34
  } /*                                                                                                                 // 181
     * @locus Anywhere                                                                                                 //
     * @memberOf FilesCollection                                                                                       //
     * @name _getMimeType                                                                                              //
     * @param {Object} fileData - File Object                                                                          //
     * @summary Returns file's mime-type                                                                               //
     * @returns {String}                                                                                               //
     */                                                                                                                //
                                                                                                                       //
  FilesCollection.prototype._getMimeType = function () {                                                               //
    function _getMimeType(fileData) {                                                                                  //
      var mime = void 0;                                                                                               // 192
      check(fileData, Object);                                                                                         // 193
                                                                                                                       //
      if (_.isObject(fileData)) {                                                                                      // 194
        mime = fileData.type;                                                                                          // 195
      }                                                                                                                // 196
                                                                                                                       //
      if (!mime || !_.isString(mime)) {                                                                                // 198
        mime = 'application/octet-stream';                                                                             // 199
      }                                                                                                                // 200
                                                                                                                       //
      return mime;                                                                                                     // 201
    }                                                                                                                  // 202
                                                                                                                       //
    return _getMimeType;                                                                                               //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollection                                                                                    //
        * @name _getUser                                                                                               //
        * @summary Returns object with `userId` and `user()` method which return user's object                         //
        * @returns {Object}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  FilesCollection.prototype._getUser = function () {                                                                   //
    function _getUser() {                                                                                              //
      var result = {                                                                                                   // 212
        user: function () {                                                                                            // 213
          return null;                                                                                                 // 214
        },                                                                                                             // 215
        userId: null                                                                                                   // 216
      };                                                                                                               // 212
                                                                                                                       //
      if (_.isFunction(Meteor.userId)) {                                                                               // 219
        result.user = function () {                                                                                    // 220
          return Meteor.user();                                                                                        // 220
        };                                                                                                             // 220
                                                                                                                       //
        result.userId = Meteor.userId();                                                                               // 221
      }                                                                                                                // 222
                                                                                                                       //
      return result;                                                                                                   // 224
    }                                                                                                                  // 225
                                                                                                                       //
    return _getUser;                                                                                                   //
  }(); /*                                                                                                              //
        * @locus Client                                                                                                //
        * @memberOf FilesCollection                                                                                    //
        * @name insert                                                                                                 //
        * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader                                             //
        * @param {Object} config - Configuration object with next properties:                                          //
        *   {File|Object} file           - HTML5 `files` item, like in change event: `e.currentTarget.files[0]`        //
        *   {Object}      meta           - Additional data as object, use later for search                             //
        *   {Boolean}     allowWebWorkers- Allow/Deny WebWorkers usage                                                 //
        *   {Number|dynamic} streams     - Quantity of parallel upload streams, default: 2                             //
        *   {Number|dynamic} chunkSize   - Chunk size for upload                                                       //
        *   {String}      transport      - Upload transport `http` or `ddp`                                            //
        *   {Object}      ddp            - Custom DDP connection. Object returned form `DDP.connect()`                 //
        *   {Function}    onUploaded     - Callback triggered when upload is finished, with two arguments `error` and `fileRef`
        *   {Function}    onStart        - Callback triggered when upload is started after all successful validations, with two arguments `error` (always null) and `fileRef`
        *   {Function}    onError        - Callback triggered on error in upload and/or FileReader, with two arguments `error` and `fileData`
        *   {Function}    onProgress     - Callback triggered when chunk is sent, with only argument `progress`        //
        *   {Function}    onBeforeUpload - Callback triggered right before upload is started:                          //
        *       return true to continue                                                                                //
        *       return false to abort upload                                                                           //
        * @param {Boolean} autoStart     - Start upload immediately. If set to false, you need manually call .start() method on returned class. Useful to set EventListeners.
        * @summary Upload file to server over DDP or HTTP                                                              //
        * @returns {UploadInstance} Instance. UploadInstance has next properties:                                      //
        *   {ReactiveVar} onPause  - Is upload process on the pause?                                                   //
        *   {ReactiveVar} state    - active|paused|aborted|completed                                                   //
        *   {ReactiveVar} progress - Current progress in percentage                                                    //
        *   {Function}    pause    - Pause upload process                                                              //
        *   {Function}    continue - Continue paused upload process                                                    //
        *   {Function}    toggle   - Toggle continue/pause if upload process                                           //
        *   {Function}    abort    - Abort upload                                                                      //
        *   {Function}    readAsDataURL - Current file as data URL, use to create image preview and etc. Be aware of big files, may lead to browser crash
        */                                                                                                             //
                                                                                                                       //
  FilesCollection.prototype.insert = function () {                                                                     //
    function insert(config) {                                                                                          //
      var autoStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;                        // 259
                                                                                                                       //
      if (this.disableUpload) {                                                                                        // 260
        console.warn('[FilesCollection] [insert()] Upload is disabled with [disableUpload]!');                         // 261
        return {};                                                                                                     // 262
      }                                                                                                                // 263
                                                                                                                       //
      return new UploadInstance(config, this)[autoStart ? 'start' : 'manual']();                                       // 264
    }                                                                                                                  // 265
                                                                                                                       //
    return insert;                                                                                                     //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollection                                                                                    //
        * @name remove                                                                                                 //
        * @param {String|Object} selector - Mongo-Style selector (http://docs.meteor.com/api/collections.html#selectors)
        * @param {Function} callback - Callback with one `error` argument                                              //
        * @summary Remove documents from the collection                                                                //
        * @returns {FilesCollection} Instance                                                                          //
        */                                                                                                             //
                                                                                                                       //
  FilesCollection.prototype.remove = function () {                                                                     //
    function remove() {                                                                                                //
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                           // 276
      var callback = arguments[1];                                                                                     // 276
                                                                                                                       //
      this._debug("[FilesCollection] [remove(" + JSON.stringify(selector) + ")]");                                     // 277
                                                                                                                       //
      check(selector, Match.OneOf(Object, String));                                                                    // 278
      check(callback, Match.Optional(Function));                                                                       // 279
                                                                                                                       //
      if (this.allowClientCode) {                                                                                      // 281
        this.ddp.call(this._methodNames._Remove, selector, callback || NOOP);                                          // 282
      } else {                                                                                                         // 283
        callback && callback(new Meteor.Error(401, '[FilesCollection] [remove] Run code from client is not allowed!'));
                                                                                                                       //
        this._debug('[FilesCollection] [remove] Run code from client is not allowed!');                                // 285
      }                                                                                                                // 286
                                                                                                                       //
      return this;                                                                                                     // 288
    }                                                                                                                  // 289
                                                                                                                       //
    return remove;                                                                                                     //
  }();                                                                                                                 //
                                                                                                                       //
  return FilesCollection;                                                                                              //
}(FilesCollectionCore);                                                                                                //
                                                                                                                       //
/*                                                                                                                     // 292
 * @locus Client                                                                                                       //
 * @TemplateHelper                                                                                                     //
 * @name fileURL                                                                                                       //
 * @param {Object} fileRef - File reference object                                                                     //
 * @param {String} version - [Optional] Version of file you would like to request                                      //
 * @summary Get download URL for file by fileRef, even without subscription                                            //
 * @example {{fileURL fileRef}}                                                                                        //
 * @returns {String}                                                                                                   //
 */Meteor.startup(function () {                                                                                        //
  if (typeof Template !== 'undefined' && Template !== null) {                                                          // 303
    Template.registerHelper('fileURL', function (fileRef) {                                                            // 304
      var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';                    // 304
                                                                                                                       //
      if (!_.isObject(fileRef)) {                                                                                      // 305
        return '';                                                                                                     // 306
      }                                                                                                                // 307
                                                                                                                       //
      version = !_.isString(version) ? 'original' : version;                                                           // 309
      return formatFleURL(fileRef, version);                                                                           // 310
    });                                                                                                                // 311
  }                                                                                                                    // 312
});                                                                                                                    // 313
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/core.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
module.export({                                                                                                        // 1
  "default": function () {                                                                                             // 1
    return FilesCollectionCore;                                                                                        // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var EventEmitter = void 0;                                                                                             // 1
module.watch(require("eventemitter3"), {                                                                               // 1
  EventEmitter: function (v) {                                                                                         // 1
    EventEmitter = v;                                                                                                  // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var formatFleURL = void 0;                                                                                             // 1
module.watch(require("./lib.js"), {                                                                                    // 1
  formatFleURL: function (v) {                                                                                         // 1
    formatFleURL = v;                                                                                                  // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
var check = void 0,                                                                                                    // 1
    Match = void 0;                                                                                                    // 1
module.watch(require("meteor/check"), {                                                                                // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  },                                                                                                                   // 1
  Match: function (v) {                                                                                                // 1
    Match = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
var FilesCursor = void 0,                                                                                              // 1
    FileCursor = void 0;                                                                                               // 1
module.watch(require("./cursor.js"), {                                                                                 // 1
  FilesCursor: function (v) {                                                                                          // 1
    FilesCursor = v;                                                                                                   // 1
  },                                                                                                                   // 1
  FileCursor: function (v) {                                                                                           // 1
    FileCursor = v;                                                                                                    // 1
  }                                                                                                                    // 1
}, 4);                                                                                                                 // 1
                                                                                                                       //
var FilesCollectionCore = function (_EventEmitter) {                                                                   //
  (0, _inherits3.default)(FilesCollectionCore, _EventEmitter);                                                         //
                                                                                                                       //
  function FilesCollectionCore() {                                                                                     // 8
    (0, _classCallCheck3.default)(this, FilesCollectionCore);                                                          // 8
    return (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));                                   // 8
  }                                                                                                                    // 10
                                                                                                                       //
  /*                                                                                                                   // 79
   * @locus Anywhere                                                                                                   //
   * @memberOf FilesCollectionCore                                                                                     //
   * @name _debug                                                                                                      //
   * @summary Print logs in debug mode                                                                                 //
   * @returns {void}                                                                                                   //
   */FilesCollectionCore.prototype._debug = function () {                                                              //
    function _debug() {                                                                                                //
      if (this.debug) {                                                                                                // 87
        (console.info || console.log || function () {}).apply(undefined, arguments);                                   // 88
      }                                                                                                                // 89
    }                                                                                                                  // 90
                                                                                                                       //
    return _debug;                                                                                                     //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name _getFileName                                                                                           //
        * @param {Object} fileData - File Object                                                                       //
        * @summary Returns file's name                                                                                 //
        * @returns {String}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype._getFileName = function () {                                                           //
    function _getFileName(fileData) {                                                                                  //
      var fileName = fileData.name || fileData.fileName;                                                               // 101
                                                                                                                       //
      if (_.isString(fileName) && fileName.length > 0) {                                                               // 102
        return (fileData.name || fileData.fileName).replace(/\.\./g, '').replace(/\//g, '');                           // 103
      }                                                                                                                // 104
                                                                                                                       //
      return '';                                                                                                       // 105
    }                                                                                                                  // 106
                                                                                                                       //
    return _getFileName;                                                                                               //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name _getExt                                                                                                //
        * @param {String} FileName - File name                                                                         //
        * @summary Get extension from FileName                                                                         //
        * @returns {Object}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype._getExt = function () {                                                                //
    function _getExt(fileName) {                                                                                       //
      if (!!~fileName.indexOf('.')) {                                                                                  // 117
        var extension = (fileName.split('.').pop().split('?')[0] || '').toLowerCase();                                 // 118
        return {                                                                                                       // 119
          ext: extension,                                                                                              // 119
          extension: extension,                                                                                        // 119
          extensionWithDot: "." + extension                                                                            // 119
        };                                                                                                             // 119
      }                                                                                                                // 120
                                                                                                                       //
      return {                                                                                                         // 121
        ext: '',                                                                                                       // 121
        extension: '',                                                                                                 // 121
        extensionWithDot: ''                                                                                           // 121
      };                                                                                                               // 121
    }                                                                                                                  // 122
                                                                                                                       //
    return _getExt;                                                                                                    //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name _updateFileTypes                                                                                       //
        * @param {Object} data - File data                                                                             //
        * @summary Internal method. Classify file based on 'type' field                                                //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype._updateFileTypes = function () {                                                       //
    function _updateFileTypes(data) {                                                                                  //
      data.isVideo = /^video\//i.test(data.type);                                                                      // 132
      data.isAudio = /^audio\//i.test(data.type);                                                                      // 133
      data.isImage = /^image\//i.test(data.type);                                                                      // 134
      data.isText = /^text\//i.test(data.type);                                                                        // 135
      data.isJSON = /^application\/json$/i.test(data.type);                                                            // 136
      data.isPDF = /^application\/(x-)?pdf$/i.test(data.type);                                                         // 137
    }                                                                                                                  // 138
                                                                                                                       //
    return _updateFileTypes;                                                                                           //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name _dataToSchema                                                                                          //
        * @param {Object} data - File data                                                                             //
        * @summary Internal method. Build object in accordance with default schema from File data                      //
        * @returns {Object}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype._dataToSchema = function () {                                                          //
    function _dataToSchema(data) {                                                                                     //
      var ds = {                                                                                                       // 149
        name: data.name,                                                                                               // 150
        extension: data.extension,                                                                                     // 151
        path: data.path,                                                                                               // 152
        meta: data.meta,                                                                                               // 153
        type: data.type,                                                                                               // 154
        size: data.size,                                                                                               // 155
        userId: data.userId || null,                                                                                   // 156
        versions: {                                                                                                    // 157
          original: {                                                                                                  // 158
            path: data.path,                                                                                           // 159
            size: data.size,                                                                                           // 160
            type: data.type,                                                                                           // 161
            extension: data.extension                                                                                  // 162
          }                                                                                                            // 158
        },                                                                                                             // 157
        _downloadRoute: data._downloadRoute || this.downloadRoute,                                                     // 165
        _collectionName: data._collectionName || this.collectionName                                                   // 166
      }; //Optional fileId                                                                                             // 149
                                                                                                                       //
      if (data.fileId) {                                                                                               // 170
        ds._id = data.fileId;                                                                                          // 171
      }                                                                                                                // 172
                                                                                                                       //
      this._updateFileTypes(ds);                                                                                       // 174
                                                                                                                       //
      ds._storagePath = data._storagePath || this.storagePath(_.extend(data, ds));                                     // 175
      return ds;                                                                                                       // 176
    }                                                                                                                  // 177
                                                                                                                       //
    return _dataToSchema;                                                                                              //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name findOne                                                                                                //
        * @param {String|Object} selector - Mongo-Style selector (http://docs.meteor.com/api/collections.html#selectors)
        * @param {Object} options - Mongo-Style selector Options (http://docs.meteor.com/api/collections.html#sortspecifiers)
        * @summary Find and return Cursor for matching document Object                                                 //
        * @returns {FileCursor} Instance                                                                               //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype.findOne = function () {                                                                //
    function findOne() {                                                                                               //
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                           // 188
      var options = arguments[1];                                                                                      // 188
                                                                                                                       //
      this._debug("[FilesCollection] [findOne(" + JSON.stringify(selector) + ", " + JSON.stringify(options) + ")]");   // 189
                                                                                                                       //
      check(selector, Match.Optional(Match.OneOf(Object, String, Boolean, Number, null)));                             // 190
      check(options, Match.Optional(Object));                                                                          // 191
      var doc = this.collection.findOne(selector, options);                                                            // 193
                                                                                                                       //
      if (doc) {                                                                                                       // 194
        return new FileCursor(doc, this);                                                                              // 195
      }                                                                                                                // 196
                                                                                                                       //
      return doc;                                                                                                      // 197
    }                                                                                                                  // 198
                                                                                                                       //
    return findOne;                                                                                                    //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name find                                                                                                   //
        * @param {String|Object} selector - Mongo-Style selector (http://docs.meteor.com/api/collections.html#selectors)
        * @param {Object}        options  - Mongo-Style selector Options (http://docs.meteor.com/api/collections.html#sortspecifiers)
        * @summary Find and return Cursor for matching documents                                                       //
        * @returns {FilesCursor} Instance                                                                              //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype.find = function () {                                                                   //
    function find() {                                                                                                  //
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                           // 209
      var options = arguments[1];                                                                                      // 209
                                                                                                                       //
      this._debug("[FilesCollection] [find(" + JSON.stringify(selector) + ", " + JSON.stringify(options) + ")]");      // 210
                                                                                                                       //
      check(selector, Match.Optional(Match.OneOf(Object, String, Boolean, Number, null)));                             // 211
      check(options, Match.Optional(Object));                                                                          // 212
      return new FilesCursor(selector, options, this);                                                                 // 214
    }                                                                                                                  // 215
                                                                                                                       //
    return find;                                                                                                       //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name update                                                                                                 //
        * @see http://docs.meteor.com/#/full/update                                                                    //
        * @summary link Mongo.Collection update method                                                                 //
        * @returns {Mongo.Collection} Instance                                                                         //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype.update = function () {                                                                 //
    function update() {                                                                                                //
      this.collection.update.apply(this.collection, arguments);                                                        // 226
      return this.collection;                                                                                          // 227
    }                                                                                                                  // 228
                                                                                                                       //
    return update;                                                                                                     //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCollectionCore                                                                                //
        * @name link                                                                                                   //
        * @param {Object} fileRef - File reference object                                                              //
        * @param {String} version - Version of file you would like to request                                          //
        * @summary Returns downloadable URL                                                                            //
        * @returns {String} Empty string returned in case if file not found in DB                                      //
        */                                                                                                             //
                                                                                                                       //
  FilesCollectionCore.prototype.link = function () {                                                                   //
    function link(fileRef) {                                                                                           //
      var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';                    // 239
                                                                                                                       //
      this._debug("[FilesCollection] [link(" + (_.isObject(fileRef) ? fileRef._id : undefined) + ", " + version + ")]");
                                                                                                                       //
      check(fileRef, Object);                                                                                          // 241
      check(version, String);                                                                                          // 242
                                                                                                                       //
      if (!fileRef) {                                                                                                  // 244
        return '';                                                                                                     // 245
      }                                                                                                                // 246
                                                                                                                       //
      return formatFleURL(fileRef, version);                                                                           // 247
    }                                                                                                                  // 248
                                                                                                                       //
    return link;                                                                                                       //
  }();                                                                                                                 //
                                                                                                                       //
  return FilesCollectionCore;                                                                                          //
}(EventEmitter);                                                                                                       //
                                                                                                                       //
FilesCollectionCore.schema = {                                                                                         // 7
  size: {                                                                                                              // 13
    type: Number                                                                                                       // 14
  },                                                                                                                   // 13
  name: {                                                                                                              // 16
    type: String                                                                                                       // 17
  },                                                                                                                   // 16
  type: {                                                                                                              // 19
    type: String                                                                                                       // 20
  },                                                                                                                   // 19
  path: {                                                                                                              // 22
    type: String                                                                                                       // 23
  },                                                                                                                   // 22
  isVideo: {                                                                                                           // 25
    type: Boolean                                                                                                      // 26
  },                                                                                                                   // 25
  isAudio: {                                                                                                           // 28
    type: Boolean                                                                                                      // 29
  },                                                                                                                   // 28
  isImage: {                                                                                                           // 31
    type: Boolean                                                                                                      // 32
  },                                                                                                                   // 31
  isText: {                                                                                                            // 34
    type: Boolean                                                                                                      // 35
  },                                                                                                                   // 34
  isJSON: {                                                                                                            // 37
    type: Boolean                                                                                                      // 38
  },                                                                                                                   // 37
  isPDF: {                                                                                                             // 40
    type: Boolean                                                                                                      // 41
  },                                                                                                                   // 40
  extension: {                                                                                                         // 43
    type: String,                                                                                                      // 44
    optional: true                                                                                                     // 45
  },                                                                                                                   // 43
  _storagePath: {                                                                                                      // 47
    type: String                                                                                                       // 48
  },                                                                                                                   // 47
  _downloadRoute: {                                                                                                    // 50
    type: String                                                                                                       // 51
  },                                                                                                                   // 50
  _collectionName: {                                                                                                   // 53
    type: String                                                                                                       // 54
  },                                                                                                                   // 53
  "public": {                                                                                                          // 56
    type: Boolean,                                                                                                     // 57
    optional: true                                                                                                     // 58
  },                                                                                                                   // 56
  meta: {                                                                                                              // 60
    type: Object,                                                                                                      // 61
    blackbox: true,                                                                                                    // 62
    optional: true                                                                                                     // 63
  },                                                                                                                   // 60
  userId: {                                                                                                            // 65
    type: String,                                                                                                      // 66
    optional: true                                                                                                     // 67
  },                                                                                                                   // 65
  updatedAt: {                                                                                                         // 69
    type: Date,                                                                                                        // 70
    optional: true                                                                                                     // 71
  },                                                                                                                   // 69
  versions: {                                                                                                          // 73
    type: Object,                                                                                                      // 74
    blackbox: true                                                                                                     // 75
  }                                                                                                                    // 73
};                                                                                                                     // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/cursor.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
module.export({                                                                                                        // 1
  FileCursor: function () {                                                                                            // 1
    return FileCursor;                                                                                                 // 1
  },                                                                                                                   // 1
  FilesCursor: function () {                                                                                           // 1
    return FilesCursor;                                                                                                // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
                                                                                                                       //
var FileCursor = function () {                                                                                         //
  function FileCursor(_fileRef, _collection) {                                                                         // 13
    (0, _classCallCheck3.default)(this, FileCursor);                                                                   // 13
    this._fileRef = _fileRef;                                                                                          // 14
    this._collection = _collection;                                                                                    // 15
                                                                                                                       //
    _.extend(this, _fileRef);                                                                                          // 16
  } /*                                                                                                                 // 17
     * @locus Anywhere                                                                                                 //
     * @memberOf FileCursor                                                                                            //
     * @name remove                                                                                                    //
     * @param callback {Function} - Triggered asynchronously after item is removed or failed to be removed             //
     * @summary Remove document                                                                                        //
     * @returns {FileCursor}                                                                                           //
     */                                                                                                                //
                                                                                                                       //
  FileCursor.prototype.remove = function () {                                                                          //
    function remove(callback) {                                                                                        //
      this._collection._debug('[FilesCollection] [FileCursor] [remove()]');                                            // 28
                                                                                                                       //
      if (this._fileRef) {                                                                                             // 29
        this._collection.remove(this._fileRef._id, callback);                                                          // 30
      } else {                                                                                                         // 31
        callback && callback(new Meteor.Error(404, 'No such file'));                                                   // 32
      }                                                                                                                // 33
                                                                                                                       //
      return this;                                                                                                     // 34
    }                                                                                                                  // 35
                                                                                                                       //
    return remove;                                                                                                     //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FileCursor                                                                                         //
        * @name link                                                                                                   //
        * @param version {String} - Name of file's subversion                                                          //
        * @summary Returns downloadable URL to File                                                                    //
        * @returns {String}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  FileCursor.prototype.link = function () {                                                                            //
    function link() {                                                                                                  //
      var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'original';                    // 45
                                                                                                                       //
      this._collection._debug("[FilesCollection] [FileCursor] [link(" + version + ")]");                               // 46
                                                                                                                       //
      if (this._fileRef) {                                                                                             // 47
        return this._collection.link(this._fileRef, version);                                                          // 48
      }                                                                                                                // 49
                                                                                                                       //
      return '';                                                                                                       // 50
    }                                                                                                                  // 51
                                                                                                                       //
    return link;                                                                                                       //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FileCursor                                                                                         //
        * @name get                                                                                                    //
        * @param property {String} - Name of sub-object property                                                       //
        * @summary Returns current document as a plain Object, if `property` is specified - returns value of sub-object property
        * @returns {Object|mix}                                                                                        //
        */                                                                                                             //
                                                                                                                       //
  FileCursor.prototype.get = function () {                                                                             //
    function get(property) {                                                                                           //
      this._collection._debug("[FilesCollection] [FileCursor] [get(" + property + ")]");                               // 62
                                                                                                                       //
      if (property) {                                                                                                  // 63
        return this._fileRef[property];                                                                                // 64
      }                                                                                                                // 65
                                                                                                                       //
      return this._fileRef;                                                                                            // 66
    }                                                                                                                  // 67
                                                                                                                       //
    return get;                                                                                                        //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FileCursor                                                                                         //
        * @name fetch                                                                                                  //
        * @summary Returns document as plain Object in Array                                                           //
        * @returns {[Object]}                                                                                          //
        */                                                                                                             //
                                                                                                                       //
  FileCursor.prototype.fetch = function () {                                                                           //
    function fetch() {                                                                                                 //
      this._collection._debug('[FilesCollection] [FileCursor] [fetch()]');                                             // 77
                                                                                                                       //
      return [this._fileRef];                                                                                          // 78
    }                                                                                                                  // 79
                                                                                                                       //
    return fetch;                                                                                                      //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FileCursor                                                                                         //
        * @name with                                                                                                   //
        * @summary Returns reactive version of current FileCursor, useful to use with `{{#with}}...{{/with}}` block template helper
        * @returns {[Object]}                                                                                          //
        */                                                                                                             //
                                                                                                                       //
  FileCursor.prototype.with = function () {                                                                            //
    function _with() {                                                                                                 //
      this._collection._debug('[FilesCollection] [FileCursor] [with()]');                                              // 89
                                                                                                                       //
      return _.extend(this, this._collection.collection.findOne(this._fileRef._id));                                   // 90
    }                                                                                                                  // 91
                                                                                                                       //
    return _with;                                                                                                      //
  }();                                                                                                                 //
                                                                                                                       //
  return FileCursor;                                                                                                   //
}();                                                                                                                   //
                                                                                                                       //
var FilesCursor = function () {                                                                                        //
  function FilesCursor() {                                                                                             // 104
    var _selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                            // 104
                                                                                                                       //
    var options = arguments[1];                                                                                        // 104
    var _collection = arguments[2];                                                                                    // 104
    (0, _classCallCheck3.default)(this, FilesCursor);                                                                  // 104
    this._collection = _collection;                                                                                    // 105
    this._selector = _selector;                                                                                        // 106
    this._current = -1;                                                                                                // 107
    this.cursor = this._collection.collection.find(this._selector, options);                                           // 108
  } /*                                                                                                                 // 109
     * @locus Anywhere                                                                                                 //
     * @memberOf FilesCursor                                                                                           //
     * @name get                                                                                                       //
     * @summary Returns all matching document(s) as an Array. Alias of `.fetch()`                                      //
     * @returns {[Object]}                                                                                             //
     */                                                                                                                //
                                                                                                                       //
  FilesCursor.prototype.get = function () {                                                                            //
    function get() {                                                                                                   //
      this._collection._debug('[FilesCollection] [FilesCursor] [get()]');                                              // 119
                                                                                                                       //
      return this.cursor.fetch();                                                                                      // 120
    }                                                                                                                  // 121
                                                                                                                       //
    return get;                                                                                                        //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name hasNext                                                                                                //
        * @summary Returns `true` if there is next item available on Cursor                                            //
        * @returns {Boolean}                                                                                           //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.hasNext = function () {                                                                        //
    function hasNext() {                                                                                               //
      this._collection._debug('[FilesCollection] [FilesCursor] [hasNext()]');                                          // 131
                                                                                                                       //
      return this._current < this.cursor.count() - 1;                                                                  // 132
    }                                                                                                                  // 133
                                                                                                                       //
    return hasNext;                                                                                                    //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name next                                                                                                   //
        * @summary Returns next item on Cursor, if available                                                           //
        * @returns {Object|undefined}                                                                                  //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.next = function () {                                                                           //
    function next() {                                                                                                  //
      this._collection._debug('[FilesCollection] [FilesCursor] [next()]');                                             // 143
                                                                                                                       //
      this.cursor.fetch()[++this._current];                                                                            // 144
    }                                                                                                                  // 145
                                                                                                                       //
    return next;                                                                                                       //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name hasPrevious                                                                                            //
        * @summary Returns `true` if there is previous item available on Cursor                                        //
        * @returns {Boolean}                                                                                           //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.hasPrevious = function () {                                                                    //
    function hasPrevious() {                                                                                           //
      this._collection._debug('[FilesCollection] [FilesCursor] [hasPrevious()]');                                      // 155
                                                                                                                       //
      return this._current !== -1;                                                                                     // 156
    }                                                                                                                  // 157
                                                                                                                       //
    return hasPrevious;                                                                                                //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name previous                                                                                               //
        * @summary Returns previous item on Cursor, if available                                                       //
        * @returns {Object|undefined}                                                                                  //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.previous = function () {                                                                       //
    function previous() {                                                                                              //
      this._collection._debug('[FilesCollection] [FilesCursor] [previous()]');                                         // 167
                                                                                                                       //
      this.cursor.fetch()[--this._current];                                                                            // 168
    }                                                                                                                  // 169
                                                                                                                       //
    return previous;                                                                                                   //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name fetch                                                                                                  //
        * @summary Returns all matching document(s) as an Array.                                                       //
        * @returns {[Object]}                                                                                          //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.fetch = function () {                                                                          //
    function fetch() {                                                                                                 //
      this._collection._debug('[FilesCollection] [FilesCursor] [fetch()]');                                            // 179
                                                                                                                       //
      return this.cursor.fetch() || [];                                                                                // 180
    }                                                                                                                  // 181
                                                                                                                       //
    return fetch;                                                                                                      //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name first                                                                                                  //
        * @summary Returns first item on Cursor, if available                                                          //
        * @returns {Object|undefined}                                                                                  //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.first = function () {                                                                          //
    function first() {                                                                                                 //
      this._collection._debug('[FilesCollection] [FilesCursor] [first()]');                                            // 191
                                                                                                                       //
      this._current = 0;                                                                                               // 192
      return this.fetch()[this._current];                                                                              // 193
    }                                                                                                                  // 194
                                                                                                                       //
    return first;                                                                                                      //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name last                                                                                                   //
        * @summary Returns last item on Cursor, if available                                                           //
        * @returns {Object|undefined}                                                                                  //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.last = function () {                                                                           //
    function last() {                                                                                                  //
      this._collection._debug('[FilesCollection] [FilesCursor] [last()]');                                             // 204
                                                                                                                       //
      this._current = this.count() - 1;                                                                                // 205
      return this.fetch()[this._current];                                                                              // 206
    }                                                                                                                  // 207
                                                                                                                       //
    return last;                                                                                                       //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name count                                                                                                  //
        * @summary Returns the number of documents that match a query                                                  //
        * @returns {Number}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.count = function () {                                                                          //
    function count() {                                                                                                 //
      this._collection._debug('[FilesCollection] [FilesCursor] [count()]');                                            // 217
                                                                                                                       //
      return this.cursor.count();                                                                                      // 218
    }                                                                                                                  // 219
                                                                                                                       //
    return count;                                                                                                      //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name remove                                                                                                 //
        * @param callback {Function} - Triggered asynchronously after item is removed or failed to be removed          //
        * @summary Removes all documents that match a query                                                            //
        * @returns {FilesCursor}                                                                                       //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.remove = function () {                                                                         //
    function remove(callback) {                                                                                        //
      this._collection._debug('[FilesCollection] [FilesCursor] [remove()]');                                           // 230
                                                                                                                       //
      this._collection.remove(this._selector, callback);                                                               // 231
                                                                                                                       //
      return this;                                                                                                     // 232
    }                                                                                                                  // 233
                                                                                                                       //
    return remove;                                                                                                     //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name forEach                                                                                                //
        * @param callback {Function} - Function to call. It will be called with three arguments: the `file`, a 0-based index, and cursor itself
        * @param context {Object} - An object which will be the value of `this` inside `callback`                      //
        * @summary Call `callback` once for each matching document, sequentially and synchronously.                    //
        * @returns {undefined}                                                                                         //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.forEach = function () {                                                                        //
    function forEach(callback) {                                                                                       //
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};                            // 244
                                                                                                                       //
      this._collection._debug('[FilesCollection] [FilesCursor] [forEach()]');                                          // 245
                                                                                                                       //
      this.cursor.forEach(callback, context);                                                                          // 246
    }                                                                                                                  // 247
                                                                                                                       //
    return forEach;                                                                                                    //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name each                                                                                                   //
        * @summary Returns an Array of FileCursor made for each document on current cursor                             //
        *          Useful when using in {{#each FilesCursor#each}}...{{/each}} block template helper                   //
        * @returns {[FileCursor]}                                                                                      //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.each = function () {                                                                           //
    function each() {                                                                                                  //
      var _this = this;                                                                                                // 257
                                                                                                                       //
      return this.map(function (file) {                                                                                // 258
        return new FileCursor(file, _this._collection);                                                                // 259
      });                                                                                                              // 260
    }                                                                                                                  // 261
                                                                                                                       //
    return each;                                                                                                       //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name map                                                                                                    //
        * @param callback {Function} - Function to call. It will be called with three arguments: the `file`, a 0-based index, and cursor itself
        * @param context {Object} - An object which will be the value of `this` inside `callback`                      //
        * @summary Map `callback` over all matching documents. Returns an Array.                                       //
        * @returns {Array}                                                                                             //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.map = function () {                                                                            //
    function map(callback) {                                                                                           //
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};                            // 272
                                                                                                                       //
      this._collection._debug('[FilesCollection] [FilesCursor] [map()]');                                              // 273
                                                                                                                       //
      return this.cursor.map(callback, context);                                                                       // 274
    }                                                                                                                  // 275
                                                                                                                       //
    return map;                                                                                                        //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name current                                                                                                //
        * @summary Returns current item on Cursor, if available                                                        //
        * @returns {Object|undefined}                                                                                  //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.current = function () {                                                                        //
    function current() {                                                                                               //
      this._collection._debug('[FilesCollection] [FilesCursor] [current()]');                                          // 285
                                                                                                                       //
      if (this._current < 0) {                                                                                         // 286
        this._current = 0;                                                                                             // 287
      }                                                                                                                // 288
                                                                                                                       //
      return this.fetch()[this._current];                                                                              // 289
    }                                                                                                                  // 290
                                                                                                                       //
    return current;                                                                                                    //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name observe                                                                                                //
        * @param callbacks {Object} - Functions to call to deliver the result set as it changes                        //
        * @summary Watch a query. Receive callbacks as the result set changes.                                         //
        * @url http://docs.meteor.com/api/collections.html#Mongo-Cursor-observe                                        //
        * @returns {Object} - live query handle                                                                        //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.observe = function () {                                                                        //
    function observe(callbacks) {                                                                                      //
      this._collection._debug('[FilesCollection] [FilesCursor] [observe()]');                                          // 302
                                                                                                                       //
      return this.cursor.observe(callbacks);                                                                           // 303
    }                                                                                                                  // 304
                                                                                                                       //
    return observe;                                                                                                    //
  }(); /*                                                                                                              //
        * @locus Anywhere                                                                                              //
        * @memberOf FilesCursor                                                                                        //
        * @name observeChanges                                                                                         //
        * @param callbacks {Object} - Functions to call to deliver the result set as it changes                        //
        * @summary Watch a query. Receive callbacks as the result set changes. Only the differences between the old and new documents are passed to the callbacks.
        * @url http://docs.meteor.com/api/collections.html#Mongo-Cursor-observeChanges                                 //
        * @returns {Object} - live query handle                                                                        //
        */                                                                                                             //
                                                                                                                       //
  FilesCursor.prototype.observeChanges = function () {                                                                 //
    function observeChanges(callbacks) {                                                                               //
      this._collection._debug('[FilesCollection] [FilesCursor] [observeChanges()]');                                   // 316
                                                                                                                       //
      return this.cursor.observeChanges(callbacks);                                                                    // 317
    }                                                                                                                  // 318
                                                                                                                       //
    return observeChanges;                                                                                             //
  }();                                                                                                                 //
                                                                                                                       //
  return FilesCursor;                                                                                                  //
}();                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/lib.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({                                                                                                        // 1
  fixJSONParse: function () {                                                                                          // 1
    return fixJSONParse;                                                                                               // 1
  },                                                                                                                   // 1
  fixJSONStringify: function () {                                                                                      // 1
    return fixJSONStringify;                                                                                           // 1
  },                                                                                                                   // 1
  formatFleURL: function () {                                                                                          // 1
    return formatFleURL;                                                                                               // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var check = void 0;                                                                                                    // 1
module.watch(require("meteor/check"), {                                                                                // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
                                                                                                                       //
/*                                                                                                                     // 4
 * @const {Function} fixJSONParse - Fix issue with Date parse                                                          //
 */var fixJSONParse = function (obj) {                                                                                 //
  for (var key in meteorBabelHelpers.sanitizeForInObject(obj)) {                                                       // 8
    if (_.isString(obj[key]) && !!~obj[key].indexOf('=--JSON-DATE--=')) {                                              // 9
      obj[key] = obj[key].replace('=--JSON-DATE--=', '');                                                              // 10
      obj[key] = new Date(parseInt(obj[key]));                                                                         // 11
    } else if (_.isObject(obj[key])) {                                                                                 // 12
      obj[key] = fixJSONParse(obj[key]);                                                                               // 13
    } else if (_.isArray(obj[key])) {                                                                                  // 14
      var v = void 0;                                                                                                  // 15
                                                                                                                       //
      for (var i = 0; i < obj[key].length; i++) {                                                                      // 16
        v = obj[key][i];                                                                                               // 17
                                                                                                                       //
        if (_.isObject(v)) {                                                                                           // 18
          obj[key][i] = fixJSONParse(v);                                                                               // 19
        } else if (_.isString(v) && !!~v.indexOf('=--JSON-DATE--=')) {                                                 // 20
          v = v.replace('=--JSON-DATE--=', '');                                                                        // 21
          obj[key][i] = new Date(parseInt(v));                                                                         // 22
        }                                                                                                              // 23
      }                                                                                                                // 24
    }                                                                                                                  // 25
  }                                                                                                                    // 26
                                                                                                                       //
  return obj;                                                                                                          // 27
}; /*                                                                                                                  // 28
    * @const {Function} fixJSONStringify - Fix issue with Date stringify                                               //
    */                                                                                                                 //
                                                                                                                       //
var fixJSONStringify = function (obj) {                                                                                // 33
  for (var key in meteorBabelHelpers.sanitizeForInObject(obj)) {                                                       // 34
    if (_.isDate(obj[key])) {                                                                                          // 35
      obj[key] = "=--JSON-DATE--=" + +obj[key];                                                                        // 36
    } else if (_.isObject(obj[key])) {                                                                                 // 37
      obj[key] = fixJSONStringify(obj[key]);                                                                           // 38
    } else if (_.isArray(obj[key])) {                                                                                  // 39
      var v = void 0;                                                                                                  // 40
                                                                                                                       //
      for (var i = 0; i < obj[key].length; i++) {                                                                      // 41
        v = obj[key][i];                                                                                               // 42
                                                                                                                       //
        if (_.isObject(v)) {                                                                                           // 43
          obj[key][i] = fixJSONStringify(v);                                                                           // 44
        } else if (_.isDate(v)) {                                                                                      // 45
          obj[key][i] = "=--JSON-DATE--=" + +v;                                                                        // 46
        }                                                                                                              // 47
      }                                                                                                                // 48
    }                                                                                                                  // 49
  }                                                                                                                    // 50
                                                                                                                       //
  return obj;                                                                                                          // 51
}; /*                                                                                                                  // 52
    * @locus Anywhere                                                                                                  //
    * @private                                                                                                         //
    * @name formatFleURL                                                                                               //
    * @param {Object} fileRef - File reference object                                                                  //
    * @param {String} version - [Optional] Version of file you would like build URL for                                //
    * @summary Returns formatted URL for file                                                                          //
    * @returns {String} Downloadable link                                                                              //
    */                                                                                                                 //
                                                                                                                       //
var formatFleURL = function (fileRef) {                                                                                // 63
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';                        // 63
  var ext = void 0;                                                                                                    // 64
  check(fileRef, Object);                                                                                              // 65
  check(version, String);                                                                                              // 66
                                                                                                                       //
  var _root = __meteor_runtime_config__.ROOT_URL.replace(/\/+$/, '');                                                  // 68
                                                                                                                       //
  var vRef = fileRef.versions && fileRef.versions[version] || fileRef;                                                 // 69
                                                                                                                       //
  if (vRef.extension && _.isString(vRef, 'extension')) {                                                               // 71
    ext = "." + vRef.extension.replace(/^\./, '');                                                                     // 72
  } else {                                                                                                             // 73
    ext = '';                                                                                                          // 74
  }                                                                                                                    // 75
                                                                                                                       //
  if (fileRef.public === true) {                                                                                       // 77
    return _root + (version === 'original' ? fileRef._downloadRoute + "/" + fileRef._id + ext : fileRef._downloadRoute + "/" + version + "-" + fileRef._id + ext);
  }                                                                                                                    // 79
                                                                                                                       //
  return _root + (fileRef._downloadRoute + "/" + fileRef._collectionName + "/" + fileRef._id + "/" + version + "/" + fileRef._id + ext);
};                                                                                                                     // 81
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"upload.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/upload.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
module.export({                                                                                                        // 1
  UploadInstance: function () {                                                                                        // 1
    return UploadInstance;                                                                                             // 1
  },                                                                                                                   // 1
  FileUpload: function () {                                                                                            // 1
    return FileUpload;                                                                                                 // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var HTTP = void 0;                                                                                                     // 1
module.watch(require("meteor/http"), {                                                                                 // 1
  HTTP: function (v) {                                                                                                 // 1
    HTTP = v;                                                                                                          // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
var Random = void 0;                                                                                                   // 1
module.watch(require("meteor/random"), {                                                                               // 1
  Random: function (v) {                                                                                               // 1
    Random = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
var Tracker = void 0;                                                                                                  // 1
module.watch(require("meteor/tracker"), {                                                                              // 1
  Tracker: function (v) {                                                                                              // 1
    Tracker = v;                                                                                                       // 1
  }                                                                                                                    // 1
}, 4);                                                                                                                 // 1
var ReactiveVar = void 0;                                                                                              // 1
module.watch(require("meteor/reactive-var"), {                                                                         // 1
  ReactiveVar: function (v) {                                                                                          // 1
    ReactiveVar = v;                                                                                                   // 1
  }                                                                                                                    // 1
}, 5);                                                                                                                 // 1
var EventEmitter = void 0;                                                                                             // 1
module.watch(require("eventemitter3"), {                                                                               // 1
  EventEmitter: function (v) {                                                                                         // 1
    EventEmitter = v;                                                                                                  // 1
  }                                                                                                                    // 1
}, 6);                                                                                                                 // 1
var check = void 0,                                                                                                    // 1
    Match = void 0;                                                                                                    // 1
module.watch(require("meteor/check"), {                                                                                // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  },                                                                                                                   // 1
  Match: function (v) {                                                                                                // 1
    Match = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 7);                                                                                                                 // 1
var fixJSONParse = void 0,                                                                                             // 1
    fixJSONStringify = void 0;                                                                                         // 1
module.watch(require("./lib.js"), {                                                                                    // 1
  fixJSONParse: function (v) {                                                                                         // 1
    fixJSONParse = v;                                                                                                  // 1
  },                                                                                                                   // 1
  fixJSONStringify: function (v) {                                                                                     // 1
    fixJSONStringify = v;                                                                                              // 1
  }                                                                                                                    // 1
}, 8);                                                                                                                 // 1
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); /*                                          // 11
                                                                            * @locus Client                            //
                                                                            * @name UploadInstance                     //
                                                                            * @class UploadInstance                    //
                                                                            * @summary Internal Class, used for file upload
                                                                            */                                         //
                                                                                                                       //
var UploadInstance = function (_EventEmitter) {                                                                        //
  (0, _inherits3.default)(UploadInstance, _EventEmitter);                                                              //
                                                                                                                       //
  function UploadInstance(config, collection) {                                                                        // 20
    (0, _classCallCheck3.default)(this, UploadInstance);                                                               // 20
                                                                                                                       //
    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));                              // 20
                                                                                                                       //
    _this.config = config;                                                                                             // 22
    _this.collection = collection;                                                                                     // 23
                                                                                                                       //
    _this.collection._debug('[FilesCollection] [insert()]');                                                           // 24
                                                                                                                       //
    if (!_this.config.ddp) {                                                                                           // 26
      _this.config.ddp = _this.collection.ddp;                                                                         // 27
    }                                                                                                                  // 28
                                                                                                                       //
    if (!_this.config.meta) {                                                                                          // 30
      _this.config.meta = {};                                                                                          // 31
    }                                                                                                                  // 32
                                                                                                                       //
    if (!_this.config.streams) {                                                                                       // 34
      _this.config.streams = 2;                                                                                        // 35
    }                                                                                                                  // 36
                                                                                                                       //
    if (_this.config.streams < 1) {                                                                                    // 38
      _this.config.streams = 2;                                                                                        // 39
    }                                                                                                                  // 40
                                                                                                                       //
    if (!_.isString(_this.config.transport)) {                                                                         // 42
      _this.config.transport = 'ddp';                                                                                  // 43
    }                                                                                                                  // 44
                                                                                                                       //
    _this.config.transport = _this.config.transport.toLowerCase();                                                     // 46
                                                                                                                       //
    if (_this.config.transport !== 'ddp' && _this.config.transport !== 'http') {                                       // 48
      _this.config.transport = 'ddp';                                                                                  // 49
    }                                                                                                                  // 50
                                                                                                                       //
    if (!_this.config.chunkSize) {                                                                                     // 52
      _this.config.chunkSize = _this.collection.chunkSize;                                                             // 53
    }                                                                                                                  // 54
                                                                                                                       //
    if (!_.isBoolean(_this.config.allowWebWorkers)) {                                                                  // 56
      _this.config.allowWebWorkers = true;                                                                             // 57
    }                                                                                                                  // 58
                                                                                                                       //
    check(_this.config, {                                                                                              // 60
      ddp: Match.Any,                                                                                                  // 61
      file: Match.Any,                                                                                                 // 62
      meta: Match.Optional(Object),                                                                                    // 63
      type: Match.Optional(String),                                                                                    // 64
      onError: Match.Optional(Function),                                                                               // 65
      onAbort: Match.Optional(Function),                                                                               // 66
      streams: Match.OneOf('dynamic', Number),                                                                         // 67
      onStart: Match.Optional(Function),                                                                               // 68
      fileName: Match.Optional(String),                                                                                // 69
      isBase64: Match.Optional(Boolean),                                                                               // 70
      transport: Match.OneOf('http', 'ddp'),                                                                           // 71
      chunkSize: Match.OneOf('dynamic', Number),                                                                       // 72
      onUploaded: Match.Optional(Function),                                                                            // 73
      onProgress: Match.Optional(Function),                                                                            // 74
      onBeforeUpload: Match.Optional(Function),                                                                        // 75
      allowWebWorkers: Boolean                                                                                         // 76
    });                                                                                                                // 60
                                                                                                                       //
    if (_this.config.isBase64 === true) {                                                                              // 79
      check(_this.config.file, String);                                                                                // 80
                                                                                                                       //
      if (!_this.config.fileName) {                                                                                    // 82
        throw new Meteor.Error(400, '"fileName" must me specified for base64 upload!');                                // 83
      }                                                                                                                // 84
                                                                                                                       //
      if (!!~_this.config.file.indexOf('data:')) {                                                                     // 86
        _this.config.file = _this.config.file.replace('data:', '');                                                    // 87
      }                                                                                                                // 88
                                                                                                                       //
      if (!!~_this.config.file.indexOf(',')) {                                                                         // 90
        var _file = _this.config.file.split(',');                                                                      // 91
                                                                                                                       //
        _this.fileData = {                                                                                             // 92
          size: Math.floor(_file[1].replace(/\=/g, '').length / 4 * 3),                                                // 93
          type: _file[0].split(';')[0],                                                                                // 94
          name: _this.config.fileName,                                                                                 // 95
          meta: _this.config.meta                                                                                      // 96
        };                                                                                                             // 92
        _this.config.file = _file[1];                                                                                  // 98
      } else if (!_this.config.type) {                                                                                 // 99
        throw new Meteor.Error(400, '"type" must me specified for base64 upload! And represent mime-type of the file');
      } else {                                                                                                         // 101
        _this.fileData = {                                                                                             // 102
          size: Math.floor(_this.config.file.replace(/\=/g, '').length / 4 * 3),                                       // 103
          type: _this.config.type,                                                                                     // 104
          name: _this.config.fileName,                                                                                 // 105
          meta: _this.config.meta                                                                                      // 106
        };                                                                                                             // 102
      }                                                                                                                // 108
    }                                                                                                                  // 109
                                                                                                                       //
    if (_this.config.file) {                                                                                           // 111
      if (!_this.config.isBase64) {                                                                                    // 112
        try {                                                                                                          // 113
          if (!_this.config.file.name || !_this.config.file.size) {                                                    // 114
            throw new Meteor.Error(500, 'Not a File!');                                                                // 115
          }                                                                                                            // 116
        } catch (e) {                                                                                                  // 117
          throw new Meteor.Error(500, '[FilesCollection] [insert] Insert method accepts File, not a FileList. You need to provide a real File. File must have `.name` property, and its size must be larger than zero.');
        }                                                                                                              // 119
                                                                                                                       //
        _this.fileData = {                                                                                             // 121
          size: _this.config.file.size,                                                                                // 122
          type: _this.config.type || _this.config.file.type,                                                           // 123
          name: _this.config.fileName || _this.config.file.name,                                                       // 124
          meta: _this.config.meta                                                                                      // 125
        };                                                                                                             // 121
      }                                                                                                                // 127
                                                                                                                       //
      if (_this.collection.debug) {                                                                                    // 129
        console.time("insert " + _this.fileData.name);                                                                 // 130
        console.time("loadFile " + _this.fileData.name);                                                               // 131
      }                                                                                                                // 132
                                                                                                                       //
      if (_this.collection._supportWebWorker && _this.config.allowWebWorkers) {                                        // 134
        try {                                                                                                          // 135
          _this.worker = new Worker(_this.collection._webWorkerUrl);                                                   // 136
        } catch (wwError) {                                                                                            // 137
          _this.worker = false;                                                                                        // 138
                                                                                                                       //
          _this.collection._debug('[FilesCollection] [insert] [create WebWorker]: Can\'t create WebWorker, fallback to MainThread', wwError);
        }                                                                                                              // 140
      } else {                                                                                                         // 141
        _this.worker = null;                                                                                           // 142
      }                                                                                                                // 143
                                                                                                                       //
      _this.startTime = {};                                                                                            // 145
      _this.config.debug = _this.collection.debug;                                                                     // 146
      _this.config._debug = _this.collection._debug;                                                                   // 147
      _this.currentChunk = 0;                                                                                          // 148
      _this.transferTime = 0;                                                                                          // 149
      _this.trackerComp = null;                                                                                        // 150
      _this.sentChunks = 0;                                                                                            // 151
      _this.fileLength = 1;                                                                                            // 152
      _this.EOFsent = false;                                                                                           // 153
      _this.fileId = Random.id();                                                                                      // 154
      _this.FSName = _this.collection.namingFunction ? _this.collection.namingFunction(_this.fileData) : _this.fileId;
      _this.pipes = [];                                                                                                // 156
      _this.fileData = _.extend(_this.fileData, _this.collection._getExt(_this.fileData.name), {                       // 158
        mime: _this.collection._getMimeType(_this.fileData)                                                            // 158
      });                                                                                                              // 158
      _this.fileData['mime-type'] = _this.fileData.mime;                                                               // 159
      _this.result = new FileUpload(_.extend(_this.config, {                                                           // 161
        fileData: _this.fileData,                                                                                      // 162
        fileId: _this.fileId,                                                                                          // 163
        _Abort: _this.collection._methodNames._Abort                                                                   // 164
      }));                                                                                                             // 161
                                                                                                                       //
      _this.beforeunload = function (e) {                                                                              // 167
        var message = _.isFunction(_this.collection.onbeforeunloadMessage) ? _this.collection.onbeforeunloadMessage.call(_this.result, _this.fileData) : _this.collection.onbeforeunloadMessage;
                                                                                                                       //
        if (e) {                                                                                                       // 170
          e.returnValue = message;                                                                                     // 171
        }                                                                                                              // 172
                                                                                                                       //
        return message;                                                                                                // 173
      };                                                                                                               // 174
                                                                                                                       //
      _this.result.config.beforeunload = _this.beforeunload;                                                           // 176
      window.addEventListener('beforeunload', _this.beforeunload, false);                                              // 177
                                                                                                                       //
      _this.result.config._onEnd = function () {                                                                       // 179
        return _this.emit('_onEnd');                                                                                   // 179
      };                                                                                                               // 179
                                                                                                                       //
      _this.addListener('end', _this.end);                                                                             // 181
                                                                                                                       //
      _this.addListener('start', _this.start);                                                                         // 182
                                                                                                                       //
      _this.addListener('upload', _this.upload);                                                                       // 183
                                                                                                                       //
      _this.addListener('sendEOF', _this.sendEOF);                                                                     // 184
                                                                                                                       //
      _this.addListener('prepare', _this.prepare);                                                                     // 185
                                                                                                                       //
      _this.addListener('sendChunk', _this.sendChunk);                                                                 // 186
                                                                                                                       //
      _this.addListener('proceedChunk', _this.proceedChunk);                                                           // 187
                                                                                                                       //
      _this.addListener('createStreams', _this.createStreams);                                                         // 188
                                                                                                                       //
      _this.addListener('calculateStats', _.throttle(function () {                                                     // 190
        var _t = _this.transferTime / _this.sentChunks / _this.config.streams;                                         // 191
                                                                                                                       //
        _this.result.estimateTime.set(_t * (_this.fileLength - _this.sentChunks));                                     // 192
                                                                                                                       //
        _this.result.estimateSpeed.set(_this.config.chunkSize / (_t / 1000));                                          // 193
                                                                                                                       //
        var progress = Math.round(_this.sentChunks / _this.fileLength * 100);                                          // 195
                                                                                                                       //
        _this.result.progress.set(progress);                                                                           // 196
                                                                                                                       //
        _this.config.onProgress && _this.config.onProgress.call(_this.result, progress, _this.fileData);               // 197
                                                                                                                       //
        _this.result.emit('progress', progress, _this.fileData);                                                       // 198
      }, 250));                                                                                                        // 199
                                                                                                                       //
      _this.addListener('_onEnd', function () {                                                                        // 201
        if (_this.result.estimateTimer) {                                                                              // 202
          Meteor.clearInterval(_this.result.estimateTimer);                                                            // 203
        }                                                                                                              // 204
                                                                                                                       //
        if (_this.worker) {                                                                                            // 205
          _this.worker.terminate();                                                                                    // 206
        }                                                                                                              // 207
                                                                                                                       //
        if (_this.trackerComp) {                                                                                       // 208
          _this.trackerComp.stop();                                                                                    // 209
        }                                                                                                              // 210
                                                                                                                       //
        if (_this.beforeunload) {                                                                                      // 211
          window.removeEventListener('beforeunload', _this.beforeunload, false);                                       // 212
        }                                                                                                              // 213
                                                                                                                       //
        if (_this.result) {                                                                                            // 214
          return _this.result.progress.set(0);                                                                         // 215
        }                                                                                                              // 216
                                                                                                                       //
        return void 0;                                                                                                 // 217
      });                                                                                                              // 218
    } else {                                                                                                           // 219
      throw new Meteor.Error(500, '[FilesCollection] [insert] Have you forget to pass a File itself?');                // 220
    }                                                                                                                  // 221
                                                                                                                       //
    return _this;                                                                                                      // 20
  }                                                                                                                    // 222
                                                                                                                       //
  UploadInstance.prototype.end = function () {                                                                         //
    function end(error, data) {                                                                                        //
      this.collection._debug('[FilesCollection] [UploadInstance] [end]', this.fileData.name);                          // 225
                                                                                                                       //
      if (this.collection.debug) {                                                                                     // 226
        console.timeEnd("insert " + this.fileData.name);                                                               // 227
      }                                                                                                                // 228
                                                                                                                       //
      this.emit('_onEnd');                                                                                             // 230
      this.result.emit('uploaded', error, data);                                                                       // 231
      this.config.onUploaded && this.config.onUploaded.call(this.result, error, data);                                 // 232
                                                                                                                       //
      if (error) {                                                                                                     // 234
        this.collection._debug('[FilesCollection] [insert] [end] Error:', error);                                      // 235
                                                                                                                       //
        this.result.abort();                                                                                           // 236
        this.result.state.set('aborted');                                                                              // 237
        this.result.emit('error', error, this.fileData);                                                               // 238
        this.config.onError && this.config.onError.call(this.result, error, this.fileData);                            // 239
      } else {                                                                                                         // 240
        this.result.state.set('completed');                                                                            // 241
        this.collection.emit('afterUpload', data);                                                                     // 242
      }                                                                                                                // 243
                                                                                                                       //
      this.result.emit('end', error, data || this.fileData);                                                           // 244
      return this.result;                                                                                              // 245
    }                                                                                                                  // 246
                                                                                                                       //
    return end;                                                                                                        //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.sendChunk = function () {                                                                   //
    function sendChunk(evt) {                                                                                          //
      var _this2 = this;                                                                                               // 248
                                                                                                                       //
      var opts = {                                                                                                     // 249
        fileId: this.fileId,                                                                                           // 250
        binData: evt.data.bin,                                                                                         // 251
        chunkId: evt.data.chunkId                                                                                      // 252
      };                                                                                                               // 249
                                                                                                                       //
      if (this.config.isBase64) {                                                                                      // 255
        var pad = opts.binData.length % 4;                                                                             // 256
                                                                                                                       //
        if (pad) {                                                                                                     // 257
          var p = 0;                                                                                                   // 258
                                                                                                                       //
          while (p < pad) {                                                                                            // 259
            opts.binData += '=';                                                                                       // 260
            p++;                                                                                                       // 261
          }                                                                                                            // 262
        }                                                                                                              // 263
      }                                                                                                                // 264
                                                                                                                       //
      this.emit('data', evt.data.bin);                                                                                 // 266
                                                                                                                       //
      if (this.pipes.length) {                                                                                         // 267
        for (var i = this.pipes.length - 1; i >= 0; i--) {                                                             // 268
          opts.binData = this.pipes[i](opts.binData);                                                                  // 269
        }                                                                                                              // 270
      }                                                                                                                // 271
                                                                                                                       //
      if (this.fileLength === evt.data.chunkId) {                                                                      // 273
        if (this.collection.debug) {                                                                                   // 274
          console.timeEnd("loadFile " + this.fileData.name);                                                           // 275
        }                                                                                                              // 276
                                                                                                                       //
        this.emit('readEnd');                                                                                          // 277
      }                                                                                                                // 278
                                                                                                                       //
      if (opts.binData) {                                                                                              // 280
        if (this.config.transport === 'ddp') {                                                                         // 281
          this.config.ddp.call(this.collection._methodNames._Write, opts, function (error) {                           // 282
            _this2.transferTime += +new Date() - _this2.startTime[opts.chunkId];                                       // 283
                                                                                                                       //
            if (error) {                                                                                               // 284
              if (_this2.result.state.get() !== 'aborted') {                                                           // 285
                _this2.emit('end', error);                                                                             // 286
              }                                                                                                        // 287
            } else {                                                                                                   // 288
              ++_this2.sentChunks;                                                                                     // 289
                                                                                                                       //
              if (_this2.sentChunks >= _this2.fileLength) {                                                            // 290
                _this2.emit('sendEOF');                                                                                // 291
              } else if (_this2.currentChunk < _this2.fileLength) {                                                    // 292
                _this2.emit('upload');                                                                                 // 293
              }                                                                                                        // 294
                                                                                                                       //
              _this2.emit('calculateStats');                                                                           // 295
            }                                                                                                          // 296
          });                                                                                                          // 297
        } else {                                                                                                       // 298
          HTTP.call('POST', this.collection.downloadRoute + "/" + this.collection.collectionName + "/__upload", {      // 299
            content: opts.binData,                                                                                     // 300
            headers: {                                                                                                 // 301
              'x-mtok': (_.isObject(Meteor.connection) ? Meteor.connection._lastSessionId : undefined) || null,        // 302
              'x-fileid': opts.fileId,                                                                                 // 303
              'x-chunkid': opts.chunkId,                                                                               // 304
              'content-type': 'text/plain'                                                                             // 305
            }                                                                                                          // 301
          }, function (error) {                                                                                        // 299
            _this2.transferTime += +new Date() - _this2.startTime[opts.chunkId];                                       // 308
                                                                                                                       //
            if (error) {                                                                                               // 309
              if ("" + error === 'Error: network') {                                                                   // 310
                _this2.result.pause();                                                                                 // 311
              } else {                                                                                                 // 312
                if (_this2.result.state.get() !== 'aborted') {                                                         // 313
                  _this2.emit('end', error);                                                                           // 314
                }                                                                                                      // 315
              }                                                                                                        // 316
            } else {                                                                                                   // 317
              ++_this2.sentChunks;                                                                                     // 318
                                                                                                                       //
              if (_this2.sentChunks >= _this2.fileLength) {                                                            // 319
                _this2.emit('sendEOF');                                                                                // 320
              } else if (_this2.currentChunk < _this2.fileLength) {                                                    // 321
                _this2.emit('upload');                                                                                 // 322
              }                                                                                                        // 323
                                                                                                                       //
              _this2.emit('calculateStats');                                                                           // 324
            }                                                                                                          // 325
          });                                                                                                          // 326
        }                                                                                                              // 327
      }                                                                                                                // 328
    }                                                                                                                  // 329
                                                                                                                       //
    return sendChunk;                                                                                                  //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.sendEOF = function () {                                                                     //
    function sendEOF() {                                                                                               //
      var _this3 = this;                                                                                               // 331
                                                                                                                       //
      this.collection._debug('[FilesCollection] [UploadInstance] [sendEOF]', this.EOFsent);                            // 332
                                                                                                                       //
      if (!this.EOFsent) {                                                                                             // 333
        this.EOFsent = true;                                                                                           // 334
        var opts = {                                                                                                   // 335
          eof: true,                                                                                                   // 336
          fileId: this.fileId                                                                                          // 337
        };                                                                                                             // 335
                                                                                                                       //
        if (this.config.transport === 'ddp') {                                                                         // 340
          this.config.ddp.call(this.collection._methodNames._Write, opts, function (error, result) {                   // 341
            _this3.emit('end', error, result);                                                                         // 342
          });                                                                                                          // 343
        } else {                                                                                                       // 344
          HTTP.call('POST', this.collection.downloadRoute + "/" + this.collection.collectionName + "/__upload", {      // 345
            content: '',                                                                                               // 346
            headers: {                                                                                                 // 347
              'x-eof': '1',                                                                                            // 348
              'x-mtok': (_.isObject(Meteor.connection) ? Meteor.connection._lastSessionId : undefined) || null,        // 349
              'x-fileId': opts.fileId,                                                                                 // 350
              'content-type': 'text/plain'                                                                             // 351
            }                                                                                                          // 347
          }, function (error, _result) {                                                                               // 345
            var result = void 0;                                                                                       // 354
                                                                                                                       //
            try {                                                                                                      // 355
              result = JSON.parse((_.isObject(_result) ? _result.content : undefined) || {});                          // 356
            } catch (e) {                                                                                              // 357
              console.warn('Something went wrong! [sendEOF] method doesn\'t returned JSON! Looks like you\'re on Cordova app or behind proxy, switching to DDP transport is recommended.');
              result = {};                                                                                             // 359
            }                                                                                                          // 360
                                                                                                                       //
            if (result.meta) {                                                                                         // 362
              result.meta = fixJSONParse(result.meta);                                                                 // 363
            }                                                                                                          // 364
                                                                                                                       //
            _this3.emit('end', error, result);                                                                         // 366
          });                                                                                                          // 367
        }                                                                                                              // 368
      }                                                                                                                // 369
    }                                                                                                                  // 370
                                                                                                                       //
    return sendEOF;                                                                                                    //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.proceedChunk = function () {                                                                //
    function proceedChunk(chunkId) {                                                                                   //
      var _this4 = this;                                                                                               // 372
                                                                                                                       //
      var chunk = this.config.file.slice(this.config.chunkSize * (chunkId - 1), this.config.chunkSize * chunkId);      // 373
                                                                                                                       //
      if (this.config.isBase64) {                                                                                      // 375
        this.emit('sendChunk', {                                                                                       // 376
          data: {                                                                                                      // 377
            bin: chunk,                                                                                                // 378
            chunkId: chunkId                                                                                           // 379
          }                                                                                                            // 377
        });                                                                                                            // 376
      } else {                                                                                                         // 382
        var fileReader = void 0;                                                                                       // 383
                                                                                                                       //
        if (FileReader) {                                                                                              // 384
          fileReader = new FileReader();                                                                               // 385
                                                                                                                       //
          fileReader.onloadend = function (evt) {                                                                      // 387
            _this4.emit('sendChunk', {                                                                                 // 388
              data: {                                                                                                  // 389
                bin: ((_.isObject(fileReader) ? fileReader.result : undefined) || (evt.srcElement ? evt.srcElement.result : undefined) || (evt.target ? evt.target.result : undefined)).split(',')[1],
                chunkId: chunkId                                                                                       // 391
              }                                                                                                        // 389
            });                                                                                                        // 388
          };                                                                                                           // 394
                                                                                                                       //
          fileReader.onerror = function (e) {                                                                          // 396
            _this4.emit('end', (e.target || e.srcElement).error);                                                      // 397
          };                                                                                                           // 398
                                                                                                                       //
          fileReader.readAsDataURL(chunk);                                                                             // 400
        } else if (FileReaderSync) {                                                                                   // 401
          fileReader = new FileReaderSync();                                                                           // 402
          this.emit('sendChunk', {                                                                                     // 404
            data: {                                                                                                    // 405
              bin: fileReader.readAsDataURL(chunk).split(',')[1],                                                      // 406
              chunkId: chunkId                                                                                         // 407
            }                                                                                                          // 405
          });                                                                                                          // 404
        } else {                                                                                                       // 410
          this.emit('end', 'File API is not supported in this Browser!');                                              // 411
        }                                                                                                              // 412
      }                                                                                                                // 413
    }                                                                                                                  // 414
                                                                                                                       //
    return proceedChunk;                                                                                               //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.upload = function () {                                                                      //
    function upload() {                                                                                                //
      if (this.result.onPause.get()) {                                                                                 // 417
        return this;                                                                                                   // 418
      }                                                                                                                // 419
                                                                                                                       //
      if (this.result.state.get() === 'aborted') {                                                                     // 421
        return this;                                                                                                   // 422
      }                                                                                                                // 423
                                                                                                                       //
      if (this.currentChunk <= this.fileLength) {                                                                      // 425
        ++this.currentChunk;                                                                                           // 426
                                                                                                                       //
        if (this.worker) {                                                                                             // 427
          this.worker.postMessage({                                                                                    // 428
            f: this.config.file,                                                                                       // 429
            sc: this.sentChunks,                                                                                       // 430
            cc: this.currentChunk,                                                                                     // 431
            cs: this.config.chunkSize,                                                                                 // 432
            ib: this.config.isBase64                                                                                   // 433
          });                                                                                                          // 428
        } else {                                                                                                       // 435
          this.emit('proceedChunk', this.currentChunk);                                                                // 436
        }                                                                                                              // 437
      } else {                                                                                                         // 438
        this.emit('sendEOF');                                                                                          // 439
      }                                                                                                                // 440
                                                                                                                       //
      this.startTime[this.currentChunk] = +new Date();                                                                 // 441
      return this;                                                                                                     // 442
    }                                                                                                                  // 443
                                                                                                                       //
    return upload;                                                                                                     //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.createStreams = function () {                                                               //
    function createStreams() {                                                                                         //
      this.collection._debug('[FilesCollection] [UploadInstance] [createStreams]');                                    // 446
                                                                                                                       //
      var i = 1;                                                                                                       // 447
                                                                                                                       //
      while (i <= this.config.streams) {                                                                               // 448
        this.emit('upload');                                                                                           // 449
        i++;                                                                                                           // 450
      }                                                                                                                // 451
    }                                                                                                                  // 452
                                                                                                                       //
    return createStreams;                                                                                              //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.prepare = function () {                                                                     //
    function prepare() {                                                                                               //
      var _this5 = this;                                                                                               // 454
                                                                                                                       //
      var _len = void 0;                                                                                               // 455
                                                                                                                       //
      this.config.onStart && this.config.onStart.call(this.result, null, this.fileData);                               // 457
      this.result.emit('start', null, this.fileData);                                                                  // 458
                                                                                                                       //
      if (this.config.chunkSize === 'dynamic') {                                                                       // 460
        this.config.chunkSize = this.fileData.size / 1000;                                                             // 461
                                                                                                                       //
        if (this.config.chunkSize < 327680) {                                                                          // 462
          this.config.chunkSize = 327680;                                                                              // 463
        } else if (this.config.chunkSize > 1048576) {                                                                  // 464
          this.config.chunkSize = 1048576;                                                                             // 465
        }                                                                                                              // 466
                                                                                                                       //
        if (this.config.transport === 'http') {                                                                        // 468
          this.config.chunkSize = Math.round(this.config.chunkSize / 2);                                               // 469
        } else if (isSafari) {                                                                                         // 470
          this.config.chunkSize = Math.ceil(this.config.chunkSize / 8);                                                // 471
        }                                                                                                              // 472
      }                                                                                                                // 473
                                                                                                                       //
      if (this.config.isBase64) {                                                                                      // 475
        this.config.chunkSize = Math.floor(this.config.chunkSize / 4) * 4;                                             // 476
        _len = Math.ceil(this.config.file.length / this.config.chunkSize);                                             // 477
      } else {                                                                                                         // 478
        this.config.chunkSize = Math.floor(this.config.chunkSize / 8) * 8;                                             // 479
        _len = Math.ceil(this.fileData.size / this.config.chunkSize);                                                  // 480
      }                                                                                                                // 481
                                                                                                                       //
      if (this.config.streams === 'dynamic') {                                                                         // 483
        this.config.streams = _.clone(_len);                                                                           // 484
                                                                                                                       //
        if (this.config.streams > 24) {                                                                                // 485
          this.config.streams = 24;                                                                                    // 485
        }                                                                                                              // 485
                                                                                                                       //
        if (this.config.transport === 'http') {                                                                        // 487
          this.config.streams = Math.round(this.config.streams / 2);                                                   // 488
        } else if (isSafari) {                                                                                         // 489
          this.config.streams = 1;                                                                                     // 490
        }                                                                                                              // 491
      }                                                                                                                // 492
                                                                                                                       //
      this.fileLength = _len <= 0 ? 1 : _len;                                                                          // 494
                                                                                                                       //
      if (this.config.streams > this.fileLength) {                                                                     // 495
        this.config.streams = this.fileLength;                                                                         // 496
      }                                                                                                                // 497
                                                                                                                       //
      this.result.config.fileLength = this.fileLength;                                                                 // 498
      var opts = {                                                                                                     // 500
        file: this.fileData,                                                                                           // 501
        fileId: this.fileId,                                                                                           // 502
        chunkSize: this.config.isBase64 ? this.config.chunkSize / 4 * 3 : this.config.chunkSize,                       // 503
        fileLength: this.fileLength                                                                                    // 504
      };                                                                                                               // 500
                                                                                                                       //
      if (this.FSName !== this.fileId) {                                                                               // 507
        opts.FSName = this.FSName;                                                                                     // 508
      }                                                                                                                // 509
                                                                                                                       //
      var handleStart = function (error) {                                                                             // 511
        if (error) {                                                                                                   // 512
          _this5.collection._debug('[FilesCollection] [_Start] Error:', error);                                        // 513
                                                                                                                       //
          _this5.emit('end', error);                                                                                   // 514
        } else {                                                                                                       // 515
          _this5.result.continueFunc = function () {                                                                   // 516
            _this5.collection._debug('[FilesCollection] [insert] [continueFunc]');                                     // 517
                                                                                                                       //
            _this5.emit('createStreams');                                                                              // 518
          };                                                                                                           // 519
                                                                                                                       //
          _this5.emit('createStreams');                                                                                // 520
        }                                                                                                              // 521
      };                                                                                                               // 522
                                                                                                                       //
      if (this.config.transport === 'ddp') {                                                                           // 524
        this.config.ddp.call(this.collection._methodNames._Start, opts, handleStart);                                  // 525
      } else {                                                                                                         // 526
        if (_.isObject(opts.file) ? opts.file.meta : undefined) {                                                      // 527
          opts.file.meta = fixJSONStringify(opts.file.meta);                                                           // 528
        }                                                                                                              // 529
                                                                                                                       //
        HTTP.call('POST', this.collection.downloadRoute + "/" + this.collection.collectionName + "/__upload", {        // 531
          data: opts,                                                                                                  // 532
          headers: {                                                                                                   // 533
            'x-start': '1',                                                                                            // 534
            'x-mtok': (_.isObject(Meteor.connection) ? Meteor.connection._lastSessionId : undefined) || null           // 535
          }                                                                                                            // 533
        }, handleStart);                                                                                               // 531
      }                                                                                                                // 538
    }                                                                                                                  // 539
                                                                                                                       //
    return prepare;                                                                                                    //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.pipe = function () {                                                                        //
    function pipe(func) {                                                                                              //
      this.pipes.push(func);                                                                                           // 542
      return this;                                                                                                     // 543
    }                                                                                                                  // 544
                                                                                                                       //
    return pipe;                                                                                                       //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.start = function () {                                                                       //
    function start() {                                                                                                 //
      var _this6 = this;                                                                                               // 546
                                                                                                                       //
      var isUploadAllowed = void 0;                                                                                    // 547
                                                                                                                       //
      if (this.fileData.size <= 0) {                                                                                   // 548
        this.end(new Meteor.Error(400, 'Can\'t upload empty file'));                                                   // 549
        return this.result;                                                                                            // 550
      }                                                                                                                // 551
                                                                                                                       //
      if (this.config.onBeforeUpload && _.isFunction(this.config.onBeforeUpload)) {                                    // 553
        isUploadAllowed = this.config.onBeforeUpload.call(_.extend(this.result, this.collection._getUser()), this.fileData);
                                                                                                                       //
        if (isUploadAllowed !== true) {                                                                                // 555
          return this.end(new Meteor.Error(403, _.isString(isUploadAllowed) ? isUploadAllowed : 'config.onBeforeUpload() returned false'));
        }                                                                                                              // 557
      }                                                                                                                // 558
                                                                                                                       //
      if (this.collection.onBeforeUpload && _.isFunction(this.collection.onBeforeUpload)) {                            // 560
        isUploadAllowed = this.collection.onBeforeUpload.call(_.extend(this.result, this.collection._getUser()), this.fileData);
                                                                                                                       //
        if (isUploadAllowed !== true) {                                                                                // 562
          return this.end(new Meteor.Error(403, _.isString(isUploadAllowed) ? isUploadAllowed : 'collection.onBeforeUpload() returned false'));
        }                                                                                                              // 564
      }                                                                                                                // 565
                                                                                                                       //
      Tracker.autorun(function (computation) {                                                                         // 567
        _this6.trackerComp = computation;                                                                              // 568
                                                                                                                       //
        if (!_this6.result.onPause.curValue && !Meteor.status().connected) {                                           // 569
          _this6.collection._debug('[FilesCollection] [insert] [Tracker] [pause]');                                    // 570
                                                                                                                       //
          _this6.result.pause();                                                                                       // 571
        }                                                                                                              // 572
      });                                                                                                              // 573
                                                                                                                       //
      if (this.worker) {                                                                                               // 575
        this.collection._debug('[FilesCollection] [insert] using WebWorkers');                                         // 576
                                                                                                                       //
        this.worker.onmessage = function (evt) {                                                                       // 577
          if (evt.data.error) {                                                                                        // 578
            _this6.collection._debug('[FilesCollection] [insert] [worker] [onmessage] [ERROR:]', evt.data.error);      // 579
                                                                                                                       //
            _this6.emit('proceedChunk', evt.data.chunkId);                                                             // 580
          } else {                                                                                                     // 581
            _this6.emit('sendChunk', evt);                                                                             // 582
          }                                                                                                            // 583
        };                                                                                                             // 584
                                                                                                                       //
        this.worker.onerror = function (e) {                                                                           // 586
          _this6.collection._debug('[FilesCollection] [insert] [worker] [onerror] [ERROR:]', e);                       // 587
                                                                                                                       //
          _this6.emit('end', e.message);                                                                               // 588
        };                                                                                                             // 589
      } else {                                                                                                         // 590
        this.collection._debug('[FilesCollection] [insert] using MainThread');                                         // 591
      }                                                                                                                // 592
                                                                                                                       //
      this.emit('prepare');                                                                                            // 594
      return this.result;                                                                                              // 595
    }                                                                                                                  // 596
                                                                                                                       //
    return start;                                                                                                      //
  }();                                                                                                                 //
                                                                                                                       //
  UploadInstance.prototype.manual = function () {                                                                      //
    function manual() {                                                                                                //
      var _this7 = this;                                                                                               // 598
                                                                                                                       //
      this.result.start = function () {                                                                                // 599
        _this7.emit('start');                                                                                          // 600
      };                                                                                                               // 601
                                                                                                                       //
      this.result.pipe = function (func) {                                                                             // 603
        self.pipe(func);                                                                                               // 604
        return this;                                                                                                   // 605
      };                                                                                                               // 606
                                                                                                                       //
      return this.result;                                                                                              // 607
    }                                                                                                                  // 608
                                                                                                                       //
    return manual;                                                                                                     //
  }();                                                                                                                 //
                                                                                                                       //
  return UploadInstance;                                                                                               //
}(EventEmitter);                                                                                                       //
                                                                                                                       //
var FileUpload = function (_EventEmitter2) {                                                                           //
  (0, _inherits3.default)(FileUpload, _EventEmitter2);                                                                 //
                                                                                                                       //
  function FileUpload(config) {                                                                                        // 618
    (0, _classCallCheck3.default)(this, FileUpload);                                                                   // 618
                                                                                                                       //
    var _this8 = (0, _possibleConstructorReturn3.default)(this, _EventEmitter2.call(this));                            // 618
                                                                                                                       //
    _this8.config = config;                                                                                            // 620
                                                                                                                       //
    _this8.config._debug('[FilesCollection] [FileUpload] [constructor]');                                              // 621
                                                                                                                       //
    if (!_this8.config.isBase64) {                                                                                     // 623
      _this8.file = _.extend(_this8.config.file, _this8.config.fileData);                                              // 624
    } else {                                                                                                           // 625
      _this8.file = _this8.config.fileData;                                                                            // 626
    }                                                                                                                  // 627
                                                                                                                       //
    _this8.state = new ReactiveVar('active');                                                                          // 628
    _this8.onPause = new ReactiveVar(false);                                                                           // 629
    _this8.progress = new ReactiveVar(0);                                                                              // 630
                                                                                                                       //
    _this8.continueFunc = function () {};                                                                              // 631
                                                                                                                       //
    _this8.estimateTime = new ReactiveVar(1000);                                                                       // 632
    _this8.estimateSpeed = new ReactiveVar(0);                                                                         // 633
    _this8.estimateTimer = Meteor.setInterval(function () {                                                            // 634
      if (_this8.state.get() === 'active') {                                                                           // 635
        var _currentTime = _this8.estimateTime.get();                                                                  // 636
                                                                                                                       //
        if (_currentTime > 1000) {                                                                                     // 637
          _this8.estimateTime.set(_currentTime - 1000);                                                                // 638
        }                                                                                                              // 639
      }                                                                                                                // 640
    }, 1000);                                                                                                          // 641
    return _this8;                                                                                                     // 618
  }                                                                                                                    // 642
                                                                                                                       //
  FileUpload.prototype.pause = function () {                                                                           //
    function pause() {                                                                                                 //
      this.config._debug('[FilesCollection] [insert] [.pause()]');                                                     // 644
                                                                                                                       //
      if (!this.onPause.get()) {                                                                                       // 645
        this.onPause.set(true);                                                                                        // 646
        this.state.set('paused');                                                                                      // 647
        this.emit('pause', this.file);                                                                                 // 648
      }                                                                                                                // 649
    }                                                                                                                  // 650
                                                                                                                       //
    return pause;                                                                                                      //
  }();                                                                                                                 //
                                                                                                                       //
  FileUpload.prototype.continue = function () {                                                                        //
    function _continue() {                                                                                             //
      this.config._debug('[FilesCollection] [insert] [.continue()]');                                                  // 652
                                                                                                                       //
      if (this.onPause.get()) {                                                                                        // 653
        this.onPause.set(false);                                                                                       // 654
        this.state.set('active');                                                                                      // 655
        this.emit('continue', this.file);                                                                              // 656
        this.continueFunc();                                                                                           // 657
      }                                                                                                                // 658
    }                                                                                                                  // 659
                                                                                                                       //
    return _continue;                                                                                                  //
  }();                                                                                                                 //
                                                                                                                       //
  FileUpload.prototype.toggle = function () {                                                                          //
    function toggle() {                                                                                                //
      this.config._debug('[FilesCollection] [insert] [.toggle()]');                                                    // 661
                                                                                                                       //
      if (this.onPause.get()) {                                                                                        // 662
        this.continue();                                                                                               // 663
      } else {                                                                                                         // 664
        this.pause();                                                                                                  // 665
      }                                                                                                                // 666
    }                                                                                                                  // 667
                                                                                                                       //
    return toggle;                                                                                                     //
  }();                                                                                                                 //
                                                                                                                       //
  FileUpload.prototype.abort = function () {                                                                           //
    function abort() {                                                                                                 //
      this.config._debug('[FilesCollection] [insert] [.abort()]');                                                     // 669
                                                                                                                       //
      window.removeEventListener('beforeunload', this.config.beforeunload, false);                                     // 670
      this.config.onAbort && this.config.onAbort.call(this, this.file);                                                // 671
      this.emit('abort', this.file);                                                                                   // 672
      this.pause();                                                                                                    // 673
                                                                                                                       //
      this.config._onEnd();                                                                                            // 674
                                                                                                                       //
      this.state.set('aborted');                                                                                       // 675
                                                                                                                       //
      if (this.config.debug) {                                                                                         // 676
        console.timeEnd("insert " + this.config.fileData.name);                                                        // 677
      }                                                                                                                // 678
                                                                                                                       //
      this.config.ddp.call(this.config._Abort, this.config.fileId);                                                    // 680
    }                                                                                                                  // 681
                                                                                                                       //
    return abort;                                                                                                      //
  }();                                                                                                                 //
                                                                                                                       //
  return FileUpload;                                                                                                   //
}(EventEmitter);                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"eventemitter3":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// ../../.1.9.4.8m7w47.4qi18++os+web.browser+web.cordova/npm/node_modules/eventemitter3/package.json                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.name = "eventemitter3";                                                                                        // 1
exports.version = "3.0.0";                                                                                             // 2
exports.main = "index.js";                                                                                             // 3
                                                                                                                       // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ostrio_files/node_modules/eventemitter3/index.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';                                                                                                          // 1
                                                                                                                       // 2
var has = Object.prototype.hasOwnProperty                                                                              // 3
  , prefix = '~';                                                                                                      // 4
                                                                                                                       // 5
/**                                                                                                                    // 6
 * Constructor to create a storage for our `EE` objects.                                                               // 7
 * An `Events` instance is a plain object whose properties are event names.                                            // 8
 *                                                                                                                     // 9
 * @constructor                                                                                                        // 10
 * @private                                                                                                            // 11
 */                                                                                                                    // 12
function Events() {}                                                                                                   // 13
                                                                                                                       // 14
//                                                                                                                     // 15
// We try to not inherit from `Object.prototype`. In some engines creating an                                          // 16
// instance in this way is faster than calling `Object.create(null)` directly.                                         // 17
// If `Object.create(null)` is not supported we prefix the event names with a                                          // 18
// character to make sure that the built-in object properties are not                                                  // 19
// overridden or used as an attack vector.                                                                             // 20
//                                                                                                                     // 21
if (Object.create) {                                                                                                   // 22
  Events.prototype = Object.create(null);                                                                              // 23
                                                                                                                       // 24
  //                                                                                                                   // 25
  // This hack is needed because the `__proto__` property is still inherited in                                        // 26
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.                                              // 27
  //                                                                                                                   // 28
  if (!new Events().__proto__) prefix = false;                                                                         // 29
}                                                                                                                      // 30
                                                                                                                       // 31
/**                                                                                                                    // 32
 * Representation of a single event listener.                                                                          // 33
 *                                                                                                                     // 34
 * @param {Function} fn The listener function.                                                                         // 35
 * @param {*} context The context to invoke the listener with.                                                         // 36
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.                                       // 37
 * @constructor                                                                                                        // 38
 * @private                                                                                                            // 39
 */                                                                                                                    // 40
function EE(fn, context, once) {                                                                                       // 41
  this.fn = fn;                                                                                                        // 42
  this.context = context;                                                                                              // 43
  this.once = once || false;                                                                                           // 44
}                                                                                                                      // 45
                                                                                                                       // 46
/**                                                                                                                    // 47
 * Add a listener for a given event.                                                                                   // 48
 *                                                                                                                     // 49
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.                                             // 50
 * @param {(String|Symbol)} event The event name.                                                                      // 51
 * @param {Function} fn The listener function.                                                                         // 52
 * @param {*} context The context to invoke the listener with.                                                         // 53
 * @param {Boolean} once Specify if the listener is a one-time listener.                                               // 54
 * @returns {EventEmitter}                                                                                             // 55
 * @private                                                                                                            // 56
 */                                                                                                                    // 57
function addListener(emitter, event, fn, context, once) {                                                              // 58
  if (typeof fn !== 'function') {                                                                                      // 59
    throw new TypeError('The listener must be a function');                                                            // 60
  }                                                                                                                    // 61
                                                                                                                       // 62
  var listener = new EE(fn, context || emitter, once)                                                                  // 63
    , evt = prefix ? prefix + event : event;                                                                           // 64
                                                                                                                       // 65
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;                                  // 66
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);                                              // 67
  else emitter._events[evt] = [emitter._events[evt], listener];                                                        // 68
                                                                                                                       // 69
  return emitter;                                                                                                      // 70
}                                                                                                                      // 71
                                                                                                                       // 72
/**                                                                                                                    // 73
 * Clear event by name.                                                                                                // 74
 *                                                                                                                     // 75
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.                                             // 76
 * @param {(String|Symbol)} evt The Event name.                                                                        // 77
 * @private                                                                                                            // 78
 */                                                                                                                    // 79
function clearEvent(emitter, evt) {                                                                                    // 80
  if (--emitter._eventsCount === 0) emitter._events = new Events();                                                    // 81
  else delete emitter._events[evt];                                                                                    // 82
}                                                                                                                      // 83
                                                                                                                       // 84
/**                                                                                                                    // 85
 * Minimal `EventEmitter` interface that is molded against the Node.js                                                 // 86
 * `EventEmitter` interface.                                                                                           // 87
 *                                                                                                                     // 88
 * @constructor                                                                                                        // 89
 * @public                                                                                                             // 90
 */                                                                                                                    // 91
function EventEmitter() {                                                                                              // 92
  this._events = new Events();                                                                                         // 93
  this._eventsCount = 0;                                                                                               // 94
}                                                                                                                      // 95
                                                                                                                       // 96
/**                                                                                                                    // 97
 * Return an array listing the events for which the emitter has registered                                             // 98
 * listeners.                                                                                                          // 99
 *                                                                                                                     // 100
 * @returns {Array}                                                                                                    // 101
 * @public                                                                                                             // 102
 */                                                                                                                    // 103
EventEmitter.prototype.eventNames = function eventNames() {                                                            // 104
  var names = []                                                                                                       // 105
    , events                                                                                                           // 106
    , name;                                                                                                            // 107
                                                                                                                       // 108
  if (this._eventsCount === 0) return names;                                                                           // 109
                                                                                                                       // 110
  for (name in (events = this._events)) {                                                                              // 111
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);                                             // 112
  }                                                                                                                    // 113
                                                                                                                       // 114
  if (Object.getOwnPropertySymbols) {                                                                                  // 115
    return names.concat(Object.getOwnPropertySymbols(events));                                                         // 116
  }                                                                                                                    // 117
                                                                                                                       // 118
  return names;                                                                                                        // 119
};                                                                                                                     // 120
                                                                                                                       // 121
/**                                                                                                                    // 122
 * Return the listeners registered for a given event.                                                                  // 123
 *                                                                                                                     // 124
 * @param {(String|Symbol)} event The event name.                                                                      // 125
 * @returns {Array} The registered listeners.                                                                          // 126
 * @public                                                                                                             // 127
 */                                                                                                                    // 128
EventEmitter.prototype.listeners = function listeners(event) {                                                         // 129
  var evt = prefix ? prefix + event : event                                                                            // 130
    , handlers = this._events[evt];                                                                                    // 131
                                                                                                                       // 132
  if (!handlers) return [];                                                                                            // 133
  if (handlers.fn) return [handlers.fn];                                                                               // 134
                                                                                                                       // 135
  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {                                                // 136
    ee[i] = handlers[i].fn;                                                                                            // 137
  }                                                                                                                    // 138
                                                                                                                       // 139
  return ee;                                                                                                           // 140
};                                                                                                                     // 141
                                                                                                                       // 142
/**                                                                                                                    // 143
 * Return the number of listeners listening to a given event.                                                          // 144
 *                                                                                                                     // 145
 * @param {(String|Symbol)} event The event name.                                                                      // 146
 * @returns {Number} The number of listeners.                                                                          // 147
 * @public                                                                                                             // 148
 */                                                                                                                    // 149
EventEmitter.prototype.listenerCount = function listenerCount(event) {                                                 // 150
  var evt = prefix ? prefix + event : event                                                                            // 151
    , listeners = this._events[evt];                                                                                   // 152
                                                                                                                       // 153
  if (!listeners) return 0;                                                                                            // 154
  if (listeners.fn) return 1;                                                                                          // 155
  return listeners.length;                                                                                             // 156
};                                                                                                                     // 157
                                                                                                                       // 158
/**                                                                                                                    // 159
 * Calls each of the listeners registered for a given event.                                                           // 160
 *                                                                                                                     // 161
 * @param {(String|Symbol)} event The event name.                                                                      // 162
 * @returns {Boolean} `true` if the event had listeners, else `false`.                                                 // 163
 * @public                                                                                                             // 164
 */                                                                                                                    // 165
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {                                               // 166
  var evt = prefix ? prefix + event : event;                                                                           // 167
                                                                                                                       // 168
  if (!this._events[evt]) return false;                                                                                // 169
                                                                                                                       // 170
  var listeners = this._events[evt]                                                                                    // 171
    , len = arguments.length                                                                                           // 172
    , args                                                                                                             // 173
    , i;                                                                                                               // 174
                                                                                                                       // 175
  if (listeners.fn) {                                                                                                  // 176
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);                                     // 177
                                                                                                                       // 178
    switch (len) {                                                                                                     // 179
      case 1: return listeners.fn.call(listeners.context), true;                                                       // 180
      case 2: return listeners.fn.call(listeners.context, a1), true;                                                   // 181
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;                                               // 182
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;                                           // 183
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;                                       // 184
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;                                   // 185
    }                                                                                                                  // 186
                                                                                                                       // 187
    for (i = 1, args = new Array(len -1); i < len; i++) {                                                              // 188
      args[i - 1] = arguments[i];                                                                                      // 189
    }                                                                                                                  // 190
                                                                                                                       // 191
    listeners.fn.apply(listeners.context, args);                                                                       // 192
  } else {                                                                                                             // 193
    var length = listeners.length                                                                                      // 194
      , j;                                                                                                             // 195
                                                                                                                       // 196
    for (i = 0; i < length; i++) {                                                                                     // 197
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);                             // 198
                                                                                                                       // 199
      switch (len) {                                                                                                   // 200
        case 1: listeners[i].fn.call(listeners[i].context); break;                                                     // 201
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;                                                 // 202
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;                                             // 203
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;                                         // 204
        default:                                                                                                       // 205
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {                                             // 206
            args[j - 1] = arguments[j];                                                                                // 207
          }                                                                                                            // 208
                                                                                                                       // 209
          listeners[i].fn.apply(listeners[i].context, args);                                                           // 210
      }                                                                                                                // 211
    }                                                                                                                  // 212
  }                                                                                                                    // 213
                                                                                                                       // 214
  return true;                                                                                                         // 215
};                                                                                                                     // 216
                                                                                                                       // 217
/**                                                                                                                    // 218
 * Add a listener for a given event.                                                                                   // 219
 *                                                                                                                     // 220
 * @param {(String|Symbol)} event The event name.                                                                      // 221
 * @param {Function} fn The listener function.                                                                         // 222
 * @param {*} [context=this] The context to invoke the listener with.                                                  // 223
 * @returns {EventEmitter} `this`.                                                                                     // 224
 * @public                                                                                                             // 225
 */                                                                                                                    // 226
EventEmitter.prototype.on = function on(event, fn, context) {                                                          // 227
  return addListener(this, event, fn, context, false);                                                                 // 228
};                                                                                                                     // 229
                                                                                                                       // 230
/**                                                                                                                    // 231
 * Add a one-time listener for a given event.                                                                          // 232
 *                                                                                                                     // 233
 * @param {(String|Symbol)} event The event name.                                                                      // 234
 * @param {Function} fn The listener function.                                                                         // 235
 * @param {*} [context=this] The context to invoke the listener with.                                                  // 236
 * @returns {EventEmitter} `this`.                                                                                     // 237
 * @public                                                                                                             // 238
 */                                                                                                                    // 239
EventEmitter.prototype.once = function once(event, fn, context) {                                                      // 240
  return addListener(this, event, fn, context, true);                                                                  // 241
};                                                                                                                     // 242
                                                                                                                       // 243
/**                                                                                                                    // 244
 * Remove the listeners of a given event.                                                                              // 245
 *                                                                                                                     // 246
 * @param {(String|Symbol)} event The event name.                                                                      // 247
 * @param {Function} fn Only remove the listeners that match this function.                                            // 248
 * @param {*} context Only remove the listeners that have this context.                                                // 249
 * @param {Boolean} once Only remove one-time listeners.                                                               // 250
 * @returns {EventEmitter} `this`.                                                                                     // 251
 * @public                                                                                                             // 252
 */                                                                                                                    // 253
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {                            // 254
  var evt = prefix ? prefix + event : event;                                                                           // 255
                                                                                                                       // 256
  if (!this._events[evt]) return this;                                                                                 // 257
  if (!fn) {                                                                                                           // 258
    clearEvent(this, evt);                                                                                             // 259
    return this;                                                                                                       // 260
  }                                                                                                                    // 261
                                                                                                                       // 262
  var listeners = this._events[evt];                                                                                   // 263
                                                                                                                       // 264
  if (listeners.fn) {                                                                                                  // 265
    if (                                                                                                               // 266
      listeners.fn === fn &&                                                                                           // 267
      (!once || listeners.once) &&                                                                                     // 268
      (!context || listeners.context === context)                                                                      // 269
    ) {                                                                                                                // 270
      clearEvent(this, evt);                                                                                           // 271
    }                                                                                                                  // 272
  } else {                                                                                                             // 273
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {                                         // 274
      if (                                                                                                             // 275
        listeners[i].fn !== fn ||                                                                                      // 276
        (once && !listeners[i].once) ||                                                                                // 277
        (context && listeners[i].context !== context)                                                                  // 278
      ) {                                                                                                              // 279
        events.push(listeners[i]);                                                                                     // 280
      }                                                                                                                // 281
    }                                                                                                                  // 282
                                                                                                                       // 283
    //                                                                                                                 // 284
    // Reset the array, or remove it completely if we have no more listeners.                                          // 285
    //                                                                                                                 // 286
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;                                   // 287
    else clearEvent(this, evt);                                                                                        // 288
  }                                                                                                                    // 289
                                                                                                                       // 290
  return this;                                                                                                         // 291
};                                                                                                                     // 292
                                                                                                                       // 293
/**                                                                                                                    // 294
 * Remove all listeners, or those of the specified event.                                                              // 295
 *                                                                                                                     // 296
 * @param {(String|Symbol)} [event] The event name.                                                                    // 297
 * @returns {EventEmitter} `this`.                                                                                     // 298
 * @public                                                                                                             // 299
 */                                                                                                                    // 300
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {                                       // 301
  var evt;                                                                                                             // 302
                                                                                                                       // 303
  if (event) {                                                                                                         // 304
    evt = prefix ? prefix + event : event;                                                                             // 305
    if (this._events[evt]) clearEvent(this, evt);                                                                      // 306
  } else {                                                                                                             // 307
    this._events = new Events();                                                                                       // 308
    this._eventsCount = 0;                                                                                             // 309
  }                                                                                                                    // 310
                                                                                                                       // 311
  return this;                                                                                                         // 312
};                                                                                                                     // 313
                                                                                                                       // 314
//                                                                                                                     // 315
// Alias methods names because people roll like that.                                                                  // 316
//                                                                                                                     // 317
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;                                                    // 318
EventEmitter.prototype.addListener = EventEmitter.prototype.on;                                                        // 319
                                                                                                                       // 320
//                                                                                                                     // 321
// Expose the prefix.                                                                                                  // 322
//                                                                                                                     // 323
EventEmitter.prefixed = prefix;                                                                                        // 324
                                                                                                                       // 325
//                                                                                                                     // 326
// Allow `EventEmitter` to be imported as module namespace.                                                            // 327
//                                                                                                                     // 328
EventEmitter.EventEmitter = EventEmitter;                                                                              // 329
                                                                                                                       // 330
//                                                                                                                     // 331
// Expose the module.                                                                                                  // 332
//                                                                                                                     // 333
if ('undefined' !== typeof module) {                                                                                   // 334
  module.exports = EventEmitter;                                                                                       // 335
}                                                                                                                      // 336
                                                                                                                       // 337
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/ostrio:files/client.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ostrio:files'] = exports, {
  FilesCollection: FilesCollection
});

})();
