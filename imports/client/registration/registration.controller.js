
export default class RegistrationController {
    constructor(
        $state,
        authRegService
    ) {
        this.form = {
            email: '',
            password: ''
        };

        this.$state = $state;
        this.authRegService = authRegService;
    }

    submitForm() {
        this.authRegService.registration(this.form)
            .then(() => {
                this.$state.go('home');
            })
            .catch((error) => {
                console.log(error);
                alert(error.reason);
            });
    }
}

RegistrationController.$inject = [
    '$state',
    'authRegService'
];