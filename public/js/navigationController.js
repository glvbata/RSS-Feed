bfamRssApp.controller("navigationController", ["$scope", "$location", function ($scope, $location) {
    var path = $location.path();

    switch (path) {
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
            homeTab: true,
            editTab: false,
            aboutTab: false
        }
        break;
    }

    $scope.toggleActive = function (tab) {
        switch (tab) {
        case "homeTab":
            $scope.navigationTabs.homeTab = true;
            $scope.navigationTabs.editTab = false;
            $scope.navigationTabs.aboutTab = false;
            break;

        case "editTab":
            $scope.navigationTabs.homeTab = false;
            $scope.navigationTabs.editTab = true;
            $scope.navigationTabs.aboutTab = false;
            break;

        case "aboutTab":
            $scope.navigationTabs.homeTab = false;
            $scope.navigationTabs.editTab = false;
            $scope.navigationTabs.aboutTab = true;
            break;

        default:
            $scope.navigationTabs.homeTab = true;
            $scope.navigationTabs.editTab = false;
            $scope.navigationTabs.aboutTab = false;
            break;
        }
    }
}]);