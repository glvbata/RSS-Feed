bfamRssApp.controller("landingPageController", ["$scope", "$http", "$sce", "$window", "authenticationService", function ($scope, $http, $sce, $window, authenticationService) {
    $scope.initializeLandingPage = function () {
        $scope.articleLimit = 5;
    }

    $scope.loadMore = function () {
        $scope.articleLimit += 2;
    }

    $scope.getAllArticles = function () {
        if (authenticationService.isLoggedIn()) {
            var currentUser = authenticationService.currentUser().username;

            $http.get("/api/articles/" + currentUser).success(function (data, status) {
                $scope.articleList = data;
            });
        } else {
            $http.get("/api/articles/guest").success(function (data, status, header, config) {
                $scope.articleList = data;
            }).error(function (data, status, header, config) { });
        }
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