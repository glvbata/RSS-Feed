bfamRssApp.controller("userController", ["$scope", "$http", "$window", "$location", "$rootScope",
    function ($scope, $http, $window, $location, $rootScope) {
        setCurrentUserState();

        function saveToken(token) {
            $window.localStorage['user-token'] = token;
        };

        function getToken() {
            return $window.localStorage['user-token'];
        };

        function isLoggedIn() {
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

        function currentUser() {
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

        function setCurrentUserState() {
            $scope.isLoggedIn = isLoggedIn();
            $scope.currentUser = currentUser();
        }

        $scope.loginUser = function (user) {
            $http.post('/api/user/login', user).success(function (data, status) {
                saveToken(data.token);
                setCurrentUserState();
                $location.path('/edit-feeds');
            });
        }

        $scope.registerUser = function (newUser) {
            $http.post('/api/user/register', newUser).success(function (data, status) {
                saveToken(data.token);
                setCurrentUserState();
                $location.path('/');
            });
        }

        $scope.logoutUser = function () {
            $window.localStorage.removeItem('user-token');
            setCurrentUserState();
            $location.path("/");
        }

        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if ($location.path() === '/edit-feeds' && !isLoggedIn()) {
                $location.path('/login');
            }
        });
}]);