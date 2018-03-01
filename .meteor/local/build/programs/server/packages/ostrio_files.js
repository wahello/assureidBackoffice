(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var proceedAfterUpload, callback, opts, responseType, FilesCollection;

var require = meteorInstall({"node_modules":{"meteor":{"ostrio:files":{"server.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/server.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  FilesCollection: () => FilesCollection
});

let _;

module.watch(require("meteor/underscore"), {
  _(v) {
    _ = v;
  }

}, 0);
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 1);
let WebApp;
module.watch(require("meteor/webapp"), {
  WebApp(v) {
    WebApp = v;
  }

}, 2);
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 3);
let Random;
module.watch(require("meteor/random"), {
  Random(v) {
    Random = v;
  }

}, 4);
let Cookies;
module.watch(require("meteor/ostrio:cookies"), {
  Cookies(v) {
    Cookies = v;
  }

}, 5);
let WriteStream;
module.watch(require("./write-stream.js"), {
  default(v) {
    WriteStream = v;
  }

}, 6);
let check, Match;
module.watch(require("meteor/check"), {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 7);
let FilesCollectionCore;
module.watch(require("./core.js"), {
  default(v) {
    FilesCollectionCore = v;
  }

}, 8);
let fixJSONParse, fixJSONStringify;
module.watch(require("./lib.js"), {
  fixJSONParse(v) {
    fixJSONParse = v;
  },

  fixJSONStringify(v) {
    fixJSONStringify = v;
  }

}, 9);
let fs;
module.watch(require("fs-extra"), {
  default(v) {
    fs = v;
  }

}, 10);
let nodeQs;
module.watch(require("querystring"), {
  default(v) {
    nodeQs = v;
  }

}, 11);
let request;
module.watch(require("request"), {
  default(v) {
    request = v;
  }

}, 12);
let fileType;
module.watch(require("file-type"), {
  default(v) {
    fileType = v;
  }

}, 13);
let nodePath;
module.watch(require("path"), {
  default(v) {
    nodePath = v;
  }

}, 14);
/*
 * @const {Object} bound  - Meteor.bindEnvironment (Fiber wrapper)
 * @const {Function} NOOP - No Operation function, placeholder for required callbacks
 */const bound = Meteor.bindEnvironment(callback => callback());

const NOOP = () => {}; /*
                        * @locus Anywhere
                        * @class FilesCollection
                        * @param config           {Object}   - [Both]   Configuration object with next properties:
                        * @param config.debug     {Boolean}  - [Both]   Turn on/of debugging and extra logging
                        * @param config.schema    {Object}   - [Both]   Collection Schema
                        * @param config.public    {Boolean}  - [Both]   Store files in folder accessible for proxy servers, for limits, and more - read docs
                        * @param config.strict    {Boolean}  - [Server] Strict mode for partial content, if is `true` server will return `416` response code, when `range` is not specified, otherwise server return `206`
                        * @param config.protected {Function} - [Server] If `true` - files will be served only to authorized users, if `function()` - you're able to check visitor's permissions in your own way function's context has:
                        *  - `request`
                        *  - `response`
                        *  - `user()`
                        *  - `userId`
                        * @param config.chunkSize      {Number}  - [Both] Upload chunk size, default: 524288 bytes (0,5 Mb)
                        * @param config.permissions    {Number}  - [Server] Permissions which will be set to uploaded files (octal), like: `511` or `0o755`. Default: 0644
                        * @param config.parentDirPermissions {Number}  - [Server] Permissions which will be set to parent directory of uploaded files (octal), like: `611` or `0o777`. Default: 0755
                        * @param config.storagePath    {String|Function}  - [Server] Storage path on file system
                        * @param config.cacheControl   {String}  - [Server] Default `Cache-Control` header
                        * @param config.responseHeaders {Object|Function} - [Server] Custom response headers, if function is passed, must return Object
                        * @param config.throttle       {Number}  - [Server] DEPRECATED bps throttle threshold
                        * @param config.downloadRoute  {String}  - [Both]   Server Route used to retrieve files
                        * @param config.collection     {Mongo.Collection} - [Both] Mongo Collection Instance
                        * @param config.collectionName {String}  - [Both]   Collection name
                        * @param config.namingFunction {Function}- [Both]   Function which returns `String`
                        * @param config.integrityCheck {Boolean} - [Server] Check file's integrity before serving to users
                        * @param config.onAfterUpload  {Function}- [Server] Called right after file is ready on FS. Use to transfer file somewhere else, or do other thing with file directly
                        * @param config.onAfterRemove  {Function} - [Server] Called right after file is removed. Removed objects is passed to callback
                        * @param config.continueUploadTTL {Number} - [Server] Time in seconds, during upload may be continued, default 3 hours (10800 seconds)
                        * @param config.onBeforeUpload {Function}- [Both]   Function which executes on server after receiving each chunk and on client right before beginning upload. Function context is `File` - so you are able to check for extension, mime-type, size and etc.:
                        *  - return `true` to continue
                        *  - return `false` or `String` to abort upload
                        * @param config.onInitiateUpload {Function} - [Server] Function which executes on server right before upload is begin and right after `onBeforeUpload` hook. This hook is fully asynchronous.
                        * @param config.onBeforeRemove {Function} - [Server] Executes before removing file on server, so you can check permissions. Return `true` to allow action and `false` to deny.
                        * @param config.allowClientCode  {Boolean}  - [Both]   Allow to run `remove` from client
                        * @param config.downloadCallback {Function} - [Server] Callback triggered each time file is requested, return truthy value to continue download, or falsy to abort
                        * @param config.interceptDownload {Function} - [Server] Intercept download request, so you can serve file from third-party resource, arguments {http: {request: {...}, response: {...}}, fileRef: {...}}
                        * @param config.disableUpload {Boolean} - Disable file upload, useful for server only solutions
                        * @param config.disableDownload {Boolean} - Disable file download (serving), useful for file management only solutions
                        * @summary Create new instance of FilesCollection
                        */

class FilesCollection extends FilesCollectionCore {
  constructor(config) {
    super();
    let storagePath;

    if (config) {
      ({
        storagePath,
        debug: this.debug,
        schema: this.schema,
        public: this.public,
        strict: this.strict,
        chunkSize: this.chunkSize,
        protected: this.protected,
        collection: this.collection,
        permissions: this.permissions,
        cacheControl: this.cacheControl,
        downloadRoute: this.downloadRoute,
        onAfterUpload: this.onAfterUpload,
        onAfterRemove: this.onAfterRemove,
        disableUpload: this.disableUpload,
        onBeforeRemove: this.onBeforeRemove,
        integrityCheck: this.integrityCheck,
        collectionName: this.collectionName,
        onBeforeUpload: this.onBeforeUpload,
        namingFunction: this.namingFunction,
        responseHeaders: this.responseHeaders,
        disableDownload: this.disableDownload,
        allowClientCode: this.allowClientCode,
        downloadCallback: this.downloadCallback,
        onInitiateUpload: this.onInitiateUpload,
        interceptDownload: this.interceptDownload,
        continueUploadTTL: this.continueUploadTTL,
        parentDirPermissions: this.parentDirPermissions
      } = config);
    }

    const self = this;
    const cookie = new Cookies();

    if (!_.isBoolean(this.debug)) {
      this.debug = false;
    }

    if (!_.isBoolean(this.public)) {
      this.public = false;
    }

    if (!this.protected) {
      this.protected = false;
    }

    if (!this.chunkSize) {
      this.chunkSize = 1024 * 512;
    }

    this.chunkSize = Math.floor(this.chunkSize / 8) * 8;

    if (!_.isString(this.collectionName) && !this.collection) {
      this.collectionName = 'MeteorUploadFiles';
    }

    if (!this.collection) {
      this.collection = new Mongo.Collection(this.collectionName);
    } else {
      this.collectionName = this.collection._name;
    }

    this.collection.filesCollection = this;
    check(this.collectionName, String);

    if (this.public && !this.downloadRoute) {
      throw new Meteor.Error(500, `[FilesCollection.${this.collectionName}]: \"downloadRoute\" must be precisely provided on \"public\" collections! Note: \"downloadRoute\" must be equal or be inside of your web/proxy-server (relative) root.`);
    }

    if (!_.isString(this.downloadRoute)) {
      this.downloadRoute = '/cdn/storage';
    }

    this.downloadRoute = this.downloadRoute.replace(/\/$/, '');

    if (!_.isFunction(this.namingFunction)) {
      this.namingFunction = false;
    }

    if (!_.isFunction(this.onBeforeUpload)) {
      this.onBeforeUpload = false;
    }

    if (!_.isBoolean(this.allowClientCode)) {
      this.allowClientCode = true;
    }

    if (!_.isFunction(this.onInitiateUpload)) {
      this.onInitiateUpload = false;
    }

    if (!_.isFunction(this.interceptDownload)) {
      this.interceptDownload = false;
    }

    if (!_.isBoolean(this.strict)) {
      this.strict = true;
    }

    if (!_.isNumber(this.permissions)) {
      this.permissions = parseInt('644', 8);
    }

    if (!_.isNumber(this.parentDirPermissions)) {
      this.parentDirPermissions = parseInt('755', 8);
    }

    if (!_.isString(this.cacheControl)) {
      this.cacheControl = 'public, max-age=31536000, s-maxage=31536000';
    }

    if (!_.isFunction(this.onAfterUpload)) {
      this.onAfterUpload = false;
    }

    if (!_.isBoolean(this.disableUpload)) {
      this.disableUpload = false;
    }

    if (!_.isFunction(this.onAfterRemove)) {
      this.onAfterRemove = false;
    }

    if (!_.isFunction(this.onBeforeRemove)) {
      this.onBeforeRemove = false;
    }

    if (!_.isBoolean(this.integrityCheck)) {
      this.integrityCheck = true;
    }

    if (!_.isBoolean(this.disableDownload)) {
      this.disableDownload = false;
    }

    if (!_.isObject(this._currentUploads)) {
      this._currentUploads = {};
    }

    if (!_.isFunction(this.downloadCallback)) {
      this.downloadCallback = false;
    }

    if (!_.isNumber(this.continueUploadTTL)) {
      this.continueUploadTTL = 10800;
    }

    if (!_.isFunction(this.responseHeaders)) {
      this.responseHeaders = (responseCode, fileRef, versionRef) => {
        const headers = {};

        switch (responseCode) {
          case '206':
            headers.Pragma = 'private';
            headers.Trailer = 'expires';
            headers['Transfer-Encoding'] = 'chunked';
            break;

          case '400':
            headers['Cache-Control'] = 'no-cache';
            break;

          case '416':
            headers['Content-Range'] = `bytes */${versionRef.size}`;
            break;

          default:
            break;
        }

        headers.Connection = 'keep-alive';
        headers['Content-Type'] = versionRef.type || 'application/octet-stream';
        headers['Accept-Ranges'] = 'bytes';
        return headers;
      };
    }

    if (this.public && !storagePath) {
      throw new Meteor.Error(500, `[FilesCollection.${this.collectionName}] \"storagePath\" must be set on \"public\" collections! Note: \"storagePath\" must be equal on be inside of your web/proxy-server (absolute) root.`);
    }

    if (!storagePath) {
      storagePath = function () {
        return `assets${nodePath.sep}app${nodePath.sep}uploads${nodePath.sep}${self.collectionName}`;
      };
    }

    if (_.isString(storagePath)) {
      this.storagePath = () => storagePath;
    } else {
      this.storagePath = function () {
        let sp = storagePath.apply(self, arguments);

        if (!_.isString(sp)) {
          throw new Meteor.Error(400, `[FilesCollection.${self.collectionName}] \"storagePath\" function must return a String!`);
        }

        sp = sp.replace(/\/$/, '');
        return nodePath.normalize(sp);
      };
    }

    this._debug('[FilesCollection.storagePath] Set to:', this.storagePath({}));

    fs.mkdirs(this.storagePath({}), {
      mode: this.parentDirPermissions
    }, error => {
      if (error) {
        throw new Meteor.Error(401, `[FilesCollection.${self.collectionName}] Path \"${this.storagePath({})}\" is not writable!`, error);
      }
    });
    check(this.strict, Boolean);
    check(this.permissions, Number);
    check(this.storagePath, Function);
    check(this.cacheControl, String);
    check(this.onAfterRemove, Match.OneOf(false, Function));
    check(this.onAfterUpload, Match.OneOf(false, Function));
    check(this.disableUpload, Boolean);
    check(this.integrityCheck, Boolean);
    check(this.onBeforeRemove, Match.OneOf(false, Function));
    check(this.disableDownload, Boolean);
    check(this.downloadCallback, Match.OneOf(false, Function));
    check(this.interceptDownload, Match.OneOf(false, Function));
    check(this.continueUploadTTL, Number);
    check(this.responseHeaders, Match.OneOf(Object, Function));

    if (!this.disableUpload) {
      this._preCollection = new Mongo.Collection(`__pre_${this.collectionName}`);

      this._preCollection._ensureIndex({
        createdAt: 1
      }, {
        expireAfterSeconds: this.continueUploadTTL,
        background: true
      });

      const _preCollectionCursor = this._preCollection.find({}, {
        fields: {
          _id: 1,
          isFinished: 1
        }
      });

      _preCollectionCursor.observe({
        changed(doc) {
          if (doc.isFinished) {
            self._debug(`[FilesCollection] [_preCollectionCursor.observe] [changed]: ${doc._id}`);

            self._preCollection.remove({
              _id: doc._id
            }, NOOP);
          }
        },

        removed(doc) {
          // Free memory after upload is done
          // Or if upload is unfinished
          self._debug(`[FilesCollection] [_preCollectionCursor.observe] [removed]: ${doc._id}`);

          if (_.isObject(self._currentUploads[doc._id])) {
            self._currentUploads[doc._id].stop();

            self._currentUploads[doc._id].end();

            if (!doc.isFinished) {
              self._debug(`[FilesCollection] [_preCollectionCursor.observe] [removeUnfinishedUpload]: ${doc._id}`);

              self._currentUploads[doc._id].abort();
            }

            delete self._currentUploads[doc._id];
          }
        }

      });

      this._createStream = (_id, path, opts) => {
        this._currentUploads[_id] = new WriteStream(path, opts.fileLength, opts, this.permissions);
      }; // This little function allows to continue upload
      // even after server is restarted (*not on dev-stage*)


      this._continueUpload = _id => {
        if (this._currentUploads[_id] && this._currentUploads[_id].file) {
          if (!this._currentUploads[_id].aborted && !this._currentUploads[_id].ended) {
            return this._currentUploads[_id].file;
          }

          this._createStream(_id, this._currentUploads[_id].file.file.path, this._currentUploads[_id].file);

          return this._currentUploads[_id].file;
        }

        const contUpld = this._preCollection.findOne({
          _id
        });

        if (contUpld) {
          this._createStream(_id, contUpld.file.path, contUpld);

          return this._currentUploads[_id].file;
        }

        return false;
      };
    }

    if (!this.schema) {
      this.schema = FilesCollectionCore.schema;
    }

    check(this.debug, Boolean);
    check(this.schema, Object);
    check(this.public, Boolean);
    check(this.protected, Match.OneOf(Boolean, Function));
    check(this.chunkSize, Number);
    check(this.downloadRoute, String);
    check(this.namingFunction, Match.OneOf(false, Function));
    check(this.onBeforeUpload, Match.OneOf(false, Function));
    check(this.onInitiateUpload, Match.OneOf(false, Function));
    check(this.allowClientCode, Boolean);

    if (this.public && this.protected) {
      throw new Meteor.Error(500, `[FilesCollection.${this.collectionName}]: Files can not be public and protected at the same time!`);
    }

    this._checkAccess = http => {
      if (this.protected) {
        let result;

        const {
          user,
          userId
        } = this._getUser(http);

        if (_.isFunction(this.protected)) {
          let fileRef;

          if (_.isObject(http.params) && http.params._id) {
            fileRef = this.collection.findOne(http.params._id);
          }

          result = http ? this.protected.call(_.extend(http, {
            user,
            userId
          }), fileRef || null) : this.protected.call({
            user,
            userId
          }, fileRef || null);
        } else {
          result = !!userId;
        }

        if (http && result === true || !http) {
          return true;
        }

        const rc = _.isNumber(result) ? result : 401;

        this._debug('[FilesCollection._checkAccess] WARN: Access denied!');

        if (http) {
          const text = 'Access denied!';

          if (!http.response.headersSent) {
            http.response.writeHead(rc, {
              'Content-Type': 'text/plain',
              'Content-Length': text.length
            });
          }

          if (!http.response.finished) {
            http.response.end(text);
          }
        }

        return false;
      }

      return true;
    };

    this._methodNames = {
      _Abort: `_FilesCollectionAbort_${this.collectionName}`,
      _Write: `_FilesCollectionWrite_${this.collectionName}`,
      _Start: `_FilesCollectionStart_${this.collectionName}`,
      _Remove: `_FilesCollectionRemove_${this.collectionName}`
    };
    this.on('_handleUpload', this._handleUpload);
    this.on('_finishUpload', this._finishUpload);

    if (!this.disableUpload && !this.disableDownload) {
      WebApp.connectHandlers.use((httpReq, httpResp, next) => {
        if (!this.disableUpload && !!~httpReq._parsedUrl.path.indexOf(`${this.downloadRoute}/${this.collectionName}/__upload`)) {
          if (httpReq.method === 'POST') {
            const handleError = _error => {
              let error = _error;
              console.warn('[FilesCollection] [Upload] [HTTP] Exception:', error);
              console.trace();

              if (!httpResp.headersSent) {
                httpResp.writeHead(500);
              }

              if (!httpResp.finished) {
                if (_.isObject(error) && _.isFunction(error.toString)) {
                  error = error.toString();
                }

                if (!_.isString(error)) {
                  error = 'Unexpected error!';
                }

                httpResp.end(JSON.stringify({
                  error
                }));
              }
            };

            let body = '';
            httpReq.on('data', data => bound(() => {
              body += data;
            }));
            httpReq.on('end', () => bound(() => {
              try {
                let opts;
                let result;
                let user;

                if (httpReq.headers['x-mtok'] && _.isObject(Meteor.server.sessions) && _.has(Meteor.server.sessions[httpReq.headers['x-mtok']], 'userId')) {
                  user = {
                    userId: Meteor.server.sessions[httpReq.headers['x-mtok']].userId
                  };
                } else {
                  user = this._getUser({
                    request: httpReq,
                    response: httpResp
                  });
                }

                if (httpReq.headers['x-start'] !== '1') {
                  opts = {
                    fileId: httpReq.headers['x-fileid']
                  };

                  if (httpReq.headers['x-eof'] === '1') {
                    opts.eof = true;
                  } else {
                    if (typeof Buffer.from === 'function') {
                      try {
                        opts.binData = Buffer.from(body, 'base64');
                      } catch (buffErr) {
                        opts.binData = new Buffer(body, 'base64');
                      }
                    } else {
                      opts.binData = new Buffer(body, 'base64');
                    }

                    opts.chunkId = parseInt(httpReq.headers['x-chunkid']);
                  }

                  const _continueUpload = this._continueUpload(opts.fileId);

                  if (!_continueUpload) {
                    throw new Meteor.Error(408, 'Can\'t continue upload, session expired. Start upload again.');
                  }

                  ({
                    result,
                    opts
                  } = this._prepareUpload(_.extend(opts, _continueUpload), user.userId, 'HTTP'));

                  if (opts.eof) {
                    this._handleUpload(result, opts, () => {
                      if (!httpResp.headersSent) {
                        httpResp.writeHead(200);
                      }

                      if (_.isObject(result.file) && result.file.meta) {
                        result.file.meta = fixJSONStringify(result.file.meta);
                      }

                      if (!httpResp.finished) {
                        httpResp.end(JSON.stringify(result));
                      }
                    });

                    return;
                  }

                  this.emit('_handleUpload', result, opts, NOOP);

                  if (!httpResp.headersSent) {
                    httpResp.writeHead(204);
                  }

                  if (!httpResp.finished) {
                    httpResp.end();
                  }
                } else {
                  try {
                    opts = JSON.parse(body);
                  } catch (jsonErr) {
                    console.error('Can\'t parse incoming JSON from Client on [.insert() | upload], something went wrong!', jsonErr);
                    opts = {
                      file: {}
                    };
                  }

                  if (!_.isObject(opts.file)) {
                    opts.file = {};
                  }

                  opts.___s = true;

                  this._debug(`[FilesCollection] [File Start HTTP] ${opts.file.name || '[no-name]'} - ${opts.fileId}`);

                  if (_.isObject(opts.file) && opts.file.meta) {
                    opts.file.meta = fixJSONParse(opts.file.meta);
                  }

                  ({
                    result
                  } = this._prepareUpload(_.clone(opts), user.userId, 'HTTP Start Method'));

                  if (this.collection.findOne(result._id)) {
                    throw new Meteor.Error(400, 'Can\'t start upload, data substitution detected!');
                  }

                  opts._id = opts.fileId;
                  opts.createdAt = new Date();
                  opts.maxLength = opts.fileLength;

                  this._preCollection.insert(_.omit(opts, '___s'));

                  this._createStream(result._id, result.path, _.omit(opts, '___s'));

                  if (opts.returnMeta) {
                    if (!httpResp.headersSent) {
                      httpResp.writeHead(200);
                    }

                    if (!httpResp.finished) {
                      httpResp.end(JSON.stringify({
                        uploadRoute: `${this.downloadRoute}/${this.collectionName}/__upload`,
                        file: result
                      }));
                    }
                  } else {
                    if (!httpResp.headersSent) {
                      httpResp.writeHead(204);
                    }

                    if (!httpResp.finished) {
                      httpResp.end();
                    }
                  }
                }
              } catch (httpRespErr) {
                handleError(httpRespErr);
              }
            }));
          } else {
            next();
          }

          return;
        }

        if (!this.disableDownload) {
          let http;
          let params;
          let uri;
          let uris;

          if (!this.public) {
            if (!!~httpReq._parsedUrl.path.indexOf(`${this.downloadRoute}/${this.collectionName}`)) {
              uri = httpReq._parsedUrl.path.replace(`${this.downloadRoute}/${this.collectionName}`, '');

              if (uri.indexOf('/') === 0) {
                uri = uri.substring(1);
              }

              uris = uri.split('/');

              if (uris.length === 3) {
                params = {
                  _id: uris[0],
                  query: httpReq._parsedUrl.query ? nodeQs.parse(httpReq._parsedUrl.query) : {},
                  name: uris[2].split('?')[0],
                  version: uris[1]
                };
                http = {
                  request: httpReq,
                  response: httpResp,
                  params
                };

                if (this._checkAccess(http)) {
                  this.download(http, uris[1], this.collection.findOne(uris[0]));
                }
              } else {
                next();
              }
            } else {
              next();
            }
          } else {
            if (!!~httpReq._parsedUrl.path.indexOf(`${this.downloadRoute}`)) {
              uri = httpReq._parsedUrl.path.replace(`${this.downloadRoute}`, '');

              if (uri.indexOf('/') === 0) {
                uri = uri.substring(1);
              }

              uris = uri.split('/');
              let _file = uris[uris.length - 1];

              if (_file) {
                let version;

                if (!!~_file.indexOf('-')) {
                  version = _file.split('-')[0];
                  _file = _file.split('-')[1].split('?')[0];
                } else {
                  version = 'original';
                  _file = _file.split('?')[0];
                }

                params = {
                  query: httpReq._parsedUrl.query ? nodeQs.parse(httpReq._parsedUrl.query) : {},
                  file: _file,
                  _id: _file.split('.')[0],
                  version,
                  name: _file
                };
                http = {
                  request: httpReq,
                  response: httpResp,
                  params
                };
                this.download(http, version, this.collection.findOne(params._id));
              } else {
                next();
              }
            } else {
              next();
            }
          }

          return;
        }

        next();
      });
    }

    if (!this.disableUpload) {
      const _methods = {}; // Method used to remove file
      // from Client side

      _methods[this._methodNames._Remove] = function (selector) {
        check(selector, Match.OneOf(String, Object));

        self._debug(`[FilesCollection] [Unlink Method] [.remove(${selector})]`);

        if (self.allowClientCode) {
          if (self.onBeforeRemove && _.isFunction(self.onBeforeRemove)) {
            const userId = this.userId;
            const userFuncs = {
              userId: this.userId,

              user() {
                if (Meteor.users) {
                  return Meteor.users.findOne(userId);
                }

                return null;
              }

            };

            if (!self.onBeforeRemove.call(userFuncs, self.find(selector) || null)) {
              throw new Meteor.Error(403, '[FilesCollection] [remove] Not permitted!');
            }
          }

          const cursor = self.find(selector);

          if (cursor.count() > 0) {
            self.remove(selector);
            return true;
          }

          throw new Meteor.Error(404, 'Cursor is empty, no files is removed');
        } else {
          throw new Meteor.Error(401, '[FilesCollection] [remove] Run code from client is not allowed!');
        }
      }; // Method used to receive "first byte" of upload
      // and all file's meta-data, so
      // it won't be transferred with every chunk
      // Basically it prepares everything
      // So user can pause/disconnect and
      // continue upload later, during `continueUploadTTL`


      _methods[this._methodNames._Start] = function (opts, returnMeta) {
        check(opts, {
          file: Object,
          fileId: String,
          FSName: Match.Optional(String),
          chunkSize: Number,
          fileLength: Number
        });
        check(returnMeta, Match.Optional(Boolean));

        self._debug(`[FilesCollection] [File Start Method] ${opts.file.name} - ${opts.fileId}`);

        opts.___s = true;

        const {
          result
        } = self._prepareUpload(_.clone(opts), this.userId, 'DDP Start Method');

        if (self.collection.findOne(result._id)) {
          throw new Meteor.Error(400, 'Can\'t start upload, data substitution detected!');
        }

        opts._id = opts.fileId;
        opts.createdAt = new Date();
        opts.maxLength = opts.fileLength;

        self._preCollection.insert(_.omit(opts, '___s'));

        self._createStream(result._id, result.path, _.omit(opts, '___s'));

        if (returnMeta) {
          return {
            uploadRoute: `${self.downloadRoute}/${self.collectionName}/__upload`,
            file: result
          };
        }

        return true;
      }; // Method used to write file chunks
      // it receives very limited amount of meta-data
      // This method also responsible for EOF


      _methods[this._methodNames._Write] = function (opts) {
        let result;
        check(opts, {
          eof: Match.Optional(Boolean),
          fileId: String,
          binData: Match.Optional(String),
          chunkId: Match.Optional(Number)
        });

        if (opts.binData) {
          if (typeof Buffer.from === 'function') {
            try {
              opts.binData = Buffer.from(opts.binData, 'base64');
            } catch (buffErr) {
              opts.binData = new Buffer(opts.binData, 'base64');
            }
          } else {
            opts.binData = new Buffer(opts.binData, 'base64');
          }
        }

        const _continueUpload = self._continueUpload(opts.fileId);

        if (!_continueUpload) {
          throw new Meteor.Error(408, 'Can\'t continue upload, session expired. Start upload again.');
        }

        this.unblock();
        ({
          result,
          opts
        } = self._prepareUpload(_.extend(opts, _continueUpload), this.userId, 'DDP'));

        if (opts.eof) {
          try {
            return Meteor.wrapAsync(self._handleUpload.bind(self, result, opts))();
          } catch (handleUploadErr) {
            self._debug('[FilesCollection] [Write Method] [DDP] Exception:', handleUploadErr);

            throw handleUploadErr;
          }
        } else {
          self.emit('_handleUpload', result, opts, NOOP);
        }

        return true;
      }; // Method used to Abort upload
      // - Feeing memory by .end()ing writableStreams
      // - Removing temporary record from @_preCollection
      // - Removing record from @collection
      // - .unlink()ing chunks from FS


      _methods[this._methodNames._Abort] = function (_id) {
        check(_id, String);

        const _continueUpload = self._continueUpload(_id);

        self._debug(`[FilesCollection] [Abort Method]: ${_id} - ${_.isObject(_continueUpload.file) ? _continueUpload.file.path : ''}`);

        if (self._currentUploads && self._currentUploads[_id]) {
          self._currentUploads[_id].stop();

          self._currentUploads[_id].abort();
        }

        if (_continueUpload) {
          self._preCollection.remove({
            _id
          });

          self.remove({
            _id
          });

          if (_.isObject(_continueUpload.file) && _continueUpload.file.path) {
            self.unlink({
              _id,
              path: _continueUpload.file.path
            });
          }
        }

        return true;
      };

      Meteor.methods(_methods);
    }
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name _prepareUpload
     * @summary Internal method. Used to optimize received data and check upload permission
     * @returns {Object}
     */

  _prepareUpload(opts = {}, userId, transport) {
    let ctx;

    if (!_.isBoolean(opts.eof)) {
      opts.eof = false;
    }

    if (!opts.binData) {
      opts.binData = 'EOF';
    }

    if (!_.isNumber(opts.chunkId)) {
      opts.chunkId = -1;
    }

    if (!_.isString(opts.FSName)) {
      opts.FSName = opts.fileId;
    }

    this._debug(`[FilesCollection] [Upload] [${transport}] Got #${opts.chunkId}/${opts.fileLength} chunks, dst: ${opts.file.name || opts.file.fileName}`);

    const fileName = this._getFileName(opts.file);

    const {
      extension,
      extensionWithDot
    } = this._getExt(fileName);

    if (!_.isObject(opts.file.meta)) {
      opts.file.meta = {};
    }

    let result = opts.file;
    result.name = fileName;
    result.meta = opts.file.meta;
    result.extension = extension;
    result.ext = extension;
    result._id = opts.fileId;
    result.userId = userId || null;
    opts.FSName = opts.FSName.replace(/([^a-z0-9\-\_]+)/gi, '-');
    result.path = `${this.storagePath(result)}${nodePath.sep}${opts.FSName}${extensionWithDot}`;
    result = _.extend(result, this._dataToSchema(result));

    if (this.onBeforeUpload && _.isFunction(this.onBeforeUpload)) {
      ctx = _.extend({
        file: opts.file
      }, {
        chunkId: opts.chunkId,
        userId: result.userId,

        user() {
          if (Meteor.users && result.userId) {
            return Meteor.users.findOne(result.userId);
          }

          return null;
        },

        eof: opts.eof
      });
      const isUploadAllowed = this.onBeforeUpload.call(ctx, result);

      if (isUploadAllowed !== true) {
        throw new Meteor.Error(403, _.isString(isUploadAllowed) ? isUploadAllowed : '@onBeforeUpload() returned false');
      } else {
        if (opts.___s === true && this.onInitiateUpload && _.isFunction(this.onInitiateUpload)) {
          this.onInitiateUpload.call(ctx, result);
        }
      }
    } else if (opts.___s === true && this.onInitiateUpload && _.isFunction(this.onInitiateUpload)) {
      ctx = _.extend({
        file: opts.file
      }, {
        chunkId: opts.chunkId,
        userId: result.userId,

        user() {
          if (Meteor.users && result.userId) {
            return Meteor.users.findOne(result.userId);
          }

          return null;
        },

        eof: opts.eof
      });
      this.onInitiateUpload.call(ctx, result);
    }

    return {
      result,
      opts
    };
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name _finishUpload
     * @summary Internal method. Finish upload, close Writable stream, add record to MongoDB and flush used memory
     * @returns {undefined}
     */

  _finishUpload(result, opts, cb) {
    this._debug(`[FilesCollection] [Upload] [finish(ing)Upload] -> ${result.path}`);

    fs.chmod(result.path, this.permissions, NOOP);
    result.type = this._getMimeType(opts.file);
    result.public = this.public;

    this._updateFileTypes(result);

    this.collection.insert(_.clone(result), (error, _id) => {
      if (error) {
        cb && cb(error);

        this._debug('[FilesCollection] [Upload] [_finishUpload] Error:', error);
      } else {
        this._preCollection.update({
          _id: opts.fileId
        }, {
          $set: {
            isFinished: true
          }
        });

        result._id = _id;

        this._debug(`[FilesCollection] [Upload] [finish(ed)Upload] -> ${result.path}`);

        this.onAfterUpload && this.onAfterUpload.call(this, result);
        this.emit('afterUpload', result);
        cb && cb(null, result);
      }
    });
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name _handleUpload
     * @summary Internal method to handle upload process, pipe incoming data to Writable stream
     * @returns {undefined}
     */

  _handleUpload(result, opts, cb) {
    try {
      if (opts.eof) {
        this._currentUploads[result._id].end(() => {
          this.emit('_finishUpload', result, opts, cb);
        });
      } else {
        this._currentUploads[result._id].write(opts.chunkId, opts.binData, cb);
      }
    } catch (e) {
      this._debug('[_handleUpload] [EXCEPTION:]', e);

      cb && cb(e);
    }
  } /*
     * @locus Anywhere
     * @memberOf FilesCollection
     * @name _getMimeType
     * @param {Object} fileData - File Object
     * @summary Returns file's mime-type
     * @returns {String}
     */

  _getMimeType(fileData) {
    let mime;
    check(fileData, Object);

    if (_.isObject(fileData) && fileData.type) {
      mime = fileData.type;
    }

    if (fileData.path && (!mime || !_.isString(mime))) {
      try {
        let buf = new Buffer(262);
        const fd = fs.openSync(fileData.path, 'r');
        const br = fs.readSync(fd, buf, 0, 262, 0);
        fs.close(fd, NOOP);

        if (br < 262) {
          buf = buf.slice(0, br);
        }

        ({
          mime
        } = fileType(buf));
      } catch (e) {// We're good
      }
    }

    if (!mime || !_.isString(mime)) {
      mime = 'application/octet-stream';
    }

    return mime;
  } /*
     * @locus Anywhere
     * @memberOf FilesCollection
     * @name _getUser
     * @summary Returns object with `userId` and `user()` method which return user's object
     * @returns {Object}
     */

  _getUser(http) {
    const result = {
      user() {
        return null;
      },

      userId: null
    };

    if (http) {
      let mtok = null;

      if (http.request.headers['x-mtok']) {
        mtok = http.request.headers['x-mtok'];
      } else {
        const cookie = http.request.Cookies;

        if (cookie.has('x_mtok')) {
          mtok = cookie.get('x_mtok');
        }
      }

      if (mtok) {
        const userId = _.isObject(Meteor.server.sessions) && _.isObject(Meteor.server.sessions[mtok]) ? Meteor.server.sessions[mtok].userId : void 0;

        if (userId) {
          result.user = () => Meteor.users.findOne(userId);

          result.userId = userId;
        }
      }
    }

    return result;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name write
     * @param {Buffer} buffer - Binary File's Buffer
     * @param {Object} opts - Object with file-data
     * @param {String} opts.name - File name, alias: `fileName`
     * @param {String} opts.type - File mime-type
     * @param {Object} opts.meta - File additional meta-data
     * @param {String} opts.userId - UserId, default *null*
     * @param {String} opts.fileId - _id, default *null*
     * @param {Function} callback - function(error, fileObj){...}
     * @param {Boolean} proceedAfterUpload - Proceed onAfterUpload hook
     * @summary Write buffer to FS and add to FilesCollection Collection
     * @returns {FilesCollection} Instance
     */

  write(buffer, opts = {}, callback, proceedAfterUpload) {
    this._debug('[FilesCollection] [write()]');

    if (_.isFunction(opts)) {
      proceedAfterUpload = callback;
      callback = opts;
      opts = {};
    } else if (_.isBoolean(callback)) {
      proceedAfterUpload = callback;
    } else if (_.isBoolean(opts)) {
      proceedAfterUpload = opts;
    }

    check(opts, Match.Optional(Object));
    check(callback, Match.Optional(Function));
    check(proceedAfterUpload, Match.Optional(Boolean));
    const fileId = opts.fileId || Random.id();
    const FSName = this.namingFunction ? this.namingFunction(opts) : fileId;
    const fileName = opts.name || opts.fileName ? opts.name || opts.fileName : FSName;

    const {
      extension,
      extensionWithDot
    } = this._getExt(fileName);

    opts.path = `${this.storagePath(opts)}${nodePath.sep}${FSName}${extensionWithDot}`;
    opts.type = this._getMimeType(opts);

    if (!_.isObject(opts.meta)) {
      opts.meta = {};
    }

    if (!_.isNumber(opts.size)) {
      opts.size = buffer.length;
    }

    const result = this._dataToSchema({
      name: fileName,
      path: opts.path,
      meta: opts.meta,
      type: opts.type,
      size: opts.size,
      userId: opts.userId,
      extension
    });

    result._id = fileId;
    const stream = fs.createWriteStream(opts.path, {
      flags: 'w',
      mode: this.permissions
    });
    stream.end(buffer, streamErr => bound(() => {
      if (streamErr) {
        callback && callback(streamErr);
      } else {
        this.collection.insert(result, (insertErr, _id) => {
          if (insertErr) {
            callback && callback(insertErr);

            this._debug(`[FilesCollection] [write] [insert] Error: ${fileName} -> ${this.collectionName}`, insertErr);
          } else {
            const fileRef = this.collection.findOne(_id);
            callback && callback(null, fileRef);

            if (proceedAfterUpload === true) {
              this.onAfterUpload && this.onAfterUpload.call(this, fileRef);
              this.emit('afterUpload', fileRef);
            }

            this._debug(`[FilesCollection] [write]: ${fileName} -> ${this.collectionName}`);
          }
        });
      }
    }));
    return this;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name load
     * @param {String} url - URL to file
     * @param {Object} opts - Object with file-data
     * @param {Object} opts.headers - HTTP headers to use when requesting the file
     * @param {String} opts.name - File name, alias: `fileName`
     * @param {String} opts.type - File mime-type
     * @param {Object} opts.meta - File additional meta-data
     * @param {String} opts.userId - UserId, default *null*
     * @param {String} opts.fileId - _id, default *null*
     * @param {Function} callback - function(error, fileObj){...}
     * @param {Boolean} proceedAfterUpload - Proceed onAfterUpload hook
     * @summary Download file, write stream to FS and add to FilesCollection Collection
     * @returns {FilesCollection} Instance
     */

  load(url, opts = {}, callback, proceedAfterUpload) {
    this._debug(`[FilesCollection] [load(${url}, ${JSON.stringify(opts)}, callback)]`);

    if (_.isFunction(opts)) {
      proceedAfterUpload = callback;
      callback = opts;
      opts = {};
    } else if (_.isBoolean(callback)) {
      proceedAfterUpload = callback;
    } else if (_.isBoolean(opts)) {
      proceedAfterUpload = opts;
    }

    check(url, String);
    check(opts, Match.Optional(Object));
    check(callback, Match.Optional(Function));
    check(proceedAfterUpload, Match.Optional(Boolean));

    if (!_.isObject(opts)) {
      opts = {};
    }

    const fileId = opts.fileId || Random.id();
    const FSName = this.namingFunction ? this.namingFunction(opts) : fileId;
    const pathParts = url.split('/');
    const fileName = opts.name || opts.fileName ? opts.name || opts.fileName : pathParts[pathParts.length - 1] || FSName;

    const {
      extension,
      extensionWithDot
    } = this._getExt(fileName);

    opts.path = `${this.storagePath(opts)}${nodePath.sep}${FSName}${extensionWithDot}`;

    const storeResult = (result, cb) => {
      result._id = fileId;
      this.collection.insert(result, (error, _id) => {
        if (error) {
          cb && cb(error);

          this._debug(`[FilesCollection] [load] [insert] Error: ${fileName} -> ${this.collectionName}`, error);
        } else {
          const fileRef = this.collection.findOne(_id);
          cb && cb(null, fileRef);

          if (proceedAfterUpload === true) {
            this.onAfterUpload && this.onAfterUpload.call(this, fileRef);
            this.emit('afterUpload', fileRef);
          }

          this._debug(`[FilesCollection] [load] [insert] ${fileName} -> ${this.collectionName}`);
        }
      });
    };

    request.get({
      url,
      headers: opts.headers || {}
    }).on('error', error => bound(() => {
      callback && callback(error);

      this._debug(`[FilesCollection] [load] [request.get(${url})] Error:`, error);
    })).on('response', response => bound(() => {
      response.on('end', () => bound(() => {
        this._debug(`[FilesCollection] [load] Received: ${url}`);

        const result = this._dataToSchema({
          name: fileName,
          path: opts.path,
          meta: opts.meta,
          type: opts.type || response.headers['content-type'] || this._getMimeType({
            path: opts.path
          }),
          size: opts.size || parseInt(response.headers['content-length'] || 0),
          userId: opts.userId,
          extension
        });

        if (!result.size) {
          fs.stat(opts.path, (error, stats) => bound(() => {
            if (error) {
              callback && callback(error);
            } else {
              result.versions.original.size = result.size = stats.size;
              storeResult(result, callback);
            }
          }));
        } else {
          storeResult(result, callback);
        }
      }));
    })).pipe(fs.createWriteStream(opts.path, {
      flags: 'w',
      mode: this.permissions
    }));
    return this;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name addFile
     * @param {String} path          - Path to file
     * @param {String} opts          - [Optional] Object with file-data
     * @param {String} opts.type     - [Optional] File mime-type
     * @param {Object} opts.meta     - [Optional] File additional meta-data
     * @param {String} opts.fileId   - _id, default *null*
     * @param {Object} opts.fileName - [Optional] File name, if not specified file name and extension will be taken from path
     * @param {String} opts.userId   - [Optional] UserId, default *null*
     * @param {Function} callback    - [Optional] function(error, fileObj){...}
     * @param {Boolean} proceedAfterUpload - Proceed onAfterUpload hook
     * @summary Add file from FS to FilesCollection
     * @returns {FilesCollection} Instance
     */

  addFile(path, opts = {}, callback, proceedAfterUpload) {
    this._debug(`[FilesCollection] [addFile(${path})]`);

    if (_.isFunction(opts)) {
      proceedAfterUpload = callback;
      callback = opts;
      opts = {};
    } else if (_.isBoolean(callback)) {
      proceedAfterUpload = callback;
    } else if (_.isBoolean(opts)) {
      proceedAfterUpload = opts;
    }

    if (this.public) {
      throw new Meteor.Error(403, 'Can not run [addFile] on public collection! Just Move file to root of your server, then add record to Collection');
    }

    check(path, String);
    check(opts, Match.Optional(Object));
    check(callback, Match.Optional(Function));
    check(proceedAfterUpload, Match.Optional(Boolean));
    fs.stat(path, (statErr, stats) => bound(() => {
      if (statErr) {
        callback && callback(statErr);
      } else if (stats.isFile()) {
        if (!_.isObject(opts)) {
          opts = {};
        }

        opts.path = path;

        if (!opts.fileName) {
          const pathParts = path.split(nodePath.sep);
          opts.fileName = path.split(nodePath.sep)[pathParts.length - 1];
        }

        const {
          extension
        } = this._getExt(opts.fileName);

        if (!_.isString(opts.type)) {
          opts.type = this._getMimeType(opts);
        }

        if (!_.isObject(opts.meta)) {
          opts.meta = {};
        }

        if (!_.isNumber(opts.size)) {
          opts.size = stats.size;
        }

        const result = this._dataToSchema({
          name: opts.fileName,
          path,
          meta: opts.meta,
          type: opts.type,
          size: opts.size,
          userId: opts.userId,
          extension,
          _storagePath: path.replace(`${nodePath.sep}${opts.fileName}`, ''),
          fileId: opts.fileId || null
        });

        this.collection.insert(result, (insertErr, _id) => {
          if (insertErr) {
            callback && callback(insertErr);

            this._debug(`[FilesCollection] [addFile] [insert] Error: ${result.name} -> ${this.collectionName}`, insertErr);
          } else {
            const fileRef = this.collection.findOne(_id);
            callback && callback(null, fileRef);

            if (proceedAfterUpload === true) {
              this.onAfterUpload && this.onAfterUpload.call(this, fileRef);
              this.emit('afterUpload', fileRef);
            }

            this._debug(`[FilesCollection] [addFile]: ${result.name} -> ${this.collectionName}`);
          }
        });
      } else {
        callback && callback(new Meteor.Error(400, `[FilesCollection] [addFile(${path})]: File does not exist`));
      }
    }));
    return this;
  } /*
     * @locus Anywhere
     * @memberOf FilesCollection
     * @name remove
     * @param {String|Object} selector - Mongo-Style selector (http://docs.meteor.com/api/collections.html#selectors)
     * @param {Function} callback - Callback with one `error` argument
     * @summary Remove documents from the collection
     * @returns {FilesCollection} Instance
     */

  remove(selector, callback) {
    this._debug(`[FilesCollection] [remove(${JSON.stringify(selector)})]`);

    if (selector === undefined) {
      return 0;
    }

    check(callback, Match.Optional(Function));
    const files = this.collection.find(selector);

    if (files.count() > 0) {
      files.forEach(file => {
        this.unlink(file);
      });
    } else {
      callback && callback(new Meteor.Error(404, 'Cursor is empty, no files is removed'));
      return this;
    }

    if (this.onAfterRemove) {
      const docs = files.fetch();
      const self = this;
      this.collection.remove(selector, function () {
        callback && callback.apply(this, arguments);
        self.onAfterRemove(docs);
      });
    } else {
      this.collection.remove(selector, callback || NOOP);
    }

    return this;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name deny
     * @param {Object} rules
     * @see  https://docs.meteor.com/api/collections.html#Mongo-Collection-deny
     * @summary link Mongo.Collection deny methods
     * @returns {Mongo.Collection} Instance
     */

  deny(rules) {
    this.collection.deny(rules);
    return this.collection;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name allow
     * @param {Object} rules
     * @see https://docs.meteor.com/api/collections.html#Mongo-Collection-allow
     * @summary link Mongo.Collection allow methods
     * @returns {Mongo.Collection} Instance
     */

  allow(rules) {
    this.collection.allow(rules);
    return this.collection;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name denyClient
     * @see https://docs.meteor.com/api/collections.html#Mongo-Collection-deny
     * @summary Shorthands for Mongo.Collection deny method
     * @returns {Mongo.Collection} Instance
     */

  denyClient() {
    this.collection.deny({
      insert() {
        return true;
      },

      update() {
        return true;
      },

      remove() {
        return true;
      }

    });
    return this.collection;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name allowClient
     * @see https://docs.meteor.com/api/collections.html#Mongo-Collection-allow
     * @summary Shorthands for Mongo.Collection allow method
     * @returns {Mongo.Collection} Instance
     */

  allowClient() {
    this.collection.allow({
      insert() {
        return true;
      },

      update() {
        return true;
      },

      remove() {
        return true;
      }

    });
    return this.collection;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name unlink
     * @param {Object} fileRef - fileObj
     * @param {String} version - [Optional] file's version
     * @param {Function} callback - [Optional] callback function
     * @summary Unlink files and it's versions from FS
     * @returns {FilesCollection} Instance
     */

  unlink(fileRef, version, callback) {
    this._debug(`[FilesCollection] [unlink(${fileRef._id}, ${version})]`);

    if (version) {
      if (_.isObject(fileRef.versions) && _.isObject(fileRef.versions[version]) && fileRef.versions[version].path) {
        fs.unlink(fileRef.versions[version].path, callback || NOOP);
      }
    } else {
      if (_.isObject(fileRef.versions)) {
        _.each(fileRef.versions, vRef => bound(() => {
          fs.unlink(vRef.path, callback || NOOP);
        }));
      } else {
        fs.unlink(fileRef.path, callback || NOOP);
      }
    }

    return this;
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name _404
     * @summary Internal method, used to return 404 error
     * @returns {undefined}
     */

  _404(http) {
    this._debug(`[FilesCollection] [download(${http.request.originalUrl})] [_404] File not found`);

    const text = 'File Not Found :(';

    if (!http.response.headersSent) {
      http.response.writeHead(404, {
        'Content-Type': 'text/plain',
        'Content-Length': text.length
      });
    }

    if (!http.response.finished) {
      http.response.end(text);
    }
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name download
     * @param {Object} http    - Server HTTP object
     * @param {String} version - Requested file version
     * @param {Object} fileRef - Requested file Object
     * @summary Initiates the HTTP response
     * @returns {undefined}
     */

  download(http, version = 'original', fileRef) {
    let vRef;

    this._debug(`[FilesCollection] [download(${http.request.originalUrl}, ${version})]`);

    if (fileRef) {
      if (_.has(fileRef, 'versions') && _.has(fileRef.versions, version)) {
        vRef = fileRef.versions[version];
        vRef._id = fileRef._id;
      } else {
        vRef = fileRef;
      }
    } else {
      vRef = false;
    }

    if (!vRef || !_.isObject(vRef)) {
      return this._404(http);
    } else if (fileRef) {
      if (this.downloadCallback) {
        if (!this.downloadCallback.call(_.extend(http, this._getUser(http)), fileRef)) {
          return this._404(http);
        }
      }

      if (this.interceptDownload && _.isFunction(this.interceptDownload)) {
        if (this.interceptDownload(http, fileRef, version) === true) {
          return void 0;
        }
      }

      fs.stat(vRef.path, (statErr, stats) => bound(() => {
        let responseType;

        if (statErr || !stats.isFile()) {
          return this._404(http);
        }

        if (stats.size !== vRef.size && !this.integrityCheck) {
          vRef.size = stats.size;
        }

        if (stats.size !== vRef.size && this.integrityCheck) {
          responseType = '400';
        }

        return this.serve(http, fileRef, vRef, version, null, responseType || '200');
      }));
      return void 0;
    }

    return this._404(http);
  } /*
     * @locus Server
     * @memberOf FilesCollection
     * @name serve
     * @param {Object} http    - Server HTTP object
     * @param {Object} fileRef - Requested file Object
     * @param {Object} vRef    - Requested file version Object
     * @param {String} version - Requested file version
     * @param {stream.Readable|null} readableStream - Readable stream, which serves binary file data
     * @param {String} responseType - Response code
     * @param {Boolean} force200 - Force 200 response code over 206
     * @summary Handle and reply to incoming request
     * @returns {undefined}
     */

  serve(http, fileRef, vRef, version = 'original', readableStream = null, responseType = '200', force200 = false) {
    let partiral = false;
    let reqRange = false;
    let dispositionType = '';
    let start;
    let end;
    let take;

    if (http.params.query.download && http.params.query.download === 'true') {
      dispositionType = 'attachment; ';
    } else {
      dispositionType = 'inline; ';
    }

    const dispositionName = `filename=\"${encodeURI(vRef.name || fileRef.name)}\"; filename*=UTF-8''${encodeURI(vRef.name || fileRef.name)}; `;
    const dispositionEncoding = 'charset=UTF-8';

    if (!http.response.headersSent) {
      http.response.setHeader('Content-Disposition', dispositionType + dispositionName + dispositionEncoding);
    }

    if (http.request.headers.range && !force200) {
      partiral = true;
      const array = http.request.headers.range.split(/bytes=([0-9]*)-([0-9]*)/);
      start = parseInt(array[1]);
      end = parseInt(array[2]);

      if (isNaN(end)) {
        end = vRef.size - 1;
      }

      take = end - start;
    } else {
      start = 0;
      end = vRef.size - 1;
      take = vRef.size;
    }

    if (partiral || http.params.query.play && http.params.query.play === 'true') {
      reqRange = {
        start,
        end
      };

      if (isNaN(start) && !isNaN(end)) {
        reqRange.start = end - take;
        reqRange.end = end;
      }

      if (!isNaN(start) && isNaN(end)) {
        reqRange.start = start;
        reqRange.end = start + take;
      }

      if (start + take >= vRef.size) {
        reqRange.end = vRef.size - 1;
      }

      if (this.strict && (reqRange.start >= vRef.size - 1 || reqRange.end > vRef.size - 1)) {
        responseType = '416';
      } else {
        responseType = '206';
      }
    } else {
      responseType = '200';
    }

    const streamErrorHandler = error => {
      this._debug(`[FilesCollection] [serve(${vRef.path}, ${version})] [500]`, error);

      if (!http.response.finished) {
        http.response.end(error.toString());
      }
    };

    const headers = _.isFunction(this.responseHeaders) ? this.responseHeaders(responseType, fileRef, vRef, version) : this.responseHeaders;

    if (!headers['Cache-Control']) {
      if (!http.response.headersSent) {
        http.response.setHeader('Cache-Control', this.cacheControl);
      }
    }

    for (let key in headers) {
      if (!http.response.headersSent) {
        http.response.setHeader(key, headers[key]);
      }
    }

    const respond = (stream, code) => {
      if (!http.response.headersSent && readableStream) {
        http.response.writeHead(code);
      }

      http.response.on('close', () => {
        if (typeof stream.abort === 'function') {
          stream.abort();
        }

        if (typeof stream.end === 'function') {
          stream.end();
        }
      });
      http.request.on('aborted', () => {
        http.request.aborted = true;

        if (typeof stream.abort === 'function') {
          stream.abort();
        }

        if (typeof stream.end === 'function') {
          stream.end();
        }
      });
      stream.on('open', () => {
        if (!http.response.headersSent) {
          http.response.writeHead(code);
        }
      }).on('abort', () => {
        if (!http.response.finished) {
          http.response.end();
        }

        if (!http.request.aborted) {
          http.request.destroy();
        }
      }).on('error', streamErrorHandler).on('end', () => {
        if (!http.response.finished) {
          http.response.end();
        }
      }).pipe(http.response);
    };

    switch (responseType) {
      case '400':
        this._debug(`[FilesCollection] [serve(${vRef.path}, ${version})] [400] Content-Length mismatch!`);

        var text = 'Content-Length mismatch!';

        if (!http.response.headersSent) {
          http.response.writeHead(400, {
            'Content-Type': 'text/plain',
            'Content-Length': text.length
          });
        }

        if (!http.response.finished) {
          http.response.end(text);
        }

        break;

      case '404':
        this._404(http);

        break;

      case '416':
        this._debug(`[FilesCollection] [serve(${vRef.path}, ${version})] [416] Content-Range is not specified!`);

        if (!http.response.headersSent) {
          http.response.writeHead(416);
        }

        if (!http.response.finished) {
          http.response.end();
        }

        break;

      case '206':
        this._debug(`[FilesCollection] [serve(${vRef.path}, ${version})] [206]`);

        if (!http.response.headersSent) {
          http.response.setHeader('Content-Range', `bytes ${reqRange.start}-${reqRange.end}/${vRef.size}`);
        }

        respond(readableStream || fs.createReadStream(vRef.path, {
          start: reqRange.start,
          end: reqRange.end
        }), 206);
        break;

      default:
        this._debug(`[FilesCollection] [serve(${vRef.path}, ${version})] [200]`);

        respond(readableStream || fs.createReadStream(vRef.path), 200);
        break;
    }
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/core.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FilesCollectionCore
});

let _;

module.watch(require("meteor/underscore"), {
  _(v) {
    _ = v;
  }

}, 0);
let EventEmitter;
module.watch(require("eventemitter3"), {
  EventEmitter(v) {
    EventEmitter = v;
  }

}, 1);
let formatFleURL;
module.watch(require("./lib.js"), {
  formatFleURL(v) {
    formatFleURL = v;
  }

}, 2);
let check, Match;
module.watch(require("meteor/check"), {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 3);
let FilesCursor, FileCursor;
module.watch(require("./cursor.js"), {
  FilesCursor(v) {
    FilesCursor = v;
  },

  FileCursor(v) {
    FileCursor = v;
  }

}, 4);

class FilesCollectionCore extends EventEmitter {
  constructor() {
    super();
  }

  /*
   * @locus Anywhere
   * @memberOf FilesCollectionCore
   * @name _debug
   * @summary Print logs in debug mode
   * @returns {void}
   */_debug() {
    if (this.debug) {
      (console.info || console.log || function () {}).apply(undefined, arguments);
    }
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name _getFileName
     * @param {Object} fileData - File Object
     * @summary Returns file's name
     * @returns {String}
     */

  _getFileName(fileData) {
    const fileName = fileData.name || fileData.fileName;

    if (_.isString(fileName) && fileName.length > 0) {
      return (fileData.name || fileData.fileName).replace(/\.\./g, '').replace(/\//g, '');
    }

    return '';
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name _getExt
     * @param {String} FileName - File name
     * @summary Get extension from FileName
     * @returns {Object}
     */

  _getExt(fileName) {
    if (!!~fileName.indexOf('.')) {
      const extension = (fileName.split('.').pop().split('?')[0] || '').toLowerCase();
      return {
        ext: extension,
        extension,
        extensionWithDot: `.${extension}`
      };
    }

    return {
      ext: '',
      extension: '',
      extensionWithDot: ''
    };
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name _updateFileTypes
     * @param {Object} data - File data
     * @summary Internal method. Classify file based on 'type' field
     */

  _updateFileTypes(data) {
    data.isVideo = /^video\//i.test(data.type);
    data.isAudio = /^audio\//i.test(data.type);
    data.isImage = /^image\//i.test(data.type);
    data.isText = /^text\//i.test(data.type);
    data.isJSON = /^application\/json$/i.test(data.type);
    data.isPDF = /^application\/(x-)?pdf$/i.test(data.type);
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name _dataToSchema
     * @param {Object} data - File data
     * @summary Internal method. Build object in accordance with default schema from File data
     * @returns {Object}
     */

  _dataToSchema(data) {
    const ds = {
      name: data.name,
      extension: data.extension,
      path: data.path,
      meta: data.meta,
      type: data.type,
      size: data.size,
      userId: data.userId || null,
      versions: {
        original: {
          path: data.path,
          size: data.size,
          type: data.type,
          extension: data.extension
        }
      },
      _downloadRoute: data._downloadRoute || this.downloadRoute,
      _collectionName: data._collectionName || this.collectionName
    }; //Optional fileId

    if (data.fileId) {
      ds._id = data.fileId;
    }

    this._updateFileTypes(ds);

    ds._storagePath = data._storagePath || this.storagePath(_.extend(data, ds));
    return ds;
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name findOne
     * @param {String|Object} selector - Mongo-Style selector (http://docs.meteor.com/api/collections.html#selectors)
     * @param {Object} options - Mongo-Style selector Options (http://docs.meteor.com/api/collections.html#sortspecifiers)
     * @summary Find and return Cursor for matching document Object
     * @returns {FileCursor} Instance
     */

  findOne(selector = {}, options) {
    this._debug(`[FilesCollection] [findOne(${JSON.stringify(selector)}, ${JSON.stringify(options)})]`);

    check(selector, Match.Optional(Match.OneOf(Object, String, Boolean, Number, null)));
    check(options, Match.Optional(Object));
    const doc = this.collection.findOne(selector, options);

    if (doc) {
      return new FileCursor(doc, this);
    }

    return doc;
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name find
     * @param {String|Object} selector - Mongo-Style selector (http://docs.meteor.com/api/collections.html#selectors)
     * @param {Object}        options  - Mongo-Style selector Options (http://docs.meteor.com/api/collections.html#sortspecifiers)
     * @summary Find and return Cursor for matching documents
     * @returns {FilesCursor} Instance
     */

  find(selector = {}, options) {
    this._debug(`[FilesCollection] [find(${JSON.stringify(selector)}, ${JSON.stringify(options)})]`);

    check(selector, Match.Optional(Match.OneOf(Object, String, Boolean, Number, null)));
    check(options, Match.Optional(Object));
    return new FilesCursor(selector, options, this);
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name update
     * @see http://docs.meteor.com/#/full/update
     * @summary link Mongo.Collection update method
     * @returns {Mongo.Collection} Instance
     */

  update() {
    this.collection.update.apply(this.collection, arguments);
    return this.collection;
  } /*
     * @locus Anywhere
     * @memberOf FilesCollectionCore
     * @name link
     * @param {Object} fileRef - File reference object
     * @param {String} version - Version of file you would like to request
     * @summary Returns downloadable URL
     * @returns {String} Empty string returned in case if file not found in DB
     */

  link(fileRef, version = 'original') {
    this._debug(`[FilesCollection] [link(${_.isObject(fileRef) ? fileRef._id : undefined}, ${version})]`);

    check(fileRef, Object);
    check(version, String);

    if (!fileRef) {
      return '';
    }

    return formatFleURL(fileRef, version);
  }

}

FilesCollectionCore.schema = {
  size: {
    type: Number
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  path: {
    type: String
  },
  isVideo: {
    type: Boolean
  },
  isAudio: {
    type: Boolean
  },
  isImage: {
    type: Boolean
  },
  isText: {
    type: Boolean
  },
  isJSON: {
    type: Boolean
  },
  isPDF: {
    type: Boolean
  },
  extension: {
    type: String,
    optional: true
  },
  _storagePath: {
    type: String
  },
  _downloadRoute: {
    type: String
  },
  _collectionName: {
    type: String
  },
  public: {
    type: Boolean,
    optional: true
  },
  meta: {
    type: Object,
    blackbox: true,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  versions: {
    type: Object,
    blackbox: true
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/cursor.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  FileCursor: () => FileCursor,
  FilesCursor: () => FilesCursor
});

let _;

module.watch(require("meteor/underscore"), {
  _(v) {
    _ = v;
  }

}, 0);
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 1);

class FileCursor {
  constructor(_fileRef, _collection) {
    this._fileRef = _fileRef;
    this._collection = _collection;

    _.extend(this, _fileRef);
  } /*
     * @locus Anywhere
     * @memberOf FileCursor
     * @name remove
     * @param callback {Function} - Triggered asynchronously after item is removed or failed to be removed
     * @summary Remove document
     * @returns {FileCursor}
     */

  remove(callback) {
    this._collection._debug('[FilesCollection] [FileCursor] [remove()]');

    if (this._fileRef) {
      this._collection.remove(this._fileRef._id, callback);
    } else {
      callback && callback(new Meteor.Error(404, 'No such file'));
    }

    return this;
  } /*
     * @locus Anywhere
     * @memberOf FileCursor
     * @name link
     * @param version {String} - Name of file's subversion
     * @summary Returns downloadable URL to File
     * @returns {String}
     */

  link(version = 'original') {
    this._collection._debug(`[FilesCollection] [FileCursor] [link(${version})]`);

    if (this._fileRef) {
      return this._collection.link(this._fileRef, version);
    }

    return '';
  } /*
     * @locus Anywhere
     * @memberOf FileCursor
     * @name get
     * @param property {String} - Name of sub-object property
     * @summary Returns current document as a plain Object, if `property` is specified - returns value of sub-object property
     * @returns {Object|mix}
     */

  get(property) {
    this._collection._debug(`[FilesCollection] [FileCursor] [get(${property})]`);

    if (property) {
      return this._fileRef[property];
    }

    return this._fileRef;
  } /*
     * @locus Anywhere
     * @memberOf FileCursor
     * @name fetch
     * @summary Returns document as plain Object in Array
     * @returns {[Object]}
     */

  fetch() {
    this._collection._debug('[FilesCollection] [FileCursor] [fetch()]');

    return [this._fileRef];
  } /*
     * @locus Anywhere
     * @memberOf FileCursor
     * @name with
     * @summary Returns reactive version of current FileCursor, useful to use with `{{#with}}...{{/with}}` block template helper
     * @returns {[Object]}
     */

  with() {
    this._collection._debug('[FilesCollection] [FileCursor] [with()]');

    return _.extend(this, this._collection.collection.findOne(this._fileRef._id));
  }

}

class FilesCursor {
  constructor(_selector = {}, options, _collection) {
    this._collection = _collection;
    this._selector = _selector;
    this._current = -1;
    this.cursor = this._collection.collection.find(this._selector, options);
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name get
     * @summary Returns all matching document(s) as an Array. Alias of `.fetch()`
     * @returns {[Object]}
     */

  get() {
    this._collection._debug('[FilesCollection] [FilesCursor] [get()]');

    return this.cursor.fetch();
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name hasNext
     * @summary Returns `true` if there is next item available on Cursor
     * @returns {Boolean}
     */

  hasNext() {
    this._collection._debug('[FilesCollection] [FilesCursor] [hasNext()]');

    return this._current < this.cursor.count() - 1;
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name next
     * @summary Returns next item on Cursor, if available
     * @returns {Object|undefined}
     */

  next() {
    this._collection._debug('[FilesCollection] [FilesCursor] [next()]');

    this.cursor.fetch()[++this._current];
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name hasPrevious
     * @summary Returns `true` if there is previous item available on Cursor
     * @returns {Boolean}
     */

  hasPrevious() {
    this._collection._debug('[FilesCollection] [FilesCursor] [hasPrevious()]');

    return this._current !== -1;
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name previous
     * @summary Returns previous item on Cursor, if available
     * @returns {Object|undefined}
     */

  previous() {
    this._collection._debug('[FilesCollection] [FilesCursor] [previous()]');

    this.cursor.fetch()[--this._current];
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name fetch
     * @summary Returns all matching document(s) as an Array.
     * @returns {[Object]}
     */

  fetch() {
    this._collection._debug('[FilesCollection] [FilesCursor] [fetch()]');

    return this.cursor.fetch() || [];
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name first
     * @summary Returns first item on Cursor, if available
     * @returns {Object|undefined}
     */

  first() {
    this._collection._debug('[FilesCollection] [FilesCursor] [first()]');

    this._current = 0;
    return this.fetch()[this._current];
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name last
     * @summary Returns last item on Cursor, if available
     * @returns {Object|undefined}
     */

  last() {
    this._collection._debug('[FilesCollection] [FilesCursor] [last()]');

    this._current = this.count() - 1;
    return this.fetch()[this._current];
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name count
     * @summary Returns the number of documents that match a query
     * @returns {Number}
     */

  count() {
    this._collection._debug('[FilesCollection] [FilesCursor] [count()]');

    return this.cursor.count();
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name remove
     * @param callback {Function} - Triggered asynchronously after item is removed or failed to be removed
     * @summary Removes all documents that match a query
     * @returns {FilesCursor}
     */

  remove(callback) {
    this._collection._debug('[FilesCollection] [FilesCursor] [remove()]');

    this._collection.remove(this._selector, callback);

    return this;
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name forEach
     * @param callback {Function} - Function to call. It will be called with three arguments: the `file`, a 0-based index, and cursor itself
     * @param context {Object} - An object which will be the value of `this` inside `callback`
     * @summary Call `callback` once for each matching document, sequentially and synchronously.
     * @returns {undefined}
     */

  forEach(callback, context = {}) {
    this._collection._debug('[FilesCollection] [FilesCursor] [forEach()]');

    this.cursor.forEach(callback, context);
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name each
     * @summary Returns an Array of FileCursor made for each document on current cursor
     *          Useful when using in {{#each FilesCursor#each}}...{{/each}} block template helper
     * @returns {[FileCursor]}
     */

  each() {
    return this.map(file => {
      return new FileCursor(file, this._collection);
    });
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name map
     * @param callback {Function} - Function to call. It will be called with three arguments: the `file`, a 0-based index, and cursor itself
     * @param context {Object} - An object which will be the value of `this` inside `callback`
     * @summary Map `callback` over all matching documents. Returns an Array.
     * @returns {Array}
     */

  map(callback, context = {}) {
    this._collection._debug('[FilesCollection] [FilesCursor] [map()]');

    return this.cursor.map(callback, context);
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name current
     * @summary Returns current item on Cursor, if available
     * @returns {Object|undefined}
     */

  current() {
    this._collection._debug('[FilesCollection] [FilesCursor] [current()]');

    if (this._current < 0) {
      this._current = 0;
    }

    return this.fetch()[this._current];
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name observe
     * @param callbacks {Object} - Functions to call to deliver the result set as it changes
     * @summary Watch a query. Receive callbacks as the result set changes.
     * @url http://docs.meteor.com/api/collections.html#Mongo-Cursor-observe
     * @returns {Object} - live query handle
     */

  observe(callbacks) {
    this._collection._debug('[FilesCollection] [FilesCursor] [observe()]');

    return this.cursor.observe(callbacks);
  } /*
     * @locus Anywhere
     * @memberOf FilesCursor
     * @name observeChanges
     * @param callbacks {Object} - Functions to call to deliver the result set as it changes
     * @summary Watch a query. Receive callbacks as the result set changes. Only the differences between the old and new documents are passed to the callbacks.
     * @url http://docs.meteor.com/api/collections.html#Mongo-Cursor-observeChanges
     * @returns {Object} - live query handle
     */

  observeChanges(callbacks) {
    this._collection._debug('[FilesCollection] [FilesCursor] [observeChanges()]');

    return this.cursor.observeChanges(callbacks);
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/lib.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  fixJSONParse: () => fixJSONParse,
  fixJSONStringify: () => fixJSONStringify,
  formatFleURL: () => formatFleURL
});

let _;

module.watch(require("meteor/underscore"), {
  _(v) {
    _ = v;
  }

}, 0);
let check;
module.watch(require("meteor/check"), {
  check(v) {
    check = v;
  }

}, 1);

/*
 * @const {Function} fixJSONParse - Fix issue with Date parse
 */const fixJSONParse = function (obj) {
  for (let key in obj) {
    if (_.isString(obj[key]) && !!~obj[key].indexOf('=--JSON-DATE--=')) {
      obj[key] = obj[key].replace('=--JSON-DATE--=', '');
      obj[key] = new Date(parseInt(obj[key]));
    } else if (_.isObject(obj[key])) {
      obj[key] = fixJSONParse(obj[key]);
    } else if (_.isArray(obj[key])) {
      let v;

      for (let i = 0; i < obj[key].length; i++) {
        v = obj[key][i];

        if (_.isObject(v)) {
          obj[key][i] = fixJSONParse(v);
        } else if (_.isString(v) && !!~v.indexOf('=--JSON-DATE--=')) {
          v = v.replace('=--JSON-DATE--=', '');
          obj[key][i] = new Date(parseInt(v));
        }
      }
    }
  }

  return obj;
}; /*
    * @const {Function} fixJSONStringify - Fix issue with Date stringify
    */

const fixJSONStringify = function (obj) {
  for (let key in obj) {
    if (_.isDate(obj[key])) {
      obj[key] = `=--JSON-DATE--=${+obj[key]}`;
    } else if (_.isObject(obj[key])) {
      obj[key] = fixJSONStringify(obj[key]);
    } else if (_.isArray(obj[key])) {
      let v;

      for (let i = 0; i < obj[key].length; i++) {
        v = obj[key][i];

        if (_.isObject(v)) {
          obj[key][i] = fixJSONStringify(v);
        } else if (_.isDate(v)) {
          obj[key][i] = `=--JSON-DATE--=${+v}`;
        }
      }
    }
  }

  return obj;
}; /*
    * @locus Anywhere
    * @private
    * @name formatFleURL
    * @param {Object} fileRef - File reference object
    * @param {String} version - [Optional] Version of file you would like build URL for
    * @summary Returns formatted URL for file
    * @returns {String} Downloadable link
    */

const formatFleURL = (fileRef, version = 'original') => {
  let ext;
  check(fileRef, Object);
  check(version, String);

  const _root = __meteor_runtime_config__.ROOT_URL.replace(/\/+$/, '');

  const vRef = fileRef.versions && fileRef.versions[version] || fileRef;

  if (vRef.extension && _.isString(vRef, 'extension')) {
    ext = `.${vRef.extension.replace(/^\./, '')}`;
  } else {
    ext = '';
  }

  if (fileRef.public === true) {
    return _root + (version === 'original' ? `${fileRef._downloadRoute}/${fileRef._id}${ext}` : `${fileRef._downloadRoute}/${version}-${fileRef._id}${ext}`);
  }

  return _root + `${fileRef._downloadRoute}/${fileRef._collectionName}/${fileRef._id}/${version}/${fileRef._id}${ext}`;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"write-stream.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ostrio_files/write-stream.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => WriteStream
});
let fs;
module.watch(require("fs-extra"), {
  default(v) {
    fs = v;
  }

}, 0);

let _;

module.watch(require("meteor/underscore"), {
  _(v) {
    _ = v;
  }

}, 1);
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 2);

const NOOP = () => {}; /*
                        * @const {Object} bound   - Meteor.bindEnvironment (Fiber wrapper)
                        * @const {Object} fdCache - File Descriptors Cache
                        */

const bound = Meteor.bindEnvironment(callback => callback());
const fdCache = {}; /*
                     * @private
                     * @locus Server
                     * @class WriteStream
                     * @param path      {String} - Path to file on FS
                     * @param maxLength {Number} - Max amount of chunks in stream
                     * @param file      {Object} - fileRef Object
                     * @summary writableStream wrapper class, makes sure chunks is written in given order. Implementation of queue stream.
                     */

class WriteStream {
  constructor(path, maxLength, file, permissions) {
    this.path = path;
    this.maxLength = maxLength;
    this.file = file;
    this.permissions = permissions;

    if (!this.path || !_.isString(this.path)) {
      return;
    }

    this.fd = null;
    this.writtenChunks = 0;
    this.ended = false;
    this.aborted = false;

    if (fdCache[this.path] && !fdCache[this.path].ended && !fdCache[this.path].aborted) {
      this.fd = fdCache[this.path].fd;
      this.writtenChunks = fdCache[this.path].writtenChunks;
    } else {
      fs.ensureFile(this.path, efError => {
        bound(() => {
          if (efError) {
            throw new Meteor.Error(500, '[FilesCollection] [writeStream] [ensureFile] [Error:]', efError);
          } else {
            fs.open(this.path, 'r+', this.permissions, (oError, fd) => {
              bound(() => {
                if (oError) {
                  throw new Meteor.Error(500, '[FilesCollection] [writeStream] [ensureFile] [open] [Error:]', oError);
                } else {
                  this.fd = fd;
                  fdCache[this.path] = this;
                }
              });
            });
          }
        });
      });
    }
  } /*
     * @memberOf writeStream
     * @name write
     * @param {Number} num - Chunk position in a stream
     * @param {Buffer} chunk - Buffer (chunk binary data)
     * @param {Function} callback - Callback
     * @summary Write chunk in given order
     * @returns {Boolean} - True if chunk is sent to stream, false if chunk is set into queue
     */

  write(num, chunk, callback) {
    if (!this.aborted && !this.ended) {
      if (this.fd) {
        fs.write(this.fd, chunk, 0, chunk.length, (num - 1) * this.file.chunkSize, (error, written, buffer) => {
          bound(() => {
            callback && callback(error, written, buffer);

            if (error) {
              console.warn('[FilesCollection] [writeStream] [write] [Error:]', error);
              this.abort();
            } else {
              ++this.writtenChunks;
            }
          });
        });
      } else {
        Meteor.setTimeout(() => {
          this.write(num, chunk, callback);
        }, 25);
      }
    }

    return false;
  } /*
     * @memberOf writeStream
     * @name end
     * @param {Function} callback - Callback
     * @summary Finishes writing to writableStream, only after all chunks in queue is written
     * @returns {Boolean} - True if stream is fulfilled, false if queue is in progress
     */

  end(callback) {
    if (!this.aborted && !this.ended) {
      if (this.writtenChunks === this.maxLength) {
        fs.close(this.fd, () => {
          bound(() => {
            delete fdCache[this.path];
            this.ended = true;
            callback && callback(void 0, true);
          });
        });
        return true;
      }

      fs.stat(this.path, (error, stat) => {
        bound(() => {
          if (!error && stat) {
            this.writtenChunks = Math.ceil(stat.size / this.file.chunkSize);
          }

          return Meteor.setTimeout(() => {
            this.end(callback);
          }, 25);
        });
      });
    } else {
      callback && callback(void 0, this.ended);
    }

    return false;
  } /*
     * @memberOf writeStream
     * @name abort
     * @param {Function} callback - Callback
     * @summary Aborts writing to writableStream, removes created file
     * @returns {Boolean} - True
     */

  abort(callback) {
    this.aborted = true;
    delete fdCache[this.path];
    fs.unlink(this.path, callback || NOOP);
    return true;
  } /*
     * @memberOf writeStream
     * @name stop
     * @summary Stop writing to writableStream
     * @returns {Boolean} - True
     */

  stop() {
    this.aborted = true;
    delete fdCache[this.path];
    return true;
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"fs-extra":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// ../../.1.9.4.8m7w47.4qi18++os+web.browser+web.cordova/npm/node_modules/fs-extra/package.json                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.name = "fs-extra";
exports.version = "4.0.3";
exports.main = "./lib/index.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ostrio_files/node_modules/fs-extra/lib/index.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict'

const assign = require('./util/assign')

const fs = {}

// Export graceful-fs:
assign(fs, require('./fs'))
// Export extra methods:
assign(fs, require('./copy'))
assign(fs, require('./copy-sync'))
assign(fs, require('./mkdirs'))
assign(fs, require('./remove'))
assign(fs, require('./json'))
assign(fs, require('./move'))
assign(fs, require('./move-sync'))
assign(fs, require('./empty'))
assign(fs, require('./ensure'))
assign(fs, require('./output'))
assign(fs, require('./path-exists'))

module.exports = fs

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"eventemitter3":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// ../../.1.9.4.8m7w47.4qi18++os+web.browser+web.cordova/npm/node_modules/eventemitter3/package.json                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.name = "eventemitter3";
exports.version = "3.0.0";
exports.main = "index.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ostrio_files/node_modules/eventemitter3/index.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"request":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// ../../.1.9.4.8m7w47.4qi18++os+web.browser+web.cordova/npm/node_modules/request/package.json                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.name = "request";
exports.version = "2.83.0";
exports.main = "index.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ostrio_files/node_modules/request/index.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Copyright 2010-2012 Mikeal Rogers
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

'use strict'

var extend = require('extend')
var cookies = require('./lib/cookies')
var helpers = require('./lib/helpers')

var paramsHaveRequestBody = helpers.paramsHaveRequestBody

// organize params for patch, post, put, head, del
function initParams (uri, options, callback) {
  if (typeof options === 'function') {
    callback = options
  }

  var params = {}
  if (typeof options === 'object') {
    extend(params, options, {uri: uri})
  } else if (typeof uri === 'string') {
    extend(params, {uri: uri})
  } else {
    extend(params, uri)
  }

  params.callback = callback || params.callback
  return params
}

function request (uri, options, callback) {
  if (typeof uri === 'undefined') {
    throw new Error('undefined is not a valid uri or options object.')
  }

  var params = initParams(uri, options, callback)

  if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
    throw new Error('HTTP HEAD requests MUST NOT include a request body.')
  }

  return new request.Request(params)
}

function verbFunc (verb) {
  var method = verb.toUpperCase()
  return function (uri, options, callback) {
    var params = initParams(uri, options, callback)
    params.method = method
    return request(params, params.callback)
  }
}

// define like this to please codeintel/intellisense IDEs
request.get = verbFunc('get')
request.head = verbFunc('head')
request.options = verbFunc('options')
request.post = verbFunc('post')
request.put = verbFunc('put')
request.patch = verbFunc('patch')
request.del = verbFunc('delete')
request['delete'] = verbFunc('delete')

request.jar = function (store) {
  return cookies.jar(store)
}

request.cookie = function (str) {
  return cookies.parse(str)
}

function wrapRequestMethod (method, options, requester, verb) {
  return function (uri, opts, callback) {
    var params = initParams(uri, opts, callback)

    var target = {}
    extend(true, target, options, params)

    target.pool = params.pool || options.pool

    if (verb) {
      target.method = verb.toUpperCase()
    }

    if (typeof requester === 'function') {
      method = requester
    }

    return method(target, target.callback)
  }
}

request.defaults = function (options, requester) {
  var self = this

  options = options || {}

  if (typeof options === 'function') {
    requester = options
    options = {}
  }

  var defaults = wrapRequestMethod(self, options, requester)

  var verbs = ['get', 'head', 'post', 'put', 'patch', 'del', 'delete']
  verbs.forEach(function (verb) {
    defaults[verb] = wrapRequestMethod(self[verb], options, requester, verb)
  })

  defaults.cookie = wrapRequestMethod(self.cookie, options, requester)
  defaults.jar = self.jar
  defaults.defaults = self.defaults
  return defaults
}

request.forever = function (agentOptions, optionsArg) {
  var options = {}
  if (optionsArg) {
    extend(options, optionsArg)
  }
  if (agentOptions) {
    options.agentOptions = agentOptions
  }

  options.forever = true
  return request.defaults(options)
}

// Exports

module.exports = request
request.Request = require('./request')
request.initParams = initParams

// Backwards compatibility for request.debug
Object.defineProperty(request, 'debug', {
  enumerable: true,
  get: function () {
    return request.Request.debug
  },
  set: function (debug) {
    request.Request.debug = debug
  }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"file-type":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ostrio_files/node_modules/file-type/index.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
const toBytes = s => Array.from(s).map(c => c.charCodeAt(0));
const xpiZipFilename = toBytes('META-INF/mozilla.rsa');
const oxmlContentTypes = toBytes('[Content_Types].xml');
const oxmlRels = toBytes('_rels/.rels');

module.exports = input => {
	const buf = (input instanceof Uint8Array) ? input : new Uint8Array(input);

	if (!(buf && buf.length > 1)) {
		return null;
	}

	const check = (header, options) => {
		options = Object.assign({
			offset: 0
		}, options);

		for (let i = 0; i < header.length; i++) {
			// If a bitmask is set
			if (options.mask) {
				// If header doesn't equal `buf` with bits masked off
				if (header[i] !== (options.mask[i] & buf[i + options.offset])) {
					return false;
				}
			} else if (header[i] !== buf[i + options.offset]) {
				return false;
			}
		}

		return true;
	};

	const checkString = (header, options) => check(toBytes(header), options);

	if (check([0xFF, 0xD8, 0xFF])) {
		return {
			ext: 'jpg',
			mime: 'image/jpeg'
		};
	}

	if (check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
		return {
			ext: 'png',
			mime: 'image/png'
		};
	}

	if (check([0x47, 0x49, 0x46])) {
		return {
			ext: 'gif',
			mime: 'image/gif'
		};
	}

	if (check([0x57, 0x45, 0x42, 0x50], {offset: 8})) {
		return {
			ext: 'webp',
			mime: 'image/webp'
		};
	}

	if (check([0x46, 0x4C, 0x49, 0x46])) {
		return {
			ext: 'flif',
			mime: 'image/flif'
		};
	}

	// Needs to be before `tif` check
	if (
		(check([0x49, 0x49, 0x2A, 0x0]) || check([0x4D, 0x4D, 0x0, 0x2A])) &&
		check([0x43, 0x52], {offset: 8})
	) {
		return {
			ext: 'cr2',
			mime: 'image/x-canon-cr2'
		};
	}

	if (
		check([0x49, 0x49, 0x2A, 0x0]) ||
		check([0x4D, 0x4D, 0x0, 0x2A])
	) {
		return {
			ext: 'tif',
			mime: 'image/tiff'
		};
	}

	if (check([0x42, 0x4D])) {
		return {
			ext: 'bmp',
			mime: 'image/bmp'
		};
	}

	if (check([0x49, 0x49, 0xBC])) {
		return {
			ext: 'jxr',
			mime: 'image/vnd.ms-photo'
		};
	}

	if (check([0x38, 0x42, 0x50, 0x53])) {
		return {
			ext: 'psd',
			mime: 'image/vnd.adobe.photoshop'
		};
	}

	// Zip-based file formats
	// Need to be before the `zip` check
	if (check([0x50, 0x4B, 0x3, 0x4])) {
		if (
			check([0x6D, 0x69, 0x6D, 0x65, 0x74, 0x79, 0x70, 0x65, 0x61, 0x70, 0x70, 0x6C, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x65, 0x70, 0x75, 0x62, 0x2B, 0x7A, 0x69, 0x70], {offset: 30})
		) {
			return {
				ext: 'epub',
				mime: 'application/epub+zip'
			};
		}

		// Assumes signed `.xpi` from addons.mozilla.org
		if (check(xpiZipFilename, {offset: 30})) {
			return {
				ext: 'xpi',
				mime: 'application/x-xpinstall'
			};
		}

		if (checkString('mimetypeapplication/vnd.oasis.opendocument.text', {offset: 30})) {
			return {
				ext: 'odt',
				mime: 'application/vnd.oasis.opendocument.text'
			};
		}

		if (checkString('mimetypeapplication/vnd.oasis.opendocument.spreadsheet', {offset: 30})) {
			return {
				ext: 'ods',
				mime: 'application/vnd.oasis.opendocument.spreadsheet'
			};
		}

		if (checkString('mimetypeapplication/vnd.oasis.opendocument.presentation', {offset: 30})) {
			return {
				ext: 'odp',
				mime: 'application/vnd.oasis.opendocument.presentation'
			};
		}

		// https://github.com/file/file/blob/master/magic/Magdir/msooxml
		if (check(oxmlContentTypes, {offset: 30}) || check(oxmlRels, {offset: 30})) {
			const sliced = buf.subarray(4, 4 + 2000);
			const nextZipHeaderIndex = arr => arr.findIndex((el, i, arr) => arr[i] === 0x50 && arr[i + 1] === 0x4B && arr[i + 2] === 0x3 && arr[i + 3] === 0x4);
			const header2Pos = nextZipHeaderIndex(sliced);

			if (header2Pos !== -1) {
				const slicedAgain = buf.subarray(header2Pos + 8, header2Pos + 8 + 1000);
				const header3Pos = nextZipHeaderIndex(slicedAgain);

				if (header3Pos !== -1) {
					const offset = 8 + header2Pos + header3Pos + 30;

					if (checkString('word/', {offset})) {
						return {
							ext: 'docx',
							mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						};
					}

					if (checkString('ppt/', {offset})) {
						return {
							ext: 'pptx',
							mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
						};
					}

					if (checkString('xl/', {offset})) {
						return {
							ext: 'xlsx',
							mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
						};
					}
				}
			}
		}
	}

	if (
		check([0x50, 0x4B]) &&
		(buf[2] === 0x3 || buf[2] === 0x5 || buf[2] === 0x7) &&
		(buf[3] === 0x4 || buf[3] === 0x6 || buf[3] === 0x8)
	) {
		return {
			ext: 'zip',
			mime: 'application/zip'
		};
	}

	if (check([0x75, 0x73, 0x74, 0x61, 0x72], {offset: 257})) {
		return {
			ext: 'tar',
			mime: 'application/x-tar'
		};
	}

	if (
		check([0x52, 0x61, 0x72, 0x21, 0x1A, 0x7]) &&
		(buf[6] === 0x0 || buf[6] === 0x1)
	) {
		return {
			ext: 'rar',
			mime: 'application/x-rar-compressed'
		};
	}

	if (check([0x1F, 0x8B, 0x8])) {
		return {
			ext: 'gz',
			mime: 'application/gzip'
		};
	}

	if (check([0x42, 0x5A, 0x68])) {
		return {
			ext: 'bz2',
			mime: 'application/x-bzip2'
		};
	}

	if (check([0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C])) {
		return {
			ext: '7z',
			mime: 'application/x-7z-compressed'
		};
	}

	if (check([0x78, 0x01])) {
		return {
			ext: 'dmg',
			mime: 'application/x-apple-diskimage'
		};
	}

	if (check([0x33, 0x67, 0x70, 0x35]) || // 3gp5
		(
			check([0x0, 0x0, 0x0]) && check([0x66, 0x74, 0x79, 0x70], {offset: 4}) &&
				(
					check([0x6D, 0x70, 0x34, 0x31], {offset: 8}) || // MP41
					check([0x6D, 0x70, 0x34, 0x32], {offset: 8}) || // MP42
					check([0x69, 0x73, 0x6F, 0x6D], {offset: 8}) || // ISOM
					check([0x69, 0x73, 0x6F, 0x32], {offset: 8}) || // ISO2
					check([0x6D, 0x6D, 0x70, 0x34], {offset: 8}) || // MMP4
					check([0x4D, 0x34, 0x56], {offset: 8}) || // M4V
					check([0x64, 0x61, 0x73, 0x68], {offset: 8}) // DASH
				)
		)) {
		return {
			ext: 'mp4',
			mime: 'video/mp4'
		};
	}

	if (check([0x4D, 0x54, 0x68, 0x64])) {
		return {
			ext: 'mid',
			mime: 'audio/midi'
		};
	}

	// https://github.com/threatstack/libmagic/blob/master/magic/Magdir/matroska
	if (check([0x1A, 0x45, 0xDF, 0xA3])) {
		const sliced = buf.subarray(4, 4 + 4096);
		const idPos = sliced.findIndex((el, i, arr) => arr[i] === 0x42 && arr[i + 1] === 0x82);

		if (idPos !== -1) {
			const docTypePos = idPos + 3;
			const findDocType = type => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));

			if (findDocType('matroska')) {
				return {
					ext: 'mkv',
					mime: 'video/x-matroska'
				};
			}

			if (findDocType('webm')) {
				return {
					ext: 'webm',
					mime: 'video/webm'
				};
			}
		}
	}

	if (check([0x0, 0x0, 0x0, 0x14, 0x66, 0x74, 0x79, 0x70, 0x71, 0x74, 0x20, 0x20]) ||
		check([0x66, 0x72, 0x65, 0x65], {offset: 4}) ||
		check([0x66, 0x74, 0x79, 0x70, 0x71, 0x74, 0x20, 0x20], {offset: 4}) ||
		check([0x6D, 0x64, 0x61, 0x74], {offset: 4}) || // MJPEG
		check([0x77, 0x69, 0x64, 0x65], {offset: 4})) {
		return {
			ext: 'mov',
			mime: 'video/quicktime'
		};
	}

	if (
		check([0x52, 0x49, 0x46, 0x46]) &&
		check([0x41, 0x56, 0x49], {offset: 8})
	) {
		return {
			ext: 'avi',
			mime: 'video/x-msvideo'
		};
	}

	if (check([0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9])) {
		return {
			ext: 'wmv',
			mime: 'video/x-ms-wmv'
		};
	}

	if (
		check([0x0, 0x0, 0x1, 0xBA]) ||
		check([0x0, 0x0, 0x1, 0xB3])
	) {
		return {
			ext: 'mpg',
			mime: 'video/mpeg'
		};
	}

	if (check([0x0, 0x0, 0x0, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x33, 0x67, 0x70, 0x34])) {
		return {
			ext: '3gp',
			mime: 'video/3gpp'
		};
	}

	// Check for MP3 header at different starting offsets
	for (let start = 0; start < 2 && start < (buf.length - 16); start++) {
		if (
			check([0x49, 0x44, 0x33], {offset: start}) || // ID3 header
			check([0xFF, 0xE2], {offset: start, mask: [0xFF, 0xE2]}) // MPEG 1 or 2 Layer 3 header
		) {
			return {
				ext: 'mp3',
				mime: 'audio/mpeg'
			};
		}
	}

	if (
		check([0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x41], {offset: 4}) ||
		check([0x4D, 0x34, 0x41, 0x20])
	) {
		return {
			ext: 'm4a',
			mime: 'audio/m4a'
		};
	}

	// Needs to be before `ogg` check
	if (check([0x4F, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64], {offset: 28})) {
		return {
			ext: 'opus',
			mime: 'audio/opus'
		};
	}

	// If 'OggS' in first  bytes, then OGG container
	if (check([0x4F, 0x67, 0x67, 0x53])) {
		// This is a OGG container

		// If ' theora' in header.
		if (check([0x80, 0x74, 0x68, 0x65, 0x6F, 0x72, 0x61], {offset: 28})) {
			return {
				ext: 'ogv',
				mime: 'video/ogg'
			};
		}
		// If '\x01video' in header.
		if (check([0x01, 0x76, 0x69, 0x64, 0x65, 0x6F, 0x00], {offset: 28})) {
			return {
				ext: 'ogm',
				mime: 'video/ogg'
			};
		}
		// If ' FLAC' in header  https://xiph.org/flac/faq.html
		if (check([0x7F, 0x46, 0x4C, 0x41, 0x43], {offset: 28})) {
			return {
				ext: 'oga',
				mime: 'audio/ogg'
			};
		}

		// 'Speex  ' in header https://en.wikipedia.org/wiki/Speex
		if (check([0x53, 0x70, 0x65, 0x65, 0x78, 0x20, 0x20], {offset: 28})) {
			return {
				ext: 'spx',
				mime: 'audio/ogg'
			};
		}

		// If '\x01vorbis' in header
		if (check([0x01, 0x76, 0x6F, 0x72, 0x62, 0x69, 0x73], {offset: 28})) {
			return {
				ext: 'ogg',
				mime: 'audio/ogg'
			};
		}

		// Default OGG container https://www.iana.org/assignments/media-types/application/ogg
		return {
			ext: 'ogx',
			mime: 'application/ogg'
		};
	}

	if (check([0x66, 0x4C, 0x61, 0x43])) {
		return {
			ext: 'flac',
			mime: 'audio/x-flac'
		};
	}

	if (
		check([0x52, 0x49, 0x46, 0x46]) &&
		check([0x57, 0x41, 0x56, 0x45], {offset: 8})
	) {
		return {
			ext: 'wav',
			mime: 'audio/x-wav'
		};
	}

	if (check([0x23, 0x21, 0x41, 0x4D, 0x52, 0x0A])) {
		return {
			ext: 'amr',
			mime: 'audio/amr'
		};
	}

	if (check([0x25, 0x50, 0x44, 0x46])) {
		return {
			ext: 'pdf',
			mime: 'application/pdf'
		};
	}

	if (check([0x4D, 0x5A])) {
		return {
			ext: 'exe',
			mime: 'application/x-msdownload'
		};
	}

	if (
		(buf[0] === 0x43 || buf[0] === 0x46) &&
		check([0x57, 0x53], {offset: 1})
	) {
		return {
			ext: 'swf',
			mime: 'application/x-shockwave-flash'
		};
	}

	if (check([0x7B, 0x5C, 0x72, 0x74, 0x66])) {
		return {
			ext: 'rtf',
			mime: 'application/rtf'
		};
	}

	if (check([0x00, 0x61, 0x73, 0x6D])) {
		return {
			ext: 'wasm',
			mime: 'application/wasm'
		};
	}

	if (
		check([0x77, 0x4F, 0x46, 0x46]) &&
		(
			check([0x00, 0x01, 0x00, 0x00], {offset: 4}) ||
			check([0x4F, 0x54, 0x54, 0x4F], {offset: 4})
		)
	) {
		return {
			ext: 'woff',
			mime: 'font/woff'
		};
	}

	if (
		check([0x77, 0x4F, 0x46, 0x32]) &&
		(
			check([0x00, 0x01, 0x00, 0x00], {offset: 4}) ||
			check([0x4F, 0x54, 0x54, 0x4F], {offset: 4})
		)
	) {
		return {
			ext: 'woff2',
			mime: 'font/woff2'
		};
	}

	if (
		check([0x4C, 0x50], {offset: 34}) &&
		(
			check([0x00, 0x00, 0x01], {offset: 8}) ||
			check([0x01, 0x00, 0x02], {offset: 8}) ||
			check([0x02, 0x00, 0x02], {offset: 8})
		)
	) {
		return {
			ext: 'eot',
			mime: 'application/octet-stream'
		};
	}

	if (check([0x00, 0x01, 0x00, 0x00, 0x00])) {
		return {
			ext: 'ttf',
			mime: 'font/ttf'
		};
	}

	if (check([0x4F, 0x54, 0x54, 0x4F, 0x00])) {
		return {
			ext: 'otf',
			mime: 'font/otf'
		};
	}

	if (check([0x00, 0x00, 0x01, 0x00])) {
		return {
			ext: 'ico',
			mime: 'image/x-icon'
		};
	}

	if (check([0x46, 0x4C, 0x56, 0x01])) {
		return {
			ext: 'flv',
			mime: 'video/x-flv'
		};
	}

	if (check([0x25, 0x21])) {
		return {
			ext: 'ps',
			mime: 'application/postscript'
		};
	}

	if (check([0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00])) {
		return {
			ext: 'xz',
			mime: 'application/x-xz'
		};
	}

	if (check([0x53, 0x51, 0x4C, 0x69])) {
		return {
			ext: 'sqlite',
			mime: 'application/x-sqlite3'
		};
	}

	if (check([0x4E, 0x45, 0x53, 0x1A])) {
		return {
			ext: 'nes',
			mime: 'application/x-nintendo-nes-rom'
		};
	}

	if (check([0x43, 0x72, 0x32, 0x34])) {
		return {
			ext: 'crx',
			mime: 'application/x-google-chrome-extension'
		};
	}

	if (
		check([0x4D, 0x53, 0x43, 0x46]) ||
		check([0x49, 0x53, 0x63, 0x28])
	) {
		return {
			ext: 'cab',
			mime: 'application/vnd.ms-cab-compressed'
		};
	}

	// Needs to be before `ar` check
	if (check([0x21, 0x3C, 0x61, 0x72, 0x63, 0x68, 0x3E, 0x0A, 0x64, 0x65, 0x62, 0x69, 0x61, 0x6E, 0x2D, 0x62, 0x69, 0x6E, 0x61, 0x72, 0x79])) {
		return {
			ext: 'deb',
			mime: 'application/x-deb'
		};
	}

	if (check([0x21, 0x3C, 0x61, 0x72, 0x63, 0x68, 0x3E])) {
		return {
			ext: 'ar',
			mime: 'application/x-unix-archive'
		};
	}

	if (check([0xED, 0xAB, 0xEE, 0xDB])) {
		return {
			ext: 'rpm',
			mime: 'application/x-rpm'
		};
	}

	if (
		check([0x1F, 0xA0]) ||
		check([0x1F, 0x9D])
	) {
		return {
			ext: 'Z',
			mime: 'application/x-compress'
		};
	}

	if (check([0x4C, 0x5A, 0x49, 0x50])) {
		return {
			ext: 'lz',
			mime: 'application/x-lzip'
		};
	}

	if (check([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])) {
		return {
			ext: 'msi',
			mime: 'application/x-msi'
		};
	}

	if (check([0x06, 0x0E, 0x2B, 0x34, 0x02, 0x05, 0x01, 0x01, 0x0D, 0x01, 0x02, 0x01, 0x01, 0x02])) {
		return {
			ext: 'mxf',
			mime: 'application/mxf'
		};
	}

	if (check([0x47], {offset: 4}) && (check([0x47], {offset: 192}) || check([0x47], {offset: 196}))) {
		return {
			ext: 'mts',
			mime: 'video/mp2t'
		};
	}

	if (check([0x42, 0x4C, 0x45, 0x4E, 0x44, 0x45, 0x52])) {
		return {
			ext: 'blend',
			mime: 'application/x-blender'
		};
	}

	if (check([0x42, 0x50, 0x47, 0xFB])) {
		return {
			ext: 'bpg',
			mime: 'image/bpg'
		};
	}

	if (check([0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A])) {
		// JPEG-2000 family

		if (check([0x6A, 0x70, 0x32, 0x20], {offset: 20})) {
			return {
				ext: 'jp2',
				mime: 'image/jp2'
			};
		}

		if (check([0x6A, 0x70, 0x78, 0x20], {offset: 20})) {
			return {
				ext: 'jpx',
				mime: 'image/jpx'
			};
		}

		if (check([0x6A, 0x70, 0x6D, 0x20], {offset: 20})) {
			return {
				ext: 'jpm',
				mime: 'image/jpm'
			};
		}

		if (check([0x6D, 0x6A, 0x70, 0x32], {offset: 20})) {
			return {
				ext: 'mj2',
				mime: 'image/mj2'
			};
		}
	}

	if (check([0x46, 0x4F, 0x52, 0x4D, 0x00])) {
		return {
			ext: 'aif',
			mime: 'audio/aiff'
		};
	}

	if (checkString('<?xml ')) {
		return {
			ext: 'xml',
			mime: 'application/xml'
		};
	}

	if (check([0x42, 0x4F, 0x4F, 0x4B, 0x4D, 0x4F, 0x42, 0x49], {offset: 60})) {
		return {
			ext: 'mobi',
			mime: 'application/x-mobipocket-ebook'
		};
	}

	return null;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/ostrio:files/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ostrio:files'] = exports, {
  FilesCollection: FilesCollection
});

})();

//# sourceURL=meteor://💻app/packages/ostrio_files.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZpbGVzL3NlcnZlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZpbGVzL2NvcmUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL29zdHJpbzpmaWxlcy9jdXJzb3IuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL29zdHJpbzpmaWxlcy9saWIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL29zdHJpbzpmaWxlcy93cml0ZS1zdHJlYW0uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiRmlsZXNDb2xsZWN0aW9uIiwiXyIsIndhdGNoIiwicmVxdWlyZSIsInYiLCJNb25nbyIsIldlYkFwcCIsIk1ldGVvciIsIlJhbmRvbSIsIkNvb2tpZXMiLCJXcml0ZVN0cmVhbSIsImRlZmF1bHQiLCJjaGVjayIsIk1hdGNoIiwiRmlsZXNDb2xsZWN0aW9uQ29yZSIsImZpeEpTT05QYXJzZSIsImZpeEpTT05TdHJpbmdpZnkiLCJmcyIsIm5vZGVRcyIsInJlcXVlc3QiLCJmaWxlVHlwZSIsIm5vZGVQYXRoIiwiYm91bmQiLCJiaW5kRW52aXJvbm1lbnQiLCJjYWxsYmFjayIsIk5PT1AiLCJjb25zdHJ1Y3RvciIsImNvbmZpZyIsInN0b3JhZ2VQYXRoIiwiZGVidWciLCJzY2hlbWEiLCJwdWJsaWMiLCJzdHJpY3QiLCJjaHVua1NpemUiLCJwcm90ZWN0ZWQiLCJjb2xsZWN0aW9uIiwicGVybWlzc2lvbnMiLCJjYWNoZUNvbnRyb2wiLCJkb3dubG9hZFJvdXRlIiwib25BZnRlclVwbG9hZCIsIm9uQWZ0ZXJSZW1vdmUiLCJkaXNhYmxlVXBsb2FkIiwib25CZWZvcmVSZW1vdmUiLCJpbnRlZ3JpdHlDaGVjayIsImNvbGxlY3Rpb25OYW1lIiwib25CZWZvcmVVcGxvYWQiLCJuYW1pbmdGdW5jdGlvbiIsInJlc3BvbnNlSGVhZGVycyIsImRpc2FibGVEb3dubG9hZCIsImFsbG93Q2xpZW50Q29kZSIsImRvd25sb2FkQ2FsbGJhY2siLCJvbkluaXRpYXRlVXBsb2FkIiwiaW50ZXJjZXB0RG93bmxvYWQiLCJjb250aW51ZVVwbG9hZFRUTCIsInBhcmVudERpclBlcm1pc3Npb25zIiwic2VsZiIsImNvb2tpZSIsImlzQm9vbGVhbiIsIk1hdGgiLCJmbG9vciIsImlzU3RyaW5nIiwiQ29sbGVjdGlvbiIsIl9uYW1lIiwiZmlsZXNDb2xsZWN0aW9uIiwiU3RyaW5nIiwiRXJyb3IiLCJyZXBsYWNlIiwiaXNGdW5jdGlvbiIsImlzTnVtYmVyIiwicGFyc2VJbnQiLCJpc09iamVjdCIsIl9jdXJyZW50VXBsb2FkcyIsInJlc3BvbnNlQ29kZSIsImZpbGVSZWYiLCJ2ZXJzaW9uUmVmIiwiaGVhZGVycyIsIlByYWdtYSIsIlRyYWlsZXIiLCJzaXplIiwiQ29ubmVjdGlvbiIsInR5cGUiLCJzZXAiLCJzcCIsImFwcGx5IiwiYXJndW1lbnRzIiwibm9ybWFsaXplIiwiX2RlYnVnIiwibWtkaXJzIiwibW9kZSIsImVycm9yIiwiQm9vbGVhbiIsIk51bWJlciIsIkZ1bmN0aW9uIiwiT25lT2YiLCJPYmplY3QiLCJfcHJlQ29sbGVjdGlvbiIsIl9lbnN1cmVJbmRleCIsImNyZWF0ZWRBdCIsImV4cGlyZUFmdGVyU2Vjb25kcyIsImJhY2tncm91bmQiLCJfcHJlQ29sbGVjdGlvbkN1cnNvciIsImZpbmQiLCJmaWVsZHMiLCJfaWQiLCJpc0ZpbmlzaGVkIiwib2JzZXJ2ZSIsImNoYW5nZWQiLCJkb2MiLCJyZW1vdmUiLCJyZW1vdmVkIiwic3RvcCIsImVuZCIsImFib3J0IiwiX2NyZWF0ZVN0cmVhbSIsInBhdGgiLCJvcHRzIiwiZmlsZUxlbmd0aCIsIl9jb250aW51ZVVwbG9hZCIsImZpbGUiLCJhYm9ydGVkIiwiZW5kZWQiLCJjb250VXBsZCIsImZpbmRPbmUiLCJfY2hlY2tBY2Nlc3MiLCJodHRwIiwicmVzdWx0IiwidXNlciIsInVzZXJJZCIsIl9nZXRVc2VyIiwicGFyYW1zIiwiY2FsbCIsImV4dGVuZCIsInJjIiwidGV4dCIsInJlc3BvbnNlIiwiaGVhZGVyc1NlbnQiLCJ3cml0ZUhlYWQiLCJsZW5ndGgiLCJmaW5pc2hlZCIsIl9tZXRob2ROYW1lcyIsIl9BYm9ydCIsIl9Xcml0ZSIsIl9TdGFydCIsIl9SZW1vdmUiLCJvbiIsIl9oYW5kbGVVcGxvYWQiLCJfZmluaXNoVXBsb2FkIiwiY29ubmVjdEhhbmRsZXJzIiwidXNlIiwiaHR0cFJlcSIsImh0dHBSZXNwIiwibmV4dCIsIl9wYXJzZWRVcmwiLCJpbmRleE9mIiwibWV0aG9kIiwiaGFuZGxlRXJyb3IiLCJfZXJyb3IiLCJjb25zb2xlIiwid2FybiIsInRyYWNlIiwidG9TdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwiYm9keSIsImRhdGEiLCJzZXJ2ZXIiLCJzZXNzaW9ucyIsImhhcyIsImZpbGVJZCIsImVvZiIsIkJ1ZmZlciIsImZyb20iLCJiaW5EYXRhIiwiYnVmZkVyciIsImNodW5rSWQiLCJfcHJlcGFyZVVwbG9hZCIsIm1ldGEiLCJlbWl0IiwicGFyc2UiLCJqc29uRXJyIiwiX19fcyIsIm5hbWUiLCJjbG9uZSIsIkRhdGUiLCJtYXhMZW5ndGgiLCJpbnNlcnQiLCJvbWl0IiwicmV0dXJuTWV0YSIsInVwbG9hZFJvdXRlIiwiaHR0cFJlc3BFcnIiLCJ1cmkiLCJ1cmlzIiwic3Vic3RyaW5nIiwic3BsaXQiLCJxdWVyeSIsInZlcnNpb24iLCJkb3dubG9hZCIsIl9maWxlIiwiX21ldGhvZHMiLCJzZWxlY3RvciIsInVzZXJGdW5jcyIsInVzZXJzIiwiY3Vyc29yIiwiY291bnQiLCJGU05hbWUiLCJPcHRpb25hbCIsInVuYmxvY2siLCJ3cmFwQXN5bmMiLCJiaW5kIiwiaGFuZGxlVXBsb2FkRXJyIiwidW5saW5rIiwibWV0aG9kcyIsInRyYW5zcG9ydCIsImN0eCIsImZpbGVOYW1lIiwiX2dldEZpbGVOYW1lIiwiZXh0ZW5zaW9uIiwiZXh0ZW5zaW9uV2l0aERvdCIsIl9nZXRFeHQiLCJleHQiLCJfZGF0YVRvU2NoZW1hIiwiaXNVcGxvYWRBbGxvd2VkIiwiY2IiLCJjaG1vZCIsIl9nZXRNaW1lVHlwZSIsIl91cGRhdGVGaWxlVHlwZXMiLCJ1cGRhdGUiLCIkc2V0Iiwid3JpdGUiLCJlIiwiZmlsZURhdGEiLCJtaW1lIiwiYnVmIiwiZmQiLCJvcGVuU3luYyIsImJyIiwicmVhZFN5bmMiLCJjbG9zZSIsInNsaWNlIiwibXRvayIsImdldCIsImJ1ZmZlciIsInByb2NlZWRBZnRlclVwbG9hZCIsImlkIiwic3RyZWFtIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJmbGFncyIsInN0cmVhbUVyciIsImluc2VydEVyciIsImxvYWQiLCJ1cmwiLCJwYXRoUGFydHMiLCJzdG9yZVJlc3VsdCIsInN0YXQiLCJzdGF0cyIsInZlcnNpb25zIiwib3JpZ2luYWwiLCJwaXBlIiwiYWRkRmlsZSIsInN0YXRFcnIiLCJpc0ZpbGUiLCJfc3RvcmFnZVBhdGgiLCJ1bmRlZmluZWQiLCJmaWxlcyIsImZvckVhY2giLCJkb2NzIiwiZmV0Y2giLCJkZW55IiwicnVsZXMiLCJhbGxvdyIsImRlbnlDbGllbnQiLCJhbGxvd0NsaWVudCIsImVhY2giLCJ2UmVmIiwiXzQwNCIsIm9yaWdpbmFsVXJsIiwicmVzcG9uc2VUeXBlIiwic2VydmUiLCJyZWFkYWJsZVN0cmVhbSIsImZvcmNlMjAwIiwicGFydGlyYWwiLCJyZXFSYW5nZSIsImRpc3Bvc2l0aW9uVHlwZSIsInN0YXJ0IiwidGFrZSIsImRpc3Bvc2l0aW9uTmFtZSIsImVuY29kZVVSSSIsImRpc3Bvc2l0aW9uRW5jb2RpbmciLCJzZXRIZWFkZXIiLCJyYW5nZSIsImFycmF5IiwiaXNOYU4iLCJwbGF5Iiwic3RyZWFtRXJyb3JIYW5kbGVyIiwia2V5IiwicmVzcG9uZCIsImNvZGUiLCJkZXN0cm95IiwiY3JlYXRlUmVhZFN0cmVhbSIsIkV2ZW50RW1pdHRlciIsImZvcm1hdEZsZVVSTCIsIkZpbGVzQ3Vyc29yIiwiRmlsZUN1cnNvciIsImluZm8iLCJsb2ciLCJwb3AiLCJ0b0xvd2VyQ2FzZSIsImlzVmlkZW8iLCJ0ZXN0IiwiaXNBdWRpbyIsImlzSW1hZ2UiLCJpc1RleHQiLCJpc0pTT04iLCJpc1BERiIsImRzIiwiX2Rvd25sb2FkUm91dGUiLCJfY29sbGVjdGlvbk5hbWUiLCJvcHRpb25zIiwibGluayIsIm9wdGlvbmFsIiwiYmxhY2tib3giLCJ1cGRhdGVkQXQiLCJfZmlsZVJlZiIsIl9jb2xsZWN0aW9uIiwicHJvcGVydHkiLCJ3aXRoIiwiX3NlbGVjdG9yIiwiX2N1cnJlbnQiLCJoYXNOZXh0IiwiaGFzUHJldmlvdXMiLCJwcmV2aW91cyIsImZpcnN0IiwibGFzdCIsImNvbnRleHQiLCJtYXAiLCJjdXJyZW50IiwiY2FsbGJhY2tzIiwib2JzZXJ2ZUNoYW5nZXMiLCJvYmoiLCJpc0FycmF5IiwiaSIsImlzRGF0ZSIsIl9yb290IiwiX19tZXRlb3JfcnVudGltZV9jb25maWdfXyIsIlJPT1RfVVJMIiwiZmRDYWNoZSIsIndyaXR0ZW5DaHVua3MiLCJlbnN1cmVGaWxlIiwiZWZFcnJvciIsIm9wZW4iLCJvRXJyb3IiLCJudW0iLCJjaHVuayIsIndyaXR0ZW4iLCJzZXRUaW1lb3V0IiwiY2VpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxPQUFPQyxNQUFQLENBQWM7QUFBQ0MsbUJBQWdCLE1BQUlBO0FBQXJCLENBQWQ7O0FBQXFELElBQUlDLENBQUo7O0FBQU1ILE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxtQkFBUixDQUFiLEVBQTBDO0FBQUNGLElBQUVHLENBQUYsRUFBSTtBQUFDSCxRQUFFRyxDQUFGO0FBQUk7O0FBQVYsQ0FBMUMsRUFBc0QsQ0FBdEQ7QUFBeUQsSUFBSUMsS0FBSjtBQUFVUCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsY0FBUixDQUFiLEVBQXFDO0FBQUNFLFFBQU1ELENBQU4sRUFBUTtBQUFDQyxZQUFNRCxDQUFOO0FBQVE7O0FBQWxCLENBQXJDLEVBQXlELENBQXpEO0FBQTRELElBQUlFLE1BQUo7QUFBV1IsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGVBQVIsQ0FBYixFQUFzQztBQUFDRyxTQUFPRixDQUFQLEVBQVM7QUFBQ0UsYUFBT0YsQ0FBUDtBQUFTOztBQUFwQixDQUF0QyxFQUE0RCxDQUE1RDtBQUErRCxJQUFJRyxNQUFKO0FBQVdULE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxlQUFSLENBQWIsRUFBc0M7QUFBQ0ksU0FBT0gsQ0FBUCxFQUFTO0FBQUNHLGFBQU9ILENBQVA7QUFBUzs7QUFBcEIsQ0FBdEMsRUFBNEQsQ0FBNUQ7QUFBK0QsSUFBSUksTUFBSjtBQUFXVixPQUFPSSxLQUFQLENBQWFDLFFBQVEsZUFBUixDQUFiLEVBQXNDO0FBQUNLLFNBQU9KLENBQVAsRUFBUztBQUFDSSxhQUFPSixDQUFQO0FBQVM7O0FBQXBCLENBQXRDLEVBQTRELENBQTVEO0FBQStELElBQUlLLE9BQUo7QUFBWVgsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLHVCQUFSLENBQWIsRUFBOEM7QUFBQ00sVUFBUUwsQ0FBUixFQUFVO0FBQUNLLGNBQVFMLENBQVI7QUFBVTs7QUFBdEIsQ0FBOUMsRUFBc0UsQ0FBdEU7QUFBeUUsSUFBSU0sV0FBSjtBQUFnQlosT0FBT0ksS0FBUCxDQUFhQyxRQUFRLG1CQUFSLENBQWIsRUFBMEM7QUFBQ1EsVUFBUVAsQ0FBUixFQUFVO0FBQUNNLGtCQUFZTixDQUFaO0FBQWM7O0FBQTFCLENBQTFDLEVBQXNFLENBQXRFO0FBQXlFLElBQUlRLEtBQUosRUFBVUMsS0FBVjtBQUFnQmYsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDUyxRQUFNUixDQUFOLEVBQVE7QUFBQ1EsWUFBTVIsQ0FBTjtBQUFRLEdBQWxCOztBQUFtQlMsUUFBTVQsQ0FBTixFQUFRO0FBQUNTLFlBQU1ULENBQU47QUFBUTs7QUFBcEMsQ0FBckMsRUFBMkUsQ0FBM0U7QUFBOEUsSUFBSVUsbUJBQUo7QUFBd0JoQixPQUFPSSxLQUFQLENBQWFDLFFBQVEsV0FBUixDQUFiLEVBQWtDO0FBQUNRLFVBQVFQLENBQVIsRUFBVTtBQUFDVSwwQkFBb0JWLENBQXBCO0FBQXNCOztBQUFsQyxDQUFsQyxFQUFzRSxDQUF0RTtBQUF5RSxJQUFJVyxZQUFKLEVBQWlCQyxnQkFBakI7QUFBa0NsQixPQUFPSSxLQUFQLENBQWFDLFFBQVEsVUFBUixDQUFiLEVBQWlDO0FBQUNZLGVBQWFYLENBQWIsRUFBZTtBQUFDVyxtQkFBYVgsQ0FBYjtBQUFlLEdBQWhDOztBQUFpQ1ksbUJBQWlCWixDQUFqQixFQUFtQjtBQUFDWSx1QkFBaUJaLENBQWpCO0FBQW1COztBQUF4RSxDQUFqQyxFQUEyRyxDQUEzRztBQUE4RyxJQUFJYSxFQUFKO0FBQU9uQixPQUFPSSxLQUFQLENBQWFDLFFBQVEsVUFBUixDQUFiLEVBQWlDO0FBQUNRLFVBQVFQLENBQVIsRUFBVTtBQUFDYSxTQUFHYixDQUFIO0FBQUs7O0FBQWpCLENBQWpDLEVBQW9ELEVBQXBEO0FBQXdELElBQUljLE1BQUo7QUFBV3BCLE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxhQUFSLENBQWIsRUFBb0M7QUFBQ1EsVUFBUVAsQ0FBUixFQUFVO0FBQUNjLGFBQU9kLENBQVA7QUFBUzs7QUFBckIsQ0FBcEMsRUFBMkQsRUFBM0Q7QUFBK0QsSUFBSWUsT0FBSjtBQUFZckIsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLFNBQVIsQ0FBYixFQUFnQztBQUFDUSxVQUFRUCxDQUFSLEVBQVU7QUFBQ2UsY0FBUWYsQ0FBUjtBQUFVOztBQUF0QixDQUFoQyxFQUF3RCxFQUF4RDtBQUE0RCxJQUFJZ0IsUUFBSjtBQUFhdEIsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLFdBQVIsQ0FBYixFQUFrQztBQUFDUSxVQUFRUCxDQUFSLEVBQVU7QUFBQ2dCLGVBQVNoQixDQUFUO0FBQVc7O0FBQXZCLENBQWxDLEVBQTJELEVBQTNEO0FBQStELElBQUlpQixRQUFKO0FBQWF2QixPQUFPSSxLQUFQLENBQWFDLFFBQVEsTUFBUixDQUFiLEVBQTZCO0FBQUNRLFVBQVFQLENBQVIsRUFBVTtBQUFDaUIsZUFBU2pCLENBQVQ7QUFBVzs7QUFBdkIsQ0FBN0IsRUFBc0QsRUFBdEQ7QUFpQi9yQzs7O0dBSUEsTUFBTWtCLFFBQVFmLE9BQU9nQixlQUFQLENBQXVCQyxZQUFZQSxVQUFuQyxDQUFkOztBQUNBLE1BQU1DLE9BQVEsTUFBTSxDQUFJLENBQXhCLEMsQ0FFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q08sTUFBTXpCLGVBQU4sU0FBOEJjLG1CQUE5QixDQUFrRDtBQUN2RFksY0FBWUMsTUFBWixFQUFvQjtBQUNsQjtBQUNBLFFBQUlDLFdBQUo7O0FBQ0EsUUFBSUQsTUFBSixFQUFZO0FBQ1YsT0FBQztBQUNDQyxtQkFERDtBQUVDQyxlQUFPLEtBQUtBLEtBRmI7QUFHQ0MsZ0JBQVEsS0FBS0EsTUFIZDtBQUlDQyxnQkFBUSxLQUFLQSxNQUpkO0FBS0NDLGdCQUFRLEtBQUtBLE1BTGQ7QUFNQ0MsbUJBQVcsS0FBS0EsU0FOakI7QUFPQ0MsbUJBQVcsS0FBS0EsU0FQakI7QUFRQ0Msb0JBQVksS0FBS0EsVUFSbEI7QUFTQ0MscUJBQWEsS0FBS0EsV0FUbkI7QUFVQ0Msc0JBQWMsS0FBS0EsWUFWcEI7QUFXQ0MsdUJBQWUsS0FBS0EsYUFYckI7QUFZQ0MsdUJBQWUsS0FBS0EsYUFackI7QUFhQ0MsdUJBQWUsS0FBS0EsYUFickI7QUFjQ0MsdUJBQWUsS0FBS0EsYUFkckI7QUFlQ0Msd0JBQWdCLEtBQUtBLGNBZnRCO0FBZ0JDQyx3QkFBZ0IsS0FBS0EsY0FoQnRCO0FBaUJDQyx3QkFBZ0IsS0FBS0EsY0FqQnRCO0FBa0JDQyx3QkFBZ0IsS0FBS0EsY0FsQnRCO0FBbUJDQyx3QkFBZ0IsS0FBS0EsY0FuQnRCO0FBb0JDQyx5QkFBaUIsS0FBS0EsZUFwQnZCO0FBcUJDQyx5QkFBaUIsS0FBS0EsZUFyQnZCO0FBc0JDQyx5QkFBaUIsS0FBS0EsZUF0QnZCO0FBdUJDQywwQkFBa0IsS0FBS0EsZ0JBdkJ4QjtBQXdCQ0MsMEJBQWtCLEtBQUtBLGdCQXhCeEI7QUF5QkNDLDJCQUFtQixLQUFLQSxpQkF6QnpCO0FBMEJDQywyQkFBbUIsS0FBS0EsaUJBMUJ6QjtBQTJCQ0MsOEJBQXNCLEtBQUtBO0FBM0I1QixVQTRCRzNCLE1BNUJKO0FBNkJEOztBQUVELFVBQU00QixPQUFTLElBQWY7QUFDQSxVQUFNQyxTQUFTLElBQUkvQyxPQUFKLEVBQWY7O0FBRUEsUUFBSSxDQUFDUixFQUFFd0QsU0FBRixDQUFZLEtBQUs1QixLQUFqQixDQUFMLEVBQThCO0FBQzVCLFdBQUtBLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDNUIsRUFBRXdELFNBQUYsQ0FBWSxLQUFLMUIsTUFBakIsQ0FBTCxFQUErQjtBQUM3QixXQUFLQSxNQUFMLEdBQWMsS0FBZDtBQUNEOztBQUVELFFBQUksQ0FBQyxLQUFLRyxTQUFWLEVBQXFCO0FBQ25CLFdBQUtBLFNBQUwsR0FBaUIsS0FBakI7QUFDRDs7QUFFRCxRQUFJLENBQUMsS0FBS0QsU0FBVixFQUFxQjtBQUNuQixXQUFLQSxTQUFMLEdBQWlCLE9BQU8sR0FBeEI7QUFDRDs7QUFFRCxTQUFLQSxTQUFMLEdBQWlCeUIsS0FBS0MsS0FBTCxDQUFXLEtBQUsxQixTQUFMLEdBQWlCLENBQTVCLElBQWlDLENBQWxEOztBQUVBLFFBQUksQ0FBQ2hDLEVBQUUyRCxRQUFGLENBQVcsS0FBS2hCLGNBQWhCLENBQUQsSUFBb0MsQ0FBQyxLQUFLVCxVQUE5QyxFQUEwRDtBQUN4RCxXQUFLUyxjQUFMLEdBQXNCLG1CQUF0QjtBQUNEOztBQUVELFFBQUksQ0FBQyxLQUFLVCxVQUFWLEVBQXNCO0FBQ3BCLFdBQUtBLFVBQUwsR0FBa0IsSUFBSTlCLE1BQU13RCxVQUFWLENBQXFCLEtBQUtqQixjQUExQixDQUFsQjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtBLGNBQUwsR0FBc0IsS0FBS1QsVUFBTCxDQUFnQjJCLEtBQXRDO0FBQ0Q7O0FBRUQsU0FBSzNCLFVBQUwsQ0FBZ0I0QixlQUFoQixHQUFrQyxJQUFsQztBQUNBbkQsVUFBTSxLQUFLZ0MsY0FBWCxFQUEyQm9CLE1BQTNCOztBQUVBLFFBQUksS0FBS2pDLE1BQUwsSUFBZSxDQUFDLEtBQUtPLGFBQXpCLEVBQXdDO0FBQ3RDLFlBQU0sSUFBSS9CLE9BQU8wRCxLQUFYLENBQWlCLEdBQWpCLEVBQXVCLG9CQUFtQixLQUFLckIsY0FBZSx5S0FBOUQsQ0FBTjtBQUNEOztBQUVELFFBQUksQ0FBQzNDLEVBQUUyRCxRQUFGLENBQVcsS0FBS3RCLGFBQWhCLENBQUwsRUFBcUM7QUFDbkMsV0FBS0EsYUFBTCxHQUFxQixjQUFyQjtBQUNEOztBQUVELFNBQUtBLGFBQUwsR0FBcUIsS0FBS0EsYUFBTCxDQUFtQjRCLE9BQW5CLENBQTJCLEtBQTNCLEVBQWtDLEVBQWxDLENBQXJCOztBQUVBLFFBQUksQ0FBQ2pFLEVBQUVrRSxVQUFGLENBQWEsS0FBS3JCLGNBQWxCLENBQUwsRUFBd0M7QUFDdEMsV0FBS0EsY0FBTCxHQUFzQixLQUF0QjtBQUNEOztBQUVELFFBQUksQ0FBQzdDLEVBQUVrRSxVQUFGLENBQWEsS0FBS3RCLGNBQWxCLENBQUwsRUFBd0M7QUFDdEMsV0FBS0EsY0FBTCxHQUFzQixLQUF0QjtBQUNEOztBQUVELFFBQUksQ0FBQzVDLEVBQUV3RCxTQUFGLENBQVksS0FBS1IsZUFBakIsQ0FBTCxFQUF3QztBQUN0QyxXQUFLQSxlQUFMLEdBQXVCLElBQXZCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDaEQsRUFBRWtFLFVBQUYsQ0FBYSxLQUFLaEIsZ0JBQWxCLENBQUwsRUFBMEM7QUFDeEMsV0FBS0EsZ0JBQUwsR0FBd0IsS0FBeEI7QUFDRDs7QUFFRCxRQUFJLENBQUNsRCxFQUFFa0UsVUFBRixDQUFhLEtBQUtmLGlCQUFsQixDQUFMLEVBQTJDO0FBQ3pDLFdBQUtBLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDbkQsRUFBRXdELFNBQUYsQ0FBWSxLQUFLekIsTUFBakIsQ0FBTCxFQUErQjtBQUM3QixXQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUNEOztBQUVELFFBQUksQ0FBQy9CLEVBQUVtRSxRQUFGLENBQVcsS0FBS2hDLFdBQWhCLENBQUwsRUFBbUM7QUFDakMsV0FBS0EsV0FBTCxHQUFtQmlDLFNBQVMsS0FBVCxFQUFnQixDQUFoQixDQUFuQjtBQUNEOztBQUVELFFBQUksQ0FBQ3BFLEVBQUVtRSxRQUFGLENBQVcsS0FBS2Qsb0JBQWhCLENBQUwsRUFBNEM7QUFDMUMsV0FBS0Esb0JBQUwsR0FBNEJlLFNBQVMsS0FBVCxFQUFnQixDQUFoQixDQUE1QjtBQUNEOztBQUVELFFBQUksQ0FBQ3BFLEVBQUUyRCxRQUFGLENBQVcsS0FBS3ZCLFlBQWhCLENBQUwsRUFBb0M7QUFDbEMsV0FBS0EsWUFBTCxHQUFvQiw2Q0FBcEI7QUFDRDs7QUFFRCxRQUFJLENBQUNwQyxFQUFFa0UsVUFBRixDQUFhLEtBQUs1QixhQUFsQixDQUFMLEVBQXVDO0FBQ3JDLFdBQUtBLGFBQUwsR0FBcUIsS0FBckI7QUFDRDs7QUFFRCxRQUFJLENBQUN0QyxFQUFFd0QsU0FBRixDQUFZLEtBQUtoQixhQUFqQixDQUFMLEVBQXNDO0FBQ3BDLFdBQUtBLGFBQUwsR0FBcUIsS0FBckI7QUFDRDs7QUFFRCxRQUFJLENBQUN4QyxFQUFFa0UsVUFBRixDQUFhLEtBQUszQixhQUFsQixDQUFMLEVBQXVDO0FBQ3JDLFdBQUtBLGFBQUwsR0FBcUIsS0FBckI7QUFDRDs7QUFFRCxRQUFJLENBQUN2QyxFQUFFa0UsVUFBRixDQUFhLEtBQUt6QixjQUFsQixDQUFMLEVBQXdDO0FBQ3RDLFdBQUtBLGNBQUwsR0FBc0IsS0FBdEI7QUFDRDs7QUFFRCxRQUFJLENBQUN6QyxFQUFFd0QsU0FBRixDQUFZLEtBQUtkLGNBQWpCLENBQUwsRUFBdUM7QUFDckMsV0FBS0EsY0FBTCxHQUFzQixJQUF0QjtBQUNEOztBQUVELFFBQUksQ0FBQzFDLEVBQUV3RCxTQUFGLENBQVksS0FBS1QsZUFBakIsQ0FBTCxFQUF3QztBQUN0QyxXQUFLQSxlQUFMLEdBQXVCLEtBQXZCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDL0MsRUFBRXFFLFFBQUYsQ0FBVyxLQUFLQyxlQUFoQixDQUFMLEVBQXVDO0FBQ3JDLFdBQUtBLGVBQUwsR0FBdUIsRUFBdkI7QUFDRDs7QUFFRCxRQUFJLENBQUN0RSxFQUFFa0UsVUFBRixDQUFhLEtBQUtqQixnQkFBbEIsQ0FBTCxFQUEwQztBQUN4QyxXQUFLQSxnQkFBTCxHQUF3QixLQUF4QjtBQUNEOztBQUVELFFBQUksQ0FBQ2pELEVBQUVtRSxRQUFGLENBQVcsS0FBS2YsaUJBQWhCLENBQUwsRUFBeUM7QUFDdkMsV0FBS0EsaUJBQUwsR0FBeUIsS0FBekI7QUFDRDs7QUFFRCxRQUFJLENBQUNwRCxFQUFFa0UsVUFBRixDQUFhLEtBQUtwQixlQUFsQixDQUFMLEVBQXlDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUIsQ0FBQ3lCLFlBQUQsRUFBZUMsT0FBZixFQUF3QkMsVUFBeEIsS0FBdUM7QUFDNUQsY0FBTUMsVUFBVSxFQUFoQjs7QUFFQSxnQkFBUUgsWUFBUjtBQUNBLGVBQUssS0FBTDtBQUNFRyxvQkFBUUMsTUFBUixHQUErQixTQUEvQjtBQUNBRCxvQkFBUUUsT0FBUixHQUErQixTQUEvQjtBQUNBRixvQkFBUSxtQkFBUixJQUErQixTQUEvQjtBQUNBOztBQUNGLGVBQUssS0FBTDtBQUNFQSxvQkFBUSxlQUFSLElBQStCLFVBQS9CO0FBQ0E7O0FBQ0YsZUFBSyxLQUFMO0FBQ0VBLG9CQUFRLGVBQVIsSUFBZ0MsV0FBVUQsV0FBV0ksSUFBSyxFQUExRDtBQUNBOztBQUNGO0FBQ0U7QUFiRjs7QUFnQkFILGdCQUFRSSxVQUFSLEdBQTJCLFlBQTNCO0FBQ0FKLGdCQUFRLGNBQVIsSUFBMkJELFdBQVdNLElBQVgsSUFBbUIsMEJBQTlDO0FBQ0FMLGdCQUFRLGVBQVIsSUFBMkIsT0FBM0I7QUFDQSxlQUFPQSxPQUFQO0FBQ0QsT0F2QkQ7QUF3QkQ7O0FBRUQsUUFBSSxLQUFLNUMsTUFBTCxJQUFlLENBQUNILFdBQXBCLEVBQWlDO0FBQy9CLFlBQU0sSUFBSXJCLE9BQU8wRCxLQUFYLENBQWlCLEdBQWpCLEVBQXVCLG9CQUFtQixLQUFLckIsY0FBZSxxSkFBOUQsQ0FBTjtBQUNEOztBQUVELFFBQUksQ0FBQ2hCLFdBQUwsRUFBa0I7QUFDaEJBLG9CQUFjLFlBQVk7QUFDeEIsZUFBUSxTQUFRUCxTQUFTNEQsR0FBSSxNQUFLNUQsU0FBUzRELEdBQUksVUFBUzVELFNBQVM0RCxHQUFJLEdBQUUxQixLQUFLWCxjQUFlLEVBQTNGO0FBQ0QsT0FGRDtBQUdEOztBQUVELFFBQUkzQyxFQUFFMkQsUUFBRixDQUFXaEMsV0FBWCxDQUFKLEVBQTZCO0FBQzNCLFdBQUtBLFdBQUwsR0FBbUIsTUFBTUEsV0FBekI7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLQSxXQUFMLEdBQW1CLFlBQVk7QUFDN0IsWUFBSXNELEtBQUt0RCxZQUFZdUQsS0FBWixDQUFrQjVCLElBQWxCLEVBQXdCNkIsU0FBeEIsQ0FBVDs7QUFDQSxZQUFJLENBQUNuRixFQUFFMkQsUUFBRixDQUFXc0IsRUFBWCxDQUFMLEVBQXFCO0FBQ25CLGdCQUFNLElBQUkzRSxPQUFPMEQsS0FBWCxDQUFpQixHQUFqQixFQUF1QixvQkFBbUJWLEtBQUtYLGNBQWUsa0RBQTlELENBQU47QUFDRDs7QUFDRHNDLGFBQUtBLEdBQUdoQixPQUFILENBQVcsS0FBWCxFQUFrQixFQUFsQixDQUFMO0FBQ0EsZUFBTzdDLFNBQVNnRSxTQUFULENBQW1CSCxFQUFuQixDQUFQO0FBQ0QsT0FQRDtBQVFEOztBQUVELFNBQUtJLE1BQUwsQ0FBWSx1Q0FBWixFQUFxRCxLQUFLMUQsV0FBTCxDQUFpQixFQUFqQixDQUFyRDs7QUFFQVgsT0FBR3NFLE1BQUgsQ0FBVSxLQUFLM0QsV0FBTCxDQUFpQixFQUFqQixDQUFWLEVBQWdDO0FBQUU0RCxZQUFNLEtBQUtsQztBQUFiLEtBQWhDLEVBQXNFbUMsS0FBRCxJQUFXO0FBQzlFLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQU0sSUFBSWxGLE9BQU8wRCxLQUFYLENBQWlCLEdBQWpCLEVBQXVCLG9CQUFtQlYsS0FBS1gsY0FBZSxZQUFXLEtBQUtoQixXQUFMLENBQWlCLEVBQWpCLENBQXFCLHFCQUE5RixFQUFvSDZELEtBQXBILENBQU47QUFDRDtBQUNGLEtBSkQ7QUFNQTdFLFVBQU0sS0FBS29CLE1BQVgsRUFBbUIwRCxPQUFuQjtBQUNBOUUsVUFBTSxLQUFLd0IsV0FBWCxFQUF3QnVELE1BQXhCO0FBQ0EvRSxVQUFNLEtBQUtnQixXQUFYLEVBQXdCZ0UsUUFBeEI7QUFDQWhGLFVBQU0sS0FBS3lCLFlBQVgsRUFBeUIyQixNQUF6QjtBQUNBcEQsVUFBTSxLQUFLNEIsYUFBWCxFQUEwQjNCLE1BQU1nRixLQUFOLENBQVksS0FBWixFQUFtQkQsUUFBbkIsQ0FBMUI7QUFDQWhGLFVBQU0sS0FBSzJCLGFBQVgsRUFBMEIxQixNQUFNZ0YsS0FBTixDQUFZLEtBQVosRUFBbUJELFFBQW5CLENBQTFCO0FBQ0FoRixVQUFNLEtBQUs2QixhQUFYLEVBQTBCaUQsT0FBMUI7QUFDQTlFLFVBQU0sS0FBSytCLGNBQVgsRUFBMkIrQyxPQUEzQjtBQUNBOUUsVUFBTSxLQUFLOEIsY0FBWCxFQUEyQjdCLE1BQU1nRixLQUFOLENBQVksS0FBWixFQUFtQkQsUUFBbkIsQ0FBM0I7QUFDQWhGLFVBQU0sS0FBS29DLGVBQVgsRUFBNEIwQyxPQUE1QjtBQUNBOUUsVUFBTSxLQUFLc0MsZ0JBQVgsRUFBNkJyQyxNQUFNZ0YsS0FBTixDQUFZLEtBQVosRUFBbUJELFFBQW5CLENBQTdCO0FBQ0FoRixVQUFNLEtBQUt3QyxpQkFBWCxFQUE4QnZDLE1BQU1nRixLQUFOLENBQVksS0FBWixFQUFtQkQsUUFBbkIsQ0FBOUI7QUFDQWhGLFVBQU0sS0FBS3lDLGlCQUFYLEVBQThCc0MsTUFBOUI7QUFDQS9FLFVBQU0sS0FBS21DLGVBQVgsRUFBNEJsQyxNQUFNZ0YsS0FBTixDQUFZQyxNQUFaLEVBQW9CRixRQUFwQixDQUE1Qjs7QUFFQSxRQUFJLENBQUMsS0FBS25ELGFBQVYsRUFBeUI7QUFDdkIsV0FBS3NELGNBQUwsR0FBc0IsSUFBSTFGLE1BQU13RCxVQUFWLENBQXNCLFNBQVEsS0FBS2pCLGNBQWUsRUFBbEQsQ0FBdEI7O0FBQ0EsV0FBS21ELGNBQUwsQ0FBb0JDLFlBQXBCLENBQWlDO0FBQUNDLG1CQUFXO0FBQVosT0FBakMsRUFBaUQ7QUFBQ0MsNEJBQW9CLEtBQUs3QyxpQkFBMUI7QUFBNkM4QyxvQkFBWTtBQUF6RCxPQUFqRDs7QUFDQSxZQUFNQyx1QkFBdUIsS0FBS0wsY0FBTCxDQUFvQk0sSUFBcEIsQ0FBeUIsRUFBekIsRUFBNkI7QUFDeERDLGdCQUFRO0FBQ05DLGVBQUssQ0FEQztBQUVOQyxzQkFBWTtBQUZOO0FBRGdELE9BQTdCLENBQTdCOztBQU9BSiwyQkFBcUJLLE9BQXJCLENBQTZCO0FBQzNCQyxnQkFBUUMsR0FBUixFQUFhO0FBQ1gsY0FBSUEsSUFBSUgsVUFBUixFQUFvQjtBQUNsQmpELGlCQUFLK0IsTUFBTCxDQUFhLCtEQUE4RHFCLElBQUlKLEdBQUksRUFBbkY7O0FBQ0FoRCxpQkFBS3dDLGNBQUwsQ0FBb0JhLE1BQXBCLENBQTJCO0FBQUNMLG1CQUFLSSxJQUFJSjtBQUFWLGFBQTNCLEVBQTJDOUUsSUFBM0M7QUFDRDtBQUNGLFNBTjBCOztBQU8zQm9GLGdCQUFRRixHQUFSLEVBQWE7QUFDWDtBQUNBO0FBQ0FwRCxlQUFLK0IsTUFBTCxDQUFhLCtEQUE4RHFCLElBQUlKLEdBQUksRUFBbkY7O0FBQ0EsY0FBSXRHLEVBQUVxRSxRQUFGLENBQVdmLEtBQUtnQixlQUFMLENBQXFCb0MsSUFBSUosR0FBekIsQ0FBWCxDQUFKLEVBQStDO0FBQzdDaEQsaUJBQUtnQixlQUFMLENBQXFCb0MsSUFBSUosR0FBekIsRUFBOEJPLElBQTlCOztBQUNBdkQsaUJBQUtnQixlQUFMLENBQXFCb0MsSUFBSUosR0FBekIsRUFBOEJRLEdBQTlCOztBQUVBLGdCQUFJLENBQUNKLElBQUlILFVBQVQsRUFBcUI7QUFDbkJqRCxtQkFBSytCLE1BQUwsQ0FBYSw4RUFBNkVxQixJQUFJSixHQUFJLEVBQWxHOztBQUNBaEQsbUJBQUtnQixlQUFMLENBQXFCb0MsSUFBSUosR0FBekIsRUFBOEJTLEtBQTlCO0FBQ0Q7O0FBRUQsbUJBQU96RCxLQUFLZ0IsZUFBTCxDQUFxQm9DLElBQUlKLEdBQXpCLENBQVA7QUFDRDtBQUNGOztBQXRCMEIsT0FBN0I7O0FBeUJBLFdBQUtVLGFBQUwsR0FBcUIsQ0FBQ1YsR0FBRCxFQUFNVyxJQUFOLEVBQVlDLElBQVosS0FBcUI7QUFDeEMsYUFBSzVDLGVBQUwsQ0FBcUJnQyxHQUFyQixJQUE0QixJQUFJN0YsV0FBSixDQUFnQndHLElBQWhCLEVBQXNCQyxLQUFLQyxVQUEzQixFQUF1Q0QsSUFBdkMsRUFBNkMsS0FBSy9FLFdBQWxELENBQTVCO0FBQ0QsT0FGRCxDQW5DdUIsQ0F1Q3ZCO0FBQ0E7OztBQUNBLFdBQUtpRixlQUFMLEdBQXdCZCxHQUFELElBQVM7QUFDOUIsWUFBSSxLQUFLaEMsZUFBTCxDQUFxQmdDLEdBQXJCLEtBQTZCLEtBQUtoQyxlQUFMLENBQXFCZ0MsR0FBckIsRUFBMEJlLElBQTNELEVBQWlFO0FBQy9ELGNBQUksQ0FBQyxLQUFLL0MsZUFBTCxDQUFxQmdDLEdBQXJCLEVBQTBCZ0IsT0FBM0IsSUFBc0MsQ0FBQyxLQUFLaEQsZUFBTCxDQUFxQmdDLEdBQXJCLEVBQTBCaUIsS0FBckUsRUFBNEU7QUFDMUUsbUJBQU8sS0FBS2pELGVBQUwsQ0FBcUJnQyxHQUFyQixFQUEwQmUsSUFBakM7QUFDRDs7QUFDRCxlQUFLTCxhQUFMLENBQW1CVixHQUFuQixFQUF3QixLQUFLaEMsZUFBTCxDQUFxQmdDLEdBQXJCLEVBQTBCZSxJQUExQixDQUErQkEsSUFBL0IsQ0FBb0NKLElBQTVELEVBQWtFLEtBQUszQyxlQUFMLENBQXFCZ0MsR0FBckIsRUFBMEJlLElBQTVGOztBQUNBLGlCQUFPLEtBQUsvQyxlQUFMLENBQXFCZ0MsR0FBckIsRUFBMEJlLElBQWpDO0FBQ0Q7O0FBQ0QsY0FBTUcsV0FBVyxLQUFLMUIsY0FBTCxDQUFvQjJCLE9BQXBCLENBQTRCO0FBQUNuQjtBQUFELFNBQTVCLENBQWpCOztBQUNBLFlBQUlrQixRQUFKLEVBQWM7QUFDWixlQUFLUixhQUFMLENBQW1CVixHQUFuQixFQUF3QmtCLFNBQVNILElBQVQsQ0FBY0osSUFBdEMsRUFBNENPLFFBQTVDOztBQUNBLGlCQUFPLEtBQUtsRCxlQUFMLENBQXFCZ0MsR0FBckIsRUFBMEJlLElBQWpDO0FBQ0Q7O0FBQ0QsZUFBTyxLQUFQO0FBQ0QsT0FkRDtBQWVEOztBQUVELFFBQUksQ0FBQyxLQUFLeEYsTUFBVixFQUFrQjtBQUNoQixXQUFLQSxNQUFMLEdBQWNoQixvQkFBb0JnQixNQUFsQztBQUNEOztBQUVEbEIsVUFBTSxLQUFLaUIsS0FBWCxFQUFrQjZELE9BQWxCO0FBQ0E5RSxVQUFNLEtBQUtrQixNQUFYLEVBQW1CZ0UsTUFBbkI7QUFDQWxGLFVBQU0sS0FBS21CLE1BQVgsRUFBbUIyRCxPQUFuQjtBQUNBOUUsVUFBTSxLQUFLc0IsU0FBWCxFQUFzQnJCLE1BQU1nRixLQUFOLENBQVlILE9BQVosRUFBcUJFLFFBQXJCLENBQXRCO0FBQ0FoRixVQUFNLEtBQUtxQixTQUFYLEVBQXNCMEQsTUFBdEI7QUFDQS9FLFVBQU0sS0FBSzBCLGFBQVgsRUFBMEIwQixNQUExQjtBQUNBcEQsVUFBTSxLQUFLa0MsY0FBWCxFQUEyQmpDLE1BQU1nRixLQUFOLENBQVksS0FBWixFQUFtQkQsUUFBbkIsQ0FBM0I7QUFDQWhGLFVBQU0sS0FBS2lDLGNBQVgsRUFBMkJoQyxNQUFNZ0YsS0FBTixDQUFZLEtBQVosRUFBbUJELFFBQW5CLENBQTNCO0FBQ0FoRixVQUFNLEtBQUt1QyxnQkFBWCxFQUE2QnRDLE1BQU1nRixLQUFOLENBQVksS0FBWixFQUFtQkQsUUFBbkIsQ0FBN0I7QUFDQWhGLFVBQU0sS0FBS3FDLGVBQVgsRUFBNEJ5QyxPQUE1Qjs7QUFFQSxRQUFJLEtBQUszRCxNQUFMLElBQWUsS0FBS0csU0FBeEIsRUFBbUM7QUFDakMsWUFBTSxJQUFJM0IsT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBdUIsb0JBQW1CLEtBQUtyQixjQUFlLDREQUE5RCxDQUFOO0FBQ0Q7O0FBRUQsU0FBSytFLFlBQUwsR0FBcUJDLElBQUQsSUFBVTtBQUM1QixVQUFJLEtBQUsxRixTQUFULEVBQW9CO0FBQ2xCLFlBQUkyRixNQUFKOztBQUNBLGNBQU07QUFBQ0MsY0FBRDtBQUFPQztBQUFQLFlBQWlCLEtBQUtDLFFBQUwsQ0FBY0osSUFBZCxDQUF2Qjs7QUFFQSxZQUFJM0gsRUFBRWtFLFVBQUYsQ0FBYSxLQUFLakMsU0FBbEIsQ0FBSixFQUFrQztBQUNoQyxjQUFJdUMsT0FBSjs7QUFDQSxjQUFJeEUsRUFBRXFFLFFBQUYsQ0FBV3NELEtBQUtLLE1BQWhCLEtBQTRCTCxLQUFLSyxNQUFMLENBQVkxQixHQUE1QyxFQUFpRDtBQUMvQzlCLHNCQUFVLEtBQUt0QyxVQUFMLENBQWdCdUYsT0FBaEIsQ0FBd0JFLEtBQUtLLE1BQUwsQ0FBWTFCLEdBQXBDLENBQVY7QUFDRDs7QUFFRHNCLG1CQUFTRCxPQUFPLEtBQUsxRixTQUFMLENBQWVnRyxJQUFmLENBQW9CakksRUFBRWtJLE1BQUYsQ0FBU1AsSUFBVCxFQUFlO0FBQUNFLGdCQUFEO0FBQU9DO0FBQVAsV0FBZixDQUFwQixFQUFxRHRELFdBQVcsSUFBaEUsQ0FBUCxHQUFnRixLQUFLdkMsU0FBTCxDQUFlZ0csSUFBZixDQUFvQjtBQUFDSixnQkFBRDtBQUFPQztBQUFQLFdBQXBCLEVBQXFDdEQsV0FBVyxJQUFoRCxDQUF6RjtBQUNELFNBUEQsTUFPTztBQUNMb0QsbUJBQVMsQ0FBQyxDQUFDRSxNQUFYO0FBQ0Q7O0FBRUQsWUFBS0gsUUFBU0MsV0FBVyxJQUFyQixJQUErQixDQUFDRCxJQUFwQyxFQUEwQztBQUN4QyxpQkFBTyxJQUFQO0FBQ0Q7O0FBRUQsY0FBTVEsS0FBS25JLEVBQUVtRSxRQUFGLENBQVd5RCxNQUFYLElBQXFCQSxNQUFyQixHQUE4QixHQUF6Qzs7QUFDQSxhQUFLdkMsTUFBTCxDQUFZLHFEQUFaOztBQUNBLFlBQUlzQyxJQUFKLEVBQVU7QUFDUixnQkFBTVMsT0FBTyxnQkFBYjs7QUFDQSxjQUFJLENBQUNULEtBQUtVLFFBQUwsQ0FBY0MsV0FBbkIsRUFBZ0M7QUFDOUJYLGlCQUFLVSxRQUFMLENBQWNFLFNBQWQsQ0FBd0JKLEVBQXhCLEVBQTRCO0FBQzFCLDhCQUFnQixZQURVO0FBRTFCLGdDQUFrQkMsS0FBS0k7QUFGRyxhQUE1QjtBQUlEOztBQUVELGNBQUksQ0FBQ2IsS0FBS1UsUUFBTCxDQUFjSSxRQUFuQixFQUE2QjtBQUMzQmQsaUJBQUtVLFFBQUwsQ0FBY3ZCLEdBQWQsQ0FBa0JzQixJQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0QsS0F2Q0Q7O0FBeUNBLFNBQUtNLFlBQUwsR0FBb0I7QUFDbEJDLGNBQVMseUJBQXdCLEtBQUtoRyxjQUFlLEVBRG5DO0FBRWxCaUcsY0FBUyx5QkFBd0IsS0FBS2pHLGNBQWUsRUFGbkM7QUFHbEJrRyxjQUFTLHlCQUF3QixLQUFLbEcsY0FBZSxFQUhuQztBQUlsQm1HLGVBQVUsMEJBQXlCLEtBQUtuRyxjQUFlO0FBSnJDLEtBQXBCO0FBT0EsU0FBS29HLEVBQUwsQ0FBUSxlQUFSLEVBQXlCLEtBQUtDLGFBQTlCO0FBQ0EsU0FBS0QsRUFBTCxDQUFRLGVBQVIsRUFBeUIsS0FBS0UsYUFBOUI7O0FBRUEsUUFBSSxDQUFDLEtBQUt6RyxhQUFOLElBQXVCLENBQUMsS0FBS08sZUFBakMsRUFBa0Q7QUFDaEQxQyxhQUFPNkksZUFBUCxDQUF1QkMsR0FBdkIsQ0FBMkIsQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQW9CQyxJQUFwQixLQUE2QjtBQUN0RCxZQUFJLENBQUMsS0FBSzlHLGFBQU4sSUFBdUIsQ0FBQyxDQUFDLENBQUM0RyxRQUFRRyxVQUFSLENBQW1CdEMsSUFBbkIsQ0FBd0J1QyxPQUF4QixDQUFpQyxHQUFFLEtBQUtuSCxhQUFjLElBQUcsS0FBS00sY0FBZSxXQUE3RSxDQUE5QixFQUF3SDtBQUN0SCxjQUFJeUcsUUFBUUssTUFBUixLQUFtQixNQUF2QixFQUErQjtBQUM3QixrQkFBTUMsY0FBZUMsTUFBRCxJQUFZO0FBQzlCLGtCQUFJbkUsUUFBUW1FLE1BQVo7QUFDQUMsc0JBQVFDLElBQVIsQ0FBYSw4Q0FBYixFQUE2RHJFLEtBQTdEO0FBQ0FvRSxzQkFBUUUsS0FBUjs7QUFFQSxrQkFBSSxDQUFDVCxTQUFTZixXQUFkLEVBQTJCO0FBQ3pCZSx5QkFBU2QsU0FBVCxDQUFtQixHQUFuQjtBQUNEOztBQUVELGtCQUFJLENBQUNjLFNBQVNaLFFBQWQsRUFBd0I7QUFDdEIsb0JBQUl6SSxFQUFFcUUsUUFBRixDQUFXbUIsS0FBWCxLQUFxQnhGLEVBQUVrRSxVQUFGLENBQWFzQixNQUFNdUUsUUFBbkIsQ0FBekIsRUFBdUQ7QUFDckR2RSwwQkFBUUEsTUFBTXVFLFFBQU4sRUFBUjtBQUNEOztBQUVELG9CQUFJLENBQUMvSixFQUFFMkQsUUFBRixDQUFXNkIsS0FBWCxDQUFMLEVBQXdCO0FBQ3RCQSwwQkFBUSxtQkFBUjtBQUNEOztBQUVENkQseUJBQVN2QyxHQUFULENBQWFrRCxLQUFLQyxTQUFMLENBQWU7QUFBRXpFO0FBQUYsaUJBQWYsQ0FBYjtBQUNEO0FBQ0YsYUFwQkQ7O0FBc0JBLGdCQUFJMEUsT0FBTyxFQUFYO0FBQ0FkLG9CQUFRTCxFQUFSLENBQVcsTUFBWCxFQUFvQm9CLElBQUQsSUFBVTlJLE1BQU0sTUFBTTtBQUN2QzZJLHNCQUFRQyxJQUFSO0FBQ0QsYUFGNEIsQ0FBN0I7QUFJQWYsb0JBQVFMLEVBQVIsQ0FBVyxLQUFYLEVBQWtCLE1BQU0xSCxNQUFNLE1BQU07QUFDbEMsa0JBQUk7QUFDRixvQkFBSTZGLElBQUo7QUFDQSxvQkFBSVUsTUFBSjtBQUNBLG9CQUFJQyxJQUFKOztBQUVBLG9CQUFJdUIsUUFBUTFFLE9BQVIsQ0FBZ0IsUUFBaEIsS0FBNkIxRSxFQUFFcUUsUUFBRixDQUFXL0QsT0FBTzhKLE1BQVAsQ0FBY0MsUUFBekIsQ0FBN0IsSUFBbUVySyxFQUFFc0ssR0FBRixDQUFNaEssT0FBTzhKLE1BQVAsQ0FBY0MsUUFBZCxDQUF1QmpCLFFBQVExRSxPQUFSLENBQWdCLFFBQWhCLENBQXZCLENBQU4sRUFBeUQsUUFBekQsQ0FBdkUsRUFBMkk7QUFDekltRCx5QkFBTztBQUNMQyw0QkFBUXhILE9BQU84SixNQUFQLENBQWNDLFFBQWQsQ0FBdUJqQixRQUFRMUUsT0FBUixDQUFnQixRQUFoQixDQUF2QixFQUFrRG9EO0FBRHJELG1CQUFQO0FBR0QsaUJBSkQsTUFJTztBQUNMRCx5QkFBTyxLQUFLRSxRQUFMLENBQWM7QUFBQzdHLDZCQUFTa0ksT0FBVjtBQUFtQmYsOEJBQVVnQjtBQUE3QixtQkFBZCxDQUFQO0FBQ0Q7O0FBRUQsb0JBQUlELFFBQVExRSxPQUFSLENBQWdCLFNBQWhCLE1BQStCLEdBQW5DLEVBQXdDO0FBQ3RDd0MseUJBQU87QUFDTHFELDRCQUFRbkIsUUFBUTFFLE9BQVIsQ0FBZ0IsVUFBaEI7QUFESCxtQkFBUDs7QUFJQSxzQkFBSTBFLFFBQVExRSxPQUFSLENBQWdCLE9BQWhCLE1BQTZCLEdBQWpDLEVBQXNDO0FBQ3BDd0MseUJBQUtzRCxHQUFMLEdBQVcsSUFBWDtBQUNELG1CQUZELE1BRU87QUFDTCx3QkFBSSxPQUFPQyxPQUFPQyxJQUFkLEtBQXVCLFVBQTNCLEVBQXVDO0FBQ3JDLDBCQUFJO0FBQ0Z4RCw2QkFBS3lELE9BQUwsR0FBZUYsT0FBT0MsSUFBUCxDQUFZUixJQUFaLEVBQWtCLFFBQWxCLENBQWY7QUFDRCx1QkFGRCxDQUVFLE9BQU9VLE9BQVAsRUFBZ0I7QUFDaEIxRCw2QkFBS3lELE9BQUwsR0FBZSxJQUFJRixNQUFKLENBQVdQLElBQVgsRUFBaUIsUUFBakIsQ0FBZjtBQUNEO0FBQ0YscUJBTkQsTUFNTztBQUNMaEQsMkJBQUt5RCxPQUFMLEdBQWUsSUFBSUYsTUFBSixDQUFXUCxJQUFYLEVBQWlCLFFBQWpCLENBQWY7QUFDRDs7QUFDRGhELHlCQUFLMkQsT0FBTCxHQUFlekcsU0FBU2dGLFFBQVExRSxPQUFSLENBQWdCLFdBQWhCLENBQVQsQ0FBZjtBQUNEOztBQUVELHdCQUFNMEMsa0JBQWtCLEtBQUtBLGVBQUwsQ0FBcUJGLEtBQUtxRCxNQUExQixDQUF4Qjs7QUFDQSxzQkFBSSxDQUFDbkQsZUFBTCxFQUFzQjtBQUNwQiwwQkFBTSxJQUFJOUcsT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsOERBQXRCLENBQU47QUFDRDs7QUFFRCxtQkFBQztBQUFDNEQsMEJBQUQ7QUFBU1Y7QUFBVCxzQkFBa0IsS0FBSzRELGNBQUwsQ0FBb0I5SyxFQUFFa0ksTUFBRixDQUFTaEIsSUFBVCxFQUFlRSxlQUFmLENBQXBCLEVBQXFEUyxLQUFLQyxNQUExRCxFQUFrRSxNQUFsRSxDQUFuQjs7QUFFQSxzQkFBSVosS0FBS3NELEdBQVQsRUFBYztBQUNaLHlCQUFLeEIsYUFBTCxDQUFtQnBCLE1BQW5CLEVBQTJCVixJQUEzQixFQUFpQyxNQUFNO0FBQ3JDLDBCQUFJLENBQUNtQyxTQUFTZixXQUFkLEVBQTJCO0FBQ3pCZSxpQ0FBU2QsU0FBVCxDQUFtQixHQUFuQjtBQUNEOztBQUVELDBCQUFJdkksRUFBRXFFLFFBQUYsQ0FBV3VELE9BQU9QLElBQWxCLEtBQTJCTyxPQUFPUCxJQUFQLENBQVkwRCxJQUEzQyxFQUFpRDtBQUMvQ25ELCtCQUFPUCxJQUFQLENBQVkwRCxJQUFaLEdBQW1CaEssaUJBQWlCNkcsT0FBT1AsSUFBUCxDQUFZMEQsSUFBN0IsQ0FBbkI7QUFDRDs7QUFFRCwwQkFBSSxDQUFDMUIsU0FBU1osUUFBZCxFQUF3QjtBQUN0QlksaUNBQVN2QyxHQUFULENBQWFrRCxLQUFLQyxTQUFMLENBQWVyQyxNQUFmLENBQWI7QUFDRDtBQUNGLHFCQVpEOztBQWFBO0FBQ0Q7O0FBRUQsdUJBQUtvRCxJQUFMLENBQVUsZUFBVixFQUEyQnBELE1BQTNCLEVBQW1DVixJQUFuQyxFQUF5QzFGLElBQXpDOztBQUVBLHNCQUFJLENBQUM2SCxTQUFTZixXQUFkLEVBQTJCO0FBQ3pCZSw2QkFBU2QsU0FBVCxDQUFtQixHQUFuQjtBQUNEOztBQUNELHNCQUFJLENBQUNjLFNBQVNaLFFBQWQsRUFBd0I7QUFDdEJZLDZCQUFTdkMsR0FBVDtBQUNEO0FBQ0YsaUJBcERELE1Bb0RPO0FBQ0wsc0JBQUk7QUFDRkksMkJBQU84QyxLQUFLaUIsS0FBTCxDQUFXZixJQUFYLENBQVA7QUFDRCxtQkFGRCxDQUVFLE9BQU9nQixPQUFQLEVBQWdCO0FBQ2hCdEIsNEJBQVFwRSxLQUFSLENBQWMsdUZBQWQsRUFBdUcwRixPQUF2RztBQUNBaEUsMkJBQU87QUFBQ0csNEJBQU07QUFBUCxxQkFBUDtBQUNEOztBQUVELHNCQUFJLENBQUNySCxFQUFFcUUsUUFBRixDQUFXNkMsS0FBS0csSUFBaEIsQ0FBTCxFQUE0QjtBQUMxQkgseUJBQUtHLElBQUwsR0FBWSxFQUFaO0FBQ0Q7O0FBRURILHVCQUFLaUUsSUFBTCxHQUFZLElBQVo7O0FBQ0EsdUJBQUs5RixNQUFMLENBQWEsdUNBQXNDNkIsS0FBS0csSUFBTCxDQUFVK0QsSUFBVixJQUFrQixXQUFZLE1BQUtsRSxLQUFLcUQsTUFBTyxFQUFsRzs7QUFDQSxzQkFBSXZLLEVBQUVxRSxRQUFGLENBQVc2QyxLQUFLRyxJQUFoQixLQUF5QkgsS0FBS0csSUFBTCxDQUFVMEQsSUFBdkMsRUFBNkM7QUFDM0M3RCx5QkFBS0csSUFBTCxDQUFVMEQsSUFBVixHQUFpQmpLLGFBQWFvRyxLQUFLRyxJQUFMLENBQVUwRCxJQUF2QixDQUFqQjtBQUNEOztBQUVELG1CQUFDO0FBQUNuRDtBQUFELHNCQUFXLEtBQUtrRCxjQUFMLENBQW9COUssRUFBRXFMLEtBQUYsQ0FBUW5FLElBQVIsQ0FBcEIsRUFBbUNXLEtBQUtDLE1BQXhDLEVBQWdELG1CQUFoRCxDQUFaOztBQUVBLHNCQUFJLEtBQUs1RixVQUFMLENBQWdCdUYsT0FBaEIsQ0FBd0JHLE9BQU90QixHQUEvQixDQUFKLEVBQXlDO0FBQ3ZDLDBCQUFNLElBQUloRyxPQUFPMEQsS0FBWCxDQUFpQixHQUFqQixFQUFzQixrREFBdEIsQ0FBTjtBQUNEOztBQUVEa0QsdUJBQUtaLEdBQUwsR0FBaUJZLEtBQUtxRCxNQUF0QjtBQUNBckQsdUJBQUtsQixTQUFMLEdBQWlCLElBQUlzRixJQUFKLEVBQWpCO0FBQ0FwRSx1QkFBS3FFLFNBQUwsR0FBaUJyRSxLQUFLQyxVQUF0Qjs7QUFDQSx1QkFBS3JCLGNBQUwsQ0FBb0IwRixNQUFwQixDQUEyQnhMLEVBQUV5TCxJQUFGLENBQU92RSxJQUFQLEVBQWEsTUFBYixDQUEzQjs7QUFDQSx1QkFBS0YsYUFBTCxDQUFtQlksT0FBT3RCLEdBQTFCLEVBQStCc0IsT0FBT1gsSUFBdEMsRUFBNENqSCxFQUFFeUwsSUFBRixDQUFPdkUsSUFBUCxFQUFhLE1BQWIsQ0FBNUM7O0FBRUEsc0JBQUlBLEtBQUt3RSxVQUFULEVBQXFCO0FBQ25CLHdCQUFJLENBQUNyQyxTQUFTZixXQUFkLEVBQTJCO0FBQ3pCZSwrQkFBU2QsU0FBVCxDQUFtQixHQUFuQjtBQUNEOztBQUVELHdCQUFJLENBQUNjLFNBQVNaLFFBQWQsRUFBd0I7QUFDdEJZLCtCQUFTdkMsR0FBVCxDQUFha0QsS0FBS0MsU0FBTCxDQUFlO0FBQzFCMEIscUNBQWMsR0FBRSxLQUFLdEosYUFBYyxJQUFHLEtBQUtNLGNBQWUsV0FEaEM7QUFFMUIwRSw4QkFBTU87QUFGb0IsdUJBQWYsQ0FBYjtBQUlEO0FBQ0YsbUJBWEQsTUFXTztBQUNMLHdCQUFJLENBQUN5QixTQUFTZixXQUFkLEVBQTJCO0FBQ3pCZSwrQkFBU2QsU0FBVCxDQUFtQixHQUFuQjtBQUNEOztBQUVELHdCQUFJLENBQUNjLFNBQVNaLFFBQWQsRUFBd0I7QUFDdEJZLCtCQUFTdkMsR0FBVDtBQUNEO0FBQ0Y7QUFDRjtBQUNGLGVBcEhELENBb0hFLE9BQU84RSxXQUFQLEVBQW9CO0FBQ3BCbEMsNEJBQVlrQyxXQUFaO0FBQ0Q7QUFDRixhQXhIdUIsQ0FBeEI7QUF5SEQsV0FySkQsTUFxSk87QUFDTHRDO0FBQ0Q7O0FBQ0Q7QUFDRDs7QUFFRCxZQUFJLENBQUMsS0FBS3ZHLGVBQVYsRUFBMkI7QUFDekIsY0FBSTRFLElBQUo7QUFDQSxjQUFJSyxNQUFKO0FBQ0EsY0FBSTZELEdBQUo7QUFDQSxjQUFJQyxJQUFKOztBQUVBLGNBQUksQ0FBQyxLQUFLaEssTUFBVixFQUFrQjtBQUNoQixnQkFBSSxDQUFDLENBQUMsQ0FBQ3NILFFBQVFHLFVBQVIsQ0FBbUJ0QyxJQUFuQixDQUF3QnVDLE9BQXhCLENBQWlDLEdBQUUsS0FBS25ILGFBQWMsSUFBRyxLQUFLTSxjQUFlLEVBQTdFLENBQVAsRUFBd0Y7QUFDdEZrSixvQkFBTXpDLFFBQVFHLFVBQVIsQ0FBbUJ0QyxJQUFuQixDQUF3QmhELE9BQXhCLENBQWlDLEdBQUUsS0FBSzVCLGFBQWMsSUFBRyxLQUFLTSxjQUFlLEVBQTdFLEVBQWdGLEVBQWhGLENBQU47O0FBQ0Esa0JBQUlrSixJQUFJckMsT0FBSixDQUFZLEdBQVosTUFBcUIsQ0FBekIsRUFBNEI7QUFDMUJxQyxzQkFBTUEsSUFBSUUsU0FBSixDQUFjLENBQWQsQ0FBTjtBQUNEOztBQUVERCxxQkFBT0QsSUFBSUcsS0FBSixDQUFVLEdBQVYsQ0FBUDs7QUFDQSxrQkFBSUYsS0FBS3RELE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckJSLHlCQUFTO0FBQ1AxQix1QkFBS3dGLEtBQUssQ0FBTCxDQURFO0FBRVBHLHlCQUFPN0MsUUFBUUcsVUFBUixDQUFtQjBDLEtBQW5CLEdBQTJCaEwsT0FBT2dLLEtBQVAsQ0FBYTdCLFFBQVFHLFVBQVIsQ0FBbUIwQyxLQUFoQyxDQUEzQixHQUFvRSxFQUZwRTtBQUdQYix3QkFBTVUsS0FBSyxDQUFMLEVBQVFFLEtBQVIsQ0FBYyxHQUFkLEVBQW1CLENBQW5CLENBSEM7QUFJUEUsMkJBQVNKLEtBQUssQ0FBTDtBQUpGLGlCQUFUO0FBT0FuRSx1QkFBTztBQUFDekcsMkJBQVNrSSxPQUFWO0FBQW1CZiw0QkFBVWdCLFFBQTdCO0FBQXVDckI7QUFBdkMsaUJBQVA7O0FBQ0Esb0JBQUksS0FBS04sWUFBTCxDQUFrQkMsSUFBbEIsQ0FBSixFQUE2QjtBQUMzQix1QkFBS3dFLFFBQUwsQ0FBY3hFLElBQWQsRUFBb0JtRSxLQUFLLENBQUwsQ0FBcEIsRUFBNkIsS0FBSzVKLFVBQUwsQ0FBZ0J1RixPQUFoQixDQUF3QnFFLEtBQUssQ0FBTCxDQUF4QixDQUE3QjtBQUNEO0FBQ0YsZUFaRCxNQVlPO0FBQ0x4QztBQUNEO0FBQ0YsYUF0QkQsTUFzQk87QUFDTEE7QUFDRDtBQUNGLFdBMUJELE1BMEJPO0FBQ0wsZ0JBQUksQ0FBQyxDQUFDLENBQUNGLFFBQVFHLFVBQVIsQ0FBbUJ0QyxJQUFuQixDQUF3QnVDLE9BQXhCLENBQWlDLEdBQUUsS0FBS25ILGFBQWMsRUFBdEQsQ0FBUCxFQUFpRTtBQUMvRHdKLG9CQUFNekMsUUFBUUcsVUFBUixDQUFtQnRDLElBQW5CLENBQXdCaEQsT0FBeEIsQ0FBaUMsR0FBRSxLQUFLNUIsYUFBYyxFQUF0RCxFQUF5RCxFQUF6RCxDQUFOOztBQUNBLGtCQUFJd0osSUFBSXJDLE9BQUosQ0FBWSxHQUFaLE1BQXFCLENBQXpCLEVBQTRCO0FBQzFCcUMsc0JBQU1BLElBQUlFLFNBQUosQ0FBYyxDQUFkLENBQU47QUFDRDs7QUFFREQscUJBQVFELElBQUlHLEtBQUosQ0FBVSxHQUFWLENBQVI7QUFDQSxrQkFBSUksUUFBUU4sS0FBS0EsS0FBS3RELE1BQUwsR0FBYyxDQUFuQixDQUFaOztBQUNBLGtCQUFJNEQsS0FBSixFQUFXO0FBQ1Qsb0JBQUlGLE9BQUo7O0FBQ0Esb0JBQUksQ0FBQyxDQUFDLENBQUNFLE1BQU01QyxPQUFOLENBQWMsR0FBZCxDQUFQLEVBQTJCO0FBQ3pCMEMsNEJBQVVFLE1BQU1KLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQVY7QUFDQUksMEJBQVVBLE1BQU1KLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLEVBQW9CQSxLQUFwQixDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFWO0FBQ0QsaUJBSEQsTUFHTztBQUNMRSw0QkFBVSxVQUFWO0FBQ0FFLDBCQUFVQSxNQUFNSixLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFWO0FBQ0Q7O0FBRURoRSx5QkFBUztBQUNQaUUseUJBQU83QyxRQUFRRyxVQUFSLENBQW1CMEMsS0FBbkIsR0FBMkJoTCxPQUFPZ0ssS0FBUCxDQUFhN0IsUUFBUUcsVUFBUixDQUFtQjBDLEtBQWhDLENBQTNCLEdBQW9FLEVBRHBFO0FBRVA1RSx3QkFBTStFLEtBRkM7QUFHUDlGLHVCQUFLOEYsTUFBTUosS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FIRTtBQUlQRSx5QkFKTztBQUtQZCx3QkFBTWdCO0FBTEMsaUJBQVQ7QUFPQXpFLHVCQUFPO0FBQUN6RywyQkFBU2tJLE9BQVY7QUFBbUJmLDRCQUFVZ0IsUUFBN0I7QUFBdUNyQjtBQUF2QyxpQkFBUDtBQUNBLHFCQUFLbUUsUUFBTCxDQUFjeEUsSUFBZCxFQUFvQnVFLE9BQXBCLEVBQTZCLEtBQUtoSyxVQUFMLENBQWdCdUYsT0FBaEIsQ0FBd0JPLE9BQU8xQixHQUEvQixDQUE3QjtBQUNELGVBbkJELE1BbUJPO0FBQ0xnRDtBQUNEO0FBQ0YsYUE5QkQsTUE4Qk87QUFDTEE7QUFDRDtBQUNGOztBQUNEO0FBQ0Q7O0FBQ0RBO0FBQ0QsT0FuT0Q7QUFvT0Q7O0FBRUQsUUFBSSxDQUFDLEtBQUs5RyxhQUFWLEVBQXlCO0FBQ3ZCLFlBQU02SixXQUFXLEVBQWpCLENBRHVCLENBR3ZCO0FBQ0E7O0FBQ0FBLGVBQVMsS0FBSzNELFlBQUwsQ0FBa0JJLE9BQTNCLElBQXNDLFVBQVV3RCxRQUFWLEVBQW9CO0FBQ3hEM0wsY0FBTTJMLFFBQU4sRUFBZ0IxTCxNQUFNZ0YsS0FBTixDQUFZN0IsTUFBWixFQUFvQjhCLE1BQXBCLENBQWhCOztBQUNBdkMsYUFBSytCLE1BQUwsQ0FBYSw4Q0FBNkNpSCxRQUFTLElBQW5FOztBQUVBLFlBQUloSixLQUFLTixlQUFULEVBQTBCO0FBQ3hCLGNBQUlNLEtBQUtiLGNBQUwsSUFBdUJ6QyxFQUFFa0UsVUFBRixDQUFhWixLQUFLYixjQUFsQixDQUEzQixFQUE4RDtBQUM1RCxrQkFBTXFGLFNBQVMsS0FBS0EsTUFBcEI7QUFDQSxrQkFBTXlFLFlBQVk7QUFDaEJ6RSxzQkFBUSxLQUFLQSxNQURHOztBQUVoQkQscUJBQU87QUFDTCxvQkFBSXZILE9BQU9rTSxLQUFYLEVBQWtCO0FBQ2hCLHlCQUFPbE0sT0FBT2tNLEtBQVAsQ0FBYS9FLE9BQWIsQ0FBcUJLLE1BQXJCLENBQVA7QUFDRDs7QUFDRCx1QkFBTyxJQUFQO0FBQ0Q7O0FBUGUsYUFBbEI7O0FBVUEsZ0JBQUksQ0FBQ3hFLEtBQUtiLGNBQUwsQ0FBb0J3RixJQUFwQixDQUF5QnNFLFNBQXpCLEVBQXFDakosS0FBSzhDLElBQUwsQ0FBVWtHLFFBQVYsS0FBdUIsSUFBNUQsQ0FBTCxFQUF5RTtBQUN2RSxvQkFBTSxJQUFJaE0sT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsMkNBQXRCLENBQU47QUFDRDtBQUNGOztBQUVELGdCQUFNeUksU0FBU25KLEtBQUs4QyxJQUFMLENBQVVrRyxRQUFWLENBQWY7O0FBQ0EsY0FBSUcsT0FBT0MsS0FBUCxLQUFpQixDQUFyQixFQUF3QjtBQUN0QnBKLGlCQUFLcUQsTUFBTCxDQUFZMkYsUUFBWjtBQUNBLG1CQUFPLElBQVA7QUFDRDs7QUFDRCxnQkFBTSxJQUFJaE0sT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0Isc0NBQXRCLENBQU47QUFDRCxTQXhCRCxNQXdCTztBQUNMLGdCQUFNLElBQUkxRCxPQUFPMEQsS0FBWCxDQUFpQixHQUFqQixFQUFzQixpRUFBdEIsQ0FBTjtBQUNEO0FBQ0YsT0EvQkQsQ0FMdUIsQ0F1Q3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FxSSxlQUFTLEtBQUszRCxZQUFMLENBQWtCRyxNQUEzQixJQUFxQyxVQUFVM0IsSUFBVixFQUFnQndFLFVBQWhCLEVBQTRCO0FBQy9EL0ssY0FBTXVHLElBQU4sRUFBWTtBQUNWRyxnQkFBTXhCLE1BREk7QUFFVjBFLGtCQUFReEcsTUFGRTtBQUdWNEksa0JBQVEvTCxNQUFNZ00sUUFBTixDQUFlN0ksTUFBZixDQUhFO0FBSVYvQixxQkFBVzBELE1BSkQ7QUFLVnlCLHNCQUFZekI7QUFMRixTQUFaO0FBUUEvRSxjQUFNK0ssVUFBTixFQUFrQjlLLE1BQU1nTSxRQUFOLENBQWVuSCxPQUFmLENBQWxCOztBQUVBbkMsYUFBSytCLE1BQUwsQ0FBYSx5Q0FBd0M2QixLQUFLRyxJQUFMLENBQVUrRCxJQUFLLE1BQUtsRSxLQUFLcUQsTUFBTyxFQUFyRjs7QUFDQXJELGFBQUtpRSxJQUFMLEdBQVksSUFBWjs7QUFDQSxjQUFNO0FBQUV2RDtBQUFGLFlBQWF0RSxLQUFLd0gsY0FBTCxDQUFvQjlLLEVBQUVxTCxLQUFGLENBQVFuRSxJQUFSLENBQXBCLEVBQW1DLEtBQUtZLE1BQXhDLEVBQWdELGtCQUFoRCxDQUFuQjs7QUFFQSxZQUFJeEUsS0FBS3BCLFVBQUwsQ0FBZ0J1RixPQUFoQixDQUF3QkcsT0FBT3RCLEdBQS9CLENBQUosRUFBeUM7QUFDdkMsZ0JBQU0sSUFBSWhHLE9BQU8wRCxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLGtEQUF0QixDQUFOO0FBQ0Q7O0FBRURrRCxhQUFLWixHQUFMLEdBQWlCWSxLQUFLcUQsTUFBdEI7QUFDQXJELGFBQUtsQixTQUFMLEdBQWlCLElBQUlzRixJQUFKLEVBQWpCO0FBQ0FwRSxhQUFLcUUsU0FBTCxHQUFpQnJFLEtBQUtDLFVBQXRCOztBQUNBN0QsYUFBS3dDLGNBQUwsQ0FBb0IwRixNQUFwQixDQUEyQnhMLEVBQUV5TCxJQUFGLENBQU92RSxJQUFQLEVBQWEsTUFBYixDQUEzQjs7QUFDQTVELGFBQUswRCxhQUFMLENBQW1CWSxPQUFPdEIsR0FBMUIsRUFBK0JzQixPQUFPWCxJQUF0QyxFQUE0Q2pILEVBQUV5TCxJQUFGLENBQU92RSxJQUFQLEVBQWEsTUFBYixDQUE1Qzs7QUFFQSxZQUFJd0UsVUFBSixFQUFnQjtBQUNkLGlCQUFPO0FBQ0xDLHlCQUFjLEdBQUVySSxLQUFLakIsYUFBYyxJQUFHaUIsS0FBS1gsY0FBZSxXQURyRDtBQUVMMEUsa0JBQU1PO0FBRkQsV0FBUDtBQUlEOztBQUNELGVBQU8sSUFBUDtBQUNELE9BaENELENBN0N1QixDQWdGdkI7QUFDQTtBQUNBOzs7QUFDQXlFLGVBQVMsS0FBSzNELFlBQUwsQ0FBa0JFLE1BQTNCLElBQXFDLFVBQVUxQixJQUFWLEVBQWdCO0FBQ25ELFlBQUlVLE1BQUo7QUFDQWpILGNBQU11RyxJQUFOLEVBQVk7QUFDVnNELGVBQUs1SixNQUFNZ00sUUFBTixDQUFlbkgsT0FBZixDQURLO0FBRVY4RSxrQkFBUXhHLE1BRkU7QUFHVjRHLG1CQUFTL0osTUFBTWdNLFFBQU4sQ0FBZTdJLE1BQWYsQ0FIQztBQUlWOEcsbUJBQVNqSyxNQUFNZ00sUUFBTixDQUFlbEgsTUFBZjtBQUpDLFNBQVo7O0FBT0EsWUFBSXdCLEtBQUt5RCxPQUFULEVBQWtCO0FBQ2hCLGNBQUksT0FBT0YsT0FBT0MsSUFBZCxLQUF1QixVQUEzQixFQUF1QztBQUNyQyxnQkFBSTtBQUNGeEQsbUJBQUt5RCxPQUFMLEdBQWVGLE9BQU9DLElBQVAsQ0FBWXhELEtBQUt5RCxPQUFqQixFQUEwQixRQUExQixDQUFmO0FBQ0QsYUFGRCxDQUVFLE9BQU9DLE9BQVAsRUFBZ0I7QUFDaEIxRCxtQkFBS3lELE9BQUwsR0FBZSxJQUFJRixNQUFKLENBQVd2RCxLQUFLeUQsT0FBaEIsRUFBeUIsUUFBekIsQ0FBZjtBQUNEO0FBQ0YsV0FORCxNQU1PO0FBQ0x6RCxpQkFBS3lELE9BQUwsR0FBZSxJQUFJRixNQUFKLENBQVd2RCxLQUFLeUQsT0FBaEIsRUFBeUIsUUFBekIsQ0FBZjtBQUNEO0FBQ0Y7O0FBRUQsY0FBTXZELGtCQUFrQjlELEtBQUs4RCxlQUFMLENBQXFCRixLQUFLcUQsTUFBMUIsQ0FBeEI7O0FBQ0EsWUFBSSxDQUFDbkQsZUFBTCxFQUFzQjtBQUNwQixnQkFBTSxJQUFJOUcsT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsOERBQXRCLENBQU47QUFDRDs7QUFFRCxhQUFLNkksT0FBTDtBQUNBLFNBQUM7QUFBQ2pGLGdCQUFEO0FBQVNWO0FBQVQsWUFBaUI1RCxLQUFLd0gsY0FBTCxDQUFvQjlLLEVBQUVrSSxNQUFGLENBQVNoQixJQUFULEVBQWVFLGVBQWYsQ0FBcEIsRUFBcUQsS0FBS1UsTUFBMUQsRUFBa0UsS0FBbEUsQ0FBbEI7O0FBRUEsWUFBSVosS0FBS3NELEdBQVQsRUFBYztBQUNaLGNBQUk7QUFDRixtQkFBT2xLLE9BQU93TSxTQUFQLENBQWlCeEosS0FBSzBGLGFBQUwsQ0FBbUIrRCxJQUFuQixDQUF3QnpKLElBQXhCLEVBQThCc0UsTUFBOUIsRUFBc0NWLElBQXRDLENBQWpCLEdBQVA7QUFDRCxXQUZELENBRUUsT0FBTzhGLGVBQVAsRUFBd0I7QUFDeEIxSixpQkFBSytCLE1BQUwsQ0FBWSxtREFBWixFQUFpRTJILGVBQWpFOztBQUNBLGtCQUFNQSxlQUFOO0FBQ0Q7QUFDRixTQVBELE1BT087QUFDTDFKLGVBQUswSCxJQUFMLENBQVUsZUFBVixFQUEyQnBELE1BQTNCLEVBQW1DVixJQUFuQyxFQUF5QzFGLElBQXpDO0FBQ0Q7O0FBQ0QsZUFBTyxJQUFQO0FBQ0QsT0F4Q0QsQ0FuRnVCLENBNkh2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTZLLGVBQVMsS0FBSzNELFlBQUwsQ0FBa0JDLE1BQTNCLElBQXFDLFVBQVVyQyxHQUFWLEVBQWU7QUFDbEQzRixjQUFNMkYsR0FBTixFQUFXdkMsTUFBWDs7QUFFQSxjQUFNcUQsa0JBQWtCOUQsS0FBSzhELGVBQUwsQ0FBcUJkLEdBQXJCLENBQXhCOztBQUNBaEQsYUFBSytCLE1BQUwsQ0FBYSxxQ0FBb0NpQixHQUFJLE1BQU10RyxFQUFFcUUsUUFBRixDQUFXK0MsZ0JBQWdCQyxJQUEzQixJQUFtQ0QsZ0JBQWdCQyxJQUFoQixDQUFxQkosSUFBeEQsR0FBK0QsRUFBSSxFQUE5SDs7QUFFQSxZQUFJM0QsS0FBS2dCLGVBQUwsSUFBd0JoQixLQUFLZ0IsZUFBTCxDQUFxQmdDLEdBQXJCLENBQTVCLEVBQXVEO0FBQ3JEaEQsZUFBS2dCLGVBQUwsQ0FBcUJnQyxHQUFyQixFQUEwQk8sSUFBMUI7O0FBQ0F2RCxlQUFLZ0IsZUFBTCxDQUFxQmdDLEdBQXJCLEVBQTBCUyxLQUExQjtBQUNEOztBQUVELFlBQUlLLGVBQUosRUFBcUI7QUFDbkI5RCxlQUFLd0MsY0FBTCxDQUFvQmEsTUFBcEIsQ0FBMkI7QUFBQ0w7QUFBRCxXQUEzQjs7QUFDQWhELGVBQUtxRCxNQUFMLENBQVk7QUFBQ0w7QUFBRCxXQUFaOztBQUNBLGNBQUl0RyxFQUFFcUUsUUFBRixDQUFXK0MsZ0JBQWdCQyxJQUEzQixLQUFvQ0QsZ0JBQWdCQyxJQUFoQixDQUFxQkosSUFBN0QsRUFBbUU7QUFDakUzRCxpQkFBSzJKLE1BQUwsQ0FBWTtBQUFDM0csaUJBQUQ7QUFBTVcsb0JBQU1HLGdCQUFnQkMsSUFBaEIsQ0FBcUJKO0FBQWpDLGFBQVo7QUFDRDtBQUNGOztBQUNELGVBQU8sSUFBUDtBQUNELE9BbkJEOztBQXFCQTNHLGFBQU80TSxPQUFQLENBQWViLFFBQWY7QUFDRDtBQUNGLEdBanVCc0QsQ0FtdUJ2RDs7Ozs7Ozs7QUFPQXZCLGlCQUFlNUQsT0FBTyxFQUF0QixFQUEwQlksTUFBMUIsRUFBa0NxRixTQUFsQyxFQUE2QztBQUMzQyxRQUFJQyxHQUFKOztBQUNBLFFBQUksQ0FBQ3BOLEVBQUV3RCxTQUFGLENBQVkwRCxLQUFLc0QsR0FBakIsQ0FBTCxFQUE0QjtBQUMxQnRELFdBQUtzRCxHQUFMLEdBQVcsS0FBWDtBQUNEOztBQUVELFFBQUksQ0FBQ3RELEtBQUt5RCxPQUFWLEVBQW1CO0FBQ2pCekQsV0FBS3lELE9BQUwsR0FBZSxLQUFmO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDM0ssRUFBRW1FLFFBQUYsQ0FBVytDLEtBQUsyRCxPQUFoQixDQUFMLEVBQStCO0FBQzdCM0QsV0FBSzJELE9BQUwsR0FBZSxDQUFDLENBQWhCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDN0ssRUFBRTJELFFBQUYsQ0FBV3VELEtBQUt5RixNQUFoQixDQUFMLEVBQThCO0FBQzVCekYsV0FBS3lGLE1BQUwsR0FBY3pGLEtBQUtxRCxNQUFuQjtBQUNEOztBQUVELFNBQUtsRixNQUFMLENBQWEsK0JBQThCOEgsU0FBVSxVQUFTakcsS0FBSzJELE9BQVEsSUFBRzNELEtBQUtDLFVBQVcsaUJBQWdCRCxLQUFLRyxJQUFMLENBQVUrRCxJQUFWLElBQWtCbEUsS0FBS0csSUFBTCxDQUFVZ0csUUFBUyxFQUFuSjs7QUFFQSxVQUFNQSxXQUFXLEtBQUtDLFlBQUwsQ0FBa0JwRyxLQUFLRyxJQUF2QixDQUFqQjs7QUFDQSxVQUFNO0FBQUNrRyxlQUFEO0FBQVlDO0FBQVosUUFBZ0MsS0FBS0MsT0FBTCxDQUFhSixRQUFiLENBQXRDOztBQUVBLFFBQUksQ0FBQ3JOLEVBQUVxRSxRQUFGLENBQVc2QyxLQUFLRyxJQUFMLENBQVUwRCxJQUFyQixDQUFMLEVBQWlDO0FBQy9CN0QsV0FBS0csSUFBTCxDQUFVMEQsSUFBVixHQUFpQixFQUFqQjtBQUNEOztBQUVELFFBQUluRCxTQUFlVixLQUFLRyxJQUF4QjtBQUNBTyxXQUFPd0QsSUFBUCxHQUFtQmlDLFFBQW5CO0FBQ0F6RixXQUFPbUQsSUFBUCxHQUFtQjdELEtBQUtHLElBQUwsQ0FBVTBELElBQTdCO0FBQ0FuRCxXQUFPMkYsU0FBUCxHQUFtQkEsU0FBbkI7QUFDQTNGLFdBQU84RixHQUFQLEdBQW1CSCxTQUFuQjtBQUNBM0YsV0FBT3RCLEdBQVAsR0FBbUJZLEtBQUtxRCxNQUF4QjtBQUNBM0MsV0FBT0UsTUFBUCxHQUFtQkEsVUFBVSxJQUE3QjtBQUNBWixTQUFLeUYsTUFBTCxHQUFtQnpGLEtBQUt5RixNQUFMLENBQVkxSSxPQUFaLENBQW9CLG9CQUFwQixFQUEwQyxHQUExQyxDQUFuQjtBQUNBMkQsV0FBT1gsSUFBUCxHQUFvQixHQUFFLEtBQUt0RixXQUFMLENBQWlCaUcsTUFBakIsQ0FBeUIsR0FBRXhHLFNBQVM0RCxHQUFJLEdBQUVrQyxLQUFLeUYsTUFBTyxHQUFFYSxnQkFBaUIsRUFBL0Y7QUFDQTVGLGFBQW1CNUgsRUFBRWtJLE1BQUYsQ0FBU04sTUFBVCxFQUFpQixLQUFLK0YsYUFBTCxDQUFtQi9GLE1BQW5CLENBQWpCLENBQW5COztBQUVBLFFBQUksS0FBS2hGLGNBQUwsSUFBdUI1QyxFQUFFa0UsVUFBRixDQUFhLEtBQUt0QixjQUFsQixDQUEzQixFQUE4RDtBQUM1RHdLLFlBQU1wTixFQUFFa0ksTUFBRixDQUFTO0FBQ2JiLGNBQU1ILEtBQUtHO0FBREUsT0FBVCxFQUVIO0FBQ0R3RCxpQkFBUzNELEtBQUsyRCxPQURiO0FBRUQvQyxnQkFBUUYsT0FBT0UsTUFGZDs7QUFHREQsZUFBTztBQUNMLGNBQUl2SCxPQUFPa00sS0FBUCxJQUFnQjVFLE9BQU9FLE1BQTNCLEVBQW1DO0FBQ2pDLG1CQUFPeEgsT0FBT2tNLEtBQVAsQ0FBYS9FLE9BQWIsQ0FBcUJHLE9BQU9FLE1BQTVCLENBQVA7QUFDRDs7QUFDRCxpQkFBTyxJQUFQO0FBQ0QsU0FSQTs7QUFTRDBDLGFBQUt0RCxLQUFLc0Q7QUFUVCxPQUZHLENBQU47QUFhQSxZQUFNb0Qsa0JBQWtCLEtBQUtoTCxjQUFMLENBQW9CcUYsSUFBcEIsQ0FBeUJtRixHQUF6QixFQUE4QnhGLE1BQTlCLENBQXhCOztBQUVBLFVBQUlnRyxvQkFBb0IsSUFBeEIsRUFBOEI7QUFDNUIsY0FBTSxJQUFJdE4sT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0JoRSxFQUFFMkQsUUFBRixDQUFXaUssZUFBWCxJQUE4QkEsZUFBOUIsR0FBZ0Qsa0NBQXRFLENBQU47QUFDRCxPQUZELE1BRU87QUFDTCxZQUFLMUcsS0FBS2lFLElBQUwsS0FBYyxJQUFmLElBQXdCLEtBQUtqSSxnQkFBN0IsSUFBaURsRCxFQUFFa0UsVUFBRixDQUFhLEtBQUtoQixnQkFBbEIsQ0FBckQsRUFBMEY7QUFDeEYsZUFBS0EsZ0JBQUwsQ0FBc0IrRSxJQUF0QixDQUEyQm1GLEdBQTNCLEVBQWdDeEYsTUFBaEM7QUFDRDtBQUNGO0FBQ0YsS0F2QkQsTUF1Qk8sSUFBS1YsS0FBS2lFLElBQUwsS0FBYyxJQUFmLElBQXdCLEtBQUtqSSxnQkFBN0IsSUFBaURsRCxFQUFFa0UsVUFBRixDQUFhLEtBQUtoQixnQkFBbEIsQ0FBckQsRUFBMEY7QUFDL0ZrSyxZQUFNcE4sRUFBRWtJLE1BQUYsQ0FBUztBQUNiYixjQUFNSCxLQUFLRztBQURFLE9BQVQsRUFFSDtBQUNEd0QsaUJBQVMzRCxLQUFLMkQsT0FEYjtBQUVEL0MsZ0JBQVFGLE9BQU9FLE1BRmQ7O0FBR0RELGVBQU87QUFDTCxjQUFJdkgsT0FBT2tNLEtBQVAsSUFBZ0I1RSxPQUFPRSxNQUEzQixFQUFtQztBQUNqQyxtQkFBT3hILE9BQU9rTSxLQUFQLENBQWEvRSxPQUFiLENBQXFCRyxPQUFPRSxNQUE1QixDQUFQO0FBQ0Q7O0FBQ0QsaUJBQU8sSUFBUDtBQUNELFNBUkE7O0FBU0QwQyxhQUFLdEQsS0FBS3NEO0FBVFQsT0FGRyxDQUFOO0FBYUEsV0FBS3RILGdCQUFMLENBQXNCK0UsSUFBdEIsQ0FBMkJtRixHQUEzQixFQUFnQ3hGLE1BQWhDO0FBQ0Q7O0FBRUQsV0FBTztBQUFDQSxZQUFEO0FBQVNWO0FBQVQsS0FBUDtBQUNELEdBenpCc0QsQ0EyekJ2RDs7Ozs7Ozs7QUFPQStCLGdCQUFjckIsTUFBZCxFQUFzQlYsSUFBdEIsRUFBNEIyRyxFQUE1QixFQUFnQztBQUM5QixTQUFLeEksTUFBTCxDQUFhLHFEQUFvRHVDLE9BQU9YLElBQUssRUFBN0U7O0FBQ0FqRyxPQUFHOE0sS0FBSCxDQUFTbEcsT0FBT1gsSUFBaEIsRUFBc0IsS0FBSzlFLFdBQTNCLEVBQXdDWCxJQUF4QztBQUNBb0csV0FBTzdDLElBQVAsR0FBZ0IsS0FBS2dKLFlBQUwsQ0FBa0I3RyxLQUFLRyxJQUF2QixDQUFoQjtBQUNBTyxXQUFPOUYsTUFBUCxHQUFnQixLQUFLQSxNQUFyQjs7QUFDQSxTQUFLa00sZ0JBQUwsQ0FBc0JwRyxNQUF0Qjs7QUFFQSxTQUFLMUYsVUFBTCxDQUFnQnNKLE1BQWhCLENBQXVCeEwsRUFBRXFMLEtBQUYsQ0FBUXpELE1BQVIsQ0FBdkIsRUFBd0MsQ0FBQ3BDLEtBQUQsRUFBUWMsR0FBUixLQUFnQjtBQUN0RCxVQUFJZCxLQUFKLEVBQVc7QUFDVHFJLGNBQU1BLEdBQUdySSxLQUFILENBQU47O0FBQ0EsYUFBS0gsTUFBTCxDQUFZLG1EQUFaLEVBQWlFRyxLQUFqRTtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUtNLGNBQUwsQ0FBb0JtSSxNQUFwQixDQUEyQjtBQUFDM0gsZUFBS1ksS0FBS3FEO0FBQVgsU0FBM0IsRUFBK0M7QUFBQzJELGdCQUFNO0FBQUMzSCx3QkFBWTtBQUFiO0FBQVAsU0FBL0M7O0FBQ0FxQixlQUFPdEIsR0FBUCxHQUFhQSxHQUFiOztBQUNBLGFBQUtqQixNQUFMLENBQWEsb0RBQW1EdUMsT0FBT1gsSUFBSyxFQUE1RTs7QUFDQSxhQUFLM0UsYUFBTCxJQUFzQixLQUFLQSxhQUFMLENBQW1CMkYsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJMLE1BQTlCLENBQXRCO0FBQ0EsYUFBS29ELElBQUwsQ0FBVSxhQUFWLEVBQXlCcEQsTUFBekI7QUFDQWlHLGNBQU1BLEdBQUcsSUFBSCxFQUFTakcsTUFBVCxDQUFOO0FBQ0Q7QUFDRixLQVpEO0FBYUQsR0F0MUJzRCxDQXcxQnZEOzs7Ozs7OztBQU9Bb0IsZ0JBQWNwQixNQUFkLEVBQXNCVixJQUF0QixFQUE0QjJHLEVBQTVCLEVBQWdDO0FBQzlCLFFBQUk7QUFDRixVQUFJM0csS0FBS3NELEdBQVQsRUFBYztBQUNaLGFBQUtsRyxlQUFMLENBQXFCc0QsT0FBT3RCLEdBQTVCLEVBQWlDUSxHQUFqQyxDQUFxQyxNQUFNO0FBQ3pDLGVBQUtrRSxJQUFMLENBQVUsZUFBVixFQUEyQnBELE1BQTNCLEVBQW1DVixJQUFuQyxFQUF5QzJHLEVBQXpDO0FBQ0QsU0FGRDtBQUdELE9BSkQsTUFJTztBQUNMLGFBQUt2SixlQUFMLENBQXFCc0QsT0FBT3RCLEdBQTVCLEVBQWlDNkgsS0FBakMsQ0FBdUNqSCxLQUFLMkQsT0FBNUMsRUFBcUQzRCxLQUFLeUQsT0FBMUQsRUFBbUVrRCxFQUFuRTtBQUNEO0FBQ0YsS0FSRCxDQVFFLE9BQU9PLENBQVAsRUFBVTtBQUNWLFdBQUsvSSxNQUFMLENBQVksOEJBQVosRUFBNEMrSSxDQUE1Qzs7QUFDQVAsWUFBTUEsR0FBR08sQ0FBSCxDQUFOO0FBQ0Q7QUFDRixHQTUyQnNELENBODJCdkQ7Ozs7Ozs7OztBQVFBTCxlQUFhTSxRQUFiLEVBQXVCO0FBQ3JCLFFBQUlDLElBQUo7QUFDQTNOLFVBQU0wTixRQUFOLEVBQWdCeEksTUFBaEI7O0FBQ0EsUUFBSTdGLEVBQUVxRSxRQUFGLENBQVdnSyxRQUFYLEtBQXdCQSxTQUFTdEosSUFBckMsRUFBMkM7QUFDekN1SixhQUFPRCxTQUFTdEosSUFBaEI7QUFDRDs7QUFFRCxRQUFJc0osU0FBU3BILElBQVQsS0FBa0IsQ0FBQ3FILElBQUQsSUFBUyxDQUFDdE8sRUFBRTJELFFBQUYsQ0FBVzJLLElBQVgsQ0FBNUIsQ0FBSixFQUFtRDtBQUNqRCxVQUFJO0FBQ0YsWUFBSUMsTUFBUSxJQUFJOUQsTUFBSixDQUFXLEdBQVgsQ0FBWjtBQUNBLGNBQU0rRCxLQUFNeE4sR0FBR3lOLFFBQUgsQ0FBWUosU0FBU3BILElBQXJCLEVBQTJCLEdBQTNCLENBQVo7QUFDQSxjQUFNeUgsS0FBTTFOLEdBQUcyTixRQUFILENBQVlILEVBQVosRUFBZ0JELEdBQWhCLEVBQXFCLENBQXJCLEVBQXdCLEdBQXhCLEVBQTZCLENBQTdCLENBQVo7QUFDQXZOLFdBQUc0TixLQUFILENBQVNKLEVBQVQsRUFBYWhOLElBQWI7O0FBQ0EsWUFBSWtOLEtBQUssR0FBVCxFQUFjO0FBQ1pILGdCQUFNQSxJQUFJTSxLQUFKLENBQVUsQ0FBVixFQUFhSCxFQUFiLENBQU47QUFDRDs7QUFDRCxTQUFDO0FBQUNKO0FBQUQsWUFBU25OLFNBQVNvTixHQUFULENBQVY7QUFDRCxPQVRELENBU0UsT0FBT0gsQ0FBUCxFQUFVLENBQ1Y7QUFDRDtBQUNGOztBQUVELFFBQUksQ0FBQ0UsSUFBRCxJQUFTLENBQUN0TyxFQUFFMkQsUUFBRixDQUFXMkssSUFBWCxDQUFkLEVBQWdDO0FBQzlCQSxhQUFPLDBCQUFQO0FBQ0Q7O0FBQ0QsV0FBT0EsSUFBUDtBQUNELEdBaDVCc0QsQ0FrNUJ2RDs7Ozs7Ozs7QUFPQXZHLFdBQVNKLElBQVQsRUFBZTtBQUNiLFVBQU1DLFNBQVM7QUFDYkMsYUFBTztBQUFFLGVBQU8sSUFBUDtBQUFjLE9BRFY7O0FBRWJDLGNBQVE7QUFGSyxLQUFmOztBQUtBLFFBQUlILElBQUosRUFBVTtBQUNSLFVBQUltSCxPQUFPLElBQVg7O0FBQ0EsVUFBSW5ILEtBQUt6RyxPQUFMLENBQWF3RCxPQUFiLENBQXFCLFFBQXJCLENBQUosRUFBb0M7QUFDbENvSyxlQUFPbkgsS0FBS3pHLE9BQUwsQ0FBYXdELE9BQWIsQ0FBcUIsUUFBckIsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU1uQixTQUFTb0UsS0FBS3pHLE9BQUwsQ0FBYVYsT0FBNUI7O0FBQ0EsWUFBSStDLE9BQU8rRyxHQUFQLENBQVcsUUFBWCxDQUFKLEVBQTBCO0FBQ3hCd0UsaUJBQU92TCxPQUFPd0wsR0FBUCxDQUFXLFFBQVgsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSUQsSUFBSixFQUFVO0FBQ1IsY0FBTWhILFNBQVU5SCxFQUFFcUUsUUFBRixDQUFXL0QsT0FBTzhKLE1BQVAsQ0FBY0MsUUFBekIsS0FBc0NySyxFQUFFcUUsUUFBRixDQUFXL0QsT0FBTzhKLE1BQVAsQ0FBY0MsUUFBZCxDQUF1QnlFLElBQXZCLENBQVgsQ0FBdkMsR0FBbUZ4TyxPQUFPOEosTUFBUCxDQUFjQyxRQUFkLENBQXVCeUUsSUFBdkIsRUFBNkJoSCxNQUFoSCxHQUF5SCxLQUFLLENBQTdJOztBQUVBLFlBQUlBLE1BQUosRUFBWTtBQUNWRixpQkFBT0MsSUFBUCxHQUFnQixNQUFNdkgsT0FBT2tNLEtBQVAsQ0FBYS9FLE9BQWIsQ0FBcUJLLE1BQXJCLENBQXRCOztBQUNBRixpQkFBT0UsTUFBUCxHQUFnQkEsTUFBaEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBT0YsTUFBUDtBQUNELEdBcjdCc0QsQ0F1N0J2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkF1RyxRQUFNYSxNQUFOLEVBQWM5SCxPQUFPLEVBQXJCLEVBQXlCM0YsUUFBekIsRUFBbUMwTixrQkFBbkMsRUFBdUQ7QUFDckQsU0FBSzVKLE1BQUwsQ0FBWSw2QkFBWjs7QUFFQSxRQUFJckYsRUFBRWtFLFVBQUYsQ0FBYWdELElBQWIsQ0FBSixFQUF3QjtBQUN0QitILDJCQUFxQjFOLFFBQXJCO0FBQ0FBLGlCQUFXMkYsSUFBWDtBQUNBQSxhQUFXLEVBQVg7QUFDRCxLQUpELE1BSU8sSUFBSWxILEVBQUV3RCxTQUFGLENBQVlqQyxRQUFaLENBQUosRUFBMkI7QUFDaEMwTiwyQkFBcUIxTixRQUFyQjtBQUNELEtBRk0sTUFFQSxJQUFJdkIsRUFBRXdELFNBQUYsQ0FBWTBELElBQVosQ0FBSixFQUF1QjtBQUM1QitILDJCQUFxQi9ILElBQXJCO0FBQ0Q7O0FBRUR2RyxVQUFNdUcsSUFBTixFQUFZdEcsTUFBTWdNLFFBQU4sQ0FBZS9HLE1BQWYsQ0FBWjtBQUNBbEYsVUFBTVksUUFBTixFQUFnQlgsTUFBTWdNLFFBQU4sQ0FBZWpILFFBQWYsQ0FBaEI7QUFDQWhGLFVBQU1zTyxrQkFBTixFQUEwQnJPLE1BQU1nTSxRQUFOLENBQWVuSCxPQUFmLENBQTFCO0FBRUEsVUFBTThFLFNBQVdyRCxLQUFLcUQsTUFBTCxJQUFlaEssT0FBTzJPLEVBQVAsRUFBaEM7QUFDQSxVQUFNdkMsU0FBVyxLQUFLOUosY0FBTCxHQUFzQixLQUFLQSxjQUFMLENBQW9CcUUsSUFBcEIsQ0FBdEIsR0FBa0RxRCxNQUFuRTtBQUNBLFVBQU04QyxXQUFZbkcsS0FBS2tFLElBQUwsSUFBYWxFLEtBQUttRyxRQUFuQixHQUFnQ25HLEtBQUtrRSxJQUFMLElBQWFsRSxLQUFLbUcsUUFBbEQsR0FBOERWLE1BQS9FOztBQUVBLFVBQU07QUFBQ1ksZUFBRDtBQUFZQztBQUFaLFFBQWdDLEtBQUtDLE9BQUwsQ0FBYUosUUFBYixDQUF0Qzs7QUFFQW5HLFNBQUtELElBQUwsR0FBYSxHQUFFLEtBQUt0RixXQUFMLENBQWlCdUYsSUFBakIsQ0FBdUIsR0FBRTlGLFNBQVM0RCxHQUFJLEdBQUUySCxNQUFPLEdBQUVhLGdCQUFpQixFQUFqRjtBQUNBdEcsU0FBS25DLElBQUwsR0FBWSxLQUFLZ0osWUFBTCxDQUFrQjdHLElBQWxCLENBQVo7O0FBQ0EsUUFBSSxDQUFDbEgsRUFBRXFFLFFBQUYsQ0FBVzZDLEtBQUs2RCxJQUFoQixDQUFMLEVBQTRCO0FBQzFCN0QsV0FBSzZELElBQUwsR0FBWSxFQUFaO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDL0ssRUFBRW1FLFFBQUYsQ0FBVytDLEtBQUtyQyxJQUFoQixDQUFMLEVBQTRCO0FBQzFCcUMsV0FBS3JDLElBQUwsR0FBWW1LLE9BQU94RyxNQUFuQjtBQUNEOztBQUVELFVBQU1aLFNBQVMsS0FBSytGLGFBQUwsQ0FBbUI7QUFDaEN2QyxZQUFNaUMsUUFEMEI7QUFFaENwRyxZQUFNQyxLQUFLRCxJQUZxQjtBQUdoQzhELFlBQU03RCxLQUFLNkQsSUFIcUI7QUFJaENoRyxZQUFNbUMsS0FBS25DLElBSnFCO0FBS2hDRixZQUFNcUMsS0FBS3JDLElBTHFCO0FBTWhDaUQsY0FBUVosS0FBS1ksTUFObUI7QUFPaEN5RjtBQVBnQyxLQUFuQixDQUFmOztBQVVBM0YsV0FBT3RCLEdBQVAsR0FBYWlFLE1BQWI7QUFFQSxVQUFNNEUsU0FBU25PLEdBQUdvTyxpQkFBSCxDQUFxQmxJLEtBQUtELElBQTFCLEVBQWdDO0FBQUNvSSxhQUFPLEdBQVI7QUFBYTlKLFlBQU0sS0FBS3BEO0FBQXhCLEtBQWhDLENBQWY7QUFDQWdOLFdBQU9ySSxHQUFQLENBQVdrSSxNQUFYLEVBQW9CTSxTQUFELElBQWVqTyxNQUFNLE1BQU07QUFDNUMsVUFBSWlPLFNBQUosRUFBZTtBQUNiL04sb0JBQVlBLFNBQVMrTixTQUFULENBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLcE4sVUFBTCxDQUFnQnNKLE1BQWhCLENBQXVCNUQsTUFBdkIsRUFBK0IsQ0FBQzJILFNBQUQsRUFBWWpKLEdBQVosS0FBb0I7QUFDakQsY0FBSWlKLFNBQUosRUFBZTtBQUNiaE8sd0JBQVlBLFNBQVNnTyxTQUFULENBQVo7O0FBQ0EsaUJBQUtsSyxNQUFMLENBQWEsNkNBQTRDZ0ksUUFBUyxPQUFNLEtBQUsxSyxjQUFlLEVBQTVGLEVBQStGNE0sU0FBL0Y7QUFDRCxXQUhELE1BR087QUFDTCxrQkFBTS9LLFVBQVUsS0FBS3RDLFVBQUwsQ0FBZ0J1RixPQUFoQixDQUF3Qm5CLEdBQXhCLENBQWhCO0FBQ0EvRSx3QkFBWUEsU0FBUyxJQUFULEVBQWVpRCxPQUFmLENBQVo7O0FBQ0EsZ0JBQUl5Syx1QkFBdUIsSUFBM0IsRUFBaUM7QUFDL0IsbUJBQUszTSxhQUFMLElBQXNCLEtBQUtBLGFBQUwsQ0FBbUIyRixJQUFuQixDQUF3QixJQUF4QixFQUE4QnpELE9BQTlCLENBQXRCO0FBQ0EsbUJBQUt3RyxJQUFMLENBQVUsYUFBVixFQUF5QnhHLE9BQXpCO0FBQ0Q7O0FBQ0QsaUJBQUthLE1BQUwsQ0FBYSw4QkFBNkJnSSxRQUFTLE9BQU0sS0FBSzFLLGNBQWUsRUFBN0U7QUFDRDtBQUNGLFNBYkQ7QUFjRDtBQUNGLEtBbkJpQyxDQUFsQztBQW9CQSxXQUFPLElBQVA7QUFDRCxHQTFnQ3NELENBNGdDdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTZNLE9BQUtDLEdBQUwsRUFBVXZJLE9BQU8sRUFBakIsRUFBcUIzRixRQUFyQixFQUErQjBOLGtCQUEvQixFQUFtRDtBQUNqRCxTQUFLNUosTUFBTCxDQUFhLDJCQUEwQm9LLEdBQUksS0FBSXpGLEtBQUtDLFNBQUwsQ0FBZS9DLElBQWYsQ0FBcUIsY0FBcEU7O0FBRUEsUUFBSWxILEVBQUVrRSxVQUFGLENBQWFnRCxJQUFiLENBQUosRUFBd0I7QUFDdEIrSCwyQkFBcUIxTixRQUFyQjtBQUNBQSxpQkFBVzJGLElBQVg7QUFDQUEsYUFBVyxFQUFYO0FBQ0QsS0FKRCxNQUlPLElBQUlsSCxFQUFFd0QsU0FBRixDQUFZakMsUUFBWixDQUFKLEVBQTJCO0FBQ2hDME4sMkJBQXFCMU4sUUFBckI7QUFDRCxLQUZNLE1BRUEsSUFBSXZCLEVBQUV3RCxTQUFGLENBQVkwRCxJQUFaLENBQUosRUFBdUI7QUFDNUIrSCwyQkFBcUIvSCxJQUFyQjtBQUNEOztBQUVEdkcsVUFBTThPLEdBQU4sRUFBVzFMLE1BQVg7QUFDQXBELFVBQU11RyxJQUFOLEVBQVl0RyxNQUFNZ00sUUFBTixDQUFlL0csTUFBZixDQUFaO0FBQ0FsRixVQUFNWSxRQUFOLEVBQWdCWCxNQUFNZ00sUUFBTixDQUFlakgsUUFBZixDQUFoQjtBQUNBaEYsVUFBTXNPLGtCQUFOLEVBQTBCck8sTUFBTWdNLFFBQU4sQ0FBZW5ILE9BQWYsQ0FBMUI7O0FBRUEsUUFBSSxDQUFDekYsRUFBRXFFLFFBQUYsQ0FBVzZDLElBQVgsQ0FBTCxFQUF1QjtBQUNyQkEsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsVUFBTXFELFNBQVlyRCxLQUFLcUQsTUFBTCxJQUFlaEssT0FBTzJPLEVBQVAsRUFBakM7QUFDQSxVQUFNdkMsU0FBWSxLQUFLOUosY0FBTCxHQUFzQixLQUFLQSxjQUFMLENBQW9CcUUsSUFBcEIsQ0FBdEIsR0FBa0RxRCxNQUFwRTtBQUNBLFVBQU1tRixZQUFZRCxJQUFJekQsS0FBSixDQUFVLEdBQVYsQ0FBbEI7QUFDQSxVQUFNcUIsV0FBYW5HLEtBQUtrRSxJQUFMLElBQWFsRSxLQUFLbUcsUUFBbkIsR0FBZ0NuRyxLQUFLa0UsSUFBTCxJQUFhbEUsS0FBS21HLFFBQWxELEdBQThEcUMsVUFBVUEsVUFBVWxILE1BQVYsR0FBbUIsQ0FBN0IsS0FBbUNtRSxNQUFuSDs7QUFFQSxVQUFNO0FBQUNZLGVBQUQ7QUFBWUM7QUFBWixRQUFnQyxLQUFLQyxPQUFMLENBQWFKLFFBQWIsQ0FBdEM7O0FBQ0FuRyxTQUFLRCxJQUFMLEdBQWMsR0FBRSxLQUFLdEYsV0FBTCxDQUFpQnVGLElBQWpCLENBQXVCLEdBQUU5RixTQUFTNEQsR0FBSSxHQUFFMkgsTUFBTyxHQUFFYSxnQkFBaUIsRUFBbEY7O0FBRUEsVUFBTW1DLGNBQWMsQ0FBQy9ILE1BQUQsRUFBU2lHLEVBQVQsS0FBZ0I7QUFDbENqRyxhQUFPdEIsR0FBUCxHQUFhaUUsTUFBYjtBQUVBLFdBQUtySSxVQUFMLENBQWdCc0osTUFBaEIsQ0FBdUI1RCxNQUF2QixFQUErQixDQUFDcEMsS0FBRCxFQUFRYyxHQUFSLEtBQWdCO0FBQzdDLFlBQUlkLEtBQUosRUFBVztBQUNUcUksZ0JBQU1BLEdBQUdySSxLQUFILENBQU47O0FBQ0EsZUFBS0gsTUFBTCxDQUFhLDRDQUEyQ2dJLFFBQVMsT0FBTSxLQUFLMUssY0FBZSxFQUEzRixFQUE4RjZDLEtBQTlGO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsZ0JBQU1oQixVQUFVLEtBQUt0QyxVQUFMLENBQWdCdUYsT0FBaEIsQ0FBd0JuQixHQUF4QixDQUFoQjtBQUNBdUgsZ0JBQU1BLEdBQUcsSUFBSCxFQUFTckosT0FBVCxDQUFOOztBQUNBLGNBQUl5Syx1QkFBdUIsSUFBM0IsRUFBaUM7QUFDL0IsaUJBQUszTSxhQUFMLElBQXNCLEtBQUtBLGFBQUwsQ0FBbUIyRixJQUFuQixDQUF3QixJQUF4QixFQUE4QnpELE9BQTlCLENBQXRCO0FBQ0EsaUJBQUt3RyxJQUFMLENBQVUsYUFBVixFQUF5QnhHLE9BQXpCO0FBQ0Q7O0FBQ0QsZUFBS2EsTUFBTCxDQUFhLHFDQUFvQ2dJLFFBQVMsT0FBTSxLQUFLMUssY0FBZSxFQUFwRjtBQUNEO0FBQ0YsT0FiRDtBQWNELEtBakJEOztBQW1CQXpCLFlBQVE2TixHQUFSLENBQVk7QUFDVlUsU0FEVTtBQUVWL0ssZUFBU3dDLEtBQUt4QyxPQUFMLElBQWdCO0FBRmYsS0FBWixFQUdHcUUsRUFISCxDQUdNLE9BSE4sRUFHZ0J2RCxLQUFELElBQVduRSxNQUFNLE1BQU07QUFDcENFLGtCQUFZQSxTQUFTaUUsS0FBVCxDQUFaOztBQUNBLFdBQUtILE1BQUwsQ0FBYSx5Q0FBd0NvSyxHQUFJLFdBQXpELEVBQXFFakssS0FBckU7QUFDRCxLQUh5QixDQUgxQixFQU1JdUQsRUFOSixDQU1PLFVBTlAsRUFNb0JWLFFBQUQsSUFBY2hILE1BQU0sTUFBTTtBQUMzQ2dILGVBQVNVLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLE1BQU0xSCxNQUFNLE1BQU07QUFDbkMsYUFBS2dFLE1BQUwsQ0FBYSxzQ0FBcUNvSyxHQUFJLEVBQXREOztBQUNBLGNBQU03SCxTQUFTLEtBQUsrRixhQUFMLENBQW1CO0FBQ2hDdkMsZ0JBQU1pQyxRQUQwQjtBQUVoQ3BHLGdCQUFNQyxLQUFLRCxJQUZxQjtBQUdoQzhELGdCQUFNN0QsS0FBSzZELElBSHFCO0FBSWhDaEcsZ0JBQU1tQyxLQUFLbkMsSUFBTCxJQUFhc0QsU0FBUzNELE9BQVQsQ0FBaUIsY0FBakIsQ0FBYixJQUFpRCxLQUFLcUosWUFBTCxDQUFrQjtBQUFDOUcsa0JBQU1DLEtBQUtEO0FBQVosV0FBbEIsQ0FKdkI7QUFLaENwQyxnQkFBTXFDLEtBQUtyQyxJQUFMLElBQWFULFNBQVNpRSxTQUFTM0QsT0FBVCxDQUFpQixnQkFBakIsS0FBc0MsQ0FBL0MsQ0FMYTtBQU1oQ29ELGtCQUFRWixLQUFLWSxNQU5tQjtBQU9oQ3lGO0FBUGdDLFNBQW5CLENBQWY7O0FBVUEsWUFBSSxDQUFDM0YsT0FBTy9DLElBQVosRUFBa0I7QUFDaEI3RCxhQUFHNE8sSUFBSCxDQUFRMUksS0FBS0QsSUFBYixFQUFtQixDQUFDekIsS0FBRCxFQUFRcUssS0FBUixLQUFrQnhPLE1BQU0sTUFBTTtBQUMvQyxnQkFBSW1FLEtBQUosRUFBVztBQUNUakUsMEJBQVlBLFNBQVNpRSxLQUFULENBQVo7QUFDRCxhQUZELE1BRU87QUFDTG9DLHFCQUFPa0ksUUFBUCxDQUFnQkMsUUFBaEIsQ0FBeUJsTCxJQUF6QixHQUFpQytDLE9BQU8vQyxJQUFQLEdBQWNnTCxNQUFNaEwsSUFBckQ7QUFDQThLLDBCQUFZL0gsTUFBWixFQUFvQnJHLFFBQXBCO0FBQ0Q7QUFDRixXQVBvQyxDQUFyQztBQVFELFNBVEQsTUFTTztBQUNMb08sc0JBQVkvSCxNQUFaLEVBQW9CckcsUUFBcEI7QUFDRDtBQUNGLE9BeEJ3QixDQUF6QjtBQXlCRCxLQTFCZ0MsQ0FOakMsRUFnQ0l5TyxJQWhDSixDQWdDU2hQLEdBQUdvTyxpQkFBSCxDQUFxQmxJLEtBQUtELElBQTFCLEVBQWdDO0FBQUNvSSxhQUFPLEdBQVI7QUFBYTlKLFlBQU0sS0FBS3BEO0FBQXhCLEtBQWhDLENBaENUO0FBa0NBLFdBQU8sSUFBUDtBQUNELEdBam5Dc0QsQ0FtbkN2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE4TixVQUFRaEosSUFBUixFQUFjQyxPQUFPLEVBQXJCLEVBQXlCM0YsUUFBekIsRUFBbUMwTixrQkFBbkMsRUFBdUQ7QUFDckQsU0FBSzVKLE1BQUwsQ0FBYSw4QkFBNkI0QixJQUFLLElBQS9DOztBQUVBLFFBQUlqSCxFQUFFa0UsVUFBRixDQUFhZ0QsSUFBYixDQUFKLEVBQXdCO0FBQ3RCK0gsMkJBQXFCMU4sUUFBckI7QUFDQUEsaUJBQVcyRixJQUFYO0FBQ0FBLGFBQVcsRUFBWDtBQUNELEtBSkQsTUFJTyxJQUFJbEgsRUFBRXdELFNBQUYsQ0FBWWpDLFFBQVosQ0FBSixFQUEyQjtBQUNoQzBOLDJCQUFxQjFOLFFBQXJCO0FBQ0QsS0FGTSxNQUVBLElBQUl2QixFQUFFd0QsU0FBRixDQUFZMEQsSUFBWixDQUFKLEVBQXVCO0FBQzVCK0gsMkJBQXFCL0gsSUFBckI7QUFDRDs7QUFFRCxRQUFJLEtBQUtwRixNQUFULEVBQWlCO0FBQ2YsWUFBTSxJQUFJeEIsT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0Isa0hBQXRCLENBQU47QUFDRDs7QUFFRHJELFVBQU1zRyxJQUFOLEVBQVlsRCxNQUFaO0FBQ0FwRCxVQUFNdUcsSUFBTixFQUFZdEcsTUFBTWdNLFFBQU4sQ0FBZS9HLE1BQWYsQ0FBWjtBQUNBbEYsVUFBTVksUUFBTixFQUFnQlgsTUFBTWdNLFFBQU4sQ0FBZWpILFFBQWYsQ0FBaEI7QUFDQWhGLFVBQU1zTyxrQkFBTixFQUEwQnJPLE1BQU1nTSxRQUFOLENBQWVuSCxPQUFmLENBQTFCO0FBRUF6RSxPQUFHNE8sSUFBSCxDQUFRM0ksSUFBUixFQUFjLENBQUNpSixPQUFELEVBQVVMLEtBQVYsS0FBb0J4TyxNQUFNLE1BQU07QUFDNUMsVUFBSTZPLE9BQUosRUFBYTtBQUNYM08sb0JBQVlBLFNBQVMyTyxPQUFULENBQVo7QUFDRCxPQUZELE1BRU8sSUFBSUwsTUFBTU0sTUFBTixFQUFKLEVBQW9CO0FBQ3pCLFlBQUksQ0FBQ25RLEVBQUVxRSxRQUFGLENBQVc2QyxJQUFYLENBQUwsRUFBdUI7QUFDckJBLGlCQUFPLEVBQVA7QUFDRDs7QUFDREEsYUFBS0QsSUFBTCxHQUFhQSxJQUFiOztBQUVBLFlBQUksQ0FBQ0MsS0FBS21HLFFBQVYsRUFBb0I7QUFDbEIsZ0JBQU1xQyxZQUFZekksS0FBSytFLEtBQUwsQ0FBVzVLLFNBQVM0RCxHQUFwQixDQUFsQjtBQUNBa0MsZUFBS21HLFFBQUwsR0FBa0JwRyxLQUFLK0UsS0FBTCxDQUFXNUssU0FBUzRELEdBQXBCLEVBQXlCMEssVUFBVWxILE1BQVYsR0FBbUIsQ0FBNUMsQ0FBbEI7QUFDRDs7QUFFRCxjQUFNO0FBQUMrRTtBQUFELFlBQWMsS0FBS0UsT0FBTCxDQUFhdkcsS0FBS21HLFFBQWxCLENBQXBCOztBQUVBLFlBQUksQ0FBQ3JOLEVBQUUyRCxRQUFGLENBQVd1RCxLQUFLbkMsSUFBaEIsQ0FBTCxFQUE0QjtBQUMxQm1DLGVBQUtuQyxJQUFMLEdBQVksS0FBS2dKLFlBQUwsQ0FBa0I3RyxJQUFsQixDQUFaO0FBQ0Q7O0FBRUQsWUFBSSxDQUFDbEgsRUFBRXFFLFFBQUYsQ0FBVzZDLEtBQUs2RCxJQUFoQixDQUFMLEVBQTRCO0FBQzFCN0QsZUFBSzZELElBQUwsR0FBWSxFQUFaO0FBQ0Q7O0FBRUQsWUFBSSxDQUFDL0ssRUFBRW1FLFFBQUYsQ0FBVytDLEtBQUtyQyxJQUFoQixDQUFMLEVBQTRCO0FBQzFCcUMsZUFBS3JDLElBQUwsR0FBWWdMLE1BQU1oTCxJQUFsQjtBQUNEOztBQUVELGNBQU0rQyxTQUFTLEtBQUsrRixhQUFMLENBQW1CO0FBQ2hDdkMsZ0JBQU1sRSxLQUFLbUcsUUFEcUI7QUFFaENwRyxjQUZnQztBQUdoQzhELGdCQUFNN0QsS0FBSzZELElBSHFCO0FBSWhDaEcsZ0JBQU1tQyxLQUFLbkMsSUFKcUI7QUFLaENGLGdCQUFNcUMsS0FBS3JDLElBTHFCO0FBTWhDaUQsa0JBQVFaLEtBQUtZLE1BTm1CO0FBT2hDeUYsbUJBUGdDO0FBUWhDNkMsd0JBQWNuSixLQUFLaEQsT0FBTCxDQUFjLEdBQUU3QyxTQUFTNEQsR0FBSSxHQUFFa0MsS0FBS21HLFFBQVMsRUFBN0MsRUFBZ0QsRUFBaEQsQ0FSa0I7QUFTaEM5QyxrQkFBUXJELEtBQUtxRCxNQUFMLElBQWU7QUFUUyxTQUFuQixDQUFmOztBQWFBLGFBQUtySSxVQUFMLENBQWdCc0osTUFBaEIsQ0FBdUI1RCxNQUF2QixFQUErQixDQUFDMkgsU0FBRCxFQUFZakosR0FBWixLQUFvQjtBQUNqRCxjQUFJaUosU0FBSixFQUFlO0FBQ2JoTyx3QkFBWUEsU0FBU2dPLFNBQVQsQ0FBWjs7QUFDQSxpQkFBS2xLLE1BQUwsQ0FBYSwrQ0FBOEN1QyxPQUFPd0QsSUFBSyxPQUFNLEtBQUt6SSxjQUFlLEVBQWpHLEVBQW9HNE0sU0FBcEc7QUFDRCxXQUhELE1BR087QUFDTCxrQkFBTS9LLFVBQVUsS0FBS3RDLFVBQUwsQ0FBZ0J1RixPQUFoQixDQUF3Qm5CLEdBQXhCLENBQWhCO0FBQ0EvRSx3QkFBWUEsU0FBUyxJQUFULEVBQWVpRCxPQUFmLENBQVo7O0FBQ0EsZ0JBQUl5Syx1QkFBdUIsSUFBM0IsRUFBaUM7QUFDL0IsbUJBQUszTSxhQUFMLElBQXNCLEtBQUtBLGFBQUwsQ0FBbUIyRixJQUFuQixDQUF3QixJQUF4QixFQUE4QnpELE9BQTlCLENBQXRCO0FBQ0EsbUJBQUt3RyxJQUFMLENBQVUsYUFBVixFQUF5QnhHLE9BQXpCO0FBQ0Q7O0FBQ0QsaUJBQUthLE1BQUwsQ0FBYSxnQ0FBK0J1QyxPQUFPd0QsSUFBSyxPQUFNLEtBQUt6SSxjQUFlLEVBQWxGO0FBQ0Q7QUFDRixTQWJEO0FBY0QsT0FwRE0sTUFvREE7QUFDTHBCLG9CQUFZQSxTQUFTLElBQUlqQixPQUFPMEQsS0FBWCxDQUFpQixHQUFqQixFQUF1Qiw4QkFBNkJpRCxJQUFLLHlCQUF6RCxDQUFULENBQVo7QUFDRDtBQUNGLEtBMURpQyxDQUFsQztBQTJEQSxXQUFPLElBQVA7QUFDRCxHQXJ0Q3NELENBdXRDdkQ7Ozs7Ozs7Ozs7QUFTQU4sU0FBTzJGLFFBQVAsRUFBaUIvSyxRQUFqQixFQUEyQjtBQUN6QixTQUFLOEQsTUFBTCxDQUFhLDZCQUE0QjJFLEtBQUtDLFNBQUwsQ0FBZXFDLFFBQWYsQ0FBeUIsSUFBbEU7O0FBQ0EsUUFBSUEsYUFBYStELFNBQWpCLEVBQTRCO0FBQzFCLGFBQU8sQ0FBUDtBQUNEOztBQUNEMVAsVUFBTVksUUFBTixFQUFnQlgsTUFBTWdNLFFBQU4sQ0FBZWpILFFBQWYsQ0FBaEI7QUFFQSxVQUFNMkssUUFBUSxLQUFLcE8sVUFBTCxDQUFnQmtFLElBQWhCLENBQXFCa0csUUFBckIsQ0FBZDs7QUFDQSxRQUFJZ0UsTUFBTTVELEtBQU4sS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckI0RCxZQUFNQyxPQUFOLENBQWVsSixJQUFELElBQVU7QUFDdEIsYUFBSzRGLE1BQUwsQ0FBWTVGLElBQVo7QUFDRCxPQUZEO0FBR0QsS0FKRCxNQUlPO0FBQ0w5RixrQkFBWUEsU0FBUyxJQUFJakIsT0FBTzBELEtBQVgsQ0FBaUIsR0FBakIsRUFBc0Isc0NBQXRCLENBQVQsQ0FBWjtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVELFFBQUksS0FBS3pCLGFBQVQsRUFBd0I7QUFDdEIsWUFBTWlPLE9BQU9GLE1BQU1HLEtBQU4sRUFBYjtBQUNBLFlBQU1uTixPQUFPLElBQWI7QUFDQSxXQUFLcEIsVUFBTCxDQUFnQnlFLE1BQWhCLENBQXVCMkYsUUFBdkIsRUFBaUMsWUFBWTtBQUMzQy9LLG9CQUFZQSxTQUFTMkQsS0FBVCxDQUFlLElBQWYsRUFBcUJDLFNBQXJCLENBQVo7QUFDQTdCLGFBQUtmLGFBQUwsQ0FBbUJpTyxJQUFuQjtBQUNELE9BSEQ7QUFJRCxLQVBELE1BT087QUFDTCxXQUFLdE8sVUFBTCxDQUFnQnlFLE1BQWhCLENBQXVCMkYsUUFBdkIsRUFBa0MvSyxZQUFZQyxJQUE5QztBQUNEOztBQUNELFdBQU8sSUFBUDtBQUNELEdBNXZDc0QsQ0E4dkN2RDs7Ozs7Ozs7OztBQVNBa1AsT0FBS0MsS0FBTCxFQUFZO0FBQ1YsU0FBS3pPLFVBQUwsQ0FBZ0J3TyxJQUFoQixDQUFxQkMsS0FBckI7QUFDQSxXQUFPLEtBQUt6TyxVQUFaO0FBQ0QsR0Exd0NzRCxDQTR3Q3ZEOzs7Ozs7Ozs7O0FBU0EwTyxRQUFNRCxLQUFOLEVBQWE7QUFDWCxTQUFLek8sVUFBTCxDQUFnQjBPLEtBQWhCLENBQXNCRCxLQUF0QjtBQUNBLFdBQU8sS0FBS3pPLFVBQVo7QUFDRCxHQXh4Q3NELENBMHhDdkQ7Ozs7Ozs7OztBQVFBMk8sZUFBYTtBQUNYLFNBQUszTyxVQUFMLENBQWdCd08sSUFBaEIsQ0FBcUI7QUFDbkJsRixlQUFTO0FBQUUsZUFBTyxJQUFQO0FBQWMsT0FETjs7QUFFbkJ5QyxlQUFTO0FBQUUsZUFBTyxJQUFQO0FBQWMsT0FGTjs7QUFHbkJ0SCxlQUFTO0FBQUUsZUFBTyxJQUFQO0FBQWM7O0FBSE4sS0FBckI7QUFLQSxXQUFPLEtBQUt6RSxVQUFaO0FBQ0QsR0F6eUNzRCxDQTJ5Q3ZEOzs7Ozs7Ozs7QUFRQTRPLGdCQUFjO0FBQ1osU0FBSzVPLFVBQUwsQ0FBZ0IwTyxLQUFoQixDQUFzQjtBQUNwQnBGLGVBQVM7QUFBRSxlQUFPLElBQVA7QUFBYyxPQURMOztBQUVwQnlDLGVBQVM7QUFBRSxlQUFPLElBQVA7QUFBYyxPQUZMOztBQUdwQnRILGVBQVM7QUFBRSxlQUFPLElBQVA7QUFBYzs7QUFITCxLQUF0QjtBQUtBLFdBQU8sS0FBS3pFLFVBQVo7QUFDRCxHQTF6Q3NELENBNnpDdkQ7Ozs7Ozs7Ozs7O0FBVUErSyxTQUFPekksT0FBUCxFQUFnQjBILE9BQWhCLEVBQXlCM0ssUUFBekIsRUFBbUM7QUFDakMsU0FBSzhELE1BQUwsQ0FBYSw2QkFBNEJiLFFBQVE4QixHQUFJLEtBQUk0RixPQUFRLElBQWpFOztBQUNBLFFBQUlBLE9BQUosRUFBYTtBQUNYLFVBQUlsTSxFQUFFcUUsUUFBRixDQUFXRyxRQUFRc0wsUUFBbkIsS0FBZ0M5UCxFQUFFcUUsUUFBRixDQUFXRyxRQUFRc0wsUUFBUixDQUFpQjVELE9BQWpCLENBQVgsQ0FBaEMsSUFBeUUxSCxRQUFRc0wsUUFBUixDQUFpQjVELE9BQWpCLEVBQTBCakYsSUFBdkcsRUFBNkc7QUFDM0dqRyxXQUFHaU0sTUFBSCxDQUFVekksUUFBUXNMLFFBQVIsQ0FBaUI1RCxPQUFqQixFQUEwQmpGLElBQXBDLEVBQTJDMUYsWUFBWUMsSUFBdkQ7QUFDRDtBQUNGLEtBSkQsTUFJTztBQUNMLFVBQUl4QixFQUFFcUUsUUFBRixDQUFXRyxRQUFRc0wsUUFBbkIsQ0FBSixFQUFrQztBQUNoQzlQLFVBQUUrUSxJQUFGLENBQU92TSxRQUFRc0wsUUFBZixFQUEwQmtCLElBQUQsSUFBVTNQLE1BQU0sTUFBTTtBQUM3Q0wsYUFBR2lNLE1BQUgsQ0FBVStELEtBQUsvSixJQUFmLEVBQXNCMUYsWUFBWUMsSUFBbEM7QUFDRCxTQUZrQyxDQUFuQztBQUdELE9BSkQsTUFJTztBQUNMUixXQUFHaU0sTUFBSCxDQUFVekksUUFBUXlDLElBQWxCLEVBQXlCMUYsWUFBWUMsSUFBckM7QUFDRDtBQUNGOztBQUNELFdBQU8sSUFBUDtBQUNELEdBdjFDc0QsQ0F5MUN2RDs7Ozs7Ozs7QUFPQXlQLE9BQUt0SixJQUFMLEVBQVc7QUFDVCxTQUFLdEMsTUFBTCxDQUFhLCtCQUE4QnNDLEtBQUt6RyxPQUFMLENBQWFnUSxXQUFZLDBCQUFwRTs7QUFDQSxVQUFNOUksT0FBTyxtQkFBYjs7QUFFQSxRQUFJLENBQUNULEtBQUtVLFFBQUwsQ0FBY0MsV0FBbkIsRUFBZ0M7QUFDOUJYLFdBQUtVLFFBQUwsQ0FBY0UsU0FBZCxDQUF3QixHQUF4QixFQUE2QjtBQUMzQix3QkFBZ0IsWUFEVztBQUUzQiwwQkFBa0JILEtBQUtJO0FBRkksT0FBN0I7QUFLRDs7QUFDRCxRQUFJLENBQUNiLEtBQUtVLFFBQUwsQ0FBY0ksUUFBbkIsRUFBNkI7QUFDM0JkLFdBQUtVLFFBQUwsQ0FBY3ZCLEdBQWQsQ0FBa0JzQixJQUFsQjtBQUNEO0FBQ0YsR0E5MkNzRCxDQWczQ3ZEOzs7Ozs7Ozs7OztBQVVBK0QsV0FBU3hFLElBQVQsRUFBZXVFLFVBQVUsVUFBekIsRUFBcUMxSCxPQUFyQyxFQUE4QztBQUM1QyxRQUFJd00sSUFBSjs7QUFDQSxTQUFLM0wsTUFBTCxDQUFhLCtCQUE4QnNDLEtBQUt6RyxPQUFMLENBQWFnUSxXQUFZLEtBQUloRixPQUFRLElBQWhGOztBQUVBLFFBQUkxSCxPQUFKLEVBQWE7QUFDWCxVQUFJeEUsRUFBRXNLLEdBQUYsQ0FBTTlGLE9BQU4sRUFBZSxVQUFmLEtBQThCeEUsRUFBRXNLLEdBQUYsQ0FBTTlGLFFBQVFzTCxRQUFkLEVBQXdCNUQsT0FBeEIsQ0FBbEMsRUFBb0U7QUFDbEU4RSxlQUFPeE0sUUFBUXNMLFFBQVIsQ0FBaUI1RCxPQUFqQixDQUFQO0FBQ0E4RSxhQUFLMUssR0FBTCxHQUFXOUIsUUFBUThCLEdBQW5CO0FBQ0QsT0FIRCxNQUdPO0FBQ0wwSyxlQUFPeE0sT0FBUDtBQUNEO0FBQ0YsS0FQRCxNQU9PO0FBQ0x3TSxhQUFPLEtBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUNBLElBQUQsSUFBUyxDQUFDaFIsRUFBRXFFLFFBQUYsQ0FBVzJNLElBQVgsQ0FBZCxFQUFnQztBQUM5QixhQUFPLEtBQUtDLElBQUwsQ0FBVXRKLElBQVYsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJbkQsT0FBSixFQUFhO0FBQ2xCLFVBQUksS0FBS3ZCLGdCQUFULEVBQTJCO0FBQ3pCLFlBQUksQ0FBQyxLQUFLQSxnQkFBTCxDQUFzQmdGLElBQXRCLENBQTJCakksRUFBRWtJLE1BQUYsQ0FBU1AsSUFBVCxFQUFlLEtBQUtJLFFBQUwsQ0FBY0osSUFBZCxDQUFmLENBQTNCLEVBQWdFbkQsT0FBaEUsQ0FBTCxFQUErRTtBQUM3RSxpQkFBTyxLQUFLeU0sSUFBTCxDQUFVdEosSUFBVixDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJLEtBQUt4RSxpQkFBTCxJQUEwQm5ELEVBQUVrRSxVQUFGLENBQWEsS0FBS2YsaUJBQWxCLENBQTlCLEVBQW9FO0FBQ2xFLFlBQUksS0FBS0EsaUJBQUwsQ0FBdUJ3RSxJQUF2QixFQUE2Qm5ELE9BQTdCLEVBQXNDMEgsT0FBdEMsTUFBbUQsSUFBdkQsRUFBNkQ7QUFDM0QsaUJBQU8sS0FBSyxDQUFaO0FBQ0Q7QUFDRjs7QUFFRGxMLFNBQUc0TyxJQUFILENBQVFvQixLQUFLL0osSUFBYixFQUFtQixDQUFDaUosT0FBRCxFQUFVTCxLQUFWLEtBQW9CeE8sTUFBTSxNQUFNO0FBQ2pELFlBQUk4UCxZQUFKOztBQUNBLFlBQUlqQixXQUFXLENBQUNMLE1BQU1NLE1BQU4sRUFBaEIsRUFBZ0M7QUFDOUIsaUJBQU8sS0FBS2MsSUFBTCxDQUFVdEosSUFBVixDQUFQO0FBQ0Q7O0FBRUQsWUFBS2tJLE1BQU1oTCxJQUFOLEtBQWVtTSxLQUFLbk0sSUFBckIsSUFBOEIsQ0FBQyxLQUFLbkMsY0FBeEMsRUFBd0Q7QUFDdERzTyxlQUFLbk0sSUFBTCxHQUFlZ0wsTUFBTWhMLElBQXJCO0FBQ0Q7O0FBRUQsWUFBS2dMLE1BQU1oTCxJQUFOLEtBQWVtTSxLQUFLbk0sSUFBckIsSUFBOEIsS0FBS25DLGNBQXZDLEVBQXVEO0FBQ3JEeU8seUJBQWUsS0FBZjtBQUNEOztBQUVELGVBQU8sS0FBS0MsS0FBTCxDQUFXekosSUFBWCxFQUFpQm5ELE9BQWpCLEVBQTBCd00sSUFBMUIsRUFBZ0M5RSxPQUFoQyxFQUF5QyxJQUF6QyxFQUFnRGlGLGdCQUFnQixLQUFoRSxDQUFQO0FBQ0QsT0Fmc0MsQ0FBdkM7QUFnQkEsYUFBTyxLQUFLLENBQVo7QUFDRDs7QUFDRCxXQUFPLEtBQUtGLElBQUwsQ0FBVXRKLElBQVYsQ0FBUDtBQUNELEdBMzZDc0QsQ0E2NkN2RDs7Ozs7Ozs7Ozs7Ozs7O0FBY0F5SixRQUFNekosSUFBTixFQUFZbkQsT0FBWixFQUFxQndNLElBQXJCLEVBQTJCOUUsVUFBVSxVQUFyQyxFQUFpRG1GLGlCQUFpQixJQUFsRSxFQUF3RUYsZUFBZSxLQUF2RixFQUE4RkcsV0FBVyxLQUF6RyxFQUFnSDtBQUM5RyxRQUFJQyxXQUFXLEtBQWY7QUFDQSxRQUFJQyxXQUFXLEtBQWY7QUFDQSxRQUFJQyxrQkFBa0IsRUFBdEI7QUFDQSxRQUFJQyxLQUFKO0FBQ0EsUUFBSTVLLEdBQUo7QUFDQSxRQUFJNkssSUFBSjs7QUFFQSxRQUFJaEssS0FBS0ssTUFBTCxDQUFZaUUsS0FBWixDQUFrQkUsUUFBbEIsSUFBK0J4RSxLQUFLSyxNQUFMLENBQVlpRSxLQUFaLENBQWtCRSxRQUFsQixLQUErQixNQUFsRSxFQUEyRTtBQUN6RXNGLHdCQUFrQixjQUFsQjtBQUNELEtBRkQsTUFFTztBQUNMQSx3QkFBa0IsVUFBbEI7QUFDRDs7QUFFRCxVQUFNRyxrQkFBdUIsY0FBYUMsVUFBVWIsS0FBSzVGLElBQUwsSUFBYTVHLFFBQVE0RyxJQUEvQixDQUFxQyx3QkFBdUJ5RyxVQUFVYixLQUFLNUYsSUFBTCxJQUFhNUcsUUFBUTRHLElBQS9CLENBQXFDLElBQTNJO0FBQ0EsVUFBTTBHLHNCQUFzQixlQUE1Qjs7QUFFQSxRQUFJLENBQUNuSyxLQUFLVSxRQUFMLENBQWNDLFdBQW5CLEVBQWdDO0FBQzlCWCxXQUFLVSxRQUFMLENBQWMwSixTQUFkLENBQXdCLHFCQUF4QixFQUErQ04sa0JBQWtCRyxlQUFsQixHQUFvQ0UsbUJBQW5GO0FBQ0Q7O0FBRUQsUUFBSW5LLEtBQUt6RyxPQUFMLENBQWF3RCxPQUFiLENBQXFCc04sS0FBckIsSUFBOEIsQ0FBQ1YsUUFBbkMsRUFBNkM7QUFDM0NDLGlCQUFjLElBQWQ7QUFDQSxZQUFNVSxRQUFRdEssS0FBS3pHLE9BQUwsQ0FBYXdELE9BQWIsQ0FBcUJzTixLQUFyQixDQUEyQmhHLEtBQTNCLENBQWlDLHlCQUFqQyxDQUFkO0FBQ0EwRixjQUFjdE4sU0FBUzZOLE1BQU0sQ0FBTixDQUFULENBQWQ7QUFDQW5MLFlBQWMxQyxTQUFTNk4sTUFBTSxDQUFOLENBQVQsQ0FBZDs7QUFDQSxVQUFJQyxNQUFNcEwsR0FBTixDQUFKLEVBQWdCO0FBQ2RBLGNBQVlrSyxLQUFLbk0sSUFBTCxHQUFZLENBQXhCO0FBQ0Q7O0FBQ0Q4TSxhQUFjN0ssTUFBTTRLLEtBQXBCO0FBQ0QsS0FURCxNQVNPO0FBQ0xBLGNBQVEsQ0FBUjtBQUNBNUssWUFBUWtLLEtBQUtuTSxJQUFMLEdBQVksQ0FBcEI7QUFDQThNLGFBQVFYLEtBQUtuTSxJQUFiO0FBQ0Q7O0FBRUQsUUFBSTBNLFlBQWE1SixLQUFLSyxNQUFMLENBQVlpRSxLQUFaLENBQWtCa0csSUFBbEIsSUFBMkJ4SyxLQUFLSyxNQUFMLENBQVlpRSxLQUFaLENBQWtCa0csSUFBbEIsS0FBMkIsTUFBdkUsRUFBaUY7QUFDL0VYLGlCQUFXO0FBQUNFLGFBQUQ7QUFBUTVLO0FBQVIsT0FBWDs7QUFDQSxVQUFJb0wsTUFBTVIsS0FBTixLQUFnQixDQUFDUSxNQUFNcEwsR0FBTixDQUFyQixFQUFpQztBQUMvQjBLLGlCQUFTRSxLQUFULEdBQWlCNUssTUFBTTZLLElBQXZCO0FBQ0FILGlCQUFTMUssR0FBVCxHQUFpQkEsR0FBakI7QUFDRDs7QUFDRCxVQUFJLENBQUNvTCxNQUFNUixLQUFOLENBQUQsSUFBaUJRLE1BQU1wTCxHQUFOLENBQXJCLEVBQWlDO0FBQy9CMEssaUJBQVNFLEtBQVQsR0FBaUJBLEtBQWpCO0FBQ0FGLGlCQUFTMUssR0FBVCxHQUFpQjRLLFFBQVFDLElBQXpCO0FBQ0Q7O0FBRUQsVUFBS0QsUUFBUUMsSUFBVCxJQUFrQlgsS0FBS25NLElBQTNCLEVBQWlDO0FBQUUyTSxpQkFBUzFLLEdBQVQsR0FBZWtLLEtBQUtuTSxJQUFMLEdBQVksQ0FBM0I7QUFBK0I7O0FBRWxFLFVBQUksS0FBSzlDLE1BQUwsS0FBaUJ5UCxTQUFTRSxLQUFULElBQW1CVixLQUFLbk0sSUFBTCxHQUFZLENBQWhDLElBQXdDMk0sU0FBUzFLLEdBQVQsR0FBZ0JrSyxLQUFLbk0sSUFBTCxHQUFZLENBQXBGLENBQUosRUFBOEY7QUFDNUZzTSx1QkFBZSxLQUFmO0FBQ0QsT0FGRCxNQUVPO0FBQ0xBLHVCQUFlLEtBQWY7QUFDRDtBQUNGLEtBbEJELE1Ba0JPO0FBQ0xBLHFCQUFlLEtBQWY7QUFDRDs7QUFFRCxVQUFNaUIscUJBQXNCNU0sS0FBRCxJQUFXO0FBQ3BDLFdBQUtILE1BQUwsQ0FBYSw0QkFBMkIyTCxLQUFLL0osSUFBSyxLQUFJaUYsT0FBUSxVQUE5RCxFQUF5RTFHLEtBQXpFOztBQUNBLFVBQUksQ0FBQ21DLEtBQUtVLFFBQUwsQ0FBY0ksUUFBbkIsRUFBNkI7QUFDM0JkLGFBQUtVLFFBQUwsQ0FBY3ZCLEdBQWQsQ0FBa0J0QixNQUFNdUUsUUFBTixFQUFsQjtBQUNEO0FBQ0YsS0FMRDs7QUFPQSxVQUFNckYsVUFBVTFFLEVBQUVrRSxVQUFGLENBQWEsS0FBS3BCLGVBQWxCLElBQXFDLEtBQUtBLGVBQUwsQ0FBcUJxTyxZQUFyQixFQUFtQzNNLE9BQW5DLEVBQTRDd00sSUFBNUMsRUFBa0Q5RSxPQUFsRCxDQUFyQyxHQUFrRyxLQUFLcEosZUFBdkg7O0FBRUEsUUFBSSxDQUFDNEIsUUFBUSxlQUFSLENBQUwsRUFBK0I7QUFDN0IsVUFBSSxDQUFDaUQsS0FBS1UsUUFBTCxDQUFjQyxXQUFuQixFQUFnQztBQUM5QlgsYUFBS1UsUUFBTCxDQUFjMEosU0FBZCxDQUF3QixlQUF4QixFQUF5QyxLQUFLM1AsWUFBOUM7QUFDRDtBQUNGOztBQUVELFNBQUssSUFBSWlRLEdBQVQsSUFBZ0IzTixPQUFoQixFQUF5QjtBQUN2QixVQUFJLENBQUNpRCxLQUFLVSxRQUFMLENBQWNDLFdBQW5CLEVBQWdDO0FBQzlCWCxhQUFLVSxRQUFMLENBQWMwSixTQUFkLENBQXdCTSxHQUF4QixFQUE2QjNOLFFBQVEyTixHQUFSLENBQTdCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFNQyxVQUFVLENBQUNuRCxNQUFELEVBQVNvRCxJQUFULEtBQWtCO0FBQ2hDLFVBQUksQ0FBQzVLLEtBQUtVLFFBQUwsQ0FBY0MsV0FBZixJQUE4QitJLGNBQWxDLEVBQWtEO0FBQ2hEMUosYUFBS1UsUUFBTCxDQUFjRSxTQUFkLENBQXdCZ0ssSUFBeEI7QUFDRDs7QUFFRDVLLFdBQUtVLFFBQUwsQ0FBY1UsRUFBZCxDQUFpQixPQUFqQixFQUEwQixNQUFNO0FBQzlCLFlBQUksT0FBT29HLE9BQU9wSSxLQUFkLEtBQXdCLFVBQTVCLEVBQXdDO0FBQ3RDb0ksaUJBQU9wSSxLQUFQO0FBQ0Q7O0FBQ0QsWUFBSSxPQUFPb0ksT0FBT3JJLEdBQWQsS0FBc0IsVUFBMUIsRUFBc0M7QUFDcENxSSxpQkFBT3JJLEdBQVA7QUFDRDtBQUNGLE9BUEQ7QUFTQWEsV0FBS3pHLE9BQUwsQ0FBYTZILEVBQWIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBTTtBQUMvQnBCLGFBQUt6RyxPQUFMLENBQWFvRyxPQUFiLEdBQXVCLElBQXZCOztBQUNBLFlBQUksT0FBTzZILE9BQU9wSSxLQUFkLEtBQXdCLFVBQTVCLEVBQXdDO0FBQ3RDb0ksaUJBQU9wSSxLQUFQO0FBQ0Q7O0FBQ0QsWUFBSSxPQUFPb0ksT0FBT3JJLEdBQWQsS0FBc0IsVUFBMUIsRUFBc0M7QUFDcENxSSxpQkFBT3JJLEdBQVA7QUFDRDtBQUNGLE9BUkQ7QUFVQXFJLGFBQU9wRyxFQUFQLENBQVUsTUFBVixFQUFrQixNQUFNO0FBQ3RCLFlBQUksQ0FBQ3BCLEtBQUtVLFFBQUwsQ0FBY0MsV0FBbkIsRUFBZ0M7QUFDOUJYLGVBQUtVLFFBQUwsQ0FBY0UsU0FBZCxDQUF3QmdLLElBQXhCO0FBQ0Q7QUFDRixPQUpELEVBSUd4SixFQUpILENBSU0sT0FKTixFQUllLE1BQU07QUFDbkIsWUFBSSxDQUFDcEIsS0FBS1UsUUFBTCxDQUFjSSxRQUFuQixFQUE2QjtBQUMzQmQsZUFBS1UsUUFBTCxDQUFjdkIsR0FBZDtBQUNEOztBQUNELFlBQUksQ0FBQ2EsS0FBS3pHLE9BQUwsQ0FBYW9HLE9BQWxCLEVBQTJCO0FBQ3pCSyxlQUFLekcsT0FBTCxDQUFhc1IsT0FBYjtBQUNEO0FBQ0YsT0FYRCxFQVdHekosRUFYSCxDQVdNLE9BWE4sRUFXZXFKLGtCQVhmLEVBWUVySixFQVpGLENBWUssS0FaTCxFQVlZLE1BQU07QUFDaEIsWUFBSSxDQUFDcEIsS0FBS1UsUUFBTCxDQUFjSSxRQUFuQixFQUE2QjtBQUMzQmQsZUFBS1UsUUFBTCxDQUFjdkIsR0FBZDtBQUNEO0FBQ0YsT0FoQkQsRUFnQkdrSixJQWhCSCxDQWdCUXJJLEtBQUtVLFFBaEJiO0FBaUJELEtBekNEOztBQTJDQSxZQUFROEksWUFBUjtBQUNBLFdBQUssS0FBTDtBQUNFLGFBQUs5TCxNQUFMLENBQWEsNEJBQTJCMkwsS0FBSy9KLElBQUssS0FBSWlGLE9BQVEsbUNBQTlEOztBQUNBLFlBQUk5RCxPQUFPLDBCQUFYOztBQUVBLFlBQUksQ0FBQ1QsS0FBS1UsUUFBTCxDQUFjQyxXQUFuQixFQUFnQztBQUM5QlgsZUFBS1UsUUFBTCxDQUFjRSxTQUFkLENBQXdCLEdBQXhCLEVBQTZCO0FBQzNCLDRCQUFnQixZQURXO0FBRTNCLDhCQUFrQkgsS0FBS0k7QUFGSSxXQUE3QjtBQUlEOztBQUVELFlBQUksQ0FBQ2IsS0FBS1UsUUFBTCxDQUFjSSxRQUFuQixFQUE2QjtBQUMzQmQsZUFBS1UsUUFBTCxDQUFjdkIsR0FBZCxDQUFrQnNCLElBQWxCO0FBQ0Q7O0FBQ0Q7O0FBQ0YsV0FBSyxLQUFMO0FBQ0UsYUFBSzZJLElBQUwsQ0FBVXRKLElBQVY7O0FBQ0E7O0FBQ0YsV0FBSyxLQUFMO0FBQ0UsYUFBS3RDLE1BQUwsQ0FBYSw0QkFBMkIyTCxLQUFLL0osSUFBSyxLQUFJaUYsT0FBUSwwQ0FBOUQ7O0FBQ0EsWUFBSSxDQUFDdkUsS0FBS1UsUUFBTCxDQUFjQyxXQUFuQixFQUFnQztBQUM5QlgsZUFBS1UsUUFBTCxDQUFjRSxTQUFkLENBQXdCLEdBQXhCO0FBQ0Q7O0FBQ0QsWUFBSSxDQUFDWixLQUFLVSxRQUFMLENBQWNJLFFBQW5CLEVBQTZCO0FBQzNCZCxlQUFLVSxRQUFMLENBQWN2QixHQUFkO0FBQ0Q7O0FBQ0Q7O0FBQ0YsV0FBSyxLQUFMO0FBQ0UsYUFBS3pCLE1BQUwsQ0FBYSw0QkFBMkIyTCxLQUFLL0osSUFBSyxLQUFJaUYsT0FBUSxVQUE5RDs7QUFDQSxZQUFJLENBQUN2RSxLQUFLVSxRQUFMLENBQWNDLFdBQW5CLEVBQWdDO0FBQzlCWCxlQUFLVSxRQUFMLENBQWMwSixTQUFkLENBQXdCLGVBQXhCLEVBQTBDLFNBQVFQLFNBQVNFLEtBQU0sSUFBR0YsU0FBUzFLLEdBQUksSUFBR2tLLEtBQUtuTSxJQUFLLEVBQTlGO0FBQ0Q7O0FBQ0R5TixnQkFBUWpCLGtCQUFrQnJRLEdBQUd5UixnQkFBSCxDQUFvQnpCLEtBQUsvSixJQUF6QixFQUErQjtBQUFDeUssaUJBQU9GLFNBQVNFLEtBQWpCO0FBQXdCNUssZUFBSzBLLFNBQVMxSztBQUF0QyxTQUEvQixDQUExQixFQUFzRyxHQUF0RztBQUNBOztBQUNGO0FBQ0UsYUFBS3pCLE1BQUwsQ0FBYSw0QkFBMkIyTCxLQUFLL0osSUFBSyxLQUFJaUYsT0FBUSxVQUE5RDs7QUFDQW9HLGdCQUFRakIsa0JBQWtCclEsR0FBR3lSLGdCQUFILENBQW9CekIsS0FBSy9KLElBQXpCLENBQTFCLEVBQTBELEdBQTFEO0FBQ0E7QUF0Q0Y7QUF3Q0Q7O0FBN2xEc0QsQzs7Ozs7Ozs7Ozs7QUNoRXpEcEgsT0FBT0MsTUFBUCxDQUFjO0FBQUNZLFdBQVEsTUFBSUc7QUFBYixDQUFkOztBQUFpRCxJQUFJYixDQUFKOztBQUFNSCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsbUJBQVIsQ0FBYixFQUEwQztBQUFDRixJQUFFRyxDQUFGLEVBQUk7QUFBQ0gsUUFBRUcsQ0FBRjtBQUFJOztBQUFWLENBQTFDLEVBQXNELENBQXREO0FBQXlELElBQUl1UyxZQUFKO0FBQWlCN1MsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGVBQVIsQ0FBYixFQUFzQztBQUFDd1MsZUFBYXZTLENBQWIsRUFBZTtBQUFDdVMsbUJBQWF2UyxDQUFiO0FBQWU7O0FBQWhDLENBQXRDLEVBQXdFLENBQXhFO0FBQTJFLElBQUl3UyxZQUFKO0FBQWlCOVMsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLFVBQVIsQ0FBYixFQUFpQztBQUFDeVMsZUFBYXhTLENBQWIsRUFBZTtBQUFDd1MsbUJBQWF4UyxDQUFiO0FBQWU7O0FBQWhDLENBQWpDLEVBQW1FLENBQW5FO0FBQXNFLElBQUlRLEtBQUosRUFBVUMsS0FBVjtBQUFnQmYsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDUyxRQUFNUixDQUFOLEVBQVE7QUFBQ1EsWUFBTVIsQ0FBTjtBQUFRLEdBQWxCOztBQUFtQlMsUUFBTVQsQ0FBTixFQUFRO0FBQUNTLFlBQU1ULENBQU47QUFBUTs7QUFBcEMsQ0FBckMsRUFBMkUsQ0FBM0U7QUFBOEUsSUFBSXlTLFdBQUosRUFBZ0JDLFVBQWhCO0FBQTJCaFQsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGFBQVIsQ0FBYixFQUFvQztBQUFDMFMsY0FBWXpTLENBQVosRUFBYztBQUFDeVMsa0JBQVl6UyxDQUFaO0FBQWMsR0FBOUI7O0FBQStCMFMsYUFBVzFTLENBQVgsRUFBYTtBQUFDMFMsaUJBQVcxUyxDQUFYO0FBQWE7O0FBQTFELENBQXBDLEVBQWdHLENBQWhHOztBQU03WSxNQUFNVSxtQkFBTixTQUFrQzZSLFlBQWxDLENBQStDO0FBQzVEalIsZ0JBQWM7QUFDWjtBQUNEOztBQXFFRDs7Ozs7O0tBT0E0RCxTQUFTO0FBQ1AsUUFBSSxLQUFLekQsS0FBVCxFQUFnQjtBQUNkLE9BQUNnSSxRQUFRa0osSUFBUixJQUFnQmxKLFFBQVFtSixHQUF4QixJQUErQixZQUFZLENBQUcsQ0FBL0MsRUFBaUQ3TixLQUFqRCxDQUF1RG1MLFNBQXZELEVBQWtFbEwsU0FBbEU7QUFDRDtBQUNGLEdBbkYyRCxDQXFGNUQ7Ozs7Ozs7OztBQVFBbUksZUFBYWUsUUFBYixFQUF1QjtBQUNyQixVQUFNaEIsV0FBV2dCLFNBQVNqRCxJQUFULElBQWlCaUQsU0FBU2hCLFFBQTNDOztBQUNBLFFBQUlyTixFQUFFMkQsUUFBRixDQUFXMEosUUFBWCxLQUF5QkEsU0FBUzdFLE1BQVQsR0FBa0IsQ0FBL0MsRUFBbUQ7QUFDakQsYUFBTyxDQUFDNkYsU0FBU2pELElBQVQsSUFBaUJpRCxTQUFTaEIsUUFBM0IsRUFBcUNwSixPQUFyQyxDQUE2QyxPQUE3QyxFQUFzRCxFQUF0RCxFQUEwREEsT0FBMUQsQ0FBa0UsS0FBbEUsRUFBeUUsRUFBekUsQ0FBUDtBQUNEOztBQUNELFdBQU8sRUFBUDtBQUNELEdBbkcyRCxDQXFHNUQ7Ozs7Ozs7OztBQVFBd0osVUFBUUosUUFBUixFQUFrQjtBQUNoQixRQUFJLENBQUMsQ0FBQyxDQUFDQSxTQUFTN0QsT0FBVCxDQUFpQixHQUFqQixDQUFQLEVBQThCO0FBQzVCLFlBQU0rRCxZQUFZLENBQUNGLFNBQVNyQixLQUFULENBQWUsR0FBZixFQUFvQmdILEdBQXBCLEdBQTBCaEgsS0FBMUIsQ0FBZ0MsR0FBaEMsRUFBcUMsQ0FBckMsS0FBMkMsRUFBNUMsRUFBZ0RpSCxXQUFoRCxFQUFsQjtBQUNBLGFBQU87QUFBRXZGLGFBQUtILFNBQVA7QUFBa0JBLGlCQUFsQjtBQUE2QkMsMEJBQW1CLElBQUdELFNBQVU7QUFBN0QsT0FBUDtBQUNEOztBQUNELFdBQU87QUFBRUcsV0FBSyxFQUFQO0FBQVdILGlCQUFXLEVBQXRCO0FBQTBCQyx3QkFBa0I7QUFBNUMsS0FBUDtBQUNELEdBbkgyRCxDQXFINUQ7Ozs7Ozs7O0FBT0FRLG1CQUFpQjdELElBQWpCLEVBQXVCO0FBQ3JCQSxTQUFLK0ksT0FBTCxHQUFnQixZQUFZQyxJQUFaLENBQWlCaEosS0FBS3BGLElBQXRCLENBQWhCO0FBQ0FvRixTQUFLaUosT0FBTCxHQUFnQixZQUFZRCxJQUFaLENBQWlCaEosS0FBS3BGLElBQXRCLENBQWhCO0FBQ0FvRixTQUFLa0osT0FBTCxHQUFnQixZQUFZRixJQUFaLENBQWlCaEosS0FBS3BGLElBQXRCLENBQWhCO0FBQ0FvRixTQUFLbUosTUFBTCxHQUFnQixXQUFXSCxJQUFYLENBQWdCaEosS0FBS3BGLElBQXJCLENBQWhCO0FBQ0FvRixTQUFLb0osTUFBTCxHQUFnQix1QkFBdUJKLElBQXZCLENBQTRCaEosS0FBS3BGLElBQWpDLENBQWhCO0FBQ0FvRixTQUFLcUosS0FBTCxHQUFnQiwyQkFBMkJMLElBQTNCLENBQWdDaEosS0FBS3BGLElBQXJDLENBQWhCO0FBQ0QsR0FuSTJELENBcUk1RDs7Ozs7Ozs7O0FBUUE0SSxnQkFBY3hELElBQWQsRUFBb0I7QUFDbEIsVUFBTXNKLEtBQUs7QUFDVHJJLFlBQU1qQixLQUFLaUIsSUFERjtBQUVUbUMsaUJBQVdwRCxLQUFLb0QsU0FGUDtBQUdUdEcsWUFBTWtELEtBQUtsRCxJQUhGO0FBSVQ4RCxZQUFNWixLQUFLWSxJQUpGO0FBS1RoRyxZQUFNb0YsS0FBS3BGLElBTEY7QUFNVEYsWUFBTXNGLEtBQUt0RixJQU5GO0FBT1RpRCxjQUFRcUMsS0FBS3JDLE1BQUwsSUFBZSxJQVBkO0FBUVRnSSxnQkFBVTtBQUNSQyxrQkFBVTtBQUNSOUksZ0JBQU1rRCxLQUFLbEQsSUFESDtBQUVScEMsZ0JBQU1zRixLQUFLdEYsSUFGSDtBQUdSRSxnQkFBTW9GLEtBQUtwRixJQUhIO0FBSVJ3SSxxQkFBV3BELEtBQUtvRDtBQUpSO0FBREYsT0FSRDtBQWdCVG1HLHNCQUFnQnZKLEtBQUt1SixjQUFMLElBQXVCLEtBQUtyUixhQWhCbkM7QUFpQlRzUix1QkFBaUJ4SixLQUFLd0osZUFBTCxJQUF3QixLQUFLaFI7QUFqQnJDLEtBQVgsQ0FEa0IsQ0FxQmxCOztBQUNBLFFBQUl3SCxLQUFLSSxNQUFULEVBQWlCO0FBQ2ZrSixTQUFHbk4sR0FBSCxHQUFTNkQsS0FBS0ksTUFBZDtBQUNEOztBQUVELFNBQUt5RCxnQkFBTCxDQUFzQnlGLEVBQXRCOztBQUNBQSxPQUFHckQsWUFBSCxHQUFrQmpHLEtBQUtpRyxZQUFMLElBQXFCLEtBQUt6TyxXQUFMLENBQWlCM0IsRUFBRWtJLE1BQUYsQ0FBU2lDLElBQVQsRUFBZXNKLEVBQWYsQ0FBakIsQ0FBdkM7QUFDQSxXQUFPQSxFQUFQO0FBQ0QsR0ExSzJELENBNEs1RDs7Ozs7Ozs7OztBQVNBaE0sVUFBUTZFLFdBQVcsRUFBbkIsRUFBdUJzSCxPQUF2QixFQUFnQztBQUM5QixTQUFLdk8sTUFBTCxDQUFhLDhCQUE2QjJFLEtBQUtDLFNBQUwsQ0FBZXFDLFFBQWYsQ0FBeUIsS0FBSXRDLEtBQUtDLFNBQUwsQ0FBZTJKLE9BQWYsQ0FBd0IsSUFBL0Y7O0FBQ0FqVCxVQUFNMkwsUUFBTixFQUFnQjFMLE1BQU1nTSxRQUFOLENBQWVoTSxNQUFNZ0YsS0FBTixDQUFZQyxNQUFaLEVBQW9COUIsTUFBcEIsRUFBNEIwQixPQUE1QixFQUFxQ0MsTUFBckMsRUFBNkMsSUFBN0MsQ0FBZixDQUFoQjtBQUNBL0UsVUFBTWlULE9BQU4sRUFBZWhULE1BQU1nTSxRQUFOLENBQWUvRyxNQUFmLENBQWY7QUFFQSxVQUFNYSxNQUFNLEtBQUt4RSxVQUFMLENBQWdCdUYsT0FBaEIsQ0FBd0I2RSxRQUF4QixFQUFrQ3NILE9BQWxDLENBQVo7O0FBQ0EsUUFBSWxOLEdBQUosRUFBUztBQUNQLGFBQU8sSUFBSW1NLFVBQUosQ0FBZW5NLEdBQWYsRUFBb0IsSUFBcEIsQ0FBUDtBQUNEOztBQUNELFdBQU9BLEdBQVA7QUFDRCxHQS9MMkQsQ0FpTTVEOzs7Ozs7Ozs7O0FBU0FOLE9BQUtrRyxXQUFXLEVBQWhCLEVBQW9Cc0gsT0FBcEIsRUFBNkI7QUFDM0IsU0FBS3ZPLE1BQUwsQ0FBYSwyQkFBMEIyRSxLQUFLQyxTQUFMLENBQWVxQyxRQUFmLENBQXlCLEtBQUl0QyxLQUFLQyxTQUFMLENBQWUySixPQUFmLENBQXdCLElBQTVGOztBQUNBalQsVUFBTTJMLFFBQU4sRUFBZ0IxTCxNQUFNZ00sUUFBTixDQUFlaE0sTUFBTWdGLEtBQU4sQ0FBWUMsTUFBWixFQUFvQjlCLE1BQXBCLEVBQTRCMEIsT0FBNUIsRUFBcUNDLE1BQXJDLEVBQTZDLElBQTdDLENBQWYsQ0FBaEI7QUFDQS9FLFVBQU1pVCxPQUFOLEVBQWVoVCxNQUFNZ00sUUFBTixDQUFlL0csTUFBZixDQUFmO0FBRUEsV0FBTyxJQUFJK00sV0FBSixDQUFnQnRHLFFBQWhCLEVBQTBCc0gsT0FBMUIsRUFBbUMsSUFBbkMsQ0FBUDtBQUNELEdBaE4yRCxDQWtONUQ7Ozs7Ozs7OztBQVFBM0YsV0FBUztBQUNQLFNBQUsvTCxVQUFMLENBQWdCK0wsTUFBaEIsQ0FBdUIvSSxLQUF2QixDQUE2QixLQUFLaEQsVUFBbEMsRUFBOENpRCxTQUE5QztBQUNBLFdBQU8sS0FBS2pELFVBQVo7QUFDRCxHQTdOMkQsQ0ErTjVEOzs7Ozs7Ozs7O0FBU0EyUixPQUFLclAsT0FBTCxFQUFjMEgsVUFBVSxVQUF4QixFQUFvQztBQUNsQyxTQUFLN0csTUFBTCxDQUFhLDJCQUEyQnJGLEVBQUVxRSxRQUFGLENBQVdHLE9BQVgsSUFBc0JBLFFBQVE4QixHQUE5QixHQUFvQytKLFNBQVcsS0FBSW5FLE9BQVEsSUFBbkc7O0FBQ0F2TCxVQUFNNkQsT0FBTixFQUFlcUIsTUFBZjtBQUNBbEYsVUFBTXVMLE9BQU4sRUFBZW5JLE1BQWY7O0FBRUEsUUFBSSxDQUFDUyxPQUFMLEVBQWM7QUFDWixhQUFPLEVBQVA7QUFDRDs7QUFDRCxXQUFPbU8sYUFBYW5PLE9BQWIsRUFBc0IwSCxPQUF0QixDQUFQO0FBQ0Q7O0FBalAyRDs7QUFBekNyTCxtQixDQUtaZ0IsTSxHQUFTO0FBQ2RnRCxRQUFNO0FBQ0pFLFVBQU1XO0FBREYsR0FEUTtBQUlkMEYsUUFBTTtBQUNKckcsVUFBTWhCO0FBREYsR0FKUTtBQU9kZ0IsUUFBTTtBQUNKQSxVQUFNaEI7QUFERixHQVBRO0FBVWRrRCxRQUFNO0FBQ0psQyxVQUFNaEI7QUFERixHQVZRO0FBYWRtUCxXQUFTO0FBQ1BuTyxVQUFNVTtBQURDLEdBYks7QUFnQmQyTixXQUFTO0FBQ1ByTyxVQUFNVTtBQURDLEdBaEJLO0FBbUJkNE4sV0FBUztBQUNQdE8sVUFBTVU7QUFEQyxHQW5CSztBQXNCZDZOLFVBQVE7QUFDTnZPLFVBQU1VO0FBREEsR0F0Qk07QUF5QmQ4TixVQUFRO0FBQ054TyxVQUFNVTtBQURBLEdBekJNO0FBNEJkK04sU0FBTztBQUNMek8sVUFBTVU7QUFERCxHQTVCTztBQStCZDhILGFBQVc7QUFDVHhJLFVBQU1oQixNQURHO0FBRVQrUCxjQUFVO0FBRkQsR0EvQkc7QUFtQ2QxRCxnQkFBYztBQUNackwsVUFBTWhCO0FBRE0sR0FuQ0E7QUFzQ2QyUCxrQkFBZ0I7QUFDZDNPLFVBQU1oQjtBQURRLEdBdENGO0FBeUNkNFAsbUJBQWlCO0FBQ2Y1TyxVQUFNaEI7QUFEUyxHQXpDSDtBQTRDZGpDLFVBQVE7QUFDTmlELFVBQU1VLE9BREE7QUFFTnFPLGNBQVU7QUFGSixHQTVDTTtBQWdEZC9JLFFBQU07QUFDSmhHLFVBQU1jLE1BREY7QUFFSmtPLGNBQVUsSUFGTjtBQUdKRCxjQUFVO0FBSE4sR0FoRFE7QUFxRGRoTSxVQUFRO0FBQ04vQyxVQUFNaEIsTUFEQTtBQUVOK1AsY0FBVTtBQUZKLEdBckRNO0FBeURkRSxhQUFXO0FBQ1RqUCxVQUFNdUcsSUFERztBQUVUd0ksY0FBVTtBQUZELEdBekRHO0FBNkRkaEUsWUFBVTtBQUNSL0ssVUFBTWMsTUFERTtBQUVSa08sY0FBVTtBQUZGO0FBN0RJLEM7Ozs7Ozs7Ozs7O0FDWGxCbFUsT0FBT0MsTUFBUCxDQUFjO0FBQUMrUyxjQUFXLE1BQUlBLFVBQWhCO0FBQTJCRCxlQUFZLE1BQUlBO0FBQTNDLENBQWQ7O0FBQXVFLElBQUk1UyxDQUFKOztBQUFNSCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsbUJBQVIsQ0FBYixFQUEwQztBQUFDRixJQUFFRyxDQUFGLEVBQUk7QUFBQ0gsUUFBRUcsQ0FBRjtBQUFJOztBQUFWLENBQTFDLEVBQXNELENBQXREO0FBQXlELElBQUlHLE1BQUo7QUFBV1QsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGVBQVIsQ0FBYixFQUFzQztBQUFDSSxTQUFPSCxDQUFQLEVBQVM7QUFBQ0csYUFBT0gsQ0FBUDtBQUFTOztBQUFwQixDQUF0QyxFQUE0RCxDQUE1RDs7QUFXMUksTUFBTTBTLFVBQU4sQ0FBaUI7QUFDdEJwUixjQUFZd1MsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFDakMsU0FBS0QsUUFBTCxHQUFtQkEsUUFBbkI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFDQWxVLE1BQUVrSSxNQUFGLENBQVMsSUFBVCxFQUFlK0wsUUFBZjtBQUNELEdBTHFCLENBT3RCOzs7Ozs7Ozs7QUFRQXROLFNBQU9wRixRQUFQLEVBQWlCO0FBQ2YsU0FBSzJTLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3QiwyQ0FBeEI7O0FBQ0EsUUFBSSxLQUFLNE8sUUFBVCxFQUFtQjtBQUNqQixXQUFLQyxXQUFMLENBQWlCdk4sTUFBakIsQ0FBd0IsS0FBS3NOLFFBQUwsQ0FBYzNOLEdBQXRDLEVBQTJDL0UsUUFBM0M7QUFDRCxLQUZELE1BRU87QUFDTEEsa0JBQVlBLFNBQVMsSUFBSWpCLE9BQU8wRCxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLGNBQXRCLENBQVQsQ0FBWjtBQUNEOztBQUNELFdBQU8sSUFBUDtBQUNELEdBdkJxQixDQXlCdEI7Ozs7Ozs7OztBQVFBNlAsT0FBSzNILFVBQVUsVUFBZixFQUEyQjtBQUN6QixTQUFLZ0ksV0FBTCxDQUFpQjdPLE1BQWpCLENBQXlCLHdDQUF1QzZHLE9BQVEsSUFBeEU7O0FBQ0EsUUFBSSxLQUFLK0gsUUFBVCxFQUFtQjtBQUNqQixhQUFPLEtBQUtDLFdBQUwsQ0FBaUJMLElBQWpCLENBQXNCLEtBQUtJLFFBQTNCLEVBQXFDL0gsT0FBckMsQ0FBUDtBQUNEOztBQUNELFdBQU8sRUFBUDtBQUNELEdBdkNxQixDQXlDdEI7Ozs7Ozs7OztBQVFBNkMsTUFBSW9GLFFBQUosRUFBYztBQUNaLFNBQUtELFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF5Qix1Q0FBc0M4TyxRQUFTLElBQXhFOztBQUNBLFFBQUlBLFFBQUosRUFBYztBQUNaLGFBQU8sS0FBS0YsUUFBTCxDQUFjRSxRQUFkLENBQVA7QUFDRDs7QUFDRCxXQUFPLEtBQUtGLFFBQVo7QUFDRCxHQXZEcUIsQ0F5RHRCOzs7Ozs7OztBQU9BeEQsVUFBUTtBQUNOLFNBQUt5RCxXQUFMLENBQWlCN08sTUFBakIsQ0FBd0IsMENBQXhCOztBQUNBLFdBQU8sQ0FBQyxLQUFLNE8sUUFBTixDQUFQO0FBQ0QsR0FuRXFCLENBcUV0Qjs7Ozs7Ozs7QUFPQUcsU0FBTztBQUNMLFNBQUtGLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3Qix5Q0FBeEI7O0FBQ0EsV0FBT3JGLEVBQUVrSSxNQUFGLENBQVMsSUFBVCxFQUFlLEtBQUtnTSxXQUFMLENBQWlCaFMsVUFBakIsQ0FBNEJ1RixPQUE1QixDQUFvQyxLQUFLd00sUUFBTCxDQUFjM04sR0FBbEQsQ0FBZixDQUFQO0FBQ0Q7O0FBL0VxQjs7QUEyRmpCLE1BQU1zTSxXQUFOLENBQWtCO0FBQ3ZCblIsY0FBWTRTLFlBQVksRUFBeEIsRUFBNEJULE9BQTVCLEVBQXFDTSxXQUFyQyxFQUFrRDtBQUNoRCxTQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtHLFNBQUwsR0FBbUJBLFNBQW5CO0FBQ0EsU0FBS0MsUUFBTCxHQUFtQixDQUFDLENBQXBCO0FBQ0EsU0FBSzdILE1BQUwsR0FBbUIsS0FBS3lILFdBQUwsQ0FBaUJoUyxVQUFqQixDQUE0QmtFLElBQTVCLENBQWlDLEtBQUtpTyxTQUF0QyxFQUFpRFQsT0FBakQsQ0FBbkI7QUFDRCxHQU5zQixDQVF2Qjs7Ozs7Ozs7QUFPQTdFLFFBQU07QUFDSixTQUFLbUYsV0FBTCxDQUFpQjdPLE1BQWpCLENBQXdCLHlDQUF4Qjs7QUFDQSxXQUFPLEtBQUtvSCxNQUFMLENBQVlnRSxLQUFaLEVBQVA7QUFDRCxHQWxCc0IsQ0FvQnZCOzs7Ozs7OztBQU9BOEQsWUFBVTtBQUNSLFNBQUtMLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3Qiw2Q0FBeEI7O0FBQ0EsV0FBTyxLQUFLaVAsUUFBTCxHQUFpQixLQUFLN0gsTUFBTCxDQUFZQyxLQUFaLEtBQXNCLENBQTlDO0FBQ0QsR0E5QnNCLENBZ0N2Qjs7Ozs7Ozs7QUFPQXBELFNBQU87QUFDTCxTQUFLNEssV0FBTCxDQUFpQjdPLE1BQWpCLENBQXdCLDBDQUF4Qjs7QUFDQSxTQUFLb0gsTUFBTCxDQUFZZ0UsS0FBWixHQUFvQixFQUFFLEtBQUs2RCxRQUEzQjtBQUNELEdBMUNzQixDQTRDdkI7Ozs7Ozs7O0FBT0FFLGdCQUFjO0FBQ1osU0FBS04sV0FBTCxDQUFpQjdPLE1BQWpCLENBQXdCLGlEQUF4Qjs7QUFDQSxXQUFPLEtBQUtpUCxRQUFMLEtBQWtCLENBQUMsQ0FBMUI7QUFDRCxHQXREc0IsQ0F3RHZCOzs7Ozs7OztBQU9BRyxhQUFXO0FBQ1QsU0FBS1AsV0FBTCxDQUFpQjdPLE1BQWpCLENBQXdCLDhDQUF4Qjs7QUFDQSxTQUFLb0gsTUFBTCxDQUFZZ0UsS0FBWixHQUFvQixFQUFFLEtBQUs2RCxRQUEzQjtBQUNELEdBbEVzQixDQW9FdkI7Ozs7Ozs7O0FBT0E3RCxVQUFRO0FBQ04sU0FBS3lELFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3QiwyQ0FBeEI7O0FBQ0EsV0FBTyxLQUFLb0gsTUFBTCxDQUFZZ0UsS0FBWixNQUF1QixFQUE5QjtBQUNELEdBOUVzQixDQWdGdkI7Ozs7Ozs7O0FBT0FpRSxVQUFRO0FBQ04sU0FBS1IsV0FBTCxDQUFpQjdPLE1BQWpCLENBQXdCLDJDQUF4Qjs7QUFDQSxTQUFLaVAsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFdBQU8sS0FBSzdELEtBQUwsR0FBYSxLQUFLNkQsUUFBbEIsQ0FBUDtBQUNELEdBM0ZzQixDQTZGdkI7Ozs7Ozs7O0FBT0FLLFNBQU87QUFDTCxTQUFLVCxXQUFMLENBQWlCN08sTUFBakIsQ0FBd0IsMENBQXhCOztBQUNBLFNBQUtpUCxRQUFMLEdBQWdCLEtBQUs1SCxLQUFMLEtBQWUsQ0FBL0I7QUFDQSxXQUFPLEtBQUsrRCxLQUFMLEdBQWEsS0FBSzZELFFBQWxCLENBQVA7QUFDRCxHQXhHc0IsQ0EwR3ZCOzs7Ozs7OztBQU9BNUgsVUFBUTtBQUNOLFNBQUt3SCxXQUFMLENBQWlCN08sTUFBakIsQ0FBd0IsMkNBQXhCOztBQUNBLFdBQU8sS0FBS29ILE1BQUwsQ0FBWUMsS0FBWixFQUFQO0FBQ0QsR0FwSHNCLENBc0h2Qjs7Ozs7Ozs7O0FBUUEvRixTQUFPcEYsUUFBUCxFQUFpQjtBQUNmLFNBQUsyUyxXQUFMLENBQWlCN08sTUFBakIsQ0FBd0IsNENBQXhCOztBQUNBLFNBQUs2TyxXQUFMLENBQWlCdk4sTUFBakIsQ0FBd0IsS0FBSzBOLFNBQTdCLEVBQXdDOVMsUUFBeEM7O0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FsSXNCLENBb0l2Qjs7Ozs7Ozs7OztBQVNBZ1AsVUFBUWhQLFFBQVIsRUFBa0JxVCxVQUFVLEVBQTVCLEVBQWdDO0FBQzlCLFNBQUtWLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3Qiw2Q0FBeEI7O0FBQ0EsU0FBS29ILE1BQUwsQ0FBWThELE9BQVosQ0FBb0JoUCxRQUFwQixFQUE4QnFULE9BQTlCO0FBQ0QsR0FoSnNCLENBa0p2Qjs7Ozs7Ozs7O0FBUUE3RCxTQUFPO0FBQ0wsV0FBTyxLQUFLOEQsR0FBTCxDQUFVeE4sSUFBRCxJQUFVO0FBQ3hCLGFBQU8sSUFBSXdMLFVBQUosQ0FBZXhMLElBQWYsRUFBcUIsS0FBSzZNLFdBQTFCLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQTlKc0IsQ0FnS3ZCOzs7Ozs7Ozs7O0FBU0FXLE1BQUl0VCxRQUFKLEVBQWNxVCxVQUFVLEVBQXhCLEVBQTRCO0FBQzFCLFNBQUtWLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3Qix5Q0FBeEI7O0FBQ0EsV0FBTyxLQUFLb0gsTUFBTCxDQUFZb0ksR0FBWixDQUFnQnRULFFBQWhCLEVBQTBCcVQsT0FBMUIsQ0FBUDtBQUNELEdBNUtzQixDQThLdkI7Ozs7Ozs7O0FBT0FFLFlBQVU7QUFDUixTQUFLWixXQUFMLENBQWlCN08sTUFBakIsQ0FBd0IsNkNBQXhCOztBQUNBLFFBQUksS0FBS2lQLFFBQUwsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBS0EsUUFBTCxHQUFnQixDQUFoQjtBQUNEOztBQUNELFdBQU8sS0FBSzdELEtBQUwsR0FBYSxLQUFLNkQsUUFBbEIsQ0FBUDtBQUNELEdBM0xzQixDQTZMdkI7Ozs7Ozs7Ozs7QUFTQTlOLFVBQVF1TyxTQUFSLEVBQW1CO0FBQ2pCLFNBQUtiLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3Qiw2Q0FBeEI7O0FBQ0EsV0FBTyxLQUFLb0gsTUFBTCxDQUFZakcsT0FBWixDQUFvQnVPLFNBQXBCLENBQVA7QUFDRCxHQXpNc0IsQ0EyTXZCOzs7Ozs7Ozs7O0FBU0FDLGlCQUFlRCxTQUFmLEVBQTBCO0FBQ3hCLFNBQUtiLFdBQUwsQ0FBaUI3TyxNQUFqQixDQUF3QixvREFBeEI7O0FBQ0EsV0FBTyxLQUFLb0gsTUFBTCxDQUFZdUksY0FBWixDQUEyQkQsU0FBM0IsQ0FBUDtBQUNEOztBQXZOc0IsQzs7Ozs7Ozs7Ozs7QUN0R3pCbFYsT0FBT0MsTUFBUCxDQUFjO0FBQUNnQixnQkFBYSxNQUFJQSxZQUFsQjtBQUErQkMsb0JBQWlCLE1BQUlBLGdCQUFwRDtBQUFxRTRSLGdCQUFhLE1BQUlBO0FBQXRGLENBQWQ7O0FBQW1ILElBQUkzUyxDQUFKOztBQUFNSCxPQUFPSSxLQUFQLENBQWFDLFFBQVEsbUJBQVIsQ0FBYixFQUEwQztBQUFDRixJQUFFRyxDQUFGLEVBQUk7QUFBQ0gsUUFBRUcsQ0FBRjtBQUFJOztBQUFWLENBQTFDLEVBQXNELENBQXREO0FBQXlELElBQUlRLEtBQUo7QUFBVWQsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDUyxRQUFNUixDQUFOLEVBQVE7QUFBQ1EsWUFBTVIsQ0FBTjtBQUFROztBQUFsQixDQUFyQyxFQUF5RCxDQUF6RDs7QUFHNUw7O0dBR0EsTUFBTVcsZUFBZSxVQUFTbVUsR0FBVCxFQUFjO0FBQ2pDLE9BQUssSUFBSTVDLEdBQVQsSUFBZ0I0QyxHQUFoQixFQUFxQjtBQUNuQixRQUFJalYsRUFBRTJELFFBQUYsQ0FBV3NSLElBQUk1QyxHQUFKLENBQVgsS0FBd0IsQ0FBQyxDQUFDLENBQUM0QyxJQUFJNUMsR0FBSixFQUFTN0ksT0FBVCxDQUFpQixpQkFBakIsQ0FBL0IsRUFBb0U7QUFDbEV5TCxVQUFJNUMsR0FBSixJQUFXNEMsSUFBSTVDLEdBQUosRUFBU3BPLE9BQVQsQ0FBaUIsaUJBQWpCLEVBQW9DLEVBQXBDLENBQVg7QUFDQWdSLFVBQUk1QyxHQUFKLElBQVcsSUFBSS9HLElBQUosQ0FBU2xILFNBQVM2USxJQUFJNUMsR0FBSixDQUFULENBQVQsQ0FBWDtBQUNELEtBSEQsTUFHTyxJQUFJclMsRUFBRXFFLFFBQUYsQ0FBVzRRLElBQUk1QyxHQUFKLENBQVgsQ0FBSixFQUEwQjtBQUMvQjRDLFVBQUk1QyxHQUFKLElBQVd2UixhQUFhbVUsSUFBSTVDLEdBQUosQ0FBYixDQUFYO0FBQ0QsS0FGTSxNQUVBLElBQUlyUyxFQUFFa1YsT0FBRixDQUFVRCxJQUFJNUMsR0FBSixDQUFWLENBQUosRUFBeUI7QUFDOUIsVUFBSWxTLENBQUo7O0FBQ0EsV0FBSyxJQUFJZ1YsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixJQUFJNUMsR0FBSixFQUFTN0osTUFBN0IsRUFBcUMyTSxHQUFyQyxFQUEwQztBQUN4Q2hWLFlBQUk4VSxJQUFJNUMsR0FBSixFQUFTOEMsQ0FBVCxDQUFKOztBQUNBLFlBQUluVixFQUFFcUUsUUFBRixDQUFXbEUsQ0FBWCxDQUFKLEVBQW1CO0FBQ2pCOFUsY0FBSTVDLEdBQUosRUFBUzhDLENBQVQsSUFBY3JVLGFBQWFYLENBQWIsQ0FBZDtBQUNELFNBRkQsTUFFTyxJQUFJSCxFQUFFMkQsUUFBRixDQUFXeEQsQ0FBWCxLQUFpQixDQUFDLENBQUMsQ0FBQ0EsRUFBRXFKLE9BQUYsQ0FBVSxpQkFBVixDQUF4QixFQUFzRDtBQUMzRHJKLGNBQUlBLEVBQUU4RCxPQUFGLENBQVUsaUJBQVYsRUFBNkIsRUFBN0IsQ0FBSjtBQUNBZ1IsY0FBSTVDLEdBQUosRUFBUzhDLENBQVQsSUFBYyxJQUFJN0osSUFBSixDQUFTbEgsU0FBU2pFLENBQVQsQ0FBVCxDQUFkO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7O0FBQ0QsU0FBTzhVLEdBQVA7QUFDRCxDQXJCRCxDLENBdUJBOzs7O0FBR0EsTUFBTWxVLG1CQUFtQixVQUFTa1UsR0FBVCxFQUFjO0FBQ3JDLE9BQUssSUFBSTVDLEdBQVQsSUFBZ0I0QyxHQUFoQixFQUFxQjtBQUNuQixRQUFJalYsRUFBRW9WLE1BQUYsQ0FBU0gsSUFBSTVDLEdBQUosQ0FBVCxDQUFKLEVBQXdCO0FBQ3RCNEMsVUFBSTVDLEdBQUosSUFBWSxrQkFBaUIsQ0FBQzRDLElBQUk1QyxHQUFKLENBQVMsRUFBdkM7QUFDRCxLQUZELE1BRU8sSUFBSXJTLEVBQUVxRSxRQUFGLENBQVc0USxJQUFJNUMsR0FBSixDQUFYLENBQUosRUFBMEI7QUFDL0I0QyxVQUFJNUMsR0FBSixJQUFXdFIsaUJBQWlCa1UsSUFBSTVDLEdBQUosQ0FBakIsQ0FBWDtBQUNELEtBRk0sTUFFQSxJQUFJclMsRUFBRWtWLE9BQUYsQ0FBVUQsSUFBSTVDLEdBQUosQ0FBVixDQUFKLEVBQXlCO0FBQzlCLFVBQUlsUyxDQUFKOztBQUNBLFdBQUssSUFBSWdWLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsSUFBSTVDLEdBQUosRUFBUzdKLE1BQTdCLEVBQXFDMk0sR0FBckMsRUFBMEM7QUFDeENoVixZQUFJOFUsSUFBSTVDLEdBQUosRUFBUzhDLENBQVQsQ0FBSjs7QUFDQSxZQUFJblYsRUFBRXFFLFFBQUYsQ0FBV2xFLENBQVgsQ0FBSixFQUFtQjtBQUNqQjhVLGNBQUk1QyxHQUFKLEVBQVM4QyxDQUFULElBQWNwVSxpQkFBaUJaLENBQWpCLENBQWQ7QUFDRCxTQUZELE1BRU8sSUFBSUgsRUFBRW9WLE1BQUYsQ0FBU2pWLENBQVQsQ0FBSixFQUFpQjtBQUN0QjhVLGNBQUk1QyxHQUFKLEVBQVM4QyxDQUFULElBQWUsa0JBQWlCLENBQUNoVixDQUFFLEVBQW5DO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7O0FBQ0QsU0FBTzhVLEdBQVA7QUFDRCxDQW5CRCxDLENBcUJBOzs7Ozs7Ozs7O0FBU0EsTUFBTXRDLGVBQWUsQ0FBQ25PLE9BQUQsRUFBVTBILFVBQVUsVUFBcEIsS0FBbUM7QUFDdEQsTUFBSXdCLEdBQUo7QUFDQS9NLFFBQU02RCxPQUFOLEVBQWVxQixNQUFmO0FBQ0FsRixRQUFNdUwsT0FBTixFQUFlbkksTUFBZjs7QUFFQSxRQUFNc1IsUUFBUUMsMEJBQTBCQyxRQUExQixDQUFtQ3RSLE9BQW5DLENBQTJDLE1BQTNDLEVBQW1ELEVBQW5ELENBQWQ7O0FBQ0EsUUFBTStNLE9BQVN4TSxRQUFRc0wsUUFBUixJQUFvQnRMLFFBQVFzTCxRQUFSLENBQWlCNUQsT0FBakIsQ0FBckIsSUFBbUQxSCxPQUFqRTs7QUFFQSxNQUFJd00sS0FBS3pELFNBQUwsSUFBa0J2TixFQUFFMkQsUUFBRixDQUFXcU4sSUFBWCxFQUFpQixXQUFqQixDQUF0QixFQUFxRDtBQUNuRHRELFVBQU8sSUFBR3NELEtBQUt6RCxTQUFMLENBQWV0SixPQUFmLENBQXVCLEtBQXZCLEVBQThCLEVBQTlCLENBQWtDLEVBQTVDO0FBQ0QsR0FGRCxNQUVPO0FBQ0x5SixVQUFNLEVBQU47QUFDRDs7QUFFRCxNQUFJbEosUUFBUTFDLE1BQVIsS0FBbUIsSUFBdkIsRUFBNkI7QUFDM0IsV0FBT3VULFNBQVNuSixZQUFZLFVBQVosR0FBMEIsR0FBRTFILFFBQVFrUCxjQUFlLElBQUdsUCxRQUFROEIsR0FBSSxHQUFFb0gsR0FBSSxFQUF4RSxHQUE2RSxHQUFFbEosUUFBUWtQLGNBQWUsSUFBR3hILE9BQVEsSUFBRzFILFFBQVE4QixHQUFJLEdBQUVvSCxHQUFJLEVBQS9JLENBQVA7QUFDRDs7QUFDRCxTQUFPMkgsUUFBUyxHQUFFN1EsUUFBUWtQLGNBQWUsSUFBR2xQLFFBQVFtUCxlQUFnQixJQUFHblAsUUFBUThCLEdBQUksSUFBRzRGLE9BQVEsSUFBRzFILFFBQVE4QixHQUFJLEdBQUVvSCxHQUFJLEVBQW5IO0FBQ0QsQ0FsQkQsQzs7Ozs7Ozs7Ozs7QUM5REE3TixPQUFPQyxNQUFQLENBQWM7QUFBQ1ksV0FBUSxNQUFJRDtBQUFiLENBQWQ7QUFBeUMsSUFBSU8sRUFBSjtBQUFPbkIsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLFVBQVIsQ0FBYixFQUFpQztBQUFDUSxVQUFRUCxDQUFSLEVBQVU7QUFBQ2EsU0FBR2IsQ0FBSDtBQUFLOztBQUFqQixDQUFqQyxFQUFvRCxDQUFwRDs7QUFBdUQsSUFBSUgsQ0FBSjs7QUFBTUgsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLG1CQUFSLENBQWIsRUFBMEM7QUFBQ0YsSUFBRUcsQ0FBRixFQUFJO0FBQUNILFFBQUVHLENBQUY7QUFBSTs7QUFBVixDQUExQyxFQUFzRCxDQUF0RDtBQUF5RCxJQUFJRyxNQUFKO0FBQVdULE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxlQUFSLENBQWIsRUFBc0M7QUFBQ0ksU0FBT0gsQ0FBUCxFQUFTO0FBQUNHLGFBQU9ILENBQVA7QUFBUzs7QUFBcEIsQ0FBdEMsRUFBNEQsQ0FBNUQ7O0FBR2pMLE1BQU1xQixPQUFPLE1BQU0sQ0FBRSxDQUFyQixDLENBRUE7Ozs7O0FBSUEsTUFBTUgsUUFBVWYsT0FBT2dCLGVBQVAsQ0FBdUJDLFlBQVlBLFVBQW5DLENBQWhCO0FBQ0EsTUFBTWlVLFVBQVUsRUFBaEIsQyxDQUVBOzs7Ozs7Ozs7O0FBU2UsTUFBTS9VLFdBQU4sQ0FBa0I7QUFDL0JnQixjQUFZd0YsSUFBWixFQUFrQnNFLFNBQWxCLEVBQTZCbEUsSUFBN0IsRUFBbUNsRixXQUFuQyxFQUFnRDtBQUM5QyxTQUFLOEUsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS3NFLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS2xFLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtsRixXQUFMLEdBQW1CQSxXQUFuQjs7QUFDQSxRQUFJLENBQUMsS0FBSzhFLElBQU4sSUFBYyxDQUFDakgsRUFBRTJELFFBQUYsQ0FBVyxLQUFLc0QsSUFBaEIsQ0FBbkIsRUFBMEM7QUFDeEM7QUFDRDs7QUFFRCxTQUFLdUgsRUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtpSCxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBS2xPLEtBQUwsR0FBcUIsS0FBckI7QUFDQSxTQUFLRCxPQUFMLEdBQXFCLEtBQXJCOztBQUVBLFFBQUlrTyxRQUFRLEtBQUt2TyxJQUFiLEtBQXNCLENBQUN1TyxRQUFRLEtBQUt2TyxJQUFiLEVBQW1CTSxLQUExQyxJQUFtRCxDQUFDaU8sUUFBUSxLQUFLdk8sSUFBYixFQUFtQkssT0FBM0UsRUFBb0Y7QUFDbEYsV0FBS2tILEVBQUwsR0FBVWdILFFBQVEsS0FBS3ZPLElBQWIsRUFBbUJ1SCxFQUE3QjtBQUNBLFdBQUtpSCxhQUFMLEdBQXFCRCxRQUFRLEtBQUt2TyxJQUFiLEVBQW1Cd08sYUFBeEM7QUFDRCxLQUhELE1BR087QUFDTHpVLFNBQUcwVSxVQUFILENBQWMsS0FBS3pPLElBQW5CLEVBQTBCME8sT0FBRCxJQUFhO0FBQ3BDdFUsY0FBTSxNQUFNO0FBQ1YsY0FBSXNVLE9BQUosRUFBYTtBQUNYLGtCQUFNLElBQUlyVixPQUFPMEQsS0FBWCxDQUFpQixHQUFqQixFQUFzQix1REFBdEIsRUFBK0UyUixPQUEvRSxDQUFOO0FBQ0QsV0FGRCxNQUVPO0FBQ0wzVSxlQUFHNFUsSUFBSCxDQUFRLEtBQUszTyxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLEtBQUs5RSxXQUE5QixFQUEyQyxDQUFDMFQsTUFBRCxFQUFTckgsRUFBVCxLQUFnQjtBQUN6RG5OLG9CQUFNLE1BQU07QUFDVixvQkFBSXdVLE1BQUosRUFBWTtBQUNWLHdCQUFNLElBQUl2VixPQUFPMEQsS0FBWCxDQUFpQixHQUFqQixFQUFzQiw4REFBdEIsRUFBc0Y2UixNQUF0RixDQUFOO0FBQ0QsaUJBRkQsTUFFTztBQUNMLHVCQUFLckgsRUFBTCxHQUFVQSxFQUFWO0FBQ0FnSCwwQkFBUSxLQUFLdk8sSUFBYixJQUFxQixJQUFyQjtBQUNEO0FBQ0YsZUFQRDtBQVFELGFBVEQ7QUFVRDtBQUNGLFNBZkQ7QUFnQkQsT0FqQkQ7QUFrQkQ7QUFDRixHQXRDOEIsQ0F3Qy9COzs7Ozs7Ozs7O0FBU0FrSCxRQUFNMkgsR0FBTixFQUFXQyxLQUFYLEVBQWtCeFUsUUFBbEIsRUFBNEI7QUFDMUIsUUFBSSxDQUFDLEtBQUsrRixPQUFOLElBQWlCLENBQUMsS0FBS0MsS0FBM0IsRUFBa0M7QUFDaEMsVUFBSSxLQUFLaUgsRUFBVCxFQUFhO0FBQ1h4TixXQUFHbU4sS0FBSCxDQUFTLEtBQUtLLEVBQWQsRUFBa0J1SCxLQUFsQixFQUF5QixDQUF6QixFQUE0QkEsTUFBTXZOLE1BQWxDLEVBQTBDLENBQUNzTixNQUFNLENBQVAsSUFBWSxLQUFLek8sSUFBTCxDQUFVckYsU0FBaEUsRUFBMkUsQ0FBQ3dELEtBQUQsRUFBUXdRLE9BQVIsRUFBaUJoSCxNQUFqQixLQUE0QjtBQUNyRzNOLGdCQUFNLE1BQU07QUFDVkUsd0JBQVlBLFNBQVNpRSxLQUFULEVBQWdCd1EsT0FBaEIsRUFBeUJoSCxNQUF6QixDQUFaOztBQUNBLGdCQUFJeEosS0FBSixFQUFXO0FBQ1RvRSxzQkFBUUMsSUFBUixDQUFhLGtEQUFiLEVBQWlFckUsS0FBakU7QUFDQSxtQkFBS3VCLEtBQUw7QUFDRCxhQUhELE1BR087QUFDTCxnQkFBRSxLQUFLME8sYUFBUDtBQUNEO0FBQ0YsV0FSRDtBQVNELFNBVkQ7QUFXRCxPQVpELE1BWU87QUFDTG5WLGVBQU8yVixVQUFQLENBQWtCLE1BQU07QUFDdEIsZUFBSzlILEtBQUwsQ0FBVzJILEdBQVgsRUFBZ0JDLEtBQWhCLEVBQXVCeFUsUUFBdkI7QUFDRCxTQUZELEVBRUcsRUFGSDtBQUdEO0FBQ0Y7O0FBQ0QsV0FBTyxLQUFQO0FBQ0QsR0F0RThCLENBd0UvQjs7Ozs7Ozs7QUFPQXVGLE1BQUl2RixRQUFKLEVBQWM7QUFDWixRQUFJLENBQUMsS0FBSytGLE9BQU4sSUFBaUIsQ0FBQyxLQUFLQyxLQUEzQixFQUFrQztBQUNoQyxVQUFJLEtBQUtrTyxhQUFMLEtBQXVCLEtBQUtsSyxTQUFoQyxFQUEyQztBQUN6Q3ZLLFdBQUc0TixLQUFILENBQVMsS0FBS0osRUFBZCxFQUFrQixNQUFNO0FBQ3RCbk4sZ0JBQU0sTUFBTTtBQUNWLG1CQUFPbVUsUUFBUSxLQUFLdk8sSUFBYixDQUFQO0FBQ0EsaUJBQUtNLEtBQUwsR0FBYSxJQUFiO0FBQ0FoRyx3QkFBWUEsU0FBUyxLQUFLLENBQWQsRUFBaUIsSUFBakIsQ0FBWjtBQUNELFdBSkQ7QUFLRCxTQU5EO0FBT0EsZUFBTyxJQUFQO0FBQ0Q7O0FBRURQLFNBQUc0TyxJQUFILENBQVEsS0FBSzNJLElBQWIsRUFBbUIsQ0FBQ3pCLEtBQUQsRUFBUW9LLElBQVIsS0FBaUI7QUFDbEN2TyxjQUFNLE1BQU07QUFDVixjQUFJLENBQUNtRSxLQUFELElBQVVvSyxJQUFkLEVBQW9CO0FBQ2xCLGlCQUFLNkYsYUFBTCxHQUFxQmhTLEtBQUt5UyxJQUFMLENBQVV0RyxLQUFLL0ssSUFBTCxHQUFZLEtBQUt3QyxJQUFMLENBQVVyRixTQUFoQyxDQUFyQjtBQUNEOztBQUVELGlCQUFPMUIsT0FBTzJWLFVBQVAsQ0FBa0IsTUFBTTtBQUM3QixpQkFBS25QLEdBQUwsQ0FBU3ZGLFFBQVQ7QUFDRCxXQUZNLEVBRUosRUFGSSxDQUFQO0FBR0QsU0FSRDtBQVNELE9BVkQ7QUFXRCxLQXZCRCxNQXVCTztBQUNMQSxrQkFBWUEsU0FBUyxLQUFLLENBQWQsRUFBaUIsS0FBS2dHLEtBQXRCLENBQVo7QUFDRDs7QUFDRCxXQUFPLEtBQVA7QUFDRCxHQTNHOEIsQ0E2Ry9COzs7Ozs7OztBQU9BUixRQUFNeEYsUUFBTixFQUFnQjtBQUNkLFNBQUsrRixPQUFMLEdBQWUsSUFBZjtBQUNBLFdBQU9rTyxRQUFRLEtBQUt2TyxJQUFiLENBQVA7QUFDQWpHLE9BQUdpTSxNQUFILENBQVUsS0FBS2hHLElBQWYsRUFBc0IxRixZQUFZQyxJQUFsQztBQUNBLFdBQU8sSUFBUDtBQUNELEdBekg4QixDQTJIL0I7Ozs7Ozs7QUFNQXFGLFNBQU87QUFDTCxTQUFLUyxPQUFMLEdBQWUsSUFBZjtBQUNBLFdBQU9rTyxRQUFRLEtBQUt2TyxJQUFiLENBQVA7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFySThCLEMiLCJmaWxlIjoiL3BhY2thZ2VzL29zdHJpb19maWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF8gfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcbmltcG9ydCB7IE1vbmdvIH0gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgeyBXZWJBcHAgfSAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdtZXRlb3Ivd2ViYXBwJztcbmltcG9ydCB7IE1ldGVvciB9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgUmFuZG9tIH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnbWV0ZW9yL3JhbmRvbSc7XG5pbXBvcnQgeyBDb29raWVzIH0gICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdtZXRlb3Ivb3N0cmlvOmNvb2tpZXMnO1xuaW1wb3J0IFdyaXRlU3RyZWFtICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi93cml0ZS1zdHJlYW0uanMnO1xuaW1wb3J0IHsgY2hlY2ssIE1hdGNoIH0gICAgICAgICAgICAgICAgICAgZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCBGaWxlc0NvbGxlY3Rpb25Db3JlICAgICAgICAgICAgICAgIGZyb20gJy4vY29yZS5qcyc7XG5pbXBvcnQgeyBmaXhKU09OUGFyc2UsIGZpeEpTT05TdHJpbmdpZnkgfSBmcm9tICcuL2xpYi5qcyc7XG5cbmltcG9ydCBmcyAgICAgICBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgbm9kZVFzICAgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IHJlcXVlc3QgIGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0IGZpbGVUeXBlIGZyb20gJ2ZpbGUtdHlwZSc7XG5pbXBvcnQgbm9kZVBhdGggZnJvbSAncGF0aCc7XG5cbi8qXG4gKiBAY29uc3Qge09iamVjdH0gYm91bmQgIC0gTWV0ZW9yLmJpbmRFbnZpcm9ubWVudCAoRmliZXIgd3JhcHBlcilcbiAqIEBjb25zdCB7RnVuY3Rpb259IE5PT1AgLSBObyBPcGVyYXRpb24gZnVuY3Rpb24sIHBsYWNlaG9sZGVyIGZvciByZXF1aXJlZCBjYWxsYmFja3NcbiAqL1xuY29uc3QgYm91bmQgPSBNZXRlb3IuYmluZEVudmlyb25tZW50KGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpO1xuY29uc3QgTk9PUCAgPSAoKSA9PiB7ICB9O1xuXG4vKlxuICogQGxvY3VzIEFueXdoZXJlXG4gKiBAY2xhc3MgRmlsZXNDb2xsZWN0aW9uXG4gKiBAcGFyYW0gY29uZmlnICAgICAgICAgICB7T2JqZWN0fSAgIC0gW0JvdGhdICAgQ29uZmlndXJhdGlvbiBvYmplY3Qgd2l0aCBuZXh0IHByb3BlcnRpZXM6XG4gKiBAcGFyYW0gY29uZmlnLmRlYnVnICAgICB7Qm9vbGVhbn0gIC0gW0JvdGhdICAgVHVybiBvbi9vZiBkZWJ1Z2dpbmcgYW5kIGV4dHJhIGxvZ2dpbmdcbiAqIEBwYXJhbSBjb25maWcuc2NoZW1hICAgIHtPYmplY3R9ICAgLSBbQm90aF0gICBDb2xsZWN0aW9uIFNjaGVtYVxuICogQHBhcmFtIGNvbmZpZy5wdWJsaWMgICAge0Jvb2xlYW59ICAtIFtCb3RoXSAgIFN0b3JlIGZpbGVzIGluIGZvbGRlciBhY2Nlc3NpYmxlIGZvciBwcm94eSBzZXJ2ZXJzLCBmb3IgbGltaXRzLCBhbmQgbW9yZSAtIHJlYWQgZG9jc1xuICogQHBhcmFtIGNvbmZpZy5zdHJpY3QgICAge0Jvb2xlYW59ICAtIFtTZXJ2ZXJdIFN0cmljdCBtb2RlIGZvciBwYXJ0aWFsIGNvbnRlbnQsIGlmIGlzIGB0cnVlYCBzZXJ2ZXIgd2lsbCByZXR1cm4gYDQxNmAgcmVzcG9uc2UgY29kZSwgd2hlbiBgcmFuZ2VgIGlzIG5vdCBzcGVjaWZpZWQsIG90aGVyd2lzZSBzZXJ2ZXIgcmV0dXJuIGAyMDZgXG4gKiBAcGFyYW0gY29uZmlnLnByb3RlY3RlZCB7RnVuY3Rpb259IC0gW1NlcnZlcl0gSWYgYHRydWVgIC0gZmlsZXMgd2lsbCBiZSBzZXJ2ZWQgb25seSB0byBhdXRob3JpemVkIHVzZXJzLCBpZiBgZnVuY3Rpb24oKWAgLSB5b3UncmUgYWJsZSB0byBjaGVjayB2aXNpdG9yJ3MgcGVybWlzc2lvbnMgaW4geW91ciBvd24gd2F5IGZ1bmN0aW9uJ3MgY29udGV4dCBoYXM6XG4gKiAgLSBgcmVxdWVzdGBcbiAqICAtIGByZXNwb25zZWBcbiAqICAtIGB1c2VyKClgXG4gKiAgLSBgdXNlcklkYFxuICogQHBhcmFtIGNvbmZpZy5jaHVua1NpemUgICAgICB7TnVtYmVyfSAgLSBbQm90aF0gVXBsb2FkIGNodW5rIHNpemUsIGRlZmF1bHQ6IDUyNDI4OCBieXRlcyAoMCw1IE1iKVxuICogQHBhcmFtIGNvbmZpZy5wZXJtaXNzaW9ucyAgICB7TnVtYmVyfSAgLSBbU2VydmVyXSBQZXJtaXNzaW9ucyB3aGljaCB3aWxsIGJlIHNldCB0byB1cGxvYWRlZCBmaWxlcyAob2N0YWwpLCBsaWtlOiBgNTExYCBvciBgMG83NTVgLiBEZWZhdWx0OiAwNjQ0XG4gKiBAcGFyYW0gY29uZmlnLnBhcmVudERpclBlcm1pc3Npb25zIHtOdW1iZXJ9ICAtIFtTZXJ2ZXJdIFBlcm1pc3Npb25zIHdoaWNoIHdpbGwgYmUgc2V0IHRvIHBhcmVudCBkaXJlY3Rvcnkgb2YgdXBsb2FkZWQgZmlsZXMgKG9jdGFsKSwgbGlrZTogYDYxMWAgb3IgYDBvNzc3YC4gRGVmYXVsdDogMDc1NVxuICogQHBhcmFtIGNvbmZpZy5zdG9yYWdlUGF0aCAgICB7U3RyaW5nfEZ1bmN0aW9ufSAgLSBbU2VydmVyXSBTdG9yYWdlIHBhdGggb24gZmlsZSBzeXN0ZW1cbiAqIEBwYXJhbSBjb25maWcuY2FjaGVDb250cm9sICAge1N0cmluZ30gIC0gW1NlcnZlcl0gRGVmYXVsdCBgQ2FjaGUtQ29udHJvbGAgaGVhZGVyXG4gKiBAcGFyYW0gY29uZmlnLnJlc3BvbnNlSGVhZGVycyB7T2JqZWN0fEZ1bmN0aW9ufSAtIFtTZXJ2ZXJdIEN1c3RvbSByZXNwb25zZSBoZWFkZXJzLCBpZiBmdW5jdGlvbiBpcyBwYXNzZWQsIG11c3QgcmV0dXJuIE9iamVjdFxuICogQHBhcmFtIGNvbmZpZy50aHJvdHRsZSAgICAgICB7TnVtYmVyfSAgLSBbU2VydmVyXSBERVBSRUNBVEVEIGJwcyB0aHJvdHRsZSB0aHJlc2hvbGRcbiAqIEBwYXJhbSBjb25maWcuZG93bmxvYWRSb3V0ZSAge1N0cmluZ30gIC0gW0JvdGhdICAgU2VydmVyIFJvdXRlIHVzZWQgdG8gcmV0cmlldmUgZmlsZXNcbiAqIEBwYXJhbSBjb25maWcuY29sbGVjdGlvbiAgICAge01vbmdvLkNvbGxlY3Rpb259IC0gW0JvdGhdIE1vbmdvIENvbGxlY3Rpb24gSW5zdGFuY2VcbiAqIEBwYXJhbSBjb25maWcuY29sbGVjdGlvbk5hbWUge1N0cmluZ30gIC0gW0JvdGhdICAgQ29sbGVjdGlvbiBuYW1lXG4gKiBAcGFyYW0gY29uZmlnLm5hbWluZ0Z1bmN0aW9uIHtGdW5jdGlvbn0tIFtCb3RoXSAgIEZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYFN0cmluZ2BcbiAqIEBwYXJhbSBjb25maWcuaW50ZWdyaXR5Q2hlY2sge0Jvb2xlYW59IC0gW1NlcnZlcl0gQ2hlY2sgZmlsZSdzIGludGVncml0eSBiZWZvcmUgc2VydmluZyB0byB1c2Vyc1xuICogQHBhcmFtIGNvbmZpZy5vbkFmdGVyVXBsb2FkICB7RnVuY3Rpb259LSBbU2VydmVyXSBDYWxsZWQgcmlnaHQgYWZ0ZXIgZmlsZSBpcyByZWFkeSBvbiBGUy4gVXNlIHRvIHRyYW5zZmVyIGZpbGUgc29tZXdoZXJlIGVsc2UsIG9yIGRvIG90aGVyIHRoaW5nIHdpdGggZmlsZSBkaXJlY3RseVxuICogQHBhcmFtIGNvbmZpZy5vbkFmdGVyUmVtb3ZlICB7RnVuY3Rpb259IC0gW1NlcnZlcl0gQ2FsbGVkIHJpZ2h0IGFmdGVyIGZpbGUgaXMgcmVtb3ZlZC4gUmVtb3ZlZCBvYmplY3RzIGlzIHBhc3NlZCB0byBjYWxsYmFja1xuICogQHBhcmFtIGNvbmZpZy5jb250aW51ZVVwbG9hZFRUTCB7TnVtYmVyfSAtIFtTZXJ2ZXJdIFRpbWUgaW4gc2Vjb25kcywgZHVyaW5nIHVwbG9hZCBtYXkgYmUgY29udGludWVkLCBkZWZhdWx0IDMgaG91cnMgKDEwODAwIHNlY29uZHMpXG4gKiBAcGFyYW0gY29uZmlnLm9uQmVmb3JlVXBsb2FkIHtGdW5jdGlvbn0tIFtCb3RoXSAgIEZ1bmN0aW9uIHdoaWNoIGV4ZWN1dGVzIG9uIHNlcnZlciBhZnRlciByZWNlaXZpbmcgZWFjaCBjaHVuayBhbmQgb24gY2xpZW50IHJpZ2h0IGJlZm9yZSBiZWdpbm5pbmcgdXBsb2FkLiBGdW5jdGlvbiBjb250ZXh0IGlzIGBGaWxlYCAtIHNvIHlvdSBhcmUgYWJsZSB0byBjaGVjayBmb3IgZXh0ZW5zaW9uLCBtaW1lLXR5cGUsIHNpemUgYW5kIGV0Yy46XG4gKiAgLSByZXR1cm4gYHRydWVgIHRvIGNvbnRpbnVlXG4gKiAgLSByZXR1cm4gYGZhbHNlYCBvciBgU3RyaW5nYCB0byBhYm9ydCB1cGxvYWRcbiAqIEBwYXJhbSBjb25maWcub25Jbml0aWF0ZVVwbG9hZCB7RnVuY3Rpb259IC0gW1NlcnZlcl0gRnVuY3Rpb24gd2hpY2ggZXhlY3V0ZXMgb24gc2VydmVyIHJpZ2h0IGJlZm9yZSB1cGxvYWQgaXMgYmVnaW4gYW5kIHJpZ2h0IGFmdGVyIGBvbkJlZm9yZVVwbG9hZGAgaG9vay4gVGhpcyBob29rIGlzIGZ1bGx5IGFzeW5jaHJvbm91cy5cbiAqIEBwYXJhbSBjb25maWcub25CZWZvcmVSZW1vdmUge0Z1bmN0aW9ufSAtIFtTZXJ2ZXJdIEV4ZWN1dGVzIGJlZm9yZSByZW1vdmluZyBmaWxlIG9uIHNlcnZlciwgc28geW91IGNhbiBjaGVjayBwZXJtaXNzaW9ucy4gUmV0dXJuIGB0cnVlYCB0byBhbGxvdyBhY3Rpb24gYW5kIGBmYWxzZWAgdG8gZGVueS5cbiAqIEBwYXJhbSBjb25maWcuYWxsb3dDbGllbnRDb2RlICB7Qm9vbGVhbn0gIC0gW0JvdGhdICAgQWxsb3cgdG8gcnVuIGByZW1vdmVgIGZyb20gY2xpZW50XG4gKiBAcGFyYW0gY29uZmlnLmRvd25sb2FkQ2FsbGJhY2sge0Z1bmN0aW9ufSAtIFtTZXJ2ZXJdIENhbGxiYWNrIHRyaWdnZXJlZCBlYWNoIHRpbWUgZmlsZSBpcyByZXF1ZXN0ZWQsIHJldHVybiB0cnV0aHkgdmFsdWUgdG8gY29udGludWUgZG93bmxvYWQsIG9yIGZhbHN5IHRvIGFib3J0XG4gKiBAcGFyYW0gY29uZmlnLmludGVyY2VwdERvd25sb2FkIHtGdW5jdGlvbn0gLSBbU2VydmVyXSBJbnRlcmNlcHQgZG93bmxvYWQgcmVxdWVzdCwgc28geW91IGNhbiBzZXJ2ZSBmaWxlIGZyb20gdGhpcmQtcGFydHkgcmVzb3VyY2UsIGFyZ3VtZW50cyB7aHR0cDoge3JlcXVlc3Q6IHsuLi59LCByZXNwb25zZTogey4uLn19LCBmaWxlUmVmOiB7Li4ufX1cbiAqIEBwYXJhbSBjb25maWcuZGlzYWJsZVVwbG9hZCB7Qm9vbGVhbn0gLSBEaXNhYmxlIGZpbGUgdXBsb2FkLCB1c2VmdWwgZm9yIHNlcnZlciBvbmx5IHNvbHV0aW9uc1xuICogQHBhcmFtIGNvbmZpZy5kaXNhYmxlRG93bmxvYWQge0Jvb2xlYW59IC0gRGlzYWJsZSBmaWxlIGRvd25sb2FkIChzZXJ2aW5nKSwgdXNlZnVsIGZvciBmaWxlIG1hbmFnZW1lbnQgb25seSBzb2x1dGlvbnNcbiAqIEBzdW1tYXJ5IENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgRmlsZXNDb2xsZWN0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlc0NvbGxlY3Rpb24gZXh0ZW5kcyBGaWxlc0NvbGxlY3Rpb25Db3JlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgc3RvcmFnZVBhdGg7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgKHtcbiAgICAgICAgc3RvcmFnZVBhdGgsXG4gICAgICAgIGRlYnVnOiB0aGlzLmRlYnVnLFxuICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICBwdWJsaWM6IHRoaXMucHVibGljLFxuICAgICAgICBzdHJpY3Q6IHRoaXMuc3RyaWN0LFxuICAgICAgICBjaHVua1NpemU6IHRoaXMuY2h1bmtTaXplLFxuICAgICAgICBwcm90ZWN0ZWQ6IHRoaXMucHJvdGVjdGVkLFxuICAgICAgICBjb2xsZWN0aW9uOiB0aGlzLmNvbGxlY3Rpb24sXG4gICAgICAgIHBlcm1pc3Npb25zOiB0aGlzLnBlcm1pc3Npb25zLFxuICAgICAgICBjYWNoZUNvbnRyb2w6IHRoaXMuY2FjaGVDb250cm9sLFxuICAgICAgICBkb3dubG9hZFJvdXRlOiB0aGlzLmRvd25sb2FkUm91dGUsXG4gICAgICAgIG9uQWZ0ZXJVcGxvYWQ6IHRoaXMub25BZnRlclVwbG9hZCxcbiAgICAgICAgb25BZnRlclJlbW92ZTogdGhpcy5vbkFmdGVyUmVtb3ZlLFxuICAgICAgICBkaXNhYmxlVXBsb2FkOiB0aGlzLmRpc2FibGVVcGxvYWQsXG4gICAgICAgIG9uQmVmb3JlUmVtb3ZlOiB0aGlzLm9uQmVmb3JlUmVtb3ZlLFxuICAgICAgICBpbnRlZ3JpdHlDaGVjazogdGhpcy5pbnRlZ3JpdHlDaGVjayxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6IHRoaXMuY29sbGVjdGlvbk5hbWUsXG4gICAgICAgIG9uQmVmb3JlVXBsb2FkOiB0aGlzLm9uQmVmb3JlVXBsb2FkLFxuICAgICAgICBuYW1pbmdGdW5jdGlvbjogdGhpcy5uYW1pbmdGdW5jdGlvbixcbiAgICAgICAgcmVzcG9uc2VIZWFkZXJzOiB0aGlzLnJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgZGlzYWJsZURvd25sb2FkOiB0aGlzLmRpc2FibGVEb3dubG9hZCxcbiAgICAgICAgYWxsb3dDbGllbnRDb2RlOiB0aGlzLmFsbG93Q2xpZW50Q29kZSxcbiAgICAgICAgZG93bmxvYWRDYWxsYmFjazogdGhpcy5kb3dubG9hZENhbGxiYWNrLFxuICAgICAgICBvbkluaXRpYXRlVXBsb2FkOiB0aGlzLm9uSW5pdGlhdGVVcGxvYWQsXG4gICAgICAgIGludGVyY2VwdERvd25sb2FkOiB0aGlzLmludGVyY2VwdERvd25sb2FkLFxuICAgICAgICBjb250aW51ZVVwbG9hZFRUTDogdGhpcy5jb250aW51ZVVwbG9hZFRUTCxcbiAgICAgICAgcGFyZW50RGlyUGVybWlzc2lvbnM6IHRoaXMucGFyZW50RGlyUGVybWlzc2lvbnNcbiAgICAgIH0gPSBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGYgICA9IHRoaXM7XG4gICAgY29uc3QgY29va2llID0gbmV3IENvb2tpZXMoKTtcblxuICAgIGlmICghXy5pc0Jvb2xlYW4odGhpcy5kZWJ1ZykpIHtcbiAgICAgIHRoaXMuZGVidWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNCb29sZWFuKHRoaXMucHVibGljKSkge1xuICAgICAgdGhpcy5wdWJsaWMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvdGVjdGVkKSB7XG4gICAgICB0aGlzLnByb3RlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jaHVua1NpemUpIHtcbiAgICAgIHRoaXMuY2h1bmtTaXplID0gMTAyNCAqIDUxMjtcbiAgICB9XG5cbiAgICB0aGlzLmNodW5rU2l6ZSA9IE1hdGguZmxvb3IodGhpcy5jaHVua1NpemUgLyA4KSAqIDg7XG5cbiAgICBpZiAoIV8uaXNTdHJpbmcodGhpcy5jb2xsZWN0aW9uTmFtZSkgJiYgIXRoaXMuY29sbGVjdGlvbikge1xuICAgICAgdGhpcy5jb2xsZWN0aW9uTmFtZSA9ICdNZXRlb3JVcGxvYWRGaWxlcyc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbGxlY3Rpb24pIHtcbiAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBNb25nby5Db2xsZWN0aW9uKHRoaXMuY29sbGVjdGlvbk5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbGxlY3Rpb25OYW1lID0gdGhpcy5jb2xsZWN0aW9uLl9uYW1lO1xuICAgIH1cblxuICAgIHRoaXMuY29sbGVjdGlvbi5maWxlc0NvbGxlY3Rpb24gPSB0aGlzO1xuICAgIGNoZWNrKHRoaXMuY29sbGVjdGlvbk5hbWUsIFN0cmluZyk7XG5cbiAgICBpZiAodGhpcy5wdWJsaWMgJiYgIXRoaXMuZG93bmxvYWRSb3V0ZSkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig1MDAsIGBbRmlsZXNDb2xsZWN0aW9uLiR7dGhpcy5jb2xsZWN0aW9uTmFtZX1dOiBcXFwiZG93bmxvYWRSb3V0ZVxcXCIgbXVzdCBiZSBwcmVjaXNlbHkgcHJvdmlkZWQgb24gXFxcInB1YmxpY1xcXCIgY29sbGVjdGlvbnMhIE5vdGU6IFxcXCJkb3dubG9hZFJvdXRlXFxcIiBtdXN0IGJlIGVxdWFsIG9yIGJlIGluc2lkZSBvZiB5b3VyIHdlYi9wcm94eS1zZXJ2ZXIgKHJlbGF0aXZlKSByb290LmApO1xuICAgIH1cblxuICAgIGlmICghXy5pc1N0cmluZyh0aGlzLmRvd25sb2FkUm91dGUpKSB7XG4gICAgICB0aGlzLmRvd25sb2FkUm91dGUgPSAnL2Nkbi9zdG9yYWdlJztcbiAgICB9XG5cbiAgICB0aGlzLmRvd25sb2FkUm91dGUgPSB0aGlzLmRvd25sb2FkUm91dGUucmVwbGFjZSgvXFwvJC8sICcnKTtcblxuICAgIGlmICghXy5pc0Z1bmN0aW9uKHRoaXMubmFtaW5nRnVuY3Rpb24pKSB7XG4gICAgICB0aGlzLm5hbWluZ0Z1bmN0aW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRnVuY3Rpb24odGhpcy5vbkJlZm9yZVVwbG9hZCkpIHtcbiAgICAgIHRoaXMub25CZWZvcmVVcGxvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNCb29sZWFuKHRoaXMuYWxsb3dDbGllbnRDb2RlKSkge1xuICAgICAgdGhpcy5hbGxvd0NsaWVudENvZGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghXy5pc0Z1bmN0aW9uKHRoaXMub25Jbml0aWF0ZVVwbG9hZCkpIHtcbiAgICAgIHRoaXMub25Jbml0aWF0ZVVwbG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghXy5pc0Z1bmN0aW9uKHRoaXMuaW50ZXJjZXB0RG93bmxvYWQpKSB7XG4gICAgICB0aGlzLmludGVyY2VwdERvd25sb2FkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzQm9vbGVhbih0aGlzLnN0cmljdCkpIHtcbiAgICAgIHRoaXMuc3RyaWN0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wZXJtaXNzaW9ucykpIHtcbiAgICAgIHRoaXMucGVybWlzc2lvbnMgPSBwYXJzZUludCgnNjQ0JywgOCk7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzTnVtYmVyKHRoaXMucGFyZW50RGlyUGVybWlzc2lvbnMpKSB7XG4gICAgICB0aGlzLnBhcmVudERpclBlcm1pc3Npb25zID0gcGFyc2VJbnQoJzc1NScsIDgpO1xuICAgIH1cblxuICAgIGlmICghXy5pc1N0cmluZyh0aGlzLmNhY2hlQ29udHJvbCkpIHtcbiAgICAgIHRoaXMuY2FjaGVDb250cm9sID0gJ3B1YmxpYywgbWF4LWFnZT0zMTUzNjAwMCwgcy1tYXhhZ2U9MzE1MzYwMDAnO1xuICAgIH1cblxuICAgIGlmICghXy5pc0Z1bmN0aW9uKHRoaXMub25BZnRlclVwbG9hZCkpIHtcbiAgICAgIHRoaXMub25BZnRlclVwbG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghXy5pc0Jvb2xlYW4odGhpcy5kaXNhYmxlVXBsb2FkKSkge1xuICAgICAgdGhpcy5kaXNhYmxlVXBsb2FkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRnVuY3Rpb24odGhpcy5vbkFmdGVyUmVtb3ZlKSkge1xuICAgICAgdGhpcy5vbkFmdGVyUmVtb3ZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRnVuY3Rpb24odGhpcy5vbkJlZm9yZVJlbW92ZSkpIHtcbiAgICAgIHRoaXMub25CZWZvcmVSZW1vdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNCb29sZWFuKHRoaXMuaW50ZWdyaXR5Q2hlY2spKSB7XG4gICAgICB0aGlzLmludGVncml0eUNoZWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNCb29sZWFuKHRoaXMuZGlzYWJsZURvd25sb2FkKSkge1xuICAgICAgdGhpcy5kaXNhYmxlRG93bmxvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5fY3VycmVudFVwbG9hZHMpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VXBsb2FkcyA9IHt9O1xuICAgIH1cblxuICAgIGlmICghXy5pc0Z1bmN0aW9uKHRoaXMuZG93bmxvYWRDYWxsYmFjaykpIHtcbiAgICAgIHRoaXMuZG93bmxvYWRDYWxsYmFjayA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghXy5pc051bWJlcih0aGlzLmNvbnRpbnVlVXBsb2FkVFRMKSkge1xuICAgICAgdGhpcy5jb250aW51ZVVwbG9hZFRUTCA9IDEwODAwO1xuICAgIH1cblxuICAgIGlmICghXy5pc0Z1bmN0aW9uKHRoaXMucmVzcG9uc2VIZWFkZXJzKSkge1xuICAgICAgdGhpcy5yZXNwb25zZUhlYWRlcnMgPSAocmVzcG9uc2VDb2RlLCBmaWxlUmVmLCB2ZXJzaW9uUmVmKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlQ29kZSkge1xuICAgICAgICBjYXNlICcyMDYnOlxuICAgICAgICAgIGhlYWRlcnMuUHJhZ21hICAgICAgICAgICAgICAgPSAncHJpdmF0ZSc7XG4gICAgICAgICAgaGVhZGVycy5UcmFpbGVyICAgICAgICAgICAgICA9ICdleHBpcmVzJztcbiAgICAgICAgICBoZWFkZXJzWydUcmFuc2Zlci1FbmNvZGluZyddID0gJ2NodW5rZWQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc0MDAnOlxuICAgICAgICAgIGhlYWRlcnNbJ0NhY2hlLUNvbnRyb2wnXSAgICAgPSAnbm8tY2FjaGUnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc0MTYnOlxuICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtUmFuZ2UnXSAgICAgPSBgYnl0ZXMgKi8ke3ZlcnNpb25SZWYuc2l6ZX1gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZGVycy5Db25uZWN0aW9uICAgICAgID0gJ2tlZXAtYWxpdmUnO1xuICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSAgPSB2ZXJzaW9uUmVmLnR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gICAgICAgIGhlYWRlcnNbJ0FjY2VwdC1SYW5nZXMnXSA9ICdieXRlcyc7XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wdWJsaWMgJiYgIXN0b3JhZ2VQYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDUwMCwgYFtGaWxlc0NvbGxlY3Rpb24uJHt0aGlzLmNvbGxlY3Rpb25OYW1lfV0gXFxcInN0b3JhZ2VQYXRoXFxcIiBtdXN0IGJlIHNldCBvbiBcXFwicHVibGljXFxcIiBjb2xsZWN0aW9ucyEgTm90ZTogXFxcInN0b3JhZ2VQYXRoXFxcIiBtdXN0IGJlIGVxdWFsIG9uIGJlIGluc2lkZSBvZiB5b3VyIHdlYi9wcm94eS1zZXJ2ZXIgKGFic29sdXRlKSByb290LmApO1xuICAgIH1cblxuICAgIGlmICghc3RvcmFnZVBhdGgpIHtcbiAgICAgIHN0b3JhZ2VQYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYGFzc2V0cyR7bm9kZVBhdGguc2VwfWFwcCR7bm9kZVBhdGguc2VwfXVwbG9hZHMke25vZGVQYXRoLnNlcH0ke3NlbGYuY29sbGVjdGlvbk5hbWV9YDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKF8uaXNTdHJpbmcoc3RvcmFnZVBhdGgpKSB7XG4gICAgICB0aGlzLnN0b3JhZ2VQYXRoID0gKCkgPT4gc3RvcmFnZVBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmFnZVBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzcCA9IHN0b3JhZ2VQYXRoLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmICghXy5pc1N0cmluZyhzcCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMCwgYFtGaWxlc0NvbGxlY3Rpb24uJHtzZWxmLmNvbGxlY3Rpb25OYW1lfV0gXFxcInN0b3JhZ2VQYXRoXFxcIiBmdW5jdGlvbiBtdXN0IHJldHVybiBhIFN0cmluZyFgKTtcbiAgICAgICAgfVxuICAgICAgICBzcCA9IHNwLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgICAgIHJldHVybiBub2RlUGF0aC5ub3JtYWxpemUoc3ApO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbi5zdG9yYWdlUGF0aF0gU2V0IHRvOicsIHRoaXMuc3RvcmFnZVBhdGgoe30pKTtcblxuICAgIGZzLm1rZGlycyh0aGlzLnN0b3JhZ2VQYXRoKHt9KSwgeyBtb2RlOiB0aGlzLnBhcmVudERpclBlcm1pc3Npb25zIH0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAxLCBgW0ZpbGVzQ29sbGVjdGlvbi4ke3NlbGYuY29sbGVjdGlvbk5hbWV9XSBQYXRoIFxcXCIke3RoaXMuc3RvcmFnZVBhdGgoe30pfVxcXCIgaXMgbm90IHdyaXRhYmxlIWAsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNoZWNrKHRoaXMuc3RyaWN0LCBCb29sZWFuKTtcbiAgICBjaGVjayh0aGlzLnBlcm1pc3Npb25zLCBOdW1iZXIpO1xuICAgIGNoZWNrKHRoaXMuc3RvcmFnZVBhdGgsIEZ1bmN0aW9uKTtcbiAgICBjaGVjayh0aGlzLmNhY2hlQ29udHJvbCwgU3RyaW5nKTtcbiAgICBjaGVjayh0aGlzLm9uQWZ0ZXJSZW1vdmUsIE1hdGNoLk9uZU9mKGZhbHNlLCBGdW5jdGlvbikpO1xuICAgIGNoZWNrKHRoaXMub25BZnRlclVwbG9hZCwgTWF0Y2guT25lT2YoZmFsc2UsIEZ1bmN0aW9uKSk7XG4gICAgY2hlY2sodGhpcy5kaXNhYmxlVXBsb2FkLCBCb29sZWFuKTtcbiAgICBjaGVjayh0aGlzLmludGVncml0eUNoZWNrLCBCb29sZWFuKTtcbiAgICBjaGVjayh0aGlzLm9uQmVmb3JlUmVtb3ZlLCBNYXRjaC5PbmVPZihmYWxzZSwgRnVuY3Rpb24pKTtcbiAgICBjaGVjayh0aGlzLmRpc2FibGVEb3dubG9hZCwgQm9vbGVhbik7XG4gICAgY2hlY2sodGhpcy5kb3dubG9hZENhbGxiYWNrLCBNYXRjaC5PbmVPZihmYWxzZSwgRnVuY3Rpb24pKTtcbiAgICBjaGVjayh0aGlzLmludGVyY2VwdERvd25sb2FkLCBNYXRjaC5PbmVPZihmYWxzZSwgRnVuY3Rpb24pKTtcbiAgICBjaGVjayh0aGlzLmNvbnRpbnVlVXBsb2FkVFRMLCBOdW1iZXIpO1xuICAgIGNoZWNrKHRoaXMucmVzcG9uc2VIZWFkZXJzLCBNYXRjaC5PbmVPZihPYmplY3QsIEZ1bmN0aW9uKSk7XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZVVwbG9hZCkge1xuICAgICAgdGhpcy5fcHJlQ29sbGVjdGlvbiA9IG5ldyBNb25nby5Db2xsZWN0aW9uKGBfX3ByZV8ke3RoaXMuY29sbGVjdGlvbk5hbWV9YCk7XG4gICAgICB0aGlzLl9wcmVDb2xsZWN0aW9uLl9lbnN1cmVJbmRleCh7Y3JlYXRlZEF0OiAxfSwge2V4cGlyZUFmdGVyU2Vjb25kczogdGhpcy5jb250aW51ZVVwbG9hZFRUTCwgYmFja2dyb3VuZDogdHJ1ZX0pO1xuICAgICAgY29uc3QgX3ByZUNvbGxlY3Rpb25DdXJzb3IgPSB0aGlzLl9wcmVDb2xsZWN0aW9uLmZpbmQoe30sIHtcbiAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgX2lkOiAxLFxuICAgICAgICAgIGlzRmluaXNoZWQ6IDFcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIF9wcmVDb2xsZWN0aW9uQ3Vyc29yLm9ic2VydmUoe1xuICAgICAgICBjaGFuZ2VkKGRvYykge1xuICAgICAgICAgIGlmIChkb2MuaXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgc2VsZi5fZGVidWcoYFtGaWxlc0NvbGxlY3Rpb25dIFtfcHJlQ29sbGVjdGlvbkN1cnNvci5vYnNlcnZlXSBbY2hhbmdlZF06ICR7ZG9jLl9pZH1gKTtcbiAgICAgICAgICAgIHNlbGYuX3ByZUNvbGxlY3Rpb24ucmVtb3ZlKHtfaWQ6IGRvYy5faWR9LCBOT09QKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZWQoZG9jKSB7XG4gICAgICAgICAgLy8gRnJlZSBtZW1vcnkgYWZ0ZXIgdXBsb2FkIGlzIGRvbmVcbiAgICAgICAgICAvLyBPciBpZiB1cGxvYWQgaXMgdW5maW5pc2hlZFxuICAgICAgICAgIHNlbGYuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbX3ByZUNvbGxlY3Rpb25DdXJzb3Iub2JzZXJ2ZV0gW3JlbW92ZWRdOiAke2RvYy5faWR9YCk7XG4gICAgICAgICAgaWYgKF8uaXNPYmplY3Qoc2VsZi5fY3VycmVudFVwbG9hZHNbZG9jLl9pZF0pKSB7XG4gICAgICAgICAgICBzZWxmLl9jdXJyZW50VXBsb2Fkc1tkb2MuX2lkXS5zdG9wKCk7XG4gICAgICAgICAgICBzZWxmLl9jdXJyZW50VXBsb2Fkc1tkb2MuX2lkXS5lbmQoKTtcblxuICAgICAgICAgICAgaWYgKCFkb2MuaXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgICBzZWxmLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW19wcmVDb2xsZWN0aW9uQ3Vyc29yLm9ic2VydmVdIFtyZW1vdmVVbmZpbmlzaGVkVXBsb2FkXTogJHtkb2MuX2lkfWApO1xuICAgICAgICAgICAgICBzZWxmLl9jdXJyZW50VXBsb2Fkc1tkb2MuX2lkXS5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgc2VsZi5fY3VycmVudFVwbG9hZHNbZG9jLl9pZF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fY3JlYXRlU3RyZWFtID0gKF9pZCwgcGF0aCwgb3B0cykgPT4ge1xuICAgICAgICB0aGlzLl9jdXJyZW50VXBsb2Fkc1tfaWRdID0gbmV3IFdyaXRlU3RyZWFtKHBhdGgsIG9wdHMuZmlsZUxlbmd0aCwgb3B0cywgdGhpcy5wZXJtaXNzaW9ucyk7XG4gICAgICB9O1xuXG4gICAgICAvLyBUaGlzIGxpdHRsZSBmdW5jdGlvbiBhbGxvd3MgdG8gY29udGludWUgdXBsb2FkXG4gICAgICAvLyBldmVuIGFmdGVyIHNlcnZlciBpcyByZXN0YXJ0ZWQgKCpub3Qgb24gZGV2LXN0YWdlKilcbiAgICAgIHRoaXMuX2NvbnRpbnVlVXBsb2FkID0gKF9pZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFVwbG9hZHNbX2lkXSAmJiB0aGlzLl9jdXJyZW50VXBsb2Fkc1tfaWRdLmZpbGUpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbnRVcGxvYWRzW19pZF0uYWJvcnRlZCAmJiAhdGhpcy5fY3VycmVudFVwbG9hZHNbX2lkXS5lbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRVcGxvYWRzW19pZF0uZmlsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY3JlYXRlU3RyZWFtKF9pZCwgdGhpcy5fY3VycmVudFVwbG9hZHNbX2lkXS5maWxlLmZpbGUucGF0aCwgdGhpcy5fY3VycmVudFVwbG9hZHNbX2lkXS5maWxlKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFVwbG9hZHNbX2lkXS5maWxlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRVcGxkID0gdGhpcy5fcHJlQ29sbGVjdGlvbi5maW5kT25lKHtfaWR9KTtcbiAgICAgICAgaWYgKGNvbnRVcGxkKSB7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlU3RyZWFtKF9pZCwgY29udFVwbGQuZmlsZS5wYXRoLCBjb250VXBsZCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRVcGxvYWRzW19pZF0uZmlsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5zY2hlbWEpIHtcbiAgICAgIHRoaXMuc2NoZW1hID0gRmlsZXNDb2xsZWN0aW9uQ29yZS5zY2hlbWE7XG4gICAgfVxuXG4gICAgY2hlY2sodGhpcy5kZWJ1ZywgQm9vbGVhbik7XG4gICAgY2hlY2sodGhpcy5zY2hlbWEsIE9iamVjdCk7XG4gICAgY2hlY2sodGhpcy5wdWJsaWMsIEJvb2xlYW4pO1xuICAgIGNoZWNrKHRoaXMucHJvdGVjdGVkLCBNYXRjaC5PbmVPZihCb29sZWFuLCBGdW5jdGlvbikpO1xuICAgIGNoZWNrKHRoaXMuY2h1bmtTaXplLCBOdW1iZXIpO1xuICAgIGNoZWNrKHRoaXMuZG93bmxvYWRSb3V0ZSwgU3RyaW5nKTtcbiAgICBjaGVjayh0aGlzLm5hbWluZ0Z1bmN0aW9uLCBNYXRjaC5PbmVPZihmYWxzZSwgRnVuY3Rpb24pKTtcbiAgICBjaGVjayh0aGlzLm9uQmVmb3JlVXBsb2FkLCBNYXRjaC5PbmVPZihmYWxzZSwgRnVuY3Rpb24pKTtcbiAgICBjaGVjayh0aGlzLm9uSW5pdGlhdGVVcGxvYWQsIE1hdGNoLk9uZU9mKGZhbHNlLCBGdW5jdGlvbikpO1xuICAgIGNoZWNrKHRoaXMuYWxsb3dDbGllbnRDb2RlLCBCb29sZWFuKTtcblxuICAgIGlmICh0aGlzLnB1YmxpYyAmJiB0aGlzLnByb3RlY3RlZCkge1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig1MDAsIGBbRmlsZXNDb2xsZWN0aW9uLiR7dGhpcy5jb2xsZWN0aW9uTmFtZX1dOiBGaWxlcyBjYW4gbm90IGJlIHB1YmxpYyBhbmQgcHJvdGVjdGVkIGF0IHRoZSBzYW1lIHRpbWUhYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hlY2tBY2Nlc3MgPSAoaHR0cCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJvdGVjdGVkKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGNvbnN0IHt1c2VyLCB1c2VySWR9ID0gdGhpcy5fZ2V0VXNlcihodHRwKTtcblxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMucHJvdGVjdGVkKSkge1xuICAgICAgICAgIGxldCBmaWxlUmVmO1xuICAgICAgICAgIGlmIChfLmlzT2JqZWN0KGh0dHAucGFyYW1zKSAmJiAgaHR0cC5wYXJhbXMuX2lkKSB7XG4gICAgICAgICAgICBmaWxlUmVmID0gdGhpcy5jb2xsZWN0aW9uLmZpbmRPbmUoaHR0cC5wYXJhbXMuX2lkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXN1bHQgPSBodHRwID8gdGhpcy5wcm90ZWN0ZWQuY2FsbChfLmV4dGVuZChodHRwLCB7dXNlciwgdXNlcklkfSksIChmaWxlUmVmIHx8IG51bGwpKSA6IHRoaXMucHJvdGVjdGVkLmNhbGwoe3VzZXIsIHVzZXJJZH0sIChmaWxlUmVmIHx8IG51bGwpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgPSAhIXVzZXJJZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoaHR0cCAmJiAocmVzdWx0ID09PSB0cnVlKSkgfHwgIWh0dHApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJjID0gXy5pc051bWJlcihyZXN1bHQpID8gcmVzdWx0IDogNDAxO1xuICAgICAgICB0aGlzLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbi5fY2hlY2tBY2Nlc3NdIFdBUk46IEFjY2VzcyBkZW5pZWQhJyk7XG4gICAgICAgIGlmIChodHRwKSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9ICdBY2Nlc3MgZGVuaWVkISc7XG4gICAgICAgICAgaWYgKCFodHRwLnJlc3BvbnNlLmhlYWRlcnNTZW50KSB7XG4gICAgICAgICAgICBodHRwLnJlc3BvbnNlLndyaXRlSGVhZChyYywge1xuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nLFxuICAgICAgICAgICAgICAnQ29udGVudC1MZW5ndGgnOiB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFodHRwLnJlc3BvbnNlLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICBodHRwLnJlc3BvbnNlLmVuZCh0ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdGhpcy5fbWV0aG9kTmFtZXMgPSB7XG4gICAgICBfQWJvcnQ6IGBfRmlsZXNDb2xsZWN0aW9uQWJvcnRfJHt0aGlzLmNvbGxlY3Rpb25OYW1lfWAsXG4gICAgICBfV3JpdGU6IGBfRmlsZXNDb2xsZWN0aW9uV3JpdGVfJHt0aGlzLmNvbGxlY3Rpb25OYW1lfWAsXG4gICAgICBfU3RhcnQ6IGBfRmlsZXNDb2xsZWN0aW9uU3RhcnRfJHt0aGlzLmNvbGxlY3Rpb25OYW1lfWAsXG4gICAgICBfUmVtb3ZlOiBgX0ZpbGVzQ29sbGVjdGlvblJlbW92ZV8ke3RoaXMuY29sbGVjdGlvbk5hbWV9YFxuICAgIH07XG5cbiAgICB0aGlzLm9uKCdfaGFuZGxlVXBsb2FkJywgdGhpcy5faGFuZGxlVXBsb2FkKTtcbiAgICB0aGlzLm9uKCdfZmluaXNoVXBsb2FkJywgdGhpcy5fZmluaXNoVXBsb2FkKTtcblxuICAgIGlmICghdGhpcy5kaXNhYmxlVXBsb2FkICYmICF0aGlzLmRpc2FibGVEb3dubG9hZCkge1xuICAgICAgV2ViQXBwLmNvbm5lY3RIYW5kbGVycy51c2UoKGh0dHBSZXEsIGh0dHBSZXNwLCBuZXh0KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlVXBsb2FkICYmICEhfmh0dHBSZXEuX3BhcnNlZFVybC5wYXRoLmluZGV4T2YoYCR7dGhpcy5kb3dubG9hZFJvdXRlfS8ke3RoaXMuY29sbGVjdGlvbk5hbWV9L19fdXBsb2FkYCkpIHtcbiAgICAgICAgICBpZiAoaHR0cFJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlRXJyb3IgPSAoX2Vycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBlcnJvciA9IF9lcnJvcjtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbRmlsZXNDb2xsZWN0aW9uXSBbVXBsb2FkXSBbSFRUUF0gRXhjZXB0aW9uOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgY29uc29sZS50cmFjZSgpO1xuXG4gICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgICAgICBodHRwUmVzcC53cml0ZUhlYWQoNTAwKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc09iamVjdChlcnJvcikgJiYgXy5pc0Z1bmN0aW9uKGVycm9yLnRvU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IgPSBlcnJvci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghXy5pc1N0cmluZyhlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yID0gJ1VuZXhwZWN0ZWQgZXJyb3IhJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodHRwUmVzcC5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvciB9KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCBib2R5ID0gJyc7XG4gICAgICAgICAgICBodHRwUmVxLm9uKCdkYXRhJywgKGRhdGEpID0+IGJvdW5kKCgpID0+IHtcbiAgICAgICAgICAgICAgYm9keSArPSBkYXRhO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBodHRwUmVxLm9uKCdlbmQnLCAoKSA9PiBib3VuZCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdHM7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBsZXQgdXNlcjtcblxuICAgICAgICAgICAgICAgIGlmIChodHRwUmVxLmhlYWRlcnNbJ3gtbXRvayddICYmIF8uaXNPYmplY3QoTWV0ZW9yLnNlcnZlci5zZXNzaW9ucykgJiYgXy5oYXMoTWV0ZW9yLnNlcnZlci5zZXNzaW9uc1todHRwUmVxLmhlYWRlcnNbJ3gtbXRvayddXSwgJ3VzZXJJZCcpKSB7XG4gICAgICAgICAgICAgICAgICB1c2VyID0ge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IE1ldGVvci5zZXJ2ZXIuc2Vzc2lvbnNbaHR0cFJlcS5oZWFkZXJzWyd4LW10b2snXV0udXNlcklkXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB1c2VyID0gdGhpcy5fZ2V0VXNlcih7cmVxdWVzdDogaHR0cFJlcSwgcmVzcG9uc2U6IGh0dHBSZXNwfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGh0dHBSZXEuaGVhZGVyc1sneC1zdGFydCddICE9PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVJZDogaHR0cFJlcS5oZWFkZXJzWyd4LWZpbGVpZCddXG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaHR0cFJlcS5oZWFkZXJzWyd4LWVvZiddID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5lb2YgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBCdWZmZXIuZnJvbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmJpbkRhdGEgPSBCdWZmZXIuZnJvbShib2R5LCAnYmFzZTY0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoYnVmZkVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5iaW5EYXRhID0gbmV3IEJ1ZmZlcihib2R5LCAnYmFzZTY0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIG9wdHMuYmluRGF0YSA9IG5ldyBCdWZmZXIoYm9keSwgJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuY2h1bmtJZCA9IHBhcnNlSW50KGh0dHBSZXEuaGVhZGVyc1sneC1jaHVua2lkJ10pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBjb25zdCBfY29udGludWVVcGxvYWQgPSB0aGlzLl9jb250aW51ZVVwbG9hZChvcHRzLmZpbGVJZCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIV9jb250aW51ZVVwbG9hZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwOCwgJ0NhblxcJ3QgY29udGludWUgdXBsb2FkLCBzZXNzaW9uIGV4cGlyZWQuIFN0YXJ0IHVwbG9hZCBhZ2Fpbi4nKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgKHtyZXN1bHQsIG9wdHN9ICA9IHRoaXMuX3ByZXBhcmVVcGxvYWQoXy5leHRlbmQob3B0cywgX2NvbnRpbnVlVXBsb2FkKSwgdXNlci51c2VySWQsICdIVFRQJykpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAob3B0cy5lb2YpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlVXBsb2FkKHJlc3VsdCwgb3B0cywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBSZXNwLndyaXRlSGVhZCgyMDApO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdC5maWxlKSAmJiByZXN1bHQuZmlsZS5tZXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZmlsZS5tZXRhID0gZml4SlNPTlN0cmluZ2lmeShyZXN1bHQuZmlsZS5tZXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIWh0dHBSZXNwLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwUmVzcC5lbmQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ19oYW5kbGVVcGxvYWQnLCByZXN1bHQsIG9wdHMsIE5PT1ApO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIWh0dHBSZXNwLmhlYWRlcnNTZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGh0dHBSZXNwLndyaXRlSGVhZCgyMDQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKCFodHRwUmVzcC5maW5pc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBodHRwUmVzcC5lbmQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cyA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChqc29uRXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NhblxcJ3QgcGFyc2UgaW5jb21pbmcgSlNPTiBmcm9tIENsaWVudCBvbiBbLmluc2VydCgpIHwgdXBsb2FkXSwgc29tZXRoaW5nIHdlbnQgd3JvbmchJywganNvbkVycik7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMgPSB7ZmlsZToge319O1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAoIV8uaXNPYmplY3Qob3B0cy5maWxlKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmZpbGUgPSB7fTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgb3B0cy5fX19zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbRmlsZSBTdGFydCBIVFRQXSAke29wdHMuZmlsZS5uYW1lIHx8ICdbbm8tbmFtZV0nfSAtICR7b3B0cy5maWxlSWR9YCk7XG4gICAgICAgICAgICAgICAgICBpZiAoXy5pc09iamVjdChvcHRzLmZpbGUpICYmIG9wdHMuZmlsZS5tZXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZmlsZS5tZXRhID0gZml4SlNPTlBhcnNlKG9wdHMuZmlsZS5tZXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgKHtyZXN1bHR9ID0gdGhpcy5fcHJlcGFyZVVwbG9hZChfLmNsb25lKG9wdHMpLCB1c2VyLnVzZXJJZCwgJ0hUVFAgU3RhcnQgTWV0aG9kJykpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2xsZWN0aW9uLmZpbmRPbmUocmVzdWx0Ll9pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICdDYW5cXCd0IHN0YXJ0IHVwbG9hZCwgZGF0YSBzdWJzdGl0dXRpb24gZGV0ZWN0ZWQhJyk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIG9wdHMuX2lkICAgICAgID0gb3B0cy5maWxlSWQ7XG4gICAgICAgICAgICAgICAgICBvcHRzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICBvcHRzLm1heExlbmd0aCA9IG9wdHMuZmlsZUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZUNvbGxlY3Rpb24uaW5zZXJ0KF8ub21pdChvcHRzLCAnX19fcycpKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVN0cmVhbShyZXN1bHQuX2lkLCByZXN1bHQucGF0aCwgXy5vbWl0KG9wdHMsICdfX19zJykpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAob3B0cy5yZXR1cm5NZXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBodHRwUmVzcC53cml0ZUhlYWQoMjAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBodHRwUmVzcC5lbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkUm91dGU6IGAke3RoaXMuZG93bmxvYWRSb3V0ZX0vJHt0aGlzLmNvbGxlY3Rpb25OYW1lfS9fX3VwbG9hZGAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBodHRwUmVzcC53cml0ZUhlYWQoMjA0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaHR0cFJlc3AuZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBodHRwUmVzcC5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoaHR0cFJlc3BFcnIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcihodHRwUmVzcEVycik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZURvd25sb2FkKSB7XG4gICAgICAgICAgbGV0IGh0dHA7XG4gICAgICAgICAgbGV0IHBhcmFtcztcbiAgICAgICAgICBsZXQgdXJpO1xuICAgICAgICAgIGxldCB1cmlzO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnB1YmxpYykge1xuICAgICAgICAgICAgaWYgKCEhfmh0dHBSZXEuX3BhcnNlZFVybC5wYXRoLmluZGV4T2YoYCR7dGhpcy5kb3dubG9hZFJvdXRlfS8ke3RoaXMuY29sbGVjdGlvbk5hbWV9YCkpIHtcbiAgICAgICAgICAgICAgdXJpID0gaHR0cFJlcS5fcGFyc2VkVXJsLnBhdGgucmVwbGFjZShgJHt0aGlzLmRvd25sb2FkUm91dGV9LyR7dGhpcy5jb2xsZWN0aW9uTmFtZX1gLCAnJyk7XG4gICAgICAgICAgICAgIGlmICh1cmkuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gdXJpLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHVyaXMgPSB1cmkuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgaWYgKHVyaXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgX2lkOiB1cmlzWzBdLFxuICAgICAgICAgICAgICAgICAgcXVlcnk6IGh0dHBSZXEuX3BhcnNlZFVybC5xdWVyeSA/IG5vZGVRcy5wYXJzZShodHRwUmVxLl9wYXJzZWRVcmwucXVlcnkpIDoge30sXG4gICAgICAgICAgICAgICAgICBuYW1lOiB1cmlzWzJdLnNwbGl0KCc/JylbMF0sXG4gICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1cmlzWzFdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGh0dHAgPSB7cmVxdWVzdDogaHR0cFJlcSwgcmVzcG9uc2U6IGh0dHBSZXNwLCBwYXJhbXN9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja0FjY2VzcyhodHRwKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZChodHRwLCB1cmlzWzFdLCB0aGlzLmNvbGxlY3Rpb24uZmluZE9uZSh1cmlzWzBdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoISF+aHR0cFJlcS5fcGFyc2VkVXJsLnBhdGguaW5kZXhPZihgJHt0aGlzLmRvd25sb2FkUm91dGV9YCkpIHtcbiAgICAgICAgICAgICAgdXJpID0gaHR0cFJlcS5fcGFyc2VkVXJsLnBhdGgucmVwbGFjZShgJHt0aGlzLmRvd25sb2FkUm91dGV9YCwgJycpO1xuICAgICAgICAgICAgICBpZiAodXJpLmluZGV4T2YoJy8nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHVyaSA9IHVyaS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB1cmlzICA9IHVyaS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICBsZXQgX2ZpbGUgPSB1cmlzW3VyaXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgIGlmIChfZmlsZSkge1xuICAgICAgICAgICAgICAgIGxldCB2ZXJzaW9uO1xuICAgICAgICAgICAgICAgIGlmICghIX5fZmlsZS5pbmRleE9mKCctJykpIHtcbiAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBfZmlsZS5zcGxpdCgnLScpWzBdO1xuICAgICAgICAgICAgICAgICAgX2ZpbGUgICA9IF9maWxlLnNwbGl0KCctJylbMV0uc3BsaXQoJz8nKVswXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9ICdvcmlnaW5hbCc7XG4gICAgICAgICAgICAgICAgICBfZmlsZSAgID0gX2ZpbGUuc3BsaXQoJz8nKVswXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICBxdWVyeTogaHR0cFJlcS5fcGFyc2VkVXJsLnF1ZXJ5ID8gbm9kZVFzLnBhcnNlKGh0dHBSZXEuX3BhcnNlZFVybC5xdWVyeSkgOiB7fSxcbiAgICAgICAgICAgICAgICAgIGZpbGU6IF9maWxlLFxuICAgICAgICAgICAgICAgICAgX2lkOiBfZmlsZS5zcGxpdCgnLicpWzBdLFxuICAgICAgICAgICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgICAgICAgICAgIG5hbWU6IF9maWxlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBodHRwID0ge3JlcXVlc3Q6IGh0dHBSZXEsIHJlc3BvbnNlOiBodHRwUmVzcCwgcGFyYW1zfTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkKGh0dHAsIHZlcnNpb24sIHRoaXMuY29sbGVjdGlvbi5maW5kT25lKHBhcmFtcy5faWQpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5kaXNhYmxlVXBsb2FkKSB7XG4gICAgICBjb25zdCBfbWV0aG9kcyA9IHt9O1xuXG4gICAgICAvLyBNZXRob2QgdXNlZCB0byByZW1vdmUgZmlsZVxuICAgICAgLy8gZnJvbSBDbGllbnQgc2lkZVxuICAgICAgX21ldGhvZHNbdGhpcy5fbWV0aG9kTmFtZXMuX1JlbW92ZV0gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgY2hlY2soc2VsZWN0b3IsIE1hdGNoLk9uZU9mKFN0cmluZywgT2JqZWN0KSk7XG4gICAgICAgIHNlbGYuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbVW5saW5rIE1ldGhvZF0gWy5yZW1vdmUoJHtzZWxlY3Rvcn0pXWApO1xuXG4gICAgICAgIGlmIChzZWxmLmFsbG93Q2xpZW50Q29kZSkge1xuICAgICAgICAgIGlmIChzZWxmLm9uQmVmb3JlUmVtb3ZlICYmIF8uaXNGdW5jdGlvbihzZWxmLm9uQmVmb3JlUmVtb3ZlKSkge1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gdGhpcy51c2VySWQ7XG4gICAgICAgICAgICBjb25zdCB1c2VyRnVuY3MgPSB7XG4gICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgIHVzZXIoKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1ldGVvci51c2Vycykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIE1ldGVvci51c2Vycy5maW5kT25lKHVzZXJJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYub25CZWZvcmVSZW1vdmUuY2FsbCh1c2VyRnVuY3MsIChzZWxmLmZpbmQoc2VsZWN0b3IpIHx8IG51bGwpKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgJ1tGaWxlc0NvbGxlY3Rpb25dIFtyZW1vdmVdIE5vdCBwZXJtaXR0ZWQhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gc2VsZi5maW5kKHNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoY3Vyc29yLmNvdW50KCkgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZShzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDQsICdDdXJzb3IgaXMgZW1wdHksIG5vIGZpbGVzIGlzIHJlbW92ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMSwgJ1tGaWxlc0NvbGxlY3Rpb25dIFtyZW1vdmVdIFJ1biBjb2RlIGZyb20gY2xpZW50IGlzIG5vdCBhbGxvd2VkIScpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG5cbiAgICAgIC8vIE1ldGhvZCB1c2VkIHRvIHJlY2VpdmUgXCJmaXJzdCBieXRlXCIgb2YgdXBsb2FkXG4gICAgICAvLyBhbmQgYWxsIGZpbGUncyBtZXRhLWRhdGEsIHNvXG4gICAgICAvLyBpdCB3b24ndCBiZSB0cmFuc2ZlcnJlZCB3aXRoIGV2ZXJ5IGNodW5rXG4gICAgICAvLyBCYXNpY2FsbHkgaXQgcHJlcGFyZXMgZXZlcnl0aGluZ1xuICAgICAgLy8gU28gdXNlciBjYW4gcGF1c2UvZGlzY29ubmVjdCBhbmRcbiAgICAgIC8vIGNvbnRpbnVlIHVwbG9hZCBsYXRlciwgZHVyaW5nIGBjb250aW51ZVVwbG9hZFRUTGBcbiAgICAgIF9tZXRob2RzW3RoaXMuX21ldGhvZE5hbWVzLl9TdGFydF0gPSBmdW5jdGlvbiAob3B0cywgcmV0dXJuTWV0YSkge1xuICAgICAgICBjaGVjayhvcHRzLCB7XG4gICAgICAgICAgZmlsZTogT2JqZWN0LFxuICAgICAgICAgIGZpbGVJZDogU3RyaW5nLFxuICAgICAgICAgIEZTTmFtZTogTWF0Y2guT3B0aW9uYWwoU3RyaW5nKSxcbiAgICAgICAgICBjaHVua1NpemU6IE51bWJlcixcbiAgICAgICAgICBmaWxlTGVuZ3RoOiBOdW1iZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hlY2socmV0dXJuTWV0YSwgTWF0Y2guT3B0aW9uYWwoQm9vbGVhbikpO1xuXG4gICAgICAgIHNlbGYuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbRmlsZSBTdGFydCBNZXRob2RdICR7b3B0cy5maWxlLm5hbWV9IC0gJHtvcHRzLmZpbGVJZH1gKTtcbiAgICAgICAgb3B0cy5fX19zID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyByZXN1bHQgfSA9IHNlbGYuX3ByZXBhcmVVcGxvYWQoXy5jbG9uZShvcHRzKSwgdGhpcy51c2VySWQsICdERFAgU3RhcnQgTWV0aG9kJyk7XG5cbiAgICAgICAgaWYgKHNlbGYuY29sbGVjdGlvbi5maW5kT25lKHJlc3VsdC5faWQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDAsICdDYW5cXCd0IHN0YXJ0IHVwbG9hZCwgZGF0YSBzdWJzdGl0dXRpb24gZGV0ZWN0ZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLl9pZCAgICAgICA9IG9wdHMuZmlsZUlkO1xuICAgICAgICBvcHRzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIG9wdHMubWF4TGVuZ3RoID0gb3B0cy5maWxlTGVuZ3RoO1xuICAgICAgICBzZWxmLl9wcmVDb2xsZWN0aW9uLmluc2VydChfLm9taXQob3B0cywgJ19fX3MnKSk7XG4gICAgICAgIHNlbGYuX2NyZWF0ZVN0cmVhbShyZXN1bHQuX2lkLCByZXN1bHQucGF0aCwgXy5vbWl0KG9wdHMsICdfX19zJykpO1xuXG4gICAgICAgIGlmIChyZXR1cm5NZXRhKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVwbG9hZFJvdXRlOiBgJHtzZWxmLmRvd25sb2FkUm91dGV9LyR7c2VsZi5jb2xsZWN0aW9uTmFtZX0vX191cGxvYWRgLFxuICAgICAgICAgICAgZmlsZTogcmVzdWx0XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG5cblxuICAgICAgLy8gTWV0aG9kIHVzZWQgdG8gd3JpdGUgZmlsZSBjaHVua3NcbiAgICAgIC8vIGl0IHJlY2VpdmVzIHZlcnkgbGltaXRlZCBhbW91bnQgb2YgbWV0YS1kYXRhXG4gICAgICAvLyBUaGlzIG1ldGhvZCBhbHNvIHJlc3BvbnNpYmxlIGZvciBFT0ZcbiAgICAgIF9tZXRob2RzW3RoaXMuX21ldGhvZE5hbWVzLl9Xcml0ZV0gPSBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBjaGVjayhvcHRzLCB7XG4gICAgICAgICAgZW9mOiBNYXRjaC5PcHRpb25hbChCb29sZWFuKSxcbiAgICAgICAgICBmaWxlSWQ6IFN0cmluZyxcbiAgICAgICAgICBiaW5EYXRhOiBNYXRjaC5PcHRpb25hbChTdHJpbmcpLFxuICAgICAgICAgIGNodW5rSWQ6IE1hdGNoLk9wdGlvbmFsKE51bWJlcilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9wdHMuYmluRGF0YSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgQnVmZmVyLmZyb20gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG9wdHMuYmluRGF0YSA9IEJ1ZmZlci5mcm9tKG9wdHMuYmluRGF0YSwgJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoYnVmZkVycikge1xuICAgICAgICAgICAgICBvcHRzLmJpbkRhdGEgPSBuZXcgQnVmZmVyKG9wdHMuYmluRGF0YSwgJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzLmJpbkRhdGEgPSBuZXcgQnVmZmVyKG9wdHMuYmluRGF0YSwgJ2Jhc2U2NCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9jb250aW51ZVVwbG9hZCA9IHNlbGYuX2NvbnRpbnVlVXBsb2FkKG9wdHMuZmlsZUlkKTtcbiAgICAgICAgaWYgKCFfY29udGludWVVcGxvYWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwOCwgJ0NhblxcJ3QgY29udGludWUgdXBsb2FkLCBzZXNzaW9uIGV4cGlyZWQuIFN0YXJ0IHVwbG9hZCBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgICAoe3Jlc3VsdCwgb3B0c30gPSBzZWxmLl9wcmVwYXJlVXBsb2FkKF8uZXh0ZW5kKG9wdHMsIF9jb250aW51ZVVwbG9hZCksIHRoaXMudXNlcklkLCAnRERQJykpO1xuXG4gICAgICAgIGlmIChvcHRzLmVvZikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gTWV0ZW9yLndyYXBBc3luYyhzZWxmLl9oYW5kbGVVcGxvYWQuYmluZChzZWxmLCByZXN1bHQsIG9wdHMpKSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGhhbmRsZVVwbG9hZEVycikge1xuICAgICAgICAgICAgc2VsZi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtXcml0ZSBNZXRob2RdIFtERFBdIEV4Y2VwdGlvbjonLCBoYW5kbGVVcGxvYWRFcnIpO1xuICAgICAgICAgICAgdGhyb3cgaGFuZGxlVXBsb2FkRXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLmVtaXQoJ19oYW5kbGVVcGxvYWQnLCByZXN1bHQsIG9wdHMsIE5PT1ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcblxuICAgICAgLy8gTWV0aG9kIHVzZWQgdG8gQWJvcnQgdXBsb2FkXG4gICAgICAvLyAtIEZlZWluZyBtZW1vcnkgYnkgLmVuZCgpaW5nIHdyaXRhYmxlU3RyZWFtc1xuICAgICAgLy8gLSBSZW1vdmluZyB0ZW1wb3JhcnkgcmVjb3JkIGZyb20gQF9wcmVDb2xsZWN0aW9uXG4gICAgICAvLyAtIFJlbW92aW5nIHJlY29yZCBmcm9tIEBjb2xsZWN0aW9uXG4gICAgICAvLyAtIC51bmxpbmsoKWluZyBjaHVua3MgZnJvbSBGU1xuICAgICAgX21ldGhvZHNbdGhpcy5fbWV0aG9kTmFtZXMuX0Fib3J0XSA9IGZ1bmN0aW9uIChfaWQpIHtcbiAgICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IF9jb250aW51ZVVwbG9hZCA9IHNlbGYuX2NvbnRpbnVlVXBsb2FkKF9pZCk7XG4gICAgICAgIHNlbGYuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbQWJvcnQgTWV0aG9kXTogJHtfaWR9IC0gJHsoXy5pc09iamVjdChfY29udGludWVVcGxvYWQuZmlsZSkgPyBfY29udGludWVVcGxvYWQuZmlsZS5wYXRoIDogJycpfWApO1xuXG4gICAgICAgIGlmIChzZWxmLl9jdXJyZW50VXBsb2FkcyAmJiBzZWxmLl9jdXJyZW50VXBsb2Fkc1tfaWRdKSB7XG4gICAgICAgICAgc2VsZi5fY3VycmVudFVwbG9hZHNbX2lkXS5zdG9wKCk7XG4gICAgICAgICAgc2VsZi5fY3VycmVudFVwbG9hZHNbX2lkXS5hYm9ydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9jb250aW51ZVVwbG9hZCkge1xuICAgICAgICAgIHNlbGYuX3ByZUNvbGxlY3Rpb24ucmVtb3ZlKHtfaWR9KTtcbiAgICAgICAgICBzZWxmLnJlbW92ZSh7X2lkfSk7XG4gICAgICAgICAgaWYgKF8uaXNPYmplY3QoX2NvbnRpbnVlVXBsb2FkLmZpbGUpICYmIF9jb250aW51ZVVwbG9hZC5maWxlLnBhdGgpIHtcbiAgICAgICAgICAgIHNlbGYudW5saW5rKHtfaWQsIHBhdGg6IF9jb250aW51ZVVwbG9hZC5maWxlLnBhdGh9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICBNZXRlb3IubWV0aG9kcyhfbWV0aG9kcyk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIF9wcmVwYXJlVXBsb2FkXG4gICAqIEBzdW1tYXJ5IEludGVybmFsIG1ldGhvZC4gVXNlZCB0byBvcHRpbWl6ZSByZWNlaXZlZCBkYXRhIGFuZCBjaGVjayB1cGxvYWQgcGVybWlzc2lvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgX3ByZXBhcmVVcGxvYWQob3B0cyA9IHt9LCB1c2VySWQsIHRyYW5zcG9ydCkge1xuICAgIGxldCBjdHg7XG4gICAgaWYgKCFfLmlzQm9vbGVhbihvcHRzLmVvZikpIHtcbiAgICAgIG9wdHMuZW9mID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLmJpbkRhdGEpIHtcbiAgICAgIG9wdHMuYmluRGF0YSA9ICdFT0YnO1xuICAgIH1cblxuICAgIGlmICghXy5pc051bWJlcihvcHRzLmNodW5rSWQpKSB7XG4gICAgICBvcHRzLmNodW5rSWQgPSAtMTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNTdHJpbmcob3B0cy5GU05hbWUpKSB7XG4gICAgICBvcHRzLkZTTmFtZSA9IG9wdHMuZmlsZUlkO1xuICAgIH1cblxuICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbVXBsb2FkXSBbJHt0cmFuc3BvcnR9XSBHb3QgIyR7b3B0cy5jaHVua0lkfS8ke29wdHMuZmlsZUxlbmd0aH0gY2h1bmtzLCBkc3Q6ICR7b3B0cy5maWxlLm5hbWUgfHwgb3B0cy5maWxlLmZpbGVOYW1lfWApO1xuXG4gICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLl9nZXRGaWxlTmFtZShvcHRzLmZpbGUpO1xuICAgIGNvbnN0IHtleHRlbnNpb24sIGV4dGVuc2lvbldpdGhEb3R9ID0gdGhpcy5fZ2V0RXh0KGZpbGVOYW1lKTtcblxuICAgIGlmICghXy5pc09iamVjdChvcHRzLmZpbGUubWV0YSkpIHtcbiAgICAgIG9wdHMuZmlsZS5tZXRhID0ge307XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCAgICAgICA9IG9wdHMuZmlsZTtcbiAgICByZXN1bHQubmFtZSAgICAgID0gZmlsZU5hbWU7XG4gICAgcmVzdWx0Lm1ldGEgICAgICA9IG9wdHMuZmlsZS5tZXRhO1xuICAgIHJlc3VsdC5leHRlbnNpb24gPSBleHRlbnNpb247XG4gICAgcmVzdWx0LmV4dCAgICAgICA9IGV4dGVuc2lvbjtcbiAgICByZXN1bHQuX2lkICAgICAgID0gb3B0cy5maWxlSWQ7XG4gICAgcmVzdWx0LnVzZXJJZCAgICA9IHVzZXJJZCB8fCBudWxsO1xuICAgIG9wdHMuRlNOYW1lICAgICAgPSBvcHRzLkZTTmFtZS5yZXBsYWNlKC8oW15hLXowLTlcXC1cXF9dKykvZ2ksICctJyk7XG4gICAgcmVzdWx0LnBhdGggICAgICA9IGAke3RoaXMuc3RvcmFnZVBhdGgocmVzdWx0KX0ke25vZGVQYXRoLnNlcH0ke29wdHMuRlNOYW1lfSR7ZXh0ZW5zaW9uV2l0aERvdH1gO1xuICAgIHJlc3VsdCAgICAgICAgICAgPSBfLmV4dGVuZChyZXN1bHQsIHRoaXMuX2RhdGFUb1NjaGVtYShyZXN1bHQpKTtcblxuICAgIGlmICh0aGlzLm9uQmVmb3JlVXBsb2FkICYmIF8uaXNGdW5jdGlvbih0aGlzLm9uQmVmb3JlVXBsb2FkKSkge1xuICAgICAgY3R4ID0gXy5leHRlbmQoe1xuICAgICAgICBmaWxlOiBvcHRzLmZpbGVcbiAgICAgIH0sIHtcbiAgICAgICAgY2h1bmtJZDogb3B0cy5jaHVua0lkLFxuICAgICAgICB1c2VySWQ6IHJlc3VsdC51c2VySWQsXG4gICAgICAgIHVzZXIoKSB7XG4gICAgICAgICAgaWYgKE1ldGVvci51c2VycyAmJiByZXN1bHQudXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmRPbmUocmVzdWx0LnVzZXJJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBlb2Y6IG9wdHMuZW9mXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGlzVXBsb2FkQWxsb3dlZCA9IHRoaXMub25CZWZvcmVVcGxvYWQuY2FsbChjdHgsIHJlc3VsdCk7XG5cbiAgICAgIGlmIChpc1VwbG9hZEFsbG93ZWQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIF8uaXNTdHJpbmcoaXNVcGxvYWRBbGxvd2VkKSA/IGlzVXBsb2FkQWxsb3dlZCA6ICdAb25CZWZvcmVVcGxvYWQoKSByZXR1cm5lZCBmYWxzZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChvcHRzLl9fX3MgPT09IHRydWUpICYmIHRoaXMub25Jbml0aWF0ZVVwbG9hZCAmJiBfLmlzRnVuY3Rpb24odGhpcy5vbkluaXRpYXRlVXBsb2FkKSkge1xuICAgICAgICAgIHRoaXMub25Jbml0aWF0ZVVwbG9hZC5jYWxsKGN0eCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKG9wdHMuX19fcyA9PT0gdHJ1ZSkgJiYgdGhpcy5vbkluaXRpYXRlVXBsb2FkICYmIF8uaXNGdW5jdGlvbih0aGlzLm9uSW5pdGlhdGVVcGxvYWQpKSB7XG4gICAgICBjdHggPSBfLmV4dGVuZCh7XG4gICAgICAgIGZpbGU6IG9wdHMuZmlsZVxuICAgICAgfSwge1xuICAgICAgICBjaHVua0lkOiBvcHRzLmNodW5rSWQsXG4gICAgICAgIHVzZXJJZDogcmVzdWx0LnVzZXJJZCxcbiAgICAgICAgdXNlcigpIHtcbiAgICAgICAgICBpZiAoTWV0ZW9yLnVzZXJzICYmIHJlc3VsdC51c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybiBNZXRlb3IudXNlcnMuZmluZE9uZShyZXN1bHQudXNlcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGVvZjogb3B0cy5lb2ZcbiAgICAgIH0pO1xuICAgICAgdGhpcy5vbkluaXRpYXRlVXBsb2FkLmNhbGwoY3R4LCByZXN1bHQpO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVzdWx0LCBvcHRzfTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSBfZmluaXNoVXBsb2FkXG4gICAqIEBzdW1tYXJ5IEludGVybmFsIG1ldGhvZC4gRmluaXNoIHVwbG9hZCwgY2xvc2UgV3JpdGFibGUgc3RyZWFtLCBhZGQgcmVjb3JkIHRvIE1vbmdvREIgYW5kIGZsdXNoIHVzZWQgbWVtb3J5XG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBfZmluaXNoVXBsb2FkKHJlc3VsdCwgb3B0cywgY2IpIHtcbiAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW1VwbG9hZF0gW2ZpbmlzaChpbmcpVXBsb2FkXSAtPiAke3Jlc3VsdC5wYXRofWApO1xuICAgIGZzLmNobW9kKHJlc3VsdC5wYXRoLCB0aGlzLnBlcm1pc3Npb25zLCBOT09QKTtcbiAgICByZXN1bHQudHlwZSAgID0gdGhpcy5fZ2V0TWltZVR5cGUob3B0cy5maWxlKTtcbiAgICByZXN1bHQucHVibGljID0gdGhpcy5wdWJsaWM7XG4gICAgdGhpcy5fdXBkYXRlRmlsZVR5cGVzKHJlc3VsdCk7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24uaW5zZXJ0KF8uY2xvbmUocmVzdWx0KSwgKGVycm9yLCBfaWQpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYiAmJiBjYihlcnJvcik7XG4gICAgICAgIHRoaXMuX2RlYnVnKCdbRmlsZXNDb2xsZWN0aW9uXSBbVXBsb2FkXSBbX2ZpbmlzaFVwbG9hZF0gRXJyb3I6JywgZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcHJlQ29sbGVjdGlvbi51cGRhdGUoe19pZDogb3B0cy5maWxlSWR9LCB7JHNldDoge2lzRmluaXNoZWQ6IHRydWV9fSk7XG4gICAgICAgIHJlc3VsdC5faWQgPSBfaWQ7XG4gICAgICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbVXBsb2FkXSBbZmluaXNoKGVkKVVwbG9hZF0gLT4gJHtyZXN1bHQucGF0aH1gKTtcbiAgICAgICAgdGhpcy5vbkFmdGVyVXBsb2FkICYmIHRoaXMub25BZnRlclVwbG9hZC5jYWxsKHRoaXMsIHJlc3VsdCk7XG4gICAgICAgIHRoaXMuZW1pdCgnYWZ0ZXJVcGxvYWQnLCByZXN1bHQpO1xuICAgICAgICBjYiAmJiBjYihudWxsLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIF9oYW5kbGVVcGxvYWRcbiAgICogQHN1bW1hcnkgSW50ZXJuYWwgbWV0aG9kIHRvIGhhbmRsZSB1cGxvYWQgcHJvY2VzcywgcGlwZSBpbmNvbWluZyBkYXRhIHRvIFdyaXRhYmxlIHN0cmVhbVxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgX2hhbmRsZVVwbG9hZChyZXN1bHQsIG9wdHMsIGNiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChvcHRzLmVvZikge1xuICAgICAgICB0aGlzLl9jdXJyZW50VXBsb2Fkc1tyZXN1bHQuX2lkXS5lbmQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdCgnX2ZpbmlzaFVwbG9hZCcsIHJlc3VsdCwgb3B0cywgY2IpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRVcGxvYWRzW3Jlc3VsdC5faWRdLndyaXRlKG9wdHMuY2h1bmtJZCwgb3B0cy5iaW5EYXRhLCBjYik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fZGVidWcoJ1tfaGFuZGxlVXBsb2FkXSBbRVhDRVBUSU9OOl0nLCBlKTtcbiAgICAgIGNiICYmIGNiKGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIF9nZXRNaW1lVHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZmlsZURhdGEgLSBGaWxlIE9iamVjdFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIGZpbGUncyBtaW1lLXR5cGVcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIF9nZXRNaW1lVHlwZShmaWxlRGF0YSkge1xuICAgIGxldCBtaW1lO1xuICAgIGNoZWNrKGZpbGVEYXRhLCBPYmplY3QpO1xuICAgIGlmIChfLmlzT2JqZWN0KGZpbGVEYXRhKSAmJiBmaWxlRGF0YS50eXBlKSB7XG4gICAgICBtaW1lID0gZmlsZURhdGEudHlwZTtcbiAgICB9XG5cbiAgICBpZiAoZmlsZURhdGEucGF0aCAmJiAoIW1pbWUgfHwgIV8uaXNTdHJpbmcobWltZSkpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgYnVmICAgPSBuZXcgQnVmZmVyKDI2Mik7XG4gICAgICAgIGNvbnN0IGZkICA9IGZzLm9wZW5TeW5jKGZpbGVEYXRhLnBhdGgsICdyJyk7XG4gICAgICAgIGNvbnN0IGJyICA9IGZzLnJlYWRTeW5jKGZkLCBidWYsIDAsIDI2MiwgMCk7XG4gICAgICAgIGZzLmNsb3NlKGZkLCBOT09QKTtcbiAgICAgICAgaWYgKGJyIDwgMjYyKSB7XG4gICAgICAgICAgYnVmID0gYnVmLnNsaWNlKDAsIGJyKTtcbiAgICAgICAgfVxuICAgICAgICAoe21pbWV9ID0gZmlsZVR5cGUoYnVmKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIFdlJ3JlIGdvb2RcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW1pbWUgfHwgIV8uaXNTdHJpbmcobWltZSkpIHtcbiAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgICB9XG4gICAgcmV0dXJuIG1pbWU7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSBfZ2V0VXNlclxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIG9iamVjdCB3aXRoIGB1c2VySWRgIGFuZCBgdXNlcigpYCBtZXRob2Qgd2hpY2ggcmV0dXJuIHVzZXIncyBvYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIF9nZXRVc2VyKGh0dHApIHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICB1c2VyKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHVzZXJJZDogbnVsbFxuICAgIH07XG5cbiAgICBpZiAoaHR0cCkge1xuICAgICAgbGV0IG10b2sgPSBudWxsO1xuICAgICAgaWYgKGh0dHAucmVxdWVzdC5oZWFkZXJzWyd4LW10b2snXSkge1xuICAgICAgICBtdG9rID0gaHR0cC5yZXF1ZXN0LmhlYWRlcnNbJ3gtbXRvayddO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29va2llID0gaHR0cC5yZXF1ZXN0LkNvb2tpZXM7XG4gICAgICAgIGlmIChjb29raWUuaGFzKCd4X210b2snKSkge1xuICAgICAgICAgIG10b2sgPSBjb29raWUuZ2V0KCd4X210b2snKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobXRvaykge1xuICAgICAgICBjb25zdCB1c2VySWQgPSAoXy5pc09iamVjdChNZXRlb3Iuc2VydmVyLnNlc3Npb25zKSAmJiBfLmlzT2JqZWN0KE1ldGVvci5zZXJ2ZXIuc2Vzc2lvbnNbbXRva10pKSA/IE1ldGVvci5zZXJ2ZXIuc2Vzc2lvbnNbbXRva10udXNlcklkIDogdm9pZCAwO1xuXG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICByZXN1bHQudXNlciAgID0gKCkgPT4gTWV0ZW9yLnVzZXJzLmZpbmRPbmUodXNlcklkKTtcbiAgICAgICAgICByZXN1bHQudXNlcklkID0gdXNlcklkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSB3cml0ZVxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIC0gQmluYXJ5IEZpbGUncyBCdWZmZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBPYmplY3Qgd2l0aCBmaWxlLWRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMubmFtZSAtIEZpbGUgbmFtZSwgYWxpYXM6IGBmaWxlTmFtZWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMudHlwZSAtIEZpbGUgbWltZS10eXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLm1ldGEgLSBGaWxlIGFkZGl0aW9uYWwgbWV0YS1kYXRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnVzZXJJZCAtIFVzZXJJZCwgZGVmYXVsdCAqbnVsbCpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuZmlsZUlkIC0gX2lkLCBkZWZhdWx0ICpudWxsKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uKGVycm9yLCBmaWxlT2JqKXsuLi59XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJvY2VlZEFmdGVyVXBsb2FkIC0gUHJvY2VlZCBvbkFmdGVyVXBsb2FkIGhvb2tcbiAgICogQHN1bW1hcnkgV3JpdGUgYnVmZmVyIHRvIEZTIGFuZCBhZGQgdG8gRmlsZXNDb2xsZWN0aW9uIENvbGxlY3Rpb25cbiAgICogQHJldHVybnMge0ZpbGVzQ29sbGVjdGlvbn0gSW5zdGFuY2VcbiAgICovXG4gIHdyaXRlKGJ1ZmZlciwgb3B0cyA9IHt9LCBjYWxsYmFjaywgcHJvY2VlZEFmdGVyVXBsb2FkKSB7XG4gICAgdGhpcy5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFt3cml0ZSgpXScpO1xuXG4gICAgaWYgKF8uaXNGdW5jdGlvbihvcHRzKSkge1xuICAgICAgcHJvY2VlZEFmdGVyVXBsb2FkID0gY2FsbGJhY2s7XG4gICAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgICBvcHRzICAgICA9IHt9O1xuICAgIH0gZWxzZSBpZiAoXy5pc0Jvb2xlYW4oY2FsbGJhY2spKSB7XG4gICAgICBwcm9jZWVkQWZ0ZXJVcGxvYWQgPSBjYWxsYmFjaztcbiAgICB9IGVsc2UgaWYgKF8uaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgICBwcm9jZWVkQWZ0ZXJVcGxvYWQgPSBvcHRzO1xuICAgIH1cblxuICAgIGNoZWNrKG9wdHMsIE1hdGNoLk9wdGlvbmFsKE9iamVjdCkpO1xuICAgIGNoZWNrKGNhbGxiYWNrLCBNYXRjaC5PcHRpb25hbChGdW5jdGlvbikpO1xuICAgIGNoZWNrKHByb2NlZWRBZnRlclVwbG9hZCwgTWF0Y2guT3B0aW9uYWwoQm9vbGVhbikpO1xuXG4gICAgY29uc3QgZmlsZUlkICAgPSBvcHRzLmZpbGVJZCB8fCBSYW5kb20uaWQoKTtcbiAgICBjb25zdCBGU05hbWUgICA9IHRoaXMubmFtaW5nRnVuY3Rpb24gPyB0aGlzLm5hbWluZ0Z1bmN0aW9uKG9wdHMpIDogZmlsZUlkO1xuICAgIGNvbnN0IGZpbGVOYW1lID0gKG9wdHMubmFtZSB8fCBvcHRzLmZpbGVOYW1lKSA/IChvcHRzLm5hbWUgfHwgb3B0cy5maWxlTmFtZSkgOiBGU05hbWU7XG5cbiAgICBjb25zdCB7ZXh0ZW5zaW9uLCBleHRlbnNpb25XaXRoRG90fSA9IHRoaXMuX2dldEV4dChmaWxlTmFtZSk7XG5cbiAgICBvcHRzLnBhdGggPSBgJHt0aGlzLnN0b3JhZ2VQYXRoKG9wdHMpfSR7bm9kZVBhdGguc2VwfSR7RlNOYW1lfSR7ZXh0ZW5zaW9uV2l0aERvdH1gO1xuICAgIG9wdHMudHlwZSA9IHRoaXMuX2dldE1pbWVUeXBlKG9wdHMpO1xuICAgIGlmICghXy5pc09iamVjdChvcHRzLm1ldGEpKSB7XG4gICAgICBvcHRzLm1ldGEgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNOdW1iZXIob3B0cy5zaXplKSkge1xuICAgICAgb3B0cy5zaXplID0gYnVmZmVyLmxlbmd0aDtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9kYXRhVG9TY2hlbWEoe1xuICAgICAgbmFtZTogZmlsZU5hbWUsXG4gICAgICBwYXRoOiBvcHRzLnBhdGgsXG4gICAgICBtZXRhOiBvcHRzLm1ldGEsXG4gICAgICB0eXBlOiBvcHRzLnR5cGUsXG4gICAgICBzaXplOiBvcHRzLnNpemUsXG4gICAgICB1c2VySWQ6IG9wdHMudXNlcklkLFxuICAgICAgZXh0ZW5zaW9uXG4gICAgfSk7XG5cbiAgICByZXN1bHQuX2lkID0gZmlsZUlkO1xuXG4gICAgY29uc3Qgc3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ob3B0cy5wYXRoLCB7ZmxhZ3M6ICd3JywgbW9kZTogdGhpcy5wZXJtaXNzaW9uc30pO1xuICAgIHN0cmVhbS5lbmQoYnVmZmVyLCAoc3RyZWFtRXJyKSA9PiBib3VuZCgoKSA9PiB7XG4gICAgICBpZiAoc3RyZWFtRXJyKSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHN0cmVhbUVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uaW5zZXJ0KHJlc3VsdCwgKGluc2VydEVyciwgX2lkKSA9PiB7XG4gICAgICAgICAgaWYgKGluc2VydEVycikge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soaW5zZXJ0RXJyKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbd3JpdGVdIFtpbnNlcnRdIEVycm9yOiAke2ZpbGVOYW1lfSAtPiAke3RoaXMuY29sbGVjdGlvbk5hbWV9YCwgaW5zZXJ0RXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmlsZVJlZiA9IHRoaXMuY29sbGVjdGlvbi5maW5kT25lKF9pZCk7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBmaWxlUmVmKTtcbiAgICAgICAgICAgIGlmIChwcm9jZWVkQWZ0ZXJVcGxvYWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkFmdGVyVXBsb2FkICYmIHRoaXMub25BZnRlclVwbG9hZC5jYWxsKHRoaXMsIGZpbGVSZWYpO1xuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2FmdGVyVXBsb2FkJywgZmlsZVJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW3dyaXRlXTogJHtmaWxlTmFtZX0gLT4gJHt0aGlzLmNvbGxlY3Rpb25OYW1lfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIGxvYWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFVSTCB0byBmaWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gT2JqZWN0IHdpdGggZmlsZS1kYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLmhlYWRlcnMgLSBIVFRQIGhlYWRlcnMgdG8gdXNlIHdoZW4gcmVxdWVzdGluZyB0aGUgZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5uYW1lIC0gRmlsZSBuYW1lLCBhbGlhczogYGZpbGVOYW1lYFxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy50eXBlIC0gRmlsZSBtaW1lLXR5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMubWV0YSAtIEZpbGUgYWRkaXRpb25hbCBtZXRhLWRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMudXNlcklkIC0gVXNlcklkLCBkZWZhdWx0ICpudWxsKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5maWxlSWQgLSBfaWQsIGRlZmF1bHQgKm51bGwqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24oZXJyb3IsIGZpbGVPYmopey4uLn1cbiAgICogQHBhcmFtIHtCb29sZWFufSBwcm9jZWVkQWZ0ZXJVcGxvYWQgLSBQcm9jZWVkIG9uQWZ0ZXJVcGxvYWQgaG9va1xuICAgKiBAc3VtbWFyeSBEb3dubG9hZCBmaWxlLCB3cml0ZSBzdHJlYW0gdG8gRlMgYW5kIGFkZCB0byBGaWxlc0NvbGxlY3Rpb24gQ29sbGVjdGlvblxuICAgKiBAcmV0dXJucyB7RmlsZXNDb2xsZWN0aW9ufSBJbnN0YW5jZVxuICAgKi9cbiAgbG9hZCh1cmwsIG9wdHMgPSB7fSwgY2FsbGJhY2ssIHByb2NlZWRBZnRlclVwbG9hZCkge1xuICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbbG9hZCgke3VybH0sICR7SlNPTi5zdHJpbmdpZnkob3B0cyl9LCBjYWxsYmFjayldYCk7XG5cbiAgICBpZiAoXy5pc0Z1bmN0aW9uKG9wdHMpKSB7XG4gICAgICBwcm9jZWVkQWZ0ZXJVcGxvYWQgPSBjYWxsYmFjaztcbiAgICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICAgIG9wdHMgICAgID0ge307XG4gICAgfSBlbHNlIGlmIChfLmlzQm9vbGVhbihjYWxsYmFjaykpIHtcbiAgICAgIHByb2NlZWRBZnRlclVwbG9hZCA9IGNhbGxiYWNrO1xuICAgIH0gZWxzZSBpZiAoXy5pc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAgIHByb2NlZWRBZnRlclVwbG9hZCA9IG9wdHM7XG4gICAgfVxuXG4gICAgY2hlY2sodXJsLCBTdHJpbmcpO1xuICAgIGNoZWNrKG9wdHMsIE1hdGNoLk9wdGlvbmFsKE9iamVjdCkpO1xuICAgIGNoZWNrKGNhbGxiYWNrLCBNYXRjaC5PcHRpb25hbChGdW5jdGlvbikpO1xuICAgIGNoZWNrKHByb2NlZWRBZnRlclVwbG9hZCwgTWF0Y2guT3B0aW9uYWwoQm9vbGVhbikpO1xuXG4gICAgaWYgKCFfLmlzT2JqZWN0KG9wdHMpKSB7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZUlkICAgID0gb3B0cy5maWxlSWQgfHwgUmFuZG9tLmlkKCk7XG4gICAgY29uc3QgRlNOYW1lICAgID0gdGhpcy5uYW1pbmdGdW5jdGlvbiA/IHRoaXMubmFtaW5nRnVuY3Rpb24ob3B0cykgOiBmaWxlSWQ7XG4gICAgY29uc3QgcGF0aFBhcnRzID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgZmlsZU5hbWUgID0gKG9wdHMubmFtZSB8fCBvcHRzLmZpbGVOYW1lKSA/IChvcHRzLm5hbWUgfHwgb3B0cy5maWxlTmFtZSkgOiBwYXRoUGFydHNbcGF0aFBhcnRzLmxlbmd0aCAtIDFdIHx8IEZTTmFtZTtcblxuICAgIGNvbnN0IHtleHRlbnNpb24sIGV4dGVuc2lvbldpdGhEb3R9ID0gdGhpcy5fZ2V0RXh0KGZpbGVOYW1lKTtcbiAgICBvcHRzLnBhdGggID0gYCR7dGhpcy5zdG9yYWdlUGF0aChvcHRzKX0ke25vZGVQYXRoLnNlcH0ke0ZTTmFtZX0ke2V4dGVuc2lvbldpdGhEb3R9YDtcblxuICAgIGNvbnN0IHN0b3JlUmVzdWx0ID0gKHJlc3VsdCwgY2IpID0+IHtcbiAgICAgIHJlc3VsdC5faWQgPSBmaWxlSWQ7XG5cbiAgICAgIHRoaXMuY29sbGVjdGlvbi5pbnNlcnQocmVzdWx0LCAoZXJyb3IsIF9pZCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjYiAmJiBjYihlcnJvcik7XG4gICAgICAgICAgdGhpcy5fZGVidWcoYFtGaWxlc0NvbGxlY3Rpb25dIFtsb2FkXSBbaW5zZXJ0XSBFcnJvcjogJHtmaWxlTmFtZX0gLT4gJHt0aGlzLmNvbGxlY3Rpb25OYW1lfWAsIGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBmaWxlUmVmID0gdGhpcy5jb2xsZWN0aW9uLmZpbmRPbmUoX2lkKTtcbiAgICAgICAgICBjYiAmJiBjYihudWxsLCBmaWxlUmVmKTtcbiAgICAgICAgICBpZiAocHJvY2VlZEFmdGVyVXBsb2FkID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQWZ0ZXJVcGxvYWQgJiYgdGhpcy5vbkFmdGVyVXBsb2FkLmNhbGwodGhpcywgZmlsZVJlZik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2FmdGVyVXBsb2FkJywgZmlsZVJlZik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbbG9hZF0gW2luc2VydF0gJHtmaWxlTmFtZX0gLT4gJHt0aGlzLmNvbGxlY3Rpb25OYW1lfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmVxdWVzdC5nZXQoe1xuICAgICAgdXJsLFxuICAgICAgaGVhZGVyczogb3B0cy5oZWFkZXJzIHx8IHt9XG4gICAgfSkub24oJ2Vycm9yJywgKGVycm9yKSA9PiBib3VuZCgoKSA9PiB7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlcnJvcik7XG4gICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW2xvYWRdIFtyZXF1ZXN0LmdldCgke3VybH0pXSBFcnJvcjpgLCBlcnJvcik7XG4gICAgfSkpLm9uKCdyZXNwb25zZScsIChyZXNwb25zZSkgPT4gYm91bmQoKCkgPT4ge1xuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IGJvdW5kKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZGVidWcoYFtGaWxlc0NvbGxlY3Rpb25dIFtsb2FkXSBSZWNlaXZlZDogJHt1cmx9YCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RhdGFUb1NjaGVtYSh7XG4gICAgICAgICAgbmFtZTogZmlsZU5hbWUsXG4gICAgICAgICAgcGF0aDogb3B0cy5wYXRoLFxuICAgICAgICAgIG1ldGE6IG9wdHMubWV0YSxcbiAgICAgICAgICB0eXBlOiBvcHRzLnR5cGUgfHwgcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gfHwgdGhpcy5fZ2V0TWltZVR5cGUoe3BhdGg6IG9wdHMucGF0aH0pLFxuICAgICAgICAgIHNpemU6IG9wdHMuc2l6ZSB8fCBwYXJzZUludChyZXNwb25zZS5oZWFkZXJzWydjb250ZW50LWxlbmd0aCddIHx8IDApLFxuICAgICAgICAgIHVzZXJJZDogb3B0cy51c2VySWQsXG4gICAgICAgICAgZXh0ZW5zaW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcmVzdWx0LnNpemUpIHtcbiAgICAgICAgICBmcy5zdGF0KG9wdHMucGF0aCwgKGVycm9yLCBzdGF0cykgPT4gYm91bmQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdC52ZXJzaW9ucy5vcmlnaW5hbC5zaXplID0gKHJlc3VsdC5zaXplID0gc3RhdHMuc2l6ZSk7XG4gICAgICAgICAgICAgIHN0b3JlUmVzdWx0KHJlc3VsdCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdG9yZVJlc3VsdChyZXN1bHQsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0pKS5waXBlKGZzLmNyZWF0ZVdyaXRlU3RyZWFtKG9wdHMucGF0aCwge2ZsYWdzOiAndycsIG1vZGU6IHRoaXMucGVybWlzc2lvbnN9KSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSBhZGRGaWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoICAgICAgICAgIC0gUGF0aCB0byBmaWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzICAgICAgICAgIC0gW09wdGlvbmFsXSBPYmplY3Qgd2l0aCBmaWxlLWRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMudHlwZSAgICAgLSBbT3B0aW9uYWxdIEZpbGUgbWltZS10eXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLm1ldGEgICAgIC0gW09wdGlvbmFsXSBGaWxlIGFkZGl0aW9uYWwgbWV0YS1kYXRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmZpbGVJZCAgIC0gX2lkLCBkZWZhdWx0ICpudWxsKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cy5maWxlTmFtZSAtIFtPcHRpb25hbF0gRmlsZSBuYW1lLCBpZiBub3Qgc3BlY2lmaWVkIGZpbGUgbmFtZSBhbmQgZXh0ZW5zaW9uIHdpbGwgYmUgdGFrZW4gZnJvbSBwYXRoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnVzZXJJZCAgIC0gW09wdGlvbmFsXSBVc2VySWQsIGRlZmF1bHQgKm51bGwqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgIC0gW09wdGlvbmFsXSBmdW5jdGlvbihlcnJvciwgZmlsZU9iail7Li4ufVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByb2NlZWRBZnRlclVwbG9hZCAtIFByb2NlZWQgb25BZnRlclVwbG9hZCBob29rXG4gICAqIEBzdW1tYXJ5IEFkZCBmaWxlIGZyb20gRlMgdG8gRmlsZXNDb2xsZWN0aW9uXG4gICAqIEByZXR1cm5zIHtGaWxlc0NvbGxlY3Rpb259IEluc3RhbmNlXG4gICAqL1xuICBhZGRGaWxlKHBhdGgsIG9wdHMgPSB7fSwgY2FsbGJhY2ssIHByb2NlZWRBZnRlclVwbG9hZCkge1xuICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbYWRkRmlsZSgke3BhdGh9KV1gKTtcblxuICAgIGlmIChfLmlzRnVuY3Rpb24ob3B0cykpIHtcbiAgICAgIHByb2NlZWRBZnRlclVwbG9hZCA9IGNhbGxiYWNrO1xuICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgb3B0cyAgICAgPSB7fTtcbiAgICB9IGVsc2UgaWYgKF8uaXNCb29sZWFuKGNhbGxiYWNrKSkge1xuICAgICAgcHJvY2VlZEFmdGVyVXBsb2FkID0gY2FsbGJhY2s7XG4gICAgfSBlbHNlIGlmIChfLmlzQm9vbGVhbihvcHRzKSkge1xuICAgICAgcHJvY2VlZEFmdGVyVXBsb2FkID0gb3B0cztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wdWJsaWMpIHtcbiAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAzLCAnQ2FuIG5vdCBydW4gW2FkZEZpbGVdIG9uIHB1YmxpYyBjb2xsZWN0aW9uISBKdXN0IE1vdmUgZmlsZSB0byByb290IG9mIHlvdXIgc2VydmVyLCB0aGVuIGFkZCByZWNvcmQgdG8gQ29sbGVjdGlvbicpO1xuICAgIH1cblxuICAgIGNoZWNrKHBhdGgsIFN0cmluZyk7XG4gICAgY2hlY2sob3B0cywgTWF0Y2guT3B0aW9uYWwoT2JqZWN0KSk7XG4gICAgY2hlY2soY2FsbGJhY2ssIE1hdGNoLk9wdGlvbmFsKEZ1bmN0aW9uKSk7XG4gICAgY2hlY2socHJvY2VlZEFmdGVyVXBsb2FkLCBNYXRjaC5PcHRpb25hbChCb29sZWFuKSk7XG5cbiAgICBmcy5zdGF0KHBhdGgsIChzdGF0RXJyLCBzdGF0cykgPT4gYm91bmQoKCkgPT4ge1xuICAgICAgaWYgKHN0YXRFcnIpIHtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soc3RhdEVycik7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRzLmlzRmlsZSgpKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChvcHRzKSkge1xuICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBvcHRzLnBhdGggID0gcGF0aDtcblxuICAgICAgICBpZiAoIW9wdHMuZmlsZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KG5vZGVQYXRoLnNlcCk7XG4gICAgICAgICAgb3B0cy5maWxlTmFtZSAgID0gcGF0aC5zcGxpdChub2RlUGF0aC5zZXApW3BhdGhQYXJ0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtleHRlbnNpb259ID0gdGhpcy5fZ2V0RXh0KG9wdHMuZmlsZU5hbWUpO1xuXG4gICAgICAgIGlmICghXy5pc1N0cmluZyhvcHRzLnR5cGUpKSB7XG4gICAgICAgICAgb3B0cy50eXBlID0gdGhpcy5fZ2V0TWltZVR5cGUob3B0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV8uaXNPYmplY3Qob3B0cy5tZXRhKSkge1xuICAgICAgICAgIG9wdHMubWV0YSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfLmlzTnVtYmVyKG9wdHMuc2l6ZSkpIHtcbiAgICAgICAgICBvcHRzLnNpemUgPSBzdGF0cy5zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZGF0YVRvU2NoZW1hKHtcbiAgICAgICAgICBuYW1lOiBvcHRzLmZpbGVOYW1lLFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgbWV0YTogb3B0cy5tZXRhLFxuICAgICAgICAgIHR5cGU6IG9wdHMudHlwZSxcbiAgICAgICAgICBzaXplOiBvcHRzLnNpemUsXG4gICAgICAgICAgdXNlcklkOiBvcHRzLnVzZXJJZCxcbiAgICAgICAgICBleHRlbnNpb24sXG4gICAgICAgICAgX3N0b3JhZ2VQYXRoOiBwYXRoLnJlcGxhY2UoYCR7bm9kZVBhdGguc2VwfSR7b3B0cy5maWxlTmFtZX1gLCAnJyksXG4gICAgICAgICAgZmlsZUlkOiBvcHRzLmZpbGVJZCB8fCBudWxsXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmluc2VydChyZXN1bHQsIChpbnNlcnRFcnIsIF9pZCkgPT4ge1xuICAgICAgICAgIGlmIChpbnNlcnRFcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGluc2VydEVycik7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW2FkZEZpbGVdIFtpbnNlcnRdIEVycm9yOiAke3Jlc3VsdC5uYW1lfSAtPiAke3RoaXMuY29sbGVjdGlvbk5hbWV9YCwgaW5zZXJ0RXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmlsZVJlZiA9IHRoaXMuY29sbGVjdGlvbi5maW5kT25lKF9pZCk7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBmaWxlUmVmKTtcbiAgICAgICAgICAgIGlmIChwcm9jZWVkQWZ0ZXJVcGxvYWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkFmdGVyVXBsb2FkICYmIHRoaXMub25BZnRlclVwbG9hZC5jYWxsKHRoaXMsIGZpbGVSZWYpO1xuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2FmdGVyVXBsb2FkJywgZmlsZVJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW2FkZEZpbGVdOiAke3Jlc3VsdC5uYW1lfSAtPiAke3RoaXMuY29sbGVjdGlvbk5hbWV9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG5ldyBNZXRlb3IuRXJyb3IoNDAwLCBgW0ZpbGVzQ29sbGVjdGlvbl0gW2FkZEZpbGUoJHtwYXRofSldOiBGaWxlIGRvZXMgbm90IGV4aXN0YCkpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIHJlbW92ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHNlbGVjdG9yIC0gTW9uZ28tU3R5bGUgc2VsZWN0b3IgKGh0dHA6Ly9kb2NzLm1ldGVvci5jb20vYXBpL2NvbGxlY3Rpb25zLmh0bWwjc2VsZWN0b3JzKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIHdpdGggb25lIGBlcnJvcmAgYXJndW1lbnRcbiAgICogQHN1bW1hcnkgUmVtb3ZlIGRvY3VtZW50cyBmcm9tIHRoZSBjb2xsZWN0aW9uXG4gICAqIEByZXR1cm5zIHtGaWxlc0NvbGxlY3Rpb259IEluc3RhbmNlXG4gICAqL1xuICByZW1vdmUoc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZGVidWcoYFtGaWxlc0NvbGxlY3Rpb25dIFtyZW1vdmUoJHtKU09OLnN0cmluZ2lmeShzZWxlY3Rvcil9KV1gKTtcbiAgICBpZiAoc2VsZWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNoZWNrKGNhbGxiYWNrLCBNYXRjaC5PcHRpb25hbChGdW5jdGlvbikpO1xuXG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLmNvbGxlY3Rpb24uZmluZChzZWxlY3Rvcik7XG4gICAgaWYgKGZpbGVzLmNvdW50KCkgPiAwKSB7XG4gICAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIHRoaXMudW5saW5rKGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG5ldyBNZXRlb3IuRXJyb3IoNDA0LCAnQ3Vyc29yIGlzIGVtcHR5LCBubyBmaWxlcyBpcyByZW1vdmVkJykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub25BZnRlclJlbW92ZSkge1xuICAgICAgY29uc3QgZG9jcyA9IGZpbGVzLmZldGNoKCk7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuY29sbGVjdGlvbi5yZW1vdmUoc2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgc2VsZi5vbkFmdGVyUmVtb3ZlKGRvY3MpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbGVjdGlvbi5yZW1vdmUoc2VsZWN0b3IsIChjYWxsYmFjayB8fCBOT09QKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIGRlbnlcbiAgICogQHBhcmFtIHtPYmplY3R9IHJ1bGVzXG4gICAqIEBzZWUgIGh0dHBzOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI01vbmdvLUNvbGxlY3Rpb24tZGVueVxuICAgKiBAc3VtbWFyeSBsaW5rIE1vbmdvLkNvbGxlY3Rpb24gZGVueSBtZXRob2RzXG4gICAqIEByZXR1cm5zIHtNb25nby5Db2xsZWN0aW9ufSBJbnN0YW5jZVxuICAgKi9cbiAgZGVueShydWxlcykge1xuICAgIHRoaXMuY29sbGVjdGlvbi5kZW55KHJ1bGVzKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIGFsbG93XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlc1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI01vbmdvLUNvbGxlY3Rpb24tYWxsb3dcbiAgICogQHN1bW1hcnkgbGluayBNb25nby5Db2xsZWN0aW9uIGFsbG93IG1ldGhvZHNcbiAgICogQHJldHVybnMge01vbmdvLkNvbGxlY3Rpb259IEluc3RhbmNlXG4gICAqL1xuICBhbGxvdyhydWxlcykge1xuICAgIHRoaXMuY29sbGVjdGlvbi5hbGxvdyhydWxlcyk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbjtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSBkZW55Q2xpZW50XG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLm1ldGVvci5jb20vYXBpL2NvbGxlY3Rpb25zLmh0bWwjTW9uZ28tQ29sbGVjdGlvbi1kZW55XG4gICAqIEBzdW1tYXJ5IFNob3J0aGFuZHMgZm9yIE1vbmdvLkNvbGxlY3Rpb24gZGVueSBtZXRob2RcbiAgICogQHJldHVybnMge01vbmdvLkNvbGxlY3Rpb259IEluc3RhbmNlXG4gICAqL1xuICBkZW55Q2xpZW50KCkge1xuICAgIHRoaXMuY29sbGVjdGlvbi5kZW55KHtcbiAgICAgIGluc2VydCgpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICB1cGRhdGUoKSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgcmVtb3ZlKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb247XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgU2VydmVyXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25cbiAgICogQG5hbWUgYWxsb3dDbGllbnRcbiAgICogQHNlZSBodHRwczovL2RvY3MubWV0ZW9yLmNvbS9hcGkvY29sbGVjdGlvbnMuaHRtbCNNb25nby1Db2xsZWN0aW9uLWFsbG93XG4gICAqIEBzdW1tYXJ5IFNob3J0aGFuZHMgZm9yIE1vbmdvLkNvbGxlY3Rpb24gYWxsb3cgbWV0aG9kXG4gICAqIEByZXR1cm5zIHtNb25nby5Db2xsZWN0aW9ufSBJbnN0YW5jZVxuICAgKi9cbiAgYWxsb3dDbGllbnQoKSB7XG4gICAgdGhpcy5jb2xsZWN0aW9uLmFsbG93KHtcbiAgICAgIGluc2VydCgpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICB1cGRhdGUoKSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgcmVtb3ZlKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb247XG4gIH1cblxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSB1bmxpbmtcbiAgICogQHBhcmFtIHtPYmplY3R9IGZpbGVSZWYgLSBmaWxlT2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2ZXJzaW9uIC0gW09wdGlvbmFsXSBmaWxlJ3MgdmVyc2lvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFtPcHRpb25hbF0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHN1bW1hcnkgVW5saW5rIGZpbGVzIGFuZCBpdCdzIHZlcnNpb25zIGZyb20gRlNcbiAgICogQHJldHVybnMge0ZpbGVzQ29sbGVjdGlvbn0gSW5zdGFuY2VcbiAgICovXG4gIHVubGluayhmaWxlUmVmLCB2ZXJzaW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbdW5saW5rKCR7ZmlsZVJlZi5faWR9LCAke3ZlcnNpb259KV1gKTtcbiAgICBpZiAodmVyc2lvbikge1xuICAgICAgaWYgKF8uaXNPYmplY3QoZmlsZVJlZi52ZXJzaW9ucykgJiYgXy5pc09iamVjdChmaWxlUmVmLnZlcnNpb25zW3ZlcnNpb25dKSAmJiBmaWxlUmVmLnZlcnNpb25zW3ZlcnNpb25dLnBhdGgpIHtcbiAgICAgICAgZnMudW5saW5rKGZpbGVSZWYudmVyc2lvbnNbdmVyc2lvbl0ucGF0aCwgKGNhbGxiYWNrIHx8IE5PT1ApKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKF8uaXNPYmplY3QoZmlsZVJlZi52ZXJzaW9ucykpIHtcbiAgICAgICAgXy5lYWNoKGZpbGVSZWYudmVyc2lvbnMsICh2UmVmKSA9PiBib3VuZCgoKSA9PiB7XG4gICAgICAgICAgZnMudW5saW5rKHZSZWYucGF0aCwgKGNhbGxiYWNrIHx8IE5PT1ApKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnMudW5saW5rKGZpbGVSZWYucGF0aCwgKGNhbGxiYWNrIHx8IE5PT1ApKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgU2VydmVyXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25cbiAgICogQG5hbWUgXzQwNFxuICAgKiBAc3VtbWFyeSBJbnRlcm5hbCBtZXRob2QsIHVzZWQgdG8gcmV0dXJuIDQwNCBlcnJvclxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgXzQwNChodHRwKSB7XG4gICAgdGhpcy5fZGVidWcoYFtGaWxlc0NvbGxlY3Rpb25dIFtkb3dubG9hZCgke2h0dHAucmVxdWVzdC5vcmlnaW5hbFVybH0pXSBbXzQwNF0gRmlsZSBub3QgZm91bmRgKTtcbiAgICBjb25zdCB0ZXh0ID0gJ0ZpbGUgTm90IEZvdW5kIDooJztcblxuICAgIGlmICghaHR0cC5yZXNwb25zZS5oZWFkZXJzU2VudCkge1xuICAgICAgaHR0cC5yZXNwb25zZS53cml0ZUhlYWQoNDA0LCB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IHRleHQubGVuZ3RoXG4gICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWh0dHAucmVzcG9uc2UuZmluaXNoZWQpIHtcbiAgICAgIGh0dHAucmVzcG9uc2UuZW5kKHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvblxuICAgKiBAbmFtZSBkb3dubG9hZFxuICAgKiBAcGFyYW0ge09iamVjdH0gaHR0cCAgICAtIFNlcnZlciBIVFRQIG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmVyc2lvbiAtIFJlcXVlc3RlZCBmaWxlIHZlcnNpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGZpbGVSZWYgLSBSZXF1ZXN0ZWQgZmlsZSBPYmplY3RcbiAgICogQHN1bW1hcnkgSW5pdGlhdGVzIHRoZSBIVFRQIHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBkb3dubG9hZChodHRwLCB2ZXJzaW9uID0gJ29yaWdpbmFsJywgZmlsZVJlZikge1xuICAgIGxldCB2UmVmO1xuICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbZG93bmxvYWQoJHtodHRwLnJlcXVlc3Qub3JpZ2luYWxVcmx9LCAke3ZlcnNpb259KV1gKTtcblxuICAgIGlmIChmaWxlUmVmKSB7XG4gICAgICBpZiAoXy5oYXMoZmlsZVJlZiwgJ3ZlcnNpb25zJykgJiYgXy5oYXMoZmlsZVJlZi52ZXJzaW9ucywgdmVyc2lvbikpIHtcbiAgICAgICAgdlJlZiA9IGZpbGVSZWYudmVyc2lvbnNbdmVyc2lvbl07XG4gICAgICAgIHZSZWYuX2lkID0gZmlsZVJlZi5faWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2UmVmID0gZmlsZVJlZjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdlJlZiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghdlJlZiB8fCAhXy5pc09iamVjdCh2UmVmKSkge1xuICAgICAgcmV0dXJuIHRoaXMuXzQwNChodHRwKTtcbiAgICB9IGVsc2UgaWYgKGZpbGVSZWYpIHtcbiAgICAgIGlmICh0aGlzLmRvd25sb2FkQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkQ2FsbGJhY2suY2FsbChfLmV4dGVuZChodHRwLCB0aGlzLl9nZXRVc2VyKGh0dHApKSwgZmlsZVJlZikpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fNDA0KGh0dHApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmludGVyY2VwdERvd25sb2FkICYmIF8uaXNGdW5jdGlvbih0aGlzLmludGVyY2VwdERvd25sb2FkKSkge1xuICAgICAgICBpZiAodGhpcy5pbnRlcmNlcHREb3dubG9hZChodHRwLCBmaWxlUmVmLCB2ZXJzaW9uKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnMuc3RhdCh2UmVmLnBhdGgsIChzdGF0RXJyLCBzdGF0cykgPT4gYm91bmQoKCkgPT4ge1xuICAgICAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgICAgICBpZiAoc3RhdEVyciB8fCAhc3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fNDA0KGh0dHApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChzdGF0cy5zaXplICE9PSB2UmVmLnNpemUpICYmICF0aGlzLmludGVncml0eUNoZWNrKSB7XG4gICAgICAgICAgdlJlZi5zaXplICAgID0gc3RhdHMuc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoc3RhdHMuc2l6ZSAhPT0gdlJlZi5zaXplKSAmJiB0aGlzLmludGVncml0eUNoZWNrKSB7XG4gICAgICAgICAgcmVzcG9uc2VUeXBlID0gJzQwMCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZShodHRwLCBmaWxlUmVmLCB2UmVmLCB2ZXJzaW9uLCBudWxsLCAocmVzcG9uc2VUeXBlIHx8ICcyMDAnKSk7XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fNDA0KGh0dHApO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uXG4gICAqIEBuYW1lIHNlcnZlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBodHRwICAgIC0gU2VydmVyIEhUVFAgb2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmaWxlUmVmIC0gUmVxdWVzdGVkIGZpbGUgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2UmVmICAgIC0gUmVxdWVzdGVkIGZpbGUgdmVyc2lvbiBPYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZlcnNpb24gLSBSZXF1ZXN0ZWQgZmlsZSB2ZXJzaW9uXG4gICAqIEBwYXJhbSB7c3RyZWFtLlJlYWRhYmxlfG51bGx9IHJlYWRhYmxlU3RyZWFtIC0gUmVhZGFibGUgc3RyZWFtLCB3aGljaCBzZXJ2ZXMgYmluYXJ5IGZpbGUgZGF0YVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVzcG9uc2VUeXBlIC0gUmVzcG9uc2UgY29kZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlMjAwIC0gRm9yY2UgMjAwIHJlc3BvbnNlIGNvZGUgb3ZlciAyMDZcbiAgICogQHN1bW1hcnkgSGFuZGxlIGFuZCByZXBseSB0byBpbmNvbWluZyByZXF1ZXN0XG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBzZXJ2ZShodHRwLCBmaWxlUmVmLCB2UmVmLCB2ZXJzaW9uID0gJ29yaWdpbmFsJywgcmVhZGFibGVTdHJlYW0gPSBudWxsLCByZXNwb25zZVR5cGUgPSAnMjAwJywgZm9yY2UyMDAgPSBmYWxzZSkge1xuICAgIGxldCBwYXJ0aXJhbCA9IGZhbHNlO1xuICAgIGxldCByZXFSYW5nZSA9IGZhbHNlO1xuICAgIGxldCBkaXNwb3NpdGlvblR5cGUgPSAnJztcbiAgICBsZXQgc3RhcnQ7XG4gICAgbGV0IGVuZDtcbiAgICBsZXQgdGFrZTtcblxuICAgIGlmIChodHRwLnBhcmFtcy5xdWVyeS5kb3dubG9hZCAmJiAoaHR0cC5wYXJhbXMucXVlcnkuZG93bmxvYWQgPT09ICd0cnVlJykpIHtcbiAgICAgIGRpc3Bvc2l0aW9uVHlwZSA9ICdhdHRhY2htZW50OyAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwb3NpdGlvblR5cGUgPSAnaW5saW5lOyAnO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3Bvc2l0aW9uTmFtZSAgICAgPSBgZmlsZW5hbWU9XFxcIiR7ZW5jb2RlVVJJKHZSZWYubmFtZSB8fCBmaWxlUmVmLm5hbWUpfVxcXCI7IGZpbGVuYW1lKj1VVEYtOCcnJHtlbmNvZGVVUkkodlJlZi5uYW1lIHx8IGZpbGVSZWYubmFtZSl9OyBgO1xuICAgIGNvbnN0IGRpc3Bvc2l0aW9uRW5jb2RpbmcgPSAnY2hhcnNldD1VVEYtOCc7XG5cbiAgICBpZiAoIWh0dHAucmVzcG9uc2UuaGVhZGVyc1NlbnQpIHtcbiAgICAgIGh0dHAucmVzcG9uc2Uuc2V0SGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJywgZGlzcG9zaXRpb25UeXBlICsgZGlzcG9zaXRpb25OYW1lICsgZGlzcG9zaXRpb25FbmNvZGluZyk7XG4gICAgfVxuXG4gICAgaWYgKGh0dHAucmVxdWVzdC5oZWFkZXJzLnJhbmdlICYmICFmb3JjZTIwMCkge1xuICAgICAgcGFydGlyYWwgICAgPSB0cnVlO1xuICAgICAgY29uc3QgYXJyYXkgPSBodHRwLnJlcXVlc3QuaGVhZGVycy5yYW5nZS5zcGxpdCgvYnl0ZXM9KFswLTldKiktKFswLTldKikvKTtcbiAgICAgIHN0YXJ0ICAgICAgID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgZW5kICAgICAgICAgPSBwYXJzZUludChhcnJheVsyXSk7XG4gICAgICBpZiAoaXNOYU4oZW5kKSkge1xuICAgICAgICBlbmQgICAgICAgPSB2UmVmLnNpemUgLSAxO1xuICAgICAgfVxuICAgICAgdGFrZSAgICAgICAgPSBlbmQgLSBzdGFydDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnQgPSAwO1xuICAgICAgZW5kICAgPSB2UmVmLnNpemUgLSAxO1xuICAgICAgdGFrZSAgPSB2UmVmLnNpemU7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRpcmFsIHx8IChodHRwLnBhcmFtcy5xdWVyeS5wbGF5ICYmIChodHRwLnBhcmFtcy5xdWVyeS5wbGF5ID09PSAndHJ1ZScpKSkge1xuICAgICAgcmVxUmFuZ2UgPSB7c3RhcnQsIGVuZH07XG4gICAgICBpZiAoaXNOYU4oc3RhcnQpICYmICFpc05hTihlbmQpKSB7XG4gICAgICAgIHJlcVJhbmdlLnN0YXJ0ID0gZW5kIC0gdGFrZTtcbiAgICAgICAgcmVxUmFuZ2UuZW5kICAgPSBlbmQ7XG4gICAgICB9XG4gICAgICBpZiAoIWlzTmFOKHN0YXJ0KSAmJiBpc05hTihlbmQpKSB7XG4gICAgICAgIHJlcVJhbmdlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIHJlcVJhbmdlLmVuZCAgID0gc3RhcnQgKyB0YWtlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHN0YXJ0ICsgdGFrZSkgPj0gdlJlZi5zaXplKSB7IHJlcVJhbmdlLmVuZCA9IHZSZWYuc2l6ZSAtIDE7IH1cblxuICAgICAgaWYgKHRoaXMuc3RyaWN0ICYmICgocmVxUmFuZ2Uuc3RhcnQgPj0gKHZSZWYuc2l6ZSAtIDEpKSB8fCAocmVxUmFuZ2UuZW5kID4gKHZSZWYuc2l6ZSAtIDEpKSkpIHtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gJzQxNic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZVR5cGUgPSAnMjA2JztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VUeXBlID0gJzIwMCc7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyZWFtRXJyb3JIYW5kbGVyID0gKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW3NlcnZlKCR7dlJlZi5wYXRofSwgJHt2ZXJzaW9ufSldIFs1MDBdYCwgZXJyb3IpO1xuICAgICAgaWYgKCFodHRwLnJlc3BvbnNlLmZpbmlzaGVkKSB7XG4gICAgICAgIGh0dHAucmVzcG9uc2UuZW5kKGVycm9yLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoZWFkZXJzID0gXy5pc0Z1bmN0aW9uKHRoaXMucmVzcG9uc2VIZWFkZXJzKSA/IHRoaXMucmVzcG9uc2VIZWFkZXJzKHJlc3BvbnNlVHlwZSwgZmlsZVJlZiwgdlJlZiwgdmVyc2lvbikgOiB0aGlzLnJlc3BvbnNlSGVhZGVycztcblxuICAgIGlmICghaGVhZGVyc1snQ2FjaGUtQ29udHJvbCddKSB7XG4gICAgICBpZiAoIWh0dHAucmVzcG9uc2UuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgaHR0cC5yZXNwb25zZS5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCB0aGlzLmNhY2hlQ29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgIGlmICghaHR0cC5yZXNwb25zZS5oZWFkZXJzU2VudCkge1xuICAgICAgICBodHRwLnJlc3BvbnNlLnNldEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uZCA9IChzdHJlYW0sIGNvZGUpID0+IHtcbiAgICAgIGlmICghaHR0cC5yZXNwb25zZS5oZWFkZXJzU2VudCAmJiByZWFkYWJsZVN0cmVhbSkge1xuICAgICAgICBodHRwLnJlc3BvbnNlLndyaXRlSGVhZChjb2RlKTtcbiAgICAgIH1cblxuICAgICAgaHR0cC5yZXNwb25zZS5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RyZWFtLmFib3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgc3RyZWFtLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgc3RyZWFtLmVuZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaHR0cC5yZXF1ZXN0Lm9uKCdhYm9ydGVkJywgKCkgPT4ge1xuICAgICAgICBodHRwLnJlcXVlc3QuYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RyZWFtLmFib3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgc3RyZWFtLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgc3RyZWFtLmVuZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgc3RyZWFtLm9uKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICBpZiAoIWh0dHAucmVzcG9uc2UuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICBodHRwLnJlc3BvbnNlLndyaXRlSGVhZChjb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSkub24oJ2Fib3J0JywgKCkgPT4ge1xuICAgICAgICBpZiAoIWh0dHAucmVzcG9uc2UuZmluaXNoZWQpIHtcbiAgICAgICAgICBodHRwLnJlc3BvbnNlLmVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHR0cC5yZXF1ZXN0LmFib3J0ZWQpIHtcbiAgICAgICAgICBodHRwLnJlcXVlc3QuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KS5vbignZXJyb3InLCBzdHJlYW1FcnJvckhhbmRsZXJcbiAgICAgICkub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKCFodHRwLnJlc3BvbnNlLmZpbmlzaGVkKSB7XG4gICAgICAgICAgaHR0cC5yZXNwb25zZS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSkucGlwZShodHRwLnJlc3BvbnNlKTtcbiAgICB9O1xuXG4gICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICBjYXNlICc0MDAnOlxuICAgICAgdGhpcy5fZGVidWcoYFtGaWxlc0NvbGxlY3Rpb25dIFtzZXJ2ZSgke3ZSZWYucGF0aH0sICR7dmVyc2lvbn0pXSBbNDAwXSBDb250ZW50LUxlbmd0aCBtaXNtYXRjaCFgKTtcbiAgICAgIHZhciB0ZXh0ID0gJ0NvbnRlbnQtTGVuZ3RoIG1pc21hdGNoISc7XG5cbiAgICAgIGlmICghaHR0cC5yZXNwb25zZS5oZWFkZXJzU2VudCkge1xuICAgICAgICBodHRwLnJlc3BvbnNlLndyaXRlSGVhZCg0MDAsIHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nLFxuICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IHRleHQubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWh0dHAucmVzcG9uc2UuZmluaXNoZWQpIHtcbiAgICAgICAgaHR0cC5yZXNwb25zZS5lbmQodGV4dCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICc0MDQnOlxuICAgICAgdGhpcy5fNDA0KGh0dHApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnNDE2JzpcbiAgICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbc2VydmUoJHt2UmVmLnBhdGh9LCAke3ZlcnNpb259KV0gWzQxNl0gQ29udGVudC1SYW5nZSBpcyBub3Qgc3BlY2lmaWVkIWApO1xuICAgICAgaWYgKCFodHRwLnJlc3BvbnNlLmhlYWRlcnNTZW50KSB7XG4gICAgICAgIGh0dHAucmVzcG9uc2Uud3JpdGVIZWFkKDQxNik7XG4gICAgICB9XG4gICAgICBpZiAoIWh0dHAucmVzcG9uc2UuZmluaXNoZWQpIHtcbiAgICAgICAgaHR0cC5yZXNwb25zZS5lbmQoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJzIwNic6XG4gICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW3NlcnZlKCR7dlJlZi5wYXRofSwgJHt2ZXJzaW9ufSldIFsyMDZdYCk7XG4gICAgICBpZiAoIWh0dHAucmVzcG9uc2UuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgaHR0cC5yZXNwb25zZS5zZXRIZWFkZXIoJ0NvbnRlbnQtUmFuZ2UnLCBgYnl0ZXMgJHtyZXFSYW5nZS5zdGFydH0tJHtyZXFSYW5nZS5lbmR9LyR7dlJlZi5zaXplfWApO1xuICAgICAgfVxuICAgICAgcmVzcG9uZChyZWFkYWJsZVN0cmVhbSB8fCBmcy5jcmVhdGVSZWFkU3RyZWFtKHZSZWYucGF0aCwge3N0YXJ0OiByZXFSYW5nZS5zdGFydCwgZW5kOiByZXFSYW5nZS5lbmR9KSwgMjA2KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW3NlcnZlKCR7dlJlZi5wYXRofSwgJHt2ZXJzaW9ufSldIFsyMDBdYCk7XG4gICAgICByZXNwb25kKHJlYWRhYmxlU3RyZWFtIHx8IGZzLmNyZWF0ZVJlYWRTdHJlYW0odlJlZi5wYXRoKSwgMjAwKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgXyB9ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdtZXRlb3IvdW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSAgICAgICAgICAgIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xuaW1wb3J0IHsgZm9ybWF0RmxlVVJMIH0gICAgICAgICAgICBmcm9tICcuL2xpYi5qcyc7XG5pbXBvcnQgeyBjaGVjaywgTWF0Y2ggfSAgICAgICAgICAgIGZyb20gJ21ldGVvci9jaGVjayc7XG5pbXBvcnQgeyBGaWxlc0N1cnNvciwgRmlsZUN1cnNvciB9IGZyb20gJy4vY3Vyc29yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZXNDb2xsZWN0aW9uQ29yZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzdGF0aWMgc2NoZW1hID0ge1xuICAgIHNpemU6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHBhdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaXNWaWRlbzoge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgaXNBdWRpbzoge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgaXNJbWFnZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgaXNUZXh0OiB7XG4gICAgICB0eXBlOiBCb29sZWFuXG4gICAgfSxcbiAgICBpc0pTT046IHtcbiAgICAgIHR5cGU6IEJvb2xlYW5cbiAgICB9LFxuICAgIGlzUERGOiB7XG4gICAgICB0eXBlOiBCb29sZWFuXG4gICAgfSxcbiAgICBleHRlbnNpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgfSxcbiAgICBfc3RvcmFnZVBhdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgX2Rvd25sb2FkUm91dGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgX2NvbGxlY3Rpb25OYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHB1YmxpYzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgfSxcbiAgICBtZXRhOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBibGFja2JveDogdHJ1ZSxcbiAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgfSxcbiAgICB1c2VySWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgfSxcbiAgICB1cGRhdGVkQXQ6IHtcbiAgICAgIHR5cGU6IERhdGUsXG4gICAgICBvcHRpb25hbDogdHJ1ZVxuICAgIH0sXG4gICAgdmVyc2lvbnM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGJsYWNrYm94OiB0cnVlXG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uQ29yZVxuICAgKiBAbmFtZSBfZGVidWdcbiAgICogQHN1bW1hcnkgUHJpbnQgbG9ncyBpbiBkZWJ1ZyBtb2RlXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgX2RlYnVnKCkge1xuICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAoY29uc29sZS5pbmZvIHx8IGNvbnNvbGUubG9nIHx8IGZ1bmN0aW9uICgpIHsgfSkuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDb2xsZWN0aW9uQ29yZVxuICAgKiBAbmFtZSBfZ2V0RmlsZU5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGZpbGVEYXRhIC0gRmlsZSBPYmplY3RcbiAgICogQHN1bW1hcnkgUmV0dXJucyBmaWxlJ3MgbmFtZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgX2dldEZpbGVOYW1lKGZpbGVEYXRhKSB7XG4gICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlRGF0YS5uYW1lIHx8IGZpbGVEYXRhLmZpbGVOYW1lO1xuICAgIGlmIChfLmlzU3RyaW5nKGZpbGVOYW1lKSAmJiAoZmlsZU5hbWUubGVuZ3RoID4gMCkpIHtcbiAgICAgIHJldHVybiAoZmlsZURhdGEubmFtZSB8fCBmaWxlRGF0YS5maWxlTmFtZSkucmVwbGFjZSgvXFwuXFwuL2csICcnKS5yZXBsYWNlKC9cXC8vZywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvbkNvcmVcbiAgICogQG5hbWUgX2dldEV4dFxuICAgKiBAcGFyYW0ge1N0cmluZ30gRmlsZU5hbWUgLSBGaWxlIG5hbWVcbiAgICogQHN1bW1hcnkgR2V0IGV4dGVuc2lvbiBmcm9tIEZpbGVOYW1lXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBfZ2V0RXh0KGZpbGVOYW1lKSB7XG4gICAgaWYgKCEhfmZpbGVOYW1lLmluZGV4T2YoJy4nKSkge1xuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gKGZpbGVOYW1lLnNwbGl0KCcuJykucG9wKCkuc3BsaXQoJz8nKVswXSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiB7IGV4dDogZXh0ZW5zaW9uLCBleHRlbnNpb24sIGV4dGVuc2lvbldpdGhEb3Q6IGAuJHtleHRlbnNpb259YCB9O1xuICAgIH1cbiAgICByZXR1cm4geyBleHQ6ICcnLCBleHRlbnNpb246ICcnLCBleHRlbnNpb25XaXRoRG90OiAnJyB9O1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25Db3JlXG4gICAqIEBuYW1lIF91cGRhdGVGaWxlVHlwZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBGaWxlIGRhdGFcbiAgICogQHN1bW1hcnkgSW50ZXJuYWwgbWV0aG9kLiBDbGFzc2lmeSBmaWxlIGJhc2VkIG9uICd0eXBlJyBmaWVsZFxuICAgKi9cbiAgX3VwZGF0ZUZpbGVUeXBlcyhkYXRhKSB7XG4gICAgZGF0YS5pc1ZpZGVvICA9IC9edmlkZW9cXC8vaS50ZXN0KGRhdGEudHlwZSk7XG4gICAgZGF0YS5pc0F1ZGlvICA9IC9eYXVkaW9cXC8vaS50ZXN0KGRhdGEudHlwZSk7XG4gICAgZGF0YS5pc0ltYWdlICA9IC9eaW1hZ2VcXC8vaS50ZXN0KGRhdGEudHlwZSk7XG4gICAgZGF0YS5pc1RleHQgICA9IC9edGV4dFxcLy9pLnRlc3QoZGF0YS50eXBlKTtcbiAgICBkYXRhLmlzSlNPTiAgID0gL15hcHBsaWNhdGlvblxcL2pzb24kL2kudGVzdChkYXRhLnR5cGUpO1xuICAgIGRhdGEuaXNQREYgICAgPSAvXmFwcGxpY2F0aW9uXFwvKHgtKT9wZGYkL2kudGVzdChkYXRhLnR5cGUpO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25Db3JlXG4gICAqIEBuYW1lIF9kYXRhVG9TY2hlbWFcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBGaWxlIGRhdGFcbiAgICogQHN1bW1hcnkgSW50ZXJuYWwgbWV0aG9kLiBCdWlsZCBvYmplY3QgaW4gYWNjb3JkYW5jZSB3aXRoIGRlZmF1bHQgc2NoZW1hIGZyb20gRmlsZSBkYXRhXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBfZGF0YVRvU2NoZW1hKGRhdGEpIHtcbiAgICBjb25zdCBkcyA9IHtcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGV4dGVuc2lvbjogZGF0YS5leHRlbnNpb24sXG4gICAgICBwYXRoOiBkYXRhLnBhdGgsXG4gICAgICBtZXRhOiBkYXRhLm1ldGEsXG4gICAgICB0eXBlOiBkYXRhLnR5cGUsXG4gICAgICBzaXplOiBkYXRhLnNpemUsXG4gICAgICB1c2VySWQ6IGRhdGEudXNlcklkIHx8IG51bGwsXG4gICAgICB2ZXJzaW9uczoge1xuICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgIHBhdGg6IGRhdGEucGF0aCxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUsXG4gICAgICAgICAgdHlwZTogZGF0YS50eXBlLFxuICAgICAgICAgIGV4dGVuc2lvbjogZGF0YS5leHRlbnNpb25cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIF9kb3dubG9hZFJvdXRlOiBkYXRhLl9kb3dubG9hZFJvdXRlIHx8IHRoaXMuZG93bmxvYWRSb3V0ZSxcbiAgICAgIF9jb2xsZWN0aW9uTmFtZTogZGF0YS5fY29sbGVjdGlvbk5hbWUgfHwgdGhpcy5jb2xsZWN0aW9uTmFtZVxuICAgIH07XG5cbiAgICAvL09wdGlvbmFsIGZpbGVJZFxuICAgIGlmIChkYXRhLmZpbGVJZCkge1xuICAgICAgZHMuX2lkID0gZGF0YS5maWxlSWQ7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlRmlsZVR5cGVzKGRzKTtcbiAgICBkcy5fc3RvcmFnZVBhdGggPSBkYXRhLl9zdG9yYWdlUGF0aCB8fCB0aGlzLnN0b3JhZ2VQYXRoKF8uZXh0ZW5kKGRhdGEsIGRzKSk7XG4gICAgcmV0dXJuIGRzO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25Db3JlXG4gICAqIEBuYW1lIGZpbmRPbmVcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBzZWxlY3RvciAtIE1vbmdvLVN0eWxlIHNlbGVjdG9yIChodHRwOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI3NlbGVjdG9ycylcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBNb25nby1TdHlsZSBzZWxlY3RvciBPcHRpb25zIChodHRwOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI3NvcnRzcGVjaWZpZXJzKVxuICAgKiBAc3VtbWFyeSBGaW5kIGFuZCByZXR1cm4gQ3Vyc29yIGZvciBtYXRjaGluZyBkb2N1bWVudCBPYmplY3RcbiAgICogQHJldHVybnMge0ZpbGVDdXJzb3J9IEluc3RhbmNlXG4gICAqL1xuICBmaW5kT25lKHNlbGVjdG9yID0ge30sIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW2ZpbmRPbmUoJHtKU09OLnN0cmluZ2lmeShzZWxlY3Rvcil9LCAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfSldYCk7XG4gICAgY2hlY2soc2VsZWN0b3IsIE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKE9iamVjdCwgU3RyaW5nLCBCb29sZWFuLCBOdW1iZXIsIG51bGwpKSk7XG4gICAgY2hlY2sob3B0aW9ucywgTWF0Y2guT3B0aW9uYWwoT2JqZWN0KSk7XG5cbiAgICBjb25zdCBkb2MgPSB0aGlzLmNvbGxlY3Rpb24uZmluZE9uZShzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgaWYgKGRvYykge1xuICAgICAgcmV0dXJuIG5ldyBGaWxlQ3Vyc29yKGRvYywgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBkb2M7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ29sbGVjdGlvbkNvcmVcbiAgICogQG5hbWUgZmluZFxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHNlbGVjdG9yIC0gTW9uZ28tU3R5bGUgc2VsZWN0b3IgKGh0dHA6Ly9kb2NzLm1ldGVvci5jb20vYXBpL2NvbGxlY3Rpb25zLmh0bWwjc2VsZWN0b3JzKVxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIG9wdGlvbnMgIC0gTW9uZ28tU3R5bGUgc2VsZWN0b3IgT3B0aW9ucyAoaHR0cDovL2RvY3MubWV0ZW9yLmNvbS9hcGkvY29sbGVjdGlvbnMuaHRtbCNzb3J0c3BlY2lmaWVycylcbiAgICogQHN1bW1hcnkgRmluZCBhbmQgcmV0dXJuIEN1cnNvciBmb3IgbWF0Y2hpbmcgZG9jdW1lbnRzXG4gICAqIEByZXR1cm5zIHtGaWxlc0N1cnNvcn0gSW5zdGFuY2VcbiAgICovXG4gIGZpbmQoc2VsZWN0b3IgPSB7fSwgb3B0aW9ucykge1xuICAgIHRoaXMuX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbZmluZCgke0pTT04uc3RyaW5naWZ5KHNlbGVjdG9yKX0sICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9KV1gKTtcbiAgICBjaGVjayhzZWxlY3RvciwgTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YoT2JqZWN0LCBTdHJpbmcsIEJvb2xlYW4sIE51bWJlciwgbnVsbCkpKTtcbiAgICBjaGVjayhvcHRpb25zLCBNYXRjaC5PcHRpb25hbChPYmplY3QpKTtcblxuICAgIHJldHVybiBuZXcgRmlsZXNDdXJzb3Ioc2VsZWN0b3IsIG9wdGlvbnMsIHRoaXMpO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25Db3JlXG4gICAqIEBuYW1lIHVwZGF0ZVxuICAgKiBAc2VlIGh0dHA6Ly9kb2NzLm1ldGVvci5jb20vIy9mdWxsL3VwZGF0ZVxuICAgKiBAc3VtbWFyeSBsaW5rIE1vbmdvLkNvbGxlY3Rpb24gdXBkYXRlIG1ldGhvZFxuICAgKiBAcmV0dXJucyB7TW9uZ28uQ29sbGVjdGlvbn0gSW5zdGFuY2VcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb24udXBkYXRlLmFwcGx5KHRoaXMuY29sbGVjdGlvbiwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0NvbGxlY3Rpb25Db3JlXG4gICAqIEBuYW1lIGxpbmtcbiAgICogQHBhcmFtIHtPYmplY3R9IGZpbGVSZWYgLSBGaWxlIHJlZmVyZW5jZSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZlcnNpb24gLSBWZXJzaW9uIG9mIGZpbGUgeW91IHdvdWxkIGxpa2UgdG8gcmVxdWVzdFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIGRvd25sb2FkYWJsZSBVUkxcbiAgICogQHJldHVybnMge1N0cmluZ30gRW1wdHkgc3RyaW5nIHJldHVybmVkIGluIGNhc2UgaWYgZmlsZSBub3QgZm91bmQgaW4gREJcbiAgICovXG4gIGxpbmsoZmlsZVJlZiwgdmVyc2lvbiA9ICdvcmlnaW5hbCcpIHtcbiAgICB0aGlzLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW2xpbmsoJHsoXy5pc09iamVjdChmaWxlUmVmKSA/IGZpbGVSZWYuX2lkIDogdW5kZWZpbmVkKX0sICR7dmVyc2lvbn0pXWApO1xuICAgIGNoZWNrKGZpbGVSZWYsIE9iamVjdCk7XG4gICAgY2hlY2sodmVyc2lvbiwgU3RyaW5nKTtcblxuICAgIGlmICghZmlsZVJlZikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0RmxlVVJMKGZpbGVSZWYsIHZlcnNpb24pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gICAgICBmcm9tICdtZXRlb3IvdW5kZXJzY29yZSc7XG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuLypcbiAqIEBwcml2YXRlXG4gKiBAbG9jdXMgQW55d2hlcmVcbiAqIEBjbGFzcyBGaWxlQ3Vyc29yXG4gKiBAcGFyYW0gX2ZpbGVSZWYgICAge09iamVjdH0gLSBNb25nby1TdHlsZSBzZWxlY3RvciAoaHR0cDovL2RvY3MubWV0ZW9yLmNvbS9hcGkvY29sbGVjdGlvbnMuaHRtbCNzZWxlY3RvcnMpXG4gKiBAcGFyYW0gX2NvbGxlY3Rpb24ge0ZpbGVzQ29sbGVjdGlvbn0gLSBGaWxlc0NvbGxlY3Rpb24gSW5zdGFuY2VcbiAqIEBzdW1tYXJ5IEludGVybmFsIGNsYXNzLCByZXByZXNlbnRzIGVhY2ggcmVjb3JkIGluIGBGaWxlc0N1cnNvci5lYWNoKClgIG9yIGRvY3VtZW50IHJldHVybmVkIGZyb20gYC5maW5kT25lKClgIG1ldGhvZFxuICovXG5leHBvcnQgY2xhc3MgRmlsZUN1cnNvciB7XG4gIGNvbnN0cnVjdG9yKF9maWxlUmVmLCBfY29sbGVjdGlvbikge1xuICAgIHRoaXMuX2ZpbGVSZWYgICAgPSBfZmlsZVJlZjtcbiAgICB0aGlzLl9jb2xsZWN0aW9uID0gX2NvbGxlY3Rpb247XG4gICAgXy5leHRlbmQodGhpcywgX2ZpbGVSZWYpO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlQ3Vyc29yXG4gICAqIEBuYW1lIHJlbW92ZVxuICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSAtIFRyaWdnZXJlZCBhc3luY2hyb25vdXNseSBhZnRlciBpdGVtIGlzIHJlbW92ZWQgb3IgZmFpbGVkIHRvIGJlIHJlbW92ZWRcbiAgICogQHN1bW1hcnkgUmVtb3ZlIGRvY3VtZW50XG4gICAqIEByZXR1cm5zIHtGaWxlQ3Vyc29yfVxuICAgKi9cbiAgcmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlQ3Vyc29yXSBbcmVtb3ZlKCldJyk7XG4gICAgaWYgKHRoaXMuX2ZpbGVSZWYpIHtcbiAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVtb3ZlKHRoaXMuX2ZpbGVSZWYuX2lkLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG5ldyBNZXRlb3IuRXJyb3IoNDA0LCAnTm8gc3VjaCBmaWxlJykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZUN1cnNvclxuICAgKiBAbmFtZSBsaW5rXG4gICAqIEBwYXJhbSB2ZXJzaW9uIHtTdHJpbmd9IC0gTmFtZSBvZiBmaWxlJ3Mgc3VidmVyc2lvblxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIGRvd25sb2FkYWJsZSBVUkwgdG8gRmlsZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgbGluayh2ZXJzaW9uID0gJ29yaWdpbmFsJykge1xuICAgIHRoaXMuX2NvbGxlY3Rpb24uX2RlYnVnKGBbRmlsZXNDb2xsZWN0aW9uXSBbRmlsZUN1cnNvcl0gW2xpbmsoJHt2ZXJzaW9ufSldYCk7XG4gICAgaWYgKHRoaXMuX2ZpbGVSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmxpbmsodGhpcy5fZmlsZVJlZiwgdmVyc2lvbik7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZUN1cnNvclxuICAgKiBAbmFtZSBnZXRcbiAgICogQHBhcmFtIHByb3BlcnR5IHtTdHJpbmd9IC0gTmFtZSBvZiBzdWItb2JqZWN0IHByb3BlcnR5XG4gICAqIEBzdW1tYXJ5IFJldHVybnMgY3VycmVudCBkb2N1bWVudCBhcyBhIHBsYWluIE9iamVjdCwgaWYgYHByb3BlcnR5YCBpcyBzcGVjaWZpZWQgLSByZXR1cm5zIHZhbHVlIG9mIHN1Yi1vYmplY3QgcHJvcGVydHlcbiAgICogQHJldHVybnMge09iamVjdHxtaXh9XG4gICAqL1xuICBnZXQocHJvcGVydHkpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZyhgW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVDdXJzb3JdIFtnZXQoJHtwcm9wZXJ0eX0pXWApO1xuICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVSZWZbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZmlsZVJlZjtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZUN1cnNvclxuICAgKiBAbmFtZSBmZXRjaFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIGRvY3VtZW50IGFzIHBsYWluIE9iamVjdCBpbiBBcnJheVxuICAgKiBAcmV0dXJucyB7W09iamVjdF19XG4gICAqL1xuICBmZXRjaCgpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVDdXJzb3JdIFtmZXRjaCgpXScpO1xuICAgIHJldHVybiBbdGhpcy5fZmlsZVJlZl07XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVDdXJzb3JcbiAgICogQG5hbWUgd2l0aFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIHJlYWN0aXZlIHZlcnNpb24gb2YgY3VycmVudCBGaWxlQ3Vyc29yLCB1c2VmdWwgdG8gdXNlIHdpdGggYHt7I3dpdGh9fS4uLnt7L3dpdGh9fWAgYmxvY2sgdGVtcGxhdGUgaGVscGVyXG4gICAqIEByZXR1cm5zIHtbT2JqZWN0XX1cbiAgICovXG4gIHdpdGgoKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlQ3Vyc29yXSBbd2l0aCgpXScpO1xuICAgIHJldHVybiBfLmV4dGVuZCh0aGlzLCB0aGlzLl9jb2xsZWN0aW9uLmNvbGxlY3Rpb24uZmluZE9uZSh0aGlzLl9maWxlUmVmLl9pZCkpO1xuICB9XG59XG5cbi8qXG4gKiBAcHJpdmF0ZVxuICogQGxvY3VzIEFueXdoZXJlXG4gKiBAY2xhc3MgRmlsZXNDdXJzb3JcbiAqIEBwYXJhbSBfc2VsZWN0b3IgICB7U3RyaW5nfE9iamVjdH0gICAtIE1vbmdvLVN0eWxlIHNlbGVjdG9yIChodHRwOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI3NlbGVjdG9ycylcbiAqIEBwYXJhbSBvcHRpb25zICAgICB7T2JqZWN0fSAgICAgICAgICAtIE1vbmdvLVN0eWxlIHNlbGVjdG9yIE9wdGlvbnMgKGh0dHA6Ly9kb2NzLm1ldGVvci5jb20vYXBpL2NvbGxlY3Rpb25zLmh0bWwjc2VsZWN0b3JzKVxuICogQHBhcmFtIF9jb2xsZWN0aW9uIHtGaWxlc0NvbGxlY3Rpb259IC0gRmlsZXNDb2xsZWN0aW9uIEluc3RhbmNlXG4gKiBAc3VtbWFyeSBJbXBsZW1lbnRhdGlvbiBvZiBDdXJzb3IgZm9yIEZpbGVzQ29sbGVjdGlvblxuICovXG5leHBvcnQgY2xhc3MgRmlsZXNDdXJzb3Ige1xuICBjb25zdHJ1Y3Rvcihfc2VsZWN0b3IgPSB7fSwgb3B0aW9ucywgX2NvbGxlY3Rpb24pIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uID0gX2NvbGxlY3Rpb247XG4gICAgdGhpcy5fc2VsZWN0b3IgICA9IF9zZWxlY3RvcjtcbiAgICB0aGlzLl9jdXJyZW50ICAgID0gLTE7XG4gICAgdGhpcy5jdXJzb3IgICAgICA9IHRoaXMuX2NvbGxlY3Rpb24uY29sbGVjdGlvbi5maW5kKHRoaXMuX3NlbGVjdG9yLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDdXJzb3JcbiAgICogQG5hbWUgZ2V0XG4gICAqIEBzdW1tYXJ5IFJldHVybnMgYWxsIG1hdGNoaW5nIGRvY3VtZW50KHMpIGFzIGFuIEFycmF5LiBBbGlhcyBvZiBgLmZldGNoKClgXG4gICAqIEByZXR1cm5zIHtbT2JqZWN0XX1cbiAgICovXG4gIGdldCgpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbZ2V0KCldJyk7XG4gICAgcmV0dXJuIHRoaXMuY3Vyc29yLmZldGNoKCk7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ3Vyc29yXG4gICAqIEBuYW1lIGhhc05leHRcbiAgICogQHN1bW1hcnkgUmV0dXJucyBgdHJ1ZWAgaWYgdGhlcmUgaXMgbmV4dCBpdGVtIGF2YWlsYWJsZSBvbiBDdXJzb3JcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBoYXNOZXh0KCkge1xuICAgIHRoaXMuX2NvbGxlY3Rpb24uX2RlYnVnKCdbRmlsZXNDb2xsZWN0aW9uXSBbRmlsZXNDdXJzb3JdIFtoYXNOZXh0KCldJyk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQgPCAodGhpcy5jdXJzb3IuY291bnQoKSAtIDEpO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0N1cnNvclxuICAgKiBAbmFtZSBuZXh0XG4gICAqIEBzdW1tYXJ5IFJldHVybnMgbmV4dCBpdGVtIG9uIEN1cnNvciwgaWYgYXZhaWxhYmxlXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgbmV4dCgpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbbmV4dCgpXScpO1xuICAgIHRoaXMuY3Vyc29yLmZldGNoKClbKyt0aGlzLl9jdXJyZW50XTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDdXJzb3JcbiAgICogQG5hbWUgaGFzUHJldmlvdXNcbiAgICogQHN1bW1hcnkgUmV0dXJucyBgdHJ1ZWAgaWYgdGhlcmUgaXMgcHJldmlvdXMgaXRlbSBhdmFpbGFibGUgb24gQ3Vyc29yXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaGFzUHJldmlvdXMoKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlc0N1cnNvcl0gW2hhc1ByZXZpb3VzKCldJyk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQgIT09IC0xO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0N1cnNvclxuICAgKiBAbmFtZSBwcmV2aW91c1xuICAgKiBAc3VtbWFyeSBSZXR1cm5zIHByZXZpb3VzIGl0ZW0gb24gQ3Vyc29yLCBpZiBhdmFpbGFibGVcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICBwcmV2aW91cygpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbcHJldmlvdXMoKV0nKTtcbiAgICB0aGlzLmN1cnNvci5mZXRjaCgpWy0tdGhpcy5fY3VycmVudF07XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ3Vyc29yXG4gICAqIEBuYW1lIGZldGNoXG4gICAqIEBzdW1tYXJ5IFJldHVybnMgYWxsIG1hdGNoaW5nIGRvY3VtZW50KHMpIGFzIGFuIEFycmF5LlxuICAgKiBAcmV0dXJucyB7W09iamVjdF19XG4gICAqL1xuICBmZXRjaCgpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbZmV0Y2goKV0nKTtcbiAgICByZXR1cm4gdGhpcy5jdXJzb3IuZmV0Y2goKSB8fCBbXTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDdXJzb3JcbiAgICogQG5hbWUgZmlyc3RcbiAgICogQHN1bW1hcnkgUmV0dXJucyBmaXJzdCBpdGVtIG9uIEN1cnNvciwgaWYgYXZhaWxhYmxlXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgZmlyc3QoKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlc0N1cnNvcl0gW2ZpcnN0KCldJyk7XG4gICAgdGhpcy5fY3VycmVudCA9IDA7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2goKVt0aGlzLl9jdXJyZW50XTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDdXJzb3JcbiAgICogQG5hbWUgbGFzdFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIGxhc3QgaXRlbSBvbiBDdXJzb3IsIGlmIGF2YWlsYWJsZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGxhc3QoKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlc0N1cnNvcl0gW2xhc3QoKV0nKTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5jb3VudCgpIC0gMTtcbiAgICByZXR1cm4gdGhpcy5mZXRjaCgpW3RoaXMuX2N1cnJlbnRdO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0N1cnNvclxuICAgKiBAbmFtZSBjb3VudFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZG9jdW1lbnRzIHRoYXQgbWF0Y2ggYSBxdWVyeVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgY291bnQoKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlc0N1cnNvcl0gW2NvdW50KCldJyk7XG4gICAgcmV0dXJuIHRoaXMuY3Vyc29yLmNvdW50KCk7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ3Vyc29yXG4gICAqIEBuYW1lIHJlbW92ZVxuICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSAtIFRyaWdnZXJlZCBhc3luY2hyb25vdXNseSBhZnRlciBpdGVtIGlzIHJlbW92ZWQgb3IgZmFpbGVkIHRvIGJlIHJlbW92ZWRcbiAgICogQHN1bW1hcnkgUmVtb3ZlcyBhbGwgZG9jdW1lbnRzIHRoYXQgbWF0Y2ggYSBxdWVyeVxuICAgKiBAcmV0dXJucyB7RmlsZXNDdXJzb3J9XG4gICAqL1xuICByZW1vdmUoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbcmVtb3ZlKCldJyk7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5yZW1vdmUodGhpcy5fc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDdXJzb3JcbiAgICogQG5hbWUgZm9yRWFjaFxuICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSAtIEZ1bmN0aW9uIHRvIGNhbGwuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhyZWUgYXJndW1lbnRzOiB0aGUgYGZpbGVgLCBhIDAtYmFzZWQgaW5kZXgsIGFuZCBjdXJzb3IgaXRzZWxmXG4gICAqIEBwYXJhbSBjb250ZXh0IHtPYmplY3R9IC0gQW4gb2JqZWN0IHdoaWNoIHdpbGwgYmUgdGhlIHZhbHVlIG9mIGB0aGlzYCBpbnNpZGUgYGNhbGxiYWNrYFxuICAgKiBAc3VtbWFyeSBDYWxsIGBjYWxsYmFja2Agb25jZSBmb3IgZWFjaCBtYXRjaGluZyBkb2N1bWVudCwgc2VxdWVudGlhbGx5IGFuZCBzeW5jaHJvbm91c2x5LlxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgZm9yRWFjaChjYWxsYmFjaywgY29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlc0N1cnNvcl0gW2ZvckVhY2goKV0nKTtcbiAgICB0aGlzLmN1cnNvci5mb3JFYWNoKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAbWVtYmVyT2YgRmlsZXNDdXJzb3JcbiAgICogQG5hbWUgZWFjaFxuICAgKiBAc3VtbWFyeSBSZXR1cm5zIGFuIEFycmF5IG9mIEZpbGVDdXJzb3IgbWFkZSBmb3IgZWFjaCBkb2N1bWVudCBvbiBjdXJyZW50IGN1cnNvclxuICAgKiAgICAgICAgICBVc2VmdWwgd2hlbiB1c2luZyBpbiB7eyNlYWNoIEZpbGVzQ3Vyc29yI2VhY2h9fS4uLnt7L2VhY2h9fSBibG9jayB0ZW1wbGF0ZSBoZWxwZXJcbiAgICogQHJldHVybnMge1tGaWxlQ3Vyc29yXX1cbiAgICovXG4gIGVhY2goKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKChmaWxlKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IEZpbGVDdXJzb3IoZmlsZSwgdGhpcy5fY29sbGVjdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ3Vyc29yXG4gICAqIEBuYW1lIG1hcFxuICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSAtIEZ1bmN0aW9uIHRvIGNhbGwuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhyZWUgYXJndW1lbnRzOiB0aGUgYGZpbGVgLCBhIDAtYmFzZWQgaW5kZXgsIGFuZCBjdXJzb3IgaXRzZWxmXG4gICAqIEBwYXJhbSBjb250ZXh0IHtPYmplY3R9IC0gQW4gb2JqZWN0IHdoaWNoIHdpbGwgYmUgdGhlIHZhbHVlIG9mIGB0aGlzYCBpbnNpZGUgYGNhbGxiYWNrYFxuICAgKiBAc3VtbWFyeSBNYXAgYGNhbGxiYWNrYCBvdmVyIGFsbCBtYXRjaGluZyBkb2N1bWVudHMuIFJldHVybnMgYW4gQXJyYXkuXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIG1hcChjYWxsYmFjaywgY29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fZGVidWcoJ1tGaWxlc0NvbGxlY3Rpb25dIFtGaWxlc0N1cnNvcl0gW21hcCgpXScpO1xuICAgIHJldHVybiB0aGlzLmN1cnNvci5tYXAoY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9XG5cbiAgLypcbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBtZW1iZXJPZiBGaWxlc0N1cnNvclxuICAgKiBAbmFtZSBjdXJyZW50XG4gICAqIEBzdW1tYXJ5IFJldHVybnMgY3VycmVudCBpdGVtIG9uIEN1cnNvciwgaWYgYXZhaWxhYmxlXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgY3VycmVudCgpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbY3VycmVudCgpXScpO1xuICAgIGlmICh0aGlzLl9jdXJyZW50IDwgMCkge1xuICAgICAgdGhpcy5fY3VycmVudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZldGNoKClbdGhpcy5fY3VycmVudF07XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ3Vyc29yXG4gICAqIEBuYW1lIG9ic2VydmVcbiAgICogQHBhcmFtIGNhbGxiYWNrcyB7T2JqZWN0fSAtIEZ1bmN0aW9ucyB0byBjYWxsIHRvIGRlbGl2ZXIgdGhlIHJlc3VsdCBzZXQgYXMgaXQgY2hhbmdlc1xuICAgKiBAc3VtbWFyeSBXYXRjaCBhIHF1ZXJ5LiBSZWNlaXZlIGNhbGxiYWNrcyBhcyB0aGUgcmVzdWx0IHNldCBjaGFuZ2VzLlxuICAgKiBAdXJsIGh0dHA6Ly9kb2NzLm1ldGVvci5jb20vYXBpL2NvbGxlY3Rpb25zLmh0bWwjTW9uZ28tQ3Vyc29yLW9ic2VydmVcbiAgICogQHJldHVybnMge09iamVjdH0gLSBsaXZlIHF1ZXJ5IGhhbmRsZVxuICAgKi9cbiAgb2JzZXJ2ZShjYWxsYmFja3MpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbb2JzZXJ2ZSgpXScpO1xuICAgIHJldHVybiB0aGlzLmN1cnNvci5vYnNlcnZlKGNhbGxiYWNrcyk7XG4gIH1cblxuICAvKlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQG1lbWJlck9mIEZpbGVzQ3Vyc29yXG4gICAqIEBuYW1lIG9ic2VydmVDaGFuZ2VzXG4gICAqIEBwYXJhbSBjYWxsYmFja3Mge09iamVjdH0gLSBGdW5jdGlvbnMgdG8gY2FsbCB0byBkZWxpdmVyIHRoZSByZXN1bHQgc2V0IGFzIGl0IGNoYW5nZXNcbiAgICogQHN1bW1hcnkgV2F0Y2ggYSBxdWVyeS4gUmVjZWl2ZSBjYWxsYmFja3MgYXMgdGhlIHJlc3VsdCBzZXQgY2hhbmdlcy4gT25seSB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0aGUgb2xkIGFuZCBuZXcgZG9jdW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrcy5cbiAgICogQHVybCBodHRwOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI01vbmdvLUN1cnNvci1vYnNlcnZlQ2hhbmdlc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIGxpdmUgcXVlcnkgaGFuZGxlXG4gICAqL1xuICBvYnNlcnZlQ2hhbmdlcyhjYWxsYmFja3MpIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uLl9kZWJ1ZygnW0ZpbGVzQ29sbGVjdGlvbl0gW0ZpbGVzQ3Vyc29yXSBbb2JzZXJ2ZUNoYW5nZXMoKV0nKTtcbiAgICByZXR1cm4gdGhpcy5jdXJzb3Iub2JzZXJ2ZUNoYW5nZXMoY2FsbGJhY2tzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgXyB9ICAgICBmcm9tICdtZXRlb3IvdW5kZXJzY29yZSc7XG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJ21ldGVvci9jaGVjayc7XG5cbi8qXG4gKiBAY29uc3Qge0Z1bmN0aW9ufSBmaXhKU09OUGFyc2UgLSBGaXggaXNzdWUgd2l0aCBEYXRlIHBhcnNlXG4gKi9cbmNvbnN0IGZpeEpTT05QYXJzZSA9IGZ1bmN0aW9uKG9iaikge1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKF8uaXNTdHJpbmcob2JqW2tleV0pICYmICEhfm9ialtrZXldLmluZGV4T2YoJz0tLUpTT04tREFURS0tPScpKSB7XG4gICAgICBvYmpba2V5XSA9IG9ialtrZXldLnJlcGxhY2UoJz0tLUpTT04tREFURS0tPScsICcnKTtcbiAgICAgIG9ialtrZXldID0gbmV3IERhdGUocGFyc2VJbnQob2JqW2tleV0pKTtcbiAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3Qob2JqW2tleV0pKSB7XG4gICAgICBvYmpba2V5XSA9IGZpeEpTT05QYXJzZShvYmpba2V5XSk7XG4gICAgfSBlbHNlIGlmIChfLmlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgICBsZXQgdjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdiA9IG9ialtrZXldW2ldO1xuICAgICAgICBpZiAoXy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIG9ialtrZXldW2ldID0gZml4SlNPTlBhcnNlKHYpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcodikgJiYgISF+di5pbmRleE9mKCc9LS1KU09OLURBVEUtLT0nKSkge1xuICAgICAgICAgIHYgPSB2LnJlcGxhY2UoJz0tLUpTT04tREFURS0tPScsICcnKTtcbiAgICAgICAgICBvYmpba2V5XVtpXSA9IG5ldyBEYXRlKHBhcnNlSW50KHYpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxuLypcbiAqIEBjb25zdCB7RnVuY3Rpb259IGZpeEpTT05TdHJpbmdpZnkgLSBGaXggaXNzdWUgd2l0aCBEYXRlIHN0cmluZ2lmeVxuICovXG5jb25zdCBmaXhKU09OU3RyaW5naWZ5ID0gZnVuY3Rpb24ob2JqKSB7XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAoXy5pc0RhdGUob2JqW2tleV0pKSB7XG4gICAgICBvYmpba2V5XSA9IGA9LS1KU09OLURBVEUtLT0keytvYmpba2V5XX1gO1xuICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdChvYmpba2V5XSkpIHtcbiAgICAgIG9ialtrZXldID0gZml4SlNPTlN0cmluZ2lmeShvYmpba2V5XSk7XG4gICAgfSBlbHNlIGlmIChfLmlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgICBsZXQgdjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdiA9IG9ialtrZXldW2ldO1xuICAgICAgICBpZiAoXy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIG9ialtrZXldW2ldID0gZml4SlNPTlN0cmluZ2lmeSh2KTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIG9ialtrZXldW2ldID0gYD0tLUpTT04tREFURS0tPSR7K3Z9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufTtcblxuLypcbiAqIEBsb2N1cyBBbnl3aGVyZVxuICogQHByaXZhdGVcbiAqIEBuYW1lIGZvcm1hdEZsZVVSTFxuICogQHBhcmFtIHtPYmplY3R9IGZpbGVSZWYgLSBGaWxlIHJlZmVyZW5jZSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSB2ZXJzaW9uIC0gW09wdGlvbmFsXSBWZXJzaW9uIG9mIGZpbGUgeW91IHdvdWxkIGxpa2UgYnVpbGQgVVJMIGZvclxuICogQHN1bW1hcnkgUmV0dXJucyBmb3JtYXR0ZWQgVVJMIGZvciBmaWxlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBEb3dubG9hZGFibGUgbGlua1xuICovXG5jb25zdCBmb3JtYXRGbGVVUkwgPSAoZmlsZVJlZiwgdmVyc2lvbiA9ICdvcmlnaW5hbCcpID0+IHtcbiAgbGV0IGV4dDtcbiAgY2hlY2soZmlsZVJlZiwgT2JqZWN0KTtcbiAgY2hlY2sodmVyc2lvbiwgU3RyaW5nKTtcblxuICBjb25zdCBfcm9vdCA9IF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uUk9PVF9VUkwucmVwbGFjZSgvXFwvKyQvLCAnJyk7XG4gIGNvbnN0IHZSZWYgPSAoKGZpbGVSZWYudmVyc2lvbnMgJiYgZmlsZVJlZi52ZXJzaW9uc1t2ZXJzaW9uXSkgfHwgZmlsZVJlZik7XG5cbiAgaWYgKHZSZWYuZXh0ZW5zaW9uICYmIF8uaXNTdHJpbmcodlJlZiwgJ2V4dGVuc2lvbicpKSB7XG4gICAgZXh0ID0gYC4ke3ZSZWYuZXh0ZW5zaW9uLnJlcGxhY2UoL15cXC4vLCAnJyl9YDtcbiAgfSBlbHNlIHtcbiAgICBleHQgPSAnJztcbiAgfVxuXG4gIGlmIChmaWxlUmVmLnB1YmxpYyA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBfcm9vdCArICh2ZXJzaW9uID09PSAnb3JpZ2luYWwnID8gYCR7ZmlsZVJlZi5fZG93bmxvYWRSb3V0ZX0vJHtmaWxlUmVmLl9pZH0ke2V4dH1gIDogYCR7ZmlsZVJlZi5fZG93bmxvYWRSb3V0ZX0vJHt2ZXJzaW9ufS0ke2ZpbGVSZWYuX2lkfSR7ZXh0fWApO1xuICB9XG4gIHJldHVybiBfcm9vdCArIGAke2ZpbGVSZWYuX2Rvd25sb2FkUm91dGV9LyR7ZmlsZVJlZi5fY29sbGVjdGlvbk5hbWV9LyR7ZmlsZVJlZi5faWR9LyR7dmVyc2lvbn0vJHtmaWxlUmVmLl9pZH0ke2V4dH1gO1xufTtcblxuZXhwb3J0IHsgZml4SlNPTlBhcnNlLCBmaXhKU09OU3RyaW5naWZ5LCBmb3JtYXRGbGVVUkwgfTtcbiIsImltcG9ydCBmcyAgICAgICAgIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IF8gfSAgICAgIGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuY29uc3QgTk9PUCA9ICgpID0+IHt9O1xuXG4vKlxuICogQGNvbnN0IHtPYmplY3R9IGJvdW5kICAgLSBNZXRlb3IuYmluZEVudmlyb25tZW50IChGaWJlciB3cmFwcGVyKVxuICogQGNvbnN0IHtPYmplY3R9IGZkQ2FjaGUgLSBGaWxlIERlc2NyaXB0b3JzIENhY2hlXG4gKi9cbmNvbnN0IGJvdW5kICAgPSBNZXRlb3IuYmluZEVudmlyb25tZW50KGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpO1xuY29uc3QgZmRDYWNoZSA9IHt9O1xuXG4vKlxuICogQHByaXZhdGVcbiAqIEBsb2N1cyBTZXJ2ZXJcbiAqIEBjbGFzcyBXcml0ZVN0cmVhbVxuICogQHBhcmFtIHBhdGggICAgICB7U3RyaW5nfSAtIFBhdGggdG8gZmlsZSBvbiBGU1xuICogQHBhcmFtIG1heExlbmd0aCB7TnVtYmVyfSAtIE1heCBhbW91bnQgb2YgY2h1bmtzIGluIHN0cmVhbVxuICogQHBhcmFtIGZpbGUgICAgICB7T2JqZWN0fSAtIGZpbGVSZWYgT2JqZWN0XG4gKiBAc3VtbWFyeSB3cml0YWJsZVN0cmVhbSB3cmFwcGVyIGNsYXNzLCBtYWtlcyBzdXJlIGNodW5rcyBpcyB3cml0dGVuIGluIGdpdmVuIG9yZGVyLiBJbXBsZW1lbnRhdGlvbiBvZiBxdWV1ZSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyaXRlU3RyZWFtIHtcbiAgY29uc3RydWN0b3IocGF0aCwgbWF4TGVuZ3RoLCBmaWxlLCBwZXJtaXNzaW9ucykge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XG4gICAgdGhpcy5maWxlID0gZmlsZTtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gcGVybWlzc2lvbnM7XG4gICAgaWYgKCF0aGlzLnBhdGggfHwgIV8uaXNTdHJpbmcodGhpcy5wYXRoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZmQgICAgICAgICAgICA9IG51bGw7XG4gICAgdGhpcy53cml0dGVuQ2h1bmtzID0gMDtcbiAgICB0aGlzLmVuZGVkICAgICAgICAgPSBmYWxzZTtcbiAgICB0aGlzLmFib3J0ZWQgICAgICAgPSBmYWxzZTtcblxuICAgIGlmIChmZENhY2hlW3RoaXMucGF0aF0gJiYgIWZkQ2FjaGVbdGhpcy5wYXRoXS5lbmRlZCAmJiAhZmRDYWNoZVt0aGlzLnBhdGhdLmFib3J0ZWQpIHtcbiAgICAgIHRoaXMuZmQgPSBmZENhY2hlW3RoaXMucGF0aF0uZmQ7XG4gICAgICB0aGlzLndyaXR0ZW5DaHVua3MgPSBmZENhY2hlW3RoaXMucGF0aF0ud3JpdHRlbkNodW5rcztcbiAgICB9IGVsc2Uge1xuICAgICAgZnMuZW5zdXJlRmlsZSh0aGlzLnBhdGgsIChlZkVycm9yKSA9PiB7XG4gICAgICAgIGJvdW5kKCgpID0+IHtcbiAgICAgICAgICBpZiAoZWZFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig1MDAsICdbRmlsZXNDb2xsZWN0aW9uXSBbd3JpdGVTdHJlYW1dIFtlbnN1cmVGaWxlXSBbRXJyb3I6XScsIGVmRXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcy5vcGVuKHRoaXMucGF0aCwgJ3IrJywgdGhpcy5wZXJtaXNzaW9ucywgKG9FcnJvciwgZmQpID0+IHtcbiAgICAgICAgICAgICAgYm91bmQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNTAwLCAnW0ZpbGVzQ29sbGVjdGlvbl0gW3dyaXRlU3RyZWFtXSBbZW5zdXJlRmlsZV0gW29wZW5dIFtFcnJvcjpdJywgb0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mZCA9IGZkO1xuICAgICAgICAgICAgICAgICAgZmRDYWNoZVt0aGlzLnBhdGhdID0gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEBtZW1iZXJPZiB3cml0ZVN0cmVhbVxuICAgKiBAbmFtZSB3cml0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbnVtIC0gQ2h1bmsgcG9zaXRpb24gaW4gYSBzdHJlYW1cbiAgICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIC0gQnVmZmVyIChjaHVuayBiaW5hcnkgZGF0YSlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFja1xuICAgKiBAc3VtbWFyeSBXcml0ZSBjaHVuayBpbiBnaXZlbiBvcmRlclxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBUcnVlIGlmIGNodW5rIGlzIHNlbnQgdG8gc3RyZWFtLCBmYWxzZSBpZiBjaHVuayBpcyBzZXQgaW50byBxdWV1ZVxuICAgKi9cbiAgd3JpdGUobnVtLCBjaHVuaywgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuYWJvcnRlZCAmJiAhdGhpcy5lbmRlZCkge1xuICAgICAgaWYgKHRoaXMuZmQpIHtcbiAgICAgICAgZnMud3JpdGUodGhpcy5mZCwgY2h1bmssIDAsIGNodW5rLmxlbmd0aCwgKG51bSAtIDEpICogdGhpcy5maWxlLmNodW5rU2l6ZSwgKGVycm9yLCB3cml0dGVuLCBidWZmZXIpID0+IHtcbiAgICAgICAgICBib3VuZCgoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlcnJvciwgd3JpdHRlbiwgYnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tGaWxlc0NvbGxlY3Rpb25dIFt3cml0ZVN0cmVhbV0gW3dyaXRlXSBbRXJyb3I6XScsIGVycm9yKTtcbiAgICAgICAgICAgICAgdGhpcy5hYm9ydCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgKyt0aGlzLndyaXR0ZW5DaHVua3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTWV0ZW9yLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMud3JpdGUobnVtLCBjaHVuaywgY2FsbGJhY2spO1xuICAgICAgICB9LCAyNSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qXG4gICAqIEBtZW1iZXJPZiB3cml0ZVN0cmVhbVxuICAgKiBAbmFtZSBlbmRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFja1xuICAgKiBAc3VtbWFyeSBGaW5pc2hlcyB3cml0aW5nIHRvIHdyaXRhYmxlU3RyZWFtLCBvbmx5IGFmdGVyIGFsbCBjaHVua3MgaW4gcXVldWUgaXMgd3JpdHRlblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBUcnVlIGlmIHN0cmVhbSBpcyBmdWxmaWxsZWQsIGZhbHNlIGlmIHF1ZXVlIGlzIGluIHByb2dyZXNzXG4gICAqL1xuICBlbmQoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuYWJvcnRlZCAmJiAhdGhpcy5lbmRlZCkge1xuICAgICAgaWYgKHRoaXMud3JpdHRlbkNodW5rcyA9PT0gdGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgICAgZnMuY2xvc2UodGhpcy5mZCwgKCkgPT4ge1xuICAgICAgICAgIGJvdW5kKCgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBmZENhY2hlW3RoaXMucGF0aF07XG4gICAgICAgICAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHZvaWQgMCwgdHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZnMuc3RhdCh0aGlzLnBhdGgsIChlcnJvciwgc3RhdCkgPT4ge1xuICAgICAgICBib3VuZCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFlcnJvciAmJiBzdGF0KSB7XG4gICAgICAgICAgICB0aGlzLndyaXR0ZW5DaHVua3MgPSBNYXRoLmNlaWwoc3RhdC5zaXplIC8gdGhpcy5maWxlLmNodW5rU2l6ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIE1ldGVvci5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5kKGNhbGxiYWNrKTtcbiAgICAgICAgICB9LCAyNSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHZvaWQgMCwgdGhpcy5lbmRlZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qXG4gICAqIEBtZW1iZXJPZiB3cml0ZVN0cmVhbVxuICAgKiBAbmFtZSBhYm9ydFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrXG4gICAqIEBzdW1tYXJ5IEFib3J0cyB3cml0aW5nIHRvIHdyaXRhYmxlU3RyZWFtLCByZW1vdmVzIGNyZWF0ZWQgZmlsZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBUcnVlXG4gICAqL1xuICBhYm9ydChjYWxsYmFjaykge1xuICAgIHRoaXMuYWJvcnRlZCA9IHRydWU7XG4gICAgZGVsZXRlIGZkQ2FjaGVbdGhpcy5wYXRoXTtcbiAgICBmcy51bmxpbmsodGhpcy5wYXRoLCAoY2FsbGJhY2sgfHwgTk9PUCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLypcbiAgICogQG1lbWJlck9mIHdyaXRlU3RyZWFtXG4gICAqIEBuYW1lIHN0b3BcbiAgICogQHN1bW1hcnkgU3RvcCB3cml0aW5nIHRvIHdyaXRhYmxlU3RyZWFtXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIFRydWVcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5hYm9ydGVkID0gdHJ1ZTtcbiAgICBkZWxldGUgZmRDYWNoZVt0aGlzLnBhdGhdO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=
