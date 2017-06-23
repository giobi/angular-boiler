(function () {
    'use strict';
    angular.module('app')

        .controller('car', function (api) {
            var s = this;
            api.get('auth/me').then(function (a) {
                s.user = a.data.data;
            });

            api.get('me/cars').then(function (a) {
                s.cars = a.data.data;
            });
        })

        .controller('carnew', function (api, filterFilter) {
            var s = this;

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
                        s.car.brand_id = s.kromedacar.Marca;

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
                api.post('me/cars', car).then(function(a) {
                   $location.path('#/dashboard');
                });
            }
        });

})();