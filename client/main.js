import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});


import './main.html';

Template.body.helpers({
  /* notes: [
     { text: 'My Note 1' },
     { text: 'My Note 2' },
     { text: 'My Note 3' },
   ]*/
  notes() {
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function () {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Notes.insert({
      text,
      ceratedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    target.text.value = '';

    $('#addModal').modal('close');
    return false;
  }
});

Template.note.events({
  'click .delete': function () {

    Meteor.call('notes.remove', this);
    return false;
  }
})