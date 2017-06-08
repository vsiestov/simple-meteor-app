import angular from 'angular';
import angularMeteor from 'angular-meteor';
import appComponent from '../imports/client/app.component';
import config from '../imports/client/app.config';
import ServicesModule from '../imports/client/services/services';
import ControllersModule from '../imports/client/controllers';

import 'angular-ui-router';

angular.module('app', [
    'ui.router',
    angularMeteor,
    ServicesModule.name,
    ControllersModule.name
])
    .config(config)
    .component('app', appComponent);