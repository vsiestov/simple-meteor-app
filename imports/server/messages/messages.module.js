import { MessagesCollection } from '../../collections/messages.collection';
import { MessageSchema } from './messages.schema';
import { Meteor } from 'meteor/meteor';

export class Messages {

    /**
     * @param {MessageType} params - message
     */
    static checkSchema(params) {
        const context = MessageSchema.newContext();

        if (!context.validate(params)) {
            const invalidKeys = context.invalidKeys();

            console.error('Invalid keys', invalidKeys, 'params', params);
            return false;
        }

        return true
    }

    /**
     * @param {MessageType} params - message
     */
    static create(params) {
        if (!Messages.checkSchema(params)) {
            throw new Meteor.Error('invalid-params', 'Passed params don\'t match the schema!');
        }

        return MessagesCollection.insert(params);
    }

    /**
     * @param {MessageType} params - message
     */
    static read(params) {
        return MessagesCollection.find(params);
    }

    /**
     * @param {MessageType} params - message
     */
    static update(params) {
        if (!Messages.checkSchema(params)) {
            throw new Meteor.Error('invalid-params', 'Passed params don\'t match the schema!');
        }

        return MessagesCollection.update({
            _id: params._id
        }, {
            $set: params
        });
    }

    /**
     * @param {MessageType} params - message
     */
    static remove(params) {
        return MessagesCollection.remove(params)
    }
}