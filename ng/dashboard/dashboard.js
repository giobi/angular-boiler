(function () {
    'use strict';
    angular.module('app')

        .controller('dashboard', function (api) {
            var s = this;
            api.get('auth/me').then(function (a) {
                s.user = a.data.data;
            });

            api.get('me/cars').then(function (a) {
                s.cars = a.data.data;
            });
        });

})();