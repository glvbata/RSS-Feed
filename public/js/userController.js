bfamRssApp.controller("userController", ["$scope", "$http", "$window", "$location", "authenticationService",
    function ($scope, $http, $window, $location, authenticationService) {
        $scope.onSubmitRegister = function (newUser) {
            authenticationService.register($scope.newUser)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    $location.path('/');
                });
        }

        $scope.onSubmitLogin = function (user) {
            authenticationService.login($scope.user)
                .error(function (error) {
                    console.log(error.message);
                })
                .then(function () {
                    $location.path('/edit-feeds');
                });
        }
}]);