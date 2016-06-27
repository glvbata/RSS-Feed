var bfamRssApp = angular.module("bfamRssApp", ["ngSanitize", "ngRoute"]);

bfamRssApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "about.html"
    }).when("/landing-page", {
        templateUrl: "landingPage.html"
    }).when("/edit-feeds", {
        templateUrl: "editFeeds.html"
    }).otherwise({
        redirectTo: "/"
    });
}]);