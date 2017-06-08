import LoginController from './login/login.controller';
import RegistrationController from './registration/registration.controller';
import HomeController from './home/home.controller'

export default angular.module('ControllersModule', [])
    .controller('LoginController', LoginController)
    .controller('RegistrationController', RegistrationController)
    .controller('HomeController', HomeController);