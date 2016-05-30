import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import { Todos } from '../todos/todos.js';
import { Notes } from '../notes/notes.js';

class ListsCollection extends Mongo.Collection {
  insert_todo(list, callback) {
    const ourList = list;
    if (!ourList.name) {
      let nextLetter = 'A';
      ourList.name = `List ${nextLetter}`;

      while (!!this.findOne({ name: ourList.name })) {
        // not going to be too smart here, can go past Z
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        ourList.name = `List ${nextLetter}`;
      }
    }
    ourList.type = 'todo';
    return super.insert(ourList, callback);
  }

  insert_note(list, callback) {
    const ourList = list;
    if (!ourList.name) {
      let nextLetter = 'A';
      ourList.name = `Note ${nextLetter}`;

      while (!!this.findOne({ name: ourList.name })) {
        // not going to be too smart here, can go past Z
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        ourList.name = `Note ${nextLetter}`;
      }
    }
    ourList.type = 'note';
    return super.insert(ourList, callback);
  }

  remove(selector, callback) {
    Todos.remove({ listId: selector });
    return super.remove(selector, callback);
  }

  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
}

export const Lists = new ListsCollection('Lists');

// Deny all client-side updates since we will be using methods to manage this collection
Lists.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Lists.schema = new SimpleSchema({
  name: { type: String },
  type: { type: String, max: 4 },
  incompleteCount: { type: Number, optional: true },
  content: {type: String, max: 10000, optional: true },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

Lists.attachSchema(Lists.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Lists.publicFields = {
  name: 1,
  type: 1,
  incompleteCount: 1,
  content: 1,
  userId: 1,
};

Factory.define('list', Lists, {});

Lists.helpers({
  // A list is considered to be private if it has a userId set
  isPrivate() {
    return !!this.userId;
  },
  isLastPublicList() {
    const publicListCount = Lists.find({ userId: { $exists: false } }).count();
    return !this.isPrivate() && publicListCount === 1;
  },
  editableBy(userId) {
    if (!this.userId) {
      return true;
    }

    return this.userId === userId;
  },
  todos() {
    return Todos.find({ listId: this._id }, { sort: { createdAt: -1 } });
  },
});
