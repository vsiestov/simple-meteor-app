import { MongoClient } from 'mongodb';
import Future from 'fibers/future';

export class Collection {

    constructor(collectionName) {
        this.server = 'mongodb://localhost:27017/meteor';
        this.collectionName = collectionName;
        this.db = this.connect();
    }

    connect() {
        const future = new Future();

        MongoClient.connect(this.server, (err, db) => {

            if (err) {
                console.error('connect', err);
            }

            future.return(db);
        });

        return future.wait();
    }

    insert(params) {
        const future = new Future();

        const db = this.db;
        const collection = db.collection(this.collectionName);

        const insertComplete = (err, response) => {
            if (err) {
                console.error('insert', err);
                future.throw(err);
            } else if (response) {
                future.return(response.insertedId);

            }
        };

        if (params instanceof Array) {
            collection.insertMany(params, insertComplete);
        } else {
            collection.insertOne(params, insertComplete);
        }

        return future.wait();
    }

    update(selector, modifier) {
        const future = new Future();
        const db = this.db;
        const collection = db.collection(this.collectionName);

        collection.update(selector, modifier, null, (err, response) => {

            if (err) {
                console.error('update', err);

            }

            future.return(response.result.nModified);
        });

        return future.wait();
    }

    remove(selector) {
        const future = new Future();
        const db = this.db;
        const collection = db.collection(this.collectionName);

        collection.remove(selector, (err, response) => {

            if (err) {
                console.error('remove', err);
            }

            future.return(response.result.n);
        });

        return future.wait();
    }

    findOne(inputSelector) {
        const future = new Future();

        const db = this.db;
        const collection = db.collection(this.collectionName);

        let selector;

        if (typeof inputSelector === 'string') {

            selector = {
                _id: inputSelector
            };

        } else {
            selector = inputSelector;
        }

        collection.findOne(selector, (err, item) => {

            if (err) {
                console.error('find One', err);
            }

            future.return(item);
        });

        return future.wait();
    }

    find(inputSelector) {
        const future = new Future();

        const db = this.db;
        const collection = db.collection(this.collectionName);

        let selector;

        if (typeof inputSelector === 'string') {

            selector = {
                _id: inputSelector
            };

        } else {
            selector = inputSelector;
        }

        collection.find(selector).toArray((err, items) => {

            if (err) {
                console.error('find', err);
            }

            future.return({
                fetch: () => {

                    return items;
                }
            });

        });

        return future.wait();
    }

    _ensureIndex(keys, options) {
        const future = new Future();

        const db = this.db;
        const collection = db.collection(this.collectionName);

        collection.ensureIndex(keys, options, (err, indexName) => {

            if (err) {
                console.error('index', err);
            }

            future.return(indexName);
        });

        return future.wait();
    }
}
