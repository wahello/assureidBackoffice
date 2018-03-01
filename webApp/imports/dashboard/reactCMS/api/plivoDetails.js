export const PlivoDetails = new Mongo.Collection('plivoDetails');
Meteor.publish('plivoDetails', function() {
  return PlivoDetails.find();
});