(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var Plivo;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/pfafman_plivo/packages/pfafman_plivo.js                       //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/pfafman:plivo/plivo_npm.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Plivo = Npm.require('plivo');                                        // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['pfafman:plivo'] = {}, {
  Plivo: Plivo
});

})();
