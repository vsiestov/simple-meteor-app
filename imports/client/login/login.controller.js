export default class LoginController {
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
        this.authRegService.login(this.form.email, this.form.password)
            .then(() => {
                this.$state.go('home');
            })
            .catch((error) => {
                console.log(error);
                alert(error.reason);
            });
    }


}

LoginController.$inject = [
    '$state',
    'authRegService'
];