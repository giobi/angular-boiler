(function () {
    'use strict';
    angular.module('app')
        .factory('ErrorsInterceptor', function ($q, $location, $injector) {
            return {
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    var messages = [];

                    //Handle other statuses..

                    if (rejection.status == 422) {
                        angular.forEach(rejection.data, function (value) {
                            angular.forEach(value, function (message) {
                                messages.push(message);
                            });
                        });

                        Materialize.toast(messages, 4000);
                    }

                    if (rejection.status == 400 || rejection.status == 401) {
                        Materialize.toast(rejection.data.message, 4000);
                    }

                    return $q.reject(rejection);
                }
            }
        });
})();
