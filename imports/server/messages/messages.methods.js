import { Meteor } from 'meteor/meteor';
import { Messages } from './messages.module';

Meteor.methods({
    'message.insert': function (params) {

        if (!this.userId) {
            return new Meteor.Error('You are not authorized');
        }

        return Messages.create(params);
    },

    'message.update': function (params) {

        if (!this.userId) {
            return new Meteor.Error('You are not authorized');
        }

        return Messages.update(params);
    },

    'message.remove': function (params) {

        if (!this.userId) {
            return new Meteor.Error('You are not authorized');
        }

        return Messages.remove(params);
    }
});