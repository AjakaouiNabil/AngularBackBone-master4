'use strict'

angular.module('App', ['ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'assets/views/home.html',
                controller: 'homeCtrl'
            })
            .when('/categories', {
                templateUrl: 'assets/views/categories.html',
                controller: 'foodCtrl'
            })
            .when('/gerechten/:cat_id', {
                templateUrl: 'assets/views/gerechten.html',
                controller: 'foodCtrl'
            })
            .when('/likes/:dis_id', {
                templateUrl: 'assets/views/likes.html',
                controller: 'foodCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    })