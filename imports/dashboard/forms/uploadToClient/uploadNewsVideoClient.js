import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const NewsVideo = new FilesCollection({
    collectionName: 'NewsVideo',
    allowClientCode: false,
    chunkSize: 1024 * 1024
});
 