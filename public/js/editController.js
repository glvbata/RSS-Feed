bfamRssApp.controller("editController", ["$scope", "$http", "authenticationService", function ($scope, $http, authenticationService) {
    function setIsEditingFeed() {
        for (var i = 0; i < $scope.feedList.length; i++) {
            $scope.feedList[i].isEditing = false;
        }
    }

    $scope.toggleEdit = function (feed) {
        feed.isEditing = !feed.isEditing;

        if (feed.isEditing) {
            $scope.temporaryFeed = angular.copy(feed);
        }
    }

    $scope.toggleAdd = function () {
        $scope.isAdding = !$scope.isAdding;

        if ($scope.isAdding) {
            $scope.addButton = "Cancel";
        } else {
            $scope.addButton = "Add";
        }
    }

    $scope.getAllFeeds = function () {
        $http.get("/api/feeds/" + authenticationService.currentUser().username).success(function (data, status) {
            $scope.feedList = data;
            setIsEditingFeed();
        }).error(function (data, status) {
            console.log(status);
        });
    }

    $scope.insertFeed = function (feed) {
        $http.post("api/feeds/" + authenticationService.currentUser().username, feed).success(function (data, status) {
            console.log(status);
            $scope.toggleAdd();
            $scope.getAllFeeds();
        }).error(function (data, status) {
            console.log(status);
        });
    }

    $scope.updateFeed = function (feed) {
        if ($scope.temporaryFeed.sourceName === feed.sourceName && $scope.temporaryFeed.sourceFeedUrl === feed.sourceFeedUrl) {
            // Did not edit, no need to update. 
        } else {
            $http.put("/api/feeds/" + authenticationService.currentUser().username + "/" + feed._id, feed).success(function (data, status) {
                console.log(status);
            }).error(function (data, status) {
                console.log(status);
            });
        }

        feed.isEditing = false;
    }

    $scope.deleteFeed = function (feedId) {
        $http.delete("/api/feeds/" + authenticationService.currentUser().username + "/" + feedId).success(function (data, status) {
            $scope.getAllFeeds();
        }).error(function (data, status) {

        });
    }
}]);