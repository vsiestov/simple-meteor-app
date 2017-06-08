import angular from 'angular';
import AuthRegService from './auth-reg.service';
import MessagesService from './messages.service';

const ServicesModule = angular.module('common', [])
    .service('authRegService', AuthRegService)
    .service('messagesService', MessagesService);

export default ServicesModule;