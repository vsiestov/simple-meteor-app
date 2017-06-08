import { Meteor } from 'meteor/meteor';

export default class MessagesService {
    constructor($q) {
        this.$q = $q;
    }

    remove(params) {
        const deferred = this.$q.defer();

        Meteor.call('message.remove', params, (err, response) => {
            if (err) {
                return deferred.reject(err);
            }

            return deferred.resolve(response);
        });

        return deferred.promise;
    }
}

MessagesService.$inject = ['$q'];