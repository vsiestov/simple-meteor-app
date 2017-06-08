import { MessagesCollection } from '../../collections/messages.collection';

export default class HomeController {
    constructor(
        $state,
        $scope,
        $reactive,
        authRegService,
        messagesService
    ) {
        $reactive(this).attach($scope);

        this.$state = $state;
        this.authRegService = authRegService;
        this.messagesService = messagesService;

        this.helpers({
            list() {
                return MessagesCollection.find({
                });
            }
        });
    }

    deleteMessage(item) {
        // B) Delete a message they own from the system, **ONLY** using a server side call

        this.messagesService.remove({
            _id: item._id
        })
            .catch((error) => {
                console.error(error);
                alert(error.reason);
            })
    }

    addMessage(message) {
        const now = new Date();

        // A) Post a message to the system - without an explicit server side call

        MessagesCollection.insert({
            userId: Meteor.userId(),
            text: message,
            createdAt: now,
            updatedAt: now
        });

        this.message = '';
    }

    logout() {
        this.authRegService.logout()
            .then(() => {
                this.$state.go('login');
            })
            .catch((error) => {
                console.error(error);
                alert(error.reason);
            })
    }
}

HomeController.$inject = [
    '$state',
    '$scope',
    '$reactive',
    'authRegService',
    'messagesService'
];