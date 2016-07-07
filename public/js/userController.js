bfamRssApp.controller("userController", ["$scope", "$http", function ($scope, $http) {
    $scope.login = function (user) {
        $http.post("/login", user).success(function (data, status) {
            // Login probably.
            console.log(data);
        }).error(function (data, status) {
            console.log(status);
        });
    }

    $scope.register = function (newUser) {
        $http.post("/register", newUser).success(function (data, status) {
            console.log(data);
        }).error(function (data, status) {
            console.log(status);
        });
    }
}]);