import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const TicketImages = new FilesCollection({
    collectionName: 'TicketImages',
    allowClientCode: false,
    chunkSize: 1024 * 1024
});
