(function () {
    'use strict';
    angular.module('app')

        .controller('profile', function (api, $location) {
            var s = this;
            api.get('auth/me').then(function (a) {
                s.user = a.data.data;
                //Materialize.updateTextFields(); $('.input').change();
            });

            s.submit = function(user) {
                api.put('me/update', user).then(function(a) {
                    //$location.path('/dashboard');
                });
            };

            s.submitlicense = function(license) {
                api.post('me/licenses', license).then(function(a) {

                });
            };

        });

})();