bfamRssApp.controller("mainController", ["$scope", "$location", "$http", "$sce", "$window", function ($scope, $location, $http, $sce, $window) {

    $scope.initializeLandingPage = function () {
        $scope.feedLimit = 5;
    }

    $scope.loadMore = function () {
        $scope.feedLimit += 2;
    }

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

    angular.element($window).bind("scroll", function () {
        var windowHeight = window.innerHeight;
        var body = document.body;
        var html = document.documentElement;

        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight - 1) {
            $scope.loadMore();
            $scope.$apply();
        }
    });
}]);