(function () {
    'use strict';
    angular.module('app', ['ngRoute', 'ngMaterial'])

        .config(function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/login/', {
                    templateUrl: 'ng/auth/login.html',
                    controller: 'login', controllerAs: 's'
                })
                .when('/register/', {
                    templateUrl: 'ng/auth/register.html',
                    controller: 'register', controllerAs: 's'
                })
                .when('/platecheck/', {
                    templateUrl: 'ng/auth/platecheck.html',
                    controller: 'platecheck', controllerAs: 's'
                })
                .when('/userprofiling/', {
                    templateUrl: 'ng/auth/registerprofile.html',
                    controller: 'registerprofile', controllerAs: 's'
                })
                .when('/socialshare/', {
                    templateUrl: 'ng/auth/socialshare.html',
                    controller: 'socialshare', controllerAs: 's'
                })

                .when('/dashboard/', {
                    templateUrl: 'ng/dashboard/dashboard.html',
                    controller: 'dashboard', controllerAs: 's'
                })
                .when('/profile/', {
                    templateUrl: 'ng/dashboard/profile.html',
                    controller: 'profile', controllerAs: 's'
                })

                .when('/preventivo/assicurazione/', {
                    templateUrl: 'ng/preventivi/assicurazione.html',
                    controller: 'insurance', controllerAs: 's'
                })
                .when('/preventivo/assicurazione/success', {
                    templateUrl: 'ng/preventivi/assicurazione-success.html',
                    controller: 'insurancesuccess', controllerAs: 's'
                })

                .when('/car/add', {
                    templateUrl: 'ng/car/car-new.html',
                    controller: 'carnew', controllerAs: 's'
                })
                .otherwise({redirectTo: '/register/'})
            ;

            $httpProvider.interceptors.push('ErrorsInterceptor');

            var token = localStorage.getItem('jwt');
            if (token) {
                $httpProvider.defaults.headers.common.Authorization = token;
            }
        });

})();