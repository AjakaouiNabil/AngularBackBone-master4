'use strict'

angular.module('App')

    .factory('foodSrv', ['$http', '$q', function ($http, $q) {


        return {
            getAllcategories: function () {
                var array = [];
                $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/categories").then(function (response) {
                    var arr = response.data.rows;

                    for (var i = 0; i < arr.length; i++) {
                        array.push(arr[i].value);
                    }
                });
                return array;
            },
            getAllgerechten: function (cat_id) {

                var arraygerechten = [];
                $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/dishes").then(function (response) {
                    var arr = response.data.rows;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].value.cat_id == cat_id) {
                            arraygerechten.push(arr[i].value);
                        }
                    }

                });
                return arraygerechten;
            },
            getAllLikes: function (dis_id) {
                var arrayLikes = [];
                $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/likes").then(function (response) {
                    var arr = response.data.rows
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].value.dis_id == dis_id) {
                            arrayLikes.push(arr[i].value);
                        }
                    }
                });
                return arrayLikes;

            },
            postLikes: function (dis_id, name) {
                var data = {
                    'dis_id': dis_id,
                    'lik_id': 6200,
                    'name': name,
                    'type': "like"
                };
                //$http.post("https://nicolas.cloudant.com/cocktails/", JSON.stringify(data), {
                $http.post("https://nicolas.cloudant.com/dishes/", JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function () {
                    alert("edit gelukt");
                });

            },
            getCategoryName: function (cat_id) {
                var q = $q.defer();
                var cat_name = "";
                $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/categories")
                    .success(function (data, status, headers, config) {
                        /* success */
                        var arr = data.rows;

                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].value.cat_id == cat_id) {
                                console.log(arr[i].value.name + " erin ");
                                cat_name = arr[i].value.name;
                                console.log("1  " + cat_name)
                            }
                        }
                        console.log("2  " + cat_name)

                        q.resolve(cat_name);
                    });

                return q.promise;
            },
            getGerechtenName: function (dis_id) {
                var q = $q.defer();
                var cat_name = "";
                $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/dishes")
                    .success(function (data, status, headers, config) {
                        /* success */
                        var arr = data.rows;

                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].value.dis_id == dis_id) {
                                console.log(arr[i].value.name + " erin ");
                                cat_name = arr[i].value.name;
                                console.log("1  " + cat_name)
                            }
                        }
                        console.log("2  " + cat_name)

                        q.resolve(cat_name);
                    });

                return q.promise;
            },
            addIngredientstoLikes: function (dis_id) {
                var recepy = [];
                var allIngredients = [];
                var cocktailname = "";
                var cocktails_with_ingredients = [];

                $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/ingredients").then(function (response) {
                    allIngredients = response.data.rows


                    $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/dishes").then(function (response) {
                        var arr = response.data.rows;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].value.dis_id == dis_id) {
                                cocktailname = arr[i].value.name;

                            }
                        }


                        $http.get("https://nicolas.cloudant.com/dishes/_design/views/_view/dishes_with_ingredients").then(function (response) {
                                cocktails_with_ingredients = response.data.rows;
                                for (var i = 0; i < cocktails_with_ingredients.length; i++) {
                                    if (cocktails_with_ingredients[i].value.name == cocktailname) {
                                        console.log(cocktails_with_ingredients[i]);
                                        for (var j = 0; j < cocktails_with_ingredients[i].value.ingredients.length; j++) {
                                            for (var k = 0; k < allIngredients.length; k++) {
                                                if (allIngredients[k].value.ing_id == cocktails_with_ingredients[i].value.ingredients[j]) {
                                                    recepy.push(allIngredients[k].value.name)
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        );
                    });
                });
                return recepy;
            }

        }

    }])