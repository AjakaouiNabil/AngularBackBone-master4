'use strict'

angular.module('App')

    .controller('homeCtrl', ['$scope', function homeCtrl($scope) {
    }])

    .controller('foodCtrl', ['$scope', 'foodSrv', "$routeParams", function ($scope, foodSrv, $routeParams) {
        $scope.categories = foodSrv.getAllcategories();
        $scope.gerechten = foodSrv.getAllgerechten(parseInt($routeParams.cat_id));
        $scope.likes = foodSrv.getAllLikes(parseInt(($routeParams.dis_id)));

        $scope.like = function () {
            foodSrv.postLikes($routeParams.dis_id,$scope.name_like);
        }

        foodSrv.getCategoryName(parseInt($routeParams.cat_id)).then(function(info) {
            $scope.cat_name = info;
        });

        foodSrv.getGerechtenName(parseInt($routeParams.dis_id)).then(function(info) {
            $scope.dis_name = info;
        });


    }]);