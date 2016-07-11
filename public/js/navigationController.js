bfamRssApp.controller("navigationController", ["$scope", "$location", function ($scope, $location) {
    $scope.$on("$routeChangeStart", function (next, current) {
        toggleActive();
    });

    function toggleActive() {
        switch ($location.path()) {
        case "/":
            $scope.navigationTabs = {
                homeTab: true,
                editTab: false,
                aboutTab: false
            }
            break;

        case "/edit-feeds":
            $scope.navigationTabs = {
                homeTab: false,
                editTab: true,
                aboutTab: false
            }
            break;

        case "/about":
            $scope.navigationTabs = {
                homeTab: false,
                editTab: false,
                aboutTab: true
            }
            break;

        default:
            $scope.navigationTabs = {
                homeTab: false,
                editTab: false,
                aboutTab: false
            }
            break;
        }
    }
}]);