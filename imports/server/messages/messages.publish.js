import { Meteor } from 'meteor/meteor';
import { Messages } from './messages.module';

/* eslint no-invalid-this: off */

Meteor.publish('messages', function () {

    if (!this.userId) {
        return [];
    }

    return Messages.read({
        userId: userId
    })

});
