(function () {
    'use strict';
    angular.module('app')
        .controller('insurance', function (api, $location) {
            var s = this;
            s.submit = function(request) {
                $location.path('/preventivo/assicurazione/success')
            };
        })
        .controller('insurancesuccess', function(api) {

        })
    ;
})();