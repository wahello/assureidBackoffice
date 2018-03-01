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
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var UserSessionCollection, noUserError, noUserIdError, UserSession;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/benjaminrh_user-session/packages/benjaminrh_user-session.js                     //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
(function () {                                                                              // 1
                                                                                            // 2
///////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                   //     // 4
// packages/benjaminrh:user-session/common.js                                        //     // 5
//                                                                                   //     // 6
///////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                     //     // 8
// This collection is where the UserSession variables are ultimately stored          // 1   // 9
UserSessionCollection = new Meteor.Collection('userSessionCollection');              // 2   // 10
                                                                                     // 3   // 11
// Anonymous user error                                                              // 4   // 12
noUserError = function () {                                                          // 5   // 13
	console.log('You cannot use UserSession methods when there is no user logged in.'); // 6   // 14
}                                                                                    // 7   // 15
                                                                                     // 8   // 16
// Missing userId error                                                              // 9   // 17
noUserIdError = function () {                                                        // 10  // 18
	console.log('You cannot use UserSession methods on the server without a userId.');  // 11  // 19
}                                                                                    // 12  // 20
                                                                                     // 13  // 21
                                                                                     // 14  // 22
//=======================                                                            // 15  // 23
// = UserSession METHODS                                                             // 16  // 24
//=======================                                                            // 17  // 25
                                                                                     // 18  // 26
UserSession = {                                                                      // 19  // 27
	set: function (key, value, userId) {                                                // 20  // 28
		// Set a new variable in the user session                                          // 21  // 29
		if (Meteor.userId() || Meteor.isServer) {                                          // 22  // 30
			// If the user is logged in, update the variable in the collection                // 23  // 31
			if (typeof userId === 'undefined') {                                              // 24  // 32
				if (Meteor.isClient) userId = Meteor.userId();                                   // 25  // 33
				else if (Meteor.isServer) {                                                      // 26  // 34
					noUserIdError();                                                                // 27  // 35
					return undefined;                                                               // 28  // 36
				}                                                                                // 29  // 37
			}                                                                                 // 30  // 38
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 31  // 39
			var sv = { key: key, value: value, userId: userId };                              // 32  // 40
			if (existing) UserSessionCollection.update({ _id: existing._id }, { $set: sv });  // 33  // 41
			else UserSessionCollection.insert(sv);                                            // 34  // 42
		} else {                                                                           // 35  // 43
			//XXX Maybe we should degrade to normal Session and sync on login                 // 36  // 44
			noUserError();                                                                    // 37  // 45
		}                                                                                  // 38  // 46
	},                                                                                  // 39  // 47
	get: function (key, userId) {                                                       // 40  // 48
		// Get the value of a user session variable                                        // 41  // 49
		if (Meteor.userId() || Meteor.isServer) {                                          // 42  // 50
			if (typeof userId === 'undefined') {                                              // 43  // 51
				if (Meteor.isClient) userId = Meteor.userId();                                   // 44  // 52
				else if (Meteor.isServer) {                                                      // 45  // 53
					noUserIdError();                                                                // 46  // 54
					return undefined;                                                               // 47  // 55
				}                                                                                // 48  // 56
			}                                                                                 // 49  // 57
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 50  // 58
			if (existing) return existing.value;                                              // 51  // 59
		} else {                                                                           // 52  // 60
			noUserError();                                                                    // 53  // 61
		}                                                                                  // 54  // 62
	},                                                                                  // 55  // 63
	delete: function (key, userId) {                                                    // 56  // 64
		// Delete a user session variable, if it exists                                    // 57  // 65
		if (Meteor.userId() || Meteor.isServer) {                                          // 58  // 66
			if (typeof userId === 'undefined') {                                              // 59  // 67
				if (Meteor.isClient) userId = Meteor.userId();                                   // 60  // 68
				else if (Meteor.isServer) {                                                      // 61  // 69
					noUserIdError();                                                                // 62  // 70
					return undefined;                                                               // 63  // 71
				}                                                                                // 64  // 72
			}                                                                                 // 65  // 73
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 66  // 74
			if (existing) UserSessionCollection.remove(existing._id);                         // 67  // 75
		} else {                                                                           // 68  // 76
			noUserError();                                                                    // 69  // 77
		}                                                                                  // 70  // 78
	},                                                                                  // 71  // 79
	equals: function (key, value, userId) {                                             // 72  // 80
		// Test if a user session variable is equal to a value                             // 73  // 81
		if (Meteor.userId() || Meteor.isServer) {                                          // 74  // 82
			if (typeof userId === 'undefined') {                                              // 75  // 83
				if (Meteor.isClient) userId = Meteor.userId();                                   // 76  // 84
				else if (Meteor.isServer) {                                                      // 77  // 85
					noUserIdError();                                                                // 78  // 86
					return undefined;                                                               // 79  // 87
				}                                                                                // 80  // 88
			}                                                                                 // 81  // 89
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});        // 82  // 90
			if (existing) return existing.value == value; //XXX Should this be ===            // 83  // 91
		} else {                                                                           // 84  // 92
			noUserError();                                                                    // 85  // 93
		}                                                                                  // 86  // 94
	},                                                                                  // 87  // 95
	list: function (userId) {                                                           // 88  // 96
		// Get all the user session variables as an object                                 // 89  // 97
		if (Meteor.userId() || Meteor.isServer) {                                          // 90  // 98
			if (typeof userId === 'undefined') {                                              // 91  // 99
				if (Meteor.isClient) userId = Meteor.userId();                                   // 92  // 100
				else if (Meteor.isServer) {                                                      // 93  // 101
					noUserIdError();                                                                // 94  // 102
					return undefined;                                                               // 95  // 103
				}                                                                                // 96  // 104
			}                                                                                 // 97  // 105
			var existing = UserSessionCollection.findOne({ userId: userId});                  // 98  // 106
			if (existing) {                                                                   // 99  // 107
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
///////////////////////////////////////////////////////////////////////////////////////     // 119
                                                                                            // 120
}).call(this);                                                                              // 121
                                                                                            // 122
                                                                                            // 123
                                                                                            // 124
                                                                                            // 125
                                                                                            // 126
                                                                                            // 127
(function () {                                                                              // 128
                                                                                            // 129
///////////////////////////////////////////////////////////////////////////////////////     // 130
//                                                                                   //     // 131
// packages/benjaminrh:user-session/client.js                                        //     // 132
//                                                                                   //     // 133
///////////////////////////////////////////////////////////////////////////////////////     // 134
                                                                                     //     // 135
// Subscribe to the user's session variables on the client                           // 1   // 136
Meteor.subscribe('userSessionCollection');                                           // 2   // 137
///////////////////////////////////////////////////////////////////////////////////////     // 138
                                                                                            // 139
}).call(this);                                                                              // 140
                                                                                            // 141
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
