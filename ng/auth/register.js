(function () {
    'use strict';
    angular.module('app')
        .controller('register', function (api, $http, $location, auth) {
            var s = this;
            s.submit = function (user) {
                api.call('auth/register', user).then(function (a) {
                    /*
                    localStorage.setItem('jwt', a.data.data);
                    $http.defaults.headers.common.Authorization = a.data.data;
                    console.log(a.data.data);
                    */
                    auth.setme(a.data.data).then(function() {
                        $location.path('/platecheck');
                    });


                });
            };

        })
        .controller('platecheck', function (api, filterFilter, $location) {
            var s = this;
            api.get('me/cars').then(function(a) {
                s.cars = a.data.data;
                s.car = s.cars[0];
                s.platecheck(s.car.plate);
            });
            api.get('kromeda/brands').then(function(a) {
                s.brands = a.data.data;
            });

            s.modelcheck = function(brand_id) {
                return api.get('kromeda/models/' + brand_id).then(function(a) {
                    s.models = a.data.data;
                });
            };

            s.versioncheck = function(model_id) {
                var model = filterFilter(s.models, {idModello: model_id})[0];
                console.log(model);

                var year = model.ModelloAnno;
                return api.get('kromeda/versions/' + model_id + '/' + year).then(function(a) {
                    s.versions = a.data.data;
                });
            };

            s.platecheck = function(plate) {
                api.get('kromeda/plate/' + plate).then(function(a) {
                    if (!a.data.data) return;
                    s.kromedacar = a.data.data.result[1].vehicles[0];
                    if (s.kromedacar.idMarca) {
                        s.car.brand_id = s.kromedacar.idMarca;

                    }
                }).then(function(a) {
                    return s.modelcheck(s.car.brand_id);
                }).then(function(a) {
                    s.car.model_id = s.kromedacar.idModello;
                    return s.versioncheck(s.car.model_id);
                }).then(function(a) {
                    s.car.version_id = s.kromedacar.idVeicolo;
                });
            };

            s.submit = function(car) {
                api.put('me/cars/' + car.id, car).then(function(a) {
                    console.log(a);
                    $location.path('/userprofiling');
                   //$location.path('#/registerprofile/');
                });
            }
        })

        .controller('registerprofile', function(api, $location) {
            var s = this;
            s.submit = function(data) {
                $location.path('/socialshare');
            }
        })

        .controller('socialshare', function(api, $location) {
            var s = this;
            s.submit = function(data) {
                $location.path('/dashboard');
            }
        })
    ;


})();