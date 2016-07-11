bfamRssApp.controller("userController", ["$scope", "$http", "$location", "$rootScope", "authenticationService", 
    function ($scope, $http, $location, $rootScope, authenticationService) {
        setCurrentUserState();

        function setCurrentUserState() {
            $scope.isLoggedIn = authenticationService.isLoggedIn();
            $scope.currentUser = authenticationService.currentUser();
        }

        $scope.loginUser = function (user) {
            $http.post('/api/user/login', user).success(function (data, status) {
                authenticationService.saveToken(data.token);
                setCurrentUserState();
                $location.path('/edit-feeds');
            });
        }

        $scope.registerUser = function (newUser) {
            $http.post('/api/user/register', newUser).success(function (data, status) {
                authenticationService.saveToken(data.token);
                setCurrentUserState();
                $location.path('/');
            });
        }

        $scope.logoutUser = function () {
            authenticationService.logout();
            setCurrentUserState();
            $location.path("/");
        }

        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if ($location.path() === '/edit-feeds' && !authenticationService.isLoggedIn()) {
                $location.path('/login');
            }
        });
}]);