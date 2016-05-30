import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import faker from 'faker';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Lists } from '../lists/lists.js';

class NotesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        const result = super.insert(ourDoc, callback);
        return result;
    }
    update(selector, modifier) {
        const result = super.update(selector, modifier);
        return result;
    }
    remove(selector) {
        const notes = this.find(selector).fetch();
        const result = super.remove(selector);
        return result;
    }
}

export const Notes = new NotesCollection('Notes');

// Deny all client-side updates since we will be using methods to manage this collection
Notes.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Notes.schema = new SimpleSchema({
    listId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    content: {
        type: String,
        max: 10000,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
});

Notes.attachSchema(Notes.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Notes.publicFields = {
    listId: 1,
    text: 1,
    createdAt: 1,
};


Factory.define('note', Notes, {
    listId: () => Factory.get('list'),
    content: () => faker.lorem.sentence(),
    createdAt: () => new Date(),
});

Notes.helpers({
    list() {
        return Lists.findOne(this.listId);
    },
    editableBy(userId) {
        return this.list().editableBy(userId);
    },
});
