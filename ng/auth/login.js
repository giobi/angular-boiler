(function () {
    'use strict';
    angular.module('app')

        .controller('login', function (api, $location, auth) {
            var s = this;
            s.submit = function (user) {
                api.call('auth/login', user).then(function (a) {
                    /*
                    $http.defaults.headers.common.Authorization = a.data.data;
                    localStorage.setItem('jwt', a.data.data);
                    console.log(a.data.data);
                    */
                    auth.setme(a.data.data).then(function() {
                        $location.path('/dashboard');
                    });
                    //$location.path('/dashboard');
                });
            };

        });

})();