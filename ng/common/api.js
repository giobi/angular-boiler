(function () {
    'use strict';
    angular.module('app')

        .service('api', function ($http) {
            return {
                base: '/api/0/',
                call: function (url, input, verb) {
                    if (!verb) verb = 'post';
                    url = this.base + url;
                    return $http[verb](url, input);
                },
                get: function (url, input) {
                    return this.call(url, input, 'get');
                },
                post: function (url, input) {
                    return this.call(url, input, 'post');
                },
                put: function (url, input) {
                    return this.call(url, input, 'put');
                },
                delete: function (url, input) {
                    return this.call(url, input, 'delete');
                }


            };
        })
    ;


})();