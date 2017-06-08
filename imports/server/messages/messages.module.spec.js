/* eslint global-require: off */
/* eslint no-invalid-this: off */
/* eslint max-nested-callbacks: off */

import td from 'testdouble';
import { expect } from 'chai';
import SimpleSchema from 'node-simple-schema';
import { Collection } from '../../../tests/mongo-collections';
import Future from 'fibers/future';

describe('Messages tests', function () {

    let Messages;
    let MessagesCollection;

    const Mongo = {
        Collection: Collection
    };

    const Meteor = {
        call: function (method) {
            console.log('call method: ', method);
        },
        Error: Error,
        userId: () => {
            return 0;
        },
        user: () => {
            return {
                _id: '-1',
                profile: {
                    alert: {
                        name: false,
                        sms: true
                    }
                }
            };
        },
    };

    before((done) => {

        global.SimpleSchema = SimpleSchema;

        td.replace("meteor/meteor", {
            Meteor
        });

        td.replace("meteor/mongo", {
            Mongo
        });

        Future.task(() => {
            Messages = require('./messages.module').Messages;
            MessagesCollection = require('../../collections/messages.collection').MessagesCollection;
            done();
        }).detach();
    });

    after((done) => {
        Future.task(() => {
            MessagesCollection.remove({});
            done();
        }).detach();

        td.reset();
    });

    it('should create a message', (done) => {
        Future.task(() => {
            Messages.create({
                text: 'Hello',
                updatedAt: new Date(),
                createdAt: new Date(),
                userId: '-1'
            });

            const message = MessagesCollection.findOne({
                userId: '-1'
            });

            expect(message.userId).to.equal('-1');
            expect(message.text).to.equal('Hello');

            done();
        }).detach();
    });

    it('should update a message', (done) => {
        Future.task(() => {

            const newMessageId = Messages.create({
                _id: 'messageId',
                text: 'For update',
                updatedAt: new Date(),
                createdAt: new Date(),
                userId: '-1'
            });

            Messages.update({
                _id: 'messageId',
                text: 'Updated',
                updatedAt: new Date(),
            });

            const message = MessagesCollection.findOne({
                _id: newMessageId,
            });


            expect(message.text).to.equal('Updated');

            done();
        }).detach();
    });

    it('should delete a message', (done) => {
        Future.task(() => {

            const deleteId = Messages.create({
                _id: 'delete-message-id',
                text: 'For delete',
                updatedAt: new Date(),
                createdAt: new Date(),
                userId: '-1'
            });

            Messages.remove({
                _id: 'delete-message-id'
            });

            const message = MessagesCollection.findOne({
                _id: deleteId,
            });


            expect(message).to.equal(null);

            done();
        }).detach();
    });

    it('should read the list of messages', (done) => {
        Future.task(() => {

            const list = Messages.read({
            }).fetch();


            expect(list.length).to.equal(MessagesCollection.find({}).fetch().length);

            done();
        }).detach();
    });

});