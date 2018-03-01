(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var UserSessionCollection, noUserError, noUserIdError, UserSession, ownsDocument;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/benjaminrh_user-session/packages/benjaminrh_user-session.js                     //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/benjaminrh:user-session/common.js                                        //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
// This collection is where the UserSession variables are ultimately stored          // 1
UserSessionCollection = new Meteor.Collection('userSessionCollection');              // 2
                                                                                     // 3
// Anonymous user error                                                              // 4
noUserError = function () {                                                          // 5
	console.log('You cannot use UserSession methods when there is no user logged in.'); // 6
}                                                                                    // 7
                                                                                     // 8
// Missing userId error                                                              // 9
noUserIdError = function () {                                                        // 10
	console.log('You cannot use UserSession methods on the server without a userId.');  // 11
}                                                                                    // 12
                                                                                     // 13
                                                                                     // 14
//=======================                                                            // 15
// = UserSession METHODS                                                             // 16
//=======================                                                            // 17
                                                                                     // 18
UserSession = {                                                                      // 19
	set: function (key, value, userId) {                                                // 20
		// Set a new variable in the user session                                          // 21
		if (Meteor.userId() || Meteor.isServer) {                                          // 22
			// If the user is logged in, update the variable in the collection                // 23
			if (typeof userId === 'undefined') {                                              // 24
				if (Meteor.isClient) userId = Meteor.userId();                                   // 25
				else if (Meteor.isServer) {                                                      // 26
					noUserIdError();                                                                // 27
					return undefined;                                                               // 28
				}                                                                                // 29
			}                                                                                 // 30
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 31
			var sv = { key: key, value: value, userId: userId };                              // 32
			if (existing) UserSessionCollection.update({ _id: existing._id }, { $set: sv });  // 33
			else UserSessionCollection.insert(sv);                                            // 34
		} else {                                                                           // 35
			//XXX Maybe we should degrade to normal Session and sync on login                 // 36
			noUserError();                                                                    // 37
		}                                                                                  // 38
	},                                                                                  // 39
	get: function (key, userId) {                                                       // 40
		// Get the value of a user session variable                                        // 41
		if (Meteor.userId() || Meteor.isServer) {                                          // 42
			if (typeof userId === 'undefined') {                                              // 43
				if (Meteor.isClient) userId = Meteor.userId();                                   // 44
				else if (Meteor.isServer) {                                                      // 45
					noUserIdError();                                                                // 46
					return undefined;                                                               // 47
				}                                                                                // 48
			}                                                                                 // 49
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 50
			if (existing) return existing.value;                                              // 51
		} else {                                                                           // 52
			noUserError();                                                                    // 53
		}                                                                                  // 54
	},                                                                                  // 55
	delete: function (key, userId) {                                                    // 56
		// Delete a user session variable, if it exists                                    // 57
		if (Meteor.userId() || Meteor.isServer) {                                          // 58
			if (typeof userId === 'undefined') {                                              // 59
				if (Meteor.isClient) userId = Meteor.userId();                                   // 60
				else if (Meteor.isServer) {                                                      // 61
					noUserIdError();                                                                // 62
					return undefined;                                                               // 63
				}                                                                                // 64
			}                                                                                 // 65
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 66
			if (existing) UserSessionCollection.remove(existing._id);                         // 67
		} else {                                                                           // 68
			noUserError();                                                                    // 69
		}                                                                                  // 70
	},                                                                                  // 71
	equals: function (key, value, userId) {                                             // 72
		// Test if a user session variable is equal to a value                             // 73
		if (Meteor.userId() || Meteor.isServer) {                                          // 74
			if (typeof userId === 'undefined') {                                              // 75
				if (Meteor.isClient) userId = Meteor.userId();                                   // 76
				else if (Meteor.isServer) {                                                      // 77
					noUserIdError();                                                                // 78
					return undefined;                                                               // 79
				}                                                                                // 80
			}                                                                                 // 81
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 82
			if (existing) return existing.value == value; //XXX Should this be ===            // 83
		} else {                                                                           // 84
			noUserError();                                                                    // 85
		}                                                                                  // 86
	},                                                                                  // 87
	list: function (userId) {                                                           // 88
		// Get all the user session variables as an object                                 // 89
		if (Meteor.userId() || Meteor.isServer) {                                          // 90
			if (typeof userId === 'undefined') {                                              // 91
				if (Meteor.isClient) userId = Meteor.userId();                                   // 92
				else if (Meteor.isServer) {                                                      // 93
					noUserIdError();                                                                // 94
					return undefined;                                                               // 95
				}                                                                                // 96
			}                                                                                 // 97
			var existing = UserSessionCollection.findOne({ userId: userId});                  // 98
			if (existing) {                                                                   // 99
				var list = {};                                                                   // 100
				UserSessionCollection.find({ userId: userId }).forEach(function (sv) {           // 101
					list[sv.key] = sv.value;                                                        // 102
				});                                                                              // 103
				return list;                                                                     // 104
			}                                                                                 // 105
		} else {                                                                           // 106
			noUserError();                                                                    // 107
		}                                                                                  // 108
	}                                                                                   // 109
};                                                                                   // 110
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/benjaminrh:user-session/server.js                                        //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
// Publish only the current user's session variables to the client                   // 1
Meteor.publish('userSessionCollection', function () {                                // 2
	return UserSessionCollection.find({ userId: this.userId });                         // 3
});                                                                                  // 4
                                                                                     // 5
// Check that the userId specified owns the documents                                // 6
ownsDocument = function (userId, doc) {                                              // 7
	return doc && doc.userId === userId;                                                // 8
}                                                                                    // 9
                                                                                     // 10
// Allow methods for UserSessionCollection (security)                                // 11
UserSessionCollection.allow({                                                        // 12
	insert: function (userId, doc) {                                                    // 13
		return ownsDocument(userId, doc);                                                  // 14
	},                                                                                  // 15
	update: function (userId, doc) {                                                    // 16
		return ownsDocument(userId, doc);                                                  // 17
	},                                                                                  // 18
	remove: function (userId, doc) {                                                    // 19
		return ownsDocument(userId, doc);                                                  // 20
	}                                                                                   // 21
});                                                                                  // 22
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['benjaminrh:user-session'] = {}, {
  UserSession: UserSession,
  UserSessionCollection: UserSessionCollection
});

})();
