import { Meteor } from 'meteor/meteor';

export default class AuthRegService {
    constructor(
        $q
    ) {
        this.$q = $q;
    }

    login(email, password) {
        const deferred = this.$q.defer();

        Meteor.loginWithPassword(email, password, () => {
            deferred.resolve();
        });

        return deferred.promise;
    }

    logout() {
        const deferred = this.$q.defer();

        Meteor.logout(() => {
            deferred.resolve();
        });

        return deferred.promise;
    }

    registration(params) {
        const deferred = this.$q.defer();

        Accounts.createUser(params, (response) => {

            if (response && response.error) {
                return deferred.reject(response);
            }

            return deferred.resolve(response);
        });

        return deferred.promise;
    }
}

AuthRegService.$inject = ['$q'];