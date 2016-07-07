bfamRssApp.controller("landingPageController", ["$scope", "$http", "$sce", "$window", function ($scope, $http, $sce, $window) {
    $scope.initializeLandingPage = function () {
        $scope.articleLimit = 5;
    }

    $scope.loadMore = function () {
        $scope.articleLimit += 2;
    }

    $scope.getAllArticles = function () {
        $http({
            url: "/api/feeds/articles",
            method: "GET"
        }).success(function (data, status, header, config) {
            $scope.articleList = data;
        }).error(function (data, status, header, config) {});
    };

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