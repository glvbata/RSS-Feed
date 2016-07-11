var bfamRssApp = angular.module("bfamRssApp", ["ngSanitize", "ngRoute", 'angular-loading-bar']);

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

bfamRssApp.service("authenticationService", ["$window", function ($window) {
    var saveToken = function (token) {
        $window.localStorage['user-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['user-token'];
    };

    var logout = function () {
        $window.localStorage.removeItem('user-token');
    };

    var isLoggedIn = function () {
        var token = getToken();
        var payload;

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    var currentUser = function () {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                firstName: payload.firstName,
                lastName: payload.lastName,
                username: payload.username,
            };
        }
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser
    };
}]);