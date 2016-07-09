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

bfamRssApp.service("authenticationService", ["$http", "$window", "$rootScope", function ($http, $window, $rootScope) {
    var saveToken = function (token) {
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['mean-token'];
    };

    var logout = function () {
        $window.localStorage.removeItem('mean-token');
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
                email: payload.email
            };
        }
    };

    var register = function (user) {
        return $http.post('/api/user/register', user).success(function (data) {
            saveToken(data.token);
        });
    };

    var login = function (user) {
        return $http.post('/api/user/login', user).success(function (data) {
            saveToken(data.token);
        });
    }

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        login: login,
        register: register,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser
    };
}]);

bfamRssApp.run(function ($rootScope, $location, authenticationService) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if ($location.path() === '/edit-feeds' && !authenticationService.isLoggedIn()) {
            $location.path('/login');
        }
    });
});