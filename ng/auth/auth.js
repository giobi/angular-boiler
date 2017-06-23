(function () {
    'use strict';
    angular.module('app')
        .service('auth', function (api, $http, $location) {
            this.getme = function () {
                if (this.me)
                    return this.me;

                var token = localStorage.getItem('jwt');
                if (token)
                    this.setme(token);

            };
            this.setme = function (token) {
                var self = this;
                localStorage.setItem('jwt', token);
                $http.defaults.headers.common.Authorization = token;
                return api.get('auth/me').then(function (a) {
                    return self.me = a.data.data;
                });
            };

            this.logout = function () {
                this.me = null;
                localStorage.removeItem('jwt');
                $http.defaults.headers.common.Authorization = null;
                $location.path('/login');
            };

            this.getme();

            return this;
        })
    ;
})();