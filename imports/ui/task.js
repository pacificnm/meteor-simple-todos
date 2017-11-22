import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import './task.html';

// helpers
Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

// events
Template.task.events({
  // Set the checked property to the opposite of its current value
  'click .toggle-checked'() {
     Meteor.call('tasks.setChecked', this._id, !this.checked);
  },

  // click delete
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },

  // click private
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});
