bfamRssApp.controller("mainController", ["$scope", "$location", "$http", "$sce", function ($scope, $location, $http, $sce) {

    $scope.getAllFeeds = function () {
        $http({
            url: "/api/feedsService/getAllArticles",
            method: "GET"
        }).success(function (data, status, header, config) {
            $scope.feedList = data;
        }).error(function (data, status, header, config) {});
    };

    $scope.getOneFeed = function () {

    }

    $scope.deleteFeed = function () {


    }

    $scope.updateFeed = function () {

    }

    $scope.insertFeed = function () {

    }
}]);