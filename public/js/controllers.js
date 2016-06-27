bfamRssApp.controller("mainController", ["$scope", "$location", "$http", "$sce", function ($scope, $location, $http, $sce) {

    getAllFeeds();

    function getAllFeeds() {
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