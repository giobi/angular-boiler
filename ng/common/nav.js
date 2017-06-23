(function () {
    'use strict';
    angular.module('app')
        .component('navbar', {
            templateUrl: '/app/ng/common/nav.html',
            controller: nav, controllerAs: 's'
        })
    ;
    function nav(auth) {
        var s = this;
        s.auth = auth;
    }

})();