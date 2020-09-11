import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');
//method parametresinde iki islem yer almaktadir, burada not ekleme - not silme 
Meteor.methods({
    'notes.insert'(text) {
        check(text, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Meteor.call('notes.insert', text);
    },
    'notes.remove'(note) {
        check(note._id, String);
        Notes.remove(note._id)
    }
});