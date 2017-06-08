import loginTemplate from './login/login.template.html';
import registrationTemplate from './registration/registration.template.html'
import homeTemplate from './home/home.template.html'

const isNotAuth = ['$q', '$state', ($q, $state) => {
    const deferred = $q.defer();

    if (Meteor.userId()) {

        setTimeout(() => {
            deferred.reject({
                message: 'User is authorized'
            });

            $state.go('home');
        }, 1000);

    } else {
        deferred.resolve();
    }

    return deferred.promise;
}];

const isAuth = ['$q', '$state', ($q, $state) => {
    const deferred = $q.defer();

    if (Meteor.userId()) {
        deferred.resolve();
    } else {
        setTimeout(() => {
            deferred.reject({
                message: 'User is not authorized'
            });

            $state.go('login');
        }, 1000);
    }

    return deferred.promise;
}];

function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: loginTemplate,
            controller: 'LoginController',
            controllerAs: 'login',
            resolve: {
                isAuth: isNotAuth
            }
        })
        .state('registration', {
            url: '/registration',
            templateUrl: registrationTemplate,
            controller: 'RegistrationController',
            controllerAs: 'reg',
            resolve: {
                isAuth: isNotAuth
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: homeTemplate,
            controller: 'HomeController',
            controllerAs: 'home',
            resolve: {
                isAuth: isAuth
            }
        });

    $urlRouterProvider.otherwise("/login");

    $locationProvider.html5Mode(true);
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default config;