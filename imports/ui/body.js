import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './task.js';
import './body.html';

// on created
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

// helpers
Template.body.helpers({
  // Tasks
  tasks()  {
    const instance = Template.instance();

    // If hide completed is checked, filter tasks
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  // Incomplete Count
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

// events
Template.body.events({
  // new task added
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  // hide complete clicked
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
