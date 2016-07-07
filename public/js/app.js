var bfamRssApp = angular.module("bfamRssApp", ["ngSanitize", "ngRoute"]);

bfamRssApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "landingPage.html",
        controller: "landingPageController"
    }).when("/about", {
        templateUrl: "about.html"
    }).when("/edit-feeds", {
        templateUrl: "editFeeds.html",
        controller: "editController"
    }).when("/login", {
        templateUrl: "loginPage.html",
        controller: "userController"
    }).when("/register", {
        templateUrl: "registrationPage.html",
        controller: "userController"
    }).otherwise({
        redirectTo: "/"
    });
}]);